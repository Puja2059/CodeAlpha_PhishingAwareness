import React from 'react';
import { CheckSquare, Square, Building2, User } from 'lucide-react';
import { CHECKLIST_DATA } from '../data/checklistData';

export default function InteractiveChecklist({ checklistState = {}, onToggle }) {
  const individualItems = CHECKLIST_DATA.individual;
  const orgItems = CHECKLIST_DATA.organizational;

  const countChecked = (items) => items.filter((item) => checklistState[item.id]).length;
  const indChecked = countChecked(individualItems);
  const orgChecked = countChecked(orgItems);

  return (
    <div className="interactive-exercise-container glass-panel">
      <div className="exercise-header">
        <div>
          <span className="badge badge-safe">Practical Security Controls</span>
          <h3 style={{ marginTop: '0.35rem' }}>Phishing Defense Implementation Checklist</h3>
          <p style={{ marginTop: '0.2rem' }}>
            Interactive checklist of technical and behavioral countermeasures to implement across your devices and team.
          </p>
        </div>
        <div className="inspection-counter">
          <span className="counter-text">Completed Safeguards:</span>
          <span className="counter-pill">{indChecked + orgChecked} / {individualItems.length + orgItems.length}</span>
        </div>
      </div>

      <div className="checklist-dual-grid">
        {/* Individual Controls */}
        <div className="checklist-category-card">
          <div className="category-title-bar">
            <User size={20} className="text-highlight" />
            <h4>Individual Security Safeguards</h4>
            <span className="category-count">{indChecked}/{individualItems.length}</span>
          </div>

          <div className="checklist-items-stack">
            {individualItems.map((item) => {
              const checked = !!checklistState[item.id];
              return (
                <div
                  key={item.id}
                  className={`interactive-check-row ${checked ? 'row-checked' : ''}`}
                  onClick={() => onToggle && onToggle(item.id)}
                >
                  <div className="check-box-icon">
                    {checked ? (
                      <CheckSquare size={20} className="text-safe" />
                    ) : (
                      <Square size={20} className="text-dim" />
                    )}
                  </div>
                  <div className="check-text-content">
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Organizational Controls */}
        <div className="checklist-category-card">
          <div className="category-title-bar">
            <Building2 size={20} className="text-highlight" />
            <h4>Organizational & Enterprise Controls</h4>
            <span className="category-count">{orgChecked}/{orgItems.length}</span>
          </div>

          <div className="checklist-items-stack">
            {orgItems.map((item) => {
              const checked = !!checklistState[item.id];
              return (
                <div
                  key={item.id}
                  className={`interactive-check-row ${checked ? 'row-checked' : ''}`}
                  onClick={() => onToggle && onToggle(item.id)}
                >
                  <div className="check-box-icon">
                    {checked ? (
                      <CheckSquare size={20} className="text-safe" />
                    ) : (
                      <Square size={20} className="text-dim" />
                    )}
                  </div>
                  <div className="check-text-content">
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
