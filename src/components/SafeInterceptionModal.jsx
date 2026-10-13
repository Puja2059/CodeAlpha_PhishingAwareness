import React from 'react';
import { ShieldAlert, AlertTriangle, X } from 'lucide-react';

export default function SafeInterceptionModal({ isOpen, onClose, url, context = 'email link' }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-badge">
            <ShieldAlert size={28} className="text-danger" />
          </div>
          <div>
            <span className="badge badge-danger">Training Interception</span>
            <h3 id="modal-title" style={{ marginTop: '0.25rem' }}>Simulated Phishing Link Intercepted!</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="alert-callout-danger">
            <AlertTriangle size={20} className="text-danger flex-shrink-0" />
            <div>
              <strong>In a real phishing attack, your credentials or device could have been compromised!</strong>
              <p style={{ marginTop: '0.35rem', fontSize: '0.88rem', color: '#fecdd3' }}>
                You clicked a simulated phishing link inside this {context}. This training platform intercepted the request safely. No real network connection was made.
              </p>
            </div>
          </div>

          <div className="intercepted-url-box">
            <div className="url-box-label">Intercepted Destination URL:</div>
            <code className="intercepted-url-text">{url || 'http://simulated-phishing-destination.test/login'}</code>
          </div>

          <div className="forensic-insight-box">
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem', color: '#38bdf8' }}>Forensic Observation:</h4>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><strong>Deceptive Domain:</strong> Notice how the domain string mimics a trusted brand using subdomains, alternative TLDs, or character substitutions.</li>
              <li><strong>Credential Harvest Hazard:</strong> Real attacks route victims to counterfeit login forms identical to the authentic service to capture usernames, passwords, and 2FA codes.</li>
              <li><strong>Best Practice:</strong> Always inspect link destinations prior to clicking by hovering over them, or navigate directly to official websites using trusted bookmarks.</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            I Understand — Return to Training
          </button>
        </div>
      </div>
    </div>
  );
}
