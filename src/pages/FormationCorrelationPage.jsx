import React from 'react';
import { wellNexusData } from '../data/wellNexusData';

export default function FormationCorrelationPage() {
  const formations = wellNexusData.formationProfiles;

  return (
    <section className="tab-view-container" style={{ padding: '30px 20px', background: '#0F172A' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#F97316', textTransform: 'uppercase' }}>SUBSURFACE GEOLOGICAL STRATIGRAPHY</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#F8FAFC' }}>Regional Formation Correlation & Pressure Envelopes</h2>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginTop: '4px' }}>
            Cross-section geological profile across Dikom, Naharkatia, and Moran field blocks.
          </p>
        </div>

        {/* Formation Stratigraphy Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
          {formations.map((f, i) => (
            <div
              key={f.name}
              className="enterprise-card"
              style={{
                padding: '20px',
                borderTop: `4px solid ${i === 1 ? '#F97316' : i === 3 ? '#EF4444' : '#3B82F6'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge-status badge-high">{f.drillingDifficulty}</span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'monospace' }}>{f.topDepth}m - {f.bottomDepth}m</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#F8FAFC', marginTop: '10px' }}>{f.name}</h3>
              
              <div style={{ marginTop: '12px', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '8px 12px', borderRadius: '6px' }}>
                  <span style={{ color: '#94A3B8' }}>Lithology:</span>
                  <div style={{ color: '#F1F5F9', fontWeight: '600', marginTop: '2px' }}>{f.lithology}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '8px', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B', fontSize: '0.72rem' }}>Pore Pressure</span>
                    <div style={{ color: '#34D399', fontWeight: '700' }}>{f.porePressure}</div>
                  </div>
                  <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '8px', borderRadius: '6px' }}>
                    <span style={{ color: '#64748B', fontSize: '0.72rem' }}>Frac Gradient</span>
                    <div style={{ color: '#F87171', fontWeight: '700' }}>{f.fracGrad}</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '8px 12px', borderRadius: '6px' }}>
                  <span style={{ color: '#F87171', fontWeight: '700', fontSize: '0.75rem' }}>KEY DRILLING RISKS:</span>
                  <div style={{ color: '#CBD5E1', fontSize: '0.8rem', marginTop: '2px' }}>{f.keyRisks}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Geological Cross Section Visualization */}
        <div className="enterprise-card" style={{ padding: '24px' }}>
          <div className="card-header-industrial" style={{ margin: '-24px -24px 20px -24px' }}>
            <div className="card-title-industrial">
              <i className="fas fa-layer-group" style={{ color: '#F97316' }}></i> Regional Subsurface Cross-Section Correlation Model
            </div>
            <span className="badge-status badge-info">3D Stratigraphic Mesh Active</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textCenter: 'center' }}>
            {['OIL-DK-105 (Target)', 'OIL-DK-098 (2.4km)', 'OIL-DK-101 (4.1km)', 'OIL-NH-42 (8.7km)', 'OIL-MB-12 (14.5km)'].map((well, idx) => (
              <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: idx === 0 ? '#F97316' : '#F8FAFC', marginBottom: '10px' }}>
                  {well}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem' }}>
                  <div style={{ background: '#334155', padding: '12px 4px', color: '#94A3B8', borderRadius: '4px' }}>Girujan Clay</div>
                  <div style={{ background: 'rgba(249, 115, 22, 0.25)', border: '1px solid #F97316', padding: '24px 4px', color: '#FF8A00', fontWeight: '700', borderRadius: '4px' }}>
                    Tipam Sandstone (Loss Zone)
                  </div>
                  <div style={{ background: '#1E293B', padding: '16px 4px', color: '#CBD5E1', borderRadius: '4px' }}>Barail Group</div>
                  <div style={{ background: '#0F172A', border: '1px solid #475569', padding: '14px 4px', color: '#64748B', borderRadius: '4px' }}>Kopili Shale</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
