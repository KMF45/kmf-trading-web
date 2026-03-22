import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';

const SITE = 'https://kmfjournal.com';

export default function AboutPage() {
  useEffect(() => {
    const pageTitle = 'About K.M.F. Trading Journal | Built by Traders, for Traders';
    const pageUrl = `${SITE}/about`;
    document.title = pageTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Meet the team behind K.M.F. Trading Journal. We are active traders who built the app we wished existed — honest tools for real improvement, not another flashy dashboard.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', pageUrl);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', pageUrl);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    // JSON-LD: Organization with author info
    const addLd = (id, data) => {
      if (document.getElementById(id)) return;
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      el.textContent = JSON.stringify(data);
      document.head.appendChild(el);
    };

    addLd('ld-about-org', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'K.M.F. Trading Journal',
      alternateName: ['KMF Journal', 'Keep Moving Forward Trading Journal'],
      url: SITE,
      logo: `${SITE}/logo.png`,
      description: 'Professional trading journal app built by active traders. Track trades, analyze performance, and improve discipline.',
      foundingDate: '2025',
      email: 'kmf45.ai@gmail.com',
      sameAs: ['https://github.com/KMF45'],
    });

    addLd('ld-about-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: pageUrl },
      ],
    });

    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
      if (canonical) canonical.setAttribute('href', `${SITE}/`);
      if (ogUrl) ogUrl.setAttribute('content', `${SITE}/`);
      document.getElementById('ld-about-org')?.remove();
      document.getElementById('ld-about-breadcrumb')?.remove();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-kmf-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="mb-8 text-sm text-kmf-text-tertiary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-kmf-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">About</span>
          </nav>

          <h1 className="text-4xl font-bold text-kmf-text-primary mb-6" style={{ letterSpacing: '-0.02em' }}>
            Built by traders who got tired of bad tools
          </h1>

          <div className="space-y-6 text-kmf-text-secondary leading-relaxed">
            <p>
              K.M.F. Trading Journal started from frustration. We were active traders using spreadsheets,
              screenshots in random folders, and journal apps that looked impressive but did not actually
              help us improve. Every tool we tried was either too simple to be useful or too complex to
              use consistently.
            </p>

            <p>
              So we built what we wanted: a trading journal that focuses on the things that actually
              make traders better — honest statistics, psychology tracking, discipline systems, and
              structured reviews. No social features, no signal sharing, no gamification that rewards
              quantity over quality.
            </p>

            <div className="rounded-xl p-6 my-8" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.15)' }}>
              <h2 className="text-xl font-bold text-kmf-text-primary mb-4">What K.M.F. stands for</h2>
              <p className="text-lg font-semibold text-kmf-accent mb-2">Keep Moving Forward</p>
              <p>
                Trading is hard. Most people quit after a few months. The traders who succeed are
                the ones who keep showing up, keep reviewing, keep adjusting — even when the results
                are not what they want. That is the philosophy behind everything we build.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4">What we believe</h2>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-kmf-accent mt-1 flex-shrink-0">1.</span>
                <span><strong className="text-kmf-text-primary">Your data belongs to you.</strong> Export everything — JSON, CSV, PDF. No lock-in, no hostage situations.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-kmf-accent mt-1 flex-shrink-0">2.</span>
                <span><strong className="text-kmf-text-primary">Honesty beats motivation.</strong> We built tools like the Honesty Mirror and Tilt Detection because feeling good about bad trades is worse than feeling bad about them.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-kmf-accent mt-1 flex-shrink-0">3.</span>
                <span><strong className="text-kmf-text-primary">Process beats outcome.</strong> A good trade that followed your plan but lost money is better than a bad trade that made money by luck. Our statistics reflect this.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-kmf-accent mt-1 flex-shrink-0">4.</span>
                <span><strong className="text-kmf-text-primary">Simple beats complex.</strong> If a feature takes more than 60 seconds to use, most traders will not use it. We optimize for speed and consistency.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4">The blog</h2>
            <p>
              Our <Link to="/blog" className="text-kmf-accent hover:underline">blog</Link> covers
              trading psychology, risk management, statistics, and improvement systems. Every article
              is written from real trading experience — no generic advice, no affiliate-driven
              recommendations, no AI-generated fluff. If we have not tested it ourselves, we do not
              write about it.
            </p>

            <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4">Contact</h2>
            <p>
              Questions, feedback, feature requests, or just want to say hello:
            </p>
            <p>
              <a href="mailto:kmf45.ai@gmail.com" className="text-kmf-accent hover:underline">kmf45.ai@gmail.com</a>
            </p>
            <p className="text-sm text-kmf-text-tertiary mt-2">
              We read every email. If you found a bug or have an idea that would make the app better, we want to hear it.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.kmf.tradingjournal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download K.M.F. on Google Play (opens in new tab)"
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200' }}
            >
              Download on Google Play
            </a>
            <Link
              to="/blog"
              className="px-6 py-3 rounded-xl font-semibold text-sm border border-kmf-accent/30 text-kmf-accent hover:bg-kmf-accent/10 transition-all"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
