import React from 'react';
import { 
  Shield, MailCheck, Globe2, BrainCircuit, KeyRound, FlaskConical, Award, Lock 
} from 'lucide-react';

const BADGE_ICONS = {
  Shield,
  MailCheck,
  Globe2,
  BrainCircuit,
  KeyRound,
  FlaskConical,
  Award
};

export default function AchievementBadge({ badge, isUnlocked = false }) {
  const IconComponent = BADGE_ICONS[badge.icon] || Award;

  return (
    <div className={`achievement-badge-card glass-panel ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}`}>
      <div 
        className="badge-icon-disc"
        style={{
          borderColor: isUnlocked ? badge.color : 'rgba(148, 163, 184, 0.2)',
          background: isUnlocked ? `radial-gradient(circle, ${badge.color}22 0%, transparent 70%)` : 'transparent'
        }}
      >
        {isUnlocked ? (
          <IconComponent size={30} style={{ color: badge.color }} />
        ) : (
          <Lock size={22} className="text-dim" />
        )}
      </div>

      <div className="badge-text-details">
        <h4 className="badge-name" style={{ color: isUnlocked ? '#ffffff' : '#64748b' }}>
          {badge.name}
        </h4>
        <p className="badge-description">{badge.description}</p>
        <span className={`badge-status-pill ${isUnlocked ? 'pill-unlocked' : 'pill-locked'}`}>
          {isUnlocked ? 'Unlocked' : 'Locked'}
        </span>
      </div>
    </div>
  );
}
