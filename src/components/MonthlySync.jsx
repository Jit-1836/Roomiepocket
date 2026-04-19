import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { CalendarCheck, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';

const MonthlySync = () => {
  const { 
    totalContribution, 
    totalSpent, 
    currentCash, 
    currentDigital,
    startNewMonth 
  } = useExpenses();

  const [isSyncing, setIsSyncing] = useState(false);
  const [carryForwardMode, setCarryForwardMode] = useState(true);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      // If we carry forward, we use current balances as starting for next month
      // Otherwise we reset to 0
      if (carryForwardMode) {
        startNewMonth(currentCash, currentDigital);
      } else {
        startNewMonth(0, 0);
      }
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-slate-700/50">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
          <CalendarCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Monthly Sync</h2>
          <p className="text-xs text-slate-400">Close accounts for this month</p>
        </div>
      </div>

      <div className="space-y-4 mb-8 relative">
        {/* Connection line */}
        <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-700/50"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-slate-400">
            <Wallet className="w-5 h-5" />
          </div>
          <div className="flex-1 bg-slate-900/50 p-4 rounded-2xl border border-slate-700/30">
            <p className="text-xs text-slate-500 font-medium uppercase mb-1">Starting Total</p>
            <p className="text-xl font-bold text-slate-200">₹{totalContribution}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-red-400">
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="flex-1 bg-slate-900/50 p-4 rounded-2xl border border-slate-700/30">
            <p className="text-xs text-slate-500 font-medium uppercase mb-1">Total Spent</p>
            <p className="text-xl font-bold text-red-400">₹{totalSpent}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-neon-green/20 border-4 border-slate-900 flex items-center justify-center text-neon-green">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 bg-gradient-to-r from-neon-green/10 to-transparent p-4 rounded-2xl border border-neon-green/30">
            <p className="text-xs text-neon-green/70 font-bold uppercase mb-1">Remaining Kitty</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-neon-green flex items-center gap-1">
                <span>₹</span>{currentCash + currentDigital}
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-1">Cash: ₹{currentCash} | Digital: ₹{currentDigital}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors">
          <input 
            type="checkbox" 
            checked={carryForwardMode}
            onChange={() => setCarryForwardMode(!carryForwardMode)}
            className="w-5 h-5 rounded bg-slate-800 border-slate-600 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-900" 
          />
          <sspan className="text-sm text-slate-300 font-medium">Carry forward remaining balance to next month</sspan>
        </label>

        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSyncing ? (
            <span className="animate-pulse">Syncing & Clearing Logs...</span>
          ) : (
            'Close Month & Sync'
          )}
        </button>
      </div>

    </div>
  );
};

export default MonthlySync;
