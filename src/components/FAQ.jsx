import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

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
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = t('faq.items');

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Frequently Asked Questions">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {t('faq.heading')}
          </h2>
          <p className="text-kmf-text-tertiary">
            {t('faq.subtitle')}
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
