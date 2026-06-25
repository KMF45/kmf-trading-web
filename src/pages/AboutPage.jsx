import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../i18n/LanguageContext';

const SITE = 'https://kmfjournal.com';

const T = {
  en: {
    metaTitle: 'About K.M.F. Trading Journal | Built by Traders, for Traders',
    metaDesc: 'Meet the team behind K.M.F. Trading Journal. We are active traders who built the app we wished existed — honest tools for real improvement, not another flashy dashboard.',
    home: 'Home',
    about: 'About',
    h1: 'Built by traders who got tired of bad tools',
    p1: 'K.M.F. Trading Journal started from frustration. We were active traders using spreadsheets, screenshots in random folders, and journal apps that looked impressive but did not actually help us improve. Every tool we tried was either too simple to be useful or too complex to use consistently.',
    p2: 'So we built what we wanted: a trading journal that focuses on the things that actually make traders better — honest statistics, psychology tracking, discipline systems, and structured reviews. No social features, no signal sharing, no gamification that rewards quantity over quality.',
    standsTitle: 'What K.M.F. stands for',
    standsBody: 'Trading is hard. Most people quit after a few months. The traders who succeed are the ones who keep showing up, keep reviewing, keep adjusting — even when the results are not what they want. That is the philosophy behind everything we build.',
    believeTitle: 'What we believe',
    believe: [
      <><strong className="text-kmf-text-primary">Your data belongs to you.</strong> Export everything — JSON, CSV, PDF. No lock-in, no hostage situations.</>,
      <><strong className="text-kmf-text-primary">Honesty beats motivation.</strong> We built tools like the Honesty Mirror and Tilt Detection because feeling good about bad trades is worse than feeling bad about them.</>,
      <><strong className="text-kmf-text-primary">Process beats outcome.</strong> A good trade that followed your plan but lost money is better than a bad trade that made money by luck. Our statistics reflect this.</>,
      <><strong className="text-kmf-text-primary">Simple beats complex.</strong> If a feature takes more than 60 seconds to use, most traders will not use it. We optimize for speed and consistency.</>,
    ],
    blogTitle: 'The blog',
    blogBody: <>Our <Link to="/blog" className="text-kmf-accent hover:underline">blog</Link> covers trading psychology, risk management, statistics, and improvement systems. Every article is written from real trading experience — no generic advice, no affiliate-driven recommendations, no AI-generated fluff. If we have not tested it ourselves, we do not write about it.</>,
    contactTitle: 'Contact',
    contactIntro: 'Questions, feedback, feature requests, or just want to say hello:',
    contactNote: 'We read every email. If you found a bug or have an idea that would make the app better, we want to hear it.',
    ctaDownload: 'Download on Google Play',
    ctaBlog: 'Read the Blog',
  },
  ro: {
    metaTitle: 'Despre K.M.F. Trading Journal | Construit de traderi, pentru traderi',
    metaDesc: 'Cunoaște echipa din spatele K.M.F. Trading Journal. Suntem traderi activi care au construit aplicația pe care și-o doreau — unelte oneste pentru progres real, nu încă un dashboard de fițe.',
    home: 'Acasă',
    about: 'Despre',
    h1: 'Construit de traderi care s-au săturat de unelte proaste',
    p1: 'K.M.F. Trading Journal a pornit din frustrare. Eram traderi activi care foloseau spreadsheet-uri, capturi de ecran prin foldere la întâmplare și aplicații de journal care arătau impresionant, dar nu ne ajutau de fapt să ne îmbunătățim. Fiecare unealtă pe care am încercat-o era ori prea simplă ca să fie utilă, ori prea complicată ca să o folosești constant.',
    p2: 'Așa că am construit ce ne doream: un trading journal care se concentrează pe lucrurile care chiar fac traderii mai buni — statistici oneste, tracking psihologic, sisteme de disciplină și review-uri structurate. Fără funcții sociale, fără partajare de semnale, fără gamification care răsplătește cantitatea în locul calității.',
    standsTitle: 'Ce înseamnă K.M.F.',
    standsBody: 'Trading-ul e greu. Cei mai mulți renunță după câteva luni. Traderii care reușesc sunt cei care continuă să apară, să analizeze, să ajusteze — chiar și când rezultatele nu sunt cele dorite. Asta e filosofia din spatele a tot ce construim.',
    believeTitle: 'În ce credem',
    believe: [
      <><strong className="text-kmf-text-primary">Datele tale îți aparțin.</strong> Exportă tot — JSON, CSV, PDF. Fără blocaje, fără să-ți ținem datele ostatice.</>,
      <><strong className="text-kmf-text-primary">Onestitatea bate motivația.</strong> Am construit unelte ca Honesty Mirror și Tilt Detection fiindcă să te simți bine după trade-uri proaste e mai rău decât să te simți prost din cauza lor.</>,
      <><strong className="text-kmf-text-primary">Procesul bate rezultatul.</strong> Un trade bun care ți-a respectat planul dar a pierdut bani e mai valoros decât un trade prost care a făcut bani din noroc. Statisticile noastre reflectă asta.</>,
      <><strong className="text-kmf-text-primary">Simplu bate complicat.</strong> Dacă o funcție durează mai mult de 60 de secunde, cei mai mulți traderi nu o vor folosi. Optimizăm pentru viteză și consecvență.</>,
    ],
    blogTitle: 'Blogul',
    blogBody: <><Link to="/blog" className="text-kmf-accent hover:underline">Blogul</Link> nostru acoperă psihologia trading-ului, risk management, statistici și sisteme de îmbunătățire. Fiecare articol e scris din experiență reală de trading — fără sfaturi generice, fără recomandări de afiliere, fără text generat de AI. Dacă nu am testat noi înșine, nu scriem despre asta.</>,
    contactTitle: 'Contact',
    contactIntro: 'Întrebări, feedback, idei de funcții sau pur și simplu vrei să saluți:',
    contactNote: 'Citim fiecare email. Dacă ai găsit un bug sau ai o idee care ar face aplicația mai bună, vrem să o auzim.',
    ctaDownload: 'Descarcă din Google Play',
    ctaBlog: 'Citește Blogul',
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = T[lang] || T.en;

  useEffect(() => {
    const pageTitle = t.metaTitle;
    const pageUrl = `${SITE}/about`;
    document.title = pageTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.metaDesc);
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
      sameAs: [
        'https://github.com/KMF45',
        'https://www.instagram.com/kmfjournal',
        'https://x.com/kmfjournal',
        'https://www.tiktok.com/@kmf.journal',
        'https://www.youtube.com/@KMF.JOURNAL',
        'https://pinterest.com/contactkmfjournal',
      ],
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
  }, [t]);

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-kmf-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="mb-8 text-sm text-kmf-text-tertiary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-kmf-accent transition-colors">{t.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">{t.about}</span>
          </nav>

          <h1 className="text-4xl font-bold text-kmf-text-primary mb-6" style={{ letterSpacing: '-0.02em' }}>
            {t.h1}
          </h1>

          <div className="space-y-6 text-kmf-text-secondary leading-relaxed">
            <p>{t.p1}</p>

            <p>{t.p2}</p>

            <div className="rounded-xl p-6 my-8" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.15)' }}>
              <h2 className="text-xl font-bold text-kmf-text-primary mb-4">{t.standsTitle}</h2>
              <p className="text-lg font-semibold text-kmf-accent mb-2">Keep Moving Forward</p>
              <p>{t.standsBody}</p>
            </div>

            <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4">{t.believeTitle}</h2>

            <ul className="space-y-4">
              {t.believe.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-kmf-accent mt-1 flex-shrink-0">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4">{t.blogTitle}</h2>
            <p>{t.blogBody}</p>

            <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4">{t.contactTitle}</h2>
            <p>{t.contactIntro}</p>
            <p>
              <a href="mailto:kmf45.ai@gmail.com" className="text-kmf-accent hover:underline">kmf45.ai@gmail.com</a>
            </p>
            <p className="text-sm text-kmf-text-tertiary mt-2">
              {t.contactNote}
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
              {t.ctaDownload}
            </a>
            <Link
              to="/blog"
              className="px-6 py-3 rounded-xl font-semibold text-sm border border-kmf-accent/30 text-kmf-accent hover:bg-kmf-accent/10 transition-all"
            >
              {t.ctaBlog}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
