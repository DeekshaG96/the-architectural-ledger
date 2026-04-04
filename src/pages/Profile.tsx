import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Camera, Save } from 'lucide-react';
import { motion } from 'motion/react';

export function Profile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a real app, you'd update the profile in Firebase Auth and Firestore
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    alert('Profile updated successfully (Simulated)');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-4xl font-headline font-extrabold tracking-tight text-primary">User Profile</h1>
        <p className="text-on-surface-variant font-body">Manage your personal information and account security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm ring-1 ring-slate-100 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/10">
                <img 
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || user?.email}&background=004a77&color=fff`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-lg hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-bold font-headline">{user?.displayName || 'Enterprise User'}</h2>
              <p className="text-sm text-on-surface-variant">{user?.email}</p>
            </div>
            <div className="mt-6 w-full pt-6 border-t border-surface-container flex justify-around">
              <div className="text-center">
                <p className="text-xs font-bold text-on-surface-variant uppercase">Role</p>
                <p className="text-sm font-bold text-primary">Administrator</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-on-surface-variant uppercase">Status</p>
                <p className="text-sm font-bold text-tertiary">Verified</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSave} className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm ring-1 ring-slate-100 space-y-6">
            <h3 className="text-xl font-bold font-headline flex items-center gap-2">
              <User size={20} className="text-primary" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface uppercase tracking-widest">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
                  <input 
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
                  <input 
                    disabled
                    type="email"
                    value={user?.email || ''}
                    className="w-full bg-surface-container-low/50 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm cursor-not-allowed opacity-70"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-container">
              <h3 className="text-xl font-bold font-headline flex items-center gap-2 mb-6">
                <Shield size={20} className="text-tertiary" />
                Account Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                  <div>
                    <p className="text-sm font-bold">Two-Factor Authentication</p>
                    <p className="text-xs text-on-surface-variant">Add an extra layer of security to your account.</p>
                  </div>
                  <button type="button" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">Enable</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                  <div>
                    <p className="text-sm font-bold">Change Password</p>
                    <p className="text-xs text-on-surface-variant">Update your password regularly for better security.</p>
                  </div>
                  <button type="button" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">Update</button>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button 
                disabled={loading}
                type="submit"
                className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-primary-dim transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                <Save size={18} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
