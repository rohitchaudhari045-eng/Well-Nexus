import React, { useState, useEffect, useRef } from 'react';
import ConsoleLayout from '../components/ConsoleLayout';
import {
  subscribeToDocuments,
  addDocumentToFirebase
} from '../services/firebaseService';
import { parseAdvancedOCR } from '../utils/ocrExtractor';
import { downloadCSV, downloadFormattedReport } from '../utils/exportUtils';
import OcrDemoModule from '../components/OcrDemoModule';

export default function DocumentPage({ showToast }) {
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inDocSearch, setInDocSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('OCR_FULL');

  // Interactive PDF controls state
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Upload modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToDocuments((firebaseDocs) => {
      setDocuments(firebaseDocs);
    });

    return () => unsubscribe();
  }, []);

  const filteredDocs = documents.filter(doc => {
    const title = doc.title || doc.filename || '';
    const well = doc.well || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || well.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || doc.type?.includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  const activeDoc = filteredDocs[selectedDocIndex] || filteredDocs[0] || documents[0] || {
    title: 'Daily Drilling Report.pdf',
    well: 'OIL-DK-105',
    date: '12 Sep 2026',
    type: 'Daily Report',
    size: '4.2 MB',
    pages: 3
  };

  const ocrData = activeDoc.parsedOCR || parseAdvancedOCR(activeDoc.title || 'Report.pdf', activeDoc.ocrExtractedText || '');
  const activePageData = ocrData.pagesData[currentPage - 1] || ocrData.pagesData[0];

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ocrData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeDoc.title || 'Doc'}_Extracted_OCR.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    if (showToast) showToast('Exported OCR extracted parameters to JSON!', 'success');
  };

  const handleExportCSVTable = () => {
    const headers = ['Depth (m)', 'ROP (m/hr)', 'Torque (kN.m)', 'SPP (psi)', 'Mud Weight', 'Flow Rate', 'Page'];
    const rows = ocrData.drillingTable.map(r => [r.depth, r.rop, r.torque, r.spp, r.mw, r.flow, `Page ${r.page}`]);
    downloadCSV(`${activeDoc.title || 'Doc'}_Extracted_Drilling_Table.csv`, headers, rows);
    if (showToast) showToast('Exported extracted drilling parameters table to CSV!', 'success');
  };

  const handleDownloadDoc = () => {
    downloadFormattedReport(
      `${activeDoc.title || 'Document'}_Report.txt`,
      activeDoc.title || activeDoc.filename || 'Document Intelligence Report',
      [
        {
          heading: 'Document Metadata',
          items: {
            'Well Node': activeDoc.well || 'OIL-DK-105',
            'Document Type': activeDoc.type || 'Report',
            'Date': activeDoc.date || 'Indexed',
            'File Size': activeDoc.size || '3.5 MB'
          }
        },
        {
          heading: 'OCR Extracted Summary',
          items: activeDoc.ocrExtractedText || 'Extracted drilling text...'
        },
        {
          heading: 'Key Takeaway',
          items: activeDoc.keyTakeaway || 'Control ECD to prevent losses.'
        }
      ]
    );

    if (showToast) showToast(`Downloaded report for ${activeDoc.title || activeDoc.filename}`, 'success');
  };

  return (
    <ConsoleLayout showToast={showToast}>
      <div className="space-y-6">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">PDF DOCUMENT INTELLIGENCE</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full border border-emerald-300">
                Confidence: {ocrData.confidenceScore}% (HIGH)
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">Documents Intelligence Vault</h1>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleExportJSON} className="btn-secondary-industrial text-xs" title="Export OCR JSON">
              <i className="fas fa-file-code text-orange-500"></i> Export JSON
            </button>
            <button onClick={handleExportCSVTable} className="btn-secondary-industrial text-xs" title="Export CSV Table">
              <i className="fas fa-file-csv text-emerald-600"></i> Export CSV
            </button>
          </div>
        </div>

        {/* OCR Demo Module Component */}
        <OcrDemoModule showToast={showToast} />

        {/* Feature Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold overflow-x-auto">
          {[
            { id: 'OCR_FULL', label: '1. Page-wise OCR Text', icon: 'fas fa-file-lines' },
            { id: 'TABLES', label: '6. Structured Drilling Tables', icon: 'fas fa-table' },
            { id: 'PARAMETERS', label: '8-16. Extracted Parameters (16 Values)', icon: 'fas fa-list-check' },
            { id: 'HANDWRITING', label: '7. Handwriting Detection', icon: 'fas fa-signature' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-xs font-black'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <i className={tab.icon}></i> {tab.label}
            </button>
          ))}
        </div>

        {/* Main 3-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Left 3 cols: Document List */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Documents ({filteredDocs.length})</span>
              <span className="text-[10px] text-emerald-600 font-extrabold">🟢 Firestore</span>
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filteredDocs.map((docItem, idx) => (
                <div
                  key={docItem.id || idx}
                  onClick={() => {
                    setSelectedDocIndex(idx);
                    setCurrentPage(1);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    selectedDocIndex === idx
                      ? 'bg-orange-50 border-orange-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <i className="fas fa-file-pdf text-red-500 text-lg"></i>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{docItem.title || docItem.filename}</p>
                      <p className="text-[11px] text-slate-500">{docItem.well} | {docItem.date || 'Indexed'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center 6 cols: Dynamic Interactive OCR Viewer */}
          <div className="lg:col-span-6 bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-md flex flex-col justify-between text-white min-h-[540px]">
            
            {/* Toolbar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-xs text-slate-300">
              <span className="font-bold truncate max-w-xs">{activeDoc.title || activeDoc.filename}</span>
              
              <div className="flex items-center gap-3">
                <div className="relative w-36">
                  <i className="fas fa-search absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]"></i>
                  <input
                    type="text"
                    value={inDocSearch}
                    onChange={(e) => setInDocSearch(e.target.value)}
                    placeholder="Search in OCR..."
                    className="w-full pl-6 pr-2 py-0.5 bg-slate-700 border border-slate-600 rounded text-[11px] text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1 bg-slate-700 px-2 py-0.5 rounded text-[11px]">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage <= 1}
                    className="disabled:opacity-40 hover:text-orange-400 font-bold"
                  >
                    &lt;
                  </button>
                  <span>Page {currentPage} of {ocrData.pagesData.length}</span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(ocrData.pagesData.length, prev + 1))}
                    disabled={currentPage >= ocrData.pagesData.length}
                    className="disabled:opacity-40 hover:text-orange-400 font-bold"
                  >
                    &gt;
                  </button>
                </div>

                <button onClick={() => setZoomLevel(prev => Math.max(70, prev - 15))} className="hover:text-white" title="Zoom Out">
                  <i className="fas fa-magnifying-glass-minus"></i>
                </button>
                <button onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))} className="hover:text-white" title="Zoom In">
                  <i className="fas fa-magnifying-glass-plus"></i>
                </button>
                <button onClick={handleDownloadDoc} className="hover:text-orange-400" title="Download Report">
                  <i className="fas fa-download"></i>
                </button>
              </div>
            </div>

            {/* Document Content Body */}
            <div
              className="flex-1 my-4 bg-white text-slate-900 p-6 rounded-lg shadow-inner overflow-y-auto space-y-4 font-serif text-xs leading-relaxed max-h-[420px] transition-all"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              {activeTab === 'OCR_FULL' && (
                <div className="space-y-3 font-sans">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-orange-600">OIL INDIA LIMITED | {ocrData.fileType}</p>
                      <h4 className="text-sm font-black text-slate-900">{activePageData.heading}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-extrabold rounded">
                      Source Ref: Page {currentPage}
                    </span>
                  </div>

                  <p className="text-slate-800 whitespace-pre-line font-mono text-[11px] bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed">
                    {activePageData.content}
                  </p>
                </div>
              )}

              {activeTab === 'TABLES' && (
                <div className="space-y-3 font-sans">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase">Extracted Drilling Parameter Table</h4>
                    <button onClick={handleExportCSVTable} className="text-[10px] font-bold text-orange-600 hover:underline">Download CSV</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-200">
                      <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-700">
                        <tr>
                          <th className="p-2 border-b">Depth</th>
                          <th className="p-2 border-b">ROP</th>
                          <th className="p-2 border-b">Torque</th>
                          <th className="p-2 border-b">SPP</th>
                          <th className="p-2 border-b">Mud Weight</th>
                          <th className="p-2 border-b">Flow Rate</th>
                          <th className="p-2 border-b">Source</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                        {ocrData.drillingTable.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="p-2 font-bold text-slate-900">{row.depth}</td>
                            <td className="p-2 text-emerald-600">{row.rop}</td>
                            <td className="p-2 text-amber-600">{row.torque}</td>
                            <td className="p-2 text-slate-700">{row.spp}</td>
                            <td className="p-2 text-blue-600">{row.mw}</td>
                            <td className="p-2 text-slate-700">{row.flow}</td>
                            <td className="p-2 text-orange-600 font-bold">Page {row.page}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'PARAMETERS' && (
                <div className="space-y-3 font-sans text-xs">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase pb-2 border-b border-slate-200">
                    Extracted Parameters Breakdown
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[10px] font-bold uppercase">Well ID</span>
                      <span className="font-bold text-slate-900">{ocrData.wellId}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[10px] font-bold uppercase">Measured Depth (MD)</span>
                      <span className="font-bold text-orange-600 font-mono">{ocrData.depthMD}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[10px] font-bold uppercase">Formation Zone</span>
                      <span className="font-bold text-slate-900">{ocrData.formation}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[10px] font-bold uppercase">Mud Weight</span>
                      <span className="font-bold text-blue-600 font-mono">{ocrData.mudWeight}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'HANDWRITING' && (
                <div className="space-y-3 font-sans">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase pb-2 border-b border-slate-200">
                    Handwritten Notes & Signatures Detection
                  </h4>
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-slate-900 font-mono text-xs leading-relaxed space-y-2">
                    <p className="font-bold text-amber-900 uppercase text-[10px]">Detected Handwritten Field Entry:</p>
                    <p>{ocrData.handwrittenNotes[0]}</p>
                  </div>
                </div>
              )}

            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-700">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <i className="fas fa-circle-check"></i> OCR Confidence: {ocrData.confidenceScore}% (High Reliability)
              </span>
              <span>{zoomLevel}% Zoom</span>
            </div>
          </div>

          {/* Right 3 cols: Metadata & Export Options */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>OCR Confidence Score</span>
                <span className="text-emerald-600 font-black">{ocrData.confidenceScore}%</span>
              </h3>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${ocrData.confidenceScore}%` }}></div>
              </div>
              <p className="text-[11px] text-slate-500">Verified against Oil India geological data dictionary.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Export Options</h3>
              <button onClick={handleExportJSON} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded flex items-center justify-center gap-2">
                <i className="fas fa-file-code text-orange-500"></i> Export Extracted JSON
              </button>
              <button onClick={handleExportCSVTable} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded flex items-center justify-center gap-2">
                <i className="fas fa-file-csv text-emerald-600"></i> Export Extracted CSV
              </button>
            </div>
          </div>

        </div>

      </div>
    </ConsoleLayout>
  );
}
