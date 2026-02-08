import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaHome, FaPlus, FaHistory, FaChartLine, FaClipboardCheck, 
  FaTasks, FaCalculator, FaBell, FaDatabase, FaGlobe 
} from 'react-icons/fa';

const features = [
  {
    icon: FaHome,
    title: 'Dashboard',
    description: 'Real-time overview of your trading performance with balance evolution chart and key metrics',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FaPlus,
    title: 'Add Trade',
    description: 'Quick trade entry with autocomplete symbols, photo upload, and pre-trade checklist',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FaHistory,
    title: 'Trade History',
    description: 'Complete history of all your trades with advanced search and filtering options',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FaChartLine,
    title: 'Statistics',
    description: 'Detailed analytics including win rate, profit factor, and performance by instrument',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: FaClipboardCheck,
    title: 'Weekly Review',
    description: 'Self-evaluation system with reflection notes and goal tracking for continuous improvement',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: FaTasks,
    title: 'Checklist',
    description: 'Customizable pre-trade checklists to ensure discipline and consistency in every trade',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: FaCalculator,
    title: 'Lot Calculator',
    description: 'Calculate optimal position size based on account balance and risk percentage',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: FaBell,
    title: 'Smart Notifications',
    description: 'Daily trade reminders, weekly review alerts, and performance notifications',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: FaDatabase,
    title: 'Backup & Restore',
    description: 'Export all data to JSON or PDF. Never lose your trading history with secure backups',
    color: 'from-slate-500 to-gray-500',
  },
  {
    icon: FaGlobe,
    title: 'Multilingual',
    description: 'Full support for 7 languages: EN, RO, RU, JA, FR, DE, ZH for global traders',
    color: 'from-violet-500 to-purple-500',
  },
];

const FeatureCard = ({ feature, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-kmf-accent to-kmf-accent-bright rounded-2xl opacity-0 
                    group-hover:opacity-100 blur transition duration-500 group-hover:duration-200"></div>
      
      <div className="relative bg-kmf-panel rounded-2xl p-6 border border-kmf-accent/30 
                    hover:border-kmf-accent transition-all duration-300 hover-lift h-full">
        <div className="relative mb-4 inline-block">
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-xl opacity-50 rounded-full`}></div>
          <div className="relative bg-kmf-surface rounded-xl p-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="text-3xl text-kmf-accent group-hover:text-kmf-accent-bright transition-colors" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-kmf-text-primary mb-3 group-hover:text-kmf-accent transition-colors">
          {feature.title}
        </h3>

        <p className="text-kmf-text-tertiary leading-relaxed">
          {feature.description}
        </p>

        <div className="mt-4 flex items-center text-kmf-accent opacity-0 group-hover:opacity-100 
                      transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
          <span className="text-sm font-semibold mr-2">Learn more</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kmf-accent/5 to-transparent"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold 
                         border border-kmf-accent/30">
              ✨ Powerful Features
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Everything You Need</span>
          </h2>

          <p className="text-lg sm:text-xl text-kmf-text-tertiary max-w-3xl mx-auto">
            Track, analyze, and improve your trading performance with our comprehensive suite of professional tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-kmf-text-secondary text-lg mb-6">
              Ready to take your trading to the next level?
            </p>
            
              href="#download"
              className="inline-block px-8 py-4 bg-gradient-to-r from-kmf-accent to-kmf-accent-bright 
                       text-white font-semibold rounded-lg shadow-glow hover:shadow-glow-hover 
                       transition-all duration-300 hover:scale-105"
            >
              Get Started Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
