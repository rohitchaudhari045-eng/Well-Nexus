import React, { useState, useEffect, useRef } from 'react';
import { wellNexusData } from '../data/wellNexusData';

export default function AiCopilotDrawer({ isOpen, onClose, telemetry }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hello! I am your AI Drilling Copilot powered by Oil India Limited's RAG Knowledge Engine. I have indexed historical DDRs, mud logs, formation logs, and 1,000+ offset wells.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['OIL Institutional Memory DB v4.2', 'eRTMAC Real-time Stream']
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  const quickPrompts = [
    "Why is torque increasing near 2,785m?",
    "Show mud loss incidents in Tipam Sandstone",
    "What happened in nearby wells within 10km?",
    "Mitigation steps for stuck pipe in Barail Formation"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsThinking(true);

    // AI Response Simulation with evidence-backed RAG answers
    setTimeout(() => {
      let aiText = "";
      let sources = [];

      const qLower = query.toLowerCase();

      if (qLower.includes('torque') || qLower.includes('2785') || qLower.includes('increasing')) {
        aiText = `Based on historical correlation with offset well OIL-DK-98 (2.4 km away), torque spikes between 2,750m - 2,820m are caused by interbedded sticky shale sections in Tipam Sandstone. Torque currently reads ${telemetry?.torque || 16.8} kN·m. 

**Recommended Actions:**
1. Sweep hole with 5m³ high-viscosity pill.
2. Maintain mud weight at 1.28 - 1.30 SG.
3. Ream back up 15 meters to clear accumulated cutting beds.`;
        sources = ['DDR-OIL-DK98-2023.pdf (Page 14)', 'Mud Log #402 - Tipam Formation', 'eRTMAC Offset Risk Matrix'];
      } else if (qLower.includes('mud loss') || qLower.includes('tipam')) {
        aiText = `Tipam Sandstone formation exhibits high micro-fracture permeability in 4 out of 6 nearby offset wells. Total mud loss recorded in offset well OIL-DK-102 was 45 m³ at 2,790m depth.

**Mitigation History:**
- LCM pill with 25 lb/bbl Mica & Nutplug successfully healed total loss in 3.5 hours.
- Controlled ROP to < 12 m/hr while penetrating loss zone.`;
        sources = ['Well Completion Report OIL-DK102.pdf', 'Geological Survey Assam Shelf #12'];
      } else if (qLower.includes('nearby') || qLower.includes('10km')) {
        aiText = `There are 4 active and historical wells within a 10km radius of active rig OIL-DK-105:
1. **OIL-DK-98** (2.4 km NW) - Completed. Historical issue: High Torque at 2,785m.
2. **OIL-DK-102** (4.1 km E) - Producing. Historical issue: Severe Mud Loss at 2,790m.
3. **OIL-DK-110** (6.8 km SE) - Drilling. Current Depth: 3,120m.
4. **OIL-DK-85** (9.2 km SW) - Abandoned due to stuck pipe at 3,450m (Barail Formation).`;
        sources = ['NWIS GIS Spatial Database', 'Oil India Field Registry 2025'];
      } else if (qLower.includes('stuck pipe') || qLower.includes('barail')) {
        aiText = `Barail Formation (depth range 3,100m - 3,500m) has high differential sticking potential due to overpressured permeable sands and high ECD.

**Best Practices from Historical Incidents:**
- Maintain pipe rotation at > 120 RPM continuously.
- Perform short trips every 100 meters.
- Add 3% glycol / lubricant to synthetic oil-based mud system.`;
        sources = ['Lesons Learned Database #LL-2024-88', 'Barail Reservoir Engineering Manual'];
      } else {
        aiText = `RAG Analysis complete for query: "${query}". 

Analyzed 1,024 synthetic well records and 5,400+ operational log entries. No critical anomaly detected for current formation (${wellNexusData.currentWell.formation}), but monitor ECD closely as depth approaches 2,800m.`;
        sources = ['NWIS Vector Embedding Index', 'Oil India Knowledge Base v4'];
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 text-slate-100 h-full shadow-2xl flex flex-col border-l border-slate-800">
        
        {/* Drawer Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md">
              <i className="fas fa-robot text-lg"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">AI Drilling Copilot</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-widest">
                  RAG v4.2
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Oil India Institutional Memory System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Live Rig Telemetry Bar */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Rig: <strong className="text-white">OIL-DK-105</strong></span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 font-semibold">
            <span>MD: <strong className="text-orange-400">{telemetry?.depth || 2785.4} m</strong></span>
            <span>Torque: <strong className="text-amber-400">{telemetry?.torque || 16.8} kN·m</strong></span>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.text}</div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-700/80 text-[10px] text-slate-400">
                    <span className="font-extrabold text-orange-400 block mb-1 uppercase tracking-wider">Verified Sources:</span>
                    <ul className="list-disc pl-3.5 space-y-0.5">
                      {msg.sources.map((src, i) => (
                        <li key={i} className="hover:text-slate-200 transition cursor-pointer">{src}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-orange-400 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 w-fit">
              <i className="fas fa-spinner fa-spin text-sm"></i>
              <span className="font-semibold">Retrieving embeddings from Vector DB & analyzing offset wells...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts Container */}
        <div className="p-3 bg-slate-950/70 border-t border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Suggested Operational Queries:</p>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[11px] bg-slate-800 hover:bg-orange-500/20 hover:text-orange-300 hover:border-orange-500/40 border border-slate-700 text-slate-300 px-2.5 py-1.5 rounded-lg transition text-left font-medium"
              >
                <i className="fas fa-lightbulb text-amber-400 mr-1.5"></i>
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Copilot about formation risks, offset wells, or DDRs..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-orange-500 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-orange-500/20"
            >
              <span>Ask</span>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
