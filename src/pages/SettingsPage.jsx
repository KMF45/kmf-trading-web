import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTrades } from '../contexts/TradesContext';
import { FaCog, FaSave, FaCheck, FaUser, FaShieldAlt, FaExternalLinkAlt } from 'react-icons/fa';

const inputClass = "w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-kmf-text-primary text-sm placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent focus:ring-1 focus:ring-kmf-accent/30 transition-all";

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD', 'RON'];
const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ro', label: 'Română' },
  { code: 'ru', label: 'Русский' },
  { code: 'ja', label: '日本語' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh', label: '中文' },
];

const SettingsPage = () => {
  const { user } = useAuth();
  const { settings, saveSettings, syncing } = useTrades();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    accountBalance: settings.accountBalance?.toString() || '10000',
    currency: settings.currency || 'USD',
    language: settings.language || 'en',
    riskPerTrade: settings.riskPerTrade?.toString() || '1',
    defaultLotSize: settings.defaultLotSize?.toString() || '0.01',
  });

  useEffect(() => {
    setForm({
      accountBalance: settings.accountBalance?.toString() || '10000',
      currency: settings.currency || 'USD',
      language: settings.language || 'en',
      riskPerTrade: settings.riskPerTrade?.toString() || '1',
      defaultLotSize: settings.defaultLotSize?.toString() || '0.01',
    });
  }, [settings]);

  const handleSave = async () => {
    await saveSettings({
      accountBalance: parseFloat(form.accountBalance) || 10000,
      currency: form.currency,
      language: form.language,
      riskPerTrade: parseFloat(form.riskPerTrade) || 1,
      defaultLotSize: parseFloat(form.defaultLotSize) || 0.01,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaCog className="text-kmf-accent text-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Settings</h1>
          <p className="text-sm text-kmf-text-tertiary">Manage your account and preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Account Info */}
        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FaUser className="text-kmf-accent text-sm" />
            <h3 className="text-sm font-semibold text-kmf-accent uppercase tracking-wider">Account</h3>
          </div>
          <div className="flex items-center gap-4 p-4 bg-kmf-surface/50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-kmf-accent to-kmf-accent-bright flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-kmf-text-primary">{user?.displayName || 'Trader'}</p>
              <p className="text-xs text-kmf-text-tertiary">{user?.email}</p>
              <p className="text-xs text-kmf-text-tertiary/60 mt-0.5">
                {user?.emailVerified ? 'Email verified' : 'Email not verified'}
              </p>
            </div>
          </div>
        </div>

        {/* Trading Settings */}
        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <FaCog className="text-kmf-accent text-sm" />
            <h3 className="text-sm font-semibold text-kmf-accent uppercase tracking-wider">Trading</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">Account Balance</label>
              <input
                type="number"
                step="any"
                className={inputClass}
                value={form.accountBalance}
                onChange={(e) => setForm(p => ({ ...p, accountBalance: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">Currency</label>
              <select
                className={inputClass}
                value={form.currency}
                onChange={(e) => setForm(p => ({ ...p, currency: e.target.value }))}
              >
                {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">Default Risk (%)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="100"
                className={inputClass}
                value={form.riskPerTrade}
                onChange={(e) => setForm(p => ({ ...p, riskPerTrade: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">Default Lot Size</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                className={inputClass}
                value={form.defaultLotSize}
                onChange={(e) => setForm(p => ({ ...p, defaultLotSize: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-kmf-text-secondary mb-1.5">Language</label>
            <select
              className={inputClass}
              value={form.language}
              onChange={(e) => setForm(p => ({ ...p, language: e.target.value }))}
            >
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={syncing}
            className={`w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
              saved
                ? 'bg-kmf-profit/20 text-kmf-profit border border-kmf-profit/30'
                : 'bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white hover:shadow-glow'
            } disabled:opacity-50`}
          >
            {saved ? <><FaCheck /> Saved!</> : syncing ? 'Saving...' : <><FaSave /> Save Settings</>}
          </button>
        </div>

        {/* Legal */}
        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <FaShieldAlt className="text-kmf-accent text-sm" />
            <h3 className="text-sm font-semibold text-kmf-accent uppercase tracking-wider">Legal</h3>
          </div>
          <a
            href="/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-kmf-surface/50 hover:bg-kmf-surface transition-colors group"
          >
            <span className="text-sm text-kmf-text-secondary group-hover:text-kmf-text-primary">Privacy Policy</span>
            <FaExternalLinkAlt className="text-xs text-kmf-text-tertiary" />
          </a>
          <a
            href="/terms-of-service.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-kmf-surface/50 hover:bg-kmf-surface transition-colors group"
          >
            <span className="text-sm text-kmf-text-secondary group-hover:text-kmf-text-primary">Terms of Service</span>
            <FaExternalLinkAlt className="text-xs text-kmf-text-tertiary" />
          </a>
        </div>

        {/* App Info */}
        <div className="text-center py-4">
          <p className="text-xs text-kmf-text-tertiary">K.M.F. Trading Journal v2.0.0</p>
          <p className="text-xs text-kmf-text-tertiary/50 mt-1">Keep Moving Forward</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
