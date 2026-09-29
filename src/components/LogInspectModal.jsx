import React from 'react';
import { downloadFormattedReport } from '../utils/exportUtils';

export default function LogInspectModal({ log, isOpen, onClose }) {
  if (!isOpen || !log) return null;

  const handleExportSingleLog = () => {
    downloadFormattedReport(
      `${log.id || 'Log'}_Inspection_Report.txt`,
      `Drilling Incident Inspection - ${log.wellName || log.well || 'OIL Well'}`,
      [
        {
          heading: 'Log Overview',
          items: {
            'Log ID': log.id || 'N/A',
            'Well Identifier': log.wellName || log.well || 'OIL-DK-098',
            'Formation Target': log.formation || 'Tipam Sandstone',
            'Encounter Depth': log.depth ? `${log.depth}m` : '2790m',
            'Category': log.category || log.type || 'Mud Loss'
          }
        },
        {
          heading: 'Subsurface Incident Description',
          items: log.event || log.hazard || 'Circulation loss encounter in porous sandstone stringer.'
        },
        {
          heading: 'Mitigation Strategy & Resolution',
          items: log.mitigation || 'Pumped high-viscosity LCM pill (Nutplug + Mica 25 ppb) in 2 stages with hesitation squeeze.'
        },
        {
          heading: 'Engineering Recommendations & Lessons Learned',
          items: log.lessonsLearned || 'Pre-dose active mud system with 15 ppb CaCO3 prior to penetrating Tipam Sandstone.'
        }
      ]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 p-5 text-white flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white shadow-md">
              <i className="fas fa-file-invoice text-lg"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-orange-400 font-extrabold">{log.id}</span>
                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 text-[10px] font-bold rounded">
                  {log.category || log.type || 'Mud Loss'}
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-0.5">{log.wellName || log.well} Inspection Log</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl font-bold">&times;</button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Well ID</span>
              <span className="font-bold text-slate-900 text-sm">{log.wellName || log.well}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Target Formation</span>
              <span className="font-bold text-slate-900 text-sm">{log.formation || 'Tipam Sandstone'}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Depth</span>
              <span className="font-bold text-orange-600 font-mono text-sm">{log.depth ? `${log.depth}m` : '2790m'}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Severity</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-red-100 text-red-800 font-extrabold rounded text-[11px]">
                {log.severity || 'CRITICAL'}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 uppercase text-[11px] tracking-wider mb-2 flex items-center gap-1.5">
              <i className="fas fa-triangle-exclamation text-red-500"></i> Historical Hazard / Incident Event
            </h4>
            <p className="p-3.5 bg-red-50/70 border border-red-100 rounded-lg text-slate-900 font-medium leading-relaxed">
              {log.event || log.hazard || 'Severe circulation loss encounter.'}
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 uppercase text-[11px] tracking-wider mb-2 flex items-center gap-1.5">
              <i className="fas fa-shield-check text-emerald-600"></i> Executed Field Mitigation Strategy
            </h4>
            <p className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-lg text-slate-900 font-medium leading-relaxed">
              {log.mitigation || 'Pumping High-Viscosity LCM Pill (Nutplug + Mica 25 ppb) in 2 stages with hesitation squeeze.'}
            </p>
          </div>

          {log.lessonsLearned && (
            <div>
              <h4 className="font-extrabold text-slate-900 uppercase text-[11px] tracking-wider mb-2 flex items-center gap-1.5">
                <i className="fas fa-lightbulb text-amber-500"></i> Lessons Learned for Current Well Execution
              </h4>
              <p className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-lg text-slate-900 font-medium leading-relaxed">
                {log.lessonsLearned}
              </p>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
          <span className="text-[11px] font-bold text-slate-500">Verified via Oil India WCR Archives</span>
          <div className="flex gap-2">
            <button
              onClick={handleExportSingleLog}
              className="btn-primary-industrial text-xs bg-slate-900 hover:bg-slate-800"
            >
              <i className="fas fa-download"></i> Download Inspection Report
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-lg"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
