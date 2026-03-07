import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: 'What is K.M.F. Trading Journal?',
    answer: 'K.M.F. Trading Journal is a professional trading journal application for forex, stocks, and crypto traders. It helps you track trades, analyze performance with advanced statistics, manage risk with a lot size calculator, track emotions and trading psychology, earn achievements, and improve discipline with weekly reviews and pre-trade checklists.',
  },
  {
    question: 'Is K.M.F. Trading Journal free?',
    answer: 'Yes. Core features like trade logging (50/month), history, lot calculator, checklists, and a trading diary are free forever. Premium unlocks unlimited trades, advanced stats, cloud sync, emotion tracking, achievements, and more. You can try Premium free for 14 days — no credit card required.',
  },
  {
    question: 'What is the 14-day free trial?',
    answer: 'Every new user gets 14 days of full Premium access for free. You can explore all features — unlimited trades, advanced statistics, emotion tracking, personality profile, achievements, cloud sync, and export — with no commitment. After the trial, you keep free-tier access or subscribe to stay Premium.',
  },
  {
    question: 'What platforms does K.M.F. Trading Journal support?',
    answer: 'K.M.F. Trading Journal is available on Android devices (Android 7.0+) and as a web application at kmfjournal.com, with cloud sync between both platforms.',
  },
  {
    question: 'How does emotion tracking and tilt detection work?',
    answer: 'Before and after each trade, you log your emotional state (Calm, Confident, Anxious, Frustrated, Fearful, or Excited). The app builds an emotion heatmap calendar, detects tilt patterns with a 4-level warning system, and uses the Honesty Mirror to correlate your self-ratings with actual P/L — helping you identify psychological blind spots.',
  },
  {
    question: 'What is the trader personality profile?',
    answer: 'Based on your trading behavior, the app identifies your trader archetype: Sniper (disciplined, low frequency), Robot (mechanical, rule-based), Momentum Rider (trend-follower), Wave Rider (oscillator-based), Gambler (risky entries), or Revenge Trader (emotional overtrading). This helps you understand your patterns and improve.',
  },
  {
    question: 'How does the achievement and gamification system work?',
    answer: 'You earn XP for logging trades, completing checklists, doing weekly reviews, and maintaining discipline. Unlock bronze, silver, and gold badges, build streaks, and climb four trader tiers: Novice, Disciplined Trader, Risk Manager, and Master Strategist. It keeps you motivated and consistent.',
  },
  {
    question: 'What statistics does K.M.F. Trading Journal track?',
    answer: 'The app tracks win rate, profit factor, expectancy, average R-multiple, max drawdown, monthly P/L, discipline scores, best and worst trades, top-performing instruments, balance evolution, session performance (Asian/London/NY), and per-setup win rates.',
  },
  {
    question: 'Can I track trade setups?',
    answer: 'Yes. You can create named trading setups and the app tracks per-setup statistics including win rate, total trades, average profit, and average loss — so you can see which setups actually work.',
  },
  {
    question: 'Can I export my trading data?',
    answer: 'Yes. Premium users can export trade data to JSON, CSV, and PDF formats, as well as create full cloud backups and restore them on any device.',
  },
  {
    question: 'Does K.M.F. Trading Journal have a lot size calculator?',
    answer: 'Yes. The built-in lot size calculator lets you input your account balance, risk percentage, entry price, stop loss, leverage, and instrument to calculate the optimal position size for any trade.',
  },
  {
    question: 'What languages are supported?',
    answer: 'The app supports 8 languages: English, English (US), Romanian, Russian, Japanese, French, German, and Chinese.',
  },
];

const FAQItem = ({ faq, isOpen, toggle }) => (
  <div className="border border-kmf-accent/20 rounded-xl overflow-hidden transition-all hover:border-kmf-accent/40">
    <button
      onClick={toggle}
      className="w-full px-6 py-4 flex items-center justify-between text-left bg-kmf-panel hover:bg-kmf-surface/50 transition-all"
      aria-expanded={isOpen}
    >
      <h3 className="text-base font-semibold text-kmf-text-primary pr-4">{faq.question}</h3>
      {isOpen ? (
        <FaChevronUp className="text-kmf-accent flex-shrink-0" size={14} />
      ) : (
        <FaChevronDown className="text-kmf-accent flex-shrink-0" size={14} />
      )}
    </button>
    {isOpen && (
      <div className="px-6 py-4 bg-kmf-surface/30 border-t border-kmf-accent/10 animate-fadeIn">
        <p className="text-sm text-kmf-text-secondary leading-relaxed">{faq.answer}</p>
      </div>
    )}
  </div>
);

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Frequently Asked Questions">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-kmf-text-tertiary">
            Everything you need to know about K.M.F. Trading Journal
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIdx === i}
              toggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
