import React from 'react';

export default function WellDrawer({ wellData, isOpen, onClose, onTabChange }) {
  if (!isOpen || !wellData) return null;

  const isActiveWell = wellData.type === 'ACTIVE';

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '400px',
        height: '100%',
        background: '#FFF',
        borderLeft: '1px solid #E5E7EB',
        boxShadow: '-10px 0 25px rgba(0,0,0,0.15)',
        zIndex: 999,
        transition: 'all 0.3s ease',
        padding: '20px',
        overflowY: 'auto'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px', marginBottom: '16px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1F2937' }}>
          {isActiveWell ? `${wellData.name} (ACTIVE DRILLING)` : `${wellData.name} (${wellData.field})`}
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#6B7280' }}>
          &times;
        </button>
      </div>

      <div>
        {isActiveWell ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#FFF4EC', borderLeft: '4px solid #FF6B00', padding: '12px', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#FF6B00' }}>LIVE TELEMETRY FEED</div>
              <div style={{ fontSize: '0.9rem', marginTop: '4px' }}>Rig: {wellData.rig}</div>
              <div style={{ fontSize: '0.9rem' }}>Current Depth: <b>{wellData.currentDepth} m</b> (Target: {wellData.targetDepth} m)</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ border: '1px solid #E5E7EB', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Mud Weight</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{wellData.mudWeight} SG</div>
              </div>
              <div style={{ border: '1px solid #E5E7EB', padding: '10px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>ECD</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FF6B00' }}>{wellData.ecd} SG</div>
              </div>
            </div>
            <button
              onClick={() => { onClose(); onTabChange('active-well-page'); }}
              className="btn-primary-industrial"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Open 3D Trajectory & Casing Program
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', padding: '14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase' }}>KEY WELL PARAMETERS</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px', fontSize: '0.85rem' }}>
                <div>Total Depth: <b>{wellData.totalDepth} m</b></div>
                <div>Completed: <b>{wellData.completionYear}</b></div>
                <div>Mud Weight: <b>{wellData.mudWeightUsed} SG</b></div>
                <div>NPT Hours: <b>{wellData.nptHours} hrs</b></div>
              </div>
            </div>

            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: '700', textTransform: 'uppercase' }}>HISTORICAL INCIDENT RECORD</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#991B1B', marginTop: '4px' }}>{wellData.majorEvent}</div>
              <div style={{ fontSize: '0.85rem', color: '#4B5563', marginTop: '6px' }}><b>Executed Mitigation:</b> {wellData.mitigation}</div>
            </div>

            <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', padding: '14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#1D4ED8', fontWeight: '700', textTransform: 'uppercase' }}>GEOLOGICAL DESCRIPTION</div>
              <div style={{ fontSize: '0.85rem', color: '#1E40AF', marginTop: '4px' }}>{wellData.geology}</div>
            </div>

            <button
              onClick={() => { onClose(); onTabChange('repository-page'); }}
              className="btn-primary-industrial"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Query Full Offset Mud Logs & EOR Reports
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
