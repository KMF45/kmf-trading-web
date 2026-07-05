import { motion } from 'motion/react';

// Shared scroll-reveal presets — elements animate in when they enter the viewport.
export const REVEAL_EASE = [0.22, 1, 0.36, 1];

export const revealProps = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -60px 0px' },
  transition: { duration: 0.6, delay, ease: REVEAL_EASE },
});

const Reveal = ({ children, delay = 0, y = 24, className, style }) => (
  <motion.div className={className} style={style} {...revealProps(delay, y)}>
    {children}
  </motion.div>
);

export default Reveal;
