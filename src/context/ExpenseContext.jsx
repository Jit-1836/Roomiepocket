import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);

const DEFAULT_WHITELIST = ['Water Cans', 'Rice', 'Oil', 'Cleaning Supplies', 'Internet', 'Electricity', 'Maid'];

export const ExpenseProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [startingCash, setStartingCash] = useState(0);
  const [startingDigital, setStartingDigital] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [whitelist, setWhitelist] = useState(DEFAULT_WHITELIST);

  const stateDocRef = doc(db, 'roomie_state', 'shared_doc');
  const expensesCollectionRef = collection(db, 'expenses');

  useEffect(() => {
    // 1. Subscribe to Shared State (Balances & Whitelist)
    const unsubscribeState = onSnapshot(stateDocRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStartingCash(data.startingCash || 0);
        setStartingDigital(data.startingDigital || 0);
        setWhitelist(data.whitelist || DEFAULT_WHITELIST);
      } else {
        // Initialize if it doesn't exist
        await setDoc(stateDocRef, {
          startingCash: 0,
          startingDigital: 0,
          whitelist: DEFAULT_WHITELIST
        });
      }
    }, (error) => {
      console.error("Firebase State Sync Error:", error);
    });

    // 2. Subscribe to Expenses Collection
    const q = query(expensesCollectionRef, orderBy('createdAt', 'desc'));
    const unsubscribeExpenses = onSnapshot(q, (querySnapshot) => {
      const loadedExpenses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenses(loadedExpenses);
      setIsLoaded(true);
    }, (error) => {
      console.error("Firebase Expenses Sync Error:", error);
    });

    return () => {
      unsubscribeState();
      unsubscribeExpenses();
    };
  }, []);

  const handleUpdateStartingCash = async (val) => {
    await updateDoc(stateDocRef, { startingCash: Number(val) });
  };

  const handleUpdateStartingDigital = async (val) => {
    await updateDoc(stateDocRef, { startingDigital: Number(val) });
  };

  const addExpense = async (expense) => {
    await addDoc(expensesCollectionRef, {
      ...expense,
      createdAt: serverTimestamp() // Ensure we can order them
    });
  };

  const removeExpense = async (id) => {
    const expenseDoc = doc(db, 'expenses', id);
    await deleteDoc(expenseDoc);
  };

  const addToWhitelist = async (item) => {
    const newWhitelist = [...new Set([...whitelist, item])];
    await updateDoc(stateDocRef, { whitelist: newWhitelist });
  };

  const removeFromWhitelist = async (item) => {
    const newWhitelist = whitelist.filter(i => i !== item);
    await updateDoc(stateDocRef, { whitelist: newWhitelist });
  };

  const startNewMonth = async (carryForwardCash, carryForwardDigital) => {
    // Update the state doc
    await updateDoc(stateDocRef, {
      startingCash: carryForwardCash,
      startingDigital: carryForwardDigital
    });

    // We must manually delete all previous expenses
    expenses.forEach(async (expense) => {
      await deleteDoc(doc(db, 'expenses', expense.id));
    });
  };

  // Calculations
  const totalCashSpent = expenses.filter(e => e.paymentMode === 'Cash').reduce((sum, e) => sum + Number(e.amount), 0);
  const totalDigitalSpent = expenses.filter(e => e.paymentMode === 'Digital').reduce((sum, e) => sum + Number(e.amount), 0);
  const totalSpent = totalCashSpent + totalDigitalSpent;

  const currentCash = startingCash - totalCashSpent;
  const currentDigital = startingDigital - totalDigitalSpent;
  const totalKitty = currentCash + currentDigital;
  const totalContribution = startingCash + startingDigital;

  const value = {
    startingCash,
    setStartingCash: handleUpdateStartingCash,
    startingDigital,
    setStartingDigital: handleUpdateStartingDigital,
    expenses,
    addExpense,
    removeExpense,
    whitelist,
    addToWhitelist,
    removeFromWhitelist,
    totalSpent,
    totalCashSpent,
    totalDigitalSpent,
    currentCash,
    currentDigital,
    totalKitty,
    totalContribution,
    startNewMonth,
    isLoaded
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
