import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ScenarioCard from '../components/ScenarioCard';
import ProgressBar from '../components/ProgressBar';
import { SCENARIOS_DATA } from '../data/scenariosData';

export default function SimulationLab({ 
  progressState, 
  onSubmitScenarioAnalysis 
}) {
  const [activeScenarioId, setActiveScenarioId] = useState(SCENARIOS_DATA[0].id);

  const activeScenario = SCENARIOS_DATA.find((s) => s.id === activeScenarioId) || SCENARIOS_DATA[0];
  const completedScenarios = progressState.completedScenarios || [];
  const scenarioScores = progressState.scenarioScores || {};
  const scenarioFindings = progressState.scenarioFindings || {};

  const completedCount = completedScenarios.length;
  const totalEarnedPoints = Object.values(scenarioScores).reduce((a, b) => a + b, 0);
  const completionPercent = Math.round((completedCount / SCENARIOS_DATA.length) * 100);

  return (
    <div className="simulation-lab-page-container fade-in">
      {/* Simulation Lab Hero Banner */}
      <div className="simulation-lab-hero glass-panel">
        <div className="lab-hero-header">
          <div>
            <div className="lab-hero-tags">
              <span className="badge badge-warning">Simulated Threat Intelligence Lab</span>
              <span className="badge badge-safe">100% Benign Sandboxed Scenarios</span>
            </div>
            <h1 style={{ marginTop: '0.4rem' }}>Phishing Investigation Laboratory</h1>
            <p style={{ marginTop: '0.35rem', maxWidth: '750px' }}>
              Step into the role of a frontline SOC cybersecurity analyst. Inspect incoming emails and mobile communications, uncover deceptive headers and spoofed URLs, flag subtle social engineering indicators, and review expert forensic reports.
            </p>
          </div>

          <div className="lab-hero-stat-card">
            <span className="lab-stat-number">{completedCount} / 5</span>
            <span className="lab-stat-label">Scenarios Investigated</span>
            <span className="badge badge-info" style={{ marginTop: '0.4rem' }}>
              {totalEarnedPoints} / 500 Lab XP
            </span>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <ProgressBar 
            percentage={completionPercent} 
            label="Laboratory Completion Progress" 
          />
        </div>
      </div>

      {/* Scenario Selector Navigation Tabs */}
      <div className="scenario-selector-nav">
        {SCENARIOS_DATA.map((sc, idx) => {
          const isDone = completedScenarios.includes(sc.id);
          const score = scenarioScores[sc.id];
          const isActive = sc.id === activeScenarioId;

          return (
            <button
              key={sc.id}
              className={`scenario-nav-btn glass-panel ${isActive ? 'active-scenario' : ''} ${isDone ? 'scenario-done' : ''}`}
              onClick={() => setActiveScenarioId(sc.id)}
            >
              <div className="scenario-tab-top">
                <span className="scenario-tab-num">Scenario 0{idx + 1}</span>
                {isDone ? (
                  <span className="badge badge-safe btn-tab-badge">
                    <CheckCircle2 size={12} /> {score} pts
                  </span>
                ) : (
                  <span className={`badge ${sc.difficulty === 'Easy' ? 'badge-safe' : sc.difficulty === 'Medium' ? 'badge-warning' : 'badge-danger'} btn-tab-badge`}>
                    {sc.difficulty}
                  </span>
                )}
              </div>
              <span className="scenario-tab-title">{sc.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <div className="active-scenario-container" style={{ marginTop: '1.5rem' }}>
        <ScenarioCard
          key={activeScenario.id}
          scenario={activeScenario}
          onComplete={onSubmitScenarioAnalysis}
          savedScore={scenarioScores[activeScenario.id]}
          savedSelections={scenarioFindings[activeScenario.id]?.selected}
        />
      </div>
    </div>
  );
}
