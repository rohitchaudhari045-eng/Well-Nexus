import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileModal from './ProfileModal';
import AiCopilotDrawer from './AiCopilotDrawer';
import KnowledgeGraphModal from './KnowledgeGraphModal';

export default function ConsoleLayout({ children, showToast, telemetry }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userRole, logout } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isGraphOpen, setIsGraphOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-grid-2-plus' },
    { path: '/nearby-wells', label: 'Nearby Wells', icon: 'fas fa-map-location-dot' },
    { path: '/active-well', label: 'Active Well', icon: 'fas fa-compass' },
    { path: '/ai-search', label: 'AI Search', icon: 'fas fa-sparkles' },
    { path: '/formation-correlation', label: 'Stratigraphy', icon: 'fas fa-layer-group' },
    { path: '/risk-analytics', label: 'Risk Engine', icon: 'fas fa-shield-halved' },
    { path: '/alerts', label: 'Alerts', icon: 'fas fa-bell', badge: '5' },
    { path: '/repository', label: 'Repository', icon: 'fas fa-database' },
    { path: '/document', label: 'Doc Intel', icon: 'fas fa-file-invoice' },
    { path: '/analytics', label: 'Analytics', icon: 'fas fa-chart-pie' },
    { path: '/admin', label: 'Admin Panel', icon: 'fas fa-user-shield' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/ai-search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between shrink-0 shadow-xl border-r border-slate-800">
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black shadow-md shadow-orange-500/30">
                <i className="fas fa-oil-well text-lg"></i>
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight block leading-none">WellNexus</span>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mt-0.5">OIL INDIA ENTERPRISE</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 font-extrabold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${item.icon} text-sm w-5 text-center ${isActive ? 'text-white' : 'text-orange-400'}`}></i>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-500 text-white shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <div className="flex items-center justify-between mb-3">
            <div
              className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
              onClick={() => setIsProfileOpen(true)}
              title="Click to edit profile settings"
            >
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-extrabold text-xs shadow-md">
                <i className="fas fa-user-gear"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Er. Engineer'}</p>
                <p className="text-[10px] text-orange-400 truncate font-semibold">{userRole?.split(' ')[0] || 'Senior Engineer'}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout of session"
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
            >
              <i className="fas fa-right-from-bracket text-sm"></i>
            </button>
          </div>

          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1.5"
          >
            <i className="fas fa-sliders text-orange-400"></i> Edit Profile & Settings
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-xs">
          
          <div className="flex items-center gap-3">
            {/* Back to Home Page Button */}
            <button
              onClick={() => navigate('/')}
              title="Return to Main Landing Home Page"
              className="px-3 py-1.5 bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-600 border border-slate-200 hover:border-orange-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <i className="fas fa-house text-orange-500"></i> Home Page
            </button>

            {/* Global Search Input */}
            <form onSubmit={handleGlobalSearch} className="relative w-72 hidden md:block">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Search wells, incidents, risks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-800 placeholder-slate-400 font-medium"
              />
            </form>
          </div>

          {/* Right Header Status Bar */}
          <div className="flex items-center gap-2.5">
            
            {/* Knowledge Graph Trigger */}
            <button
              onClick={() => setIsGraphOpen(true)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-orange-400 border border-slate-800 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
              title="Open Knowledge Graph Modal"
            >
              <i className="fas fa-circle-nodes text-orange-500"></i>
              <span className="hidden lg:inline">Knowledge Graph</span>
            </button>

            {/* Active Well Indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium">
              <span className="text-slate-500 font-semibold">Active Rig:</span>
              <span className="font-bold text-slate-900">OIL-DK-105</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded text-[10px] uppercase tracking-wide">
                Drilling
              </span>
            </div>

            {/* Live Firebase Sync Badge */}
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-lg border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Firebase Live
            </span>

            {/* Notification Bell */}
            <button
              onClick={() => navigate('/alerts')}
              title="Open Alerts Center"
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              <i className="fas fa-bell text-base"></i>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* AI Copilot Trigger Button */}
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs rounded-lg shadow-md shadow-orange-500/20 transition flex items-center gap-1.5"
              title="Open AI Drilling Copilot"
            >
              <i className="fas fa-robot text-sm"></i>
              <span>AI Copilot</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-bold transition flex items-center"
              title="Logout from session"
            >
              <i className="fas fa-right-from-bracket"></i>
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {children}
        </main>
      </div>

      {/* Floating Bottom-Right AI Copilot Launch Button */}
      <button
        onClick={() => setIsCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 hover:scale-105 text-white shadow-2xl flex items-center justify-center text-xl transition-all duration-200 border-2 border-white/20 animate-bounce"
        title="Launch AI Drilling Copilot Assistant"
      >
        <i className="fas fa-robot"></i>
      </button>

      {/* Global Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        showToast={showToast}
      />

      {/* AI Copilot Slide-Over Drawer */}
      <AiCopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        telemetry={telemetry}
      />

      {/* Knowledge Graph Modal */}
      <KnowledgeGraphModal
        isOpen={isGraphOpen}
        onClose={() => setIsGraphOpen(false)}
      />

    </div>
  );
}
