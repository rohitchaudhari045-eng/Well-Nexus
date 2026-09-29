/**
 * Synthetic Dataset Generator (1000+ Wells Architecture)
 * Oil India Limited - Nearby Wells Intelligence System (NWIS)
 */

export const generateSyntheticWells = (count = 100) => {
  const fields = ['Dikom Field', 'Naharkatia Field', 'Moran Field', 'Jorajan Field', 'Duliajan Field', 'Makum Field'];
  const formations = ['Tipam Sandstone', 'Barail Group', 'Girujan Clay', 'Kopili Shale', 'Lakwa Sandstone'];
  const statuses = ['PRODUCING', 'COMPLETED', 'SUSPENDED', 'DRILLING', 'ABANDONED'];
  const hazards = [
    'Severe Circulation Mud Loss at 2790m',
    'Differential Pipe Sticking at 2840m',
    'Gas Kick (0.3 SG gain) at 2815m',
    'Borehole Collapse & Over-torque',
    'Coal Bed Sloughing in Barail',
    'No Major Incidents Encountered'
  ];

  const wells = [];
  const baseLat = 27.4832;
  const baseLng = 95.1245;

  for (let i = 1; i <= count; i++) {
    const id = `OIL-${fields[i % fields.length].substring(0, 2).toUpperCase()}-${String(i).padStart(3, '0')}`;
    const distanceKm = +(Math.random() * 48 + 0.5).toFixed(1);
    const lat = +(baseLat + (Math.random() - 0.5) * 0.4).toFixed(4);
    const lng = +(baseLng + (Math.random() - 0.5) * 0.4).toFixed(4);
    const depth = Math.floor(Math.random() * 1200 + 2500);

    wells.push({
      id,
      name: `${fields[i % fields.length].replace(' Field', '')}-${String(i).padStart(3, '0')}`,
      field: fields[i % fields.length],
      distanceKm,
      bearing: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][i % 8],
      lat,
      lng,
      totalDepth: depth,
      completionYear: 2015 + (i % 11),
      status: statuses[i % statuses.length],
      formation: formations[i % formations.length],
      historicalIncidents: (i % 5),
      majorEvent: hazards[i % hazards.length],
      riskScore: Math.floor(Math.random() * 65 + 30),
      mudWeightUsed: +(1.2 + (i % 20) * 0.01).toFixed(2),
      nptHours: Math.floor(Math.random() * 80),
      logsAvailable: true
    });
  }

  return wells;
};

export const syntheticWellsList = generateSyntheticWells(100);

export const nptAnalyticsData = {
  totalNptHours: 342,
  costImpactINR: '₹ 4.82 Crores ($580,000 USD)',
  breakdown: [
    { category: 'Mud Loss NPT', hours: 148, costINR: '₹ 2.10 Cr', percentage: '43%' },
    { category: 'Stuck Pipe NPT', hours: 112, costINR: '₹ 1.58 Cr', percentage: '33%' },
    { category: 'Fishing Operations NPT', hours: 52, costINR: '₹ 0.74 Cr', percentage: '15%' },
    { category: 'Cementing Delay NPT', hours: 30, costINR: '₹ 0.40 Cr', percentage: '9%' }
  ]
};
