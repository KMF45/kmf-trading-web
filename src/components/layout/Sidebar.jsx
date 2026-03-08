import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaHome, FaPlus, FaHistory, FaChartLine, FaClipboardCheck,
  FaTasks, FaCalculator, FaCog, FaSignOutAlt, FaTimes, FaChevronLeft
} from 'react-icons/fa';

const navItems = [
  { to: '/app', icon: FaHome, label: 'Dashboard', end: true },
  { to: '/app/add-trade', icon: FaPlus, label: 'Add Trade' },
  { to: '/app/history', icon: FaHistory, label: 'History' },
  { to: '/app/statistics', icon: FaChartLine, label: 'Statistics' },
  { to: '/app/weekly-review', icon: FaClipboardCheck, label: 'Weekly Review' },
  { to: '/app/checklist', icon: FaTasks, label: 'Checklist' },
  { to: '/app/calculator', icon: FaCalculator, label: 'Lot Calculator' },
  { to: '/app/settings', icon: FaCog, label: 'Settings' },
];

const Sidebar = ({ isOpen, onClose, collapsed, onToggleCollapse }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden modal-backdrop" onClick={onClose} />
      )}

      <aside className={`fixed top-0 left-0 h-full z-50 border-r border-kmf-accent/10
        transition-all duration-300 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        ${collapsed ? 'w-20' : 'w-64'}`}
        style={{ background: 'linear-gradient(180deg, #1A1D24 0%, #14171C 100%)' }}
      >
        {/* Logo */}
        <div className={`p-4 border-b border-white/5 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="flex items-center gap-3">
              <picture>
                <source srcSet="/logo-80.webp" type="image/webp" />
                <img src="/logo-80.png" alt="KMF" className="w-9 h-9 drop-shadow-[0_0_8px_rgba(79,195,247,0.4)]" width="36" height="36" />
              </picture>
              <span className="text-base font-bold logo-text">K.M.F.</span>
            </div>
          )}
          {collapsed && (
            <picture>
              <source srcSet="/logo-80.webp" type="image/webp" />
              <img src="/logo-80.png" alt="KMF" className="w-9 h-9 drop-shadow-[0_0_8px_rgba(79,195,247,0.4)]" width="36" height="36" />
            </picture>
          )}
          <button onClick={onClose} className="lg:hidden text-kmf-text-tertiary hover:text-kmf-accent transition-colors">
            <FaTimes size={18} />
          </button>
          <button onClick={onToggleCollapse} className="hidden lg:block text-kmf-text-tertiary hover:text-kmf-accent transition-colors">
            <FaChevronLeft size={14} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* User info */}
        <div className={`p-4 border-b border-white/5 ${collapsed ? 'px-2' : ''}`}>
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-kmf-accent to-kmf-accent-bright flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-glow">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-kmf-text-primary truncate">{user?.displayName || 'Trader'}</p>
                <p className="text-xs text-kmf-text-tertiary truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                ${collapsed ? 'justify-center px-2' : ''}
                ${isActive
                  ? 'nav-item-active bg-kmf-accent/10 text-kmf-accent'
                  : 'text-kmf-text-secondary hover:text-kmf-text-primary'
                }`
              }
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full
              text-kmf-loss/70 hover:text-kmf-loss hover:bg-kmf-loss/8 transition-all
              ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? 'Logout' : undefined}
          >
            <FaSignOutAlt size={18} className="flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
