import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Settings, 
  Clock, 
  Video, 
  Heart, 
  Mail, 
  Users, 
  Calendar, 
  Images, 
  Tv, 
  Save, 
  RotateCcw, 
  Check, 
  Trash2, 
  Plus, 
  ExternalLink,
  KeyRound,
  FileDown
} from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import type { PrayerRequest, ContactMessage } from '../services/churchState';
import type { ChurchConfig } from '../config/churchConfig';
import { isSupabaseConfigured } from '../services/supabaseClient';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(ChurchStateService.isAdminAuthenticated());
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'timings' | 'onlinePrayer' | 'prayers' | 'messages' | 'leadership' | 'worship' | 'gallery' | 'events' | 'general'>('timings');

  // Working state of config
  const [config, setConfig] = useState<ChurchConfig>(ChurchStateService.getConfig());
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Prayer requests & messages
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Filter for prayers
  const [prayerFilter, setPrayerFilter] = useState<'all' | 'pending' | 'prayed'>('all');

  // Change PIN modal state
  const [showPinChange, setShowPinChange] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setConfig(ChurchStateService.getConfig());
    setPrayers(ChurchStateService.getPrayerRequests());
    setMessages(ChurchStateService.getContactMessages());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ChurchStateService.adminLogin(passcode)) {
      setIsAuthenticated(true);
      setLoginError(false);
      setPasscode('');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    ChurchStateService.adminLogout();
    setIsAuthenticated(false);
  };

  const handleSaveConfig = () => {
    ChurchStateService.saveConfig(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all church information back to default?')) {
      const def = ChurchStateService.resetConfigToDefault();
      setConfig(def);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handlePrayerStatusChange = (id: string, status: PrayerRequest['status']) => {
    ChurchStateService.updatePrayerStatus(id, status);
    setPrayers(ChurchStateService.getPrayerRequests());
  };

  const handleDeletePrayer = (id: string) => {
    if (window.confirm('Delete this prayer request record?')) {
      ChurchStateService.deletePrayerRequest(id);
      setPrayers(ChurchStateService.getPrayerRequests());
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm('Delete this contact message?')) {
      ChurchStateService.deleteContactMessage(id);
      setMessages(ChurchStateService.getContactMessages());
    }
  };

  const handleUpdateMessageStatus = (id: string, status: ContactMessage['status']) => {
    ChurchStateService.updateContactStatus(id, status);
    setMessages(ChurchStateService.getContactMessages());
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      ChurchStateService.setAdminPin(newPin.trim());
      setPinChangeSuccess(true);
      setTimeout(() => {
        setPinChangeSuccess(false);
        setShowPinChange(false);
        setNewPin('');
      }, 2000);
    }
  };

  // Export all prayer requests to JSON/Text for church records
  const exportPrayers = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(prayers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mighty-nation-church-prayers-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-900">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-church-primary flex items-center justify-center mx-auto border border-blue-100 shadow-sm">
            <Lock className="w-8 h-8 text-church-primary" />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">
              Church Administration Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Mighty Nation Church, Wadala, Mumbai
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 text-left">
            <p className="font-bold">Authorized Access Only</p>
            <p className="text-[11px] mt-0.5">
              Default access PIN for demonstration: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-300">churchadmin123</code> or <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-300">mighty2024</code>.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Passcode / PIN
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-church-primary"
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-600 font-semibold">
                Invalid passcode. Please check and try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-church-primary hover:bg-blue-900 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In to Dashboard</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredPrayers = prayers.filter(p => {
    if (prayerFilter === 'all') return true;
    return p.status === prayerFilter;
  });

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-church-primary text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-church-gold" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-slate-900">
                Church Management Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                Mighty Nation Church • Wadala, Mumbai •{' '}
                <span className="font-medium text-emerald-600">
                  {isSupabaseConfigured ? 'Connected to Cloud Database' : 'Local Storage Mode (Ready to sync)'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {saveSuccess && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold animate-fadeIn">
                <Check className="w-4 h-4" />
                <span>Changes Saved Successfully!</span>
              </div>
            )}

            <button
              onClick={handleSaveConfig}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>

            <button
              onClick={() => setShowPinChange(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              title="Change Admin Passcode"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Change PIN</span>
            </button>

            <button
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-semibold text-xs transition-colors"
              title="Reset config to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Change PIN Modal */}
        {showPinChange && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">Change Admin Passcode</h3>
              <form onSubmit={handleSavePin} className="space-y-3">
                <input
                  type="password"
                  required
                  placeholder="New Passcode (min 4 characters)"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                />
                {pinChangeSuccess && (
                  <p className="text-xs text-emerald-600 font-semibold">Passcode updated successfully!</p>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPinChange(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-church-primary text-white"
                  >
                    Save Passcode
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto pb-2 gap-2">
          {[
            { id: 'timings', name: 'Service Timings', icon: Clock },
            { id: 'onlinePrayer', name: 'Online Prayer', icon: Video },
            { id: 'prayers', name: `Prayer Requests (${prayers.filter(p => p.status === 'pending').length} new)`, icon: Heart },
            { id: 'messages', name: `Contact Messages (${messages.filter(m => m.status === 'unread').length})`, icon: Mail },
            { id: 'leadership', name: 'Leadership & Pastors', icon: Users },
            { id: 'worship', name: 'Worship Team', icon: Users },
            { id: 'gallery', name: 'Photo Gallery', icon: Images },
            { id: 'events', name: 'Events', icon: Calendar },
            { id: 'general', name: 'General & Contact Info', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-church-primary text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SERVICE TIMINGS */}
        {activeTab === 'timings' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            <h2 className="font-serif text-xl font-bold text-slate-900 border-b pb-3">
              Weekly Service Schedules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sunday Worship */}
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-church-gold block">
                  Sunday Service
                </span>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Service Title</label>
                  <input
                    type="text"
                    value={config.services.sunday.name}
                    onChange={(e) => setConfig({
                      ...config,
                      services: {
                        ...config.services,
                        sunday: { ...config.services.sunday, name: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Day Schedule</label>
                  <input
                    type="text"
                    value={config.services.sunday.day}
                    onChange={(e) => setConfig({
                      ...config,
                      services: {
                        ...config.services,
                        sunday: { ...config.services.sunday, day: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Timing (e.g. 12:00 PM – 2:00 PM)</label>
                  <input
                    type="text"
                    value={config.services.sunday.time}
                    onChange={(e) => setConfig({
                      ...config,
                      services: {
                        ...config.services,
                        sunday: { ...config.services.sunday, time: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={config.services.sunday.description}
                    onChange={(e) => setConfig({
                      ...config,
                      services: {
                        ...config.services,
                        sunday: { ...config.services.sunday, description: e.target.value }
                      }
                    })}
                    className="w-full p-2 rounded-lg border text-xs"
                  />
                </div>
              </div>

              {/* Friday Fasting Prayer */}
              <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-church-primary block">
                  Friday Fasting Prayer
                </span>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Service Title</label>
                  <input
                    type="text"
                    value={config.services.friday.name}
                    onChange={(e) => setConfig({
                      ...config,
                      services: {
                        ...config.services,
                        friday: { ...config.services.friday, name: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Day Schedule</label>
                  <input
                    type="text"
                    value={config.services.friday.day}
                    onChange={(e) => setConfig({
                      ...config,
                      services: {
                        ...config.services,
                        friday: { ...config.services.friday, day: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Timing (e.g. 8:30 PM – 9:30 PM)</label>
                  <input
                    type="text"
                    value={config.services.friday.time}
                    onChange={(e) => setConfig({
                      ...config,
                      services: {
                        ...config.services,
                        friday: { ...config.services.friday, time: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={config.services.friday.description}
                    onChange={(e) => setConfig({
                      ...config,
                      services: {
                        ...config.services,
                        friday: { ...config.services.friday, description: e.target.value }
                      }
                    })}
                    className="w-full p-2 rounded-lg border text-xs"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Welcome Note / Motto</label>
              <input
                type="text"
                value={config.services.welcomeNote}
                onChange={(e) => setConfig({
                  ...config,
                  services: { ...config.services, welcomeNote: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg border text-sm"
              />
            </div>
          </div>
        )}

        {/* TAB 2: ONLINE PRAYER SETTINGS */}
        {activeTab === 'onlinePrayer' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            <h2 className="font-serif text-xl font-bold text-slate-900 border-b pb-3">
              Daily Online Prayer Configuration
            </h2>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <strong>Requirement Guidelines:</strong> Never create fake Google Meet or Zoom links. If the meeting link is left empty, the website will automatically show the safe fallback message: <em>"Contact us to receive the daily online prayer meeting details."</em>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Online Prayer Schedule
                </label>
                <input
                  type="text"
                  value={config.onlinePrayer.schedule}
                  onChange={(e) => setConfig({
                    ...config,
                    onlinePrayer: { ...config.onlinePrayer, schedule: e.target.value }
                  })}
                  placeholder="e.g. Daily 9:00 PM – 9:45 PM"
                  className="w-full px-3 py-2 rounded-lg border text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Meeting Platform
                </label>
                <input
                  type="text"
                  value={config.onlinePrayer.platform}
                  onChange={(e) => setConfig({
                    ...config,
                    onlinePrayer: { ...config.onlinePrayer, platform: e.target.value }
                  })}
                  placeholder="e.g. Google Meet / Zoom / WhatsApp"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Meeting Link (Leave empty if link should only be shared upon contact)
              </label>
              <input
                type="url"
                value={config.onlinePrayer.meetingLink}
                onChange={(e) => setConfig({
                  ...config,
                  onlinePrayer: { ...config.onlinePrayer, meetingLink: e.target.value }
                })}
                placeholder="https://meet.google.com/... or https://zoom.us/j/..."
                className="w-full px-3 py-2 rounded-lg border text-sm font-mono text-church-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Fallback Notice (Displayed when link is blank)
              </label>
              <input
                type="text"
                value={config.onlinePrayer.fallbackMessage}
                onChange={(e) => setConfig({
                  ...config,
                  onlinePrayer: { ...config.onlinePrayer, fallbackMessage: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg border text-sm"
              />
            </div>
          </div>
        )}

        {/* TAB 3: PRAYER REQUESTS WORKFLOW */}
        {activeTab === 'prayers' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  Prayer Requests Review System
                </h2>
                <p className="text-xs text-slate-500">
                  Confidential prayer requests submitted by visitors and believers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportPrayers}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-church-primary hover:bg-sky-100 font-semibold text-xs border border-sky-200"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>

                <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs">
                  <button
                    onClick={() => setPrayerFilter('all')}
                    className={`px-3 py-1.5 ${prayerFilter === 'all' ? 'bg-church-primary text-white font-bold' : 'bg-white text-slate-600'}`}
                  >
                    All ({prayers.length})
                  </button>
                  <button
                    onClick={() => setPrayerFilter('pending')}
                    className={`px-3 py-1.5 ${prayerFilter === 'pending' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white text-slate-600'}`}
                  >
                    Pending ({prayers.filter(p => p.status === 'pending').length})
                  </button>
                  <button
                    onClick={() => setPrayerFilter('prayed')}
                    className={`px-3 py-1.5 ${prayerFilter === 'prayed' ? 'bg-emerald-600 text-white font-bold' : 'bg-white text-slate-600'}`}
                  >
                    Prayed ({prayers.filter(p => p.status === 'prayed').length})
                  </button>
                </div>
              </div>
            </div>

            {filteredPrayers.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p>No prayer requests in this status.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPrayers.map((req) => (
                  <div
                    key={req.id}
                    className={`p-6 rounded-2xl border transition-all space-y-3 ${
                      req.status === 'pending'
                        ? 'bg-amber-50/40 border-amber-200 shadow-sm'
                        : 'bg-white border-slate-200 opacity-90'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg font-bold text-slate-900">
                          {req.fullName}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          req.status === 'pending'
                            ? 'bg-amber-200 text-amber-900'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{new Date(req.createdAt).toLocaleDateString()} at {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                      {req.phoneNumber && (
                        <span>📞 <strong>Phone:</strong> {req.phoneNumber}</span>
                      )}
                      {req.email && (
                        <span>✉️ <strong>Email:</strong> {req.email}</span>
                      )}
                      <span>
                        💬 <strong>Permission to Contact:</strong> {req.permissionToContact ? 'Yes' : 'No'}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 leading-relaxed font-sans">
                      "{req.prayerRequest}"
                    </div>

                    {req.adminNotes && (
                      <p className="text-xs text-slate-500 italic">
                        📝 Notes: {req.adminNotes}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        {req.status === 'pending' ? (
                          <button
                            onClick={() => handlePrayerStatusChange(req.id, 'prayed')}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark as Prayed For</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePrayerStatusChange(req.id, 'pending')}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors"
                          >
                            <span>Mark Pending</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeletePrayer(req.id)}
                        className="text-rose-600 hover:text-rose-800 p-1.5 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            <h2 className="font-serif text-xl font-bold text-slate-900 border-b pb-3">
              Received Contact Inquiries
            </h2>

            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p>No messages received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                      <span className="text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-4 text-xs text-slate-600">
                      <span>✉️ {msg.email}</span>
                      {msg.phone && <span>📞 {msg.phone}</span>}
                      <span>🏷️ {msg.subject}</span>
                    </div>

                    <p className="p-3 bg-slate-50 rounded-xl text-sm text-slate-700">
                      {msg.message}
                    </p>

                    <div className="flex justify-between items-center pt-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          msg.status === 'unread' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {msg.status}
                        </span>
                        {msg.status === 'unread' && (
                          <button
                            onClick={() => handleUpdateMessageStatus(msg.id, 'read')}
                            className="text-church-primary font-semibold hover:underline"
                          >
                            Mark Read
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-rose-600 hover:text-rose-800 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: LEADERSHIP PROFILES */}
        {activeTab === 'leadership' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            <h2 className="font-serif text-xl font-bold text-slate-900 border-b pb-3">
              Leadership & Pastor Profiles
            </h2>

            <div className="space-y-6">
              {config.leadership.map((leader, index) => (
                <div key={leader.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-church-primary">
                      Profile #{index + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                      <input
                        type="text"
                        value={leader.name}
                        onChange={(e) => {
                          const updated = [...config.leadership];
                          updated[index].name = e.target.value;
                          setConfig({ ...config, leadership: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Designation</label>
                      <input
                        type="text"
                        value={leader.designation}
                        onChange={(e) => {
                          const updated = [...config.leadership];
                          updated[index].designation = e.target.value;
                          setConfig({ ...config, leadership: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Photo Image URL</label>
                    <input
                      type="url"
                      value={leader.image}
                      onChange={(e) => {
                        const updated = [...config.leadership];
                        updated[index].image = e.target.value;
                        setConfig({ ...config, leadership: updated });
                      }}
                      className="w-full px-3 py-2 rounded-lg border text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Biography</label>
                    <textarea
                      rows={3}
                      value={leader.bio}
                      onChange={(e) => {
                        const updated = [...config.leadership];
                        updated[index].bio = e.target.value;
                        setConfig({ ...config, leadership: updated });
                      }}
                      className="w-full p-2.5 rounded-lg border text-xs leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: WORSHIP TEAM */}
        {activeTab === 'worship' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            <h2 className="font-serif text-xl font-bold text-slate-900 border-b pb-3">
              Worship Team Content & Photo
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Heading</label>
              <input
                type="text"
                value={config.worshipTeam.heading}
                onChange={(e) => setConfig({
                  ...config,
                  worshipTeam: { ...config.worshipTeam, heading: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg border text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
              <textarea
                rows={3}
                value={config.worshipTeam.description}
                onChange={(e) => setConfig({
                  ...config,
                  worshipTeam: { ...config.worshipTeam, description: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg border text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Worship Team Group Photo URL
              </label>
              <input
                type="url"
                value={config.worshipTeam.image}
                onChange={(e) => setConfig({
                  ...config,
                  worshipTeam: { ...config.worshipTeam, image: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg border text-xs font-mono"
              />
            </div>
          </div>
        )}

        {/* TAB 7: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Manage Church Gallery Images ({config.galleryItems.length})
              </h2>
              <button
                onClick={() => {
                  const newItem = {
                    id: 'gal-' + Date.now(),
                    title: 'New Gallery Photo',
                    category: 'Sunday Worship',
                    imageUrl: 'https://images.unsplash.com/photo-1543791187-df796fa11835?auto=format&fit=crop&w=900&q=80',
                    caption: 'Add description here'
                  };
                  setConfig({ ...config, galleryItems: [newItem, ...config.galleryItems] });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-church-primary text-white text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.galleryItems.map((item, index) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 flex gap-4 bg-slate-50 items-start">
                  <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...config.galleryItems];
                        updated[index].title = e.target.value;
                        setConfig({ ...config, galleryItems: updated });
                      }}
                      className="w-full px-2 py-1 rounded border text-xs font-bold"
                    />
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const updated = [...config.galleryItems];
                        updated[index].category = e.target.value;
                        setConfig({ ...config, galleryItems: updated });
                      }}
                      className="w-full px-2 py-1 rounded border text-xs"
                    >
                      {config.galleryCategories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <input
                      type="url"
                      value={item.imageUrl}
                      onChange={(e) => {
                        const updated = [...config.galleryItems];
                        updated[index].imageUrl = e.target.value;
                        setConfig({ ...config, galleryItems: updated });
                      }}
                      className="w-full px-2 py-1 rounded border text-[11px] font-mono text-slate-600"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const updated = config.galleryItems.filter((_, i) => i !== index);
                      setConfig({ ...config, galleryItems: updated });
                    }}
                    className="text-rose-600 hover:text-rose-800 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: EVENTS */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Church Events & Announcements
              </h2>
              <button
                onClick={() => {
                  const newEv = {
                    id: 'event-' + Date.now(),
                    title: 'New Church Program',
                    date: 'Date to be announced',
                    time: '12:00 PM',
                    description: 'Program description goes here...',
                    location: 'Mighty Nation Church, Wadala',
                    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                    tag: 'Program'
                  };
                  setConfig({ ...config, events: [newEv, ...config.events] });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-church-primary text-white text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="space-y-4">
              {config.events.map((ev, index) => (
                <div key={ev.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex justify-between">
                    <input
                      type="text"
                      value={ev.title}
                      onChange={(e) => {
                        const updated = [...config.events];
                        updated[index].title = e.target.value;
                        setConfig({ ...config, events: updated });
                      }}
                      className="font-bold text-sm px-2 py-1 rounded border w-2/3"
                    />
                    <button
                      onClick={() => {
                        const updated = config.events.filter((_, i) => i !== index);
                        setConfig({ ...config, events: updated });
                      }}
                      className="text-rose-600 hover:text-rose-800 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Date"
                      value={ev.date}
                      onChange={(e) => {
                        const updated = [...config.events];
                        updated[index].date = e.target.value;
                        setConfig({ ...config, events: updated });
                      }}
                      className="text-xs px-2 py-1 rounded border"
                    />
                    <input
                      type="text"
                      placeholder="Time"
                      value={ev.time}
                      onChange={(e) => {
                        const updated = [...config.events];
                        updated[index].time = e.target.value;
                        setConfig({ ...config, events: updated });
                      }}
                      className="text-xs px-2 py-1 rounded border"
                    />
                    <input
                      type="text"
                      placeholder="Tag"
                      value={ev.tag}
                      onChange={(e) => {
                        const updated = [...config.events];
                        updated[index].tag = e.target.value;
                        setConfig({ ...config, events: updated });
                      }}
                      className="text-xs px-2 py-1 rounded border"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={ev.description}
                    onChange={(e) => {
                      const updated = [...config.events];
                      updated[index].description = e.target.value;
                      setConfig({ ...config, events: updated });
                    }}
                    className="w-full text-xs p-2 rounded border"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: GENERAL & CONTACT */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            <h2 className="font-serif text-xl font-bold text-slate-900 border-b pb-3">
              General Church & Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  value={config.contact.phone}
                  onChange={(e) => setConfig({
                    ...config,
                    contact: { ...config.contact, phone: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <input
                  type="text"
                  value={config.contact.email}
                  onChange={(e) => setConfig({
                    ...config,
                    contact: { ...config.contact, email: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Church Address</label>
              <textarea
                rows={2}
                value={config.location.fullAddress}
                onChange={(e) => setConfig({
                  ...config,
                  location: { ...config.location, fullAddress: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg border text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Google Maps Embed URL</label>
              <input
                type="text"
                value={config.location.mapsEmbedUrl}
                onChange={(e) => setConfig({
                  ...config,
                  location: { ...config.location, mapsEmbedUrl: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg border text-xs font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
