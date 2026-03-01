import { useState } from 'react';
import { FaAndroid, FaCheckCircle, FaLock, FaGlobe, FaCloud, FaShieldAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
// Firebase loaded lazily on form submit (not on page load)
const getFirestore = async () => {
  const [{ db }, fs] = await Promise.all([
    import('../config/firebase'),
    import('firebase/firestore'),
  ]);
  return { db, collection: fs.collection, addDoc: fs.addDoc, serverTimestamp: fs.serverTimestamp };
};

const Download = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleNotify = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    try {
      const fs = await getFirestore();
      await fs.addDoc(fs.collection(fs.db, 'betaSignups'), {
        email: email.trim().toLowerCase(),
        source: 'launch-notify',
        createdAt: fs.serverTimestamp(),
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Download K.M.F. Trading Journal for Android">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg3OSwxOTUsMjQ3LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kmf-accent/20 rounded-full blur-3xl animate-pulse" style={{ willChange: 'opacity' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kmf-accent-bright/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', willChange: 'opacity' }}></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto animate-fadeIn">
          <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-kmf-accent/30
                        shadow-glow-strong overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-kmf-accent/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-kmf-accent-bright/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-kmf-accent/20 text-kmf-accent
                             rounded-full text-sm font-semibold border border-kmf-accent/50 shadow-glow">
                  <HiSparkles className="text-lg" aria-hidden="true" />
                  Launching Soon on Google Play
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6">
                <span className="gradient-text">Coming Soon</span>
              </h2>

              <p className="text-xl text-kmf-text-secondary text-center mb-8 max-w-2xl mx-auto">
                K.M.F. Trading Journal is launching on Google Play soon. Get notified on launch day and never miss your chance to start journaling.
              </p>

              {/* Notify me form */}
              <div className="flex justify-center mb-12">
                {status === 'success' ? (
                  <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl"
                    style={{ background: 'rgba(0,200,83,0.10)', border: '1px solid rgba(0,200,83,0.25)' }}>
                    <FaCheckCircle style={{ color: '#00C853', fontSize: 18, flexShrink: 0 }} />
                    <p className="text-sm font-semibold text-kmf-text-primary">You're on the list! We'll email you on launch day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-5 py-4 rounded-xl text-sm text-kmf-text-primary placeholder-kmf-text-tertiary outline-none focus:ring-2 focus:ring-kmf-accent/40 transition-all"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(79,195,247,0.20)' }}
                    />
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200', boxShadow: '0 4px 20px rgba(255,179,0,0.25)' }}
                    >
                      <FaAndroid className="text-xl" aria-hidden="true" />
                      {status === 'sending' ? 'Joining...' : 'Notify Me'}
                    </button>
                  </form>
                )}
              </div>
              {status === 'error' && (
                <p className="text-xs text-center mb-6" style={{ color: '#FF5252' }}>
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {[
                  'Free to download',
                  'Premium features with subscription',
                  'Offline functionality',
                  'Regular updates',
                  'Secure data storage',
                  'Export to PDF/JSON',
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-kmf-text-secondary"
                  >
                    <FaCheckCircle className="text-kmf-profit text-xl flex-shrink-0" aria-hidden="true" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-12 text-center">
                <p className="text-sm text-kmf-text-tertiary mb-4">
                  Privacy-focused • Cloud synced • Professional tools
                </p>
                <div className="flex justify-center gap-8 flex-wrap">
                  <div className="flex items-center gap-2 text-kmf-text-tertiary">
                    <FaShieldAlt className="text-xl text-kmf-accent" aria-hidden="true" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-2 text-kmf-text-tertiary">
                    <FaLock className="text-xl text-kmf-accent" aria-hidden="true" />
                    <span>Data Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-kmf-text-tertiary">
                    <FaGlobe className="text-xl text-kmf-accent" aria-hidden="true" />
                    <span>8 Languages</span>
                  </div>
                  <div className="flex items-center gap-2 text-kmf-text-tertiary">
                    <FaCloud className="text-xl text-kmf-accent" aria-hidden="true" />
                    <span>Cloud Sync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
