/**
 * Lazy wrappers for the blog recharts visualizations.
 *
 * The actual chart components (and the ~370KB recharts library) live in
 * ./BlogChartsImpl. Each export below renders a lightweight placeholder and
 * only loads the heavy chunk when the chart scrolls near the viewport, via
 * IntersectionObserver. This keeps recharts out of the initial download for
 * blog articles — the mobile SEO landing pages — for a real Core Web Vitals win.
 *
 * Public API is unchanged: same named exports as before, so articles import
 * them exactly as they did.
 */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const loadImpl = () => import('./BlogChartsImpl');

// Same height/look as ChartWrapper so the placeholder reserves space (low CLS).
function ChartSkeleton() {
  return (
    <div
      style={{
        background: '#1A1D24',
        borderRadius: 12,
        margin: '24px 0',
        border: '1px solid #2A2D35',
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A0A8C0',
        fontSize: 13,
      }}
      aria-busy="true"
    >
      Loading chart…
    </div>
  );
}

function makeLazyChart(name) {
  // All wrappers share the same dynamic import, so recharts loads once.
  const Lazy = lazy(() => loadImpl().then((m) => ({ default: m[name] })));

  function LazyChart(props) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
      if (typeof window === 'undefined' || !ref.current) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShow(true);
            io.disconnect();
          }
        },
        { rootMargin: '300px' }
      );
      io.observe(ref.current);
      return () => io.disconnect();
    }, []);

    return (
      <div ref={ref}>
        {show ? (
          <Suspense fallback={<ChartSkeleton />}>
            <Lazy {...props} />
          </Suspense>
        ) : (
          <ChartSkeleton />
        )}
      </div>
    );
  }

  LazyChart.displayName = `LazyChart(${name})`;
  return LazyChart;
}

export const RiskRuleEquityCurve = makeLazyChart('RiskRuleEquityCurve');
export const ProfitFactorBarChart = makeLazyChart('ProfitFactorBarChart');
export const RevengeTradingEquityCurve = makeLazyChart('RevengeTradingEquityCurve');
export const RMultipleDistribution = makeLazyChart('RMultipleDistribution');
export const ExpectancyComparisonChart = makeLazyChart('ExpectancyComparisonChart');
export const DrawdownComparisonChart = makeLazyChart('DrawdownComparisonChart');
export const ScalingOutEquityCurve = makeLazyChart('ScalingOutEquityCurve');
export const ConsecutiveLossImpact = makeLazyChart('ConsecutiveLossImpact');
export const BreakevenExpectancyChart = makeLazyChart('BreakevenExpectancyChart');
export const ScaredMoneyChart = makeLazyChart('ScaredMoneyChart');
export const LottoTicketChart = makeLazyChart('LottoTicketChart');
export const ProspectTheoryChart = makeLazyChart('ProspectTheoryChart');
export const MondayEffectChart = makeLazyChart('MondayEffectChart');
