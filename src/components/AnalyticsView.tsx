import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line
} from 'recharts';
import { agentPerformanceData } from '../data/mockData';
import { TrendingUp, Award, Zap, Clock } from 'lucide-react';

const timeToHireData = [
  { stage: 'Sourcing', days: 1.2, fill: '#8b5cf6' },
  { stage: 'Screening', days: 0.3, fill: '#06b6d4' },
  { stage: 'Shortlist', days: 0.8, fill: '#10b981' },
  { stage: 'Interview', days: 4.5, fill: '#f59e0b' },
  { stage: 'Offer', days: 2.1, fill: '#3b82f6' },
  { stage: 'Accept', days: 3.3, fill: '#ec4899' },
];

const qualityData = [
  { month: 'Aug', retention: 88, performance: 82, satisfaction: 79 },
  { month: 'Sep', retention: 91, performance: 85, satisfaction: 83 },
  { month: 'Oct', retention: 89, performance: 88, satisfaction: 86 },
  { month: 'Nov', retention: 93, performance: 90, satisfaction: 88 },
  { month: 'Dec', retention: 95, performance: 92, satisfaction: 91 },
  { month: 'Jan', retention: 96, performance: 94, satisfaction: 93 },
];

const radarMetrics = [
  { subject: 'Speed', A: 95, fullMark: 100 },
  { subject: 'Accuracy', A: 97, fullMark: 100 },
  { subject: 'Coverage', A: 88, fullMark: 100 },
  { subject: 'Quality', A: 91, fullMark: 100 },
  { subject: 'Efficiency', A: 94, fullMark: 100 },
  { subject: 'Diversity', A: 85, fullMark: 100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl p-3 shadow-xl"
        style={{ background: 'rgba(15,17,32,0.95)', border: '1px solid rgba(139,92,246,0.3)' }}>
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color || entry.fill }}>
            {entry.name}: {entry.value}{entry.name === 'days' ? 'd' : entry.name !== 'tasks' ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Insights</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(148,163,184,0.6)' }}>
            AI-powered recruitment performance intelligence
          </p>
        </div>
        <div className="flex gap-2">
          {['7D', '30D', '90D', 'YTD'].map((p, i) => (
            <button key={p} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: i === 1 ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)',
                color: i === 1 ? '#a78bfa' : 'rgba(148,163,184,0.6)',
                border: i === 1 ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.06)',
              }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Avg. Time-to-Hire', value: '12.2 days', change: '-74%', sub: 'vs 48 days manual', icon: Clock, color: '#8b5cf6' },
          { label: 'Offer Acceptance Rate', value: '89%', change: '+12%', sub: 'Industry avg: 67%', icon: Award, color: '#10b981' },
          { label: 'AI Screening Accuracy', value: '96.4%', change: '+3.2%', sub: 'vs last quarter', icon: Zap, color: '#06b6d4' },
          { label: 'Cost per Hire', value: '$1,240', change: '-68%', sub: 'vs $3,900 traditional', icon: TrendingUp, color: '#f59e0b' },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-2xl p-5"
              style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${kpi.color}18` }}>
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-400/10">
                  {kpi.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{kpi.value}</div>
              <div className="text-sm mt-0.5" style={{ color: 'rgba(148,163,184,0.6)' }}>{kpi.label}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(148,163,184,0.4)' }}>{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        {/* Agent Performance */}
        <div className="col-span-2 rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Agent Task Volume & Accuracy</h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>All-time performance metrics per agent</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={agentPerformanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="tasks" name="tasks" fill="#8b5cf6" radius={[4, 4, 0, 0]} opacity={0.8} />
              <Bar yAxisId="right" dataKey="accuracy" name="accuracy" fill="#10b981" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-violet-500" />
              <span className="text-xs text-slate-400">Tasks (left axis)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              <span className="text-xs text-slate-400">Accuracy % (right axis)</span>
            </div>
          </div>
        </div>

        {/* Radar */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mb-2">
            <h3 className="text-base font-semibold text-white">Platform Health</h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>Overall AI performance score</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarMetrics}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }} />
              <Radar name="Score" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">91.7</div>
            <div className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>Overall AI Score</div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Quality of Hire */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Quality of Hire Trends</h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>Retention, performance & satisfaction scores</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={qualityData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[75, 100]} tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="retention" name="retention" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="performance" name="performance" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="satisfaction" name="satisfaction" stroke="#06b6d4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            {[{ l: 'Retention', c: '#10b981' }, { l: 'Performance', c: '#8b5cf6' }, { l: 'Satisfaction', c: '#06b6d4' }].map((item) => (
              <div key={item.l} className="flex items-center gap-1.5">
                <div className="w-2.5 h-0.5 rounded-full" style={{ background: item.c }} />
                <span className="text-xs text-slate-400">{item.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time to Hire Breakdown */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Time-to-Hire Breakdown</h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>Average days spent per pipeline stage</p>
          </div>
          <div className="space-y-3">
            {timeToHireData.map((stage) => (
              <div key={stage.stage}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-slate-400">{stage.stage}</span>
                  <span className="text-xs font-bold text-white">{stage.days}d</span>
                </div>
                <div className="h-5 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full rounded-lg flex items-center pl-2"
                    style={{
                      width: `${(stage.days / 5) * 100}%`,
                      background: `linear-gradient(90deg, ${stage.fill}99, ${stage.fill})`,
                    }}
                  >
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 flex justify-between items-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>Total avg. time-to-hire</span>
            <span className="text-base font-bold text-white">12.2 <span className="text-xs text-slate-400">days</span></span>
          </div>
        </div>
      </div>

      {/* Source & Diversity */}
      <div className="grid grid-cols-2 gap-4">
        {/* Source of Hire */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="text-base font-semibold text-white mb-4">Source of Hire</h3>
          <div className="space-y-3">
            {[
              { source: 'LinkedIn', pct: 42, count: 131, color: '#8b5cf6' },
              { source: 'GitHub / Open Source', pct: 22, count: 69, color: '#06b6d4' },
              { source: 'Referrals', pct: 18, count: 56, color: '#10b981' },
              { source: 'Job Boards', pct: 11, count: 34, color: '#f59e0b' },
              { source: 'Direct Apply', pct: 7, count: 22, color: '#ec4899' },
            ].map((s) => (
              <div key={s.source} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-xs text-slate-300 w-36 flex-shrink-0">{s.source}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
                <span className="text-xs font-semibold text-white w-8 text-right">{s.pct}%</span>
                <span className="text-xs w-8 text-right" style={{ color: 'rgba(148,163,184,0.4)' }}>{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diversity */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="text-base font-semibold text-white mb-4">Diversity & Inclusion Score</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Gender Balance', value: 52, target: 50, color: '#8b5cf6' },
              { label: 'Geographic Diversity', value: 78, target: 70, color: '#06b6d4' },
              { label: 'Experience Range', value: 85, target: 80, color: '#10b981' },
              { label: 'Educational Diversity', value: 71, target: 75, color: '#f59e0b' },
            ].map((d) => (
              <div key={d.label} className="rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-slate-400 leading-tight">{d.label}</span>
                  <span className="text-sm font-bold text-white">{d.value}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                </div>
                <div className="text-xs mt-1.5" style={{ color: d.value >= d.target ? '#10b981' : '#f59e0b' }}>
                  Target: {d.target}% {d.value >= d.target ? '✓' : '↑'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
