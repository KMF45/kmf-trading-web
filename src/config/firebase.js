import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvwcJ8QzzKb_k11DwZLcudVmRGj9zjgs8",
  authDomain: "kmf-trading-journal.firebaseapp.com",
  databaseURL: "https://kmf-trading-journal-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kmf-trading-journal",
  storageBucket: "kmf-trading-journal.firebasestorage.app",
  messagingSenderId: "62737960002",
  appId: "1:62737960002:web:81089a0c4d68e07ee571db",
  measurementId: "G-MT8JT23VC1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
