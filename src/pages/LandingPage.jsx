import { useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/Hero';
import WhyKMF from '../components/WhyKMF';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Download from '../components/Download';
import BlogHighlights from '../components/BlogHighlights';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is K.M.F. Trading Journal?', acceptedAnswer: { '@type': 'Answer', text: 'K.M.F. Trading Journal is a professional trading journal application for forex, stocks, and crypto traders. It helps you track trades, analyze performance with advanced statistics, manage risk with a lot size calculator, track emotions and trading psychology, earn achievements, and improve discipline with weekly reviews and pre-trade checklists.' } },
    { '@type': 'Question', name: 'Is K.M.F. Trading Journal free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Core features like trade logging (15 trades), history, lot calculator, checklists, cloud sync, and a trading diary are free. Premium unlocks unlimited trades, advanced stats, emotion tracking, achievements, and more. You can try Premium free for 7 days — no credit card required.' } },
    { '@type': 'Question', name: 'What is the 7-day free trial?', acceptedAnswer: { '@type': 'Answer', text: 'Every new user gets 7 days of full Premium access for free. You can explore all features — unlimited trades, advanced statistics, emotion tracking, personality profile, achievements, cloud sync, and export — with no commitment. After the trial, you keep free-tier access or subscribe to stay Premium.' } },
    { '@type': 'Question', name: 'What platforms does K.M.F. Trading Journal support?', acceptedAnswer: { '@type': 'Answer', text: 'K.M.F. Trading Journal is available on Android devices (Android 7.0+). Download it free from Google Play.' } },
    { '@type': 'Question', name: 'How does emotion tracking and tilt detection work?', acceptedAnswer: { '@type': 'Answer', text: 'Before and after each trade, you log your emotional state (Calm, Confident, Anxious, Frustrated, Fearful, or Excited). The app builds an emotion heatmap calendar, detects tilt patterns with a 4-level warning system, and uses the Honesty Mirror to correlate your self-ratings with actual P/L — helping you identify psychological blind spots.' } },
    { '@type': 'Question', name: 'What is the trader personality profile?', acceptedAnswer: { '@type': 'Answer', text: 'Based on your trading behavior, the app identifies your trader archetype: Sniper (disciplined, low frequency), Robot (mechanical, rule-based), Momentum Rider (trend-follower), Wave Rider (oscillator-based), Gambler (risky entries), or Revenge Trader (emotional overtrading). This helps you understand your patterns and improve.' } },
    { '@type': 'Question', name: 'How does the achievement and gamification system work?', acceptedAnswer: { '@type': 'Answer', text: 'You earn XP for logging trades, completing checklists, doing weekly reviews, and maintaining discipline. Unlock bronze, silver, and gold badges, build streaks, and climb four trader tiers: Novice, Disciplined Trader, Risk Manager, and Master Strategist. It keeps you motivated and consistent.' } },
    { '@type': 'Question', name: 'What statistics does K.M.F. Trading Journal track?', acceptedAnswer: { '@type': 'Answer', text: 'The app tracks win rate, profit factor, expectancy, average R-multiple, max drawdown, monthly P/L, discipline scores, best and worst trades, top-performing instruments, balance evolution, and session performance (Asian/London/NY).' } },
    { '@type': 'Question', name: 'Can I export my trading data?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All users get cloud sync and backup. Premium users can also export trade data to JSON, CSV, and PDF formats.' } },
    { '@type': 'Question', name: 'Does K.M.F. Trading Journal have a lot size calculator?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The built-in lot size calculator lets you input your account balance, risk percentage, entry price, stop loss, leverage, and instrument to calculate the optimal position size for any trade.' } },
    { '@type': 'Question', name: 'What languages are supported?', acceptedAnswer: { '@type': 'Answer', text: 'The app supports 7 languages: English, Romanian, Russian, Japanese, French, German, and Chinese.' } },
  ],
};

const LandingPage = () => {
  useEffect(() => {
    if (!document.getElementById('ld-faq-landing')) {
      const faqLd = document.createElement('script');
      faqLd.type = 'application/ld+json';
      faqLd.id = 'ld-faq-landing';
      faqLd.textContent = JSON.stringify(FAQ_SCHEMA);
      document.head.appendChild(faqLd);
    }
    return () => { document.getElementById('ld-faq-landing')?.remove(); };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <WhyKMF />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Download />
        <BlogHighlights />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
