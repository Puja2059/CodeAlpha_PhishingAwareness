import React, { useState } from 'react';
import { CheckCircle2, XCircle, ShieldAlert, Check, RefreshCw } from 'lucide-react';

const URL_SAMPLES = [
  {
    id: 1,
    url: 'https://accounts.google.com/signin/v2/identifier',
    isLegitimate: true,
    rootDomain: 'google.com',
    subdomain: 'accounts',
    tld: '.com',
    protocol: 'https://',
    verdictTitle: 'Legitimate Google Authentication Origin',
    explanation: 'The root domain immediately to the left of the path is "google.com", owned by Alphabet/Google. "accounts" is an authentic subdomain configured on Google’s official root domain.'
  },
  {
    id: 2,
    url: 'https://paypal.service-account-verification.cc/login',
    isLegitimate: false,
    rootDomain: 'service-account-verification.cc',
    subdomain: 'paypal',
    tld: '.cc',
    protocol: 'https://',
    verdictTitle: 'Phishing: Deceptive Subdomain Masquerading as PayPal',
    explanation: 'The actual registered root domain is "service-account-verification.cc". The attacker placed "paypal." into their subdomain to deceive users who glance only at the beginning of the URL. Notice the padlock is present, but the site is malicious!'
  },
  {
    id: 3,
    url: 'https://www.netflix.com/youraccount',
    isLegitimate: true,
    rootDomain: 'netflix.com',
    subdomain: 'www',
    tld: '.com',
    protocol: 'https://',
    verdictTitle: 'Legitimate Streaming Portal Origin',
    explanation: 'The root domain is "netflix.com". The "www" prefix is standard, and the path "/youraccount" is the authentic profile management path.'
  },
  {
    id: 4,
    url: 'http://bankofamerica.com-login-portal.site/auth',
    isLegitimate: false,
    rootDomain: 'com-login-portal.site',
    subdomain: 'bankofamerica',
    tld: '.site',
    protocol: 'http://',
    verdictTitle: 'Phishing: Combosquatting & Insecure HTTP Protocol',
    explanation: 'Two major red flags: 1) The protocol is unencrypted "http://", which no legitimate bank uses. 2) The root domain is "com-login-portal.site", using "bankofamerica" as a prefix with a hyphen.'
  },
  {
    id: 5,
    url: 'https://secure.chase.com.ebanking-security.net/verify',
    isLegitimate: false,
    rootDomain: 'ebanking-security.net',
    subdomain: 'secure.chase.com',
    tld: '.net',
    protocol: 'https://',
    verdictTitle: 'Phishing: Multi-Tier Subdomain Spoofing',
    explanation: 'The attacker nested "secure.chase.com" inside their custom domain "ebanking-security.net". On mobile browser screens, only "secure.chase.com..." is visible before truncating!'
  }
];

