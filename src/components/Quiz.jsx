import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, AlertTriangle } from 'lucide-react';

export default function Quiz({ 
  questions = [], 
  onComplete, 
  passingPercentage = 80,
  title = 'Knowledge Assessment Exam'
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  if (!questions || questions.length === 0) {
    return <div className="glass-panel" style={{ padding: '2rem' }}>No questions available.</div>;
  }

  const currentQ = questions[currentIndex];
  const userSelected = selectedAnswers[currentQ.id];

  const handleSelectOption = (optionIndex) => {
    if (isAnswerSubmitted) return; // Prevent changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleSubmitCurrentAnswer = () => {
    if (userSelected === undefined) return;
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsAnswerSubmitted(false);
    } else {
      // Calculate final score
      const correctCount = questions.filter(
        (q) => selectedAnswers[q.id] === q.correctIndex
      ).length;
      setIsFinished(true);
      if (onComplete) {
        onComplete(correctCount, questions.length);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setIsFinished(false);
    setReviewMode(false);
  };

  // Final summary stats
  const totalCorrect = questions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;
  const scorePercentage = Math.round((totalCorrect / questions.length) * 100);
  const isPassed = scorePercentage >= passingPercentage;

  if (isFinished && !reviewMode) {
    return (
      <div className="quiz-summary-card glass-panel fade-in">
        <div className="quiz-summary-badge-icon">
          {isPassed ? (
            <div className="trophy-glow-circle">
              <Award size={64} className="text-safe" />
            </div>
          ) : (
            <div className="warning-glow-circle">
              <AlertTriangle size={64} className="text-warning" />
            </div>
          )}
        </div>

        <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>
          {isPassed ? 'Assessment Passed — Certification Earned!' : 'Assessment Incomplete — Review & Try Again'}
        </h2>
        <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0.5rem auto 1.5rem' }}>
          {isPassed
            ? `Outstanding performance! You scored ${scorePercentage}%, demonstrating strong cybersecurity awareness and phishing threat detection.`
            : `You scored ${scorePercentage}%. A passing grade of ${passingPercentage}% or higher is required to earn the Phish Hunter certification badge.`}
        </p>

        <div className="quiz-score-meter-box">
          <div className="score-meter-stat">
            <span className="stat-label">Final Score</span>
            <span className={`stat-number ${isPassed ? 'text-safe' : 'text-warning'}`}>
              {scorePercentage}%
            </span>
          </div>
          <div className="score-meter-stat">
            <span className="stat-label">Correct Answers</span>
            <span className="stat-number">
              {totalCorrect} / {questions.length}
            </span>
          </div>
          <div className="score-meter-stat">
            <span className="stat-label">Required Threshold</span>
            <span className="stat-number">{passingPercentage}%</span>
          </div>
          <div className="score-meter-stat">
            <span className="stat-label">Status</span>
            <span className={`badge ${isPassed ? 'badge-safe' : 'badge-danger'}`} style={{ marginTop: '0.35rem' }}>
              {isPassed ? 'PASSED' : 'RETRY NEEDED'}
            </span>
          </div>
        </div>

        <div className="quiz-summary-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setReviewMode(true)}
          >
            Review All Answers
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleRestartQuiz}
          >
            <RotateCcw size={16} />
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-engine-container glass-panel">
      {/* Quiz Header & Progress */}
      <div className="quiz-top-bar">
        <div>
          <span className="badge badge-info">{currentQ.category || 'Cybersecurity Evaluation'}</span>
          <h3 style={{ marginTop: '0.35rem' }}>{title}</h3>
        </div>
        <div className="quiz-progress-indicator">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <div className="quiz-progress-track">
            <div 
              className="quiz-progress-fill"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="quiz-question-box">
        <div className="question-text-row">
          <span className="question-number-badge">Q{currentIndex + 1}</span>
          <p className="question-body-text">{currentQ.question}</p>
        </div>

        {/* Options */}
        <div className="quiz-options-list">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = userSelected === optIdx;
            const isCorrectOption = currentQ.correctIndex === optIdx;
            let optionClass = 'quiz-option';

            if (isAnswerSubmitted || reviewMode) {
              if (isCorrectOption) {
                optionClass += ' option-correct';
              } else if (isSelected && !isCorrectOption) {
                optionClass += ' option-wrong';
              }
            } else if (isSelected) {
              optionClass += ' option-selected';
            }

            return (
              <div
                key={optIdx}
                className={optionClass}
                onClick={() => handleSelectOption(optIdx)}
              >
                <div className="option-letter-indicator">
                  {String.fromCharCode(65 + optIdx)}
                </div>
                <div className="option-text-content">
                  {opt}
                </div>
                {(isAnswerSubmitted || reviewMode) && isCorrectOption && (
                  <CheckCircle2 size={18} className="text-safe flex-shrink-0" />
                )}
                {(isAnswerSubmitted || reviewMode) && isSelected && !isCorrectOption && (
                  <XCircle size={18} className="text-danger flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Feedback Explanation */}
        {(isAnswerSubmitted || reviewMode) && (
          <div className="quiz-explanation-box fade-in">
            <div className="explanation-title-row">
              {userSelected === currentQ.correctIndex ? (
                <div className="badge badge-safe">
                  <CheckCircle2 size={14} /> Correct!
                </div>
              ) : (
                <div className="badge badge-danger">
                  <XCircle size={14} /> Incorrect
                </div>
              )}
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Security Analysis Explanation:</span>
            </div>
            <p className="explanation-body-text">{currentQ.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="quiz-action-bar">
          {!isAnswerSubmitted && !reviewMode ? (
            <button
              className="btn btn-primary"
              disabled={userSelected === undefined}
              onClick={handleSubmitCurrentAnswer}
              style={{ opacity: userSelected === undefined ? 0.5 : 1 }}
            >
              Submit Answer
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'space-between' }}>
              {reviewMode && currentIndex > 0 && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                >
                  ← Previous
                </button>
              )}
              <div style={{ marginLeft: 'auto' }}>
                <button
                  className="btn btn-primary"
                  onClick={handleNextQuestion}
                >
                  {currentIndex < questions.length - 1 ? 'Next Question →' : 'View Results'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
