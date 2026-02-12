import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-kmf-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-kmf-accent to-kmf-accent-bright animate-pulse mb-4"></div>
          <p className="text-kmf-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
