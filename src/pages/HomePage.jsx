import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      
      {/* 1. Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black shadow-md shadow-orange-500/20">
              <i className="fas fa-oil-well text-xl"></i>
            </div>
            <div>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">WellNexus</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#hero" className="text-orange-600 font-bold">Home</a>
            <a href="#capabilities" className="hover:text-slate-900 transition">Features</a>
            <a href="#architecture" className="hover:text-slate-900 transition">Workflow</a>
            <a href="#preview" className="hover:text-slate-900 transition">Platform Preview</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg shadow-md shadow-orange-500/20 transition transform hover:-translate-y-0.5"
            >
              Explore Platform
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-6">
              <i className="fas fa-bolt"></i> Oil India Limited Enterprise Console
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              AI-Powered Nearby Wells Intelligence System
            </h1>
            <p className="text-lg text-slate-300 mb-2 font-medium">
              Smarter decisions. Safer operations. Greater efficiency.
            </p>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed max-w-xl">
              Leverage historical data, AI and real-time insights to minimize risks and optimize drilling operations across offshore and onshore assets.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:to-orange-700 transition transform hover:-translate-y-0.5"
              >
                Explore Platform
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-lg hover:bg-slate-700 transition"
              >
                Login
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
            <img
              src="/hero-rig.jpg"
              alt="Offshore Oil Drilling Platform at Sunset"
              className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/80 flex items-center justify-between">
                <div>
                  <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">Active Monitoring</p>
                  <p className="text-base font-bold text-white">Dikom Field - Well OG-06-105</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                  Live WITSML Feed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Highlight Cards Bar */}
      <section className="bg-white border-y border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <i className="fas fa-brain"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">AI-Powered Analytics</p>
              <p className="text-[11px] text-slate-500">Actionable subsurface insights</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <i className="fas fa-map-location-dot"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Nearby Wells Correlation</p>
              <p className="text-[11px] text-slate-500">Pattern analysis across offset logs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <i className="fas fa-shield-halved"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Risk Prediction</p>
              <p className="text-[11px] text-slate-500">Pre-empt drilling hazards</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <i className="fas fa-bell"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Real-time Alerts</p>
              <p className="text-[11px] text-slate-500">Instant WITSML notifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why WellNexus Stat Grid */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Why WellNexus?</h2>
            <p className="text-slate-600 font-medium">
              A next-gen platform built for oil & gas drilling operations, combining historical data, AI and real-time intelligence.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-center">
              <p className="text-3xl font-black text-orange-600 mb-1">+250</p>
              <p className="text-sm font-bold text-slate-800">Wells Analyzed</p>
              <p className="text-xs text-slate-500 mt-1">Offset geological logs & WCRs</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-center">
              <p className="text-3xl font-black text-orange-600 mb-1">98%</p>
              <p className="text-sm font-bold text-slate-800">Prediction Accuracy</p>
              <p className="text-xs text-slate-500 mt-1">Mud loss & stuck pipe models</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-center">
              <p className="text-3xl font-black text-orange-600 mb-1">60%</p>
              <p className="text-sm font-bold text-slate-800">Faster Decisions</p>
              <p className="text-xs text-slate-500 mt-1">AI automated data extraction</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-center">
              <p className="text-3xl font-black text-orange-600 mb-1">24/7</p>
              <p className="text-sm font-bold text-slate-800">Operations Support</p>
              <p className="text-xs text-slate-500 mt-1">Continuous WITSML monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Platform Capabilities */}
      <section id="capabilities" className="py-16 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Platform Capabilities</h2>
            <p className="text-slate-600 font-medium">End-to-end intelligence suite for subsurface drilling teams</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-500/50 transition">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
                <i className="fas fa-database"></i>
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">Historical Repository</h3>
              <p className="text-xs text-slate-500">Access past well reports & incidents instantly.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-500/50 transition">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
                <i className="fas fa-sparkles"></i>
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">AI Knowledge Search</h3>
              <p className="text-xs text-slate-500">Natural language search across unstructured WCRs.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-500/50 transition">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
                <i className="fas fa-map-location-dot"></i>
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">GIS & Nearby Wells</h3>
              <p className="text-xs text-slate-500">Explore surrounding wells & formation maps.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-500/50 transition">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
                <i className="fas fa-shield-halved"></i>
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">Risk Prediction</h3>
              <p className="text-xs text-slate-500">Predict stuck pipe, mud loss, & overpressure.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-500/50 transition">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-4">
                <i className="fas fa-bell"></i>
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">Real-time Alerts</h3>
              <p className="text-xs text-slate-500">Automated depth-based alert triggers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. System Architecture Workflow */}
      <section id="architecture" className="py-16 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">System Architecture Workflow</h2>
            <p className="text-slate-600 font-medium">How raw geological documents are converted into real-time decision support</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {[
              { title: 'Historical Reports', sub: '(Data Source)', icon: 'fas fa-file-pdf' },
              { title: 'AI Extraction', sub: '(NLP & ML)', icon: 'fas fa-brain' },
              { title: 'Nearby Wells', sub: '(Correlation)', icon: 'fas fa-map-pin' },
              { title: 'Formation Intel', sub: '(Analysis)', icon: 'fas fa-layer-group' },
              { title: 'Risk Prediction', sub: '(Modeling)', icon: 'fas fa-chart-radar' },
              { title: 'Real-time Alerts', sub: '(Notifications)', icon: 'fas fa-bell' },
              { title: 'Decision Support', sub: '(Dashboard)', icon: 'fas fa-desktop' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs relative">
                <div className="w-9 h-9 mx-auto rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm mb-2">
                  <i className={step.icon}></i>
                </div>
                <p className="text-xs font-bold text-slate-900 leading-tight">{step.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom Dark Banner */}
      <footer className="bg-slate-950 text-white py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white">
              <i className="fas fa-oil-well text-xl"></i>
            </div>
            <div>
              <p className="text-xl font-black text-white">WellNexus</p>
              <p className="text-xs text-slate-400">AI-Powered Nearby Wells Intelligence System for Smarter Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
            <i className="fas fa-building-flag text-orange-500 text-lg"></i>
            <div>
              <p className="text-xs font-extrabold text-white uppercase tracking-wider">Oil India Limited</p>
              <p className="text-[11px] text-slate-400">Conceived for Smart India Hackathon 2025</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
