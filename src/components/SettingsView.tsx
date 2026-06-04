import { useState } from 'react';
import { Bot, Bell, Shield, Sliders, Globe, Key, Save, RefreshCw } from 'lucide-react';
import { agents } from '../data/mockData';

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
    style={{ background: checked ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)' : 'rgba(255,255,255,0.1)' }}
  >
    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${checked ? 'left-5' : 'left-0.5'}`} />
  </button>
);

const Slider = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <input
    type="range" min={0} max={100} value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
    style={{ background: `linear-gradient(90deg, #8b5cf6 ${value}%, rgba(255,255,255,0.1) ${value}%)` }}
  />
);

export default function SettingsView() {
  const [settings, setSettings] = useState({
    autoScreening: true,
    biasDetection: true,
    autoOutreach: true,
    continuousLearning: true,
    notifications: true,
    weeklyReports: true,
    candidateAlerts: true,
    slackIntegration: false,
    atsIntegration: true,
    gdprMode: true,
    anonymization: false,
  });

  const [thresholds, setThresholds] = useState({
    minAiScore: 70,
    cultureFitMin: 65,
    technicalMin: 75,
    maxCandidatesPerRole: 50,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(148,163,184,0.6)' }}>
            Configure AI agents, thresholds, and integrations
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Agent Controls */}
        <div className="col-span-2 space-y-4">
          {/* AI Automation */}
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-violet-400" />
              <h3 className="text-base font-semibold text-white">AI Automation Controls</h3>
            </div>
            <div className="space-y-4">
              {[
                { key: 'autoScreening' as const, label: 'Automatic Resume Screening', desc: 'Iris automatically screens all incoming applications using NLP analysis' },
                { key: 'biasDetection' as const, label: 'Bias Detection & Mitigation', desc: 'AI flags and removes potentially biased language from evaluations' },
                { key: 'autoOutreach' as const, label: 'Automated Candidate Outreach', desc: 'Scout sends personalized outreach to identified passive candidates' },
                { key: 'continuousLearning' as const, label: 'Continuous Learning Mode', desc: 'Agents learn from hiring decisions to improve future recommendations' },
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between gap-4 pb-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{item.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>{item.desc}</div>
                  </div>
                  <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </div>

          {/* Scoring Thresholds */}
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-semibold text-white">Scoring Thresholds</h3>
            </div>
            <div className="space-y-4">
              {[
                { key: 'minAiScore' as const, label: 'Minimum AI Score to Advance', color: '#8b5cf6' },
                { key: 'cultureFitMin' as const, label: 'Culture Fit Minimum', color: '#10b981' },
                { key: 'technicalMin' as const, label: 'Technical Score Minimum', color: '#06b6d4' },
                { key: 'maxCandidatesPerRole' as const, label: 'Max Candidates per Role', color: '#f59e0b' },
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-300">{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>{thresholds[item.key]}</span>
                  </div>
                  <Slider value={thresholds[item.key]} onChange={(v) => setThresholds(prev => ({ ...prev, [item.key]: v }))} />
                </div>
              ))}
            </div>
          </div>

          {/* Per-Agent Settings */}
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">Individual Agent Config</h3>
              </div>
              <span className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>Click to configure</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {agents.map((agent) => (
                <div key={agent.id} className="rounded-xl p-3 cursor-pointer transition-colors hover:border-violet-500/40"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">{agent.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-white">{agent.name}</div>
                      <div className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>{agent.role}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-semibold ${
                    agent.status === 'active' ? 'text-emerald-400' :
                    agent.status === 'processing' ? 'text-amber-400' : 'text-slate-500'
                  }`}>
                    ● {agent.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Notifications */}
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-semibold text-white">Notifications</h3>
            </div>
            <div className="space-y-3">
              {[
                { key: 'notifications' as const, label: 'Real-time alerts' },
                { key: 'weeklyReports' as const, label: 'Weekly reports' },
                { key: 'candidateAlerts' as const, label: 'Candidate status changes' },
                { key: 'slackIntegration' as const, label: 'Slack integration' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-1">
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-semibold text-white">Integrations</h3>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Greenhouse ATS', connected: true, color: '#10b981' },
                { name: 'LinkedIn Recruiter', connected: true, color: '#10b981' },
                { name: 'Slack', connected: false, color: '#f59e0b' },
                { name: 'Google Calendar', connected: true, color: '#10b981' },
                { name: 'Workday', connected: false, color: 'rgba(148,163,184,0.3)' },
              ].map((int) => (
                <div key={int.name} className="flex items-center justify-between py-2 px-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-sm text-slate-300">{int.name}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      color: int.connected ? '#10b981' : 'rgba(148,163,184,0.5)',
                      background: int.connected ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
                    }}>
                    {int.connected ? 'Connected' : 'Connect'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(15,17,32,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-pink-400" />
              <h3 className="text-base font-semibold text-white">Compliance & Privacy</h3>
            </div>
            <div className="space-y-3">
              {[
                { key: 'gdprMode' as const, label: 'GDPR Compliance Mode' },
                { key: 'anonymization' as const, label: 'Candidate Anonymization' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Key className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-violet-400">API Access</span>
              </div>
              <div className="font-mono text-xs text-slate-400 truncate">sk-recruit-ai-••••••••••••4f2a</div>
              <button className="mt-2 text-xs text-violet-400 font-semibold hover:text-violet-300 transition-colors">
                Regenerate Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
