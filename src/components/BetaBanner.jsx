import { useState } from 'react';
import { FaRocket, FaEnvelope, FaInfinity, FaBell, FaCheckCircle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { useLanguage } from '../i18n/LanguageContext';

// Firebase loaded lazily on form submit (not on page load)
const getFirestore = async () => {
  const [{ db, initAppCheck }, fs] = await Promise.all([
    import('../config/firebase'),
    import('firebase/firestore'),
  ]);
  await initAppCheck();
  return { db, collection: fs.collection, addDoc: fs.addDoc, serverTimestamp: fs.serverTimestamp };
};

const PERK_ICONS = [FaInfinity, FaBell, FaEnvelope];

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const BetaBanner = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (name.trim().length < 2) errors.name = t('beta.errorName') || 'Name must be at least 2 characters';
    if (!EMAIL_REGEX.test(email.trim())) errors.email = t('beta.errorEmail') || 'Please enter a valid email address';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const fs = await getFirestore();
      await fs.addDoc(fs.collection(fs.db, 'betaSignups'), {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        source: 'landing-beta',
        createdAt: fs.serverTimestamp(),
      });
      setStatus('success');
      setName('');
      setEmail('');
    } catch (err) {
      console.error('[BetaBanner] Submit failed:', err);
      setStatus('error');
    }
  };

  const perks = t('beta.perks');
  const statBlocks = t('beta.statBlocks');

  return (
    <section
      id="beta"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-label="Beta tester program"
    >
      {/* Background glow */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,179,0,0.06) 0%, transparent 70%)',
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div
          className="rounded-3xl p-8 sm:p-12 relative overflow-hidden animate-fadeIn"
          style={{
            background: 'rgba(26,22,14,0.95)',
            border: '1px solid rgba(255,179,0,0.22)',
            boxShadow: '0 0 0 1px rgba(255,179,0,0.06), 0 8px 50px rgba(0,0,0,0.40), 0 0 60px rgba(255,179,0,0.05)',
          }}
        >
          {/* Corner glow */}
          <div aria-hidden="true" style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,179,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,179,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">

            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full"
                style={{ background: 'rgba(255,179,0,0.12)', border: '1px solid rgba(255,179,0,0.28)', color: '#FFB300' }}>
                <FaRocket style={{ fontSize: 11 }} aria-hidden="true" />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {t('beta.badge')}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                <span style={{ color: '#FFB300' }}>{t('beta.heading1')}</span>
                <br />
                <span className="text-kmf-text-primary">{t('beta.heading2')}</span>
              </h2>

              <p className="text-kmf-text-secondary leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                {t('beta.description')}{' '}
                <strong style={{ color: '#FFB300' }}>{t('beta.descHighlight')}</strong>
                {t('beta.descEnd')}
              </p>

              {/* Perks */}
              <ul className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start mb-8">
                {perks.map((text, i) => {
                  const Icon = PERK_ICONS[i];
                  return (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,179,0,0.14)', border: '1px solid rgba(255,179,0,0.25)' }}>
                        <Icon style={{ fontSize: 12, color: '#FFB300' }} aria-hidden="true" />
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#D4C0A0' }}>{text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Inline Form */}
              {status === 'success' ? (
                <div className="flex items-center gap-3 p-4 rounded-xl max-w-lg mx-auto lg:mx-0"
                  style={{ background: 'rgba(0,200,83,0.10)', border: '1px solid rgba(0,200,83,0.25)' }}>
                  <FaCheckCircle style={{ color: '#00C853', fontSize: 20, flexShrink: 0 }} />
                  <div>
                    <p className="text-sm font-semibold text-kmf-text-primary">{t('beta.successTitle')}</p>
                    <p className="text-xs text-kmf-text-tertiary">{t('beta.successSub')}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg mx-auto lg:mx-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={t('beta.namePlaceholder')}
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: undefined })); }}
                      className="w-full px-4 py-3 rounded-xl text-sm text-kmf-text-primary placeholder-kmf-text-tertiary outline-none focus:ring-2 focus:ring-[#FFB300]/40 transition-all"
                      style={{ background: 'rgba(255,255,255,0.06)', border: fieldErrors.name ? '1px solid #FF5252' : '1px solid rgba(255,179,0,0.18)' }}
                    />
                    {fieldErrors.name && <p className="text-xs mt-1 ml-1" style={{ color: '#FF5252' }}>{fieldErrors.name}</p>}
                  </div>
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder={t('beta.emailPlaceholder')}
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined })); }}
                      className="w-full px-4 py-3 rounded-xl text-sm text-kmf-text-primary placeholder-kmf-text-tertiary outline-none focus:ring-2 focus:ring-[#FFB300]/40 transition-all"
                      style={{ background: 'rgba(255,255,255,0.06)', border: fieldErrors.email ? '1px solid #FF5252' : '1px solid rgba(255,179,0,0.18)' }}
                    />
                    {fieldErrors.email && <p className="text-xs mt-1 ml-1" style={{ color: '#FF5252' }}>{fieldErrors.email}</p>}
                  </div>
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #FFB300, #FF8F00)',
                      color: '#1A1200',
                      boxShadow: '0 4px 20px rgba(255,179,0,0.30)',
                    }}
                  >
                    <HiSparkles style={{ fontSize: 14 }} aria-hidden="true" />
                    {status === 'sending' ? t('beta.sendingBtn') : t('beta.submitBtn')}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="text-xs mt-2 text-center lg:text-left" style={{ color: '#FF5252' }}>
                  {t('beta.errorMsg')}
                </p>
              )}
            </div>

            {/* Right: Visual stat block */}
            <div
              className="hidden lg:flex flex-col gap-4 flex-shrink-0"
              style={{ width: 220 }}
            >
              {statBlocks.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: 'rgba(255,179,0,0.06)',
                    border: '1px solid rgba(255,179,0,0.14)',
                  }}
                >
                  <p className="text-2xl font-extrabold mb-1" style={{ color: '#FFB300', letterSpacing: '-0.02em' }}>{s.value}</p>
                  <p className="text-xs font-semibold" style={{ color: '#D4C0A0' }}>{s.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#9A8060' }}>{s.sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaBanner;
