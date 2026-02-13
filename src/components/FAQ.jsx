import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: 'What is K.M.F. Trading Journal?',
    answer: 'K.M.F. Trading Journal is a professional trading journal application for forex, stocks, and crypto traders. It helps you track trades, analyze performance with advanced statistics like win rate, profit factor, and expectancy, manage risk with a lot size calculator, and improve discipline with weekly reviews and pre-trade checklists.',
  },
  {
    question: 'Is K.M.F. Trading Journal free?',
    answer: 'K.M.F. Trading Journal is free to download with core features. A premium subscription is available for advanced analytics, cloud sync, and additional premium features.',
  },
  {
    question: 'What platforms does K.M.F. Trading Journal support?',
    answer: 'K.M.F. Trading Journal is available on Android devices (Android 8.0+) and as a web application at kmfjournal.com, with cloud sync between both platforms.',
  },
  {
    question: 'What languages are supported?',
    answer: 'The app supports 8 languages: English, English (US), Romanian, Russian, Japanese, French, German, and Chinese.',
  },
  {
    question: 'Can I export my trading data?',
    answer: 'Yes, you can export your trade data to JSON and CSV formats, as well as PDF reports for comprehensive record-keeping.',
  },
  {
    question: 'What statistics does K.M.F. Trading Journal track?',
    answer: 'The app tracks win rate, profit factor, expectancy, average R-multiple, max drawdown, monthly P/L, discipline scores, best and worst trades, top-performing instruments, and balance evolution over time.',
  },
  {
    question: 'Does K.M.F. Trading Journal have a lot size calculator?',
    answer: 'Yes. The built-in lot size calculator lets you input your account balance, risk percentage, entry price, stop loss, leverage, and instrument to calculate the optimal position size for any trade.',
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
