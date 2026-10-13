import React from 'react';

export default function ProgressBar({ percentage = 0, label = 'Overall Course Progress', showPercentage = true }) {
  const clamped = Math.max(0, Math.min(100, Math.round(percentage)));

  return (
    <div className="progress-bar-container">
      {(label || showPercentage) && (
        <div className="progress-bar-labels">
          {label && <span className="progress-bar-title">{label}</span>}
          {showPercentage && <span className="progress-bar-percent">{clamped}%</span>}
        </div>
      )}
      <div className="progress-bar-track" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="progress-bar-fill" 
          style={{ width: `${clamped}%` }}
        ></div>
      </div>
    </div>
  );
}
