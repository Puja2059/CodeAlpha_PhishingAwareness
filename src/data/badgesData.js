export const BADGES_DATA = [
  {
    id: 'first-step',
    name: 'First Line of Defense',
    description: 'Completed Module 1: Introduction to Phishing & Social Engineering.',
    icon: 'Shield',
    color: '#06b6d4',
    condition: (state) => state.completedModules?.includes(1)
  },
  {
    id: 'email-sleuth',
    name: 'Email Forensic Analyst',
    description: 'Completed Module 2: Mastered email headers, spoofing, and dangerous attachments.',
    icon: 'MailCheck',
    color: '#10b981',
    condition: (state) => state.completedModules?.includes(2)
  },
  {
    id: 'domain-sentinel',
    name: 'Domain Sentinel',
    description: 'Completed Module 3: Dissected lookalike URLs and debunked the padlock fallacy.',
    icon: 'Globe2',
    color: '#38bdf8',
    condition: (state) => state.completedModules?.includes(3)
  },
  {
    id: 'psy-shield',
    name: 'Social Engineering Shield',
    description: 'Completed Module 4: Recognized psychological coercion, pretexts, and out-of-band verification.',
    icon: 'BrainCircuit',
    color: '#a855f7',
    condition: (state) => state.completedModules?.includes(4)
  },
  {
    id: 'defense-architect',
    name: 'Defense Architect',
    description: 'Completed Module 5: Adopted phishing-resistant MFA, password managers, and incident response.',
    icon: 'KeyRound',
    color: '#f59e0b',
    condition: (state) => state.completedModules?.includes(5)
  },
  {
    id: 'lab-master',
    name: 'Simulation Specialist',
    description: 'Successfully investigated all 5 scenarios in the Phishing Simulation Lab.',
    icon: 'FlaskConical',
    color: '#06b6d4',
    condition: (state) => (state.completedScenarios?.length || 0) >= 5
  },
  {
    id: 'certified-hunter',
    name: 'Phish Hunter Certified',
    description: 'Scored 80% or higher on the Comprehensive Knowledge Assessment.',
    icon: 'Award',
    color: '#f43f5e',
    condition: (state) => state.assessmentPassed === true
  }
];