export default function InteractiveUrlInspector() {
  const [userAnswers, setUserAnswers] = useState({});
  const [activeUrlIndex, setActiveUrlIndex] = useState(0);

  const currentSample = URL_SAMPLES[activeUrlIndex];
  const correctCount = Object.values(userAnswers).filter((ans) => ans.isCorrect).length;

  const handleClassify = (isLegitChoice) => {
    const isCorrect = isLegitChoice === currentSample.isLegitimate;
    setUserAnswers((prev) => ({
      ...prev,
      [currentSample.id]: {
        choice: isLegitChoice,
        isCorrect
      }
    }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setActiveUrlIndex(0);
  };

  const currentAnswer = userAnswers[currentSample.id];

  return (
    <div className="interactive-exercise-container glass-panel">
      <div className="exercise-header">
        <div>
          <span className="badge badge-info">Interactive Lab Exercise</span>
          <h3 style={{ marginTop: '0.35rem' }}>URL Classifier: Spot Deceptive Domains</h3>
          <p style={{ marginTop: '0.2rem' }}>
            Analyze each URL and determine whether it points to a legitimate enterprise service or an adversary’s phishing server.
          </p>
        </div>
        <div className="inspection-counter">
          <span className="counter-text">Score:</span>
          <span className="counter-pill">{correctCount} / {URL_SAMPLES.length} Correct</span>
        </div>
      </div>

      {/* URL Selector Tabs */}
      <div className="url-sample-tabs">
        {URL_SAMPLES.map((sample, idx) => {
          const ans = userAnswers[sample.id];
          return (
            <button
              key={sample.id}
              className={`url-tab-btn ${activeUrlIndex === idx ? 'active' : ''} ${ans ? (ans.isCorrect ? 'tab-correct' : 'tab-incorrect') : ''}`}
              onClick={() => setActiveUrlIndex(idx)}
            >
              <span>Sample {idx + 1}</span>
              {ans && (
                ans.isCorrect ? (
                  <Check size={14} className="text-safe" />
                ) : (
                  <XCircle size={14} className="text-danger" />
                )
              )}
            </button>
          );
        })}
      </div>

      {/* Main URL Inspector Card */}
      <div className="url-inspector-card">
        <div className="browser-address-bar-mock">
          <div className="lock-indicator">
            <span className="padlock-badge">
              🔒 {currentSample.protocol.replace('://', '').toUpperCase()}
            </span>
          </div>
          <div className="url-string-display">
            <span className="url-protocol">{currentSample.protocol}</span>
            <span className="url-subdomain">{currentSample.subdomain}.</span>
            <span className="url-root-domain">{currentSample.rootDomain}</span>
            <span className="url-path">{currentSample.url.split(currentSample.rootDomain)[1]}</span>
          </div>
        </div>

        {/* Classification Actions */}
        {!currentAnswer ? (
          <div className="classifier-decision-row">
            <p className="decision-prompt">Is this URL safe and legitimate, or is it a deceptive phishing trap?</p>
            <div className="decision-buttons">
              <button 
                className="btn btn-secondary btn-classifier-legit"
                onClick={() => handleClassify(true)}
              >
                <CheckCircle2 size={18} className="text-safe" />
                Legitimate / Safe
              </button>
              <button 
                className="btn btn-secondary btn-classifier-phish"
                onClick={() => handleClassify(false)}
              >
                <ShieldAlert size={18} className="text-danger" />
                Suspicious / Phishing
              </button>
            </div>
          </div>
        ) : (
          <div className="classifier-result-breakdown fade-in">
            <div className={`result-verdict-banner ${currentAnswer.isCorrect ? 'verdict-correct' : 'verdict-incorrect'}`}>
              {currentAnswer.isCorrect ? (
                <div className="verdict-title-row">
                  <CheckCircle2 size={22} className="text-safe" />
                  <strong>Correct Analysis!</strong>
                  <span className="badge badge-safe">Accurate Identification</span>
                </div>
              ) : (
                <div className="verdict-title-row">
                  <XCircle size={22} className="text-danger" />
                  <strong>Incorrect Identification</strong>
                  <span className="badge badge-danger">Detection Miss</span>
                </div>
              )}
              <h4 style={{ marginTop: '0.4rem', color: '#ffffff' }}>{currentSample.verdictTitle}</h4>
              <p style={{ marginTop: '0.4rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
                {currentSample.explanation}
              </p>
            </div>

            <div className="url-anatomy-table">
              <div className="anatomy-col">
                <span className="anatomy-label">Scheme / Encryption:</span>
                <span className="anatomy-value"><code>{currentSample.protocol}</code></span>
              </div>
              <div className="anatomy-col">
                <span className="anatomy-label">Subdomain Prefix:</span>
                <span className="anatomy-value"><code>{currentSample.subdomain}</code></span>
              </div>
              <div className="anatomy-col">
                <span className="anatomy-label">True Root Domain:</span>
                <span className="anatomy-value highlight-domain"><code>{currentSample.rootDomain}</code></span>
              </div>
              <div className="anatomy-col">
                <span className="anatomy-label">Authentic Owner:</span>
                <span className="anatomy-value">{currentSample.isLegitimate ? 'Genuine Organization' : 'Adversary Server'}</span>
              </div>
            </div>

            <div className="next-sample-row">
              {activeUrlIndex < URL_SAMPLES.length - 1 ? (
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveUrlIndex(activeUrlIndex + 1)}
                >
                  Analyze Next URL Sample →
                </button>
              ) : (
                <button 
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  <RefreshCw size={16} />
                  Reset & Try Again
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
