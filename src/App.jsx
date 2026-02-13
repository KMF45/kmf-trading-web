import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TradesProvider } from './contexts/TradesContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import AddTradePage from './pages/AddTradePage';
import HistoryPage from './pages/HistoryPage';
import StatisticsPage from './pages/StatisticsPage';
import WeeklyReviewPage from './pages/WeeklyReviewPage';
import LotCalculatorPage from './pages/LotCalculatorPage';
import SettingsPage from './pages/SettingsPage';
import ChecklistPage from './pages/ChecklistPage';

const AuthRedirect = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/app" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
          <Route path="/register" element={<AuthRedirect><RegisterPage /></AuthRedirect>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected app routes - wrapped in TradesProvider */}
          <Route path="/app" element={
            <ProtectedRoute>
              <TradesProvider>
                <AppLayout />
              </TradesProvider>
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

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
