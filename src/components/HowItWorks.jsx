import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const OUTRO_DURATION_MS = 2800;

const FEATURE_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm3-4H7v-2h8v2zm0-4H7V7h8v2z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
];

const HowItWorks = () => {
  const { t } = useLanguage();
  const features = t('howItWorks.demo.features');

  const videoRef = useRef(null);
  const outroTimerRef = useRef(null);
  const [showOutro, setShowOutro] = useState(false);
  const [needsPlayTap, setNeedsPlayTap] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnded = () => {
      setShowOutro(true);
      clearTimeout(outroTimerRef.current);
      outroTimerRef.current = setTimeout(() => {
        setShowOutro(false);
        video.currentTime = 0;
        video.play().catch(() => {});
      }, OUTRO_DURATION_MS);
    };

    video.addEventListener('ended', onEnded);
    video.play().catch(() => setNeedsPlayTap(true));

    return () => {
      video.removeEventListener('ended', onEnded);
      clearTimeout(outroTimerRef.current);
    };
  }, []);

  const handlePlayTap = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(() => setNeedsPlayTap(false)).catch(() => {});
  };

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="How it works">
      <div className="absolute inset-0 bg-gradient-to-b from-kmf-accent/[0.03] via-transparent to-transparent" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/25">
              ✦ {t('howItWorks.badge')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
            <span className="gradient-text">{t('howItWorks.heading')}</span>
          </h2>
          <p className="text-lg text-kmf-text-tertiary max-w-xl mx-auto leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* 2-column: left copy + features, right phone */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
          {/* LEFT */}
          <div className="order-2 lg:order-1 max-w-lg lg:max-w-none">
            <h3
              className="font-extrabold mb-5"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              {t('howItWorks.demo.titlePart1')}{' '}
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #4FC3F7, #E8E0D0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('howItWorks.demo.titleAccent')}
              </span>
            </h3>
            <p
              className="mb-7"
              style={{ fontSize: 17, color: '#B8CAD4', lineHeight: 1.6, maxWidth: 480 }}
            >
              {t('howItWorks.demo.intro')}
            </p>

            <ul className="flex flex-col gap-4 mb-8">
              {features.map((f, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: 'rgba(79,195,247,0.1)',
                      border: '1px solid rgba(79,195,247,0.2)',
                      color: '#4FC3F7',
                    }}
                  >
                    {FEATURE_ICONS[i]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <strong className="block text-sm font-bold text-white mb-0.5">
                      {f.title}
                    </strong>
                    <span className="block text-xs leading-relaxed" style={{ color: '#8FB3C5' }}>
                      {f.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="#download"
              className="inline-flex items-center gap-2 font-bold transition-transform duration-200 hover:scale-105"
              style={{
                padding: '11px 22px',
                borderRadius: 11,
                background: 'linear-gradient(135deg, #FFB300, #FF8F00)',
                color: '#1A1200',
                fontSize: 14,
                boxShadow: '0 8px 24px rgba(255,179,0,0.25)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5v-17l18 8.5z" />
              </svg>
              {t('howItWorks.cta')}
            </a>
          </div>

          {/* RIGHT: phone with video */}
          <div className="relative flex flex-col items-center order-1 lg:order-2">
            <div className="relative">
              {/* Ambient glow */}
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: 520,
                  height: 520,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(79,195,247,0.15) 0%, transparent 60%)',
                  filter: 'blur(50px)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: -1,
                }}
              />
              <div
                className="relative"
                style={{
                  width: 340,
                  height: 700,
                  borderRadius: 46,
                  background: '#0a0d12',
                  padding: 10,
                  boxShadow:
                    '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 2px rgba(255,255,255,0.04)',
                }}
              >
                {/* Outer glow */}
                <span
                  aria-hidden
                  className="absolute pointer-events-none"
                  style={{
                    inset: -3,
                    borderRadius: 48,
                    background:
                      'linear-gradient(135deg, rgba(79,195,247,0.5), transparent 50%, rgba(255,179,0,0.3))',
                    opacity: 0.35,
                    filter: 'blur(8px)',
                    zIndex: -1,
                  }}
                />
                {/* Notch */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 100,
                    height: 22,
                    background: '#000',
                    borderRadius: '0 0 14px 14px',
                    zIndex: 10,
                  }}
                />
                {/* Screen */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{ borderRadius: 36, background: '#000' }}
                >
                  <video
                    ref={videoRef}
                    src="/videos/how-it-works.mp4"
                    muted
                    playsInline
                    preload="auto"
                    autoPlay
                    className="w-full h-full"
                    style={{ display: 'block', background: '#0F1115', objectFit: 'contain' }}
                    aria-label={t('howItWorks.heading')}
                  />

                  {/* Tap-to-play overlay */}
                  {needsPlayTap && (
                    <button
                      type="button"
                      onClick={handlePlayTap}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      style={{ background: 'rgba(0,0,0,0.4)', zIndex: 15 }}
                      aria-label="Play demo video"
                    >
                      <span
                        className="flex items-center justify-center"
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: 'rgba(79,195,247,0.95)',
                          boxShadow: '0 8px 32px rgba(79,195,247,0.5)',
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#0F1115" style={{ marginLeft: 3 }}>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </button>
                  )}

                  {/* Brand outro */}
                  {showOutro && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        zIndex: 20,
                        background:
                          'radial-gradient(ellipse at center, rgba(15,17,21,0.96) 0%, rgba(6,8,12,0.99) 100%)',
                      }}
                    >
                      <span
                        aria-hidden
                        style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '140%',
                            height: '140%',
                            background:
                              'radial-gradient(circle at 30% 30%, rgba(79,195,247,0.25), transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,179,0,0.18), transparent 50%)',
                            filter: 'blur(20px)',
                            animation: 'kmf-outro-bg-rotate 6s ease-in-out infinite',
                          }}
                        />
                      </span>
                      <div className="relative text-center" style={{ zIndex: 2 }}>
                        <img
                          src="/logo-320.png"
                          alt="KMF"
                          style={{
                            width: 80,
                            height: 80,
                            margin: '0 auto 18px',
                            display: 'block',
                            filter: 'drop-shadow(0 0 24px rgba(79,195,247,0.6))',
                            animation: 'kmf-outro-logo-pop 0.9s cubic-bezier(.34,1.56,.64,1) 0.1s forwards',
                            opacity: 0,
                          }}
                        />
                        <div style={{ marginBottom: 8, perspective: 600 }}>
                          <span
                            style={{
                              fontSize: 40,
                              fontWeight: 900,
                              letterSpacing: '-.03em',
                              lineHeight: 1,
                              backgroundImage:
                                'linear-gradient(135deg, #E8E0D0 0%, #D4C9B0 40%, #BEB5A0 70%, #E8E0D0 100%)',
                              backgroundSize: '200% 200%',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              display: 'inline-block',
                              opacity: 0,
                              animation:
                                'kmf-outro-title-slide 0.7s cubic-bezier(.4,0,.2,1) 0.5s forwards, kmf-outro-shimmer 3s ease-in-out 1.2s infinite',
                            }}
                          >
                            K.M.F.
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#4FC3F7',
                            letterSpacing: '.18em',
                            textTransform: 'uppercase',
                            marginBottom: 20,
                            opacity: 0,
                            animation: 'kmf-outro-sub-slide 0.6s cubic-bezier(.4,0,.2,1) 0.8s forwards',
                          }}
                        >
                          Keep Moving Forward
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: '#B8CAD4',
                            lineHeight: 1.5,
                            maxWidth: 220,
                            margin: '0 auto',
                            opacity: 0,
                            animation: 'kmf-outro-cta-slide 0.5s cubic-bezier(.4,0,.2,1) 1.1s forwards',
                          }}
                        >
                          Track every trade. Master your edge.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
