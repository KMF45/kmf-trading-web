import { FaAndroid, FaCheckCircle, FaClock } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const Download = () => {
  return (
    <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Download K.M.F. Trading Journal for Android">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg3OSwxOTUsMjQ3LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kmf-accent/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kmf-accent-bright/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

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
                  <HiSparkles className="text-lg" />
                  Launching Soon on Google Play
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6">
                <span className="gradient-text">Coming Soon</span>
              </h2>

              <p className="text-xl text-kmf-text-secondary text-center mb-12 max-w-2xl mx-auto">
                K.M.F. Trading Journal is launching on Google Play soon. Join the beta program to get early access and free lifetime Premium.
              </p>

              <div className="flex justify-center mb-12">
                <div
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl text-xl font-bold cursor-not-allowed select-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    color: 'rgba(255,255,255,0.30)',
                  }}
                  aria-disabled="true"
                >
                  <FaAndroid className="text-3xl" />
                  <span>Download for Android</span>
                  <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.40)', border: '1px solid rgba(255,255,255,0.10)' }}>
                    <FaClock className="inline mr-1.5" style={{ fontSize: 10 }} />
                    Coming Soon
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[
                  { label: 'Latest Version', value: 'v1.0.0', icon: '🚀' },
                  { label: 'App Size', value: '10 MB', icon: '💾' },
                  { label: 'Minimum Version', value: 'Android 8.0+', icon: '📱' },
                ].map((spec, index) => (
                  <div
                    key={index}
                    className="bg-kmf-surface/50 rounded-xl p-6 text-center border border-kmf-accent/20
                             hover:border-kmf-accent/50 transition-all duration-300 hover-lift"
                  >
                    <div className="text-3xl mb-2">{spec.icon}</div>
                    <div className="text-2xl font-bold text-kmf-accent mb-1">{spec.value}</div>
                    <div className="text-sm text-kmf-text-tertiary">{spec.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {[
                  'Free to download',
                  'Premium features with subscription',
                  'Offline functionality',
                  'Regular updates',
                  'Secure data storage',
                  'Export to PDF/JSON',
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-kmf-text-secondary"
                  >
                    <FaCheckCircle className="text-kmf-profit text-xl flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-sm text-kmf-text-tertiary mb-4">
                  Privacy-focused • Cloud synced • Professional tools
                </p>
                <div className="flex justify-center gap-8 flex-wrap">
                  <div className="flex items-center gap-2 text-kmf-text-tertiary">
                    <span className="text-2xl">🔒</span>
                    <span>100% Secure</span>
                  </div>
                  <div className="flex items-center gap-2 text-kmf-text-tertiary">
                    <span className="text-2xl">🌍</span>
                    <span>8 Languages</span>
                  </div>
                  <div className="flex items-center gap-2 text-kmf-text-tertiary">
                    <span className="text-2xl">☁️</span>
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
