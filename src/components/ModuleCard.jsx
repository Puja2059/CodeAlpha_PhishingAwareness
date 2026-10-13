import React from 'react';
import { 
  ShieldAlert, MailWarning, Globe, Brain, ShieldCheck, Award, 
  Clock, ArrowRight, CheckCircle2 
} from 'lucide-react';

const ICON_MAP = {
  ShieldAlert,
  MailWarning,
  Globe,
  Brain,
  ShieldCheck,
  Award
};

export default function ModuleCard({ module, isCompleted, onSelectModule }) {
  const IconComponent = ICON_MAP[module.icon] || ShieldAlert;

  return (
    <div 
      className={`module-card glass-panel ${isCompleted ? 'module-completed' : ''}`}
      onClick={() => onSelectModule(module.id)}
    >
      <div className="module-card-top">
        <div className={`module-icon-wrap ${isCompleted ? 'icon-completed' : ''}`}>
          <IconComponent size={24} />
        </div>
        <div className="module-status-tags">
          <span className="badge badge-info">{module.category}</span>
          {isCompleted ? (
            <span className="badge badge-safe">
              <CheckCircle2 size={12} /> Completed
            </span>
          ) : (
            <span className="badge" style={{ background: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8' }}>
              {module.estimatedMinutes} mins
            </span>
          )}
        </div>
      </div>

      <div className="module-card-body">
        <span className="module-num-label">Module 0{module.id}</span>
        <h3 className="module-title-text">{module.title}</h3>
        <p className="module-desc-text">{module.shortDescription}</p>
      </div>

      <div className="module-card-footer">
        <div className="module-meta-item">
          <Clock size={14} className="text-muted" />
          <span>{module.estimatedMinutes} min read</span>
        </div>
        <button className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}>
          {isCompleted ? 'Review' : 'Start Module'}
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
