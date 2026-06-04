import { useState } from 'react';
import { Play, Pause, RefreshCw, Settings, Cpu, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { agents, agentLogs } from '../data/mockData';

export default function AgentsView() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Agent Network</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(148,163,184,0.6)' }}>
            Configure and monitor your specialized recruitment agents
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
          <RefreshCw className="w-4 h-4" />
          Sync All Agents
        </button>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-3 gap-4">
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className="text-left rounded-2xl p-5 transition-all duration-200 relative overflow-hidden group"
            style={{
              background: selectedAgent.id === agent.id ? 'rgba(139,92,246,0.12)' : 'rgba(15,17,32,0.9)',
              border: selectedAgent.id === agent.id ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Glow effect */}
            {selectedAgent.id === agent.id && (
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top left, #8b5cf6, transparent 60%)' }} />
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: agent.bgColor, border: `1px solid ${agent.borderColor.replace('border-', '').replace('-', '/')}` }}>
                  {agent.icon}
                </div>
                <div>
                  <div className="text-base font-bold text-white">{agent.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.6)' }}>{agent.role}</div>
                </div>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                agent.status === 'active' ? 'text-emerald-400 bg-emerald-400/10' :
                agent.status === 'processing' ? 'text-amber-400 bg-amber-400/10' :
                agent.status === 'idle' ? 'text-slate-500 bg-slate-500/10' : 'text-red-400 bg-red-400/10'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  agent.status === 'active' ? 'bg-emerald-400 animate-pulse' :
                  agent.status === 'processing' ? 'bg-amber-400 animate-pulse' :
                  agent.status === 'idle' ? 'bg-slate-500' : 'bg-red-400'
                }`} />
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="text-lg font-bold text-white">{agent.tasksCompleted.toLocaleString()}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>Tasks Done</div>
              </div>
              <div className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="text-lg font-bold" style={{ color: agent.color.replace('text-', '').includes('violet') ? '#8b5cf6' : agent.color.replace('text-', '').includes('cyan') ? '#06b6d4' : agent.color.replace('text-', '').includes('emerald') ? '#10b981' : agent.color.replace('text-', '').includes('amber') ? '#f59e0b' : agent.color.replace('text-', '').includes('blue') ? '#3b82f6' : '#ec4899' }}>{agent.accuracy}%</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>Accuracy</div>
              </div>
            </div>

            {/* Current Task */}
            {agent.currentTask ? (
              <div className="rounded-lg px-3 py-2 text-xs" style={{ background: 'rgba(139,92,246,0.08)', color: 'rgba(167,139,250,0.9)' }}>
                ⚡ {agent.currentTask}
              </div>
            ) : (
              <div className="rounded-lg px-3 py-2 text-xs" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(148,163,184,0.4)' }}>
                — Awaiting task assignment
              </div>
            )}

            {/* Accuracy Bar */}
            <div className="mt-3">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div className="h-full rounded-full" style={{
                  width: `${agent.accuracy}%`,
                  background: agent.status === 'active' ? 'linear-gradient(90deg, #10b981, #06b6d4)' :
                    agent.status === 'processing' ? 'linear-gradient(90deg, #f59e0b, #ec4899)' :
                    'rgba(148,163,184,0.3)',
                }} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Agent Detail Panel */}
      <div className="grid grid-cols-3 gap-4">
        {/* Detail */}
        <div className="col-span-2 rounded-2xl p-6"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: selectedAgent.bgColor }}>
                {selectedAgent.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{selectedAgent.name}</h2>
                <p className="text-sm" style={{ color: 'rgba(148,163,184,0.6)' }}>{selectedAgent.role}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)' }}>
                    Agent v2.1
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    selectedAgent.status === 'active' ? 'text-emerald-400 bg-emerald-400/10' :
                    selectedAgent.status === 'processing' ? 'text-amber-400 bg-amber-400/10' :
                    'text-slate-400 bg-slate-400/10'
                  }`}>
                    {selectedAgent.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl transition-colors hover:bg-white/5">
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)' }}>
                {selectedAgent.status === 'idle' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {selectedAgent.status === 'idle' ? 'Activate' : 'Pause'}
              </button>
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(148,163,184,0.7)' }}>
            {selectedAgent.description}
          </p>

          <div className="mb-5">
            <h4 className="text-sm font-semibold text-white mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {selectedAgent.specialties.map((s) => (
                <span key={s} className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: selectedAgent.bgColor, color: 'rgba(255,255,255,0.8)', border: `1px solid ${selectedAgent.borderColor.replace('border-', '').replace('-', '/')}` }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Tasks Completed', value: selectedAgent.tasksCompleted.toLocaleString(), icon: CheckCircle2, color: '#10b981' },
              { label: 'Accuracy Rate', value: `${selectedAgent.accuracy}%`, icon: Target, color: '#8b5cf6' },
              { label: 'Avg. Response', value: '1.2s', icon: Cpu, color: '#06b6d4' },
              { label: 'Uptime', value: '99.9%', icon: AlertCircle, color: '#f59e0b' },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: m.color }} />
                  <div className="text-lg font-bold text-white">{m.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>{m.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Logs */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="text-sm font-semibold text-white mb-4">Recent Actions</h3>
          <div className="space-y-2">
            {agentLogs
              .filter(l => l.agentId === selectedAgent.id)
              .concat(agentLogs.filter(l => l.agentId !== selectedAgent.id))
              .slice(0, 7)
              .map((log) => {
                const isOwn = log.agentId === selectedAgent.id;
                return (
                  <div key={log.id} className="rounded-xl p-3"
                    style={{
                      background: isOwn ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.03)',
                      border: isOwn ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(255,255,255,0.04)',
                    }}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        log.status === 'success' ? 'bg-emerald-400' :
                        log.status === 'warning' ? 'bg-amber-400' : 'bg-cyan-400'
                      }`} />
                      <span className="text-xs font-semibold" style={{ color: isOwn ? '#a78bfa' : 'rgba(148,163,184,0.6)' }}>
                        {log.agentName}
                      </span>
                      <span className="text-xs ml-auto" style={{ color: 'rgba(148,163,184,0.4)' }}>{log.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300">{log.action}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>→ {log.target}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
