import React from 'react';
import {
  Users, Bot, Clock, CheckCircle,
  ArrowUp, ArrowDown, Zap, Activity
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { agents, agentLogs, hiringTrendData, pipelineData, candidates } from '../data/mockData';

const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  trend,
  trendUp,
  color,
  bgColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  trend: string;
  trendUp: boolean;
  color: string;
  bgColor: string;
}) => (
  <div className="rounded-2xl p-5 flex flex-col gap-3"
    style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
    <div className="flex items-start justify-between">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: bgColor }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
        {trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
        {trend}
      </div>
    </div>
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm mt-0.5" style={{ color: 'rgba(148,163,184,0.7)' }}>{label}</div>
    </div>
    <div className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>{sub}</div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl p-3 shadow-xl"
        style={{ background: 'rgba(15,17,32,0.95)', border: '1px solid rgba(139,92,246,0.3)' }}>
        <p className="text-xs text-slate-400 mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const activeAgents = agents.filter(a => a.status === 'active' || a.status === 'processing').length;
  const totalCandidates = candidates.length;
  const hired = candidates.filter(c => c.status === 'hired').length;
  void candidates.filter(c => c.status === 'shortlisted').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Command Center</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(148,163,184,0.6)' }}>
            All agents operational · Real-time recruitment intelligence
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Live · Updated now
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={Bot} label="Active AI Agents" value={`${activeAgents}/6`}
          sub="4 agents processing tasks" trend="100%" trendUp={true}
          color="#8b5cf6" bgColor="rgba(139,92,246,0.15)"
        />
        <StatCard
          icon={Users} label="Total Candidates" value={String(totalCandidates)}
          sub="Across 5 open positions" trend="+23%" trendUp={true}
          color="#06b6d4" bgColor="rgba(6,182,212,0.15)"
        />
        <StatCard
          icon={CheckCircle} label="Hires This Month" value={String(hired)}
          sub="Avg. time-to-hire: 12 days" trend="+40%" trendUp={true}
          color="#10b981" bgColor="rgba(16,185,129,0.15)"
        />
        <StatCard
          icon={Clock} label="Avg. Screening Time" value="4.2h"
          sub="Previously 3.2 days" trend="-87%" trendUp={true}
          color="#f59e0b" bgColor="rgba(245,158,11,0.15)"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Hiring Trend Chart */}
        <div className="col-span-2 rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-white">Hiring Pipeline Trend</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>Sourced vs Hired — Last 6 months</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                <span className="text-xs text-slate-400">Sourced</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400">Hired</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hiringTrendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sourcedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="hiredGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="sourced" name="Sourced" stroke="#8b5cf6" strokeWidth={2} fill="url(#sourcedGrad)" />
              <Area type="monotone" dataKey="hired" name="Hired" stroke="#10b981" strokeWidth={2} fill="url(#hiredGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline Funnel */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Recruitment Funnel</h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>All active roles</p>
          </div>
          <div className="space-y-2">
            {pipelineData.map((stage) => (
              <div key={stage.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-slate-400">{stage.name}</span>
                  <span className="text-xs font-bold text-white">{stage.value}</span>
                </div>
                <div className="h-5 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full rounded-lg transition-all duration-700"
                    style={{
                      width: `${(stage.value / pipelineData[0].value) * 100}%`,
                      background: `linear-gradient(90deg, ${stage.fill}cc, ${stage.fill})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex justify-between text-xs">
              <span style={{ color: 'rgba(148,163,184,0.5)' }}>Conversion rate</span>
              <span className="text-emerald-400 font-semibold">1.6%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Agent Activity Feed */}
        <div className="col-span-2 rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-violet-400" />
              <h3 className="text-base font-semibold text-white">Live Agent Activity</h3>
            </div>
            <div className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)' }}>
              Real-time
            </div>
          </div>
          <div className="space-y-2">
            {agentLogs.slice(0, 6).map((log) => {
              const statusColor = log.status === 'success' ? '#10b981' : log.status === 'warning' ? '#f59e0b' : log.status === 'error' ? '#ef4444' : '#06b6d4';
                  void agents.find(a => a.id === log.agentId);
              return (
                <div key={log.id} className="flex items-center gap-3 py-2 px-3 rounded-xl transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: statusColor }} />
                  <span className="text-xs font-semibold w-14 flex-shrink-0" style={{ color: statusColor.replace('#', '') === '10b981' ? '#10b981' : statusColor }}>
                    {log.agentName}
                  </span>
                  <span className="text-xs flex-1 text-slate-300">{log.action}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa' }}>
                    {log.target}
                  </span>
                  <span className="text-xs flex-shrink-0" style={{ color: 'rgba(148,163,184,0.4)' }}>{log.timestamp}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Status */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-violet-400" />
            <h3 className="text-base font-semibold text-white">Agent Status</h3>
          </div>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: agent.bgColor, border: `1px solid ${agent.borderColor.replace('border-', '')}` }}>
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{agent.name}</span>
                    <span className={`text-xs font-semibold ${
                      agent.status === 'active' ? 'text-emerald-400' :
                      agent.status === 'processing' ? 'text-amber-400' :
                      agent.status === 'idle' ? 'text-slate-500' : 'text-red-400'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>{agent.role}</div>
                  {(agent.status === 'active' || agent.status === 'processing') && (
                    <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: agent.status === 'active' ? '70%' : '45%',
                          background: agent.status === 'active' ? '#10b981' : '#f59e0b',
                          animation: 'pulse 2s infinite',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
