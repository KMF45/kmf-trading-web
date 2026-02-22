mport { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
      const reviewAccounts = ['testuser@email.com', 'kmf45.ai@gmail.com'];
      if (!reviewAccounts.includes(email.toLowerCase())) {
          await signOut(auth);
          return { success: false, needsVerification: true };
        }
      }
      return { success: true };
    } catch (err) {
      setError(getErrorMessage(err.code));
      return { success: false, error: getErrorMessage(err.code) };
    }
  };

  const register = async (email, password) => {
    setError('');
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(result.user);
      await signOut(auth);
      return { success: true, needsVerification: true };
    } catch (err) {
      setError(getErrorMessage(err.code));
      return { success: false, error: getErrorMessage(err.code) };
    }
  };

  const loginWithGoogle = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (err) {
      setError(getErrorMessage(err.code));
      return { success: false, error: getErrorMessage(err.code) };
    }
  };

  const resetPassword = async (email) => {
    setError('');
    try {
      await sendPasswordResetEmail(auth, email, {
        url: 'https://kmfjournal.com',
        handleCodeInApp: false
      });
      return { success: true };
    } catch (err) {
      setError(getErrorMessage(err.code));
      return { success: false, error: getErrorMessage(err.code) };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resendVerification = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(result.user);
      await signOut(auth);
      return { success: true };
    } catch (err) {
      return { success: false, error: getErrorMessage(err.code) };
    }
  };

  const getErrorMessage = (code) => {
    const errors = {
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/invalid-credential': 'Invalid email or password',
      'auth/email-already-in-use': 'Email already registered',
      'auth/weak-password': 'Password must be at least 6 characters',
      'auth/invalid-email': 'Invalid email address',
      'auth/too-many-requests': 'Too many attempts. Try again later',
      'auth/popup-closed-by-user': 'Sign-in popup was closed',
      'auth/network-request-failed': 'Network error. Check your connection',
    };
    return errors[code] || 'An error occurred. Please try again';
  };

  const value = {
    user,
    loading,
    error,
    setError,
    login,
    register,
    loginWithGoogle,
    resetPassword,
    logout,
    resendVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
