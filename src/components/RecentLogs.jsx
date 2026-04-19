import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Trash2, Smartphone, Banknote } from 'lucide-react';

const RecentLogs = () => {
  const { expenses, removeExpense } = useExpenses();

  if (expenses.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-8 border border-slate-700/50 text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 border border-slate-700">
          <Banknote className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-white font-medium mb-1">No expenses yet</h3>
        <p className="text-slate-400 text-sm">Add your first expense above to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end mb-4 px-2">
        <h2 className="text-xl font-bold text-white">Recent Logs</h2>
        <span className="text-xs text-slate-400 font-medium">{expenses.length} entries</span>
      </div>
      
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div 
            key={expense.id} 
            className="glass p-4 rounded-2xl flex items-center justify-between group transition-all hover:bg-slate-800/80 border border-slate-700/30"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                 expense.paymentMode === 'Digital' 
                  ? 'bg-neon-purple/10 border-neon-purple/30 text-neon-purple' 
                  : 'bg-neon-green/10 border-neon-green/30 text-neon-green'
              }`}>
                {expense.paymentMode === 'Digital' ? <Smartphone className="w-6 h-6"/> : <Banknote className="w-6 h-6"/>}
              </div>
              
              <div>
                <h3 className="text-slate-100 font-semibold">{expense.name}</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <span>{new Date(expense.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span className={expense.paymentMode === 'Digital' ? 'text-neon-purple/70' : 'text-neon-green/70'}>
                    {expense.paymentMode}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-white pr-2">
                ₹{expense.amount}
              </span>
              <button 
                onClick={() => removeExpense(expense.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 hover:text-red-400 text-slate-500 rounded-lg"
                aria-label="Delete expense"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLogs;
