import { FaEnvelope, FaInstagram, FaTiktok, FaYoutube, FaPinterest } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { openCookieBanner } from './CookieConsent';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-kmf-bg border-t border-kmf-accent/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-t from-kmf-accent/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
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
            <p className="text-kmf-text-secondary mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:kmf45.ai@gmail.com"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/kmfjournal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://www.tiktok.com/@kmf.journal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="text-2xl" />
              </a>
              <a
                href="https://x.com/kmfjournal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="text-2xl" />
              </a>
              <a
                href="https://www.youtube.com/@KMF.JOURNAL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="text-2xl" />
              </a>
              <a
                href="https://pinterest.com/contactkmfjournal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                aria-label="Pinterest"
              >
                <FaPinterest className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-kmf-text-primary mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {[
                { label: t('nav.features'), href: '/#features' },
                { label: t('nav.pricing'), href: '/#pricing' },
                { label: t('nav.download'), href: '/#download' },
                { label: t('nav.faq'), href: '/#faq' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                             inline-block hover:translate-x-1 duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/blog"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-lg font-semibold text-kmf-text-primary mb-4">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/tools/lot-size-calculator"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  Lot Size Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/risk-of-ruin"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  Risk of Ruin Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/win-rate-rr-matrix"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  Win Rate vs R:R Matrix
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/compound-calculator"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  Compound Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/pre-trade-checklist"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  Pre-Trade Checklist
                </Link>
              </li>
            </ul>
          </div>

          {/* From the Blog + Legal */}
          <div>
            <h4 className="text-lg font-semibold text-kmf-text-primary mb-4">{t('footer.fromBlog')}</h4>
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
                             inline-block hover:translate-x-1 duration-200"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold text-kmf-text-primary mt-6 mb-3">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookieBanner}
                  className="text-kmf-text-secondary hover:text-kmf-accent transition-colors
                           inline-block hover:translate-x-1 duration-200 bg-transparent border-0 p-0 cursor-pointer text-left"
                >
                  {t('footer.cookiePrefs')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-kmf-accent/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <a
              href="https://onalyse.vercel.app/en/scan/kmfjournal.com?ref=badge"
              target="_blank"
              rel="noopener noreferrer"
              title="Onalyse Website Score"
              className="inline-block transition-opacity duration-200 hover:opacity-90"
            >
              <img
                src="https://onalyse.vercel.app/badge/kmfjournal.com.svg"
                alt="Onalyse Score"
                width="340"
                height="104"
                loading="lazy"
              />
            </a>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <p className="text-kmf-text-tertiary text-sm text-center sm:text-left">
                © {currentYear} {t('footer.copyright')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://saashunt.best/projects/k-m-f-trading-journal"
                target="_blank"
                rel="noopener noreferrer"
                title="SaasHunt Top 1 Daily Winner"
                className="inline-block transition-opacity duration-200 hover:opacity-90"
              >
                <img
                  src="https://saashunt.best/images/badges/top1-dark.svg"
                  alt="SaasHunt Top 1 Daily Winner"
                  style={{ width: 195, height: 'auto' }}
                  loading="lazy"
                />
              </a>
              <a
                href="https://www.producthunt.com/products/k-m-f-trading-journal?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-k-m-f-trading-journal"
                target="_blank"
                rel="noopener noreferrer"
                title="K.M.F. Trading Journal on Product Hunt"
                className="inline-block transition-opacity duration-200 hover:opacity-90"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1147064&theme=dark&t=1779440854665"
                  alt="K.M.F. Trading Journal - Track every trade. Find what works. Trade better. | Product Hunt"
                  width="250"
                  height="54"
                  loading="lazy"
                />
              </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
