import React, { useState } from 'react';

export default function KnowledgeGraphModal({ isOpen, onClose }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('All');

  // Synthetic Knowledge Graph Nodes
  const nodes = [
    { id: 'well-105', label: 'Active Rig: OIL-DK-105', type: 'Well', color: '#F97316', icon: 'fa-oil-well', details: 'Depth 2,785m | Tipam Sandstone | Active Drilling' },
    { id: 'well-98', label: 'Offset: OIL-DK-98', type: 'Well', color: '#3B82F6', icon: 'fa-location-dot', details: '2.4km NW | Completed 2023 | Max Depth 3,450m' },
    { id: 'well-102', label: 'Offset: OIL-DK-102', type: 'Well', color: '#3B82F6', icon: 'fa-location-dot', details: '4.1km East | Producing | Mud Loss at 2,790m' },
    { id: 'fmt-tipam', label: 'Tipam Sandstone', type: 'Formation', color: '#10B981', icon: 'fa-layer-group', details: 'Permeability 140 mD | Micro-fractured | High Loss Zone' },
    { id: 'fmt-barail', label: 'Barail Formation', type: 'Formation', color: '#10B981', icon: 'fa-layer-group', details: 'Overpressured Sandstone | High Sticking Risk' },
    { id: 'evt-mudloss', label: 'Event: Mud Loss', type: 'Event', color: '#EF4444', icon: 'fa-triangle-exclamation', details: 'Recorded 45 m³ loss in DK-102 at 2,790m' },
    { id: 'evt-high-torque', label: 'Event: High Torque Spikes', type: 'Event', color: '#F59E0B', icon: 'fa-gears', details: 'Torque > 18.5 kN·m observed in sticky shale beds' },
    { id: 'eq-pdm', label: 'Equipment: PDM Motor 6-3/4"', type: 'Equipment', color: '#8B5CF6', icon: 'fa-wrench', details: 'High-torque positive displacement motor' },
    { id: 'mit-lcm', label: 'Mitigation: Mica + Nutplug Pill', type: 'Mitigation', color: '#06B6D4', icon: 'fa-shield-check', details: '25 lb/bbl LCM pill healed total loss in 3.5 hrs' },
    { id: 'rep-ddr98', label: 'Report: DDR-OIL-DK98.pdf', type: 'Report', color: '#64748B', icon: 'fa-file-pdf', details: 'Daily Drilling Report Dated Oct 14, 2023' },
  ];

  // Synthetic Knowledge Graph Edges (Relationships)
  const edges = [
    { source: 'well-105', target: 'fmt-tipam', label: 'Penetrating' },
    { source: 'well-98', target: 'fmt-tipam', label: 'Drilled Through' },
    { source: 'well-102', target: 'fmt-tipam', label: 'Drilled Through' },
    { source: 'well-102', target: 'evt-mudloss', label: 'Experienced' },
    { source: 'well-98', target: 'evt-high-torque', label: 'Experienced' },
    { source: 'evt-mudloss', target: 'mit-lcm', label: 'Mitigated By' },
    { source: 'well-105', target: 'eq-pdm', label: 'Utilizing' },
    { source: 'rep-ddr98', target: 'well-98', label: 'Documents' },
    { source: 'fmt-tipam', target: 'fmt-barail', label: 'Overlies' },
  ];

  const nodeTypes = ['All', 'Well', 'Formation', 'Event', 'Equipment', 'Mitigation', 'Report'];

  const filteredNodes = filterType === 'All' ? nodes : nodes.filter(n => n.type === filterType);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center text-lg font-bold">
              <i className="fas fa-circle-nodes"></i>
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white">Subsurface Knowledge Graph</h2>
              <p className="text-xs text-slate-400 font-medium">Module 15 — Entity Relationships & Institutional Memory Graph</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Node Category:</span>
            <div className="flex flex-wrap gap-1">
              {nodeTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    filterType === type
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs text-slate-400 font-semibold">
            Showing <strong className="text-orange-400">{filteredNodes.length}</strong> Entities & <strong className="text-amber-400">{edges.length}</strong> Semantic Connections
          </div>
        </div>

        {/* Graph Body Area */}
        <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto min-h-[420px]">
          
          {/* Interactive Graph Representation Grid */}
          <div className="lg:col-span-2 bg-slate-950/80 rounded-xl border border-slate-800 p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center justify-between">
              <span>Interactive Knowledge Nodes</span>
              <span className="text-[10px] text-orange-400 font-normal"><i className="fas fa-hand-pointer mr-1"></i> Click node to inspect relationships</span>
            </div>

            {/* Nodes Layout Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-auto">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ borderColor: node.color }}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 transform hover:-translate-y-1 shadow-lg ${
                      isSelected
                        ? 'bg-slate-800 ring-2 ring-orange-500 scale-105'
                        : 'bg-slate-900/90 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
                        style={{ backgroundColor: node.color }}
                      >
                        <i className={`fas ${node.icon}`}></i>
                      </div>
                      <span className="text-xs font-bold text-white truncate">{node.label}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                        {node.type}
                      </span>
                      <i className="fas fa-chevron-right text-[10px] text-slate-500"></i>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subsurface Connections Legend */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Active Well</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Offset Well</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Formation</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Incident Event</span>
            </div>
          </div>

          {/* Node Detail & Relationship Sidebar */}
          <div className="bg-slate-950/90 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-black shadow-md"
                    style={{ backgroundColor: selectedNode.color }}
                  >
                    <i className={`fas ${selectedNode.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">{selectedNode.label}</h4>
                    <span className="text-[11px] font-bold text-orange-400">{selectedNode.type} Entity</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-white block mb-1">Entity Details:</span>
                  <p>{selectedNode.details}</p>
                </div>

                {/* Related Edges */}
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Connected Knowledge Links:</h5>
                  <div className="space-y-2">
                    {edges
                      .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                      .map((edge, idx) => {
                        const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                        const otherNode = nodes.find(n => n.id === otherId);
                        return (
                          <div key={idx} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs flex items-center justify-between">
                            <span className="text-slate-400 font-medium">{edge.label}:</span>
                            <span className="font-bold text-white flex items-center gap-1.5">
                              <i className={`fas ${otherNode?.icon} text-[10px] text-orange-400`}></i>
                              {otherNode?.label}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <i className="fas fa-diagram-project text-4xl mb-3 text-slate-700"></i>
                <p className="text-xs font-bold text-slate-400 mb-1">Select any Graph Node</p>
                <p className="text-[11px] text-slate-500 max-w-xs">Click any node on the left graph to inspect deep subsurface relationships & historical DDR linkages.</p>
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-6 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
            >
              Close Graph Inspector
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
