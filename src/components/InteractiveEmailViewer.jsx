import React, { useState } from 'react';
import { CheckCircle, Info, MousePointerClick } from 'lucide-react';
import SafeInterceptionModal from './SafeInterceptionModal';

export default function InteractiveEmailViewer() {
  const [activeZone, setActiveZone] = useState(null);
  const [inspectedZones, setInspectedZones] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const zones = {
    sender: {
      id: 'sender',
      title: 'Deceptive Sender Address & Display Name',
      severity: 'Critical Red Flag',
      explanation: 'The Display Name claims to be "PayPal Security", but the actual domain is "paypa1-security-alert.com" with a digit "1" replacing the letter "l". Legitimate PayPal notices come strictly from @paypal.com or @mail.paypal.com.',
      recommendation: 'Always expand the full sender address on mobile and desktop email clients to examine the exact root domain.'
    },
    subject: {
      id: 'subject',
      title: 'Artificial Urgency & Threat Lure',
      severity: 'High Red Flag',
      explanation: 'Threatening suspension within "24 hours" creates panic to force rapid, uncritical compliance. Legitimate financial institutions do not permanently close accounts on single-day ultimatums without prior notice.',
      recommendation: 'Pause whenever an email provokes panic, fear, or rushed deadlines. Emotional urgency is social engineering indicator #1.'
    },
    replyTo: {
      id: 'replyTo',
      title: 'Mismatched Reply-To Header',
      severity: 'Critical Red Flag',
      explanation: 'The email sets a hidden "Reply-To" destination pointing to "recovery-collector-88@gmail.com". If a victim replies with questions or documents, the reply bypasses corporate servers straight to the criminal’s private inbox.',
      recommendation: 'Inspect message headers or check the recipient field when hitting reply before sending sensitive data.'
    },
    ctaButton: {
      id: 'ctaButton',
      title: 'Counterfeit Destination Hyperlink',
      severity: 'Critical Red Flag',
      explanation: 'The button displays "Resolve Restriction Now", but the underlying hyperlink points to an insecure HTTP address on a malicious lookalike domain: "http://paypa1-update-auth.top/login".',
      recommendation: 'Never click buttons in unverified security emails. Navigate manually by typing "paypal.com" directly into your browser.'
    },
    footer: {
      id: 'footer',
      title: 'Superficial Trust Seals & Copyright',
      severity: 'Deceptive Cover',
      explanation: 'The attacker copied verbatim the official copyright disclaimer and PayPal security seal. Anyone can copy HTML, CSS, and logos. The presence of trust badges is never proof of security.',
      recommendation: 'Evaluate an email by its cryptographic headers and domain, not by decorative graphics and copyright claims.'
    }
  };

  const handleZoneClick = (zoneKey) => {
    setActiveZone(zoneKey);
    if (!inspectedZones.includes(zoneKey)) {
      setInspectedZones([...inspectedZones, zoneKey]);
    }
  };

  return (
    <div className="interactive-exercise-container glass-panel">
      <div className="exercise-header">
        <div>
          <span className="badge badge-info">Interactive Lab Exercise</span>
          <h3 style={{ marginTop: '0.35rem' }}>Email Dissection Tool: Inspect the Red Flags</h3>
          <p style={{ marginTop: '0.2rem' }}>
            Click on highlighted hotspots (or flagged elements) within the simulated email to analyze each suspicious indicator like a SOC analyst.
          </p>
        </div>
        <div className="inspection-counter">
          <span className="counter-text">Indicators Discovered:</span>
          <span className="counter-pill">{inspectedZones.length} / 5</span>
        </div>
      </div>

      <div className="email-dissection-grid">
        {/* Email Client Window */}
        <div className="email-client-mockup">
          <div className="email-client-titlebar">
            <div className="window-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <span className="window-title">Inbound Message — Security Inspector</span>
          </div>

          <div className="email-headers-section">
            <div 
              className={`header-row clickable-hotspot ${activeZone === 'sender' ? 'active-hotspot' : ''}`}
              onClick={() => handleZoneClick('sender')}
            >
              <span className="header-label">From:</span>
              <div className="header-value">
                <span className="display-name">PayPal Security Alert</span>
                <span className="spoofed-address">&lt;support@paypa1-security-alert.com&gt;</span>
                <span className="hotspot-pin">🔍 Click to inspect</span>
              </div>
            </div>

            <div 
              className={`header-row clickable-hotspot ${activeZone === 'replyTo' ? 'active-hotspot' : ''}`}
              onClick={() => handleZoneClick('replyTo')}
            >
              <span className="header-label">Reply-To:</span>
              <div className="header-value">
                <span className="spoofed-address" style={{ color: '#fb7185' }}>recovery-collector-88@gmail.com</span>
                <span className="hotspot-pin">🔍 Click to inspect</span>
              </div>
            </div>

            <div className="header-row">
              <span className="header-label">To:</span>
              <div className="header-value">you@acme-corp.com</div>
            </div>

            <div 
              className={`header-row clickable-hotspot ${activeZone === 'subject' ? 'active-hotspot' : ''}`}
              onClick={() => handleZoneClick('subject')}
            >
              <span className="header-label">Subject:</span>
              <div className="header-value urgent-subject">
                ⚠️ URGENT: Your PayPal Account Has Been Suspended Within 24h
                <span className="hotspot-pin">🔍 Click to inspect</span>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="email-body-content">
            <div className="paypal-logo-bar">
              <span className="mock-logo">Pay<span style={{ color: '#0079c1' }}>Pal</span></span>
              <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>Security Notification</span>
            </div>

            <p style={{ marginTop: '1rem', color: '#334155', fontWeight: '600' }}>Dear Customer,</p>
            <p style={{ marginTop: '0.65rem', color: '#475569', fontSize: '0.92rem' }}>
              We noticed suspicious login attempts to your digital wallet from an unauthorized location (IP: 194.26.29.112). 
              To safeguard your funds and connected credit cards, your account privileges have been restricted.
            </p>
            <p style={{ marginTop: '0.65rem', color: '#475569', fontSize: '0.92rem' }}>
              You must verify your billing profile within <strong>24 hours</strong> of receiving this notice. Failure to do so will result in permanent account termination and forfeiture of pending balances.
            </p>

            <div 
              className={`email-cta-box clickable-hotspot ${activeZone === 'ctaButton' ? 'active-hotspot' : ''}`}
              onClick={() => {
                handleZoneClick('ctaButton');
                setModalOpen(true);
              }}
            >
              <button className="email-cta-btn">
                Resolve Restriction Now
              </button>
              <div className="link-destination-preview">
                <MousePointerClick size={14} />
                <span>Simulated link: <code>http://paypa1-update-auth.top/login</code> (Click to test safe interception)</span>
              </div>
            </div>

            <div 
              className={`email-footer-box clickable-hotspot ${activeZone === 'footer' ? 'active-hotspot' : ''}`}
              onClick={() => handleZoneClick('footer')}
            >
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Copyright © 1999-2026 PayPal, Inc. All rights reserved. 2211 North First Street, San Jose, CA 95131.
                Protected by 256-bit SSL Encryption.
              </p>
              <span className="hotspot-pin" style={{ marginTop: '0.35rem' }}>🔍 Click to inspect</span>
            </div>
          </div>
        </div>

        {/* Analyst Inspection Panel */}
        <div className="analyst-inspection-panel">
          {activeZone ? (
            <div className="panel-active-content fade-in">
              <div className="panel-status-bar">
                <span className="badge badge-danger">{zones[activeZone].severity}</span>
                <span className="inspector-tag">Analyst Finding</span>
              </div>
              <h4 style={{ color: '#ffffff', marginTop: '0.5rem' }}>{zones[activeZone].title}</h4>
              <p style={{ marginTop: '0.65rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
                {zones[activeZone].explanation}
              </p>
              <div className="analyst-recommendation">
                <strong style={{ color: '#38bdf8', fontSize: '0.85rem' }}>Defensive Countermeasure:</strong>
                <p style={{ marginTop: '0.25rem', fontSize: '0.86rem', color: '#94a3b8' }}>
                  {zones[activeZone].recommendation}
                </p>
              </div>
            </div>
          ) : (
            <div className="panel-empty-content">
              <Info size={40} className="text-highlight" style={{ margin: '0 auto 1rem', opacity: 0.7 }} />
              <h4>Select an Indicator to Inspect</h4>
              <p style={{ marginTop: '0.5rem', fontSize: '0.88rem' }}>
                Click on the sender address, Reply-To header, subject line, verification button, or footer disclaimer to reveal forensic analysis findings.
              </p>
            </div>
          )}

          <div className="inspection-progress-checklist">
            <h5 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Checklist of Suspicious Elements:
            </h5>
            {Object.keys(zones).map((key) => {
              const isDone = inspectedZones.includes(key);
              return (
                <div 
                  key={key} 
                  className={`checklist-item ${isDone ? 'done' : ''}`}
                  onClick={() => handleZoneClick(key)}
                >
                  {isDone ? (
                    <CheckCircle size={16} className="text-safe" />
                  ) : (
                    <div className="unchecked-circle"></div>
                  )}
                  <span>{zones[key].title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <SafeInterceptionModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        url="http://paypa1-update-auth.top/login"
        context="simulated PayPal phishing email"
      />
    </div>
  );
}
