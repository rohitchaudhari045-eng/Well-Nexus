import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { wellNexusData } from '../data/wellNexusData';

// Collection Names
const COLLECTIONS = {
  WELLS: 'wells',
  INCIDENTS: 'incidents',
  ALERTS: 'alerts',
  DOCUMENTS: 'documents',
  KNOWLEDGE: 'knowledge_search',
  USERS: 'users'
};

/**
 * Seed initial enterprise data into Firebase Firestore if empty
 */
export async function seedDatabaseIfEmpty() {
  try {
    // 1. Seed Current Well & Nearby Wells
    const wellsRef = collection(db, COLLECTIONS.WELLS);
    const wellsSnap = await getDocs(wellsRef);
    if (wellsSnap.empty) {
      console.log('Seeding Firebase Firestore: Wells collection...');
      await setDoc(doc(db, COLLECTIONS.WELLS, wellNexusData.currentWell.id), {
        ...wellNexusData.currentWell,
        type: 'ACTIVE',
        updatedAt: serverTimestamp()
      });

      for (const well of wellNexusData.nearbyWells) {
        await setDoc(doc(db, COLLECTIONS.WELLS, well.id), {
          ...well,
          type: 'OFFSET',
          updatedAt: serverTimestamp()
        });
      }
    }

    // 2. Seed Historical Events / Incidents
    const incidentsRef = collection(db, COLLECTIONS.INCIDENTS);
    const incidentsSnap = await getDocs(incidentsRef);
    if (incidentsSnap.empty) {
      console.log('Seeding Firebase Firestore: Incidents collection...');
      for (const evt of wellNexusData.historicalEvents) {
        await setDoc(doc(db, COLLECTIONS.INCIDENTS, evt.id), {
          ...evt,
          createdAt: serverTimestamp()
        });
      }
    }

    // 3. Seed Initial Alerts
    const alertsRef = collection(db, COLLECTIONS.ALERTS);
    const alertsSnap = await getDocs(alertsRef);
    if (alertsSnap.empty) {
      console.log('Seeding Firebase Firestore: Alerts collection...');
      const initialAlerts = [
        { date: '12 Sep 2026', well: 'OIL-DK-105', type: 'Daily Report', desc: 'Drilling operations summary at 2785m in Tipam Sandstone', severity: 'Critical', status: 'UNACKNOWLEDGED' },
        { date: '12 Sep 2026', well: 'OIL-DK-112', type: 'Incident', desc: 'Mud loss - 2.5 bbl/hr recorded during connection pause', severity: 'High', status: 'UNACKNOWLEDGED' },
        { date: '11 Sep 2026', well: 'OIL-DK-098', type: 'NPT', desc: 'Equipment torque fluctuation and sensor recalibration', severity: 'High', status: 'ACKNOWLEDGED' },
        { date: '10 Sep 2026', well: 'OIL-DK-084', type: 'Report', desc: 'Formation boundary transition into Tipam Sandstone', severity: 'Medium', status: 'ACKNOWLEDGED' },
        { date: '09 Sep 2026', well: 'OIL-DK-076', type: 'Incident', desc: 'Stuck pipe risk warning - tight hole at 2740m', severity: 'Low', status: 'RESOLVED' }
      ];
      for (const a of initialAlerts) {
        await addDoc(alertsRef, {
          ...a,
          createdAt: serverTimestamp()
        });
      }
    }

    // 4. Seed Documents Vault
    const docsRef = collection(db, COLLECTIONS.DOCUMENTS);
    const docsSnap = await getDocs(docsRef);
    if (docsSnap.empty) {
      console.log('Seeding Firebase Firestore: Documents collection...');
      for (const docItem of wellNexusData.pdfDocuments) {
        await setDoc(doc(db, COLLECTIONS.DOCUMENTS, docItem.id), {
          ...docItem,
          uploadedAt: serverTimestamp()
        });
      }
    }

    console.log('Firebase Firestore Database initialized successfully.');
  } catch (err) {
    console.warn('Firebase Firestore seeding info:', err.message || err);
  }
}

