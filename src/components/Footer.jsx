import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
                    href={`/#${link.toLowerCase()}`}
                    className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                             inline-block hover:translate-x-1 duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/blog"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  Blog
                </Link>
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-kmf-text-primary mt-6 mb-3">From the Blog</h4>
            <ul className="space-y-2">
              {[
                { slug: 'best-free-trading-journal-app-android-2026', title: 'Best Trading Journal App 2026' },
                { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate' },
                { slug: 'revenge-trading', title: 'Revenge Trading: How to Stop' },
                { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule Explained' },
              ].map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                             inline-block hover:translate-x-1 duration-200 text-sm"
                  >
                    {post.title}
                  </Link>
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

      </div>
    </footer>
  );
};

export default Footer;
