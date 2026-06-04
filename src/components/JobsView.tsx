import { useState } from 'react';
import { Briefcase, MapPin, Users, Bot, Plus, ChevronRight, TrendingUp, Calendar } from 'lucide-react';
import { jobs, agents, Job, JobStatus } from '../data/mockData';

const statusStyle: Record<JobStatus, { label: string; color: string; bg: string; border: string }> = {
  open: { label: 'Open', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
  paused: { label: 'Paused', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  closed: { label: 'Closed', color: 'rgba(148,163,184,0.5)', bg: 'rgba(148,163,184,0.05)', border: 'rgba(148,163,184,0.2)' },
};

export default function JobsView() {
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Job Openings</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(148,163,184,0.6)' }}>
            Manage positions and agent assignments
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
          <Plus className="w-4 h-4" />
          New Position
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Openings', value: jobs.length, color: '#8b5cf6', icon: Briefcase },
          { label: 'Active Roles', value: jobs.filter(j => j.status === 'open').length, color: '#10b981', icon: TrendingUp },
          { label: 'Total Applicants', value: jobs.reduce((a, j) => a + j.applicants, 0), color: '#06b6d4', icon: Users },
          { label: 'Shortlisted', value: jobs.reduce((a, j) => a + j.shortlisted, 0), color: '#f59e0b', icon: ChevronRight },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl p-4"
              style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}18` }}>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>{stat.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 gap-4">
        {/* Job List */}
        <div className="col-span-2 space-y-3">
          {jobs.map((job) => {
            const ss = statusStyle[job.status];
            const isSelected = selectedJob.id === job.id;
            const convRate = Math.round((job.shortlisted / job.applicants) * 100);
            return (
              <button
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="w-full text-left rounded-2xl p-4 transition-all duration-200"
                style={{
                  background: isSelected ? 'rgba(139,92,246,0.1)' : 'rgba(15,17,32,0.9)',
                  border: isSelected ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{job.title}</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>{job.department}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                    {ss.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs mb-3" style={{ color: 'rgba(148,163,184,0.5)' }}>
                  <MapPin className="w-3 h-3" />
                  <span>{job.location}</span>
                  <span>·</span>
                  <span>{job.type}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1" style={{ color: 'rgba(148,163,184,0.5)' }}>
                    <Users className="w-3 h-3" />
                    <span>{job.applicants} applied</span>
                  </div>
                  <div className="flex items-center gap-1 text-violet-400">
                    <Bot className="w-3 h-3" />
                    <span>{job.agentsAssigned.length} agents</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>{convRate}% conv.</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <div className="h-full rounded-full"
                    style={{
                      width: `${convRate}%`,
                      background: job.status === 'open' ? 'linear-gradient(90deg, #8b5cf6, #06b6d4)' :
                        job.status === 'paused' ? '#f59e0b' : 'rgba(148,163,184,0.3)',
                    }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Job Detail */}
        <div className="col-span-3 rounded-2xl p-6 h-fit"
          style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedJob.title}</h2>
              <div className="flex items-center gap-3 mt-2 text-sm" style={{ color: 'rgba(148,163,184,0.6)' }}>
                <span>{selectedJob.department}</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />{selectedJob.location}
                </div>
                <span>·</span>
                <span>{selectedJob.type}</span>
              </div>
            </div>
            <span className="text-sm font-bold text-violet-400">{selectedJob.salary}</span>
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(148,163,184,0.7)' }}>
            {selectedJob.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Total Applicants', value: selectedJob.applicants, icon: Users, color: '#8b5cf6' },
              { label: 'Shortlisted', value: selectedJob.shortlisted, icon: TrendingUp, color: '#10b981' },
              { label: 'Days to Deadline', value: 14, icon: Calendar, color: '#f59e0b' },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: m.color }} />
                  <div className="text-xl font-bold text-white">{m.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>{m.label}</div>
                </div>
              );
            })}
          </div>

          {/* Requirements */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-white mb-2.5">Requirements</h4>
            <div className="grid grid-cols-2 gap-2">
              {selectedJob.requirements.map((req) => (
                <div key={req} className="flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                  <span className="text-xs text-slate-300">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Agents */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-2.5">Assigned AI Agents</h4>
            <div className="flex flex-wrap gap-2">
              {selectedJob.agentsAssigned.map((agentId) => {
                const agent = agents.find(a => a.id === agentId);
                if (!agent) return null;
                return (
                  <div key={agentId} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ background: agent.bgColor, border: `1px solid rgba(255,255,255,0.1)` }}>
                    <span className="text-base">{agent.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-white">{agent.name}</div>
                      <div className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>{agent.role}</div>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ml-1 ${
                      agent.status === 'active' ? 'bg-emerald-400' :
                      agent.status === 'processing' ? 'bg-amber-400' : 'bg-slate-500'
                    }`} />
                  </div>
                );
              })}
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.15)', color: 'rgba(148,163,184,0.5)' }}>
                <Plus className="w-3.5 h-3.5" /> Add Agent
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
              View Candidates
            </button>
            <button className="px-4 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(148,163,184,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
              Edit Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
