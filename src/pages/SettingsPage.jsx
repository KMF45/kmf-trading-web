import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTrades } from '../contexts/TradesContext';
import { FaCog, FaChevronDown, FaChevronUp, FaCheck, FaSave, FaUser, FaDatabase, FaLifeRing, FaInfoCircle } from 'react-icons/fa';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'NZD', 'CAD', 'RON'];
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

const inputClass = "w-full bg-kmf-surface border border-kmf-accent/15 rounded-xl px-4 py-2.5 text-sm text-kmf-text-primary focus:outline-none focus:border-kmf-accent focus:shadow-[0_0_0_3px_rgba(79,195,247,0.1)] transition-all";

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const { settings, saveSettings, trades, syncing } = useTrades();

  const [balance, setBalance] = useState(settings.accountBalance?.toString() || '10000');
  const [currency, setCurrency] = useState(settings.currency || 'USD');
  const [language, setLanguage] = useState(settings.language || 'en');
  const [saved, setSaved] = useState(false);
  const [expandedSection, setExpandedSection] = useState('account');
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const toggleSection = (key) => setExpandedSection(prev => prev === key ? null : key);

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

  const Section = ({ id, icon: Icon, title, children }) => {
    const isOpen = expandedSection === id;
    return (
      <div className="glass-card rounded-2xl overflow-hidden">
        <button onClick={() => toggleSection(id)}
          className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition-colors">
          <Icon className="text-kmf-accent text-sm" />
          <span className="text-sm font-semibold text-kmf-text-primary flex-1">{title}</span>
          {isOpen ? <FaChevronUp className="text-kmf-text-tertiary text-xs" /> : <FaChevronDown className="text-kmf-text-tertiary text-xs" />}
        </button>
        {isOpen && (
          <div className="px-4 pb-4 border-t border-white/5 pt-3 expand-enter space-y-3">
            {children}
          </div>
        )}
      </div>
    );
  };

  const SettingRow = ({ icon, label, sublabel, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-all text-left">
      <span className="text-lg">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-kmf-text-primary">{label}</p>
        {sublabel && <p className="text-xs text-kmf-text-tertiary truncate">{sublabel}</p>}
      </div>
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-3 animate-fadeIn stagger-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 flex items-center justify-center border border-gray-500/20">
          <FaCog className="text-kmf-text-secondary text-lg" />
        </div>
        <h1 className="text-2xl font-bold text-kmf-text-primary">Settings</h1>
      </div>

      {/* Account Section */}
      <Section id="account" icon={FaUser} title="Account">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-kmf-surface/50">
          <div className="w-10 h-10 rounded-full bg-kmf-accent/20 flex items-center justify-center text-kmf-accent font-bold text-sm">
            {user?.email?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-kmf-text-primary truncate">{user?.displayName || 'Trader'}</p>
            <p className="text-xs text-kmf-text-tertiary truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={() => setLogoutConfirm(true)}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-kmf-loss/70 hover:text-kmf-loss hover:bg-kmf-loss/5 transition-all">
          <span className="text-lg">🚪</span>
          <span className="text-sm">Logout</span>
        </button>
      </Section>

      {/* Settings Section */}
      <Section id="settings" icon={FaCog} title="Settings">
        <div>
          <label className="text-xs text-kmf-text-tertiary mb-1 block">💰 Account Balance</label>
          <div className="flex items-center gap-2">
            <input type="number" step="any" value={balance} onChange={(e) => setBalance(e.target.value)}
              className={`${inputClass} flex-1`} />
            <span className="text-xs text-kmf-text-tertiary font-medium">{currency}</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-kmf-text-tertiary mb-1 block">💲 Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputClass}>
            {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-kmf-text-tertiary mb-1 block">🌍 Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className={inputClass}>
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
          </select>
        </div>
        <button onClick={handleSave} disabled={syncing}
          className="btn-primary w-full py-2.5 rounded-xl text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
          {saved ? <><FaCheck size={12} /> Saved!</> : syncing ? 'Saving...' : <><FaSave size={12} /> Save Settings</>}
        </button>
      </Section>

      {/* Data Section */}
      <Section id="data" icon={FaDatabase} title="Data">
        <SettingRow icon="📥" label="Export JSON" sublabel="Download all trades as JSON" onClick={handleExportJSON} />
        <SettingRow icon="📊" label="Export CSV" sublabel="Download all trades as CSV spreadsheet" onClick={handleExportCSV} />
      </Section>

      {/* Support Section */}
      <Section id="support" icon={FaLifeRing} title="Support">
        <SettingRow icon="📋" label="Privacy Policy" sublabel="Read our privacy policy" onClick={() => window.open('/privacy-policy.html', '_blank')} />
        <SettingRow icon="📄" label="Terms of Service" sublabel="Read our terms and conditions" onClick={() => window.open('/terms-of-service.html', '_blank')} />
        <SettingRow icon="🐛" label="Report a Bug" sublabel="Help us improve the app" onClick={() => window.open('mailto:kmf45.ai@gmail.com?subject=Bug Report', '_blank')} />
        <SettingRow icon="💡" label="Request a Feature" sublabel="Suggest new features" onClick={() => window.open('mailto:kmf45.ai@gmail.com?subject=Feature Request', '_blank')} />
      </Section>

      {/* About Section */}
      <Section id="about" icon={FaInfoCircle} title="About">
        <div className="space-y-2">
          <div className="flex justify-between py-1.5">
            <span className="text-sm text-kmf-text-tertiary">App</span>
            <span className="text-sm text-kmf-text-primary font-medium">K.M.F. Trading Journal</span>
          </div>
          <div className="flex justify-between py-1.5 border-t border-white/5">
            <span className="text-sm text-kmf-text-tertiary">Version</span>
            <span className="text-sm text-kmf-text-primary font-medium">2.0.0 Web</span>
          </div>
          <div className="flex justify-between py-1.5 border-t border-white/5">
            <span className="text-sm text-kmf-text-tertiary">Platform</span>
            <span className="text-sm text-kmf-text-primary font-medium">Web App</span>
          </div>
          <div className="flex justify-between py-1.5 border-t border-white/5">
            <span className="text-sm text-kmf-text-tertiary">Website</span>
            <a href="https://kmfjournal.com" target="_blank" rel="noopener noreferrer" className="text-sm text-kmf-accent font-medium hover:underline">kmfjournal.com</a>
          </div>
        </div>
      </Section>

      {/* Bottom spacer */}
      <div className="h-4" />

      {/* Logout Confirm Dialog */}
      {logoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop" onClick={() => setLogoutConfirm(false)}>
          <div className="glass-card rounded-2xl p-5 w-full max-w-sm modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-kmf-text-primary mb-2">Logout?</h3>
            <p className="text-sm text-kmf-text-secondary mb-4">Are you sure you want to sign out?</p>
            <div className="flex gap-3">
              <button onClick={() => setLogoutConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-kmf-text-secondary text-sm font-medium hover-scale transition-all">Cancel</button>
              <button onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl bg-kmf-loss/15 border border-kmf-loss/30 text-kmf-loss text-sm font-bold hover:bg-kmf-loss/25 hover-scale transition-all">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
