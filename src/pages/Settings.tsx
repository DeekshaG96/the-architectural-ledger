import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Globe, Palette, Database, Save } from 'lucide-react';
import { motion } from 'motion/react';

export function Settings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    publicProfile: false,
    language: 'English',
    dataRetention: '30 Days'
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    alert('Settings saved successfully (Simulated)');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-4xl font-headline font-extrabold tracking-tight text-primary">System Settings</h1>
        <p className="text-on-surface-variant font-body">Configure the enterprise ledger and your user experience.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* General Settings */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm ring-1 ring-slate-100 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <SettingsIcon size={24} />
            </div>
            <h3 className="text-xl font-bold font-headline">General Configuration</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-secondary" />
                  <div>
                    <p className="text-sm font-bold">Push Notifications</p>
                    <p className="text-xs text-on-surface-variant">Receive alerts for ledger updates.</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setSettings({...settings, notifications: !settings.notifications})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.notifications ? 'bg-primary' : 'bg-surface-container-highest'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.notifications ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-3">
                  <Palette size={20} className="text-tertiary" />
                  <div>
                    <p className="text-sm font-bold">Dark Mode</p>
                    <p className="text-xs text-on-surface-variant">Switch to a darker visual theme.</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setSettings({...settings, darkMode: !settings.darkMode})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.darkMode ? 'bg-primary' : 'bg-surface-container-highest'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.darkMode ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-bold">System Language</p>
                    <p className="text-xs text-on-surface-variant">Select your preferred interface language.</p>
                  </div>
                </div>
                <select 
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-3">
                  <Database size={20} className="text-secondary" />
                  <div>
                    <p className="text-sm font-bold">Data Retention</p>
                    <p className="text-xs text-on-surface-variant">How long to keep historical logs.</p>
                  </div>
                </div>
                <select 
                  value={settings.dataRetention}
                  onChange={(e) => setSettings({...settings, dataRetention: e.target.value})}
                  className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0"
                >
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                  <option>Indefinite</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm ring-1 ring-slate-100 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-lg flex items-center justify-center">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold font-headline">Privacy & Security</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-bold">Public Directory Profile</p>
                  <p className="text-xs text-on-surface-variant">Allow other employees to see your profile in the directory.</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setSettings({...settings, publicProfile: !settings.publicProfile})}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.publicProfile ? 'bg-primary' : 'bg-surface-container-highest'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.publicProfile ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            disabled={loading}
            type="submit"
            className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dim transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? 'Saving Configuration...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
