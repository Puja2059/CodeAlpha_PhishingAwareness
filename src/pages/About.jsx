import React from 'react';
import { Shield, Code2, Cpu, Lock, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page-container fade-in">
      {/* Hero */}
      <div className="about-hero glass-panel">
        <span className="badge badge-info">Internship Project Documentation</span>
        <h1 style={{ marginTop: '0.4rem' }}>About Phishing Awareness Training</h1>
        <p style={{ marginTop: '0.35rem', maxWidth: '800px' }}>
          This project was designed and built as part of the <strong>CodeAlpha Cyber Security Internship (Task 2)</strong> to bridge the gap between abstract cybersecurity theory and practical defensive instincts.
        </p>
      </div>

      <div className="about-sections-grid">
        {/* Project Purpose */}
        <div className="about-card glass-panel">
          <div className="about-card-icon-wrap">
            <Shield size={24} className="text-cyan-primary" />
          </div>
          <h3>The Cybersecurity Problem</h3>
          <p style={{ marginTop: '0.5rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
            Traditional security awareness often relies on passive annual PowerPoint slides or mandatory corporate videos that fail to engage users. Despite multi-million-dollar endpoint defenses and next-generation firewalls, over <strong>85% of cybersecurity breaches still begin with a human action</strong>—clicking a deceptive link, downloading an invoice disguised as an executable, or trusting an urgent voice call.
          </p>
          <p style={{ marginTop: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            This platform transforms passive listeners into active investigators through hands-on simulations, interactive dissection tools, and realistic workplace pretexts.
          </p>
        </div>

        {/* Core Educational Pillars */}
        <div className="about-card glass-panel">
          <div className="about-card-icon-wrap">
            <Cpu size={24} className="text-safe" />
          </div>
          <h3>Core Educational Pillars</h3>
          <ul className="about-feature-list" style={{ marginTop: '0.5rem' }}>
            <li>
              <strong>Header Forensic Dissection:</strong> Distinguish superficial display names from envelope sender domains and identify mismatched reply-to headers.
            </li>
            <li>
              <strong>Domain Architecture & Padlock Fallacy:</strong> Understand that HTTPS padlocks signify encryption in transit, not legitimacy, and analyze lookalike root domains.
            </li>
            <li>
              <strong>Cognitive Pretexts:</strong> Recognize how urgency, fear, authority, and isolation are weaponized in Business Email Compromise (BEC).
            </li>
            <li>
              <strong>Phishing-Resistant MFA:</strong> Learn why FIDO2 passkeys defeat AitM reverse proxies while SMS codes remain vulnerable.
            </li>
          </ul>
        </div>

        {/* Technology Architecture */}
        <div className="about-card glass-panel">
          <div className="about-card-icon-wrap">
            <Code2 size={24} className="text-highlight" />
          </div>
          <h3>Technology Stack & Design</h3>
          <p style={{ marginTop: '0.5rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
            Architected to run entirely client-side without external backend dependencies, API keys, or tracking scripts:
          </p>
          <div className="tech-badge-pills" style={{ marginTop: '0.75rem' }}>
            <span className="badge badge-info">React 19</span>
            <span className="badge badge-info">Vite 8</span>
            <span className="badge badge-info">Lucide React</span>
            <span className="badge badge-info">Vanilla CSS Tokens</span>
            <span className="badge badge-info">Browser LocalStorage</span>
            <span className="badge badge-info">GitHub Pages Compatible</span>
          </div>
          <p style={{ marginTop: '0.75rem', color: '#94a3b8', fontSize: '0.88rem' }}>
            Zero third-party trackers, zero cookies, zero external API keys. Fast loading, responsive on mobile devices, and accessible.
          </p>
        </div>

        {/* Ethical Safeguards & Simulation Disclaimer */}
        <div className="about-card glass-panel">
          <div className="about-card-icon-wrap">
            <Lock size={24} className="text-warning" />
          </div>
          <h3>Safety & Ethical Governance</h3>
          <p style={{ marginTop: '0.5rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
            This platform strictly adheres to ethical cybersecurity training guidelines:
          </p>
          <ul className="about-feature-list" style={{ marginTop: '0.5rem' }}>
            <li>All domains and emails (e.g., <code>.online</code>, <code>.biz</code>, <code>.top</code>) are fictional sandboxed identifiers.</li>
            <li>No actual credentials, passwords, or personal identity numbers (PII) are ever solicited or stored.</li>
            <li>Clicking simulated links in emails or SMS displays safe educational interception modals; no malicious servers are ever contacted.</li>
            <li>Designed exclusively for benign, defensive awareness education.</li>
          </ul>
        </div>
      </div>

      {/* CodeAlpha Attribution Box */}
      <div className="codealpha-attribution-card glass-panel" style={{ marginTop: '2rem' }}>
        <div className="attribution-content">
          <Award size={36} className="text-cyan-primary" />
          <div>
            <h3>CodeAlpha Cyber Security Internship — Task 2</h3>
            <p style={{ marginTop: '0.25rem', color: '#cbd5e1' }}>
              Project: <strong>Interactive Phishing Awareness Training Platform</strong>
            </p>
            <p style={{ marginTop: '0.2rem', color: '#94a3b8', fontSize: '0.88rem' }}>
              Suitable for LinkedIn demonstration videos, GitHub publication (<code>CodeAlpha_PhishingAwareness</code>), and cybersecurity portfolio showcases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
