import React from 'react';
import { Shield, ExternalLink, Lock } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand & Purpose Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand-title">
              <Shield size={20} className="text-cyan-primary" />
              <span>Phishing Awareness Training</span>
            </div>
            <p className="footer-description">
              An interactive cybersecurity educational platform built for <strong>CodeAlpha Cyber Security Internship Task 2</strong>. Empowering users with hands-on skills to recognize social engineering, dissect phishing lures, and implement defense-in-depth safeguards.
            </p>
            <div className="safe-simulation-badge">
              <Lock size={14} className="text-safe" />
              <span>100% Safe Fictional Simulation • Zero Data Harvesting</span>
            </div>
          </div>

          {/* Educational Resources Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Authoritative Resources</h4>
            <ul className="footer-link-list">
              <li>
                <a
                  href="https://www.cisa.gov/secure-our-world/recognize-and-report-phishing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>CISA: Recognize & Report Phishing</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>FTC: Avoid Phishing Scams</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ncsc.gov.uk/collection/phishing-scams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>UK NCSC: Phishing Defense Guidance</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://apwg.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>Anti-Phishing Working Group (APWG)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Ethics & Disclaimer Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Simulation Safeguards</h4>
            <p className="disclaimer-text">
              All emails, domain names (e.g. <code>.online</code>, <code>.biz</code>, <code>.top</code>), phone numbers, and organizations depicted in scenarios are fictional pedagogical instruments.
            </p>
            <p className="disclaimer-text" style={{ marginTop: '0.5rem' }}>
              Designed strictly for defense, awareness, and benign education under white-hat ethical principles.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {CURRENT_YEAR} CodeAlpha Cyber Security Internship </p>

        </div>
      </div>
    </footer>
  );
}
