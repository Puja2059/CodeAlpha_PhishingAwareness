import React from 'react';
import { Award, FileCheck } from 'lucide-react';
import Quiz from '../components/Quiz';
import { QUESTIONS_DATA } from '../data/questionsData';

export default function Assessment({ 
  progressState, 
  onRecordQuizResult 
}) {
  const attempts = progressState.quizAttempts || [];
  const bestScore = progressState.bestQuizScore || 0;
  const isPassed = progressState.assessmentPassed;

  return (
    <div className="assessment-page-container fade-in">
      {/* Assessment Hero */}
      <div className="assessment-hero glass-panel">
        <div className="assessment-hero-header">
          <div>
            <div className="assessment-hero-tags">
              <span className="badge badge-info">Final Certification Exam</span>
              <span className="badge badge-safe">Passing Threshold: 80%</span>
            </div>
            <h1 style={{ marginTop: '0.4rem' }}>Comprehensive Knowledge Assessment</h1>
            <p style={{ marginTop: '0.35rem', maxWidth: '750px' }}>
              Validate your cybersecurity awareness and threat analysis capabilities. This 12-question exam evaluates your understanding of deceptive email headers, fake URL structures, social engineering pretexts, phishing-resistant MFA, and incident response containment.
            </p>
          </div>

          <div className="assessment-stat-widget">
            <span className="assessment-stat-title">Best Score</span>
            <span className={`assessment-score-value ${isPassed ? 'text-safe' : 'text-warning'}`}>
              {bestScore > 0 ? `${bestScore}%` : 'Not Taken'}
            </span>
            <span className={`badge ${isPassed ? 'badge-safe' : 'badge-warning'}`} style={{ marginTop: '0.35rem' }}>
              {isPassed ? 'Certified Phish Hunter' : 'Pending Certification'}
            </span>
          </div>
        </div>

        {/* Certificate Display if Passed */}
        {isPassed && (
          <div className="certificate-banner glass-panel fade-in" style={{ marginTop: '1.5rem' }}>
            <div className="cert-seal-icon">
              <Award size={48} className="text-safe" />
            </div>
            <div className="cert-text-info">
              <span className="badge badge-safe">Certification Issued</span>
              <h3 style={{ marginTop: '0.25rem' }}>Phish Hunter Pro — Competency Verified</h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                You have demonstrated proficiency in recognizing, investigating, and mitigating modern phishing and social engineering attacks for <strong>CodeAlpha Cyber Security Internship Task 2</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Quiz Engine */}
      <div className="assessment-quiz-section" style={{ marginTop: '2rem' }}>
        <Quiz 
          questions={QUESTIONS_DATA}
          passingPercentage={80}
          title="Cybersecurity Awareness Certification Exam"
          onComplete={(score, total) => {
            onRecordQuizResult(score, total);
          }}
        />
      </div>

      {/* Previous Attempts History */}
      {attempts.length > 0 && (
        <div className="attempts-history-card glass-panel" style={{ marginTop: '2.5rem' }}>
          <div className="attempts-header">
            <FileCheck size={20} className="text-highlight" />
            <h4>Examination Attempt History</h4>
          </div>
          <div className="attempts-table-wrapper">
            <table className="attempts-table">
              <thead>
                <tr>
                  <th>Attempt #</th>
                  <th>Date & Time</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((att, idx) => (
                  <tr key={idx}>
                    <td>#{idx + 1}</td>
                    <td>{new Date(att.date).toLocaleString()}</td>
                    <td>{att.score} / {att.total}</td>
                    <td>{att.percentage}%</td>
                    <td>
                      <span className={`badge ${att.passed ? 'badge-safe' : 'badge-danger'}`}>
                        {att.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