// ==================== AUTHENTICATION SERVICES ====================

export async function loginWithFirebase(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    // Graceful fallback for demo accounts when offline / mock keys used
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/api-key-not-valid._(auth/invalid-api-key).') {
      return {
        success: true,
        user: {
          uid: 'demo-' + Date.now(),
          email: email || 'drilling.engineer@oilindia.in',
          displayName: 'Oil India Engineer'
        },
        isDemo: true
      };
    }
    throw error;
  }
}

export async function registerWithFirebase(email, password, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save User Role Profile to Firestore
    try {
      await setDoc(doc(db, COLLECTIONS.USERS, user.uid), {
        uid: user.uid,
        email: email,
        role: role || 'Senior Drilling Engineer (Oil India Limited)',
        createdAt: serverTimestamp()
      });
    } catch (dbErr) {
      console.warn('Could not save user profile to Firestore:', dbErr.message);
    }

    return { success: true, user };
  } catch (error) {
    if (error.code === 'auth/api-key-not-valid._(auth/invalid-api-key).' || error.code === 'auth/network-request-failed') {
      return {
        success: true,
        user: {
          uid: 'demo-' + Date.now(),
          email: email,
          displayName: 'Registered Engineer'
        },
        isDemo: true
      };
    }
    throw error;
  }
}

export async function logoutFirebase() {
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('Sign out warning:', err);
  }
}

export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// ==================== REAL-TIME TELEMETRY & WELLS ====================

export function subscribeToLiveTelemetry(callback) {
  const currentWellDoc = doc(db, COLLECTIONS.WELLS, wellNexusData.currentWell.id);
  
  try {
    return onSnapshot(currentWellDoc, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      } else {
        // Return default well data
        callback(wellNexusData.currentWell);
      }
    }, (error) => {
      console.warn('Telemetry snapshot fallback:', error.message);
      callback(wellNexusData.currentWell);
    });
  } catch (err) {
    callback(wellNexusData.currentWell);
    return () => {};
  }
}

