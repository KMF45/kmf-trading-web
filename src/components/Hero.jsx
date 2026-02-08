import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="orb w-96 h-96 top-20 -left-48"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="orb w-96 h-96 bottom-20 -right-48"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg3OSwxOTUsMjQ3LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              duration: 1 
            }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-kmf-accent blur-2xl opacity-50 rounded-full"></div>
              <div className="w-32 h-32 relative z-10 rounded-full bg-gradient-to-r from-kmf-accent to-kmf-accent-bright flex items-center justify-center text-5xl font-bold text-white shadow-glow-strong">
                KMF
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="gradient-text">K.M.F.</span>
            <br />
            <span className="text-kmf-text-primary">Trading Journal</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-kmf-text-secondary mb-4 tracking-wider"
          >
            <Typewriter
              options={{
                strings: ['KEEP MOVING FORWARD', 'TRACK YOUR TRADES', 'ANALYZE PERFORMANCE', 'IMPROVE YOUR STRATEGY'],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 50,
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg sm:text-xl text-kmf-text-tertiary max-w-3xl mx-auto mb-12"
          >
            Professional trading journal for serious traders. Track your trades, 
            analyze performance, and continuously improve your strategy with real-time insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            
              href="#download"
              className="group relative px-8 py-4 bg-kmf-accent-bright text-white text-lg font-semibold rounded-lg 
                       shadow-glow hover:shadow-glow-hover transition-all duration-300 
                       hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <FaDownload className="text-xl group-hover:animate-bounce" />
              Download App
            </a>
            
            <button
              onClick={scrollToFeatures}
              className="group px-8 py-4 bg-transparent text-kmf-accent text-lg font-semibold rounded-lg 
                       border-2 border-kmf-accent hover:bg-kmf-accent hover:text-white 
                       transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center
                       hover:scale-105 hover:shadow-glow"
            >
              <HiSparkles className="text-xl group-hover:rotate-12 transition-transform" />
              Explore Features
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: '📊', label: '100+ Symbols', desc: 'Forex, Crypto, Stocks' },
              { icon: '🌍', label: '7 Languages', desc: 'Full Multilingual Support' },
              { icon: '📈', label: '10+ Features', desc: 'Professional Tools' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                className="glass p-6 rounded-2xl hover-lift group cursor-default"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-2xl font-bold gradient-text mb-1">{stat.label}</div>
                <div className="text-sm text-kmf-text-tertiary">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToFeatures}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-kmf-accent hover:text-kmf-accent-bright transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
