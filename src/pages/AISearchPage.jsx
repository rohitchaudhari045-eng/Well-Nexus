import React, { useState } from 'react';
import ConsoleLayout from '../components/ConsoleLayout';
import { queryAIKnowledgeBase } from '../services/firebaseService';

export default function AISearchPage() {
  const [query, setQuery] = useState('Show mud loss incidents near current well');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const suggestedQueries = [
    'Show stuck pipe events in Tipam formation',
    'What happened at depth 2790m in nearby well Dikom-098?',
    'Provide recommended LCM pill formulation for Tipam Sandstone',
    'Summarize offset well lessons learned for 12-1/4 inch casing section'
  ];

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    const result = await queryAIKnowledgeBase(query);
    setSearchResult(result);
    setIsSearching(false);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        
        {/* Title Header */}
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">NATURAL LANGUAGE INTELLIGENCE</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-300">
              Firebase Firestore Query Engine
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Knowledge Search</h1>
        </div>

        {/* Main Search Bar Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <div className="relative flex-1">
              <i className="fas fa-sparkles absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-500 text-sm"></i>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything about past well logs, incidents, or formation risks..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
              />
            </div>
            <button type="submit" disabled={isSearching} className="btn-primary-industrial py-3 px-6 text-sm flex items-center gap-2">
              {isSearching ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
              <span>Search</span>
            </button>
          </form>

          {/* Suggested Queries Chips */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-2">Suggested enterprise queries:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(q);
                    setIsSearching(true);
                    queryAIKnowledgeBase(q).then(res => {
                      setSearchResult(res);
                      setIsSearching(false);
                    });
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 border border-slate-200 text-slate-700 text-xs font-semibold rounded-full transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Response Section powered by Firebase Firestore */}
        {searchResult && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center font-black shrink-0 shadow-md shadow-orange-500/30">
                <i className="fas fa-robot text-base"></i>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">AI Synthesized Response from Firebase</h3>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded border border-emerald-200">
                    Live Firestore Match
                  </span>
                </div>
                
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {searchResult.summary}
                </p>

                {/* Key Insights Box */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block font-semibold">Formation Target:</span>
                    <span className="font-bold text-slate-900">Tipam Sandstone (2750m - 2850m)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">Primary Hazard Cause:</span>
                    <span className="font-bold text-red-600">{searchResult.primaryCause || 'Fracture porosity & fluid loss'}</span>
                  </div>
                </div>

                {/* Recommended Actions */}
                {searchResult.recommendedActions && (
                  <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 space-y-2">
                    <h4 className="text-xs font-bold text-orange-900 uppercase tracking-wider flex items-center gap-1.5">
                      <i className="fas fa-circle-check text-orange-600"></i> Recommended Field Mitigation Protocols:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-800">
                      {searchResult.recommendedActions.map((act, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Historical Case Detail */}
                {searchResult.historicalCase && (
                  <div className="p-3.5 bg-slate-900 text-white rounded-lg text-xs font-mono leading-relaxed">
                    <span className="text-orange-400 font-bold block mb-1">HISTORICAL CASE SUMMARY:</span>
                    {searchResult.historicalCase}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </ConsoleLayout>
  );
}
