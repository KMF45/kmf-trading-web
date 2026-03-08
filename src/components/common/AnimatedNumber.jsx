import { useState, useEffect, useRef } from 'react';

const AnimatedNumber = ({ value, prefix = '', suffix = '', decimals = 2, duration = 800, className = '' }) => {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef();
  const startRef = useRef();
  const prevRef = useRef(0);

  useEffect(() => {
    const from = prevRef.current;
    const to = typeof value === 'number' ? value : parseFloat(value) || 0;
    prevRef.current = to;

    if (from === to) { setDisplay(to); return; }

    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  const formatted = display.toFixed(decimals);

  return (
    <span className={`number-pop ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default AnimatedNumber;
