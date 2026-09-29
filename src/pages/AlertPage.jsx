import React, { useState, useEffect } from 'react';
import ConsoleLayout from '../components/ConsoleLayout';
import {
  subscribeToAlerts,
  createAlertInFirebase,
  updateAlertStatusInFirebase
} from '../services/firebaseService';

export default function AlertPage({ showToast }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [alerts, setAlerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New alert form
  const [newAlert, setNewAlert] = useState({
    well: 'OIL-DK-105',
    type: 'Mud Loss Warning',
    desc: 'Pit level drop detected at 2790m in Tipam Sandstone',
    severity: 'Critical'
  });

  useEffect(() => {
    // Subscribe to Firebase Firestore alerts collection
    const unsubscribe = subscribeToAlerts((firebaseAlerts) => {
      setAlerts(firebaseAlerts);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await createAlertInFirebase(newAlert);
    if (res.success) {
      if (showToast) showToast('New operational alert published to Firebase Firestore!', 'success');
      setIsModalOpen(false);
    } else {
      if (showToast) showToast(`Failed to create alert: ${res.error}`, 'error');
    }
    setIsSubmitting(false);
  };

  const handleUpdateStatus = async (alertId, status) => {
    const res = await updateAlertStatusInFirebase(alertId, status);
    if (res.success) {
      if (showToast) showToast(`Alert status updated to ${status} in Firebase!`, 'success');
    }
  };

  const filteredAlerts = filterSeverity === 'ALL'
    ? alerts
    : alerts.filter(a => (a.severity || '').toUpperCase() === filterSeverity);

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold text-orange-600 uppercase tracking-wider mb-0.5">WITSML INCIDENT CENTER (FIREBASE REALTIME)</div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Alerts Center</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary-industrial text-xs bg-gradient-to-r from-orange-500 to-orange-600"
            >
              <i className="fas fa-triangle-exclamation"></i> Trigger New Alert
            </button>

            {/* Severity Filter Pills */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg text-xs font-semibold">
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-3 py-1 rounded transition ${filterSeverity === sev ? 'bg-orange-500 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts Table from Firebase */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Well</th>
                <th>Event Type</th>
                <th>Description</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-slate-500 text-xs font-medium">
                    No alerts found for selected severity filter.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((row, idx) => (
                  <tr key={row.id || idx}>
                    <td className="font-mono text-slate-500 text-xs">{row.date || 'Today'}</td>
                    <td className="font-bold text-slate-900">{row.well}</td>
                    <td className="font-semibold text-slate-800">{row.type}</td>
                    <td className="text-slate-700 max-w-md">{row.desc}</td>
                    <td>
                      <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                        row.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                        row.severity === 'High' ? 'bg-amber-100 text-amber-700' :
                        row.severity === 'Medium' ? 'bg-blue-100 text-blue-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {row.severity}
                      </span>
                    </td>
                    <td>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        row.status === 'UNACKNOWLEDGED' ? 'bg-red-50 text-red-600 border border-red-200' :
                        row.status === 'ACKNOWLEDGED' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                        'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}>
                        {row.status || 'ACTIVE'}
                      </span>
                    </td>
                    <td className="space-x-1">
                      {row.status !== 'ACKNOWLEDGED' && row.status !== 'RESOLVED' && (
                        <button
                          onClick={() => handleUpdateStatus(row.id, 'ACKNOWLEDGED')}
                          className="px-2.5 py-1 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 rounded border border-amber-200"
                        >
                          Acknowledge
                        </button>
                      )}
                      {row.status !== 'RESOLVED' && (
                        <button
                          onClick={() => handleUpdateStatus(row.id, 'RESOLVED')}
                          className="px-2.5 py-1 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded border border-emerald-200"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Trigger Alert Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 text-white flex justify-between items-center">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <i className="fas fa-bell"></i> Trigger Operational Alert to Firebase
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white text-lg font-bold">&times;</button>
              </div>

              <form onSubmit={handleCreateAlert} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Well</label>
                  <input
                    type="text"
                    required
                    value={newAlert.well}
                    onChange={(e) => setNewAlert({ ...newAlert, well: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Event Type</label>
                  <input
                    type="text"
                    required
                    value={newAlert.type}
                    onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Severity</label>
                  <select
                    value={newAlert.severity}
                    onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs font-bold"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alert Description</label>
                  <textarea
                    required
                    rows="3"
                    value={newAlert.desc}
                    onChange={(e) => setNewAlert({ ...newAlert, desc: e.target.value })}
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
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded shadow-md"
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish Alert'}
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
