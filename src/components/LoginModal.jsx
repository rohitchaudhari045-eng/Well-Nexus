import React, { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('drilling.engineer@oilindia.in');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('Senior Drilling Engineer (Oil India Limited)');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({ email, role });
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal-content">
        <div style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%)', padding: '24px', color: '#FFF', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#FFF', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            &times;
          </button>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ENTERPRISE AUTHENTICATION</div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px' }}>WellNexus Portal Login</h3>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '4px' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', border: '1px solid #D1D5DB', padding: '10px', borderRadius: '6px', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '4px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', border: '1px solid #D1D5DB', padding: '10px', borderRadius: '6px', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '4px' }}>Access Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', border: '1px solid #D1D5DB', padding: '10px', borderRadius: '6px', fontSize: '0.9rem', background: '#FFF' }}
            >
              <option value="Senior Drilling Engineer (Oil India Limited)">Senior Drilling Engineer (Oil India Limited)</option>
              <option value="Subsurface Geologist">Subsurface Geologist</option>
              <option value="Toolpusher / Rig Company Man">Toolpusher / Rig Company Man</option>
              <option value="SIH 2025 Hackathon Judge">SIH 2025 Hackathon Judge</option>
            </select>
          </div>

          <button type="submit" className="btn-primary-industrial" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px' }}>
            <i className="fas fa-lock"></i> Secure Enterprise Login
          </button>
        </form>
      </div>
    </div>
  );
}
