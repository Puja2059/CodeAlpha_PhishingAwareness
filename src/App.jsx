import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import LearningModules from './pages/LearningModules';
import ModuleDetail from './pages/ModuleDetail';
import SimulationLab from './pages/SimulationLab';
import Assessment from './pages/Assessment';
import About from './pages/About';
import { useProgress } from './hooks/useProgress';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeModuleId, setActiveModuleId] = useState(1);

  const {
    state: progressState,
    markModuleComplete,
    submitScenarioAnalysis,
    recordQuizResult,
    toggleChecklist,
    resetProgress,
    totalPoints,
    securityRank,
    overallProgressPercentage
  } = useProgress();

  const handleSelectModule = (moduleId) => {
    setActiveModuleId(moduleId);
    setActiveTab('module-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCurriculum = () => {
    setActiveTab('modules');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Navbar 
        activeTab={activeTab === 'module-detail' ? 'modules' : activeTab}
        setActiveTab={handleNavigateTab}
        securityRank={securityRank}
        totalPoints={totalPoints}
        progressPercentage={overallProgressPercentage}
      />

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard 
            progressState={progressState}
            overallPercentage={overallProgressPercentage}
            securityRank={securityRank}
            totalPoints={totalPoints}
            onSelectModule={handleSelectModule}
            onNavigateTab={handleNavigateTab}
            onResetProgress={resetProgress}
          />
        )}

        {activeTab === 'modules' && (
          <LearningModules 
            completedModules={progressState.completedModules}
            onSelectModule={handleSelectModule}
          />
        )}

        {activeTab === 'module-detail' && (
          <ModuleDetail 
            moduleId={activeModuleId}
            onBackToCurriculum={handleBackToCurriculum}
            onSelectModule={handleSelectModule}
            onMarkComplete={markModuleComplete}
            isCompleted={progressState.completedModules.includes(activeModuleId)}
            onNavigateTab={handleNavigateTab}
            checklistState={progressState.checklist}
            onToggleChecklist={toggleChecklist}
          />
        )}

        {activeTab === 'simulation' && (
          <SimulationLab 
            progressState={progressState}
            onSubmitScenarioAnalysis={submitScenarioAnalysis}
          />
        )}

        {activeTab === 'assessment' && (
          <Assessment 
            progressState={progressState}
            onRecordQuizResult={recordQuizResult}
          />
        )}

        {activeTab === 'about' && (
          <About />
        )}
      </main>

      <Footer />
    </div>
  );
}
