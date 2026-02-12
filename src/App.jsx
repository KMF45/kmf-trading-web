import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Download from './components/Download';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-kmf-bg animate-fadeIn">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-kmf-accent to-kmf-accent-bright animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-bold gradient-text">
              K.M.F. Trading Journal
            </h2>
            <div className="mt-6 w-64 h-1 bg-kmf-panel rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-kmf-accent to-kmf-accent-bright loading-bar"></div>
            </div>
          </div>
        </div>
      )}

      <div className={`min-h-screen transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <main>
          <Hero />
          <Features />
          <Download />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
