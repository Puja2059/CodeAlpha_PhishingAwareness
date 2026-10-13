import React, { useState } from 'react';
import { 
  Shield, BookOpen, FlaskConical, Award, Info, 
  Menu, X, Sparkles, ChevronRight 
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  securityRank, 
  totalPoints, 
  progressPercentage 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'modules', label: 'Learning Modules', icon: BookOpen },
    { id: 'simulation', label: 'Simulation Lab', icon: FlaskConical },
    { id: 'assessment', label: 'Assessment', icon: Award },
    { id: 'about', label: 'About Project', icon: Info },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand / Logo */}
        <div className="navbar-brand" onClick={() => handleNavClick('dashboard')}>
          <div className="brand-logo-icon">
            <Shield size={24} className="text-cyan-primary" />
          </div>
          <div className="brand-text-block">
            <span className="brand-title">CodeAlpha<span className="brand-accent">.Phishing</span></span>
            <span className="brand-subtitle">Interactive Awareness Platform</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-links" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Security IQ & Points Widget */}
        <div className="navbar-right-widget">
          <div className="security-iq-pill" title={`${totalPoints} Points Earned`}>
            <Sparkles size={14} style={{ color: securityRank.color }} />
            <div className="iq-text-block">
              <span className="rank-name" style={{ color: securityRank.color }}>
                {securityRank.title}
              </span>
              <span className="points-tally">{totalPoints} pts • {progressPercentage}%</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer glass-panel fade-in">
          <div className="mobile-drawer-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`mobile-drawer-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="drawer-arrow" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
