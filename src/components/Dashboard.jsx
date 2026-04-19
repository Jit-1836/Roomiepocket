import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Wallet, Banknote, CreditCard, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { 
    currentCash, 
    currentDigital, 
    totalKitty, 
    startingCash, 
    startingDigital,
    setStartingCash,
    setStartingDigital
  } = useExpenses();

  const [isEditing, setIsEditing] = useState(false);
  const [tempCash, setTempCash] = useState(startingCash);
  const [tempDigital, setTempDigital] = useState(startingDigital);

  const handleSave = () => {
    setStartingCash(Number(tempCash));
    setStartingDigital(Number(tempDigital));
    setIsEditing(false);
  };

  if (startingCash === 0 && startingDigital === 0 && !isEditing) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center space-y-4 shadow-lg border border-slate-800">
        <h2 className="text-xl font-semibold text-slate-200">Welcome to RoomiePocket</h2>
        <p className="text-slate-400 text-sm">To start tracking, please set your initial monthly balances for this month's kitty.</p>
        <button 
          onClick={() => setIsEditing(true)}
          className="bg-neon-purple hover:bg-purple-500 text-slate-950 font-bold py-3 px-6 rounded-xl w-full transition-all shadow-[0_0_15px_var(--color-neon-purple-glow)]"
        >
          Set Initial Balances
        </button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
        <h2 className="text-xl font-semibold text-white mb-4">Set Starting Balances</h2>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Starting Cash (₹)</label>
          <input 
            type="number" 
            value={tempCash}
            onChange={e => setTempCash(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Starting Digital (₹)</label>
          <input 
            type="number" 
            value={tempDigital}
            onChange={e => setTempDigital(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple"
          />
        </div>
        <button 
          onClick={handleSave}
          className="bg-slate-100 hover:bg-white text-slate-900 font-bold py-3 px-6 rounded-xl w-full mt-4 transition-colors"
        >
          Save Balances
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Total Kitty Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 glass border flex items-center justify-between border-slate-700/50">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 opacity-20 rounded-full blur-2xl -mr-16 -mt-16"></div>
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Total Common Kitty</p>
          <h1 className="text-4xl font-bold flex items-center gap-1">
            <span className="text-slate-500">₹</span>
            {totalKitty}
          </h1>
        </div>
        <div className="h-12 w-12 rounded-full glass flex items-center justify-center">
          <Wallet className="text-slate-300 w-6 h-6" />
        </div>
      </div>

      {/* Dual Balances */}
      <div className="grid grid-cols-2 gap-4">
        {/* Cash Box */}
        <div className="glass-card rounded-3xl p-5 border-t border-t-neon-green/30 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-xl bg-neon-green/10 text-neon-green">
              <Banknote className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Cash Box</p>
            <p className="text-2xl font-bold text-white flex gap-1">
               <span className="text-neon-green/60">₹</span>{currentCash}
            </p>
          </div>
        </div>

        {/* Digital UPI */}
        <div className="glass-card rounded-3xl p-5 border-t border-t-neon-purple/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-xl bg-neon-purple/10 text-neon-purple">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Digital UPI</p>
            <p className="text-2xl font-bold text-white flex gap-1">
              <span className="text-neon-purple/60">₹</span>{currentDigital}
            </p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => setIsEditing(true)}
        className="w-full py-2 text-sm text-slate-500 font-medium hover:text-slate-300 flex justify-center items-center gap-1"
      >
        Edit starting balances <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Dashboard;
