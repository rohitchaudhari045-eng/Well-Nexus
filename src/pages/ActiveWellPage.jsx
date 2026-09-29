import React, { useState } from 'react';
import ConsoleLayout from '../components/ConsoleLayout';
import { wellNexusData } from '../data/wellNexusData';

export default function ActiveWellPage({ telemetry }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Trajectory', 'Formation', 'Hydraulics', 'Timeline', 'Incidents'];

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold text-orange-600 uppercase tracking-wider mb-0.5">ACTIVE WELL CONSOLE</div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Active Well - {wellNexusData.currentWell.name}</h1>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-lg text-xs font-semibold">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md transition ${activeTab === tab ? 'bg-orange-500 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column: 2D Radar Trajectory Simulation Canvas */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative flex flex-col justify-between min-h-[500px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">Spatial Radar Offset Correlation</h3>
                <span className="text-xs text-slate-500 font-medium">5km Radius Scan</span>
              </div>

              {/* Radar Grid Graphic */}
              <div className="relative w-full h-[380px] bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                {/* Concentric Circles */}
                <div className="absolute w-[320px] h-[320px] rounded-full border border-orange-500/20"></div>
                <div className="absolute w-[220px] h-[220px] rounded-full border border-orange-500/30"></div>
                <div className="absolute w-[120px] h-[120px] rounded-full border border-orange-500/40"></div>
                
                {/* Crosshair Lines */}
                <div className="absolute w-full h-[1px] bg-orange-500/20"></div>
                <div className="absolute h-full w-[1px] bg-orange-500/20"></div>

                {/* Risk Hazard Area Overlay */}
                <div className="absolute top-16 right-20 w-32 h-32 rounded-full bg-red-500/20 border border-red-500/40 animate-pulse"></div>

                {/* Active Center Well Marker */}
                <div className="absolute z-20 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white shadow-lg shadow-orange-500/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-[10px] font-black text-white bg-orange-600 px-1.5 py-0.5 rounded mt-1 shadow-sm">
                    {wellNexusData.currentWell.name}
                  </span>
                </div>

                {/* Offset Well Markers */}
                <div className="absolute top-24 left-32 z-10 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-orange-400"></div>
                  <span className="text-[9px] font-bold text-slate-300 bg-slate-900/90 px-1 py-0.5 rounded mt-0.5">DK-04</span>
                </div>

                <div className="absolute bottom-28 right-36 z-10 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-orange-400"></div>
                  <span className="text-[9px] font-bold text-slate-300 bg-slate-900/90 px-1 py-0.5 rounded mt-0.5">DK-08</span>
                </div>

                <div className="absolute top-20 right-28 z-10 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
                  <span className="text-[9px] font-bold text-white bg-red-600 px-1 py-0.5 rounded mt-0.5">Hazard Zone</span>
                </div>
              </div>
            </div>

            {/* Radar Legend Pill */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-around text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Current Well</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-800 border border-orange-400"></span> Offset Well</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"></span> Risk Zone</span>
            </div>
          </div>

          {/* Right Column: Well Profile Card & Recent Events */}
          <div className="space-y-6">
            
            {/* Well Profile Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <i className="fas fa-tower-cell text-orange-500"></i> Well Profile
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Well Type</span>
                  <span className="font-bold text-slate-900">Vertical</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Total Depth</span>
                  <span className="font-bold text-slate-900">3120 m</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Current Depth</span>
                  <span className="font-bold text-orange-600">2785 m</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Water Depth</span>
                  <span className="font-bold text-slate-900">54 m</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Casing</span>
                  <span className="font-bold text-slate-900">9 5/8"</span>
                </div>
              </div>
            </div>

            {/* Recent Events Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <i className="fas fa-history text-orange-500"></i> Recent Events
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-red-50 border border-red-100">
                  <div>
                    <p className="font-bold text-red-900">Mud loss detected</p>
                    <p className="text-[11px] text-red-700">12 Sep 14:10</p>
                  </div>
                  <span className="px-2 py-0.5 bg-red-200 text-red-800 text-[10px] font-bold rounded">High</span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                  <div>
                    <p className="font-bold text-emerald-900">ROP increased to 12.4 m/hr</p>
                    <p className="text-[11px] text-emerald-700">12 Sep 12:30</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-200 text-emerald-800 text-[10px] font-bold rounded">Normal</span>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-blue-50 border border-blue-100">
                  <div>
                    <p className="font-bold text-blue-900">Formation change - Tipam</p>
                    <p className="text-[11px] text-blue-700">11 Sep 11:45</p>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-[10px] font-bold rounded">Info</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </ConsoleLayout>
  );
}