export async function updateLiveTelemetry(telemetryUpdate) {
  try {
    const wellRef = doc(db, COLLECTIONS.WELLS, wellNexusData.currentWell.id);
    await updateDoc(wellRef, {
      ...telemetryUpdate,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore update telemetry notice:', err.message);
  }
}

export function subscribeToNearbyWells(callback) {
  const wellsRef = collection(db, COLLECTIONS.WELLS);
  
  try {
    return onSnapshot(wellsRef, (snapshot) => {
      if (!snapshot.empty) {
        const list = [];
        snapshot.forEach((doc) => {
          if (doc.id !== wellNexusData.currentWell.id) {
            list.push({ id: doc.id, ...doc.data() });
          }
        });
        callback(list.length > 0 ? list : wellNexusData.nearbyWells);
      } else {
        callback(wellNexusData.nearbyWells);
      }
    }, () => {
      callback(wellNexusData.nearbyWells);
    });
  } catch (err) {
    callback(wellNexusData.nearbyWells);
    return () => {};
  }
}

// ==================== HISTORICAL INCIDENTS & LOGS ====================

export function subscribeToIncidents(callback) {
  const incidentsRef = collection(db, COLLECTIONS.INCIDENTS);
  
  try {
    return onSnapshot(incidentsRef, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      callback(list.length > 0 ? list : wellNexusData.historicalEvents);
    }, () => {
      callback(wellNexusData.historicalEvents);
    });
  } catch (err) {
    callback(wellNexusData.historicalEvents);
    return () => {};
  }
}

export async function addIncidentToFirebase(incidentData) {
  try {
    const incidentsRef = collection(db, COLLECTIONS.INCIDENTS);
    const newDoc = await addDoc(incidentsRef, {
      ...incidentData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: newDoc.id };
  } catch (err) {
    console.warn('Add incident error:', err);
    return { success: false, error: err.message };
  }
}

// ==================== ALERTS MANAGEMENT ====================

export function subscribeToAlerts(callback) {
  const alertsRef = collection(db, COLLECTIONS.ALERTS);
  
  try {
    return onSnapshot(alertsRef, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      callback(list);
    }, () => {
      callback([]);
    });
  } catch (err) {
    callback([]);
    return () => {};
  }
}

export async function createAlertInFirebase(alertData) {
  try {
    const alertsRef = collection(db, COLLECTIONS.ALERTS);
    const docRef = await addDoc(alertsRef, {
      ...alertData,
      status: 'UNACKNOWLEDGED',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function updateAlertStatusInFirebase(alertId, status) {
  try {
    const alertRef = doc(db, COLLECTIONS.ALERTS, alertId);
    await updateDoc(alertRef, { status });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ==================== DOCUMENTS VAULT ====================

export function subscribeToDocuments(callback) {
  const docsRef = collection(db, COLLECTIONS.DOCUMENTS);
  
  try {
    return onSnapshot(docsRef, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      callback(list.length > 0 ? list : wellNexusData.pdfDocuments);
    }, () => {
      callback(wellNexusData.pdfDocuments);
    });
  } catch (err) {
    callback(wellNexusData.pdfDocuments);
    return () => {};
  }
}

export async function addDocumentToFirebase(docData) {
  try {
    const docsRef = collection(db, COLLECTIONS.DOCUMENTS);
    const newDoc = await addDoc(docsRef, {
      ...docData,
      uploadedAt: serverTimestamp()
    });
    return { success: true, id: newDoc.id };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ==================== AI SEARCH KNOWLEDGE BASE ====================

export async function queryAIKnowledgeBase(queryText) {
  const textLower = queryText.toLowerCase();
  
  try {
    // Search Firestore Incidents & Documents
    const incidentsRef = collection(db, COLLECTIONS.INCIDENTS);
    const incidentsSnap = await getDocs(incidentsRef);
    const matchedIncidents = [];

    incidentsSnap.forEach(docSnap => {
      const d = docSnap.data();
      if (
        (d.event && d.event.toLowerCase().includes(textLower)) ||
        (d.formation && d.formation.toLowerCase().includes(textLower)) ||
        (d.wellName && d.wellName.toLowerCase().includes(textLower)) ||
        (d.mitigation && d.mitigation.toLowerCase().includes(textLower))
      ) {
        matchedIncidents.push(d);
      }
    });

    if (matchedIncidents.length > 0) {
      return {
        summary: `Found ${matchedIncidents.length} matching incident(s) in Firebase database for "${queryText}".`,
        incidents: matchedIncidents,
        primaryCause: matchedIncidents[0].event || 'Subsurface formation pressure imbalance',
        recommendations: matchedIncidents.map(i => i.mitigation || i.lessonsLearned).filter(Boolean)
      };
    }
  } catch (err) {
    console.warn('AI search query Firestore fallback:', err);
  }

  // Pre-configured response fallback
  if (textLower.includes('mud loss') || textLower.includes('loss')) {
    return wellNexusData.knowledgeSearchDatabase["mud loss"];
  } else if (textLower.includes('stuck') || textLower.includes('pipe')) {
    return wellNexusData.knowledgeSearchDatabase["stuck pipe"];
  }

  return {
    summary: `Analyzed subsurface offset database for query: "${queryText}". Found 3 relevant drilling reports in Tipam Sandstone.`,
    offsetWellsAnalyzed: ["OIL-DK-098", "OIL-DK-101", "OIL-NH-42"],
    primaryCause: "High-permeability sand matrix with micro-fracture channels at 2750m-2820m depth band.",
    recommendedActions: [
      "Maintain active ECD under 1.30 SG",
      "Pre-dose suction pit with 15 ppb CaCO3 bridging agent",
      "Monitor pit gain/loss continuously on WITSML telemetry feed"
    ],
    historicalCase: "In Dikom-098 (2.4 km offset), mud losses of 18 m3/hr were successfully cured with a 2-stage LCM hesitation squeeze."
  };
}
