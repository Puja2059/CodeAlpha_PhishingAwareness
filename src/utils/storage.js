const STORAGE_KEY = 'codealpha_phishing_awareness_state_v1';

export const DEFAULT_STATE = {
  completedModules: [],
  completedScenarios: [],
  scenarioScores: {},
  scenarioFindings: {},
  quizAttempts: [],
  bestQuizScore: 0,
  assessmentPassed: false,
  checklist: {},
  totalPoints: 0,
  lastUpdated: new Date().toISOString()
};

export const loadStoredProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed
    };
  } catch (error) {
    console.warn('Unable to load progress from localStorage (fallback to defaults):', error);
    return DEFAULT_STATE;
  }
};

export const saveStoredProgress = (state) => {
  try {
    const stateToSave = {
      ...state,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    return true;
  } catch (error) {
    console.warn('Unable to save progress to localStorage:', error);
    return false;
  }
};

export const clearStoredProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.warn('Unable to clear localStorage:', error);
    return false;
  }
};
