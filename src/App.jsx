import React, { useState } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import RecentLogs from './components/RecentLogs';
import CommonKitty from './components/CommonKitty';
import MonthlySync from './components/MonthlySync';
import { Home, PlusCircle, List, ShieldCheck, RefreshCw } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <Dashboard />
            <RecentLogs />
          </div>
        );
      case 'add':
        return <ExpenseForm />;
      case 'kitty':
        return <CommonKitty />;
      case 'sync':
        return <MonthlySync />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 selection:bg-neon-purple selection:text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/20 blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-green/10 blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-slate-800/50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-green to-neon-purple flex items-center justify-center p-[2px]">
             <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-neon-green to-neon-purple font-black text-sm">RP</span>
             </div>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">RoomiePocket</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-5 py-6 max-w-md mx-auto relative z-10 transition-all duration-300">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 w-[90%] left-[5%] max-w-md mx-auto z-50 glass-card rounded-3xl border border-slate-700/50 px-6 py-4 flex justify-between items-center shadow-2xl">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-white scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium hidden sm:block">Home</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('add')}
          className={`flex flex-col items-center justify-center transition-all ${activeTab === 'add' ? 'scale-110' : ''}`}
        >
          <div className={`rounded-full p-3 shadow-lg ${activeTab === 'add' ? 'bg-neon-purple text-slate-950 shadow-[0_0_15px_var(--color-neon-purple-glow)]' : 'bg-slate-800 text-neon-purple'}`}>
             <PlusCircle className="w-6 h-6" />
          </div>
        </button>

        <button 
          onClick={() => setActiveTab('kitty')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'kitty' ? 'text-white scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <ShieldCheck className="w-6 h-6" />
          <span className="text-[10px] font-medium hidden sm:block">Kitty</span>
        </button>

        <button 
          onClick={() => setActiveTab('sync')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'sync' ? 'text-white scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <RefreshCw className="w-6 h-6" />
          <span className="text-[10px] font-medium hidden sm:block">Sync</span>
        </button>
      </nav>
    </div>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}

export default App;
