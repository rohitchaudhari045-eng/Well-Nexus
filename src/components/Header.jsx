import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileModal from './ProfileModal';

export default function Header({ showToast }) {
  const navigate = useNavigate();
  const { currentUser, userRole, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navTabs = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
    { path: '/nearby-wells', label: 'Nearby Wells', icon: 'fas fa-map-marked-alt' },
    { path: '/active-well', label: 'Active Well', icon: 'fas fa-compass' },
    { path: '/ai-search', label: 'AI Intel Search', icon: 'fas fa-robot' },
    { path: '/repository', label: 'Repository', icon: 'fas fa-database' },
    { path: '/risk-analytics', label: 'Risk Engine', icon: 'fas fa-shield-halved' },
    { path: '/formation-correlation', label: 'Stratigraphy', icon: 'fas fa-layer-group' },
    { path: '/alerts', label: 'Alerts', icon: 'fas fa-bell', badge: '5' },
    { path: '/document', label: 'Doc Intel', icon: 'fas fa-file-pdf' },
    { path: '/analytics', label: 'Analytics', icon: 'fas fa-chart-pie' }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Brand Logo & Co-Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              title="Back to Landing Home Page"
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-orange-500/20 text-slate-300 hover:text-orange-400 border border-slate-700 hover:border-orange-500/40 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <i className="fas fa-house"></i> Home
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
              <div style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', color: '#FFF', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.1rem', boxShadow: '0 0 15px rgba(249,115,22,0.4)' }}>
                <i className="fas fa-oil-well"></i>
              </div>
              <div className="hidden sm:block">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#F8FAFC', letterSpacing: '-0.03em' }}>WELLNEXUS</span>
                  <span className="navbar-brand-badge">ENTERPRISE</span>
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Firebase Live
                  </span>
                </div>
                <div style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: '500' }}>OIL INDIA LIMITED | SIH 2025</div>
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto' }}>
            {navTabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) => `nav-tab-btn ${isActive ? 'active' : ''}`}
              >
                <i className={tab.icon}></i> {tab.label}
                {tab.badge && (
                  <span style={{ background: '#EF4444', color: '#FFF', borderRadius: '999px', fontSize: '0.65rem', padding: '1px 6px', marginLeft: '2px' }}>
                    {tab.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User Profile & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="btn-secondary-industrial text-xs flex items-center gap-2 border-orange-500/30 hover:border-orange-500"
              title="Edit Profile Settings"
            >
              <i className="fas fa-user-circle text-orange-500"></i>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[11px] font-bold text-slate-100">{currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Engineer'}</span>
                <span className="text-[9px] text-orange-400 font-semibold truncate max-w-[120px]">{userRole?.split(' ')[0] || 'Senior Engineer'}</span>
              </div>
            </button>

            <button
              className="btn-secondary-industrial"
              onClick={handleLogout}
              title="Sign Out"
              style={{ padding: '6px 10px', fontSize: '0.8rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#F87171' }}
            >
              <i className="fas fa-right-from-bracket"></i>
            </button>

            <button
              className="mobile-menu-btn btn-secondary-industrial"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ padding: '6px 10px', fontSize: '1rem', display: 'none' }}
              aria-label="Toggle Navigation Menu"
            >
              <i className={mobileMenuOpen ? "fas fa-xmark" : "fas fa-bars"}></i>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div style={{ background: '#0F172A', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navTabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `nav-tab-btn ${isActive ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
              >
                <i className={tab.icon} style={{ width: '20px' }}></i> {tab.label}
                {tab.badge && (
                  <span style={{ background: '#EF4444', color: '#FFF', borderRadius: '999px', fontSize: '0.65rem', padding: '1px 6px', marginLeft: 'auto' }}>
                    {tab.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        showToast={showToast}
      />
    </>
  );
}
