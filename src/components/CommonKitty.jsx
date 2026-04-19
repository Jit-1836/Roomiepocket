import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { ShieldCheck, Plus, X } from 'lucide-react';

const CommonKitty = () => {
  const { whitelist, addToWhitelist, removeFromWhitelist } = useExpenses();
  const [newItem, setNewItem] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      addToWhitelist(newItem.trim());
      setNewItem('');
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-slate-700/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Common Kitty Rules</h2>
          <p className="text-xs text-slate-400">Approved items for shared spending</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {whitelist.map((item) => (
          <div 
            key={item} 
            className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/50 group"
          >
            <span className="text-sm font-medium text-slate-300">{item}</span>
            <button 
              onClick={() => removeFromWhitelist(item)}
              className="text-slate-500 hover:text-red-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input 
          type="text" 
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New approved item..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button 
          type="submit"
          disabled={!newItem.trim()}
          className="bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50 text-blue-400 p-2.5 rounded-xl border border-blue-500/30 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default CommonKitty;
