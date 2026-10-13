import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Clock, 
  HelpCircle, Check, XCircle, ShieldCheck, Award 
} from 'lucide-react';
import InteractiveEmailViewer from '../components/InteractiveEmailViewer';
import InteractiveUrlInspector from '../components/InteractiveUrlInspector';
import InteractiveScenarioDecision from '../components/InteractiveScenarioDecision';
import InteractiveChecklist from '../components/InteractiveChecklist';
import { MODULES_DATA } from '../data/modulesData';

export default function ModuleDetail({ 
  moduleId, 
  onBackToCurriculum, 
  onSelectModule, 
  onMarkComplete, 
  isCompleted, 
  onNavigateTab,
  checklistState,
  onToggleChecklist 
}) {
  const module = MODULES_DATA.find((m) => m.id === moduleId) || MODULES_DATA[0];
  const [quickCheckChoice, setQuickCheckChoice] = useState(null);
  const [quickCheckSubmitted, setQuickCheckSubmitted] = useState(false);

  const prevModule = MODULES_DATA.find((m) => m.id === module.id - 1);
  const nextModule = MODULES_DATA.find((m) => m.id === module.id + 1);

  const handleQuickCheckSubmit = (idx) => {
    setQuickCheckChoice(idx);
    setQuickCheckSubmitted(true);
  };

  const handleCompleteAndNext = () => {
    onMarkComplete(module.id);
    if (nextModule) {
      onSelectModule(nextModule.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigateTab('assessment');
    }
  };

  return (
    <div className="module-detail-page-container fade-in">
      {/* Top Navigation Bar */}
      <div className="module-nav-header">
        <button className="btn btn-secondary btn-sm" onClick={onBackToCurriculum}>
          <ArrowLeft size={16} /> Back to Curriculum
        </button>
        <div className="module-header-badges">
          <span className="badge badge-info">{module.category}</span>
          <span className="badge" style={{ background: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8' }}>
            <Clock size={12} /> {module.estimatedMinutes} Mins
          </span>
          {isCompleted && (
            <span className="badge badge-safe">
              <CheckCircle2 size={12} /> Completed
            </span>
          )}
        </div>
      </div>

      {/* Module Title & Hero */}
      <div className="module-hero-banner glass-panel">
        <span className="module-step-indicator">MODULE 0{module.id} OF 06</span>
        <h1 className="module-page-title">{module.title}</h1>
        <p className="module-hero-subtitle">{module.shortDescription}</p>
      </div>

      {/* Educational Content Sections */}
      <div className="module-content-stack">
        {module.sections.map((section, idx) => (
          <article key={idx} className="module-content-article glass-panel">
            <h2 className="section-article-heading">{section.heading}</h2>
            <div className="section-body-text">
              {section.content.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('•') || paragraph.startsWith('1.') || paragraph.startsWith('2.')) {
                  const lines = paragraph.split('\n');
                  return (
                    <ul key={pIdx} className="content-bullet-list">
                      {lines.map((line, lIdx) => (
                        <li key={lIdx} dangerouslySetInnerHTML={{ 
                          __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code>$1</code>') 
                        }} />
                      ))}
                    </ul>
                  );
                }
                return (
                  <p 
                    key={pIdx} 
                    dangerouslySetInnerHTML={{ 
                      __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code>$1</code>') 
                    }} 
                  />
                );
              })}
            </div>
          </article>
        ))}

        {/* Embedded Interactive Exercises */}
        {module.interactiveType === 'emailDissection' && (
          <div className="interactive-embed-wrapper" style={{ marginTop: '1.5rem' }}>
            <InteractiveEmailViewer />
          </div>
        )}

        {module.interactiveType === 'urlInspector' && (
          <div className="interactive-embed-wrapper" style={{ marginTop: '1.5rem' }}>
            <InteractiveUrlInspector />
          </div>
        )}

        {module.interactiveType === 'scenarioDecision' && (
          <div className="interactive-embed-wrapper" style={{ marginTop: '1.5rem' }}>
            <InteractiveScenarioDecision />
          </div>
        )}

        {module.interactiveType === 'preventionChecklist' && (
          <div className="interactive-embed-wrapper" style={{ marginTop: '1.5rem' }}>
            <InteractiveChecklist 
              checklistState={checklistState}
              onToggle={onToggleChecklist}
            />
          </div>
        )}

        {/* Key Takeaways Card */}
        {module.keyTakeaways && (
          <div className="key-takeaways-card glass-panel" style={{ marginTop: '1.5rem' }}>
            <div className="takeaways-header">
              <ShieldCheck size={22} className="text-cyan-primary" />
              <h3>Key Defensive Takeaways</h3>
            </div>
            <ul className="takeaways-list">
              {module.keyTakeaways.map((takeaway, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="text-safe flex-shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick Knowledge Checkpoint */}
        {module.quickCheck && (
          <div className="quick-check-card glass-panel" style={{ marginTop: '1.5rem' }}>
            <div className="quick-check-header">
              <HelpCircle size={22} className="text-highlight" />
              <div>
                <span className="badge badge-info">Knowledge Checkpoint</span>
                <h4 style={{ marginTop: '0.2rem' }}>Quick Comprehension Check</h4>
              </div>
            </div>

            <p className="quick-check-question" style={{ marginTop: '0.75rem', fontWeight: 600, color: '#f1f5f9' }}>
              {module.quickCheck.question}
            </p>

            <div className="quick-check-options" style={{ marginTop: '0.75rem' }}>
              {module.quickCheck.options.map((opt, optIdx) => {
                const isSelected = quickCheckChoice === optIdx;
                const isCorrect = module.quickCheck.correctIndex === optIdx;
                let optionStyle = 'quick-check-option';

                if (quickCheckSubmitted) {
                  if (isCorrect) optionStyle += ' correct';
                  else if (isSelected && !isCorrect) optionStyle += ' incorrect';
                } else if (isSelected) {
                  optionStyle += ' selected';
                }

                return (
                  <div
                    key={optIdx}
                    className={optionStyle}
                    onClick={() => !quickCheckSubmitted && handleQuickCheckSubmit(optIdx)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + optIdx)}</span>
                    <span className="option-text">{opt}</span>
                    {quickCheckSubmitted && isCorrect && (
                      <Check size={18} className="text-safe flex-shrink-0" />
                    )}
                    {quickCheckSubmitted && isSelected && !isCorrect && (
                      <XCircle size={18} className="text-danger flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {quickCheckSubmitted && (
              <div className="quick-check-explanation fade-in" style={{ marginTop: '1rem' }}>
                <p>
                  <strong>Security Analysis:</strong> {module.quickCheck.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Module Completion & Navigation Footer */}
        <div className="module-footer-nav-row glass-panel" style={{ marginTop: '2rem' }}>
          {prevModule ? (
            <button 
              className="btn btn-secondary"
              onClick={() => {
                onSelectModule(prevModule.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              ← Previous: Module 0{prevModule.id}
            </button>
          ) : (
            <div></div>
          )}

          <div className="module-footer-actions">
            {!isCompleted ? (
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleCompleteAndNext}
              >
                <CheckCircle2 size={18} />
                Mark Complete & Continue
                <ArrowRight size={18} />
              </button>
            ) : nextModule ? (
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => {
                  onSelectModule(nextModule.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Next: Module 0{nextModule.id}
                <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => onNavigateTab('assessment')}
              >
                <Award size={18} />
                Take Knowledge Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
