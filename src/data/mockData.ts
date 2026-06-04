export type AgentStatus = 'active' | 'idle' | 'processing' | 'error';
export type CandidateStatus = 'screening' | 'shortlisted' | 'interviewing' | 'offered' | 'rejected' | 'hired';
export type JobStatus = 'open' | 'paused' | 'closed';

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  tasksCompleted: number;
  accuracy: number;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  currentTask?: string;
  specialties: string[];
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: number;
  location: string;
  skills: string[];
  status: CandidateStatus;
  aiScore: number;
  cultureFit: number;
  technicalScore: number;
  communicationScore: number;
  appliedDate: string;
  avatar: string;
  jobId: string;
  agentNotes: string;
  salary: string;
  source: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: JobStatus;
  applicants: number;
  shortlisted: number;
  posted: string;
  deadline: string;
  salary: string;
  agentsAssigned: string[];
  description: string;
  requirements: string[];
}

export interface AgentLog {
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  target: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info' | 'error';
}

export interface PipelineStage {
  name: string;
  count: number;
  color: string;
}

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Scout',
    role: 'Sourcing Agent',
    description: 'Autonomously searches job boards, LinkedIn, GitHub, and talent pools to identify and reach out to potential candidates.',
    status: 'active',
    tasksCompleted: 1248,
    accuracy: 94,
    icon: '🔍',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    currentTask: 'Scanning LinkedIn for Senior React Engineers',
    specialties: ['LinkedIn Sourcing', 'GitHub Analysis', 'Boolean Search', 'Passive Candidate Outreach'],
  },
  {
    id: 'agent-2',
    name: 'Iris',
    role: 'Resume Screener',
    description: 'Uses NLP and semantic analysis to parse, evaluate, and score resumes against job requirements with unbiased precision.',
    status: 'processing',
    tasksCompleted: 3871,
    accuracy: 97,
    icon: '📄',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    currentTask: 'Screening 14 new applications for ML Engineer role',
    specialties: ['NLP Parsing', 'Skill Extraction', 'Experience Validation', 'Bias Detection'],
  },
  {
    id: 'agent-3',
    name: 'Vera',
    role: 'Interview Coordinator',
    description: 'Schedules interviews, sends personalized communications, collects feedback, and ensures a smooth candidate experience.',
    status: 'active',
    tasksCompleted: 892,
    accuracy: 99,
    icon: '📅',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    currentTask: 'Scheduling panel interviews for 3 candidates',
    specialties: ['Calendar Sync', 'Email Automation', 'Feedback Collection', 'Candidate Experience'],
  },
  {
    id: 'agent-4',
    name: 'Nexus',
    role: 'Culture Fit Analyzer',
    description: 'Analyzes candidate personality, values, and communication style to assess team compatibility and cultural alignment.',
    status: 'idle',
    tasksCompleted: 567,
    accuracy: 88,
    icon: '🧠',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    currentTask: undefined,
    specialties: ['Personality Analysis', 'Team Dynamics', 'Value Alignment', 'Soft Skills Assessment'],
  },
  {
    id: 'agent-5',
    name: 'Rex',
    role: 'Background Verifier',
    description: 'Verifies work history, credentials, references, and conducts compliance checks to ensure candidate authenticity.',
    status: 'processing',
    tasksCompleted: 431,
    accuracy: 100,
    icon: '✅',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    currentTask: 'Verifying credentials for 2 shortlisted candidates',
    specialties: ['Employment Verification', 'Reference Checks', 'Credential Validation', 'Compliance Screening'],
  },
  {
    id: 'agent-6',
    name: 'Aria',
    role: 'Offer Negotiator',
    description: 'Analyzes market compensation data and assists in crafting competitive offer packages to maximize acceptance rates.',
    status: 'idle',
    tasksCompleted: 203,
    accuracy: 91,
    icon: '💼',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    currentTask: undefined,
    specialties: ['Market Benchmarking', 'Offer Structuring', 'Negotiation Support', 'Equity Analysis'],
  },
];

