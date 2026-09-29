import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import ConsoleLayout from '../components/ConsoleLayout';
import DetailedRiskReportModal from '../components/DetailedRiskReportModal';
import { downloadFormattedReport } from '../utils/exportUtils';

const riskTrendData = [
  { day: 'Day 1', mudLoss: 45, stuckPipe: 30, kick: 20 },
  { day: 'Day 2', mudLoss: 50, stuckPipe: 35, kick: 22 },
  { day: 'Day 3', mudLoss: 55, stuckPipe: 42, kick: 25 },
  { day: 'Day 4', mudLoss: 62, stuckPipe: 50, kick: 28 },
  { day: 'Day 5', mudLoss: 68, stuckPipe: 58, kick: 30 },
  { day: 'Day 6', mudLoss: 70, stuckPipe: 62, kick: 31 },
  { day: 'Day 7', mudLoss: 72, stuckPipe: 65, kick: 32 },
];

export default function RiskPage({ showToast }) {
  const [isDetailedReportOpen, setIsDetailedReportOpen] = useState(false);

  const riskCards = [
    { title: 'Mud Loss Risk', val: '72%', status: 'High', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    { title: 'Stuck Pipe Risk', val: '65%', status: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { title: 'Kick Risk', val: '32%', status: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { title: 'Overpressure Risk', val: '28%', status: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { title: 'Cementing Risk', val: '18%', status: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { title: 'Torque Spike Risk', val: '45%', status: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  ];

  const handleExportSummary = () => {
    downloadFormattedReport(
      'WellNexus_Predictive_Risk_Summary.txt',
      'Predictive Hazard Risk Summary',
      [
        {
          heading: 'Hazard Evaluation Overview',
          items: {
            'Target Well': 'OIL-DK-105',
            'Primary Formation': 'Tipam Sandstone (2785m)',
            'Mud Loss Risk Score': '72% (HIGH)',
            'Stuck Pipe Risk Score': '65% (MEDIUM)',
            'Kick Risk Score': '32% (LOW)'
          }
        },
        {
          heading: 'Actionable Field Guidelines',
          items: [
            'Increase mud weight by 0.2 ppg at 2790m depth band',
            'Monitor pump pressure continuously during Tipam transition',
            'Verify fracture pressure limits before casing seat landing'
          ]
        }
      ]
    );

    if (showToast) showToast('Exported Risk Prediction Summary report!', 'success');
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold text-orange-600 uppercase tracking-wider mb-0.5">PREDICTIVE HAZARD ENGINE (FIREBASE AI)</div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Risk Prediction Center</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDetailedReportOpen(true)}
              className="btn-primary-industrial text-xs bg-gradient-to-r from-orange-500 to-orange-600"
            >
              <i className="fas fa-file-invoice"></i> View Detailed Report
            </button>
            <button
              onClick={handleExportSummary}
              className="btn-secondary-industrial text-xs"
            >
              <i className="fas fa-file-pdf"></i> Export Risk Summary
            </button>
          </div>
        </div>

        {/* 6 Risk Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {riskCards.map((card, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${card.border} ${card.bg} shadow-xs text-center flex flex-col justify-between`}>
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">{card.title}</p>
                <p className={`text-3xl font-black ${card.color} my-1`}>{card.val}</p>
              </div>
              <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                card.status === 'High' ? 'bg-red-200 text-red-800' : card.status === 'Medium' ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'
              }`}>
                {card.status}
              </span>
            </div>
          ))}
        </div>

        {/* Lower Row: Risk Trend Chart + Recommendations */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Risk Trend Chart */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Risk Trend (Last 7 Days)</h3>
              <span className="text-xs text-slate-400 font-medium">Predicted Trajectory</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mudLoss" name="Mud Loss Risk" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="stuckPipe" name="Stuck Pipe Risk" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="kick" name="Kick Risk" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommendations Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <i className="fas fa-lightbulb text-orange-500"></i> Field Protocol Recommendations
              </h3>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <i className="fas fa-circle-check text-emerald-500 mt-0.5"></i>
                  <span>Increase mud weight by <b>0.2 ppg</b> at 2790m depth</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-circle-check text-emerald-500 mt-0.5"></i>
                  <span>Monitor pump pressure continuously during Tipam transition</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-circle-check text-emerald-500 mt-0.5"></i>
                  <span>Check for fracture pressure limits before casing seat</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setIsDetailedReportOpen(true)}
              className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs rounded-lg shadow-md shadow-orange-500/20 hover:from-orange-600 transition mt-6 flex items-center justify-center gap-2"
            >
              <i className="fas fa-file-lines"></i> View Detailed Report
            </button>
          </div>

        </div>

        {/* Detailed Risk Report Modal */}
        <DetailedRiskReportModal
          isOpen={isDetailedReportOpen}
          onClose={() => setIsDetailedReportOpen(false)}
        />

      </div>
    </ConsoleLayout>
  );
}
