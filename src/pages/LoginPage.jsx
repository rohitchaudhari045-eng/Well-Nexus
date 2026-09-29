import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('drilling.engineer@oilindia.in');
  const [password, setPassword] = useState('OilIndia#2025');
  const [role, setRole] = useState('Senior Drilling Engineer (Oil India Limited)');
  const [empId, setEmpId] = useState('OIL-ENG-8492');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password, role);
        if (onLoginSuccess) {
          onLoginSuccess({ empId, role, email });
        }
      } else {
        await register(email, password, role);
        if (onLoginSuccess) {
          onLoginSuccess({ empId, role, email });
        }
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Firebase Auth error:', err);
      setErrorMsg(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const setQuickDemo = (demoType) => {
    if (demoType === 'engineer') {
      setEmail('drilling.engineer@oilindia.in');
      setEmpId('OIL-ENG-8492');
      setRole('Senior Drilling Engineer (Oil India Limited)');
    } else if (demoType === 'geologist') {
      setEmail('geologist.lead@oilindia.in');
      setEmpId('OIL-GEO-3310');
      setRole('Subsurface Geologist');
    } else if (demoType === 'hackathon') {
      setEmail('judge.sih2025@oilindia.in');
      setEmpId('SIH-JUDGE-01');
      setRole('SIH 2025 Hackathon Judge');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 lg:p-8 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-2xl border border-slate-700 shadow-2xl overflow-hidden grid lg:grid-cols-2">
        
        {/* Left Image Container - Matching Home Page Hero Picture */}
        <div className="relative bg-slate-950 text-white p-10 flex flex-col justify-between overflow-hidden group">
          <img
            src="/hero-rig.jpg"
            alt="Offshore Oil Drilling Platform at Sunset"
            className="absolute inset-0 w-full h-full object-cover opacity-60 transform group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30"></div>

          {/* Top Brand Tag */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white shadow-lg shadow-orange-500/40 border border-orange-400/30">
                <i className="fas fa-oil-well text-xl"></i>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white block leading-none">WellNexus</span>
                <span className="text-[10px] font-bold text-orange-400 tracking-wider uppercase">Oil India Enterprise Node</span>
              </div>
            </div>
          </div>

          {/* Hero Content Overlay matching Home Page */}
          <div className="relative z-10 my-auto py-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full border border-orange-500/40 mb-4 uppercase tracking-wider backdrop-blur-md">
              <i className="fas fa-shield-halved"></i> Enterprise Authentication Node
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-3 text-white drop-shadow-md">
              AI-Powered Nearby Wells Intelligence System
            </h1>
            <p className="text-slate-200 text-sm font-medium leading-relaxed drop-shadow">
              Smarter decisions. Safer operations. Greater efficiency.
            </p>

            {/* Dikom Field Status Pill matching Home Page */}
            <div className="mt-6 bg-slate-900/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between shadow-xl">
              <div>
                <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">Active Monitoring</p>
                <p className="text-xs font-bold text-white">Dikom Field - Well OG-06-105</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> WITSML Feed
              </span>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
            <span>Oil India Limited Operations Node</span>
            <button onClick={() => navigate('/')} className="text-orange-400 hover:underline font-bold flex items-center gap-1 text-[11px]">
              <i className="fas fa-house"></i> Home Page
            </button>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="p-8 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Mode Switcher */}
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {mode === 'login' ? 'Welcome Back' : 'Create Engineer Account'}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {mode === 'login' ? 'Sign in to access operational drilling intelligence' : 'Register a new Oil India engineer account'}
                </p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`px-3 py-1 rounded-md transition ${mode === 'login' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`px-3 py-1 rounded-md transition ${mode === 'register' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Register
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <i className="fas fa-circle-exclamation text-red-500"></i>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@oilindia.in"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Employee ID
                </label>
                <div className="relative">
                  <i className="fas fa-id-card absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input
                    type="text"
                    required
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    placeholder="OIL-ENG-8492"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Enterprise Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium"
                >
                  <option value="Senior Drilling Engineer (Oil India Limited)">Senior Drilling Engineer</option>
                  <option value="Subsurface Geologist">Subsurface Geologist</option>
                  <option value="Toolpusher / Rig Company Man">Toolpusher / Rig Company Man</option>
                  <option value="SIH 2025 Hackathon Judge">SIH 2025 Hackathon Judge</option>
                </select>
              </div>

              {/* Quick Demo Profiles */}
              <div className="pt-1">
                <p className="text-[11px] font-bold text-slate-500 mb-1.5">Quick Demo Logins:</p>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setQuickDemo('engineer')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 rounded font-semibold text-slate-700"
                  >
                    Drilling Engineer
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDemo('geologist')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 rounded font-semibold text-slate-700"
                  >
                    Geologist
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDemo('hackathon')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 rounded font-semibold text-slate-700"
                  >
                    Hackathon Judge
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition transform hover:-translate-y-0.5 text-xs flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Authenticating Credentials...
                  </>
                ) : (
                  <>
                    <i className="fas fa-shield-halved"></i> {mode === 'login' ? 'Secure Enterprise Login' : 'Register Account'}
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-around text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1.5"><i className="fas fa-shield-check text-emerald-500"></i> Encrypted Session</span>
            <span className="flex items-center gap-1.5"><i className="fas fa-user-gear text-blue-500"></i> Role Based Access</span>
            <span className="flex items-center gap-1.5"><i className="fas fa-tower-cell text-orange-500"></i> OIL Node Operations</span>
          </div>
        </div>

      </div>
    </div>
  );
}
