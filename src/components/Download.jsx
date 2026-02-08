import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaAndroid, FaDownload, FaCheckCircle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const Download = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-kmf-accent/20 via-transparent to-transparent">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg3OSwxOTUsMjQ3LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-kmf-accent/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kmf-accent-bright/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-kmf-accent/30 
                        shadow-glow-strong overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-kmf-accent/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-kmf-accent-bright/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center mb-6"
              >
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-kmf-accent/20 text-kmf-accent 
                             rounded-full text-sm font-semibold border border-kmf-accent/50 shadow-glow">
                  <HiSparkles className="text-lg" />
                  Now Available
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6"
              >
                <span className="gradient-text">Download Now</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-kmf-text-secondary text-center mb-12 max-w-2xl mx-auto"
              >
                Start tracking your trades professionally. Available for Android devices.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex justify-center mb-12"
              >
                
                  href="#"
                  className="group relative inline-flex items-center gap-4 px-10 py-5 
                           bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white text-xl font-bold 
                           rounded-2xl shadow-glow-strong hover:shadow-glow-hover transition-all duration-300 
                           hover:scale-105 overflow-hidden"
                >
                  <FaAndroid className="text-3xl group-hover:rotate-12 transition-transform" />
                  <span>Download for Android</span>
                  <FaDownload className="text-2xl group-hover:animate-bounce" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
              >
                {[
                  { label: 'Latest Version', value: 'v1.0.0', icon: '🚀' },
                  { label: 'App Size', value: '10 MB', icon: '💾' },
                  { label: 'Minimum Version', value: 'Android 8.0+', icon: '📱' },
                ].map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="bg-kmf-surface/50 rounded-xl p-6 text-center border border-kmf-accent/20 
                             hover:border-kmf-accent/50 transition-all duration-300 hover-lift"
                  >
                    <div className="text-3xl mb-2">{spec.icon}</div>
                    <div className="text-2xl font-bold text-kmf-accent mb-1">{spec.value}</div>
                    <div className="text-sm text-kmf-text-tertiary">{spec.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
              >
                {[
                  'Free to download and use',
                  'No ads or subscriptions',
                  'Offline functionality',
                  'Regular updates',
                  'Secure data storage',
                  'Export to PDF/JSON',
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1 + index * 0.05, duration: 0.5 }}
                    className="flex items-center gap-3 text-kmf-text-secondary"
                  >
                    <FaCheckCircle className="text-kmf-profit text-xl flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-12 text-center"
              >
                <p className="text-sm text-kmf-text-tertiary mb-4">
                  Trusted by traders worldwide • Privacy-focused • Open source friendly
                </p>
                <div className="flex justify-center gap-8 flex-wrap">
                  <div className="flex items-center gap-2 text-kmf-text-tertiary">
                    <span className="text-2xl">⭐</span>
                    <span>4.8/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-kmf-text-tertiary">
                    <span className="text-2xl">📥</span>
                    <span>1K+ Downloads</span>
                  </div>
                  <div className="flex items-center gap-2 text-kmf-text-tertiary">
                    <span className="text-2xl">🔒</span>
                    <span>100% Secure</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Download;
