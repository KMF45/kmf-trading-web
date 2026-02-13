import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTrades } from '../contexts/TradesContext';
import { FaCog, FaSignOutAlt, FaChevronRight, FaCheck, FaSave } from 'react-icons/fa';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'NZD', 'CAD', 'CNY'];
const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'en-us', label: 'English (US)', flag: '🇺🇸' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { settings, saveSettings, trades, syncing } = useTrades();

  const [balance, setBalance] = useState(settings.accountBalance?.toString() || '10000');
  const [currency, setCurrency] = useState(settings.currency || 'USD');
  const [language, setLanguage] = useState(settings.language || 'en');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await saveSettings({
      accountBalance: parseFloat(balance) || 10000,
      currency,
      language,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = async () => {
    try { await logout(); } catch (e) { console.error('Logout error:', e); }
  };

  const handleExportJSON = () => {
    const data = JSON.stringify({ trades, settings, exportDate: new Date().toISOString() }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kmf_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    if (trades.length === 0) return;
    const headers = ['Instrument', 'Type', 'Entry Price', 'Stop Loss', 'Take Profit', 'Lot Size', 'P&L', 'Result', 'Rating', 'Date', 'Notes'];
    const rows = trades.map(t => [
      t.instrument, t.type, t.entryPrice, t.stopLoss || '', t.takeProfit || '', t.lotSize,
      t.actualPnL ?? t.pnlAmount ?? 0, t.result, t.rating,
      new Date(t.tradeDateTime || t.timestamp).toISOString(), `"${(t.notes || '').replace(/"/g, '""')}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kmf_trades_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const SectionHeader = ({ title }) => (
    <p className="text-xs font-semibold text-kmf-text-tertiary uppercase tracking-wider px-1 pt-4 pb-1">{title}</p>
  );

  const SettingRow = ({ icon, label, sublabel, onClick, right }) => (
    <button onClick={onClick} className="w-full bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 flex items-center gap-3 hover:border-kmf-accent/20 transition-all text-left">
      <span className="text-lg">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-kmf-text-primary">{label}</p>
        {sublabel && <p className="text-xs text-kmf-text-tertiary truncate">{sublabel}</p>}
      </div>
      {right || <FaChevronRight className="text-kmf-text-tertiary text-xs" />}
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-1 animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        <FaCog className="text-kmf-accent text-xl" />
        <h1 className="text-2xl font-bold text-kmf-text-primary">Settings</h1>
      </div>

      {/* Account */}
      <SectionHeader title="Account" />
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-kmf-accent/20 flex items-center justify-center text-kmf-accent font-bold">{user?.email?.[0]?.toUpperCase() || '?'}</div>
        <div>
          <p className="text-sm text-kmf-text-primary">Logged in as</p>
          <p className="text-xs text-kmf-accent">{user?.email || 'Unknown'}</p>
        </div>
      </div>
      <SettingRow icon="🚪" label="Logout" sublabel="Sign out from your account" onClick={handleLogout} />

      {/* Account Settings */}
      <SectionHeader title="Account Settings" />
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 space-y-3">
        <div>
          <label className="text-xs text-kmf-text-tertiary mb-1 block">💰 Balance</label>
          <div className="flex items-center gap-2">
            <input type="number" step="any" value={balance} onChange={(e) => setBalance(e.target.value)}
              className="flex-1 bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-sm text-kmf-text-primary focus:outline-none focus:border-kmf-accent" />
            <span className="text-xs text-kmf-text-tertiary">{currency}</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-kmf-text-tertiary mb-1 block">💲 Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-sm text-kmf-text-primary focus:outline-none focus:border-kmf-accent">
            {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Language */}
      <SectionHeader title="Appearance" />
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
        <label className="text-xs text-kmf-text-tertiary mb-1 block">🌍 Language</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-sm text-kmf-text-primary focus:outline-none focus:border-kmf-accent">
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
        </select>
      </div>

      {/* Save Button */}
      <button onClick={handleSave} disabled={syncing}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white font-bold text-sm hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2">
        {saved ? <><FaCheck /> Saved!</> : syncing ? 'Saving...' : <><FaSave /> Save Settings</>}
      </button>

      {/* Legal */}
      <SectionHeader title="Legal" />
      <SettingRow icon="📋" label="Privacy Policy" sublabel="Read our privacy policy" onClick={() => window.open('/privacy-policy.html', '_blank')} />
      <SettingRow icon="📄" label="Terms of Service" sublabel="Read our terms and conditions" onClick={() => window.open('/terms-of-service.html', '_blank')} />

      {/* Support */}
      <SectionHeader title="Support" />
      <SettingRow icon="🐛" label="Report a Bug" sublabel="Help us improve the app" onClick={() => window.open('mailto:kmf45.ai@gmail.com?subject=Bug Report', '_blank')} />
      <SettingRow icon="💡" label="Request a Feature" sublabel="Suggest new features" onClick={() => window.open('mailto:kmf45.ai@gmail.com?subject=Feature Request', '_blank')} />

      {/* Data */}
      <SectionHeader title="Data" />
      <SettingRow icon="📥" label="Export JSON" sublabel="Export all trades to JSON file" onClick={handleExportJSON} />
      <SettingRow icon="📊" label="Export CSV" sublabel="Export all trades to CSV file" onClick={handleExportCSV} />

      {/* Version */}
      <div className="text-center py-4">
        <span className="text-xs text-kmf-text-tertiary px-3 py-1 bg-kmf-panel rounded-full border border-kmf-accent/10">
          v2.0.0 • Web App
        </span>
      </div>
    </div>
  );
};

export default SettingsPage;
