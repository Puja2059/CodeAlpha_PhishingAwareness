import { useState, useEffect, useCallback, useMemo } from 'react';
import { loadStoredProgress, saveStoredProgress, clearStoredProgress, DEFAULT_STATE } from '../utils/storage';
import { BADGES_DATA } from '../data/badgesData';

export function useProgress() {
  const [state, setState] = useState(() => loadStoredProgress());

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveStoredProgress(state);
  }, [state]);

  // Mark module as complete
  const markModuleComplete = useCallback((moduleId) => {
    setState((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId]
      };
    });
  }, []);

  // Submit analysis for simulation scenario
  const submitScenarioAnalysis = useCallback((scenarioId, userSelections, correctIndicatorIds, totalPossiblePoints = 100) => {
    // Scoring logic:
    // +points for each correct indicator identified
    // -penalty for false positives (identifying non-red-flags)
    const correctlyIdentified = userSelections.filter((id) => correctIndicatorIds.includes(id));
    const falsePositives = userSelections.filter((id) => !correctIndicatorIds.includes(id));

    const pointPerFlag = totalPossiblePoints / Math.max(correctIndicatorIds.length, 1);
    let calculatedScore = Math.round(correctlyIdentified.length * pointPerFlag) - (falsePositives.length * 15);
    calculatedScore = Math.max(10, Math.min(totalPossiblePoints, calculatedScore));

    setState((prev) => {
      const alreadyCompleted = prev.completedScenarios.includes(scenarioId);
      const newCompleted = alreadyCompleted ? prev.completedScenarios : [...prev.completedScenarios, scenarioId];
      const previousBest = prev.scenarioScores[scenarioId] || 0;

      return {
        ...prev,
        completedScenarios: newCompleted,
        scenarioScores: {
          ...prev.scenarioScores,
          [scenarioId]: Math.max(previousBest, calculatedScore)
        },
        scenarioFindings: {
          ...prev.scenarioFindings,
          [scenarioId]: {
            selected: userSelections,
            score: calculatedScore,
            completedAt: new Date().toISOString()
          }
        }
      };
    });

    return calculatedScore;
  }, []);

  // Record final quiz attempt
  const recordQuizResult = useCallback((score, total) => {
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 80;

    setState((prev) => {
      const newAttempts = [
        ...prev.quizAttempts,
        {
          date: new Date().toISOString(),
          score,
          total,
          percentage,
          passed
        }
      ];

      const bestScore = Math.max(prev.bestQuizScore || 0, percentage);
      const nowPassed = prev.assessmentPassed || passed;

      return {
        ...prev,
        quizAttempts: newAttempts,
        bestQuizScore: bestScore,
        assessmentPassed: nowPassed,
        completedModules: nowPassed && !prev.completedModules.includes(6)
          ? [...prev.completedModules, 6]
          : prev.completedModules
      };
    });

    return { percentage, passed };
  }, []);

  // Toggle prevention checklist item
  const toggleChecklist = useCallback((itemId) => {
    setState((prev) => {
      const current = prev.checklist[itemId];
      return {
        ...prev,
        checklist: {
          ...prev.checklist,
          [itemId]: !current
        }
      };
    });
  }, []);

  // Reset entire progress
  const resetProgress = useCallback(() => {
    clearStoredProgress();
    setState(DEFAULT_STATE);
  }, []);

  // Dynamic calculations
  const totalPoints = useMemo(() => {
    // 50 pts per completed module (max 300)
    const modulePoints = state.completedModules.length * 50;
    // Scenario points from scores object (max 500)
    const scenarioPoints = Object.values(state.scenarioScores || {}).reduce((acc, curr) => acc + curr, 0);
    // Assessment points: up to 200 pts based on best percentage
    const assessmentPoints = state.bestQuizScore ? Math.round((state.bestQuizScore / 100) * 200) : 0;

    return modulePoints + scenarioPoints + assessmentPoints;
  }, [state.completedModules, state.scenarioScores, state.bestQuizScore]);

  const securityRank = useMemo(() => {
    if (totalPoints >= 850) return { title: 'Cyber Sentinel Master', color: '#10b981', tier: 'Master' };
    if (totalPoints >= 600) return { title: 'Cyber Defense Analyst', color: '#06b6d4', tier: 'Advanced' };
    if (totalPoints >= 350) return { title: 'Threat Hunter', color: '#38bdf8', tier: 'Intermediate' };
    if (totalPoints >= 150) return { title: 'Aware Sentinel', color: '#f59e0b', tier: 'Apprentice' };
    return { title: 'Cyber Recruit', color: '#94a3b8', tier: 'Beginner' };
  }, [totalPoints]);

  const overallProgressPercentage = useMemo(() => {
    // 6 modules (weight: 45%), 5 scenarios (weight: 35%), assessment (weight: 20%)
    const moduleWeight = (state.completedModules.length / 6) * 45;
    const scenarioWeight = (state.completedScenarios.length / 5) * 35;
    const assessmentWeight = state.assessmentPassed ? 20 : (state.bestQuizScore > 0 ? (state.bestQuizScore / 100) * 15 : 0);

    return Math.min(100, Math.round(moduleWeight + scenarioWeight + assessmentWeight));
  }, [state.completedModules, state.completedScenarios, state.assessmentPassed, state.bestQuizScore]);

  const unlockedBadges = useMemo(() => {
    return BADGES_DATA.filter((badge) => badge.condition(state));
  }, [state]);

  return {
    state,
    markModuleComplete,
    submitScenarioAnalysis,
    recordQuizResult,
    toggleChecklist,
    resetProgress,
    totalPoints,
    securityRank,
    overallProgressPercentage,
    unlockedBadges
  };
}
