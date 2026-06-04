import { useState } from 'react';
import { Search, MapPin, Clock, ChevronRight, Brain, X, CheckCircle } from 'lucide-react';
import { candidates, Candidate, CandidateStatus } from '../data/mockData';

const statusConfig: Record<CandidateStatus, { label: string; color: string; bg: string }> = {
  screening: { label: 'Screening', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
  shortlisted: { label: 'Shortlisted', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  interviewing: { label: 'Interviewing', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  offered: { label: 'Offered', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  rejected: { label: 'Rejected', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  hired: { label: 'Hired ✓', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
};

const avatarColors = [
  'linear-gradient(135deg, #8b5cf6, #06b6d4)',
  'linear-gradient(135deg, #06b6d4, #10b981)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #10b981, #3b82f6)',
  'linear-gradient(135deg, #ec4899, #8b5cf6)',
  'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  'linear-gradient(135deg, #f59e0b, #10b981)',
  'linear-gradient(135deg, #ef4444, #ec4899)',
];

function ScoreRing({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
          <circle
            cx="28" cy="28" r={radius} fill="none"
            stroke={color} strokeWidth="4"
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white">{value}</span>
        </div>
      </div>
      <span className="text-xs text-center" style={{ color: 'rgba(148,163,184,0.6)' }}>{label}</span>
    </div>
  );
}

export default function CandidatesView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CandidateStatus | 'all'>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const filtered = candidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Candidate Pipeline</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(148,163,184,0.6)' }}>
            AI-evaluated candidates across all open roles
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
            style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span className="text-slate-400">Total:</span>
            <span className="text-white font-bold">{candidates.length}</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search candidates, skills, roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-violet-500/50"
            style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>

        <div className="flex gap-1.5">
          {(['all', 'screening', 'shortlisted', 'interviewing', 'offered', 'hired', 'rejected'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: statusFilter === s ? (s === 'all' ? 'rgba(139,92,246,0.2)' : statusConfig[s as CandidateStatus]?.bg || 'rgba(139,92,246,0.2)') : 'rgba(255,255,255,0.04)',
                color: statusFilter === s ? (s === 'all' ? '#a78bfa' : statusConfig[s as CandidateStatus]?.color || '#a78bfa') : 'rgba(148,163,184,0.6)',
                border: statusFilter === s ? `1px solid ${s === 'all' ? 'rgba(139,92,246,0.4)' : (statusConfig[s as CandidateStatus]?.color || '#8b5cf6') + '44'}` : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Candidate Cards */}
        <div className="flex-1 space-y-3">
          {filtered.map((candidate, idx) => {
            const sc = statusConfig[candidate.status];
            const isSelected = selectedCandidate?.id === candidate.id;
            return (
              <button
                key={candidate.id}
                onClick={() => setSelectedCandidate(isSelected ? null : candidate)}
                className="w-full text-left rounded-2xl p-4 transition-all duration-200"
                style={{
                  background: isSelected ? 'rgba(139,92,246,0.1)' : 'rgba(15,17,32,0.9)',
                  border: isSelected ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: avatarColors[idx % avatarColors.length] }}>
                    {candidate.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-white">{candidate.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: sc.bg, color: sc.color }}>
                        {sc.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm" style={{ color: 'rgba(148,163,184,0.7)' }}>{candidate.role}</span>
                      <span className="text-xs" style={{ color: 'rgba(148,163,184,0.4)' }}>·</span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>
                        <MapPin className="w-3 h-3" />{candidate.location}
                      </span>
                      <span className="text-xs" style={{ color: 'rgba(148,163,184,0.4)' }}>·</span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>
                        <Clock className="w-3 h-3" />{candidate.experience}y exp
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {candidate.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="text-xs px-2 py-0.5 rounded-lg"
                          style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}>
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded-lg" style={{ color: 'rgba(148,163,184,0.4)', background: 'rgba(255,255,255,0.03)' }}>
                          +{candidate.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* AI Score */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <svg className="w-14 h-14 -rotate-90 absolute" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
                        <circle cx="28" cy="28" r="22" fill="none"
                          stroke={candidate.aiScore >= 90 ? '#10b981' : candidate.aiScore >= 75 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="4"
                          strokeDasharray={`${(candidate.aiScore / 100) * (2 * Math.PI * 22)} ${2 * Math.PI * 22}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-sm font-bold text-white z-10">{candidate.aiScore}</span>
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>AI Score</span>
                  </div>

                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(148,163,184,0.3)', transform: isSelected ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>

                {/* Expanded Detail */}
                {isSelected && (
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
                          <Brain className="w-3.5 h-3.5 text-violet-400" /> AI Assessment Scores
                        </h4>
                        <div className="flex gap-4 justify-start">
                          <ScoreRing value={candidate.technicalScore} label="Technical" color="#8b5cf6" />
                          <ScoreRing value={candidate.cultureFit} label="Culture Fit" color="#10b981" />
                          <ScoreRing value={candidate.communicationScore} label="Communication" color="#06b6d4" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white mb-2">Agent Notes</h4>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(148,163,184,0.7)' }}>
                          {candidate.agentNotes}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>
                            Source: <span className="text-slate-300">{candidate.source}</span>
                          </div>
                          <div className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>
                            Salary: <span className="text-slate-300">{candidate.salary}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                            style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)' }}>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Advance
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
                            <X className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16 rounded-2xl"
              style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-white font-semibold">No candidates found</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(148,163,184,0.5)' }}>Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
