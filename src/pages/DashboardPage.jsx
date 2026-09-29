import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import ConsoleLayout from '../components/ConsoleLayout';
import {
  subscribeToAlerts,
  subscribeToIncidents,
  updateLiveTelemetry
} from '../services/firebaseService';

// Mock Recharts dataset matching reference image
const depthVsTorqueData = [
  { depth: '2100m', depthVal: 2100, torque: 32, optTorque: 28 },
  { depth: '2200m', depthVal: 2200, torque: 35, optTorque: 30 },
  { depth: '2300m', depthVal: 2300, torque: 38, optTorque: 32 },
  { depth: '2400m', depthVal: 2400, torque: 42, optTorque: 35 },
  { depth: '2500m', depthVal: 2500, torque: 40, optTorque: 36 },
  { depth: '2600m', depthVal: 2600, torque: 46, optTorque: 38 },
  { depth: '2700m', depthVal: 2700, torque: 48, optTorque: 40 },
];

const pressureTrendsData = [
  { time: '08:00', spp: 3200, ecd: 3100 },
  { time: '09:00', spp: 3300, ecd: 3150 },
  { time: '10:00', spp: 3450, ecd: 3250 },
  { time: '11:00', spp: 3400, ecd: 3200 },
  { time: '12:00', spp: 3500, ecd: 3300 },
  { time: '13:00', spp: 3450, ecd: 3280 },
];

export default function DashboardPage({ telemetry, showToast }) {
  const navigate = useNavigate();

  const [liveAlerts, setLiveAlerts] = useState([]);
  const [incidentsCount, setIncidentsCount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Subscribe to Firebase Alerts & Incidents in real-time
    const unsubscribeAlerts = subscribeToAlerts((alerts) => {
      setLiveAlerts(alerts);
    });

    const unsubscribeIncidents = subscribeToIncidents((incidents) => {
      setIncidentsCount(incidents.length);
    });

    return () => {
      unsubscribeAlerts();
      unsubscribeIncidents();
    };
  }, []);

  const handleManualTelemetryBoost = async () => {
    setIsUpdating(true);
    const newDepth = +(telemetry.depth + 1.5).toFixed(2);
    const newRop = +(telemetry.rop + 2.0).toFixed(1);
    const newTorque = +(telemetry.torque + 1.2).toFixed(1);

    await updateLiveTelemetry({
      currentDepth: newDepth,
      rop: newRop,
      torque: newTorque,
      spp: 2480,
      mudWeight: 1.30
    });

    if (showToast) {
      showToast(`Pushed Live Telemetry Update to Firebase Firestore: Depth ${newDepth}m`, 'success');
    }
    setIsUpdating(false);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        
        {/* Title Header & Live Firebase Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">OPERATIONS DASHBOARD</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Firebase Live Sync
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Real-Time Drilling Intelligence</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleManualTelemetryBoost}
              disabled={isUpdating}
              className="btn-secondary-industrial text-xs border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100"
            >
              <i className="fas fa-arrows-rotate text-orange-600"></i> Push Live Telemetry to Firebase
            </button>
            <button className="btn-secondary-industrial text-xs" onClick={() => navigate('/nearby-wells')}>
              <i className="fas fa-map-location-dot"></i> View GIS Map
            </button>
            <button className="btn-primary-industrial text-xs" onClick={() => navigate('/risk-analytics')}>
              <i className="fas fa-bolt"></i> Run Risk Prediction
            </button>
          </div>
        </div>

        {/* Top KPI Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Current Depth</p>
            <p className="text-2xl font-black text-slate-900">{telemetry.depth.toFixed(1)} <span className="text-xs font-bold text-slate-500">m</span></p>
            <p className="text-[11px] text-slate-500 mt-1">TVD 2580 m</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">ROP</p>
            <p className="text-2xl font-black text-slate-900">{telemetry.rop} <span className="text-xs font-bold text-slate-500">m/hr</span></p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded text-[10px]">Normal</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Torque</p>
            <p className="text-2xl font-black text-slate-900">{telemetry.torque} <span className="text-xs font-bold text-slate-500">kN.m</span></p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-700 font-bold rounded text-[10px]">Elevated</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">SPP</p>
            <p className="text-2xl font-black text-slate-900">{telemetry.spp} <span className="text-xs font-bold text-slate-500">psi</span></p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded text-[10px]">Normal</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Mud Weight</p>
            <p className="text-2xl font-black text-slate-900">{telemetry.mw} <span className="text-xs font-bold text-slate-500">SG</span></p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded text-[10px]">Tipam Window</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/30 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1">Risk Score</p>
            <p className="text-2xl font-black text-amber-600">68%</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-amber-200 text-amber-800 font-bold rounded text-[10px]">Medium</span>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Depth vs Torque Chart */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Depth vs Torque</h3>
              <span className="text-xs text-slate-400 font-medium">Real-time WITSML</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={depthVsTorqueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="depth" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="torque" stroke="#F97316" fill="#FFF7ED" strokeWidth={2} />
                  <Area type="monotone" dataKey="optTorque" stroke="#3B82F6" fill="transparent" strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pressure Trends Chart */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Pressure Trends</h3>
              <span className="text-xs text-slate-400 font-medium">SPP vs ECD</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pressureTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip />
                  <Line type="monotone" dataKey="spp" stroke="#F97316" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="ecd" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Events Feed from Firebase */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">Firebase Live Alerts</h3>
                <button className="text-xs text-orange-600 font-bold hover:underline" onClick={() => navigate('/alerts')}>View all ({liveAlerts.length})</button>
              </div>
              <div className="space-y-3">
                {liveAlerts.slice(0, 4).map((alert, i) => (
                  <div key={alert.id || i} className={`p-2.5 rounded-lg border flex items-start justify-between ${
                    alert.severity === 'Critical' ? 'bg-red-50 border-red-100' :
                    alert.severity === 'High' ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{alert.desc || alert.type}</p>
                      <p className="text-[11px] text-slate-500">{alert.well} | {alert.date || 'Today'}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      alert.severity === 'Critical' ? 'bg-red-200 text-red-800' :
                      alert.severity === 'High' ? 'bg-amber-200 text-amber-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Summary Cards dynamically loaded from Firebase */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-orange-300 transition" onClick={() => navigate('/nearby-wells')}>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nearby Wells</p>
              <p className="text-3xl font-black text-slate-900 mt-1">6</p>
            </div>
            <span className="text-xs font-bold text-orange-600 hover:underline">GIS Map →</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-orange-300 transition" onClick={() => navigate('/repository')}>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Historical Logs</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{incidentsCount || 6}</p>
            </div>
            <span className="text-xs font-bold text-orange-600 hover:underline">Vault →</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-orange-300 transition" onClick={() => navigate('/alerts')}>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Open Alerts</p>
              <p className="text-3xl font-black text-red-600 mt-1">{liveAlerts.length}</p>
            </div>
            <span className="text-xs font-bold text-orange-600 hover:underline">Center →</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-orange-300 transition" onClick={() => navigate('/risk-analytics')}>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Risks</p>
              <p className="text-3xl font-black text-amber-600 mt-1">3</p>
            </div>
            <span className="text-xs font-bold text-orange-600 hover:underline">Predict →</span>
          </div>
        </div>

      </div>
    </ConsoleLayout>
  );
}
