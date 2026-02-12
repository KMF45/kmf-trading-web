import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [registered, setRegistered] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });
    const result = await register(email, password);
    if (result.success) {
      setRegistered(true);
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await loginWithGoogle();
    if (result.success) {
      navigate('/app');
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    setLoading(false);
  };

  if (registered) {
    return (
      <div className="min-h-screen bg-kmf-bg flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-kmf-panel rounded-2xl p-8 border border-kmf-accent/20">
            <FaCheckCircle className="text-kmf-profit text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-3">Check Your Email</h2>
            <p className="text-kmf-text-secondary mb-6">
              We sent a verification link to <span className="text-kmf-accent font-medium">{email}</span>. Please verify your email to continue.
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white font-semibold rounded-lg shadow-glow hover:shadow-glow-hover transition-all"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kmf-bg flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-kmf-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-kmf-accent-bright/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="KMF" className="w-20 h-20 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(79,195,247,0.5)]" />
          </Link>
          <h1 className="text-3xl font-bold text-kmf-text-primary mb-2">Create Account</h1>
          <p className="text-kmf-text-tertiary">Start tracking your trades professionally</p>
        </div>

        <div className="bg-kmf-panel rounded-2xl p-8 border border-kmf-accent/20 shadow-[0_0_30px_rgba(79,195,247,0.08)]">
          {message.text && (
            <div className={`mb-6 p-3 rounded-lg text-sm ${
              message.type === 'error' ? 'bg-kmf-loss/10 text-kmf-loss border border-kmf-loss/30' : ''
            }`}>
              {message.text}
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

            <div>
              <label className="block text-sm font-medium text-kmf-text-secondary mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kmf-text-tertiary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  className="w-full bg-kmf-bg border border-kmf-accent/20 rounded-lg pl-10 pr-12 py-3 text-kmf-text-primary placeholder-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent focus:shadow-[0_0_10px_rgba(79,195,247,0.2)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-kmf-text-tertiary hover:text-kmf-accent transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-kmf-text-secondary mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kmf-text-tertiary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-kmf-accent/20"></div>
            <span className="text-xs text-kmf-text-tertiary font-medium">OR</span>
            <div className="flex-1 h-px bg-kmf-accent/20"></div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full py-3 bg-kmf-bg border border-kmf-accent/30 text-kmf-text-primary font-medium rounded-lg flex items-center justify-center gap-3 hover:bg-kmf-surface/50 hover:border-kmf-accent/50 transition-all duration-300 disabled:opacity-50"
          >
            <FaGoogle className="text-kmf-accent" />
            Continue with Google
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-kmf-text-tertiary">
          Already have an account?{' '}
          <Link to="/login" className="text-kmf-accent hover:text-kmf-accent-bright font-medium transition-colors">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
