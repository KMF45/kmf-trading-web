import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

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

// Lazy loaded (only when navigating away from landing)
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const AppLayout = lazy(() => import('./components/layout/AppLayout'));
const ProtectedRoute = lazy(() => import('./components/common/ProtectedRoute'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AddTradePage = lazy(() => import('./pages/AddTradePage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));
const WeeklyReviewPage = lazy(() => import('./pages/WeeklyReviewPage'));
const LotCalculatorPage = lazy(() => import('./pages/LotCalculatorPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ChecklistPage = lazy(() => import('./pages/ChecklistPage'));

// Lazy load TradesProvider (imports Firebase/Firestore)
const TradesProviderModule = lazy(() =>
  import('./contexts/TradesContext').then(mod => ({
    default: ({ children }) => <mod.TradesProvider>{children}</mod.TradesProvider>
  }))
);

// Loading spinner for lazy-loaded routes
const RouteLoader = () => (
  <div className="min-h-screen bg-kmf-bg flex items-center justify-center">
    <div className="text-center">
      <div className="w-10 h-10 border-2 border-kmf-accent/30 border-t-kmf-accent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-kmf-text-tertiary text-sm">Loading...</p>
    </div>
  </div>
);

const AuthRedirect = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <RouteLoader />;
  if (user) return <Navigate to="/app" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            {/* Public routes - LandingPage loads instantly */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
            <Route path="/register" element={<AuthRedirect><RegisterPage /></AuthRedirect>} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected app routes - lazy loaded with Firebase */}
            <Route path="/app" element={
              <ProtectedRoute>
                <TradesProviderModule>
                  <AppLayout />
                </TradesProviderModule>
              </ProtectedRoute>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="add-trade" element={<AddTradePage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="statistics" element={<StatisticsPage />} />
              <Route path="weekly-review" element={<WeeklyReviewPage />} />
              <Route path="checklist" element={<ChecklistPage />} />
              <Route path="calculator" element={<LotCalculatorPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

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

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
