import React from 'react';

export default function TelemetryBar({ telemetry }) {
  const { depth, rop, torque, spp, mw } = telemetry;

  return (
    <div className="telemetry-bar">
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', fontSize: '0.8rem', fontWeight: '700', borderRight: '1px solid #374151', paddingRight: '20px' }}>
          <span className="pulse-indicator"></span>
          <span style={{ color: '#FFF' }}>ACTIVE DRILLING:</span>
          <span style={{ color: '#FF6B00' }}>OIL-DK-105 (Dikom Field)</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="telemetry-item">
            <span className="telemetry-label">Bit Depth</span>
            <span className="telemetry-val">{depth.toFixed(1)}m</span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Formation</span>
            <span className="telemetry-val" style={{ color: '#F59E0B' }}>Tipam Sand</span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">ROP</span>
            <span className="telemetry-val">{rop}<span className="telemetry-unit">m/hr</span></span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Torque</span>
            <span className="telemetry-val">{torque}<span className="telemetry-unit">kN.m</span></span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">SPP</span>
            <span className="telemetry-val">{spp}<span className="telemetry-unit">psi</span></span>
          </div>
          <div className="telemetry-item">
            <span className="telemetry-label">Mud Weight</span>
            <span className="telemetry-val">{mw}<span className="telemetry-unit">SG</span></span>
          </div>
          <div className="telemetry-item" style={{ borderRight: 'none' }}>
            <span className="telemetry-label">Primary Hazard</span>
            <span className="telemetry-val" style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: '800' }}>MUD LOSS (84%)</span>
          </div>
        </div>

        <div style={{ padding: '8px 0', borderLeft: '1px solid #374151', paddingLeft: '16px' }}>
          <span className="badge-status badge-high"><i className="fas fa-triangle-exclamation"></i> Alert Active</span>
        </div>
      </div>
    </div>
  );
}
