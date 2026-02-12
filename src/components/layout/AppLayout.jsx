import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-kmf-bg flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 bg-kmf-panel/80 backdrop-blur-md border-b border-kmf-accent/10 flex items-center px-4 lg:hidden sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-kmf-text-secondary hover:text-kmf-accent transition-colors p-2 -ml-2"
          >
            <FaBars size={20} />
          </button>
          <div className="flex items-center gap-2 ml-3">
            <img src="/logo.png" alt="KMF" className="w-7 h-7" />
            <span className="text-sm font-bold gradient-text">K.M.F.</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
