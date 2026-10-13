import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_STATE } from '../src/utils/storage.js';
import { BADGES_DATA } from '../src/data/badgesData.js';
import { MODULES_DATA } from '../src/data/modulesData.js';
import { QUESTIONS_DATA } from '../src/data/questionsData.js';
import { SCENARIOS_DATA } from '../src/data/scenariosData.js';

describe('Storage & Default State', () => {
  it('DEFAULT_STATE contains expected structure and properties', () => {
    assert.deepEqual(DEFAULT_STATE.completedModules, []);
    assert.deepEqual(DEFAULT_STATE.completedScenarios, []);
    assert.deepEqual(DEFAULT_STATE.scenarioScores, {});
    assert.deepEqual(DEFAULT_STATE.scenarioFindings, {});
    assert.deepEqual(DEFAULT_STATE.quizAttempts, []);
    assert.equal(DEFAULT_STATE.bestQuizScore, 0);
    assert.equal(DEFAULT_STATE.assessmentPassed, false);
    assert.deepEqual(DEFAULT_STATE.checklist, {});
    assert.equal(DEFAULT_STATE.totalPoints, 0);
    assert.ok(typeof DEFAULT_STATE.lastUpdated === 'string');
  });
});

describe('Curriculum Data Integrity', () => {
  it('has 6 learning modules with valid IDs and categories', () => {
    assert.equal(MODULES_DATA.length, 6);
    MODULES_DATA.forEach((mod, idx) => {
      assert.equal(mod.id, idx + 1);
      assert.ok(mod.title && mod.title.length > 5);
      assert.ok(mod.category);
      assert.ok(mod.estimatedMinutes > 0);
      assert.ok(Array.isArray(mod.sections) && mod.sections.length > 0);
      if (mod.quickCheck) {
        assert.ok(typeof mod.quickCheck.question === 'string');
        assert.ok(Array.isArray(mod.quickCheck.options) && mod.quickCheck.options.length >= 2);
        assert.ok(mod.quickCheck.correctIndex >= 0 && mod.quickCheck.correctIndex < mod.quickCheck.options.length);
      } else {
        assert.ok(mod.isAssessment, `Module ${mod.id} without quickCheck should have isAssessment flag`);
      }
    });
  });

  it('has 5 phishing simulation scenarios with indicators and forensic reports', () => {
    assert.equal(SCENARIOS_DATA.length, 5);
    SCENARIOS_DATA.forEach((scenario) => {
      assert.ok(scenario.id);
      assert.ok(scenario.title);
      assert.ok(['email', 'sms'].includes(scenario.scenarioType));
      assert.ok(['Easy', 'Medium', 'Hard'].includes(scenario.difficulty));
      assert.ok(scenario.simulatedUrl);
      assert.ok(Array.isArray(scenario.indicators) && scenario.indicators.length >= 4);

      // Verify each scenario has at least one true red flag
      const redFlags = scenario.indicators.filter((ind) => ind.isRedFlag);
      assert.ok(redFlags.length >= 2, `Scenario ${scenario.id} should have at least 2 red flags`);

      // Verify each scenario has forensic report
      assert.ok(scenario.forensicReport && scenario.forensicReport.summary);
      assert.ok(scenario.forensicReport.keyLesson);
    });
  });

  it('has 12 assessment questions with valid options and correct answer indices', () => {
    assert.equal(QUESTIONS_DATA.length, 12);
    QUESTIONS_DATA.forEach((q, idx) => {
      assert.equal(q.id, idx + 1);
      assert.ok(q.question && q.question.length > 10);
      assert.equal(q.options.length, 4, `Question ${q.id} should have exactly 4 options`);
      assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
      assert.ok(q.explanation && q.explanation.length > 10);
    });
  });
});

describe('Badge Awarding Conditions', () => {
  it('correctly evaluates badge unlock predicates', () => {
    assert.equal(BADGES_DATA.length, 7);

    // Initial state unlocks no badges
    const initial = { ...DEFAULT_STATE };
    const unlockedInitial = BADGES_DATA.filter((b) => b.condition(initial));
    assert.equal(unlockedInitial.length, 0);

    // Completing module 1 unlocks 'first-step'
    const afterMod1 = { ...initial, completedModules: [1] };
    const unlockedMod1 = BADGES_DATA.filter((b) => b.condition(afterMod1));
    assert.equal(unlockedMod1.length, 1);
    assert.equal(unlockedMod1[0].id, 'first-step');

    // Completing all 6 modules unlocks modules 1..5 badges
    const allMods = { ...initial, completedModules: [1, 2, 3, 4, 5, 6] };
    const unlockedMods = BADGES_DATA.filter((b) => b.condition(allMods));
    assert.equal(unlockedMods.length, 5); // first-step, email-sleuth, domain-sentinel, psy-shield, defense-architect

    // Completing all 5 scenarios unlocks lab-master
    const allScenarios = { ...initial, completedScenarios: ['s1', 's2', 's3', 's4', 's5'] };
    const unlockedScenarios = BADGES_DATA.filter((b) => b.condition(allScenarios));
    assert.equal(unlockedScenarios.length, 1);
    assert.equal(unlockedScenarios[0].id, 'lab-master');

    // Passing assessment unlocks certified-hunter
    const passed = { ...initial, assessmentPassed: true, bestQuizScore: 92 };
    const unlockedPassed = BADGES_DATA.filter((b) => b.condition(passed));
    assert.equal(unlockedPassed.length, 1);
    assert.equal(unlockedPassed[0].id, 'certified-hunter');

    // Full mastery unlocks all 7 badges
    const master = {
      ...initial,
      completedModules: [1, 2, 3, 4, 5, 6],
      completedScenarios: ['s1', 's2', 's3', 's4', 's5'],
      assessmentPassed: true,
      bestQuizScore: 100
    };
    const unlockedMaster = BADGES_DATA.filter((b) => b.condition(master));
    assert.equal(unlockedMaster.length, 7);
  });
});

