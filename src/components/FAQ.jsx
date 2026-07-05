import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { revealProps, REVEAL_EASE } from './common/Reveal';

const FAQItem = ({ faq, isOpen, toggle, index }) => (
  <motion.div
    {...revealProps(Math.min(index * 0.04, 0.24), 16)}
    className="border border-kmf-accent/20 rounded-xl overflow-hidden transition-all hover:border-kmf-accent/40"
  >
    <button
      onClick={toggle}
      className="w-full px-6 py-4 flex items-center justify-between text-left bg-kmf-panel hover:bg-kmf-surface/50 transition-all"
      aria-expanded={isOpen}
    >
      <h3 className="text-base font-semibold text-kmf-text-primary pr-4">{faq.question}</h3>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25, ease: REVEAL_EASE }}
        className="flex-shrink-0"
      >
        <FaChevronDown className="text-kmf-accent" size={14} />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: REVEAL_EASE }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-6 py-4 bg-kmf-surface/30 border-t border-kmf-accent/10">
            <p className="text-sm text-kmf-text-secondary leading-relaxed">{faq.answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = t('faq.items');

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Frequently Asked Questions">
      <div className="container mx-auto max-w-3xl">
        <motion.div {...revealProps()} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {t('faq.heading')}
          </h2>
          <p className="text-kmf-text-tertiary">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              index={i}
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
