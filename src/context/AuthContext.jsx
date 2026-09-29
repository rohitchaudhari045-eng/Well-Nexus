import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  isFirebaseConfigured
} from '../config/firebase';
import {
  subscribeToAuth,
  loginWithFirebase,
  registerWithFirebase,
  logoutFirebase,
  seedDatabaseIfEmpty
} from '../services/firebaseService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('Senior Drilling Engineer (Oil India Limited)');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default true for instant exploration
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed database on app start
    seedDatabaseIfEmpty();

    const unsubscribe = subscribeToAuth((user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else if (!currentUser) {
        // Fallback default logged-in state for demo user
        setCurrentUser({
          uid: 'demo-engineer-8492',
          email: 'drilling.engineer@oilindia.in',
          displayName: 'OIL Engineer 8492'
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password, role) => {
    try {
      const res = await loginWithFirebase(email, password);
      if (res.user) {
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        if (role) setUserRole(role);
      }
      return res;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, role) => {
    try {
      const res = await registerWithFirebase(email, password, role);
      if (res.user) {
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        if (role) setUserRole(role);
      }
      return res;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await logoutFirebase();
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userRole,
        setUserRole,
        isLoggedIn,
        setIsLoggedIn,
        login,
        register,
        logout,
        loading,
        isFirebaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
