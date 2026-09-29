import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import ConsoleLayout from '../components/ConsoleLayout';
import { downloadFormattedReport } from '../utils/exportUtils';

const formationCompositionData = [
  { name: 'Tipam', value: 40, color: '#F97316' },
  { name: 'Barail', value: 28, color: '#3B82F6' },
  { name: 'Girujan', value: 20, color: '#10B981' },
  { name: 'Others', value: 12, color: '#94A3B8' },
];

const wellComparisonData = [
  { well: 'OG-06-105', rop: 12.4, NPT: 2.1 },
  { well: 'DK-04', rop: 10.8, NPT: 5.4 },
  { well: 'OG-06-102', rop: 11.5, NPT: 3.2 },
  { well: 'DK-08', rop: 13.1, NPT: 1.8 },
  { well: 'OG-06-098', rop: 9.6, NPT: 6.8 },
];

const eventFrequencyData = [
  { month: 'May', mudLoss: 4, stuckPipe: 2, cementing: 1 },
  { month: 'Jun', mudLoss: 6, stuckPipe: 3, cementing: 2 },
  { month: 'Jul', mudLoss: 3, stuckPipe: 1, cementing: 0 },
  { month: 'Aug', mudLoss: 8, stuckPipe: 4, cementing: 3 },
  { month: 'Sep', mudLoss: 5, stuckPipe: 2, cementing: 1 },
];

export default function AnalyticsPage({ showToast }) {
  const handleExportAnalytics = () => {
    downloadFormattedReport(
      'WellNexus_Executive_Analytics_Report.txt',
      'Executive Drilling Performance & Risk Benchmark Analytics',
      [
        {
          heading: 'Regional Stratigraphic Composition',
          items: {
            'Tipam Sandstone': '40% of active section volume',
            'Barail Group': '28% of target depth',
            'Girujan Clay': '20% upper casing section',
            'Others': '12%'
          }
        },
        {
          heading: 'Well Performance Benchmark (ROP vs NPT)',
          items: [
            'OIL-DK-105: ROP 12.4 m/hr | NPT 2.1 hrs (Best in Dikom Field)',
            'OIL-DK-04: ROP 10.8 m/hr | NPT 5.4 hrs',
            'OIL-DK-08: ROP 13.1 m/hr | NPT 1.8 hrs'
          ]
        },
        {
          heading: 'Subsurface Heatmap Summary',
          items: 'Tipam Sandstone formation exhibits the highest cumulative risk score due to recurring fracture porosity and fluid loss events.'
        }
      ]
    );

    if (showToast) showToast('Exported Executive Analytics Report!', 'success');
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        
        {/* Title Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold text-orange-600 uppercase tracking-wider mb-0.5">EXECUTIVE DECISION ENGINE</div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Analytics</h1>
          </div>
          <button
            onClick={handleExportAnalytics}
            className="btn-primary-industrial text-xs bg-gradient-to-r from-orange-500 to-orange-600"
          >
            <i className="fas fa-download"></i> Export Analytics Report
          </button>
        </div>

        {/* 2x2 Grid Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* 1. Formation Composition Donut Chart */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Formation Composition</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formationCompositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {formationCompositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Well Comparison Bar Chart */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Well Comparison (ROP vs NPT)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wellComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="well" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rop" name="ROP (m/hr)" fill="#F97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="NPT" name="NPT (hrs)" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Event Frequency Line Chart */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Event Frequency</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={eventFrequencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mudLoss" name="Mud Loss" stroke="#F97316" strokeWidth={2} />
                  <Line type="monotone" dataKey="stuckPipe" name="Stuck Pipe" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="cementing" name="Cementing" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. Risk Heatmap Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Risk Heatmap</h3>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold">
              <div className="p-4 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200">
                <p className="text-xs uppercase text-emerald-700 font-semibold mb-1">Girujan</p>
                <p className="text-base font-black">Low Risk</p>
              </div>
              <div className="p-4 bg-amber-100 text-amber-800 rounded-lg border border-amber-200">
                <p className="text-xs uppercase text-amber-700 font-semibold mb-1">Barail</p>
                <p className="text-base font-black">Med Risk</p>
              </div>
              <div className="p-4 bg-red-100 text-red-800 rounded-lg border border-red-200">
                <p className="text-xs uppercase text-red-700 font-semibold mb-1">Tipam</p>
                <p className="text-base font-black">High Risk</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
              <p className="font-bold text-slate-900 mb-1">Heatmap Summary:</p>
              <p>Tipam Sandstone formation exhibits the highest cumulative risk score due to recurring fracture porosity and fluid loss events.</p>
            </div>
          </div>

        </div>

      </div>
    </ConsoleLayout>
  );
}
