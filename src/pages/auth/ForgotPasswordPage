import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await resetPassword(email);
    if (result.success) {
      setSent(true);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-kmf-bg flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-kmf-accent/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="KMF" className="w-20 h-20 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(79,195,247,0.5)]" />
          </Link>
          <h1 className="text-3xl font-bold text-kmf-text-primary mb-2">Reset Password</h1>
          <p className="text-kmf-text-tertiary">We'll send you a reset link</p>
        </div>

        <div className="bg-kmf-panel rounded-2xl p-8 border border-kmf-accent/20 shadow-[0_0_30px_rgba(79,195,247,0.08)]">
          {sent ? (
            <div className="text-center">
              <FaCheckCircle className="text-kmf-profit text-5xl mx-auto mb-4" />
              <h2 className="text-xl font-bold text-kmf-text-primary mb-3">Email Sent</h2>
              <p className="text-kmf-text-secondary mb-6">
                Check <span className="text-kmf-accent font-medium">{email}</span> for a password reset link.
              </p>
              <Link
                to="/login"
                className="inline-block px-8 py-3 bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white font-semibold rounded-lg shadow-glow hover:shadow-glow-hover transition-all"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-3 rounded-lg text-sm bg-kmf-loss/10 text-kmf-loss border border-kmf-loss/30">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-kmf-text-secondary mb-2">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kmf-text-tertiary" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full bg-kmf-bg border border-kmf-accent/20 rounded-lg pl-10 pr-4 py-3 text-kmf-text-primary placeholder-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent focus:shadow-[0_0_10px_rgba(79,195,247,0.2)] transition-all"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white font-semibold rounded-lg shadow-glow hover:shadow-glow-hover transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-kmf-text-tertiary hover:text-kmf-accent transition-colors inline-flex items-center gap-2">
            <FaArrowLeft size={12} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
