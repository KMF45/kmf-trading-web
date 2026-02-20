import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';


const Navbar = () => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-kmf-bg/95 backdrop-blur-md border-b border-kmf-accent/20 shadow-[0_0_20px_rgba(79,195,247,0.1)]' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <picture>
              <source srcSet="/logo-80.webp" type="image/webp" />
              <img src="/logo-80.png" alt="K.M.F. Trading Journal" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(79,195,247,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(79,195,247,0.6)] transition-all" width="40" height="40" loading="lazy" />
            </picture>
            <span className="text-lg font-bold logo-text hidden sm:block">K.M.F.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium">Features</a>
            <a href="/#download" className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium">Download</a>
            <a href="/#faq" className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium">FAQ</a>
            <Link to="/blog" className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium">Blog</Link>

          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-kmf-text-secondary hover:text-kmf-accent transition-colors p-2"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-6 border-t border-kmf-accent/10 mt-2 pt-4 animate-fadeIn">
            <div className="flex flex-col gap-4">
              <a href="/#features" onClick={() => setMobileOpen(false)} className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium px-2 py-1">Features</a>
              <a href="/#download" onClick={() => setMobileOpen(false)} className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium px-2 py-1">Download</a>
              <a href="/#faq" onClick={() => setMobileOpen(false)} className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium px-2 py-1">FAQ</a>
              <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium px-2 py-1">Blog</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
