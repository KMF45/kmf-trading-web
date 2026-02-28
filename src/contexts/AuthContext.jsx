import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Lazy-load Firebase to keep it off the critical path (477 kB deferred)
let _firebase = null;
const getFirebase = async () => {
  if (_firebase) return _firebase;
  const [config, authMod] = await Promise.all([
    import('../config/firebase'),
    import('firebase/auth'),
  ]);
  _firebase = {
    auth: config.auth,
    googleProvider: config.googleProvider,
    onAuthStateChanged: authMod.onAuthStateChanged,
    signInWithEmailAndPassword: authMod.signInWithEmailAndPassword,
    createUserWithEmailAndPassword: authMod.createUserWithEmailAndPassword,
    signOut: authMod.signOut,
    sendPasswordResetEmail: authMod.sendPasswordResetEmail,
    sendEmailVerification: authMod.sendEmailVerification,
    signInWithPopup: authMod.signInWithPopup,
  };
  return _firebase;
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let unsubscribe;
    getFirebase().then((fb) => {
      unsubscribe = fb.onAuthStateChanged(fb.auth, (u) => {
        setUser(u);
        setLoading(false);
      });
    });
    return () => unsubscribe?.();
  }, []);

  const login = useCallback(async (email, password) => {
    setError('');
    try {
      const fb = await getFirebase();
      const result = await fb.signInWithEmailAndPassword(fb.auth, email, password);
      if (!result.user.emailVerified) {
        const reviewAccounts = ['testuser@email.com', 'kmf45.ai@gmail.com'];
        if (!reviewAccounts.includes(email.toLowerCase())) {
          await fb.signOut(fb.auth);
          return { success: false, needsVerification: true };
        }
      }
      return { success: true };
    } catch (err) {
      setError(getErrorMessage(err.code));
      return { success: false, error: getErrorMessage(err.code) };
    }
  }, []);

  const register = useCallback(async (email, password) => {
    setError('');
    try {
      const fb = await getFirebase();
      const result = await fb.createUserWithEmailAndPassword(fb.auth, email, password);
      await fb.sendEmailVerification(result.user);
      await fb.signOut(fb.auth);
      return { success: true, needsVerification: true };
    } catch (err) {
      setError(getErrorMessage(err.code));
      return { success: false, error: getErrorMessage(err.code) };
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setError('');
    try {
      const fb = await getFirebase();
      await fb.signInWithPopup(fb.auth, fb.googleProvider);
      return { success: true };
    } catch (err) {
      setError(getErrorMessage(err.code));
      return { success: false, error: getErrorMessage(err.code) };
    }
  }, []);

  const resetPassword = useCallback(async (email) => {
    setError('');
    try {
      const fb = await getFirebase();
      await fb.sendPasswordResetEmail(fb.auth, email, {
        url: 'https://kmfjournal.com',
        handleCodeInApp: false
      });
      return { success: true };
    } catch (err) {
      setError(getErrorMessage(err.code));
      return { success: false, error: getErrorMessage(err.code) };
    }
  }, []);

  const logout = useCallback(async () => {
    const fb = await getFirebase();
    await fb.signOut(fb.auth);
  }, []);

  const resendVerification = useCallback(async (email, password) => {
    try {
      const fb = await getFirebase();
      const result = await fb.signInWithEmailAndPassword(fb.auth, email, password);
      await fb.sendEmailVerification(result.user);
      await fb.signOut(fb.auth);
      return { success: true };
    } catch (err) {
      return { success: false, error: getErrorMessage(err.code) };
    }
  }, []);

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
