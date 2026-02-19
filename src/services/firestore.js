import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, orderBy, setDoc, serverTimestamp, Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ============ TRADES ============
// Field mapping matches Android app's Trade.toFirestoreMap() exactly

export const getTrades = async (userId) => {
  try {
    const tradesRef = collection(db, 'users', userId, 'trades');
    const q = query(tradesRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => {
      const d = docSnap.data();
      return {
        id: docSnap.id,
        localId: d.localId || 0,
        instrument: d.instrument || '',
        type: d.type || 'BUY',
        entryPrice: d.entryPrice || 0,
        stopLoss: d.stopLoss || null,
        takeProfit: d.takeProfit || null,
        lotSize: d.lotSize || 0,
        pnlAmount: d.pnlAmount || null,
        actualPnL: d.actualPnL || null,
        result: d.result || 'PENDING',
        rating: d.rating || 0,
        notes: d.notes || '',
        photoUri: d.photoUri || null,
        completedTasks: d.completedTasks || [],
        timestamp: d.timestamp || Date.now(),
        tradeDateTime: d.tradeDateTime || d.timestamp || Date.now(),
        followedPlan: d.followedPlan !== false,
        rMultiple: d.rMultiple || 0,
        createdAt: d.createdAt || Date.now(),
        updatedAt: d.updatedAt || Date.now(),
      };
    });
  } catch (err) {
    console.error('Error getting trades:', err);
    return [];
  }
};

export const addTrade = async (userId, trade) => {
  try {
    const tradesRef = collection(db, 'users', userId, 'trades');
    const tradeMap = {
      localId: trade.localId || 0,
      userId: userId,
      instrument: trade.instrument || '',
      type: trade.type || 'BUY',
      entryPrice: trade.entryPrice || 0,
      stopLoss: trade.stopLoss || null,
      takeProfit: trade.takeProfit || null,
      lotSize: trade.lotSize || 0,
      pnlAmount: trade.pnlAmount || null,
      actualPnL: trade.actualPnL || null,
      result: trade.result || 'PENDING',
      rating: trade.rating || 0,
      notes: trade.notes || '',
      photoUri: trade.photoUri || null,
      completedTasks: trade.completedTasks || [],
      timestamp: trade.timestamp || Date.now(),
      tradeDateTime: trade.tradeDateTime || Date.now(),
      followedPlan: trade.followedPlan !== false,
      rMultiple: trade.rMultiple || 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const docRef = await addDoc(tradesRef, tradeMap);
    return { id: docRef.id, ...tradeMap };
  } catch (err) {
    console.error('Error adding trade:', err);
    throw err;
  }
};

export const updateTrade = async (userId, tradeId, updates) => {
  try {
    const tradeRef = doc(db, 'users', userId, 'trades', tradeId);
    await updateDoc(tradeRef, { ...updates, updatedAt: Date.now() });
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
    return { accountBalance: 10000 };
  } catch (err) {
    console.error('Error getting settings:', err);
    return { accountBalance: 10000 };
  }
};

export const updateUserSettings = async (userId, settings) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'settings', 'preferences');
    await setDoc(settingsRef, { ...settings, updatedAt: Date.now() }, { merge: true });
  } catch (err) {
    console.error('Error updating settings:', err);
    throw err;
  }
};

// ============ WEEKLY REVIEWS ============

export const getWeeklyReviews = async (userId) => {
  try {
    const ref = collection(db, 'users', userId, 'weeklyReviews');
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(docSnap => {
      const d = docSnap.data();
      return {
        id: docSnap.id,
        weekNumber: d.weekNumber || 0,
        year: d.year || 0,
        disciplineScore: d.disciplineScore || 5,
        planScore: d.planScore || 5,
        emotionScore: d.emotionScore || 5,
        motivationScore: d.motivationScore || 5,
        satisfactionScore: d.satisfactionScore || 5,
        noteGood: d.noteGood || '',
        noteBad: d.noteBad || '',
        noteLearning: d.noteLearning || '',
        overallScore: d.overallScore || 5,
        createdAt: d.createdAt || Date.now(),
      };
    });
  } catch (err) {
    console.error('Error getting weekly reviews:', err);
    return [];
  }
};

