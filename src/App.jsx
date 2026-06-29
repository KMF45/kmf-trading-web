import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';

// Eagerly loaded (landing page - first paint)
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import CookieConsent from './components/CookieConsent';

// Blog - lazy loaded
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogCategoryPage = lazy(() => import('./pages/BlogCategoryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
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
const WhyTradersFailAtJournaling = lazy(() => import('./pages/blog/WhyTradersFailAtJournaling'));
const OvertradingChecklist = lazy(() => import('./pages/blog/OvertradingChecklist'));
const TiltRecoveryProtocol = lazy(() => import('./pages/blog/TiltRecoveryProtocol'));
const WorstTradingExcuses = lazy(() => import('./pages/blog/WorstTradingExcuses'));
const AiTradeReview = lazy(() => import('./pages/blog/AiTradeReview'));
const MondayEffectTrading = lazy(() => import('./pages/blog/MondayEffectTrading'));
const ConfidenceVsOverconfidence = lazy(() => import('./pages/blog/ConfidenceVsOverconfidence'));
const WeekendGapRisk = lazy(() => import('./pages/blog/WeekendGapRisk'));
const ScalingInVsScalingOut = lazy(() => import('./pages/blog/ScalingInVsScalingOut'));
const MarketOrderVsLimitOrder = lazy(() => import('./pages/blog/MarketOrderVsLimitOrder'));
const AnalysisParalysisTrading = lazy(() => import('./pages/blog/AnalysisParalysisTrading'));
const WhatIsKmfTradingJournal = lazy(() => import('./pages/blog/WhatIsKmfTradingJournal'));
const StaticVsTrailingDrawdown = lazy(() => import('./pages/blog/StaticVsTrailingDrawdown'));
const RevengeTradingKillSwitch = lazy(() => import('./pages/blog/RevengeTradingKillSwitch'));
const MetatraderPreTradeChecklist = lazy(() => import('./pages/blog/MetatraderPreTradeChecklist'));
const BreakevenStopTooEarly = lazy(() => import('./pages/blog/BreakevenStopTooEarly'));
const ScaredMoneyPropFirm = lazy(() => import('./pages/blog/ScaredMoneyPropFirm'));
const LottoTicketSyndrome = lazy(() => import('./pages/blog/LottoTicketSyndrome'));
const ProspectTheoryTrading = lazy(() => import('./pages/blog/ProspectTheoryTrading'));
const IsHundredDollarsEnoughForex = lazy(() => import('./pages/blog/IsHundredDollarsEnoughForex'));
const TradingVsGambling = lazy(() => import('./pages/blog/TradingVsGambling'));
const WhatIsKmfTradingJournalRo = lazy(() => import('./pages/blog/ro/WhatIsKmfTradingJournalRo'));
const TradingVsGamblingRo = lazy(() => import('./pages/blog/ro/TradingVsGamblingRo'));
const AnalysisParalysisTradingRo = lazy(() => import('./pages/blog/ro/AnalysisParalysisTradingRo'));
const IsHundredDollarsEnoughForexRo = lazy(() => import('./pages/blog/ro/IsHundredDollarsEnoughForexRo'));
const RevengeTradingRo = lazy(() => import('./pages/blog/ro/RevengeTradingRo'));
const TradingExpectancyExplainedRo = lazy(() => import('./pages/blog/ro/TradingExpectancyExplainedRo'));
const OnePercentRiskRuleRo = lazy(() => import('./pages/blog/ro/OnePercentRiskRuleRo'));
const HowToRecoverFromLosingStreakRo = lazy(() => import('./pages/blog/ro/HowToRecoverFromLosingStreakRo'));
const ProfitFactorVsWinRateRo = lazy(() => import('./pages/blog/ro/ProfitFactorVsWinRateRo'));
const PositionSizingGuideRo = lazy(() => import('./pages/blog/ro/PositionSizingGuideRo'));
const HowToSetStopLossRo = lazy(() => import('./pages/blog/ro/HowToSetStopLossRo'));
const RMultipleExplainedRo = lazy(() => import('./pages/blog/ro/RMultipleExplainedRo'));
const CryptoVsForexJournalingRo = lazy(() => import('./pages/blog/ro/CryptoVsForexJournalingRo'));
const WhyTradersBreakRulesRo = lazy(() => import('./pages/blog/ro/WhyTradersBreakRulesRo'));
const GoodLossVsBadWinRo = lazy(() => import('./pages/blog/ro/GoodLossVsBadWinRo'));
const WeekendGapRiskRo = lazy(() => import('./pages/blog/ro/WeekendGapRiskRo'));
const PreTradeChecklistRo = lazy(() => import('./pages/blog/ro/PreTradeChecklistRo'));
const TenQuestionsAfterEveryTradeRo = lazy(() => import('./pages/blog/ro/TenQuestionsAfterEveryTradeRo'));
const WeeklyTradingReviewTemplateRo = lazy(() => import('./pages/blog/ro/WeeklyTradingReviewTemplateRo'));
const ExecutionGapRo = lazy(() => import('./pages/blog/ro/ExecutionGapRo'));
const GhostTradesRo = lazy(() => import('./pages/blog/ro/GhostTradesRo'));
const ProspectTheoryTradingRo = lazy(() => import('./pages/blog/ro/ProspectTheoryTradingRo'));
const ConfidenceVsOverconfidenceRo = lazy(() => import('./pages/blog/ro/ConfidenceVsOverconfidenceRo'));
const TiltRecoveryProtocolRo = lazy(() => import('./pages/blog/ro/TiltRecoveryProtocolRo'));
const LottoTicketSyndromeRo = lazy(() => import('./pages/blog/ro/LottoTicketSyndromeRo'));
const BreakevenStopTooEarlyRo = lazy(() => import('./pages/blog/ro/BreakevenStopTooEarlyRo'));
const ExcelVsTradingJournalRo = lazy(() => import('./pages/blog/ro/ExcelVsTradingJournalRo'));
const AiTradeReviewRo = lazy(() => import('./pages/blog/ro/AiTradeReviewRo'));
const TradingViewKmfWorkflowRo = lazy(() => import('./pages/blog/ro/TradingViewKmfWorkflowRo'));
const StrategyIsNotEnoughRo = lazy(() => import('./pages/blog/ro/StrategyIsNotEnoughRo'));
const WhyTradersFailAtJournalingRo = lazy(() => import('./pages/blog/ro/WhyTradersFailAtJournalingRo'));
const OvertradingChecklistRo = lazy(() => import('./pages/blog/ro/OvertradingChecklistRo'));
const RevengeTradingKillSwitchRo = lazy(() => import('./pages/blog/ro/RevengeTradingKillSwitchRo'));
const MarketOrderVsLimitOrderRo = lazy(() => import('./pages/blog/ro/MarketOrderVsLimitOrderRo'));
const ScalingInVsScalingOutRo = lazy(() => import('./pages/blog/ro/ScalingInVsScalingOutRo'));
const MondayEffectTradingRo = lazy(() => import('./pages/blog/ro/MondayEffectTradingRo'));
const WorstTradingExcusesRo = lazy(() => import('./pages/blog/ro/WorstTradingExcusesRo'));
const MetatraderPreTradeChecklistRo = lazy(() => import('./pages/blog/ro/MetatraderPreTradeChecklistRo'));
const StaticVsTrailingDrawdownRo = lazy(() => import('./pages/blog/ro/StaticVsTrailingDrawdownRo'));
const PropFirmJournalRo = lazy(() => import('./pages/blog/ro/PropFirmJournalRo'));
const PropFirmDailyDrawdownRo = lazy(() => import('./pages/blog/ro/PropFirmDailyDrawdownRo'));
const ScaredMoneyPropFirmRo = lazy(() => import('./pages/blog/ro/ScaredMoneyPropFirmRo'));
const BestTradingJournalAndroid2026Ro = lazy(() => import('./pages/blog/ro/BestTradingJournalAndroid2026Ro'));
const BestTradingJournalAndroid2026De = lazy(() => import('./pages/blog/de/BestTradingJournalAndroid2026De'));
// German blog articles
const ProfitFactorVsWinRateDe = lazy(() => import('./pages/blog/de/ProfitFactorVsWinRateDe'));
const MarketOrderVsLimitOrderDe = lazy(() => import('./pages/blog/de/MarketOrderVsLimitOrderDe'));
const ScalingInVsScalingOutDe = lazy(() => import('./pages/blog/de/ScalingInVsScalingOutDe'));
const OnePercentRiskRuleDe = lazy(() => import('./pages/blog/de/OnePercentRiskRuleDe'));
const PositionSizingGuideDe = lazy(() => import('./pages/blog/de/PositionSizingGuideDe'));
const TradingExpectancyExplainedDe = lazy(() => import('./pages/blog/de/TradingExpectancyExplainedDe'));
const RevengeTradingDe = lazy(() => import('./pages/blog/de/RevengeTradingDe'));
const WhyTradersBreakRulesDe = lazy(() => import('./pages/blog/de/WhyTradersBreakRulesDe'));
const HowToRecoverFromLosingStreakDe = lazy(() => import('./pages/blog/de/HowToRecoverFromLosingStreakDe'));
const RMultipleExplainedDe = lazy(() => import('./pages/blog/de/RMultipleExplainedDe'));
const HowToSetStopLossDe = lazy(() => import('./pages/blog/de/HowToSetStopLossDe'));
const PreTradeChecklistDe = lazy(() => import('./pages/blog/de/PreTradeChecklistDe'));
const ProspectTheoryTradingDe = lazy(() => import('./pages/blog/de/ProspectTheoryTradingDe'));
const GoodLossVsBadWinDe = lazy(() => import('./pages/blog/de/GoodLossVsBadWinDe'));
const CryptoVsForexJournalingDe = lazy(() => import('./pages/blog/de/CryptoVsForexJournalingDe'));
const WhatIsKmfTradingJournalDe = lazy(() => import('./pages/blog/de/WhatIsKmfTradingJournalDe'));
const TradingVsGamblingDe = lazy(() => import('./pages/blog/de/TradingVsGamblingDe'));
const AnalysisParalysisTradingDe = lazy(() => import('./pages/blog/de/AnalysisParalysisTradingDe'));
const WeeklyTradingReviewTemplateDe = lazy(() => import('./pages/blog/de/WeeklyTradingReviewTemplateDe'));
const ExecutionGapDe = lazy(() => import('./pages/blog/de/ExecutionGapDe'));
const ConfidenceVsOverconfidenceDe = lazy(() => import('./pages/blog/de/ConfidenceVsOverconfidenceDe'));
const GhostTradesDe = lazy(() => import('./pages/blog/de/GhostTradesDe'));
const BreakevenStopTooEarlyDe = lazy(() => import('./pages/blog/de/BreakevenStopTooEarlyDe'));
const RevengeTradingKillSwitchDe = lazy(() => import('./pages/blog/de/RevengeTradingKillSwitchDe'));
const TiltRecoveryProtocolDe = lazy(() => import('./pages/blog/de/TiltRecoveryProtocolDe'));
const OvertradingChecklistDe = lazy(() => import('./pages/blog/de/OvertradingChecklistDe'));
const LottoTicketSyndromeDe = lazy(() => import('./pages/blog/de/LottoTicketSyndromeDe'));
const PropFirmJournalDe = lazy(() => import('./pages/blog/de/PropFirmJournalDe'));
const StaticVsTrailingDrawdownDe = lazy(() => import('./pages/blog/de/StaticVsTrailingDrawdownDe'));
const PropFirmDailyDrawdownGuideDe = lazy(() => import('./pages/blog/de/PropFirmDailyDrawdownGuideDe'));
const WhyTradersFailAtJournalingDe = lazy(() => import('./pages/blog/de/WhyTradersFailAtJournalingDe'));
const ExcelVsTradingJournalDe = lazy(() => import('./pages/blog/de/ExcelVsTradingJournalDe'));
const AiTradeReviewDe = lazy(() => import('./pages/blog/de/AiTradeReviewDe'));
const TenQuestionsAfterEveryTradeDe = lazy(() => import('./pages/blog/de/TenQuestionsAfterEveryTradeDe'));
const StrategyIsNotEnoughDe = lazy(() => import('./pages/blog/de/StrategyIsNotEnoughDe'));
const TradingViewKmfWorkflowDe = lazy(() => import('./pages/blog/de/TradingViewKmfWorkflowDe'));
const IsHundredDollarsEnoughForexDe = lazy(() => import('./pages/blog/de/IsHundredDollarsEnoughForexDe'));
const WeekendGapRiskDe = lazy(() => import('./pages/blog/de/WeekendGapRiskDe'));
const MondayEffectTradingDe = lazy(() => import('./pages/blog/de/MondayEffectTradingDe'));
const WorstTradingExcusesDe = lazy(() => import('./pages/blog/de/WorstTradingExcusesDe'));
const MetatraderPreTradeChecklistDe = lazy(() => import('./pages/blog/de/MetatraderPreTradeChecklistDe'));
const ScaredMoneyPropFirmDe = lazy(() => import('./pages/blog/de/ScaredMoneyPropFirmDe'));

// Blog articles — French
const WhatIsKmfTradingJournalFr = lazy(() => import('./pages/blog/fr/WhatIsKmfTradingJournalFr'));
const ExcelVsTradingJournalFr = lazy(() => import('./pages/blog/fr/ExcelVsTradingJournalFr'));
const TradingViewKmfWorkflowFr = lazy(() => import('./pages/blog/fr/TradingViewKmfWorkflowFr'));
const RevengeTradingFr = lazy(() => import('./pages/blog/fr/RevengeTradingFr'));
const TradingVsGamblingFr = lazy(() => import('./pages/blog/fr/TradingVsGamblingFr'));
const AnalysisParalysisTradingFr = lazy(() => import('./pages/blog/fr/AnalysisParalysisTradingFr'));
const OnePercentRiskRuleFr = lazy(() => import('./pages/blog/fr/OnePercentRiskRuleFr'));
const PositionSizingGuideFr = lazy(() => import('./pages/blog/fr/PositionSizingGuideFr'));
const ProfitFactorVsWinRateFr = lazy(() => import('./pages/blog/fr/ProfitFactorVsWinRateFr'));
const TradingExpectancyExplainedFr = lazy(() => import('./pages/blog/fr/TradingExpectancyExplainedFr'));
const RMultipleExplainedFr = lazy(() => import('./pages/blog/fr/RMultipleExplainedFr'));
const HowToSetStopLossFr = lazy(() => import('./pages/blog/fr/HowToSetStopLossFr'));
const GoodLossVsBadWinFr = lazy(() => import('./pages/blog/fr/GoodLossVsBadWinFr'));
const WhyTradersFailAtJournalingFr = lazy(() => import('./pages/blog/fr/WhyTradersFailAtJournalingFr'));
const ConfidenceVsOverconfidenceFr = lazy(() => import('./pages/blog/fr/ConfidenceVsOverconfidenceFr'));
const GhostTradesFr = lazy(() => import('./pages/blog/fr/GhostTradesFr'));
const WhyTradersBreakRulesFr = lazy(() => import('./pages/blog/fr/WhyTradersBreakRulesFr'));
const HowToRecoverFromLosingStreakFr = lazy(() => import('./pages/blog/fr/HowToRecoverFromLosingStreakFr'));
const PropFirmJournalFr = lazy(() => import('./pages/blog/fr/PropFirmJournalFr'));
const StaticVsTrailingDrawdownFr = lazy(() => import('./pages/blog/fr/StaticVsTrailingDrawdownFr'));
const PropFirmDailyDrawdownFr = lazy(() => import('./pages/blog/fr/PropFirmDailyDrawdownFr'));
const RevengeTradingKillSwitchFr = lazy(() => import('./pages/blog/fr/RevengeTradingKillSwitchFr'));
const TiltRecoveryProtocolFr = lazy(() => import('./pages/blog/fr/TiltRecoveryProtocolFr'));
const OvertradingChecklistFr = lazy(() => import('./pages/blog/fr/OvertradingChecklistFr'));
const ExecutionGapFr = lazy(() => import('./pages/blog/fr/ExecutionGapFr'));
const TenQuestionsAfterEveryTradeFr = lazy(() => import('./pages/blog/fr/TenQuestionsAfterEveryTradeFr'));
const WeeklyTradingReviewTemplateFr = lazy(() => import('./pages/blog/fr/WeeklyTradingReviewTemplateFr'));
const ProspectTheoryTradingFr = lazy(() => import('./pages/blog/fr/ProspectTheoryTradingFr'));
const LottoTicketSyndromeFr = lazy(() => import('./pages/blog/fr/LottoTicketSyndromeFr'));
const BreakevenStopTooEarlyFr = lazy(() => import('./pages/blog/fr/BreakevenStopTooEarlyFr'));
const PreTradeChecklistFr = lazy(() => import('./pages/blog/fr/PreTradeChecklistFr'));
const ScalingInVsScalingOutFr = lazy(() => import('./pages/blog/fr/ScalingInVsScalingOutFr'));
const StrategyIsNotEnoughFr = lazy(() => import('./pages/blog/fr/StrategyIsNotEnoughFr'));
const AiTradeReviewFr = lazy(() => import('./pages/blog/fr/AiTradeReviewFr'));
const CryptoVsForexJournalingFr = lazy(() => import('./pages/blog/fr/CryptoVsForexJournalingFr'));
const MarketOrderVsLimitOrderFr = lazy(() => import('./pages/blog/fr/MarketOrderVsLimitOrderFr'));
const IsHundredDollarsEnoughForexFr = lazy(() => import('./pages/blog/fr/IsHundredDollarsEnoughForexFr'));
const WeekendGapRiskFr = lazy(() => import('./pages/blog/fr/WeekendGapRiskFr'));
const MondayEffectTradingFr = lazy(() => import('./pages/blog/fr/MondayEffectTradingFr'));

// Legal pages
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const UnsubscribePage = lazy(() => import('./pages/UnsubscribePage'));
const LHPrivacyPolicy = lazy(() => import('./pages/liquidhours/PrivacyPolicyPage'));
const LHTermsOfUse = lazy(() => import('./pages/liquidhours/TermsOfUsePage'));

// Tools
const LotCalculatorPage = lazy(() => import('./pages/LotCalculatorPage'));
const RiskOfRuinPage = lazy(() => import('./pages/RiskOfRuinPage'));
const WinRateRRMatrixPage = lazy(() => import('./pages/WinRateRRMatrixPage'));
const CompoundCalculatorPage = lazy(() => import('./pages/CompoundCalculatorPage'));
const PreTradeChecklistPage = lazy(() => import('./pages/PreTradeChecklistPage'));

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
      <LanguageProvider>
      <ScrollToTop />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Blog */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/category/:category" element={<BlogCategoryPage />} />
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
          <Route path="/blog/why-traders-fail-at-journaling" element={<WhyTradersFailAtJournaling />} />
          <Route path="/blog/overtrading-checklist" element={<OvertradingChecklist />} />
          <Route path="/blog/tilt-recovery-protocol" element={<TiltRecoveryProtocol />} />
          <Route path="/blog/worst-trading-excuses" element={<WorstTradingExcuses />} />
          <Route path="/blog/ai-trade-review" element={<AiTradeReview />} />
          <Route path="/blog/monday-effect-trading" element={<MondayEffectTrading />} />
          <Route path="/blog/confidence-vs-overconfidence" element={<ConfidenceVsOverconfidence />} />
          <Route path="/blog/weekend-gap-risk" element={<WeekendGapRisk />} />
          <Route path="/blog/scaling-in-vs-scaling-out" element={<ScalingInVsScalingOut />} />
          <Route path="/blog/market-order-vs-limit-order" element={<MarketOrderVsLimitOrder />} />
          <Route path="/blog/analysis-paralysis-trading" element={<AnalysisParalysisTrading />} />
          <Route path="/blog/what-is-kmf-trading-journal" element={<WhatIsKmfTradingJournal />} />
          <Route path="/blog/static-vs-trailing-drawdown" element={<StaticVsTrailingDrawdown />} />
          <Route path="/blog/revenge-trading-kill-switch" element={<RevengeTradingKillSwitch />} />
          <Route path="/blog/metatrader-pre-trade-checklist" element={<MetatraderPreTradeChecklist />} />
          <Route path="/blog/breakeven-stop-too-early" element={<BreakevenStopTooEarly />} />
          <Route path="/blog/scared-money-prop-firm" element={<ScaredMoneyPropFirm />} />
          <Route path="/blog/lotto-ticket-syndrome" element={<LottoTicketSyndrome />} />
          <Route path="/blog/prospect-theory-trading" element={<ProspectTheoryTrading />} />
          <Route path="/blog/is-100-enough-to-start-forex" element={<IsHundredDollarsEnoughForex />} />
          <Route path="/blog/trading-vs-gambling" element={<TradingVsGambling />} />

          {/* Tools */}
          <Route path="/tools/lot-size-calculator" element={<LotCalculatorPage />} />
          <Route path="/tools/risk-of-ruin" element={<RiskOfRuinPage />} />
          <Route path="/tools/win-rate-rr-matrix" element={<WinRateRRMatrixPage />} />
          <Route path="/tools/compound-calculator" element={<CompoundCalculatorPage />} />
          <Route path="/tools/pre-trade-checklist" element={<PreTradeChecklistPage />} />

          {/* Translated articles */}
          <Route path="/blog/ro/what-is-kmf-trading-journal" element={<WhatIsKmfTradingJournalRo />} />
          <Route path="/blog/ro/trading-vs-gambling" element={<TradingVsGamblingRo />} />
          <Route path="/blog/ro/analysis-paralysis-trading" element={<AnalysisParalysisTradingRo />} />
          <Route path="/blog/ro/is-100-enough-to-start-forex" element={<IsHundredDollarsEnoughForexRo />} />
          <Route path="/blog/ro/revenge-trading" element={<RevengeTradingRo />} />
          <Route path="/blog/ro/trading-expectancy-explained" element={<TradingExpectancyExplainedRo />} />
          <Route path="/blog/ro/1-percent-risk-rule" element={<OnePercentRiskRuleRo />} />
          <Route path="/blog/ro/how-to-recover-from-losing-streak" element={<HowToRecoverFromLosingStreakRo />} />
          <Route path="/blog/ro/profit-factor-vs-win-rate" element={<ProfitFactorVsWinRateRo />} />
          <Route path="/blog/ro/position-sizing-guide" element={<PositionSizingGuideRo />} />
          <Route path="/blog/ro/how-to-set-stop-loss" element={<HowToSetStopLossRo />} />
          <Route path="/blog/ro/r-multiple-explained" element={<RMultipleExplainedRo />} />
          <Route path="/blog/ro/crypto-vs-forex-journaling" element={<CryptoVsForexJournalingRo />} />
          <Route path="/blog/ro/why-traders-break-their-rules" element={<WhyTradersBreakRulesRo />} />
          <Route path="/blog/ro/good-loss-vs-bad-win" element={<GoodLossVsBadWinRo />} />
          <Route path="/blog/ro/weekend-gap-risk" element={<WeekendGapRiskRo />} />
          <Route path="/blog/ro/pre-trade-checklist" element={<PreTradeChecklistRo />} />
          <Route path="/blog/ro/10-questions-after-every-trade" element={<TenQuestionsAfterEveryTradeRo />} />
          <Route path="/blog/ro/weekly-trading-review-template" element={<WeeklyTradingReviewTemplateRo />} />
          <Route path="/blog/ro/execution-gap-backtest-vs-live-trading" element={<ExecutionGapRo />} />
          <Route path="/blog/ro/ghost-trades-journaling-missed-opportunities" element={<GhostTradesRo />} />
          <Route path="/blog/ro/prospect-theory-trading" element={<ProspectTheoryTradingRo />} />
          <Route path="/blog/ro/confidence-vs-overconfidence" element={<ConfidenceVsOverconfidenceRo />} />
          <Route path="/blog/ro/tilt-recovery-protocol" element={<TiltRecoveryProtocolRo />} />
          <Route path="/blog/ro/lotto-ticket-syndrome" element={<LottoTicketSyndromeRo />} />
          <Route path="/blog/ro/breakeven-stop-too-early" element={<BreakevenStopTooEarlyRo />} />
          <Route path="/blog/ro/excel-vs-trading-journal-app" element={<ExcelVsTradingJournalRo />} />
          <Route path="/blog/ro/ai-trade-review" element={<AiTradeReviewRo />} />
          <Route path="/blog/ro/tradingview-kmf-workflow" element={<TradingViewKmfWorkflowRo />} />
          <Route path="/blog/ro/strategy-is-not-enough" element={<StrategyIsNotEnoughRo />} />
          <Route path="/blog/ro/why-traders-fail-at-journaling" element={<WhyTradersFailAtJournalingRo />} />
          <Route path="/blog/ro/overtrading-checklist" element={<OvertradingChecklistRo />} />
          <Route path="/blog/ro/revenge-trading-kill-switch" element={<RevengeTradingKillSwitchRo />} />
          <Route path="/blog/ro/market-order-vs-limit-order" element={<MarketOrderVsLimitOrderRo />} />
          <Route path="/blog/ro/scaling-in-vs-scaling-out" element={<ScalingInVsScalingOutRo />} />
          <Route path="/blog/ro/monday-effect-trading" element={<MondayEffectTradingRo />} />
          <Route path="/blog/ro/worst-trading-excuses" element={<WorstTradingExcusesRo />} />
          <Route path="/blog/ro/metatrader-pre-trade-checklist" element={<MetatraderPreTradeChecklistRo />} />
          <Route path="/blog/ro/static-vs-trailing-drawdown" element={<StaticVsTrailingDrawdownRo />} />
          <Route path="/blog/ro/prop-firm-trading-journal" element={<PropFirmJournalRo />} />
          <Route path="/blog/ro/prop-firm-daily-drawdown-guide" element={<PropFirmDailyDrawdownRo />} />
          <Route path="/blog/ro/scared-money-prop-firm" element={<ScaredMoneyPropFirmRo />} />
          <Route path="/blog/ro/best-free-trading-journal-app-android-2026" element={<BestTradingJournalAndroid2026Ro />} />
          <Route path="/blog/de/best-free-trading-journal-app-android-2026" element={<BestTradingJournalAndroid2026De />} />
          {/* German blog articles */}
          <Route path="/blog/de/profit-factor-vs-win-rate" element={<ProfitFactorVsWinRateDe />} />
          <Route path="/blog/de/market-order-vs-limit-order" element={<MarketOrderVsLimitOrderDe />} />
          <Route path="/blog/de/scaling-in-vs-scaling-out" element={<ScalingInVsScalingOutDe />} />
          <Route path="/blog/de/1-percent-risk-rule" element={<OnePercentRiskRuleDe />} />
          <Route path="/blog/de/position-sizing-guide" element={<PositionSizingGuideDe />} />
          <Route path="/blog/de/trading-expectancy-explained" element={<TradingExpectancyExplainedDe />} />
          <Route path="/blog/de/revenge-trading" element={<RevengeTradingDe />} />
          <Route path="/blog/de/why-traders-break-their-rules" element={<WhyTradersBreakRulesDe />} />
          <Route path="/blog/de/how-to-recover-from-losing-streak" element={<HowToRecoverFromLosingStreakDe />} />
          <Route path="/blog/de/r-multiple-explained" element={<RMultipleExplainedDe />} />
          <Route path="/blog/de/how-to-set-stop-loss" element={<HowToSetStopLossDe />} />
          <Route path="/blog/de/pre-trade-checklist" element={<PreTradeChecklistDe />} />
          <Route path="/blog/de/prospect-theory-trading" element={<ProspectTheoryTradingDe />} />
          <Route path="/blog/de/good-loss-vs-bad-win" element={<GoodLossVsBadWinDe />} />
          <Route path="/blog/de/crypto-vs-forex-journaling" element={<CryptoVsForexJournalingDe />} />
          <Route path="/blog/de/what-is-kmf-trading-journal" element={<WhatIsKmfTradingJournalDe />} />
          <Route path="/blog/de/trading-vs-gambling" element={<TradingVsGamblingDe />} />
          <Route path="/blog/de/analysis-paralysis-trading" element={<AnalysisParalysisTradingDe />} />
          <Route path="/blog/de/weekly-trading-review-template" element={<WeeklyTradingReviewTemplateDe />} />
          <Route path="/blog/de/execution-gap-backtest-vs-live-trading" element={<ExecutionGapDe />} />
          <Route path="/blog/de/confidence-vs-overconfidence" element={<ConfidenceVsOverconfidenceDe />} />
          <Route path="/blog/de/ghost-trades-journaling-missed-opportunities" element={<GhostTradesDe />} />
          <Route path="/blog/de/breakeven-stop-too-early" element={<BreakevenStopTooEarlyDe />} />
          <Route path="/blog/de/revenge-trading-kill-switch" element={<RevengeTradingKillSwitchDe />} />
          <Route path="/blog/de/tilt-recovery-protocol" element={<TiltRecoveryProtocolDe />} />
          <Route path="/blog/de/overtrading-checklist" element={<OvertradingChecklistDe />} />
          <Route path="/blog/de/lotto-ticket-syndrome" element={<LottoTicketSyndromeDe />} />
          <Route path="/blog/de/prop-firm-trading-journal" element={<PropFirmJournalDe />} />
          <Route path="/blog/de/static-vs-trailing-drawdown" element={<StaticVsTrailingDrawdownDe />} />
          <Route path="/blog/de/prop-firm-daily-drawdown-guide" element={<PropFirmDailyDrawdownGuideDe />} />
          <Route path="/blog/de/why-traders-fail-at-journaling" element={<WhyTradersFailAtJournalingDe />} />
          <Route path="/blog/de/excel-vs-trading-journal-app" element={<ExcelVsTradingJournalDe />} />
          <Route path="/blog/de/ai-trade-review" element={<AiTradeReviewDe />} />
          <Route path="/blog/de/10-questions-after-every-trade" element={<TenQuestionsAfterEveryTradeDe />} />
          <Route path="/blog/de/strategy-is-not-enough" element={<StrategyIsNotEnoughDe />} />
          <Route path="/blog/de/tradingview-kmf-workflow" element={<TradingViewKmfWorkflowDe />} />
          <Route path="/blog/de/is-100-enough-to-start-forex" element={<IsHundredDollarsEnoughForexDe />} />
          <Route path="/blog/de/weekend-gap-risk" element={<WeekendGapRiskDe />} />
          <Route path="/blog/de/monday-effect-trading" element={<MondayEffectTradingDe />} />
          <Route path="/blog/de/worst-trading-excuses" element={<WorstTradingExcusesDe />} />
          <Route path="/blog/de/metatrader-pre-trade-checklist" element={<MetatraderPreTradeChecklistDe />} />
          <Route path="/blog/de/scared-money-prop-firm" element={<ScaredMoneyPropFirmDe />} />

          {/* Blog — French */}
          <Route path="/blog/fr/what-is-kmf-trading-journal" element={<WhatIsKmfTradingJournalFr />} />
          <Route path="/blog/fr/excel-vs-trading-journal-app" element={<ExcelVsTradingJournalFr />} />
          <Route path="/blog/fr/tradingview-kmf-workflow" element={<TradingViewKmfWorkflowFr />} />
          <Route path="/blog/fr/revenge-trading" element={<RevengeTradingFr />} />
          <Route path="/blog/fr/trading-vs-gambling" element={<TradingVsGamblingFr />} />
          <Route path="/blog/fr/analysis-paralysis-trading" element={<AnalysisParalysisTradingFr />} />
          <Route path="/blog/fr/1-percent-risk-rule" element={<OnePercentRiskRuleFr />} />
          <Route path="/blog/fr/position-sizing-guide" element={<PositionSizingGuideFr />} />
          <Route path="/blog/fr/profit-factor-vs-win-rate" element={<ProfitFactorVsWinRateFr />} />
          <Route path="/blog/fr/trading-expectancy-explained" element={<TradingExpectancyExplainedFr />} />
          <Route path="/blog/fr/r-multiple-explained" element={<RMultipleExplainedFr />} />
          <Route path="/blog/fr/how-to-set-stop-loss" element={<HowToSetStopLossFr />} />
          <Route path="/blog/fr/good-loss-vs-bad-win" element={<GoodLossVsBadWinFr />} />
          <Route path="/blog/fr/why-traders-fail-at-journaling" element={<WhyTradersFailAtJournalingFr />} />
          <Route path="/blog/fr/confidence-vs-overconfidence" element={<ConfidenceVsOverconfidenceFr />} />
          <Route path="/blog/fr/ghost-trades-journaling-missed-opportunities" element={<GhostTradesFr />} />
          <Route path="/blog/fr/why-traders-break-their-rules" element={<WhyTradersBreakRulesFr />} />
          <Route path="/blog/fr/how-to-recover-from-losing-streak" element={<HowToRecoverFromLosingStreakFr />} />
          <Route path="/blog/fr/prop-firm-trading-journal" element={<PropFirmJournalFr />} />
          <Route path="/blog/fr/static-vs-trailing-drawdown" element={<StaticVsTrailingDrawdownFr />} />
          <Route path="/blog/fr/prop-firm-daily-drawdown-guide" element={<PropFirmDailyDrawdownFr />} />
          <Route path="/blog/fr/revenge-trading-kill-switch" element={<RevengeTradingKillSwitchFr />} />
          <Route path="/blog/fr/tilt-recovery-protocol" element={<TiltRecoveryProtocolFr />} />
          <Route path="/blog/fr/overtrading-checklist" element={<OvertradingChecklistFr />} />
          <Route path="/blog/fr/execution-gap-backtest-vs-live-trading" element={<ExecutionGapFr />} />
          <Route path="/blog/fr/10-questions-after-every-trade" element={<TenQuestionsAfterEveryTradeFr />} />
          <Route path="/blog/fr/weekly-trading-review-template" element={<WeeklyTradingReviewTemplateFr />} />
          <Route path="/blog/fr/prospect-theory-trading" element={<ProspectTheoryTradingFr />} />
          <Route path="/blog/fr/lotto-ticket-syndrome" element={<LottoTicketSyndromeFr />} />
          <Route path="/blog/fr/breakeven-stop-too-early" element={<BreakevenStopTooEarlyFr />} />
          <Route path="/blog/fr/pre-trade-checklist" element={<PreTradeChecklistFr />} />
          <Route path="/blog/fr/scaling-in-vs-scaling-out" element={<ScalingInVsScalingOutFr />} />
          <Route path="/blog/fr/strategy-is-not-enough" element={<StrategyIsNotEnoughFr />} />
          <Route path="/blog/fr/ai-trade-review" element={<AiTradeReviewFr />} />
          <Route path="/blog/fr/crypto-vs-forex-journaling" element={<CryptoVsForexJournalingFr />} />
          <Route path="/blog/fr/market-order-vs-limit-order" element={<MarketOrderVsLimitOrderFr />} />
          <Route path="/blog/fr/is-100-enough-to-start-forex" element={<IsHundredDollarsEnoughForexFr />} />
          <Route path="/blog/fr/weekend-gap-risk" element={<WeekendGapRiskFr />} />
          <Route path="/blog/fr/monday-effect-trading" element={<MondayEffectTradingFr />} />

          {/* Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />

          {/* LiquidHours legal */}
          <Route path="/liquidhours/privacy-policy" element={<LHPrivacyPolicy />} />
          <Route path="/liquidhours/terms-of-use" element={<LHTermsOfUse />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <CookieConsent />
      </LanguageProvider>
    </Router>
  );
}

export default App;
