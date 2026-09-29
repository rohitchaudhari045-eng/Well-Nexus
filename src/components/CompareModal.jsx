import React from 'react';
import { wellNexusData } from '../data/wellNexusData';

export default function CompareModal({ isOpen, onClose, selectedWells }) {
  if (!isOpen) return null;

  const wells = selectedWells && selectedWells.length > 0
    ? selectedWells
    : [wellNexusData.nearbyWells[0], wellNexusData.nearbyWells[1], wellNexusData.nearbyWells[2]];

  return (
    <div className="modal-overlay active">
      <div className="modal-content" style={{ maxWidth: '960px', width: '100%', background: '#0F172A', border: '1px solid var(--border)' }}>
        <div style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', padding: '20px 24px', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>OFFSET WELLS CORRELATION ENGINE</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Side-by-Side Offset Well Comparison</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.4rem', cursor: 'pointer' }}>
            &times;
          </button>
        </div>

        <div style={{ padding: '24px', overflowX: 'auto' }}>
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Well Parameter</th>
                {wells.map((w) => (
                  <th key={w.id} style={{ color: '#F97316', fontSize: '0.9rem' }}>
                    {w.name} ({w.field})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Distance & Bearing</b></td>
                {wells.map((w) => <td key={w.id}>{w.distanceKm} km ({w.bearing})</td>)}
              </tr>
              <tr>
                <td><b>Total Depth (TD)</b></td>
                {wells.map((w) => <td key={w.id}><b>{w.totalDepth} m</b></td>)}
              </tr>
              <tr>
                <td><b>Target Formation</b></td>
                {wells.map((w) => <td key={w.id} style={{ color: '#FBBF24', fontWeight: '600' }}>{w.formation}</td>)}
              </tr>
              <tr>
                <td><b>Mud Weight Used</b></td>
                {wells.map((w) => <td key={w.id}>{w.mudWeightUsed} SG</td>)}
              </tr>
              <tr>
                <td><b>NPT Breakdown</b></td>
                {wells.map((w) => <td key={w.id} style={{ color: '#EF4444', fontWeight: '700' }}>{w.nptHours} Hours</td>)}
              </tr>
              <tr>
                <td><b>Risk Assessment Score</b></td>
                {wells.map((w) => (
                  <td key={w.id}>
                    <span className={`badge-status ${w.riskScore > 75 ? 'badge-critical' : w.riskScore > 50 ? 'badge-high' : 'badge-low'}`}>
                      {w.riskScore} / 100
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td><b>Major Historical Incident</b></td>
                {wells.map((w) => (
                  <td key={w.id} style={{ fontSize: '0.8rem', color: '#CBD5E1', maxWidth: '220px' }}>
                    {w.majorEvent}
                  </td>
                ))}
              </tr>
              <tr>
                <td><b>Mitigation Strategy</b></td>
                {wells.map((w) => (
                  <td key={w.id} style={{ fontSize: '0.8rem', color: '#94A3B8', maxWidth: '220px' }}>
                    {w.mitigation}
                  </td>
                ))}
              </tr>
              <tr>
                <td><b>Reservoir Porosity / Perm.</b></td>
                {wells.map((w) => (
                  <td key={w.id} style={{ fontSize: '0.8rem', color: '#34D399' }}>
                    {w.reservoirData?.porosity} | {w.reservoirData?.permeability}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
