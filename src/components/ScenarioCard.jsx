import React, { useState } from 'react';
import { 
  Smartphone, CheckCircle2, 
  FileText, ExternalLink, RotateCcw, Info, 
  Terminal 
} from 'lucide-react';
import SafeInterceptionModal from './SafeInterceptionModal';

export default function ScenarioCard({ 
  scenario, 
  onComplete, 
  savedScore = null, 
  savedSelections = [] 
}) {
  const [selectedIndicators, setSelectedIndicators] = useState(() => savedSelections || []);
  const [isSubmitted, setIsSubmitted] = useState(() => savedScore !== null);
  const [interceptionUrl, setInterceptionUrl] = useState(null);
  const [currentScore, setCurrentScore] = useState(() => savedScore);

  const toggleIndicator = (id) => {
    if (isSubmitted) return;
    setSelectedIndicators((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmitAnalysis = () => {
    if (selectedIndicators.length === 0) return;
    const correctIds = scenario.indicators.filter((ind) => ind.isRedFlag).map((ind) => ind.id);
    const scoreEarned = onComplete(scenario.id, selectedIndicators, correctIds, 100);
    setCurrentScore(scoreEarned);
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    setSelectedIndicators([]);
    setIsSubmitted(false);
    setCurrentScore(null);
  };

  const isEmail = scenario.scenarioType === 'email';

  return (
    <div className="scenario-investigation-card glass-panel fade-in">
      {/* Scenario Metadata Header */}
      <div className="scenario-card-header">
        <div className="scenario-badge-group">
          <span className={`badge ${scenario.difficulty === 'Easy' ? 'badge-safe' : scenario.difficulty === 'Medium' ? 'badge-warning' : 'badge-danger'}`}>
            {scenario.difficulty} Threat
          </span>
          <span className="badge badge-info">
            {scenario.threatCategory}
          </span>
          <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            MITRE: {scenario.mitreTechnique}
          </span>
        </div>
        <h3 className="scenario-title" style={{ marginTop: '0.5rem' }}>{scenario.title}</h3>
      </div>

      <div className="simulation-interface-grid">
        {/* Left Column: Realistic Interactive Message Mockup */}
        <div className="simulation-message-view">
          <div className="simulation-view-label">
            <span>{isEmail ? 'Inbound Email Message' : 'Mobile SMS Message'}</span>
            <span className="safe-sandbox-tag">Training Simulation Sandbox</span>
          </div>

          {isEmail ? (
            /* Email Interface Mockup */
            <div className="email-client-mockup">
              <div className="email-client-titlebar">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="window-title">{scenario.subject}</span>
              </div>

              <div className="email-headers-section">
                <div className="header-row">
                  <span className="header-label">From:</span>
                  <div className="header-value">
                    <span className="display-name">{scenario.sender.name}</span>
                    <span className="spoofed-address">&lt;{scenario.sender.address}&gt;</span>
                  </div>
                </div>

                <div className="header-row">
                  <span className="header-label">To:</span>
                  <div className="header-value">{scenario.recipient}</div>
                </div>

                <div className="header-row">
                  <span className="header-label">Date:</span>
                  <div className="header-value">{scenario.date}</div>
                </div>

                <div className="header-row">
                  <span className="header-label">Subject:</span>
                  <div className="header-value" style={{ fontWeight: 600, color: '#f8fafc' }}>
                    {scenario.subject}
                  </div>
                </div>

                {scenario.sender.replyTo && (
                  <div className="header-row">
                    <span className="header-label">Reply-To:</span>
                    <div className="header-value" style={{ color: '#fb7185' }}>
                      {scenario.sender.replyTo}
                    </div>
                  </div>
                )}
              </div>

              {/* Email Body */}
              <div className="email-body-content">
                <p style={{ fontWeight: 600, color: '#334155' }}>
                  {scenario.emailContent.greeting}
                </p>

                {scenario.emailContent.paragraphs.map((para, idx) => (
                  <p key={idx} style={{ marginTop: '0.65rem', color: '#475569', fontSize: '0.92rem' }}>
                    {para}
                  </p>
                ))}

                {/* Simulated Action Button */}
                {scenario.emailContent.buttonText && (
                  <div className="email-cta-box" style={{ marginTop: '1.25rem' }}>
                    <button 
                      className="email-cta-btn"
                      onClick={() => setInterceptionUrl(scenario.simulatedUrl)}
                    >
                      {scenario.emailContent.buttonText}
                    </button>
                    <div className="link-destination-preview">
                      <ExternalLink size={14} />
                      <span>Destination preview: <code>{scenario.simulatedUrl}</code></span>
                    </div>
                  </div>
                )}

                {/* Simulated Attachment if present */}
                {scenario.attachment && (
                  <div 
                    className="email-attachment-box"
                    onClick={() => setInterceptionUrl(scenario.simulatedUrl)}
                    title="Clicking simulated attachment tests safe interception"
                  >
                    <div className="attachment-icon-pill">
                      <FileText size={24} className="text-danger" />
                    </div>
                    <div className="attachment-details">
                      <span className="attachment-filename">{scenario.attachment.filename}</span>
                      <span className="attachment-meta">{scenario.attachment.filesize} • {scenario.attachment.type}</span>
                    </div>
                    <span className="badge badge-warning" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>
                      Inspect Payload
                    </span>
                  </div>
                )}

                {/* Footer */}
                <div className="email-footer-box" style={{ marginTop: '1.5rem' }}>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {scenario.emailContent.footerText}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Smartphone SMS Mockup */
            <div className="smartphone-frame-mockup">
              <div className="phone-speaker-notch"></div>
              <div className="phone-screen-header">
                <div className="phone-sender-info">
                  <div className="phone-avatar-circle">
                    <Smartphone size={18} />
                  </div>
                  <span className="phone-sender-number">{scenario.sender.name}</span>
                  <span className="phone-sms-status">Text Message • Today {scenario.date.split(',')[1]}</span>
                </div>
              </div>

              <div className="phone-sms-body">
                <div className="sms-speech-bubble">
                  <p className="sms-text-content">
                    {scenario.smsContent.message.split(scenario.simulatedUrl)[0]}
                    <span 
                      className="sms-simulated-link"
                      onClick={() => setInterceptionUrl(scenario.simulatedUrl)}
                    >
                      {scenario.simulatedUrl}
                    </span>
                  </p>
                  <span className="sms-timestamp">{scenario.date.split(',')[1]}</span>
                </div>
                <div className="sms-tap-hint">
                  <Info size={14} /> Tap the link to test safe interception
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Forensic Indicator Checklist & Analysis */}
        <div className="simulation-analysis-view">
          <div className="analysis-header-row">
            <h4>Security Analysis Checklist</h4>
            <span className="badge badge-info">Select All Red Flags</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Review the message on the left. Check every element you believe is a genuine suspicious indicator. Avoid selecting non-indicators.
          </p>

          <div className="indicators-selection-stack">
            {scenario.indicators.map((ind) => {
              const isChecked = selectedIndicators.includes(ind.id);
              let rowStateClass = '';

              if (isSubmitted) {
                if (ind.isRedFlag && isChecked) {
                  rowStateClass = 'indicator-correct-found';
                } else if (ind.isRedFlag && !isChecked) {
                  rowStateClass = 'indicator-missed';
                } else if (!ind.isRedFlag && isChecked) {
                  rowStateClass = 'indicator-false-positive';
                }
              }

              return (
                <div 
                  key={ind.id}
                  className={`indicator-select-row ${isChecked ? 'selected' : ''} ${rowStateClass}`}
                  onClick={() => toggleIndicator(ind.id)}
                >
                  <div className="indicator-checkbox">
                    {isChecked ? (
                      <CheckCircle2 size={18} className={isSubmitted && !ind.isRedFlag ? 'text-danger' : 'text-safe'} />
                    ) : (
                      <div className="empty-checkbox"></div>
                    )}
                  </div>
                  <div className="indicator-label-wrap">
                    <span className="indicator-label-text">{ind.label}</span>
                    {isSubmitted && (
                      <p className="indicator-explanation-subtext fade-in">
                        {ind.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submission and Scoring Actions */}
          {!isSubmitted ? (
            <div className="analysis-action-bar" style={{ marginTop: '1.25rem' }}>
              <button
                className="btn btn-primary"
                disabled={selectedIndicators.length === 0}
                onClick={handleSubmitAnalysis}
                style={{ opacity: selectedIndicators.length === 0 ? 0.5 : 1, width: '100%' }}
              >
                Submit Forensic Analysis
              </button>
            </div>
          ) : (
            <div className="analysis-results-box fade-in" style={{ marginTop: '1.25rem' }}>
              <div className="score-reveal-row">
                <div>
                  <span className="badge badge-safe">Investigation Complete</span>
                  <h4 style={{ marginTop: '0.25rem' }}>Scenario Score: {currentScore} / 100 Points</h4>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={handleRestart}>
                  <RotateCcw size={14} /> Restart Scenario
                </button>
              </div>

              {/* Forensic Debriefing Report */}
              <div className="forensic-debrief-card">
                <div className="debrief-heading">
                  <Terminal size={16} className="text-highlight" />
                  <span>SOC Analyst Debriefing Report</span>
                </div>
                <div className="debrief-content">
                  <div className="debrief-item">
                    <strong>Threat Summary:</strong>
                    <p>{scenario.forensicReport.summary}</p>
                  </div>
                  <div className="debrief-item">
                    <strong>Adversary Objective:</strong>
                    <p>{scenario.forensicReport.threatActorObjective}</p>
                  </div>
                  <div className="debrief-item">
                    <strong>Enterprise Mitigation:</strong>
                    <p>{scenario.forensicReport.socMitigation}</p>
                  </div>
                  <div className="debrief-item highlight-lesson">
                    <strong>Key Defensive Takeaway:</strong>
                    <p>{scenario.forensicReport.keyLesson}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Interception Modal */}
      <SafeInterceptionModal 
        isOpen={!!interceptionUrl}
        onClose={() => setInterceptionUrl(null)}
        url={interceptionUrl}
        context={scenario.title}
      />
    </div>
  );
}