export const candidates: Candidate[] = [
  {
    id: 'c-001',
    name: 'Priya Sharma',
    role: 'Senior ML Engineer',
    experience: 6,
    location: 'San Francisco, CA',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'AWS'],
    status: 'shortlisted',
    aiScore: 94,
    cultureFit: 91,
    technicalScore: 96,
    communicationScore: 89,
    appliedDate: '2024-01-10',
    avatar: 'PS',
    jobId: 'j-001',
    agentNotes: 'Iris flagged as top candidate. Published 3 ML papers. Strong open-source contributions on GitHub.',
    salary: '$180k - $210k',
    source: 'LinkedIn',
  },
  {
    id: 'c-002',
    name: 'Marcus Chen',
    role: 'Senior React Engineer',
    experience: 7,
    location: 'Austin, TX',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    status: 'interviewing',
    aiScore: 91,
    cultureFit: 95,
    technicalScore: 93,
    communicationScore: 97,
    appliedDate: '2024-01-08',
    avatar: 'MC',
    jobId: 'j-002',
    agentNotes: 'Vera scheduled technical panel for Jan 20. Nexus rated top culture match this quarter.',
    salary: '$160k - $190k',
    source: 'GitHub',
  },
  {
    id: 'c-003',
    name: 'Elena Rodriguez',
    role: 'Product Manager',
    experience: 5,
    location: 'New York, NY',
    skills: ['Product Strategy', 'Agile', 'SQL', 'Figma', 'User Research'],
    status: 'screening',
    aiScore: 82,
    cultureFit: 88,
    technicalScore: 79,
    communicationScore: 93,
    appliedDate: '2024-01-12',
    avatar: 'ER',
    jobId: 'j-003',
    agentNotes: 'Iris currently processing resume. Early signals positive for PM role.',
    salary: '$130k - $160k',
    source: 'Referral',
  },
  {
    id: 'c-004',
    name: 'James Okafor',
    role: 'DevOps Engineer',
    experience: 8,
    location: 'Seattle, WA',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'Python'],
    status: 'offered',
    aiScore: 96,
    cultureFit: 87,
    technicalScore: 98,
    communicationScore: 85,
    appliedDate: '2024-01-05',
    avatar: 'JO',
    jobId: 'j-004',
    agentNotes: 'Rex completed all verifications. Aria prepared competitive offer. Awaiting response.',
    salary: '$170k - $200k',
    source: 'Stackoverflow',
  },
  {
    id: 'c-005',
    name: 'Aisha Patel',
    role: 'Senior ML Engineer',
    experience: 4,
    location: 'Remote',
    skills: ['Python', 'Scikit-learn', 'NLP', 'SQL', 'Docker'],
    status: 'shortlisted',
    aiScore: 87,
    cultureFit: 92,
    technicalScore: 88,
    communicationScore: 91,
    appliedDate: '2024-01-09',
    avatar: 'AP',
    jobId: 'j-001',
    agentNotes: 'Strong NLP background. Nexus noted excellent team alignment scores.',
    salary: '$150k - $180k',
    source: 'LinkedIn',
  },
  {
    id: 'c-006',
    name: 'David Kim',
    role: 'Full Stack Engineer',
    experience: 3,
    location: 'Chicago, IL',
    skills: ['Vue.js', 'Django', 'PostgreSQL', 'Redis', 'GCP'],
    status: 'rejected',
    aiScore: 61,
    cultureFit: 72,
    technicalScore: 65,
    communicationScore: 68,
    appliedDate: '2024-01-11',
    avatar: 'DK',
    jobId: 'j-002',
    agentNotes: 'Iris flagged skills mismatch for React-specific role. Insufficient TypeScript experience.',
    salary: '$110k - $130k',
    source: 'Indeed',
  },
  {
    id: 'c-007',
    name: 'Sofia Nguyen',
    role: 'Senior React Engineer',
    experience: 6,
    location: 'Los Angeles, CA',
    skills: ['React', 'Next.js', 'TypeScript', 'Redux', 'Node.js'],
    status: 'interviewing',
    aiScore: 89,
    cultureFit: 90,
    technicalScore: 91,
    communicationScore: 86,
    appliedDate: '2024-01-07',
    avatar: 'SN',
    jobId: 'j-002',
    agentNotes: 'Technical interview scheduled. Strong portfolio reviewed by Scout.',
    salary: '$155k - $185k',
    source: 'Portfolio Site',
  },
  {
    id: 'c-008',
    name: 'Raj Mehta',
    role: 'Data Scientist',
    experience: 5,
    location: 'Boston, MA',
    skills: ['Python', 'R', 'ML', 'Spark', 'Tableau'],
    status: 'hired',
    aiScore: 95,
    cultureFit: 94,
    technicalScore: 97,
    communicationScore: 92,
    appliedDate: '2023-12-20',
    avatar: 'RM',
    jobId: 'j-005',
    agentNotes: 'All agents signed off. Offer accepted. Onboarding Jan 29.',
    salary: '$145k - $175k',
    source: 'LinkedIn',
  },
];

