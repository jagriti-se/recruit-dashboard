import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Users,
  Briefcase,
  BarChart3,
  Settings,
  ChevronRight,
  Zap,
  Bell,
  LogOut,
} from 'lucide-react';

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Agents', icon: Bot, badge: 4 },
  { id: 'candidates', label: 'Candidates', icon: Users, badge: 8 },
  { id: 'jobs', label: 'Job Openings', icon: Briefcase },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40"
      style={{ background: 'rgba(9,11,24,0.97)', borderRight: '1px solid rgba(139,92,246,0.15)' }}>
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b" style={{ borderColor: 'rgba(139,92,246,0.15)' }}>
        <div className="relative">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2"
            style={{ borderColor: 'rgba(9,11,24,0.97)' }} />
        </div>
        <div>
          <span className="text-white font-bold text-lg tracking-tight">RecruitAI</span>
          <div className="text-xs" style={{ color: 'rgba(139,92,246,0.8)' }}>Multi-Agent Platform</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(148,163,184,0.5)' }}>
            Main Menu
          </span>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative"
              style={{
                background: isActive ? 'rgba(139,92,246,0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent',
              }}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                  style={{ background: 'linear-gradient(180deg, #8b5cf6, #06b6d4)' }} />
              )}
              <Icon
                className="w-5 h-5 flex-shrink-0 transition-colors"
                style={{ color: isActive ? '#8b5cf6' : 'rgba(148,163,184,0.7)' }}
              />
              <span
                className="flex-1 text-left text-sm font-medium transition-colors"
                style={{ color: isActive ? '#fff' : 'rgba(148,163,184,0.8)' }}
              >
                {item.label}
              </span>
              {item.badge && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(139,92,246,0.25)', color: '#a78bfa' }}>
                  {item.badge}
                </span>
              )}
              {isActive && (
                <ChevronRight className="w-4 h-4" style={{ color: '#8b5cf6' }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Agent Status Summary */}
      <div className="px-3 pb-3">
        <div className="rounded-xl p-3" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-white">Agent Network Online</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'Active', count: 3, color: '#10b981' },
              { label: 'Processing', count: 2, color: '#f59e0b' },
              { label: 'Idle', count: 1, color: 'rgba(148,163,184,0.5)' },
            ].map((stat) => (
              <div key={stat.label} className="text-center rounded-lg py-1.5"
                style={{ background: 'rgba(0,0,0,0.3)' }}>
                <div className="text-sm font-bold" style={{ color: stat.color }}>{stat.count}</div>
                <div className="text-xs" style={{ color: 'rgba(148,163,184,0.6)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(139,92,246,0.15)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
            HR
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">Alex Johnson</div>
            <div className="text-xs truncate" style={{ color: 'rgba(148,163,184,0.6)' }}>Head of Talent</div>
          </div>
          <div className="flex gap-1">
            <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5">
              <Bell className="w-4 h-4" style={{ color: 'rgba(148,163,184,0.6)' }} />
            </button>
            <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5">
              <LogOut className="w-4 h-4" style={{ color: 'rgba(148,163,184,0.6)' }} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
