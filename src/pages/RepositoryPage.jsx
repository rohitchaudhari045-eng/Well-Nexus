import React, { useState, useEffect } from 'react';
import ConsoleLayout from '../components/ConsoleLayout';
import {
  subscribeToIncidents,
  addIncidentToFirebase
} from '../services/firebaseService';
import LogInspectModal from '../components/LogInspectModal';
import { downloadCSV } from '../utils/exportUtils';

export default function RepositoryPage({ showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [logs, setLogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inspection Modal State
  const [inspectingLog, setInspectingLog] = useState(null);

  // New Log Form state
  const [newLog, setNewLog] = useState({
    id: `WCR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    wellName: 'OIL-DK-108',
    category: 'Mud Loss',
    formation: 'Tipam Sandstone',
    depth: 2810,
    event: 'Circulation loss of 12 m3/hr at 2810m depth band',
    severity: 'HIGH',
    mitigation: 'Pre-treated mud system with 20 ppb coarse CaCO3 + Nutplug pill'
  });

  useEffect(() => {
    const unsubscribe = subscribeToIncidents((firebaseLogs) => {
      setLogs(firebaseLogs);
    });

    return () => unsubscribe();
  }, []);

  const handleAddLogSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await addIncidentToFirebase(newLog);
    if (result.success) {
      if (showToast) showToast(`Successfully added log ${newLog.id} to Firebase Firestore!`, 'success');
      setIsModalOpen(false);
      setNewLog({
        id: `WCR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        wellName: 'OIL-DK-109',
        category: 'Mud Loss',
        formation: 'Tipam Sandstone',
        depth: 2820,
        event: 'Mud loss encounter during casing landing',
        severity: 'MEDIUM',
        mitigation: 'Hesitation squeeze completed'
      });
    } else {
      if (showToast) showToast(`Failed to add log: ${result.error}`, 'error');
    }
    setIsSubmitting(false);
  };

  const handleExportAllLogs = () => {
    const headers = ['Log ID', 'Well Name', 'Category', 'Depth (m)', 'Formation', 'Hazard Event', 'Mitigation'];
    const rows = filteredLogs.map(l => [
      l.id || 'N/A',
      l.wellName || l.well || 'OIL Well',
      l.category || l.type || 'Mud Loss',
      l.depth || '2790',
      l.formation || 'Tipam Sandstone',
      l.event || l.hazard || 'Circulation Loss',
      l.mitigation || 'LCM Pill'
    ]);

    downloadCSV('WellNexus_Historical_Subsurface_Logs.csv', headers, rows);
    if (showToast) showToast('Exported historical drilling logs to CSV file!', 'success');
  };

  const filteredLogs = logs.filter(log => {
    const well = log.wellName || log.well || '';
    const form = log.formation || '';
    const eventText = log.event || log.hazard || '';
    const category = log.category || log.type || '';

    const matchesSearch =
      well.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eventText.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'ALL' || category.toUpperCase().includes(selectedType.toUpperCase());
    return matchesSearch && matchesType;
  });

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold text-orange-600 uppercase tracking-wider mb-0.5">SUBSURFACE DATA VAULT (FIREBASE FIRESTORE)</div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Historical Repository</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary-industrial text-xs bg-gradient-to-r from-orange-500 to-orange-600 shadow-md"
            >
              <i className="fas fa-plus"></i> Add Log to Firebase
            </button>
            <button
              onClick={handleExportAllLogs}
              className="btn-secondary-industrial text-xs"
            >
              <i className="fas fa-file-export"></i> Export Selected Logs (CSV)
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder="Search by well name, formation, or hazard..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="ALL">All Event Categories</option>
              <option value="Loss">Mud Loss</option>
              <option value="Stuck">Stuck Pipe</option>
              <option value="Kick">Kick / Overpressure</option>
              <option value="Shale">Shale Instability</option>
            </select>
          </div>
        </div>

        {/* Data Table from Firebase */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Well Name</th>
                <th>Category</th>
                <th>Depth</th>
                <th>Formation</th>
                <th>Historical Incident / Hazard</th>
                <th>Mitigation Strategy</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, idx) => (
                <tr key={log.id || idx}>
                  <td className="font-mono text-xs font-bold text-orange-600">{log.id || `EVT-${idx}`}</td>
                  <td className="font-bold text-slate-900">{log.wellName || log.well || 'OIL-DK-098'}</td>
                  <td className="text-slate-700 font-semibold">{log.category || log.type || 'Mud Loss'}</td>
                  <td className="font-mono text-xs text-slate-500">{log.depth ? `${log.depth}m` : '2790m'}</td>
                  <td className="font-semibold text-slate-800">{log.formation || 'Tipam Sandstone'}</td>
                  <td className="text-red-700 font-medium text-xs bg-red-50/50 px-2 py-1 rounded border border-red-100 max-w-xs">
                    {log.event || log.hazard || 'Severe mud loss'}
                  </td>
                  <td className="text-xs text-slate-600 max-w-xs truncate">{log.mitigation || 'LCM Pill Squeeze'}</td>
                  <td>
                    <button
                      onClick={() => setInspectingLog(log)}
                      className="px-3 py-1 bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold rounded shadow-xs transition flex items-center gap-1"
                    >
                      <i className="fas fa-eye"></i> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inspection Modal */}
        <LogInspectModal
          log={inspectingLog}
          isOpen={Boolean(inspectingLog)}
          onClose={() => setInspectingLog(null)}
        />

        {/* Add Log Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white flex justify-between items-center">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <i className="fas fa-database"></i> Add Drilling Incident to Firebase
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white text-lg font-bold">&times;</button>
              </div>

              <form onSubmit={handleAddLogSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Log ID</label>
                    <input
                      type="text"
                      required
                      value={newLog.id}
                      onChange={(e) => setNewLog({ ...newLog, id: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Well Name</label>
                    <input
                      type="text"
                      required
                      value={newLog.wellName}
                      onChange={(e) => setNewLog({ ...newLog, wellName: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                    <select
                      value={newLog.category}
                      onChange={(e) => setNewLog({ ...newLog, category: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold"
                    >
                      <option value="Mud Loss">Mud Loss</option>
                      <option value="Stuck Pipe">Stuck Pipe</option>
                      <option value="Kick / Overpressure">Kick / Overpressure</option>
                      <option value="Shale Instability">Shale Instability</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Formation</label>
                    <input
                      type="text"
                      required
                      value={newLog.formation}
                      onChange={(e) => setNewLog({ ...newLog, formation: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Depth (m)</label>
                    <input
                      type="number"
                      required
                      value={newLog.depth}
                      onChange={(e) => setNewLog({ ...newLog, depth: Number(e.target.value) })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Incident Description</label>
                  <textarea
                    required
                    rows="2"
                    value={newLog.event}
                    onChange={(e) => setNewLog({ ...newLog, event: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mitigation Strategy & Lessons</label>
                  <textarea
                    required
                    rows="2"
                    value={newLog.mitigation}
                    onChange={(e) => setNewLog({ ...newLog, mitigation: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded shadow-md flex items-center gap-1.5"
                  >
                    {isSubmitting ? 'Saving to Firebase...' : 'Save to Firebase'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </ConsoleLayout>
  );
}