describe('Scoring & Progression Formulas', () => {
  it('scenario indicator scoring handles correct detections, penalties, and clamping', () => {
    // Mimic the scoring formula in useProgress.js
    const calculateScenarioScore = (userSelections, correctIndicatorIds, totalPossible = 100) => {
      const correctlyIdentified = userSelections.filter((id) => correctIndicatorIds.includes(id));
      const falsePositives = userSelections.filter((id) => !correctIndicatorIds.includes(id));
      const pointPerFlag = totalPossible / Math.max(correctIndicatorIds.length, 1);
      let score = Math.round(correctlyIdentified.length * pointPerFlag) - (falsePositives.length * 15);
      return Math.max(10, Math.min(totalPossible, score));
    };

    const correctIds = ['f1', 'f2', 'f3', 'f4']; // 4 red flags (25 pts each)

    // Perfect selection
    assert.equal(calculateScenarioScore(['f1', 'f2', 'f3', 'f4'], correctIds), 100);

    // 2 correct, 0 false positives -> 50 pts
    assert.equal(calculateScenarioScore(['f1', 'f2'], correctIds), 50);

    // 2 correct (50 pts) - 1 false positive (-15 pts) -> 35 pts
    assert.equal(calculateScenarioScore(['f1', 'f2', 'distractor1'], correctIds), 35);

    // 0 correct, 3 false positives (-45 pts) -> clamped to minimum 10 pts
    assert.equal(calculateScenarioScore(['d1', 'd2', 'd3'], correctIds), 10);
  });

  it('calculates total points and security tiers correctly', () => {
    const calcPoints = (completedModules, scenarioScores, bestQuizScore) => {
      const modulePoints = completedModules.length * 50;
      const scenarioPoints = Object.values(scenarioScores || {}).reduce((a, b) => a + b, 0);
      const assessmentPoints = bestQuizScore ? Math.round((bestQuizScore / 100) * 200) : 0;
      return modulePoints + scenarioPoints + assessmentPoints;
    };

    const getRank = (points) => {
      if (points >= 850) return 'Cyber Sentinel Master';
      if (points >= 600) return 'Cyber Defense Analyst';
      if (points >= 350) return 'Threat Hunter';
      if (points >= 150) return 'Aware Sentinel';
      return 'Cyber Recruit';
    };

    // Initial state: 0 points -> Cyber Recruit
    assert.equal(calcPoints([], {}, 0), 0);
    assert.equal(getRank(0), 'Cyber Recruit');

    // 3 modules: 150 points -> Aware Sentinel
    const p150 = calcPoints([1, 2, 3], {}, 0);
    assert.equal(p150, 150);
    assert.equal(getRank(p150), 'Aware Sentinel');

    // 6 modules (300) + 1 scenario (80): 380 -> Threat Hunter
    const p380 = calcPoints([1, 2, 3, 4, 5, 6], { s1: 80 }, 0);
    assert.equal(p380, 380);
    assert.equal(getRank(p380), 'Threat Hunter');

    // 6 modules (300) + 4 scenarios (320): 620 -> Cyber Defense Analyst
    const p620 = calcPoints([1, 2, 3, 4, 5, 6], { s1: 80, s2: 80, s3: 80, s4: 80 }, 0);
    assert.equal(p620, 620);
    assert.equal(getRank(p620), 'Cyber Defense Analyst');

    // 6 modules (300) + 5 scenarios (450) + 90% exam (180) = 930 -> Cyber Sentinel Master
    const p930 = calcPoints([1, 2, 3, 4, 5, 6], { s1: 90, s2: 90, s3: 90, s4: 90, s5: 90 }, 90);
    assert.equal(p930, 930);
    assert.equal(getRank(p930), 'Cyber Sentinel Master');
  });

  it('overall progress percentage weights modules (45%), scenarios (35%), and exam (20%)', () => {
    const calcProgress = (modulesCount, scenariosCount, passed, bestQuizScore) => {
      const moduleWeight = (modulesCount / 6) * 45;
      const scenarioWeight = (scenariosCount / 5) * 35;
      const assessmentWeight = passed ? 20 : (bestQuizScore > 0 ? (bestQuizScore / 100) * 15 : 0);
      return Math.min(100, Math.round(moduleWeight + scenarioWeight + assessmentWeight));
    };

    assert.equal(calcProgress(0, 0, false, 0), 0);
    assert.equal(calcProgress(6, 0, false, 0), 45); // All modules
    assert.equal(calcProgress(0, 5, false, 0), 35); // All scenarios
    assert.equal(calcProgress(6, 5, false, 0), 80); // Modules + scenarios
    assert.equal(calcProgress(6, 5, true, 85), 100); // 100% complete
  });
});