export const saveWeeklyReview = async (userId, review) => {
  try {
    const docId = `week_${review.weekNumber}_${review.year}`;
    const ref = doc(db, 'users', userId, 'weeklyReviews', docId);
    await setDoc(ref, {
      ...review,
      userId,
      updatedAt: Date.now(),
    }, { merge: true });
    return docId;
  } catch (err) {
    console.error('Error saving weekly review:', err);
    throw err;
  }
};

// ============ WEEKLY GOALS ============

export const getWeeklyGoals = async (userId) => {
  try {
    const ref = collection(db, 'users', userId, 'weeklyGoals');
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(docSnap => {
      const d = docSnap.data();
      return {
        id: docSnap.id,
        localId: d.localId || 0,
        weekNumber: d.weekNumber || 0,
        year: d.year || 0,
        goalText: d.goalText || '',
        status: d.status || 'PENDING',
        carryOverCount: d.carryOverCount || 0,
        createdAt: d.createdAt || Date.now(),
      };
    });
  } catch (err) {
    console.error('Error getting weekly goals:', err);
    return [];
  }
};

export const saveWeeklyGoal = async (userId, goal) => {
  try {
    const ref = collection(db, 'users', userId, 'weeklyGoals');
    const docRef = await addDoc(ref, {
      ...goal,
      userId,
      updatedAt: Date.now(),
      createdAt: goal.createdAt || Date.now(),
    });
    return docRef.id;
  } catch (err) {
    console.error('Error saving weekly goal:', err);
    throw err;
  }
};

export const updateWeeklyGoal = async (userId, goalId, updates) => {
  try {
    const ref = doc(db, 'users', userId, 'weeklyGoals', goalId);
    await updateDoc(ref, { ...updates, updatedAt: Date.now() });
  } catch (err) {
    console.error('Error updating weekly goal:', err);
    throw err;
  }
};

export const deleteWeeklyGoal = async (userId, goalId) => {
  try {
    const ref = doc(db, 'users', userId, 'weeklyGoals', goalId);
    await deleteDoc(ref);
  } catch (err) {
    console.error('Error deleting weekly goal:', err);
    throw err;
  }
};

// ============ CHECKLISTS ============

export const getChecklists = async (userId) => {
  try {
    const ref = collection(db, 'users', userId, 'checklists');
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(docSnap => {
      const d = docSnap.data();
      return {
        id: docSnap.id,
        name: d.name || 'Checklist',
        isDefault: d.isDefault || false,
        tasks: d.tasks || [],
        createdAt: d.createdAt || Date.now(),
      };
    });
  } catch (err) {
    console.error('Error getting checklists:', err);
    return [];
  }
};

export const saveChecklist = async (userId, checklist) => {
  try {
    const ref = collection(db, 'users', userId, 'checklists');
    const docRef = await addDoc(ref, {
      ...checklist,
      userId,
      createdAt: checklist.createdAt || Date.now(),
      updatedAt: Date.now(),
    });
    return docRef.id;
  } catch (err) {
    console.error('Error saving checklist:', err);
    throw err;
  }
};

export const updateChecklist = async (userId, checklistId, updates) => {
  try {
    const ref = doc(db, 'users', userId, 'checklists', checklistId);
    await updateDoc(ref, { ...updates, updatedAt: Date.now() });
  } catch (err) {
    console.error('Error updating checklist:', err);
    throw err;
  }
};

export const deleteChecklist = async (userId, checklistId) => {
  try {
    const ref = doc(db, 'users', userId, 'checklists', checklistId);
    await deleteDoc(ref);
  } catch (err) {
    console.error('Error deleting checklist:', err);
    throw err;
  }
};
