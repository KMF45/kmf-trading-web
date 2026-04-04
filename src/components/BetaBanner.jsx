import { useState, useRef, useEffect } from 'react';
import { FaRocket, FaEnvelope, FaInfinity, FaBell, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { useLanguage } from '../i18n/LanguageContext';

const PERK_ICONS = [FaInfinity, FaBell, FaEnvelope];

const BetaBanner = () => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', experience: '', markets: [], journalMethod: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  const perks = t('beta.perks');
  const statBlocks = t('beta.statBlocks');
  const experienceOptions = t('beta.experienceOptions');
  const marketsOptions = t('beta.marketsOptions');
  const journalOptions = t('beta.journalOptions');

  // Close modal on Escape
  useEffect(() => {
    if (!showModal) return;
    const handler = (e) => { if (e.key === 'Escape') setShowModal(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showModal]);

  // Focus first input when modal opens
  useEffect(() => {
    if (showModal && firstInputRef.current) {
      setTimeout(() => firstInputRef.current.focus(), 100);
    }
  }, [showModal]);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === modalRef.current) setShowModal(false);
  };

  const validate = () => {
    const err = {};
    if (!form.name || form.name.trim().length < 2) err.name = t('beta.errorName');
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = t('beta.errorEmail');
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const toggleMarket = (m) => {
    setForm(prev => ({
      ...prev,
      markets: prev.markets.includes(m) ? prev.markets.filter(x => x !== m) : [...prev.markets, m]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    try {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const { db } = await import('../config/firebase');

      await addDoc(collection(db, 'betaSignups'), {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        experience: form.experience || '—',
        markets: form.markets.length > 0 ? form.markets.join(', ') : '—',
        journalMethod: form.journalMethod || '—',
        source: 'web_modal',
        createdAt: serverTimestamp(),
      });

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid rgba(255,179,0,0.2)',
    background: 'rgba(15,17,21,0.9)',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const inputFocusStyle = '1px solid rgba(255,179,0,0.5)';

  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: '#D4C0A0', marginBottom: 6 };

  const chipBase = {
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    border: '1px solid rgba(255,179,0,0.18)',
    userSelect: 'none',
  };

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

              {/* Apply button — opens modal */}
              <button
                onClick={() => { setShowModal(true); setStatus('idle'); setErrors({}); }}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFB300, #FF8F00)',
                  color: '#1A1200',
                  boxShadow: '0 4px 20px rgba(255,179,0,0.30)',
                  border: 'none',
                }}
              >
                <HiSparkles style={{ fontSize: 14 }} aria-hidden="true" />
                {t('beta.submitBtn')}
              </button>
              <p className="text-xs mt-3 text-center lg:text-left" style={{ color: '#9A8060' }}>
                contact@kmfjournal.com · {t('beta.descHighlight')}
              </p>
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

      {/* ─── Modal ─── */}
      {showModal && (
        <div
          ref={modalRef}
          onClick={handleBackdrop}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            style={{
              background: '#1A1D24',
              border: '1px solid rgba(255,179,0,0.25)',
              borderRadius: 20,
              width: '100%', maxWidth: 460,
              maxHeight: '90vh', overflowY: 'auto',
              padding: '28px 24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,179,0,0.08)',
              animation: 'kmf-fadeIn 0.2s ease-out',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ color: '#FFB300', fontSize: 18, fontWeight: 700, margin: 0 }}>
                {t('beta.modalTitle')}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                aria-label={t('beta.closeBtn')}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8,
                  width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#9A8060', transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              >
                <FaTimes size={14} />
              </button>
            </div>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
                  background: 'rgba(255,179,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <HiSparkles style={{ fontSize: 24, color: '#FFB300' }} />
                </div>
                <h4 style={{ color: '#FFB300', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                  {t('beta.successTitle')}
                </h4>
                <p style={{ color: '#B0BEC5', fontSize: 14 }}>{t('beta.successSub')}</p>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    marginTop: 20, padding: '10px 28px', borderRadius: 10, border: 'none',
                    background: 'rgba(255,179,0,0.15)', color: '#FFB300', fontWeight: 600,
                    fontSize: 14, cursor: 'pointer',
                  }}
                >
                  {t('beta.closeBtn')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{t('beta.namePlaceholder')}</label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={t('beta.namePlaceholder')}
                    style={{ ...inputStyle, borderColor: errors.name ? '#FF5252' : inputStyle.border }}
                    onFocus={(e) => e.target.style.border = inputFocusStyle}
                    onBlur={(e) => e.target.style.border = errors.name ? '1px solid #FF5252' : inputStyle.border}
                  />
                  {errors.name && <p style={{ color: '#FF5252', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>
                    {t('beta.emailPlaceholder')}
                    <span style={{ color: '#9A8060', fontWeight: 400, marginLeft: 6, fontSize: 11 }}>
                      — {t('beta.emailLoginNote')}
                    </span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder={t('beta.emailPlaceholder')}
                    style={{ ...inputStyle, borderColor: errors.email ? '#FF5252' : inputStyle.border }}
                    onFocus={(e) => e.target.style.border = inputFocusStyle}
                    onBlur={(e) => e.target.style.border = errors.email ? '1px solid #FF5252' : inputStyle.border}
                  />
                  {errors.email && <p style={{ color: '#FF5252', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
                </div>

                {/* Experience */}
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{t('beta.experienceLabel')}</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {experienceOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, experience: opt }))}
                        style={{
                          ...chipBase,
                          background: form.experience === opt ? 'rgba(255,179,0,0.2)' : 'rgba(255,255,255,0.04)',
                          color: form.experience === opt ? '#FFB300' : '#9A8060',
                          borderColor: form.experience === opt ? 'rgba(255,179,0,0.4)' : 'rgba(255,179,0,0.18)',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Markets (multi-select) */}
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{t('beta.marketsLabel')}</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {marketsOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleMarket(opt)}
                        style={{
                          ...chipBase,
                          background: form.markets.includes(opt) ? 'rgba(255,179,0,0.2)' : 'rgba(255,255,255,0.04)',
                          color: form.markets.includes(opt) ? '#FFB300' : '#9A8060',
                          borderColor: form.markets.includes(opt) ? 'rgba(255,179,0,0.4)' : 'rgba(255,179,0,0.18)',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Journal Method */}
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>{t('beta.journalLabel')}</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {journalOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, journalMethod: opt }))}
                        style={{
                          ...chipBase,
                          background: form.journalMethod === opt ? 'rgba(255,179,0,0.2)' : 'rgba(255,255,255,0.04)',
                          color: form.journalMethod === opt ? '#FFB300' : '#9A8060',
                          borderColor: form.journalMethod === opt ? 'rgba(255,179,0,0.4)' : 'rgba(255,179,0,0.18)',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active tester note */}
                <div style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  padding: '10px 14px', borderRadius: 10,
                  background: 'rgba(255,179,0,0.06)', border: '1px solid rgba(255,179,0,0.12)',
                  marginBottom: 20,
                }}>
                  <FaExclamationTriangle style={{ color: '#FFB300', fontSize: 13, flexShrink: 0, marginTop: 2 }} />
                  <p style={{ color: '#D4C0A0', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
                    {t('beta.activeTesterNote')}
                  </p>
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <p style={{ color: '#FF5252', fontSize: 13, textAlign: 'center', marginBottom: 14 }}>
                    {t('beta.errorMsg')}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    width: '100%', padding: '12px 0', borderRadius: 12, border: 'none',
                    background: status === 'sending' ? 'rgba(255,179,0,0.3)' : 'linear-gradient(135deg, #FFB300, #FF8F00)',
                    color: '#1A1200', fontWeight: 700, fontSize: 15,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 20px rgba(255,179,0,0.25)',
                  }}
                >
                  {status === 'sending' ? t('beta.sendingBtn') : t('beta.submitBtn')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default BetaBanner;
