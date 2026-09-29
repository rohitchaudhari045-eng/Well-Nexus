import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import ConsoleLayout from '../components/ConsoleLayout';
import { wellNexusData } from '../data/wellNexusData';
import CompareModal from '../components/CompareModal';
import { subscribeToNearbyWells } from '../services/firebaseService';

export default function MapPage({ onSelectWell }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const radiusCircleRef = useRef(null);
  const [selectedRadius, setSelectedRadius] = useState(10);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [nearbyWells, setNearbyWells] = useState(wellNexusData.nearbyWells);

  useEffect(() => {
    // Subscribe to Firebase nearby wells collection
    const unsubscribe = subscribeToNearbyWells((firebaseWells) => {
      if (firebaseWells && firebaseWells.length > 0) {
        setNearbyWells(firebaseWells);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const centerLat = wellNexusData.currentWell.latitude;
      const centerLng = wellNexusData.currentWell.longitude;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 11,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap | Oil India Limited Spatial GIS Data'
      }).addTo(map);

      mapInstanceRef.current = map;

      // Icons
      const activeIcon = L.divIcon({
        className: 'custom-active-well-marker',
        html: `<div style="background-color:#F97316; width:22px; height:22px; border-radius:50%; border:3px solid #FFF; box-shadow:0 0 12px rgba(249,115,22,0.9); display:flex; align-items:center; justify-content:center;">
                <div style="width:8px; height:8px; background-color:#FFF; border-radius:50%;"></div>
               </div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const offsetIcon = L.divIcon({
        className: 'custom-offset-well-marker',
        html: `<div style="background-color:#1E293B; width:18px; height:18px; border-radius:50%; border:2px solid #F97316; box-shadow:0 2px 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });

      // Active Well Marker
      const activeMarker = L.marker([centerLat, centerLng], { icon: activeIcon }).addTo(map);
      
      const activePopupDiv = document.createElement('div');
      activePopupDiv.style.padding = '8px';
      activePopupDiv.style.fontFamily = 'Inter, sans-serif';
      activePopupDiv.innerHTML = `
        <div style="font-size:0.7rem; color:#F97316; font-weight:700; text-transform:uppercase;">ACTIVE RIG LOCATION</div>
        <div style="font-size:1rem; font-weight:800; color:#0F172A;">${wellNexusData.currentWell.name}</div>
        <div style="font-size:0.8rem; color:#475569;">Operator: Oil India Limited</div>
        <div style="font-size:0.8rem; font-weight:600; margin-top:4px;">Current Depth: <span style="color:#F97316;">${wellNexusData.currentWell.currentDepth}m</span></div>
        <div style="font-size:0.8rem;">Formation: <b>${wellNexusData.currentWell.formation}</b></div>
      `;
      activeMarker.bindPopup(activePopupDiv).openPopup();

      // Radius circle
      const circle = L.circle([centerLat, centerLng], {
        color: '#F97316',
        fillColor: '#F97316',
        fillOpacity: 0.1,
        radius: selectedRadius * 1000
      }).addTo(map);

      radiusCircleRef.current = circle;

      // Nearby Wells Markers
      nearbyWells.forEach((well) => {
        if (!well.lat || !well.lng) return;
        const m = L.marker([well.lat, well.lng], { icon: offsetIcon }).addTo(map);
        
        const popupDiv = document.createElement('div');
        popupDiv.style.padding = '8px';
        popupDiv.style.fontFamily = 'Inter, sans-serif';
        popupDiv.innerHTML = `
          <div style="font-size:0.7rem; color:#64748B; font-weight:700; text-transform:uppercase;">OFFSET HISTORICAL WELL</div>
          <div style="font-size:0.95rem; font-weight:800; color:#0F172A;">${well.name} (${well.field || 'Assam'})</div>
          <div style="font-size:0.8rem; color:#334155; margin-top:4px;">Distance: <b>${well.distanceKm || 2.5} km</b></div>
          <div style="font-size:0.8rem; color:#334155;">Formation: <b>${well.formation || 'Tipam'}</b></div>
          <div style="font-size:0.78rem; color:#DC2626; font-weight:600; margin-top:4px;">Risk Event: ${well.majorEvent || 'Mud Loss'}</div>
        `;

        m.bindPopup(popupDiv);
      });
    }

    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 100);
  }, [nearbyWells]);

  const handleRadiusChange = (rad) => {
    setSelectedRadius(rad);
    if (radiusCircleRef.current && mapInstanceRef.current) {
      radiusCircleRef.current.setRadius(rad * 1000);
      mapInstanceRef.current.fitBounds(radiusCircleRef.current.getBounds());
    }
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">SPATIAL GIS GEOLOGY ENGINE</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-300">
                Firebase Firestore Sync
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Nearby Wells Map & Offset Analysis</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn-primary-industrial text-xs" onClick={() => setIsCompareOpen(true)}>
              <i className="fas fa-columns"></i> Side-by-Side Comparison
            </button>

            {/* Radius Controls */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg text-xs font-semibold">
              <span className="text-slate-500 px-2 font-bold">Radius:</span>
              {[5, 10, 25, 50].map((rad) => (
                <button
                  key={rad}
                  className={`px-2.5 py-1 rounded transition ${selectedRadius === rad ? 'bg-orange-500 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
                  onClick={() => handleRadiusChange(rad)}
                >
                  {rad}km
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GIS Map Canvas */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs relative overflow-hidden">
          <div ref={mapContainerRef} id="gis-map-element" className="w-full h-[520px] rounded-lg" />
        </div>

        {/* Offset Wells Intelligence Cards */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <i className="fas fa-layer-group text-orange-500"></i> Offset Wells Intelligence Cards ({nearbyWells.length} Wells in Firebase)
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {nearbyWells.map((well) => (
              <div key={well.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-orange-300 transition">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">{well.distanceKm || 2.5} km ({well.bearing || 'NE'})</span>
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${well.riskScore > 75 ? 'bg-red-100 text-red-700' : well.riskScore > 50 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      Risk: {well.riskScore || 75}/100
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">{well.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{well.field || 'Dikom Field'} | Completed: {well.completionYear || 2022}</p>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 text-xs mb-3">
                    <p className="text-slate-700"><b>Target Formation:</b> {well.formation || 'Tipam Sandstone'}</p>
                    <p className="text-slate-700"><b>Total Depth:</b> {well.totalDepth || 3380}m</p>
                    <p className="text-slate-700"><b>Mud Weight Used:</b> {well.mudWeightUsed || 1.25} SG</p>
                  </div>

                  <div className="bg-red-50 border border-red-100 p-2.5 rounded-lg text-xs mb-4">
                    <p className="text-red-800 font-bold uppercase text-[10px]">HISTORICAL HAZARD</p>
                    <p className="text-red-900 font-medium mt-0.5">{well.majorEvent || 'Mud Loss in Tipam Sandstone'}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectWell && onSelectWell({ ...well, type: 'OFFSET' })}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
                >
                  <i className="fas fa-file-invoice text-orange-500"></i> Inspect WCR & DDR Logs
                </button>
              </div>
            ))}
          </div>
        </div>

        <CompareModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          selectedWells={nearbyWells.slice(0, 3)}
        />
      </div>
    </ConsoleLayout>
  );
}
