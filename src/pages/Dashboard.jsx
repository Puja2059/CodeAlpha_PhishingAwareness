import React, { useState } from 'react';
import { 
  FlaskConical, ArrowRight, 
  RotateCcw, Sparkles, CheckCircle2, 
  Compass, ChevronRight 
} from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import ModuleCard from '../components/ModuleCard';
import AchievementBadge from '../components/AchievementBadge';
import ResetModal from '../components/ResetModal';
import { MODULES_DATA } from '../data/modulesData';
import { BADGES_DATA } from '../data/badgesData';

export default function Dashboard({ 
  progressState, 
  overallPercentage, 
  securityRank, 
  totalPoints, 
  onSelectModule, 
  onNavigateTab, 
  onResetProgress 
}) {
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Compute next unfinished activity
  const nextIncompleteModule = MODULES_DATA.find(
    (m) => !progressState.completedModules.includes(m.id)
  );

  const handleContinueTraining = () => {
    if (nextIncompleteModule) {
      onSelectModule(nextIncompleteModule.id);
    } else if (progressState.completedScenarios.length < 5) {
      onNavigateTab('simulation');
    } else {
      onNavigateTab('assessment');
    }
  };

  const completedModulesCount = progressState.completedModules.length;
  const completedScenariosCount = progressState.completedScenarios.length;
  const isAssessmentPassed = progressState.assessmentPassed;

  return (
    <div className="dashboard-page-container fade-in">
      {/* Hero Header Section */}
      <section className="dashboard-hero-section glass-panel">
        <div className="hero-content-grid">
          <div className="hero-text-block">
            <div className="hero-tag-badge">
              <span className="badge badge-info">CodeAlpha Cybersecurity Internship • Task 2</span>
            </div>
            <h1 className="hero-main-title">
              Phishing Awareness Training
            </h1>
            <h2 className="hero-subtitle-gradient">
              Recognize. Investigate. Prevent.
            </h2>
            <p className="hero-description">
              Strengthen your human firewall against social engineering threats. Master email forensic inspection, debunk fake domains and SSL fallacies, investigate real-world simulated attacks in our safe sandbox lab, and validate your expertise with certified knowledge assessment.
            </p>

            <div className="hero-cta-group">
              <button className="btn btn-primary btn-lg" onClick={handleContinueTraining}>
                <Compass size={18} />
                {completedModulesCount === 0 ? 'Start Training Curriculum' : 'Continue Training Journey'}
                <ArrowRight size={18} />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => onNavigateTab('simulation')}>
                <FlaskConical size={18} />
                Open Phishing Lab
              </button>
            </div>
          </div>

          {/* Quick Metrics & Rank Showcase Card */}
          <div className="hero-stats-card glass-panel">
            <div className="stats-card-header">
              <div className="rank-avatar-glow" style={{ borderColor: securityRank.color }}>
                <Sparkles size={28} style={{ color: securityRank.color }} />
              </div>
              <div>
                <span className="stat-eyebrow">Current Security Tier</span>
                <h3 className="stat-rank-title" style={{ color: securityRank.color }}>
                  {securityRank.title}
                </h3>
              </div>
            </div>

            <div className="hero-progress-block">
              <ProgressBar 
                percentage={overallPercentage} 
                label="Overall Course Completion" 
              />
            </div>

            <div className="hero-stat-pills-grid">
              <div className="stat-pill-box">
                <span className="stat-pill-number">{completedModulesCount} / 6</span>
                <span className="stat-pill-label">Modules Done</span>
              </div>
              <div className="stat-pill-box">
                <span className="stat-pill-number">{completedScenariosCount} / 5</span>
                <span className="stat-pill-label">Scenarios Solved</span>
              </div>
              <div className="stat-pill-box">
                <span className="stat-pill-number">{totalPoints}</span>
                <span className="stat-pill-label">Security XP Points</span>
              </div>
              <div className="stat-pill-box">
                <span className="stat-pill-number">
                  {isAssessmentPassed ? (
                    <span className="text-safe">Passed ({progressState.bestQuizScore}%)</span>
                  ) : progressState.bestQuizScore > 0 ? (
                    <span className="text-warning">{progressState.bestQuizScore}%</span>
                  ) : (
                    <span className="text-muted">Unattempted</span>
                  )}
                </span>
                <span className="stat-pill-label">Certification Status</span>
              </div>
            </div>

            <div className="stats-card-reset-row">
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={() => setResetModalOpen(true)}
              >
                <RotateCcw size={14} />
                Reset Progress Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Curriculum Grid */}
      <section className="dashboard-section" style={{ marginTop: '2.5rem' }}>
        <div className="section-title-row">
          <div>
            <span className="badge badge-info">Interactive Curriculum</span>
            <h2 style={{ marginTop: '0.35rem' }}>Comprehensive Learning Modules</h2>
            <p style={{ marginTop: '0.2rem' }}>
              Structured, hands-on lessons covering social engineering psychology, email anatomy, fake URLs, and defensive response.
            </p>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigateTab('modules')}
          >
            View All Modules <ChevronRight size={14} />
          </button>
        </div>

        <div className="modules-cards-grid" style={{ marginTop: '1.25rem' }}>
          {MODULES_DATA.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isCompleted={progressState.completedModules.includes(module.id)}
              onSelectModule={onSelectModule}
            />
          ))}
        </div>
      </section>

      {/* Phishing Simulation Lab Teaser Banner */}
      <section className="simulation-banner-card glass-panel" style={{ marginTop: '2.5rem' }}>
        <div className="sim-banner-content">
          <div className="sim-banner-icon-disc">
            <FlaskConical size={36} className="text-cyan-primary" />
          </div>
          <div className="sim-banner-text">
            <span className="badge badge-warning">Hands-on Investigation</span>
            <h3 style={{ marginTop: '0.35rem' }}>Interactive Phishing Simulation Laboratory</h3>
            <p style={{ marginTop: '0.25rem' }}>
              Investigate 5 realistic, safe fictional attacks: bank suspension alerts, package surcharge smishing, Microsoft 365 credential traps, executive BEC wire transfers, and double-extension attachments.
            </p>
            <div className="sim-banner-progress-pills">
              <span className="pill-metric">
                <CheckCircle2 size={14} className="text-safe" />
                {completedScenariosCount} of 5 Scenarios Investigated
              </span>
            </div>
          </div>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => onNavigateTab('simulation')}
          >
            Launch Simulation Lab <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Achievement Badges Showcase */}
      <section className="dashboard-section" style={{ marginTop: '2.5rem' }}>
        <div className="section-title-row">
          <div>
            <span className="badge badge-safe">Earned Credentials</span>
            <h2 style={{ marginTop: '0.35rem' }}>Skill Badges & Milestones</h2>
            <p style={{ marginTop: '0.2rem' }}>
              Earn cybersecurity badges by finishing learning modules, solving simulations, and passing the assessment.
            </p>
          </div>
        </div>

        <div className="badges-grid-layout" style={{ marginTop: '1.25rem' }}>
          {BADGES_DATA.map((badge) => (
            <AchievementBadge 
              key={badge.id}
              badge={badge}
              isUnlocked={badge.condition(progressState)}
            />
          ))}
        </div>
      </section>

      {/* Reset Confirmation Modal */}
      <ResetModal 
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={() => {
          onResetProgress();
          setResetModalOpen(false);
        }}
      />
    </div>
  );
}
