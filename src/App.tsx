import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AgentsView from './components/AgentsView';
import CandidatesView from './components/CandidatesView';
import JobsView from './components/JobsView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import { Bell, Search, Zap } from 'lucide-react';

type View = 'dashboard' | 'agents' | 'candidates' | 'jobs' | 'analytics' | 'settings';

const notifications = [
  { id: 1, text: 'Iris completed screening 14 applications', time: '2m ago', type: 'success' },
  { id: 2, text: 'New top candidate found: Priya Sharma (94 AI Score)', time: '8m ago', type: 'info' },
  { id: 3, text: 'Interview scheduled: Marcus Chen — Jan 20, 2PM', time: '15m ago', type: 'success' },
];

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'agents': return <AgentsView />;
      case 'candidates': return <CandidatesView />;
      case 'jobs': return <JobsView />;
      case 'analytics': return <AnalyticsView />;
      case 'settings': return <SettingsView />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#080a18', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-64 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-3"
          style={{ background: 'radial-gradient(circle, #10b981, transparent)', transform: 'translate(-50%, -50%)' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
      </div>

      <Sidebar activeView={activeView} onNavigate={(view) => setActiveView(view as View)} />

      {/* Main Content */}
      <main className="ml-64 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
          style={{
            background: 'rgba(8,10,24,0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search candidates, jobs, agents..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-sm text-white placeholder-slate-600 outline-none focus:ring-1 focus:ring-violet-500/50 transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Live AI Status Ticker */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
              <Zap className="w-3.5 h-3.5 text-violet-400" />
              <span style={{ color: 'rgba(167,139,250,0.8)' }}>
                <span className="font-semibold text-violet-300">4 agents</span> actively processing
              </span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl transition-colors hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  style={{ background: 'rgba(15,17,32,0.98)', border: '1px solid rgba(139,92,246,0.3)' }}>
                  <div className="px-4 py-3 flex items-center justify-between"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="text-sm font-semibold text-white">Notifications</span>
                    <span className="text-xs text-violet-400 cursor-pointer">Mark all read</span>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} className="px-4 py-3 transition-colors hover:bg-white/5"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div className="flex items-start gap-2">
                        <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.type === 'success' ? 'bg-emerald-400' : 'bg-violet-400'}`} />
                        <div>
                          <p className="text-xs text-slate-200">{n.text}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.4)' }}>{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
              AJ
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div
          className="flex-1 px-8 py-7"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {renderView()}
        </div>
      </main>

      {/* Click-away overlay for notifications */}
      {showNotifications && (
        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
      )}

      {/* Global CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; }
        
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(139,92,246,0.5); }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid rgba(15,17,32,0.9);
          box-shadow: 0 0 8px rgba(139,92,246,0.5);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
