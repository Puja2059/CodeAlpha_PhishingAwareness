import React from 'react';
import ModuleCard from '../components/ModuleCard';
import ProgressBar from '../components/ProgressBar';
import { MODULES_DATA } from '../data/modulesData';

export default function LearningModules({ 
  completedModules = [], 
  onSelectModule 
}) {
  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / MODULES_DATA.length) * 100);

  return (
    <div className="learning-modules-page fade-in">
      <div className="curriculum-hero glass-panel">
        <div className="curriculum-hero-header">
          <div>
            <span className="badge badge-info">Cybersecurity Curriculum</span>
            <h1 style={{ marginTop: '0.4rem' }}>Learning Modules & Laboratories</h1>
            <p style={{ marginTop: '0.35rem', maxWidth: '700px' }}>
              Explore comprehensive learning paths designed to build real-world threat detection instincts. Each module includes foundational theory, actionable defense playbooks, and interactive exercises.
            </p>
          </div>
          <div className="curriculum-progress-stat">
            <span className="curriculum-stat-number">{completedCount} / 6</span>
            <span className="curriculum-stat-label">Modules Completed</span>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <ProgressBar 
            percentage={progressPercent} 
            label="Curriculum Mastery Progress" 
          />
        </div>
      </div>

      <div className="modules-cards-grid" style={{ marginTop: '2rem' }}>
        {MODULES_DATA.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isCompleted={completedModules.includes(module.id)}
            onSelectModule={onSelectModule}
          />
        ))}
      </div>
    </div>
  );
}
