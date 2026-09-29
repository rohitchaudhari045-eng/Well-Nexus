import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function ProfileModal({ isOpen, onClose, showToast }) {
  const { currentUser, userRole, setUserRole } = useAuth();

  const [profile, setProfile] = useState({
    name: currentUser?.displayName || 'Er. Rajesh Phukan',
    email: currentUser?.email || 'drilling.engineer@oilindia.in',
    phone: '+91 98640 12345',
    empId: 'OIL-ENG-8492',
    role: userRole || 'Senior Drilling Engineer (Oil India Limited)',
    department: 'Drilling & Subsurface Operations Division',
    location: 'Dikom Field, Assam (OIL Rig-07)',
    notifications: true
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfile(prev => ({
        ...prev,
        name: currentUser.displayName || prev.name,
        email: currentUser.email || prev.email,
        role: userRole || prev.role
      }));
    }
  }, [currentUser, userRole, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (currentUser?.uid) {
        await setDoc(doc(db, 'users', currentUser.uid), {
          ...profile,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }

      setUserRole(profile.role);
      if (showToast) showToast('Profile settings updated successfully in Firebase!', 'success');
      onClose();
    } catch (err) {
      console.warn('Profile save notice:', err.message);
      setUserRole(profile.role);
      if (showToast) showToast('Profile updated locally in user session.', 'info');
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-white flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white shadow-md">
              <i className="fas fa-user-gear text-lg"></i>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Profile & Account Settings</h3>
              <p className="text-xs text-slate-400">Manage user credentials and rig node profile</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl font-bold">&times;</button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <div className="relative">
                <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
              <div className="relative">
                <i className="fas fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  required
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Employee ID</label>
              <div className="relative">
                <i className="fas fa-id-card absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  required
                  value={profile.empId}
                  onChange={(e) => setProfile({ ...profile, empId: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Enterprise Role</label>
            <select
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500"
            >
              <option value="Senior Drilling Engineer (Oil India Limited)">Senior Drilling Engineer (Oil India Limited)</option>
              <option value="Subsurface Geologist">Subsurface Geologist</option>
              <option value="Toolpusher / Rig Company Man">Toolpusher / Rig Company Man</option>
              <option value="SIH 2025 Hackathon Judge">SIH 2025 Hackathon Judge</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
              <input
                type="text"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Station / Rig Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-700 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={profile.notifications}
                onChange={(e) => setProfile({ ...profile, notifications: e.target.checked })}
                className="rounded text-orange-600 focus:ring-orange-500"
              />
              <span>Receive real-time Firestore hazard notifications</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs rounded-lg shadow-md hover:from-orange-600 flex items-center gap-2"
            >
              {isSaving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-floppy-disk"></i>}
              <span>Save Profile to Firebase</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
