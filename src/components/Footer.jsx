import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-kmf-bg border-t border-kmf-accent/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-t from-kmf-accent/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo-80.webp"
                alt="K.M.F. Trading Journal logo"
                className="w-12 h-12 drop-shadow-[0_0_8px_rgba(79,195,247,0.4)]"
                width="48"
                height="48"
                loading="lazy"
              />
              <div>
                <h3 className="text-xl font-bold logo-text">K.M.F. Trading Journal</h3>
                <p className="text-sm text-kmf-text-tertiary">Keep Moving Forward</p>
              </div>
            </div>
            <p className="text-kmf-text-secondary mb-4 max-w-md">
              Professional trading journal for serious traders. Track, analyze, and improve your trading performance.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/KMF45"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="mailto:kmf45.ai@gmail.com"
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
              {['Features', 'Download'].map((link) => (
                <li key={link}>
                  <a
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
              <li>
                <a
                  href="/privacy-policy.html"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service.html"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-kmf-accent/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-kmf-text-tertiary text-sm text-center sm:text-left">
              © {currentYear} K.M.F. Trading Journal. All rights reserved.
            </p>
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
