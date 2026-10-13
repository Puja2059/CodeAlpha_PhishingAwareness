import React, { useState } from 'react';
import { ShieldAlert, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

const DECISION_SCENARIOS = [
  {
    id: 'ceo-gift-cards',
    title: 'Pretext 1: The CEO’s "Discreet Favor"',
    pretextRole: 'Executive Impersonation (Smishing / WhatsApp)',
    situation: `You receive a WhatsApp message from an unknown number with the profile picture and name of your company CEO: 
"Hi, I'm currently stuck in an all-day executive board negotiation with investors and cannot take calls. I need you to purchase five $100 Apple Gift Cards immediately for client gifts. Scratch the silver coating and reply with photos of the codes. I'll expense it back to you tonight. Keep this confidential between us for now."`,
    choices: [
      {
        id: 'c1',
        text: 'Buy the gift cards immediately on your credit card so you don’t upset the CEO during their important meeting.',
        isSafe: false,
        analysis: 'Dangerous Compliance! Gift card requests from leadership are 100% scams. Gift card codes function like untraceable cash and cannot be reversed. Once sent, the money is gone.'
      },
      {
        id: 'c2',
        text: 'Reply to the WhatsApp message asking for their employee ID or a selfie to confirm their identity.',
        isSafe: false,
        analysis: 'Ineffective Verification! You are conversing directly with the attacker. Attackers routinely generate fake badges or use AI to generate selfie verification.'
      },
      {
        id: 'c3',
        text: 'Pause. Do not purchase anything. Contact the CEO or executive assistant verbally through the verified corporate phone directory or internal Slack channel.',
        isSafe: true,
        analysis: 'Excellent Out-of-Band Verification! Verbal verification through a known, pre-established internal channel stops executive impersonation instantly. Legitimate CEOs never solicit gift card codes over text.'
      }
    ]
  },
  {
    id: 'it-support-vishing',
    title: 'Pretext 2: The Urgent "IT Helpdesk" Call',
    pretextRole: 'Voice Phishing (Vishing) / Remote Access Trojan',
    situation: `Your desk phone rings at 04:45 PM on a Friday. The caller says:
"Hello, this is Kevin from Corporate IT Infrastructure. We have detected malicious command-and-control beaconing coming from your workstation IP. Your account will be frozen by the automated firewall in 10 minutes unless you navigate to quick-remote-help.tech and accept my remote session request so I can purge the trojan."`,
    choices: [
      {
        id: 'c1',
        text: 'Immediately go to the website and approve the remote session so you don’t lose work or get in trouble with IT.',
        isSafe: false,
        analysis: 'Critical Hazard! Granting remote desktop access to an unsolicited caller gives an adversary direct, uncontrolled hands-on-keyboard access to your system and internal network.'
      },
      {
        id: 'c2',
        text: 'Ask the caller for their full name, hang up, and call the official internal IT Helpdesk extension from the corporate intranet directory to confirm the ticket.',
        isSafe: true,
        analysis: 'Perfect Protocol! Legitimate IT departments have internal ticketing systems and will never object to an employee hanging up to call back via official extensions.'
      },
      {
        id: 'c3',
        text: 'Tell the caller your password over the phone so they can clean the machine from their own terminal instead.',
        isSafe: false,
        analysis: 'Severe Credential Leak! IT support never needs your plaintext password. Anyone asking for your password or MFA code over the phone is an adversary.'
      }
    ]
  },
  {
    id: 'vendor-wire-change',
    title: 'Pretext 3: Supplier Bank Account Modification',
    pretextRole: 'Business Email Compromise (BEC) / Invoice Fraud',
    situation: `You work in Accounts Payable. You receive an email from a regular vendor’s standard sales representative:
"Please be advised that due to our annual banking institution transition, our direct deposit and ACH wire details have changed. Please route tomorrow’s pending invoice payment of $32,400 to the updated routing and account numbers listed on the attached revised PDF."`,
    choices: [
      {
        id: 'c1',
        text: 'Update the accounting database with the new bank numbers immediately to ensure the payment clears on time.',
        isSafe: false,
        analysis: 'Catastrophic BEC Loss! Attackers compromise vendor email accounts specifically to divert invoices. Once an ACH wire clears to an attacker’s money mule, recovery is nearly impossible.'
      },
      {
        id: 'c2',
        text: 'Reply to the email asking: "Can you confirm that this bank account change was authorized by your CFO?"',
        isSafe: false,
        analysis: 'Flawed Verification! If the vendor’s email inbox is compromised, the hacker reading the emails will simply reply: "Yes, CFO authorized it."'
      },
      {
        id: 'c3',
        text: 'Follow dual-authorization protocol: place a verbal phone call to the vendor’s CFO or account manager using the phone number in your master vendor contract, not the email.',
        isSafe: true,
        analysis: 'Golden Rule of Wire Defense! Out-of-Band callback verification using pre-existing, contracted contact information is the industry-standard requirement for all banking updates.'
      }
    ]
  },
  {
    id: 'package-delivery-sms',
    title: 'Pretext 4: The Reschedule Delivery Text',
    pretextRole: 'Mobile Smishing / Credit Card Skimmer',
    situation: `Your phone buzzes with an SMS:
"USPS Notice: Package #49281 was unable to be delivered to your street address today. Please confirm your postal address and pay $0.35 redelivery surcharge within 12 hours: https://usps-redelivery-portal.site/confirm"`,
    choices: [
      {
        id: 'c1',
        text: 'Click the link and pay the $0.35 on your debit card since it is only a few cents.',
        isSafe: false,
        analysis: 'Card Skimming Hazard! Attackers don’t care about the $0.35. The counterfeit webpage records your 16-digit card number, CVV, and billing address, leading to unauthorized charges.'
      },
      {
        id: 'c2',
        text: 'Do not click the link. If you are expecting a package, navigate directly to USPS.com and enter the tracking number in the official search bar.',
        isSafe: true,
        analysis: 'Correct Independent Verification! Official carriers provide tracking tools directly on their websites. Never click links sent via unsolicited SMS.'
      },
      {
        id: 'c3',
        text: 'Reply "STOP" to the SMS to unsubscribe from further messages.',
        isSafe: false,
        analysis: 'Validates Your Number! Replying to criminal smishing numbers confirms your phone number is active and monitored, increasing future spam and attack volume.'
      }
    ]
  }
];

export default function InteractiveScenarioDecision() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState({});

  const scenario = DECISION_SCENARIOS[activeScenarioIndex];
  const userChoiceId = selectedChoices[scenario.id];
  const chosenOption = scenario.choices.find((c) => c.id === userChoiceId);

  const handleSelectChoice = (choiceId) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [scenario.id]: choiceId
    }));
  };

  const handleReset = () => {
    setSelectedChoices({});
    setActiveScenarioIndex(0);
  };

  const completedCount = Object.keys(selectedChoices).length;

  return (
    <div className="interactive-exercise-container glass-panel">
      <div className="exercise-header">
        <div>
          <span className="badge badge-info">Interactive Decision Lab</span>
          <h3 style={{ marginTop: '0.35rem' }}>Social Engineering Simulator</h3>
          <p style={{ marginTop: '0.2rem' }}>
            Choose how you would respond to high-pressure social engineering pretexts.
          </p>
        </div>
        <div className="inspection-counter">
          <span className="counter-text">Scenarios Resolved:</span>
          <span className="counter-pill">{completedCount} / {DECISION_SCENARIOS.length}</span>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="url-sample-tabs">
        {DECISION_SCENARIOS.map((item, idx) => {
          const resolved = selectedChoices[item.id];
          const isSafeChoice = resolved ? item.choices.find((c) => c.id === resolved)?.isSafe : null;

          return (
            <button
              key={item.id}
              className={`url-tab-btn ${activeScenarioIndex === idx ? 'active' : ''} ${resolved ? (isSafeChoice ? 'tab-correct' : 'tab-incorrect') : ''}`}
              onClick={() => setActiveScenarioIndex(idx)}
            >
              <span>Scenario {idx + 1}</span>
              {resolved && (
                isSafeChoice ? (
                  <CheckCircle size={14} className="text-safe" />
                ) : (
                  <AlertCircle size={14} className="text-danger" />
                )
              )}
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <div className="scenario-decision-card">
        <div className="scenario-metadata-bar">
          <span className="badge badge-warning">{scenario.pretextRole}</span>
          <span className="scenario-id-tag">{scenario.title}</span>
        </div>

        <div className="situation-speech-bubble">
          <div className="bubble-label">Incident Context:</div>
          <p className="situation-text">{scenario.situation}</p>
        </div>

        {/* Choices */}
        <div className="decision-choices-list">
          <h4 style={{ fontSize: '0.95rem', color: '#e2e8f0', marginBottom: '0.75rem' }}>
            What is your immediate course of action?
          </h4>
          {scenario.choices.map((choice) => {
            const isSelected = userChoiceId === choice.id;
            return (
              <div
                key={choice.id}
                className={`decision-choice-row ${isSelected ? (choice.isSafe ? 'choice-safe' : 'choice-danger') : ''}`}
                onClick={() => handleSelectChoice(choice.id)}
              >
                <div className="choice-radio">
                  <div className={`radio-dot ${isSelected ? 'active' : ''}`}></div>
                </div>
                <div className="choice-text">
                  <p>{choice.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback Section */}
        {chosenOption && (
          <div className="decision-feedback-box fade-in">
            <div className={`feedback-status-row ${chosenOption.isSafe ? 'safe-verdict' : 'danger-verdict'}`}>
              {chosenOption.isSafe ? (
                <>
                  <CheckCircle size={22} className="text-safe" />
                  <strong>Safe & Compliant Response!</strong>
                </>
              ) : (
                <>
                  <ShieldAlert size={22} className="text-danger" />
                  <strong>High Risk Choice — Attack Succeeded!</strong>
                </>
              )}
            </div>
            <p className="feedback-analysis-text">{chosenOption.analysis}</p>

            <div className="next-scenario-row">
              {activeScenarioIndex < DECISION_SCENARIOS.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveScenarioIndex(activeScenarioIndex + 1)}
                >
                  Next Scenario Challenge →
                </button>
              ) : (
                <button className="btn btn-secondary" onClick={handleReset}>
                  <RefreshCw size={16} />
                  Reset Decisions
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
