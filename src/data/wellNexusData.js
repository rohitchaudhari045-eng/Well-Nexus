/**
 * WellNexus Enterprise Data Module - SIH 2025 Edition
 * Oil India Limited (OIL) Digital Drilling Infrastructure Intelligence
 */

export const wellNexusData = {
    currentWell: {
        id: "OIL-DK-105",
        name: "Dikom-105 (Exploration Well)",
        field: "Dikom Field, Assam",
        block: "AA-ONHP-2017/3",
        operator: "Oil India Limited (OIL)",
        rig: "OIL Rig-07 (2000 HP Cyber Rig)",
        currentDepth: 2785.2,
        targetDepth: 3450,
        formation: "Tipam Sandstone",
        status: "DRILLING",
        spudDate: "2026-08-12",
        expectedTD: "2026-10-15",
        latitude: 27.4832,
        longitude: 95.1245,
        mudWeight: 1.28, // SG
        rop: 18.5, // m/hr
        wob: 14.2, // klbs
        torque: 16.8, // kN.m
        spp: 2420, // psi
        flowRate: 2150, // lpm
        rpm: 120,
        ecd: 1.33, // SG
        porePressure: 1.21, // SG equivalent
        fracGradient: 1.48, // SG equivalent
        inclination: 12.4, // deg
        azimuth: 145.2, // deg
        casingShoeDepth: 1850, // m (13-3/8")
        bitDiameter: "12-1/4 in",
        bitType: "PDC 5-Blade Matrix (PDC125)",
        flowIn: 2150,
        flowOut: 2140, // lpm
        gasUnits: 14, // ppm
    },

    nearbyWells: [
        {
            id: "OIL-DK-098",
            name: "Dikom-098",
            field: "Dikom Field",
            distanceKm: 2.4,
            bearing: "NE",
            lat: 27.4981,
            lng: 95.1412,
            totalDepth: 3380,
            completionYear: 2022,
            status: "PRODUCING",
            formation: "Tipam Sandstone",
            historicalIncidents: 3,
            majorEvent: "Severe Circulation Loss at 2790m in Tipam Sandstone (Lost 45 m3 mud)",
            mitigation: "Pumping High-Viscosity LCM Pill (Nutplug + Mica 25 ppb)",
            nptHours: 38,
            riskScore: 78,
            mudWeightUsed: 1.24,
            logsAvailable: true,
            geology: "Coarse grained porous sandstone interbedded with dark gray shale bands.",
            reservoirData: {
                porosity: "24.2%",
                permeability: "420 mD",
                waterCut: "12%",
                reservoirPressure: "3,420 psi",
                apiGravity: "34.5° API"
            },
            ddrSummary: "2022-04-14: Sudden pit volume drop of 28 m3 at 2790m. Total loss cured after 2-stage LCM hesitation squeeze.",
            wcrSummary: "Well completed as dual producer in Tipam-5 & Tipam-6 sands. Cumulative production: 1.4 MMbbl."
        },
        {
            id: "OIL-DK-101",
            name: "Dikom-101",
            field: "Dikom Field",
            distanceKm: 4.1,
            bearing: "SW",
            lat: 27.4688,
            lng: 95.1055,
            totalDepth: 3520,
            completionYear: 2023,
            status: "PRODUCING",
            formation: "Barail Group",
            historicalIncidents: 2,
            majorEvent: "Differential Pipe Sticking at 2840m",
            mitigation: "Spotting Pipe-Freeing Agent & reducing Mud Weight from 1.34 to 1.28 SG",
            nptHours: 52,
            riskScore: 84,
            mudWeightUsed: 1.34,
            logsAvailable: true,
            geology: "Carbonaceous shale with interbedded tight sandstones.",
            reservoirData: {
                porosity: "18.5%",
                permeability: "115 mD",
                waterCut: "18%",
                reservoirPressure: "3,680 psi",
                apiGravity: "31.2° API"
            },
            ddrSummary: "2023-01-22: String stuck off bottom during connection pause. Soaked string with 50 bbl freeing agent.",
            wcrSummary: "Well target Barail main seam reached at 3490m. Currently producing 85 m3/day gross."
        },
        {
            id: "OIL-NH-42",
            name: "Naharkatia-042",
            field: "Naharkatia Field",
            distanceKm: 8.7,
            bearing: "SE",
            lat: 27.4210,
            lng: 95.1950,
            totalDepth: 3250,
            completionYear: 2019,
            status: "COMPLETED",
            formation: "Tipam Sandstone",
            historicalIncidents: 4,
            majorEvent: "Gas Kick (0.3 SG equivalent gain) at 2815m",
            mitigation: "Closed BOP, Wait & Weight method, increased mud weight to 1.32 SG",
            nptHours: 64,
            riskScore: 91,
            mudWeightUsed: 1.32,
            logsAvailable: true,
            geology: "Gas bearing upper Tipam sand channel.",
            reservoirData: {
                porosity: "26.0%",
                permeability: "650 mD",
                waterCut: "4%",
                reservoirPressure: "3,310 psi",
                apiGravity: "38.0° API"
            },
            ddrSummary: "2019-11-03: Pit gain 15 bbl observed while drilling gas sand stringer. Closed Annular preventer.",
            wcrSummary: "Completed as high-rate gas producer. Peak gas production rate: 180,000 SCMD."
        },
        {
            id: "OIL-MB-12",
            name: "Moran-012",
            field: "Moran Field",
            distanceKm: 14.5,
            bearing: "W",
            lat: 27.4720,
            lng: 94.9810,
            totalDepth: 3890,
            completionYear: 2020,
            status: "SUSPENDED",
            formation: "Kopili Shale",
            historicalIncidents: 5,
            majorEvent: "Severe Tight Hole & Borehole Collapse at 3120m",
            mitigation: "Reaming with 7.5% KCl polymer mud, enlarged nozzle size",
            nptHours: 96,
            riskScore: 89,
            mudWeightUsed: 1.38,
            logsAvailable: true,
            geology: "Brittle, reactive swelling shale matrix.",
            reservoirData: {
                porosity: "12.0%",
                permeability: "15 mD",
                waterCut: "45%",
                reservoirPressure: "4,100 psi",
                apiGravity: "28.5° API"
            },
            ddrSummary: "2020-06-18: Torque spiked to 42 kN.m. Severe cave-ins observed on shale shakers.",
            wcrSummary: "Section plug & abandon executed due to sidetrack complications in Kopili unstable shale."
        },
        {
            id: "OIL-JB-88",
            name: "Jorajan-088",
            field: "Jorajan Field",
            distanceKm: 21.3,
            bearing: "E",
            lat: 27.5110,
            lng: 95.3340,
            totalDepth: 3410,
            completionYear: 2021,
            status: "PRODUCING",
            formation: "Tipam Sandstone",
            historicalIncidents: 1,
            majorEvent: "Minor Seepage Loss at 2760m",
            mitigation: "Added 10 ppb Calcium Carbonate bridging agent",
            nptHours: 12,
            riskScore: 35,
            mudWeightUsed: 1.26,
            logsAvailable: true,
            geology: "Clean massive oil-bearing sandstone.",
            reservoirData: {
                porosity: "22.8%",
                permeability: "380 mD",
                waterCut: "8%",
                reservoirPressure: "3,290 psi",
                apiGravity: "33.8° API"
            },
            ddrSummary: "2021-08-09: Seepage losses of 3 m3/hr cured smoothly with low concentration CaCO3 sweep.",
            wcrSummary: "Steady oil producer. Cumulative oil production to date: 980,000 bbls."
        },
        {
            id: "OIL-DN-09",
            name: "Duliajan-009",
            field: "Duliajan Field",
            distanceKm: 11.2,
            bearing: "S",
            lat: 27.3850,
            lng: 95.1320,
            totalDepth: 3600,
            completionYear: 2018,
            status: "INSPECTION",
            formation: "Barail Coal-Shale",
            historicalIncidents: 3,
            majorEvent: "Shale Sloughing & Coal Bed Cavitations at 2950m",
            mitigation: "Glycol addition 3% + strict ECD control",
            nptHours: 44,
            riskScore: 72,
            mudWeightUsed: 1.30,
            logsAvailable: true,
            geology: "Interbedded coal seams with micro-fractured shale.",
            reservoirData: {
                porosity: "16.4%",
                permeability: "85 mD",
                waterCut: "22%",
                reservoirPressure: "3,550 psi",
                apiGravity: "30.0° API"
            },
            ddrSummary: "2018-03-27: Coal cavings led to back-reaming tight spots. Glycol mud system stabilized hole.",
            wcrSummary: "Currently under workover rig inspection for zone isolation."
        }
    ],

    historicalEvents: [
        {
            id: "EVT-2022-094",
            wellId: "OIL-DK-098",
            wellName: "Dikom-098",
            formation: "Tipam Sandstone",
            depth: 2790,
            date: "2022-04-14",
            event: "Partial to Total Mud Circulation Loss",
            severity: "CRITICAL",
            category: "Mud Loss",
            risk: "HIGH",
            lossRate: "18 m3/hr",
            mitigation: "Pumping High-Viscosity LCM Pill (Nutplug + Mica 25 ppb) in 2 stages.",
            lessonsLearned: "In Tipam Formation at 2750-2820m depth band, micro-fractured sandstone channels require pre-emptive dosing of 15 ppb coarse CaCO3 before drilling into the permeable zone.",
            supportingDoc: "Dikom-098_Final_Drilling_Report_2022.pdf"
        },
        {
            id: "EVT-2023-018",
            wellId: "OIL-DK-101",
            wellName: "Dikom-101",
            formation: "Tipam Sandstone",
            depth: 2840,
            date: "2023-01-22",
            event: "Differential Sticking during BHA Trip",
            severity: "HIGH",
            category: "Stuck Pipe",
            risk: "HIGH",
            lossRate: "N/A",
            mitigation: "Soaked string with 50 bbl oil-based pipe freeing spot pill. Jarred down 400 klbs for 6 hours.",
            lessonsLearned: "Keep overbalance below 250 psi when drilling Tipam Sands. Perform frequent short wiper trips every 100m.",
            supportingDoc: "Dikom-101_EOR_Analysis.pdf"
        },
        {
            id: "EVT-2019-112",
            wellId: "OIL-NH-42",
            wellName: "Naharkatia-042",
            formation: "Tipam Sandstone",
            depth: 2815,
            date: "2019-11-03",
            event: "Gas Influx / Kick (15 bbl pit gain)",
            severity: "CRITICAL",
            category: "Kick / Overpressure",
            risk: "CRITICAL",
            lossRate: "N/A",
            mitigation: "Shut-in well via Annular Preventer. Executed Wait & Weight method. Heavy mud 1.32 SG circulated.",
            lessonsLearned: "Narrow window between Pore Pressure (1.22 SG) and Frac Gradient (1.35 SG) at 2800m in Tipam. Continuous automated ECD monitoring essential.",
            supportingDoc: "OIL-NH42_Well_Control_Incident_Report.pdf"
        },
        {
            id: "EVT-2020-045",
            wellId: "OIL-MB-12",
            wellName: "Moran-012",
            formation: "Kopili Shale",
            depth: 3120,
            date: "2020-06-18",
            event: "Borehole Collapse & Over-Torque (42 kN.m)",
            severity: "HIGH",
            category: "Shale Instability",
            risk: "HIGH",
            lossRate: "N/A",
            mitigation: "Increased Inhibitive KCl concentration to 8% and Mud Weight to 1.36 SG.",
            lessonsLearned: "Kopili shale requires high chemical inhibition (KCl + Polyamine) and immediate casing landing upon reaching section TD.",
            supportingDoc: "Moran-12_Geomechanical_Audit.pdf"
        },
        {
            id: "EVT-2021-078",
            wellId: "OIL-JB-88",
            wellName: "Jorajan-088",
            formation: "Tipam Sandstone",
            depth: 2760,
            date: "2021-08-09",
            event: "Seepage Mud Loss (3 m3/hr)",
            severity: "LOW",
            category: "Mud Loss",
            risk: "LOW",
            lossRate: "3 m3/hr",
            mitigation: "Added 10 ppb Calcium Carbonate fine grade into active pit.",
            lessonsLearned: "Seepage losses in Tipam are easily managed with low-concentration CaCO3 sweeps.",
            supportingDoc: "Jorajan-88_Daily_Log.pdf"
        },
        {
            id: "EVT-2018-033",
            wellId: "OIL-DN-09",
            wellName: "Duliajan-009",
            formation: "Barail Group",
            depth: 2950,
            date: "2018-03-27",
            event: "Coal Bed Sloughing & Tight Spot",
            severity: "MEDIUM",
            category: "Borehole Stability",
            risk: "MEDIUM",
            lossRate: "N/A",
            mitigation: "Controlled ROP to < 10 m/hr and back-reamed with high flow rates.",
            lessonsLearned: "Limit ROP in Barail Coal seams to prevent surge/swab pressures from triggering blocky coal cave-ins.",
            supportingDoc: "Duliajan-09_PostWell_Evaluation.pdf"
        }
    ],

    formationProfiles: [
        {
            name: "Girujan Clay",
            topDepth: 0,
            bottomDepth: 1850,
            lithology: "Claystone & Silt",
            porePressure: "1.02 - 1.08 SG",
            fracGrad: "1.65 - 1.72 SG",
            drillingDifficulty: "EASY",
            keyRisks: "Washouts, Bit Balling"
        },
        {
            name: "Tipam Sandstone",
            topDepth: 1850,
            bottomDepth: 2950,
            lithology: "Porous Medium-Coarse Sandstone interbedded with Shale",
            porePressure: "1.18 - 1.24 SG",
            fracGrad: "1.34 - 1.42 SG",
            drillingDifficulty: "HIGH RISK",
            keyRisks: "Severe Mud Loss, Gas Kicks, Differential Sticking"
        },
        {
            name: "Barail Group",
            topDepth: 2950,
            bottomDepth: 3400,
            lithology: "Carbonaceous Shale, Sandstone & Coal Seams",
            porePressure: "1.25 - 1.32 SG",
            fracGrad: "1.45 - 1.55 SG",
            drillingDifficulty: "MODERATE",
            keyRisks: "Coal Sloughing, Tight Hole, Over-torque"
        },
        {
            name: "Kopili Shale",
            topDepth: 3400,
            bottomDepth: 3800,
            lithology: "Dark Fissile Micro-fractured Shale",
            porePressure: "1.30 - 1.38 SG",
            fracGrad: "1.52 - 1.60 SG",
            drillingDifficulty: "HIGH RISK",
            keyRisks: "Wellbore Instability, Chemical Swelling, Pipe Sticking"
        }
    ],

    riskPredictions: {
        mudLoss: { score: 84, status: "CRITICAL", text: "High probability of circulation loss at 2790m-2830m based on 3 offset wells (OIL-DK-098, OIL-NH-42, OIL-DK-101)." },
        stuckPipe: { score: 62, status: "HIGH", text: "Moderate-High differential sticking risk due to 180 psi overbalance in porous Tipam sand." },
        kickRisk: { score: 45, status: "MEDIUM", text: "Narrow window (0.09 SG) between current mud weight (1.28 SG) and Pore Pressure peak in sand stringers." },
        cementing: { score: 38, status: "LOW", text: "Low channel risk if pre-flush slurry & centralizers deployed every 12 meters." },
        overpressure: { score: 71, status: "HIGH", text: "Historical pressure ramps detected at 2810m in neighboring Naharkatia block." }
    },

    searchExamples: [
        "Show mud loss incidents near current well OIL-DK-105",
        "Show stuck pipe events in Tipam formation around 2800m",
        "What happened at depth 2790m in nearby well Dikom-098?",
        "Provide recommended LCM pill formulation for Tipam Sandstone",
        "Summarize offset well lessons learned for 9-5/8 inch casing section"
    ],

    knowledgeSearchDatabase: {
        "mud loss": {
            summary: "Found 4 major historical mud loss incidents within 10 km radius of OIL-DK-105 in the Tipam Sandstone formation (depth window: 2750m - 2850m).",
            offsetWellsAnalyzed: ["OIL-DK-098", "OIL-DK-101", "OIL-NH-42", "OIL-JB-88"],
            primaryCause: "Naturally depleted high-permeability coarse sandstone channels coupled with natural micro-fractures.",
            recommendedActions: [
                "Pre-load mud system with 15-20 ppb coarse Calcium Carbonate prior to penetrating 2780m depth.",
                "Maintain Equivalent Circulating Density (ECD) below 1.31 SG.",
                "Keep 50 bbl high-viscosity LCM pill (Nutplug + Mica 25 ppb) ready in suction tank #3."
            ],
            historicalCase: "In offset well OIL-DK-098 (2.4 km away at 2790m), 45 m3 of water-based mud was lost in 2.5 hours. Pumping a two-stage LCM pill sealed the loss zone successfully with zero subsequent NPT."
        },
        "stuck pipe": {
            summary: "Found 2 differential sticking incidents in Tipam Sandstone at ~2840m in OIL-DK-101 and OIL-MB-12.",
            offsetWellsAnalyzed: ["OIL-DK-101", "OIL-MB-12"],
            primaryCause: "High static differential pressure across thick porous sands during long connection pauses or survey stops.",
            recommendedActions: [
                "Minimize static time when bit is off bottom across Tipam sands.",
                "Maintain mud cake thickness under 2/32 inches using low-fluid-loss polyacrylamide additives.",
                "Keep pipe rotating (>60 RPM) during all wiper operations."
            ],
            historicalCase: "OIL-DK-101 experienced stuck pipe for 52 hours at 2840m. Freeing was achieved after spotting a 50 bbl oil-soluble surfactant pill and applying 400 klbs downward jar force."
        }
    },

    pdfDocuments: [
        {
            id: "DOC-OIL-DK098-EOR",
            filename: "OIL-DK-098_End_of_Well_Report.pdf",
            title: "Dikom-098 End of Well Drilling & Geological Execution Report",
            author: "Drilling Operations Dept, Oil India Limited, Duliajan",
            pages: 142,
            ocrExtractedText: `OIL INDIA LIMITED - DRILLING OPERATIONS DIVISION
WELL: OIL-DK-098 (DIKOM FIELD)
SECTION: 12-1/4 INCH HOLE / TIPAM SANDSTONE (2400m - 3100m)

SUMMARY OF DRILLING INCIDENT AT DEPTH 2790m:
On 14th April 2022 at 18:30 hrs, while drilling 12-1/4 inch section at depth 2790m in Tipam Sandstone with 1.25 SG Water Based Mud, sudden total loss of circulation was encountered. Flow meter dropped from 2200 lpm to 400 lpm return. Active pit volume decreased by 28 m3 in 30 minutes.

CAUSE ANALYSIS:
Subsurface offset log correlation confirms penetration into a high-porosity (24%), highly permeable channel sand with pre-existing micro-fractures. Pore pressure measured at 1.19 SG. Overbalance of 0.06 SG was sufficient to induce hydraulic fracture propagation.

MITIGATION & RESOLUTION:
1. Pulled bit 30m off bottom to 2760m inside continuous shale band.
2. Mixed and pumped 40 bbl High-Viscosity LCM Pill consisting of 15 ppb Nutplug (Coarse) + 10 ppb Mica (Medium) + 20 ppb CaCO3.
3. Displaced pill at 800 lpm. Hesitation squeeze technique applied with 200 psi surface pressure.
4. Total loss cured after 4 hours. Resumed drilling with ECD strictly controlled to 1.29 SG.

LESSONS LEARNED & RECOMMENDATIONS FOR FUTURE WELLS (OIL-DK-105):
- Always pre-treat mud active system with 10-15 ppb CaCO3 prior to reaching 2780m in Dikom field.
- Limit flow rate to 2050 lpm to prevent annular friction pressure spikes.`,
            extractedEvents: [
                { depth: "2790m", event: "Total Circulation Loss (28 m3 pit drop)", risk: "CRITICAL" },
                { depth: "2840m", event: "Torque fluctuation (14 to 28 kN.m)", risk: "MEDIUM" }
            ],
            lessonsCount: 4,
            keyTakeaway: "Pre-dosing CaCO3 before 2780m prevents severe losses in Tipam Sandstone."
        }
    ]
};
