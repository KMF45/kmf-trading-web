import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Eagerly loaded (landing page - first paint)
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';

// Blog - lazy loaded
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BestTradingJournalAndroid2026 = lazy(() => import('./pages/blog/BestTradingJournalAndroid2026'));
const ProfitFactorVsWinRate = lazy(() => import('./pages/blog/ProfitFactorVsWinRate'));
const OnePercentRiskRule = lazy(() => import('./pages/blog/OnePercentRiskRule'));
const RevengeTrading = lazy(() => import('./pages/blog/RevengeTrading'));
const WeeklyTradingReviewTemplate = lazy(() => import('./pages/blog/WeeklyTradingReviewTemplate'));
const RMultipleExplained = lazy(() => import('./pages/blog/RMultipleExplained'));
const WhyTradersBreakRules = lazy(() => import('./pages/blog/WhyTradersBreakRules'));
const HowToRecoverFromLosingStreak = lazy(() => import('./pages/blog/HowToRecoverFromLosingStreak'));
const TenQuestionsAfterEveryTrade = lazy(() => import('./pages/blog/TenQuestionsAfterEveryTrade'));
const TradingExpectancyExplained = lazy(() => import('./pages/blog/TradingExpectancyExplained'));
const HowToSetStopLoss = lazy(() => import('./pages/blog/HowToSetStopLoss'));
const PositionSizingGuide = lazy(() => import('./pages/blog/PositionSizingGuide'));
const PreTradeChecklist = lazy(() => import('./pages/blog/PreTradeChecklist'));
const ExecutionGap = lazy(() => import('./pages/blog/ExecutionGap'));
const PropFirmJournal = lazy(() => import('./pages/blog/PropFirmJournal'));
const GoodLossVsBadWin = lazy(() => import('./pages/blog/GoodLossVsBadWin'));
const GhostTrades = lazy(() => import('./pages/blog/GhostTrades'));
const CryptoVsForexJournaling = lazy(() => import('./pages/blog/CryptoVsForexJournaling'));
const TradingViewKmfWorkflow = lazy(() => import('./pages/blog/TradingViewKmfWorkflow'));
const ExcelVsTradingJournal = lazy(() => import('./pages/blog/ExcelVsTradingJournal'));
const PropFirmDailyDrawdown = lazy(() => import('./pages/blog/PropFirmDailyDrawdown'));
const StrategyIsNotEnough = lazy(() => import('./pages/blog/StrategyIsNotEnough'));

// Loading spinner for lazy-loaded routes
const RouteLoader = () => (
  <div className="min-h-screen bg-kmf-bg flex items-center justify-center">
    <div className="text-center">
      <div className="w-10 h-10 border-2 border-kmf-accent/30 border-t-kmf-accent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-kmf-text-tertiary text-sm">Loading...</p>
    </div>
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Blog */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/best-free-trading-journal-app-android-2026" element={<BestTradingJournalAndroid2026 />} />
          <Route path="/blog/profit-factor-vs-win-rate" element={<ProfitFactorVsWinRate />} />
          <Route path="/blog/1-percent-risk-rule" element={<OnePercentRiskRule />} />
          <Route path="/blog/revenge-trading" element={<RevengeTrading />} />
          <Route path="/blog/weekly-trading-review-template" element={<WeeklyTradingReviewTemplate />} />
          <Route path="/blog/r-multiple-explained" element={<RMultipleExplained />} />
          <Route path="/blog/why-traders-break-their-rules" element={<WhyTradersBreakRules />} />
          <Route path="/blog/how-to-recover-from-losing-streak" element={<HowToRecoverFromLosingStreak />} />
          <Route path="/blog/10-questions-after-every-trade" element={<TenQuestionsAfterEveryTrade />} />
          <Route path="/blog/trading-expectancy-explained" element={<TradingExpectancyExplained />} />
          <Route path="/blog/how-to-set-stop-loss" element={<HowToSetStopLoss />} />
          <Route path="/blog/position-sizing-guide" element={<PositionSizingGuide />} />
          <Route path="/blog/pre-trade-checklist" element={<PreTradeChecklist />} />
          <Route path="/blog/execution-gap-backtest-vs-live-trading" element={<ExecutionGap />} />
          <Route path="/blog/prop-firm-trading-journal" element={<PropFirmJournal />} />
          <Route path="/blog/good-loss-vs-bad-win" element={<GoodLossVsBadWin />} />
          <Route path="/blog/ghost-trades-journaling-missed-opportunities" element={<GhostTrades />} />
          <Route path="/blog/crypto-vs-forex-journaling" element={<CryptoVsForexJournaling />} />
          <Route path="/blog/tradingview-kmf-workflow" element={<TradingViewKmfWorkflow />} />
          <Route path="/blog/excel-vs-trading-journal-app" element={<ExcelVsTradingJournal />} />
          <Route path="/blog/prop-firm-daily-drawdown-guide" element={<PropFirmDailyDrawdown />} />
          <Route path="/blog/strategy-is-not-enough" element={<StrategyIsNotEnough />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
