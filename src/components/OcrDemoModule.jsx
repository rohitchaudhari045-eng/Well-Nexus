import React, { useState, useRef } from 'react';

// Mock JSON Data for OCR Demo Module
const mockOcrResult = {
  extractedHighlights: [
    { label: 'Mud Loss', depth: '2785m', severity: 'CRITICAL', color: 'bg-red-100 text-red-700 border-red-200' },
    { label: 'Stuck Pipe', depth: '3120m', severity: 'HIGH', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { label: 'Formation', name: 'Tipam Sand', type: 'Porous Sandstone', color: 'bg-orange-100 text-orange-700 border-orange-200' }
  ],
  rawOcrText: `OIL INDIA LIMITED - DAILY DRILLING OCR REPORT\nWELL: OIL-DK-105 (DIKOM FIELD)\n--------------------------------------------------\nSection 12-1/4" Hole | Target Formation: Tipam Sand\n\n- Mud Loss encountered at 2785m depth band (Rate: 2.5 bbl/hr).\n- High differential sticking risk & Stuck Pipe observed at 3120m.\n- Mud Weight: 1.28 SG | SPP: 2420 psi | Viscosity: 48s.\n- Recommendation: Pre-dose 15 ppb CaCO3 prior to reaching 2780m.`,
  aiSummary: {
    title: 'AI Subsurface Summary & Risk Evaluation',
    keyFindings: [
      'Primary Hazard: Circulation Mud Loss recorded at 2785m in Tipam Sand formation.',
      'Secondary Hazard: Stuck Pipe risk spike detected at 3120m.',
      'Formation Target: Tipam Sand (High porosity coarse sandstone).'
    ],
    recommendation: 'Maintain active ECD strictly under 1.30 SG and pre-dose active pit with 15 ppb CaCO3.'
  }
};

export default function OcrDemoModule({ showToast }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasProcessed, setHasProcessed] = useState(true); // Default true so user sees initial output immediately
  const [fileName, setFileName] = useState('Dikom-105_Daily_Report.pdf');
  const fileInputRef = useRef(null);

  const startOcrSimulation = (selectedName) => {
    setFileName(selectedName || 'Dikom-105_Daily_Report.pdf');
    setIsProcessing(true);
    setHasProcessed(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setHasProcessed(true);
          if (showToast) showToast('OCR Extraction & AI Summary Complete!', 'success');
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      startOcrSimulation(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-6">
      
      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black shadow-md shadow-orange-500/30">
            <i className="fas fa-file-pdf text-xl"></i>
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">OCR Demo Module</h2>
            <p className="text-xs text-slate-500 font-medium">Automated PDF text extraction & AI Summary Engine</p>
          </div>
        </div>

        {/* Upload PDF Button */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.png,.jpg,.jpeg,.txt,.docx"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-primary-industrial py-2.5 px-5 text-xs bg-gradient-to-r from-orange-500 to-orange-600 shadow-md flex items-center gap-2"
        >
          <i className="fas fa-file-arrow-up"></i> Upload PDF
        </button>
      </div>

      {/* OCR Processing Animation & Progress Bar */}
      {isProcessing && (
        <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-2 text-orange-400">
              <i className="fas fa-spinner fa-spin"></i> OCR Scanning File: <span className="text-white">{fileName}</span>
            </span>
            <span className="font-mono text-emerald-400 text-sm">{progress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700 relative">
            <div
              className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>OCR Layout Detection...</span>
            <span>Parsing Subsurface Entities...</span>
          </div>
        </div>
      )}

      {/* Extracted Mock Text Display */}
      {hasProcessed && !isProcessing && (
        <div className="space-y-6">
          
          {/* Key Extracted Highlights Cards */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <i className="fas fa-microscope text-orange-500"></i> Extracted Key Findings
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-red-500 uppercase">Hazard Event</p>
                  <p className="text-base font-black text-red-900">Mud Loss</p>
                </div>
                <span className="px-2.5 py-1 bg-red-200 text-red-900 font-extrabold text-xs rounded-lg font-mono">
                  at 2785m
                </span>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-amber-500 uppercase">Hazard Event</p>
                  <p className="text-base font-black text-amber-900">Stuck Pipe</p>
                </div>
                <span className="px-2.5 py-1 bg-amber-200 text-amber-900 font-extrabold text-xs rounded-lg font-mono">
                  at 3120m
                </span>
              </div>

              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-orange-500 uppercase">Geological Zone</p>
                  <p className="text-base font-black text-orange-900">Formation</p>
                </div>
                <span className="px-2.5 py-1 bg-orange-200 text-orange-900 font-extrabold text-xs rounded-lg">
                  Tipam Sand
                </span>
              </div>
            </div>
          </div>

          {/* Raw Mock Extracted Text Canvas */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              Raw Extracted Text
            </h3>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed border border-slate-800 shadow-inner">
              <pre className="whitespace-pre-wrap">{mockOcrResult.rawOcrText}</pre>
            </div>
          </div>

          {/* AI Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
                  <i className="fas fa-sparkles"></i>
                </div>
                <h3 className="text-sm font-extrabold text-white">{mockOcrResult.aiSummary.title}</h3>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold rounded-full border border-emerald-500/30">
                100% OCR Accuracy
              </span>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              {mockOcrResult.aiSummary.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>

            <div className="p-3.5 bg-orange-500/10 border border-orange-500/30 rounded-xl text-orange-200 text-xs">
              <span className="font-bold text-orange-400 uppercase text-[10px] block mb-1">Recommended Mitigation Protocol:</span>
              <p>{mockOcrResult.aiSummary.recommendation}</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
