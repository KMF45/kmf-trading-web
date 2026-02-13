import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, orderBy, setDoc, serverTimestamp, Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ============ TRADES ============

export const getTrades = async (userId) => {
  try {
    const tradesRef = collection(db, 'users', userId, 'trades');
    const q = query(tradesRef, orderBy('openDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      openDate: doc.data().openDate?.toDate?.() || new Date(doc.data().openDate),
      closeDate: doc.data().closeDate?.toDate?.() || (doc.data().closeDate ? new Date(doc.data().closeDate) : null),
    }));
  } catch (err) {
    console.error('Error getting trades:', err);
    return [];
  }
};

export const addTrade = async (userId, trade) => {
  try {
    const tradesRef = collection(db, 'users', userId, 'trades');
    const docRef = await addDoc(tradesRef, {
      ...trade,
      openDate: trade.openDate ? Timestamp.fromDate(new Date(trade.openDate)) : serverTimestamp(),
      closeDate: trade.closeDate ? Timestamp.fromDate(new Date(trade.closeDate)) : null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, ...trade };
  } catch (err) {
    console.error('Error adding trade:', err);
    throw err;
  }
};

export const updateTrade = async (userId, tradeId, updates) => {
  try {
    const tradeRef = doc(db, 'users', userId, 'trades', tradeId);
    const cleanUpdates = { ...updates, updatedAt: serverTimestamp() };
    if (cleanUpdates.openDate) cleanUpdates.openDate = Timestamp.fromDate(new Date(cleanUpdates.openDate));
    if (cleanUpdates.closeDate) cleanUpdates.closeDate = Timestamp.fromDate(new Date(cleanUpdates.closeDate));
    await updateDoc(tradeRef, cleanUpdates);
  } catch (err) {
    console.error('Error updating trade:', err);
    throw err;
  }
};

export const deleteTrade = async (userId, tradeId) => {
  try {
    const tradeRef = doc(db, 'users', userId, 'trades', tradeId);
    await deleteDoc(tradeRef);
  } catch (err) {
    console.error('Error deleting trade:', err);
    throw err;
  }
};

// ============ USER SETTINGS ============

export const getUserSettings = async (userId) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
    const snap = await getDoc(settingsRef);
    if (snap.exists()) return snap.data();
    const defaults = {
      accountBalance: 10000,
      currency: 'USD',
      language: 'en',
      riskPerTrade: 1,
      defaultLotSize: 0.01,
    };
    await setDoc(settingsRef, defaults);
    return defaults;
  } catch (err) {
    console.error('Error getting settings:', err);
    return { accountBalance: 10000, currency: 'USD', language: 'en', riskPerTrade: 1, defaultLotSize: 0.01 };
  }
};

export const updateUserSettings = async (userId, settings) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
    await setDoc(settingsRef, { ...settings, updatedAt: serverTimestamp() }, { merge: true });
  } catch (err) {
    console.error('Error updating settings:', err);
    throw err;
  }
};
