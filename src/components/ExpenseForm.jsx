import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Settings, Plus, X } from 'lucide-react';

const ExpenseForm = () => {
  const { whitelist, addExpense } = useExpenses();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Digital');
  const [category, setCategory] = useState('Common');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    addExpense({
      name,
      amount: Number(amount),
      paymentMode,
      category,
      date: new Date().toISOString()
    });

    // Reset basics
    setName('');
    setAmount('');
    
    // Quick success animation
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-slate-700/50 shadow-2xl relative overflow-hidden">
      {/* Success overlay */}
      {showSuccess && (
        <div className="absolute inset-0 bg-neon-green/20 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="w-16 h-16 rounded-full bg-neon-green text-slate-900 flex items-center justify-center mb-2 shadow-[0_0_20px_var(--color-neon-green-glow)]">
             <Plus className="w-8 h-8" />
           </div>
           <p className="font-bold text-white text-lg">Logged successfully!</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Log Expense</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-slate-400 text-sm mb-2">Item Name</label>
          <input 
            type="text" 
            placeholder="e.g., Water Cans, Milk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
            list="whitelist-items"
            required
          />
          <datalist id="whitelist-items">
            {whitelist.map(item => <option key={item} value={item} />)}
          </datalist>
          <div className="flex flex-wrap gap-2 mt-3">
             {whitelist.slice(0, 4).map(item => (
                <button 
                  key={item}
                  type="button"
                  onClick={() => setName(item)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition-colors border border-slate-700"
                >
                  {item}
                </button>
             ))}
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-sm mb-2">Amount (₹)</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-slate-500 font-bold">₹</span>
            <input 
              type="number" 
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-white font-semibold text-lg focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-sm mb-2">Payment Mode</label>
          <div className="flex gap-3 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-700/50">
            <button
              type="button"
              onClick={() => setPaymentMode('Digital')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                paymentMode === 'Digital' 
                  ? 'bg-slate-800 text-neon-purple shadow-sm border border-neon-purple/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Digital UPI
            </button>
            <button
              type="button"
              onClick={() => setPaymentMode('Cash')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                paymentMode === 'Cash' 
                  ? 'bg-slate-800 text-neon-green shadow-sm border border-neon-green/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Physical Cash
            </button>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-slate-100 hover:bg-white text-slate-900 font-bold py-4 rounded-xl mt-4 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
        >
          Add to Ledger
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
