import React from 'react';
import { downloadFormattedReport } from '../utils/exportUtils';

export default function DetailedRiskReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleExportRiskReport = () => {
    downloadFormattedReport(
      'WellNexus_Detailed_Risk_Prediction_Report.txt',
      'Subsurface Predictive Hazard & Mitigation Assessment Report',
      [
        {
          heading: 'Executive Risk Evaluation',
          items: {
            'Target Well': 'OIL-DK-105 (Dikom Field)',
            'Active Depth Window': '2785.2m - 2850m',
            'Primary Formation': 'Tipam Sandstone',
            'Overall Risk Score': '72% (HIGH)'
          }
        },
        {
          heading: 'Quantitative Hazard Probabilities',
          items: {
            'Mud Circulation Loss Probability': '72% (Critical fracture permeability window at 2790m)',
            'Differential Pipe Sticking Probability': '65% (180 psi static overbalance across porous sand)',
            'Gas Influx / Kick Risk': '32% (Narrow 0.09 SG operating window)',
            'Borehole Instability Risk': '28% (Stable in shale section)',
            'Cement Channeling Risk': '18% (Low with centralizers)'
          }
        },
        {
          heading: 'Offset Well Historical Correlations',
          items: [
            'OIL-DK-098 (2.4 km NE): Total mud loss (28 m3 pit drop) cured via 2-stage hesitation squeeze.',
            'OIL-DK-101 (4.1 km SW): Differential sticking (52 hrs NPT) resolved with oil-soluble surfactant pill.',
            'OIL-NH-42 (8.7 km SE): Gas kick (15 bbl gain) controlled via Wait & Weight method at 2815m.'
          ]
        },
        {
          heading: 'Mandatory Mitigation Protocol Recommendations',
          items: [
            'Pre-load mud system with 15-20 ppb coarse Calcium Carbonate prior to reaching 2785m.',
            'Maintain active ECD strictly under 1.30 SG during rotary drilling.',
            'Prepare 50 bbl high-viscosity LCM pill (Nutplug + Mica 25 ppb) in reserve pit #3.'
          ]
        }
      ]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-white shadow-inner">
              <i className="fas fa-shield-halved text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Detailed Subsurface Risk Report</h3>
              <p className="text-xs text-orange-100">Predictive Machine Learning Hazard Assessment for OIL-DK-105</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:text-slate-200 text-2xl font-bold">&times;</button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* Executive KPI Summary */}
          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Active Section</span>
              <span className="font-extrabold text-slate-900 text-sm">12-1/4" Tipam Sandstone</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Overall Risk Rating</span>
              <span className="font-black text-red-600 text-sm">72% (HIGH HAZARD)</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Offset Correlation</span>
              <span className="font-extrabold text-slate-900 text-sm">3 Neighboring Wells</span>
            </div>
          </div>

          {/* Detailed Risk Score Table */}
          <div>
            <h4 className="font-extrabold text-slate-900 uppercase text-[11px] mb-3 flex items-center gap-2">
              <i className="fas fa-chart-line text-orange-500"></i> Hazard Probability Matrix
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Hazard Category</th>
                    <th className="p-2.5">Risk Score</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Root Subsurface Cause</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  <tr className="bg-red-50/50">
                    <td className="p-2.5 font-bold text-slate-900">Mud Circulation Loss</td>
                    <td className="p-2.5 font-black text-red-600">72%</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-red-200 text-red-800 font-extrabold text-[10px] rounded">CRITICAL</span></td>
                    <td className="p-2.5">Coarse high-permeability sand matrix with micro-fractures at 2790m.</td>
                  </tr>
                  <tr className="bg-amber-50/50">
                    <td className="p-2.5 font-bold text-slate-900">Differential Sticking</td>
                    <td className="p-2.5 font-black text-amber-600">65%</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-amber-200 text-amber-800 font-extrabold text-[10px] rounded">HIGH</span></td>
                    <td className="p-2.5">180 psi static overbalance across porous Tipam sandstone stringers.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Gas Kick / Influx</td>
                    <td className="p-2.5 font-black text-emerald-600">32%</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] rounded">LOW</span></td>
                    <td className="p-2.5">Pore pressure peak of 1.21 SG managed with 1.28 SG mud.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Protocols */}
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 space-y-2">
            <h4 className="font-extrabold text-orange-900 uppercase text-[11px] flex items-center gap-1.5">
              <i className="fas fa-check-double text-orange-600"></i> Required Operations Guidelines before 2790m Penetration:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-800 pl-4 list-disc">
              <li>Pre-dose suction tank with 15 ppb coarse Calcium Carbonate bridging agent.</li>
              <li>Keep 50 bbl high-viscosity LCM pill (Nutplug + Mica 25 ppb) ready in active suction pit #3.</li>
              <li>Maintain active ECD strictly under 1.30 SG during rotary drilling.</li>
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
          <span className="text-[11px] font-bold text-slate-500">SIH 2025 AI Predictive Engine Node</span>
          <div className="flex gap-2">
            <button
              onClick={handleExportRiskReport}
              className="btn-primary-industrial text-xs bg-orange-600 hover:bg-orange-700"
            >
              <i className="fas fa-download"></i> Export Report (TXT/PDF)
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
