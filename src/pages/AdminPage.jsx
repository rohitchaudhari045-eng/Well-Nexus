import React, { useState } from 'react';
import ConsoleLayout from '../components/ConsoleLayout';
import { useAuth } from '../context/AuthContext';

export default function AdminPage({ showToast }) {
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = useState('data-quality');

  // Synthetic Users for Role Management
  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Er. Rohit Saikia', email: 'rohit.saikia@oilindia.in', role: 'Administrator', location: 'Duliajan HQ', lastActive: 'Just Now', status: 'Active' },
    { id: 'usr-2', name: 'Er. Anupam Gogoi', email: 'anupam.gogoi@oilindia.in', role: 'Supervisor', location: 'Rig OIL-DK-105', lastActive: '5 mins ago', status: 'Active' },
    { id: 'usr-3', name: 'Er. Devika Hazarika', email: 'devika.hazarika@oilindia.in', role: 'Drilling Engineer', location: 'Rig OIL-DK-98', lastActive: '18 mins ago', status: 'Active' },
    { id: 'usr-4', name: 'Er. Bikram Chetia', email: 'bikram.chetia@oilindia.in', role: 'Drilling Engineer', location: 'Rig OIL-DK-102', lastActive: '2 hours ago', status: 'Active' },
    { id: 'usr-5', name: 'Er. Jitu Baruah', email: 'jitu.baruah@oilindia.in', role: 'Supervisor', location: 'Digboi Office', lastActive: '1 day ago', status: 'Inactive' },
  ]);

  // Data Quality Issues State (Module 28)
  const [dataIssues, setDataIssues] = useState([
    { id: 'dq-101', type: 'Missing Field', severity: 'Medium', entity: 'Well Completion Report #OIL-DK-89', issue: 'Missing Casing Weight parameter in Section 3', date: '2026-09-28', status: 'Pending' },
    { id: 'dq-102', type: 'Duplicate Report', severity: 'High', entity: 'DDR-OIL-DK102-Oct14.pdf', issue: 'Duplicate document hash detected with DDR-OIL-DK102-Oct14-v2.pdf', date: '2026-09-27', status: 'Pending' },
    { id: 'dq-103', type: 'Depth Anomaly', severity: 'Critical', entity: 'Telemetry Stream #402', issue: 'Depth step skip from 2,785.4m to 3,120.0m within 2 seconds', date: '2026-09-29', status: 'Auto-Corrected' },
    { id: 'dq-104', type: 'Inconsistent Formation', severity: 'Low', entity: 'Geological Log #12', issue: 'Formation listed as "Tipam Sdst" instead of standardized "Tipam Sandstone"', date: '2026-09-26', status: 'Auto-Corrected' },
  ]);

  const [isValidating, setIsValidating] = useState(false);

  const handleRoleChange = (userId, newRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    showToast?.(`User role updated to ${newRole}`, 'success');
  };

  const handleRunValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      showToast?.('Data Quality Engine: 1,024 wells & 5,400 records scanned. 0 new anomalies found.', 'success');
    }, 1500);
  };

  const handleResolveIssue = (issueId) => {
    setDataIssues(prev => prev.map(iss => iss.id === issueId ? { ...iss, status: 'Resolved' } : iss));
    showToast?.('Data issue marked as resolved.', 'success');
  };

  return (
    <ConsoleLayout showToast={showToast}>
      <div className="space-y-6 animate-fade-in">
        
        {/* Header Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-black text-lg">
                <i className="fas fa-user-shield"></i>
              </div>
              <h1 className="text-2xl font-black tracking-tight">Admin & Data Quality Control Console</h1>
            </div>
            <p className="text-xs text-slate-400">
              Module 27 & 28 — User Management, Role-Based Access Control, Data Quality Engine & Audit Security
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunValidation}
              disabled={isValidating}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-2"
            >
              <i className={`fas ${isValidating ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
              {isValidating ? 'Scanning Database...' : 'Run Data Quality Scan'}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
          <button
            onClick={() => setActiveTab('data-quality')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'data-quality'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className="fas fa-check-double text-orange-400"></i>
            Data Quality Engine (Module 28)
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className="fas fa-users-gear text-orange-400"></i>
            User & RBAC Management (Module 27)
          </button>
          <button
            onClick={() => setActiveTab('audit-logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'audit-logs'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className="fas fa-shield-halved text-orange-400"></i>
            Audit Logs & Security (Module 30)
          </button>
        </div>

        {/* TAB 1: Data Quality Engine */}
        {activeTab === 'data-quality' && (
          <div className="space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Scanned Wells</span>
                <p className="text-2xl font-black text-slate-900 mt-1">1,024</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1"><i className="fas fa-check-circle mr-1"></i> 100% Schema Valid</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Data Quality Score</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">98.6%</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">OIL Enterprise Standard Met</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detected Anomallies</span>
                <p className="text-2xl font-black text-amber-600 mt-1">{dataIssues.filter(i => i.status === 'Pending').length}</p>
                <p className="text-[11px] text-amber-600 font-semibold mt-1">Requires Engineer Review</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Auto-Corrected Records</span>
                <p className="text-2xl font-black text-blue-600 mt-1">142</p>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">NLP Standardized Names</p>
              </div>
            </div>

            {/* Data Quality Issues Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <i className="fas fa-list-check text-orange-500"></i>
                  Active Data Quality Anomalies & Validation Queue
                </h3>
                <span className="text-xs font-bold text-slate-500">Auto Engine Active</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 text-[11px] font-extrabold uppercase tracking-wider border-b border-slate-200">
                      <th className="p-3.5">ID</th>
                      <th className="p-3.5">Issue Type</th>
                      <th className="p-3.5">Target Entity</th>
                      <th className="p-3.5">Description</th>
                      <th className="p-3.5">Severity</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {dataIssues.map((iss) => (
                      <tr key={iss.id} className="hover:bg-slate-50 transition">
                        <td className="p-3.5 font-bold text-slate-900">{iss.id}</td>
                        <td className="p-3.5 font-semibold text-slate-700">{iss.type}</td>
                        <td className="p-3.5 font-bold text-orange-600">{iss.entity}</td>
                        <td className="p-3.5 text-slate-600 max-w-xs">{iss.issue}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            iss.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                            iss.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {iss.severity}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            iss.status === 'Resolved' || iss.status === 'Auto-Corrected'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {iss.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          {iss.status === 'Pending' ? (
                            <button
                              onClick={() => handleResolveIssue(iss.id)}
                              className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] rounded-lg transition"
                            >
                              Fix / Resolve
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-semibold"><i className="fas fa-check"></i> Verified</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: User Role Management */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Oil India Engineers & Role Access Control (RBAC)</h3>
                <p className="text-xs text-slate-500">Manage privileges across Drilling Engineer, Supervisor, and Administrator roles</p>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-extrabold">
                Current Role: {userRole}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-[11px] font-extrabold uppercase tracking-wider border-b border-slate-200">
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Assigned Location</th>
                    <th className="p-3.5">Role</th>
                    <th className="p-3.5">Last Active</th>
                    <th className="p-3.5 text-right">Manage Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-[10px]">
                          {u.name.charAt(4)}
                        </div>
                        {u.name}
                      </td>
                      <td className="p-3.5 text-slate-600">{u.email}</td>
                      <td className="p-3.5 font-semibold text-slate-700">{u.location}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                          u.role === 'Administrator' ? 'bg-purple-100 text-purple-700' :
                          u.role === 'Supervisor' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500">{u.lastActive}</td>
                      <td className="p-3.5 text-right">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="Drilling Engineer">Drilling Engineer</option>
                          <option value="Supervisor">Supervisor</option>
                          <option value="Administrator">Administrator</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Audit Logs & Security */}
        {activeTab === 'audit-logs' && (
          <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <i className="fas fa-shield-check text-emerald-400"></i>
                Enterprise Security & Audit Trail Logs (Module 30)
              </h3>
              <span className="text-xs text-emerald-400 font-bold"><i className="fas fa-lock mr-1"></i> JWT & SSL Encrypted</span>
            </div>

            <div className="space-y-2 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 max-h-80 overflow-y-auto">
              <p className="text-slate-500">[2026-09-29 14:15:02] AUTH_JWT_VERIFIED | User: rohit.saikia@oilindia.in | IP: 10.24.8.102 | Role: Administrator</p>
              <p className="text-emerald-400">[2026-09-29 14:16:20] FIRESTORE_SYNC_SUCCESS | Collection: telemetry | Document: OIL-DK-105 | Latency: 24ms</p>
              <p className="text-amber-400">[2026-09-29 14:18:05] OCR_ENGINE_EXEC | File: DDR-OIL-DK105.pdf | Extracted 20 Subsurface Parameters | Conf: 98.6%</p>
              <p className="text-slate-500">[2026-09-29 14:20:11] RAG_VECTOR_SEARCH | Query: "mud loss tipam" | Top Match: OIL-DK-102 (Similarity: 0.94)</p>
              <p className="text-blue-400">[2026-09-29 14:21:44] RBAC_ROLE_CHECK | Granted access to Admin Console for UID: usr-1</p>
            </div>
          </div>
        )}

      </div>
    </ConsoleLayout>
  );
}
