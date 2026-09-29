import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MapPage from './pages/MapPage';
import ActiveWellPage from './pages/ActiveWellPage';
import AISearchPage from './pages/AISearchPage';
import RepositoryPage from './pages/RepositoryPage';
import RiskPage from './pages/RiskPage';
import AlertPage from './pages/AlertPage';
import DocumentPage from './pages/DocumentPage';
import AnalyticsPage from './pages/AnalyticsPage';
import FormationCorrelationPage from './pages/FormationCorrelationPage';
import AdminPage from './pages/AdminPage';

import WellDrawer from './components/WellDrawer';
import Toast from './components/Toast';
import { wellNexusData } from './data/wellNexusData';
import { AuthProvider, useAuth } from './context/AuthContext';
import {
  subscribeToLiveTelemetry,
  updateLiveTelemetry
} from './services/firebaseService';

// Protected Route Wrapper Component
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  const navigate = useNavigate();
  const { userRole, setUserRole, setIsLoggedIn } = useAuth();
  const [toast, setToast] = useState(null);

  const [selectedWell, setSelectedWell] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Live Telemetry simulation & Firebase Firestore Sync
  const [telemetry, setTelemetry] = useState({
    depth: wellNexusData.currentWell.currentDepth,
    rop: wellNexusData.currentWell.rop,
    torque: wellNexusData.currentWell.torque,
    spp: wellNexusData.currentWell.spp,
    mw: wellNexusData.currentWell.mudWeight
  });

  useEffect(() => {
    // 1. Subscribe to Firebase Firestore live telemetry updates
    const unsubscribe = subscribeToLiveTelemetry((firebaseData) => {
      if (firebaseData) {
        setTelemetry({
          depth: firebaseData.currentDepth || wellNexusData.currentWell.currentDepth,
          rop: firebaseData.rop || wellNexusData.currentWell.rop,
          torque: firebaseData.torque || wellNexusData.currentWell.torque,
          spp: firebaseData.spp || wellNexusData.currentWell.spp,
          mw: firebaseData.mudWeight || wellNexusData.currentWell.mudWeight
        });
      }
    });

    // 2. Periodic Live Telemetry simulation pushing to Firebase
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const updated = {
          currentDepth: +(prev.depth + 0.05).toFixed(2),
          rop: +(18.5 + (Math.random() * 1.2 - 0.6)).toFixed(1),
          torque: +(16.8 + (Math.random() * 0.8 - 0.4)).toFixed(1),
          spp: Math.floor(2420 + (Math.random() * 20 - 10)),
          mudWeight: prev.mw
        };
        // Persist to Firebase Firestore asynchronously
        updateLiveTelemetry(updated);
        return {
          depth: updated.currentDepth,
          rop: updated.rop,
          torque: updated.torque,
          spp: updated.spp,
          mw: updated.mudWeight
        };
      });
    }, 4000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleSelectWell = (wellData) => {
    setSelectedWell(wellData);
    setIsDrawerOpen(true);
  };

  const handleLoginSuccess = ({ empId, role }) => {
    setIsLoggedIn(true);
    if (role) setUserRole(role);
    showToast(`Authenticated as ${empId || 'Engineer'} into Firebase Enterprise Node.`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage telemetry={telemetry} showToast={showToast} userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="/nearby-wells" element={
          <ProtectedRoute>
            <MapPage onSelectWell={handleSelectWell} userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="/active-well" element={
          <ProtectedRoute>
            <ActiveWellPage telemetry={telemetry} userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="/ai-search" element={
          <ProtectedRoute>
            <AISearchPage userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="/repository" element={
          <ProtectedRoute>
            <RepositoryPage showToast={showToast} userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="/risk-analytics" element={
          <ProtectedRoute>
            <RiskPage userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="/alerts" element={
          <ProtectedRoute>
            <AlertPage showToast={showToast} userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="/document" element={
          <ProtectedRoute>
            <DocumentPage showToast={showToast} userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="/analytics" element={
          <ProtectedRoute>
            <AnalyticsPage userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="/formation-correlation" element={
          <ProtectedRoute>
            <FormationCorrelationPage userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPage showToast={showToast} userRole={userRole} />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <WellDrawer
        wellData={selectedWell}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onTabChange={(path) => navigate(path.replace('-page', ''))}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
