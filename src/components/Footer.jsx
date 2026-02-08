import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-kmf-bg border-t border-kmf-accent/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-t from-kmf-accent/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-kmf-accent to-kmf-accent-bright flex items-center justify-center text-xl font-bold text-white">
                KMF
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">K.M.F. Trading Journal</h3>
                <p className="text-sm text-kmf-text-tertiary">Keep Moving Forward</p>
              </div>
            </div>
            <p className="text-kmf-text-secondary mb-4 max-w-md">
              Professional trading journal for serious traders. Track, analyze, and improve your trading performance.
            </p>
            <div className="flex gap-4">
              
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-2xl" />
              </a>
              
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-2xl" />
              </a>
              
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              
                href="mailto:contact@kmf-trading.com"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="text-2xl" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-kmf-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Features', 'Download', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  
                    href={`#${link.toLowerCase()}`}
                    className="text-kmf-text-secondary hover:text-kmf-accent transition-colors 
                             inline-block hover:translate-x-1 duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-kmf-text-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((link) => (
                <li key={link}>
                  
                    href="#"
                    className="text-kmf-text-secondary hover:text-kmf-accent transition-colors 
                             inline-block hover:translate-x-1 duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-kmf-accent/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-kmf-text-tertiary text-sm text-center sm:text-left">
              © {currentYear} K.M.F. Trading Journal. All rights reserved.
            </p>

            <motion.p
              className="text-kmf-text-tertiary text-sm flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaHeart className="text-kmf-loss" />
              </motion.span>
              for traders
            </motion.p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <span className="text-xs text-kmf-text-tertiary px-3 py-1 bg-kmf-panel rounded-full border border-kmf-accent/20">
            v1.0.0 • Landing Page
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
