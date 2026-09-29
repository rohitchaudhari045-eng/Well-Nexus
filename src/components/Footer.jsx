import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const footerNavLinks = [
    { label: 'Operations Dashboard', path: '/dashboard' },
    { label: 'GIS Nearby Wells Map', path: '/nearby-wells' },
    { label: 'Active Rig Telemetry', path: '/active-well' },
    { label: 'AI Copilot Search', path: '/ai-search' },
    { label: 'Lessons Learned Repo', path: '/repository' },
    { label: 'Risk Analytics Engine', path: '/risk-analytics' },
    { label: 'Stratigraphy Correlation', path: '/formation-correlation' },
    { label: 'Alerts & Anomalies', path: '/alerts' },
    { label: 'PDF Document Intel', path: '/document' },
    { label: 'Executive Analytics', path: '/analytics' }
  ];

  return (
    <footer style={{ background: '#070B14', color: '#94A3B8', padding: '40px 20px 24px', borderTop: '2px solid #F97316', marginTop: '60px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '32px' }}>
          
          {/* Brand & Purpose */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', color: '#FFF', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1rem', boxShadow: '0 0 12px rgba(249,115,22,0.4)' }}>
                <i className="fas fa-oil-well"></i>
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#F8FAFC', letterSpacing: '-0.02em' }}>WELLNEXUS</div>
                <div style={{ fontSize: '0.68rem', color: '#F97316', fontWeight: '700', textTransform: 'uppercase' }}>OIL INDIA LIMITED | SIH 2025</div>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.6' }}>
              Next-generation Drilling Intelligence Platform for real-time risk mitigation, offset well pattern recognition, WCR/DDR historical document extraction, and mud loss prediction.
            </p>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#F8FAFC', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
              Platform Modules
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem' }}>
              {footerNavLinks.map((link) => (
                <span
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  style={{ color: '#94A3B8', cursor: 'pointer', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={(e) => e.target.style.color = '#F97316'}
                  onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                >
                  <i className="fas fa-chevron-right" style={{ fontSize: '0.6rem', color: '#F97316' }}></i> {link.label}
                </span>
              ))}
            </div>
          </div>

          {/* Node Operational Status */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#F8FAFC', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
              Operational Status
            </h4>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#CBD5E1' }}>WITSML Live Feed:</span>
                <span style={{ color: '#10B981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="pulse-indicator"></span> Operational
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#CBD5E1' }}>GIS Spatial Engine:</span>
                <span style={{ color: '#10B981', fontWeight: '700' }}>Active (6 Wells)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#CBD5E1' }}>AI Neural Inference:</span>
                <span style={{ color: '#F97316', fontWeight: '700' }}>v4.2-OIL-Model</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '0.78rem', color: '#64748B' }}>
          <div>
            © 2025 Oil India Limited & Smart India Hackathon (SIH 2025). All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span><i className="fas fa-shield-halved" style={{ color: '#F97316', marginRight: '4px' }}></i> Enterprise Security</span>
            <span><i className="fas fa-database" style={{ color: '#F97316', marginRight: '4px' }}></i> WCR Data Vault</span>
            <span><i className="fas fa-network-wired" style={{ color: '#F97316', marginRight: '4px' }}></i> DGH Standard Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

