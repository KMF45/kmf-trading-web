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
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="orb w-96 h-96 bottom-20 -right-48"
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, duration: 1 }}
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
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">K.M.F.</span>
            <br />
            <span className="text-kmf-text-primary">Trading Journal</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl sm:text-3xl font-semibold text-kmf-text-secondary mb-4"
          >
            <Typewriter
              options={{
                strings: ['KEEP MOVING FORWARD', 'TRACK YOUR TRADES', 'ANALYZE PERFORMANCE'],
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
            Professional trading journal for serious traders. Track your trades and improve your strategy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            
              href="#download"
              className="group px-8 py-4 bg-kmf-accent-bright text-white text-lg font-semibold rounded-lg shadow-glow hover:shadow-glow-hover transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <FaDownload className="text-xl" />
              Download App
            </a>
            <button
              onClick={scrollToFeatures}
              className="group px-8 py-4 bg-transparent text-kmf-accent text-lg font-semibold rounded-lg border-2 border-kmf-accent hover:bg-kmf-accent hover:text-white transition-all duration-300 flex items-center gap-3 hover:scale-105"
            >
              <HiSparkles className="text-xl" />
              Explore Features
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