export const jobs: Job[] = [
  {
    id: 'j-001',
    title: 'Senior ML Engineer',
    department: 'AI Research',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    status: 'open',
    applicants: 47,
    shortlisted: 5,
    posted: '2024-01-01',
    deadline: '2024-02-01',
    salary: '$180k - $220k',
    agentsAssigned: ['agent-1', 'agent-2', 'agent-4'],
    description: 'Build and scale machine learning systems for our core AI products.',
    requirements: ['5+ years ML experience', 'PyTorch/TensorFlow', 'MLOps experience', 'Python expert'],
  },
  {
    id: 'j-002',
    title: 'Senior React Engineer',
    department: 'Frontend Platform',
    location: 'Austin, TX / Hybrid',
    type: 'Full-time',
    status: 'open',
    applicants: 63,
    shortlisted: 8,
    posted: '2024-01-03',
    deadline: '2024-02-15',
    salary: '$160k - $195k',
    agentsAssigned: ['agent-1', 'agent-2', 'agent-3'],
    description: 'Lead frontend architecture for next-generation SaaS platform.',
    requirements: ['React + TypeScript', '6+ years frontend', 'System design', 'Team leadership'],
  },
  {
    id: 'j-003',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    status: 'open',
    applicants: 29,
    shortlisted: 3,
    posted: '2024-01-08',
    deadline: '2024-02-08',
    salary: '$130k - $165k',
    agentsAssigned: ['agent-2', 'agent-4'],
    description: 'Own the roadmap for our enterprise product line.',
    requirements: ['4+ years PM experience', 'B2B SaaS', 'Data-driven mindset', 'Cross-functional leadership'],
  },
  {
    id: 'j-004',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Seattle, WA / Remote',
    type: 'Full-time',
    status: 'paused',
    applicants: 38,
    shortlisted: 4,
    posted: '2023-12-20',
    deadline: '2024-01-31',
    salary: '$160k - $200k',
    agentsAssigned: ['agent-1', 'agent-2', 'agent-5'],
    description: 'Scale our cloud infrastructure to handle rapid growth.',
    requirements: ['Kubernetes expert', 'Terraform', 'AWS/GCP', 'Security focus'],
  },
  {
    id: 'j-005',
    title: 'Data Scientist',
    department: 'Analytics',
    location: 'Boston, MA',
    type: 'Full-time',
    status: 'closed',
    applicants: 52,
    shortlisted: 6,
    posted: '2023-12-01',
    deadline: '2024-01-15',
    salary: '$140k - $175k',
    agentsAssigned: ['agent-1', 'agent-2', 'agent-3', 'agent-5'],
    description: 'Drive data-driven insights across the organization.',
    requirements: ['Python/R', 'ML expertise', 'Communication skills', 'Business acumen'],
  },
];

export const agentLogs: AgentLog[] = [
  { id: 'log-1', agentId: 'agent-1', agentName: 'Scout', action: 'Identified 3 passive candidates', target: 'Senior ML Engineer', timestamp: '2m ago', status: 'success' },
  { id: 'log-2', agentId: 'agent-2', agentName: 'Iris', action: 'Scored resume: 94/100', target: 'Priya Sharma', timestamp: '5m ago', status: 'success' },
  { id: 'log-3', agentId: 'agent-3', agentName: 'Vera', action: 'Scheduled technical interview', target: 'Marcus Chen', timestamp: '12m ago', status: 'success' },
  { id: 'log-4', agentId: 'agent-5', agentName: 'Rex', action: 'Verified employment history', target: 'James Okafor', timestamp: '18m ago', status: 'success' },
  { id: 'log-5', agentId: 'agent-6', agentName: 'Aria', action: 'Generated offer package', target: 'James Okafor', timestamp: '24m ago', status: 'success' },
  { id: 'log-6', agentId: 'agent-4', agentName: 'Nexus', action: 'Culture fit analysis complete: 92%', target: 'Aisha Patel', timestamp: '31m ago', status: 'success' },
  { id: 'log-7', agentId: 'agent-2', agentName: 'Iris', action: 'Auto-rejected: skills mismatch', target: 'David Kim', timestamp: '45m ago', status: 'warning' },
  { id: 'log-8', agentId: 'agent-1', agentName: 'Scout', action: 'LinkedIn outreach sent to 8 candidates', target: 'DevOps Engineer', timestamp: '1h ago', status: 'success' },
  { id: 'log-9', agentId: 'agent-3', agentName: 'Vera', action: 'Interview reminder sent', target: 'Sofia Nguyen', timestamp: '1h ago', status: 'info' },
  { id: 'log-10', agentId: 'agent-5', agentName: 'Rex', action: 'Reference check pending response', target: 'James Okafor', timestamp: '2h ago', status: 'warning' },
];

export const pipelineData = [
  { name: 'Sourced', value: 312, fill: '#8b5cf6' },
  { name: 'Screened', value: 187, fill: '#06b6d4' },
  { name: 'Shortlisted', value: 64, fill: '#10b981' },
  { name: 'Interviewing', value: 28, fill: '#f59e0b' },
  { name: 'Offered', value: 9, fill: '#3b82f6' },
  { name: 'Hired', value: 5, fill: '#ec4899' },
];

export const hiringTrendData = [
  { month: 'Aug', sourced: 42, hired: 2 },
  { month: 'Sep', sourced: 58, hired: 3 },
  { month: 'Oct', sourced: 71, hired: 4 },
  { month: 'Nov', sourced: 65, hired: 3 },
  { month: 'Dec', sourced: 89, hired: 5 },
  { month: 'Jan', sourced: 102, hired: 6 },
];

export const agentPerformanceData = [
  { name: 'Scout', tasks: 1248, accuracy: 94 },
  { name: 'Iris', tasks: 3871, accuracy: 97 },
  { name: 'Vera', tasks: 892, accuracy: 99 },
  { name: 'Nexus', tasks: 567, accuracy: 88 },
  { name: 'Rex', tasks: 431, accuracy: 100 },
  { name: 'Aria', tasks: 203, accuracy: 91 },
];
