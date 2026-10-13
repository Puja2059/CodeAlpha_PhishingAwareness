export const SCENARIOS_DATA = [
  {
    id: 'chase-account-suspension',
    title: 'Urgent Bank Account Suspension Notice',
    scenarioType: 'email',
    threatCategory: 'Financial Credential Harvesting',
    mitreTechnique: 'T1566.002 - Spearphishing Link',
    difficulty: 'Easy',
    estimatedMinutes: 5,
    sender: {
      name: 'Chase Security Alerts',
      address: 'service-notice@chase-bank-verify.online',
      replyTo: 'cust-intake-9821@gmail.com'
    },
    recipient: 'target.employee@acme-corp.com',
    date: 'Today, 08:42 AM',
    subject: 'CRITICAL ALERT: Unauthorized Login Detected — Account Restricted [Action Required in 12h]',
    simulatedUrl: 'http://chase.online-security-update.xyz/login/verify-credentials',
    emailContent: {
      greeting: 'Dear Valued Customer,',
      paragraphs: [
        'We detected an unauthorized sign-in attempt to your online banking portal originating from an unrecognized IP address (Lagos, Nigeria) at 03:14 AM EST.',
        'For your protection, we have temporarily restricted outgoing transactions and debit card access. You must verify your identity within 12 hours of receiving this notification, or your access will be permanently locked and escalated to collections.',
        'Please confirm your account credentials and personal verification questions immediately using our secure verification gateway:'
      ],
      buttonText: 'Verify Account Identity Now',
      footerText: 'Chase Bank USA, N.A. Member FDIC. © 2026 JPMorgan Chase & Co. All rights reserved. Security ID: CHS-88219-SEC'
    },
    indicators: [
      {
        id: 'fake-sender-domain',
        label: 'Suspicious sender domain (@chase-bank-verify.online instead of @chase.com)',
        isRedFlag: true,
        explanation: 'Genuine Chase correspondence comes exclusively from registered Chase domains (e.g., chase.com), never from newly registered lookalike domains like chase-bank-verify.online.'
      },
      {
        id: 'mismatched-reply-to',
        label: 'Mismatched Reply-To address routed to a generic free webmail account (@gmail.com)',
        isRedFlag: true,
        explanation: 'The Reply-To header diverts direct responses away from corporate banking servers to a personal throwaway mailbox controlled by the attacker.'
      },
      {
        id: 'artificial-urgency',
        label: 'Artificial urgency & threats ("Action Required in 12h" or "permanently locked")',
        isRedFlag: true,
        explanation: 'Severe time limits and punitive threats are classic psychological coercion techniques designed to induce panic and bypass logical scrutiny.'
      },
      {
        id: 'generic-greeting',
        label: 'Impersonal greeting ("Dear Valued Customer" instead of your actual name)',
        isRedFlag: true,
        explanation: 'Legitimate financial institutions where you hold an account address you by your formal name, often accompanied by the last 4 digits of your account or card.'
      },
      {
        id: 'unencrypted-lookalike-url',
        label: 'Insecure destination URL using HTTP and deceptive root domain (.xyz)',
        isRedFlag: true,
        explanation: 'The link leads to "chase.online-security-update.xyz", an unencrypted HTTP site hosted on a non-bank .xyz domain.'
      },
      {
        id: 'legitimate-fdic-mention',
        label: 'The footer contains the phrase "Member FDIC" which proves it is authentic',
        isRedFlag: false,
        explanation: 'Distractor: Anyone can copy and paste "Member FDIC" or copyright notices into an email footer. Text claims are never proof of authenticity.'
      }
    ],
    forensicReport: {
      summary: 'High-risk credential harvesting campaign spoofing a major financial institution.',
      threatActorObjective: 'Capture online banking usernames, passwords, security answers, and OTP tokens to drain customer accounts.',
      socMitigation: '1. Block domain chase-bank-verify.online and IP at firewall. 2. Purge matching messages across corporate Exchange/M365 inboxes. 3. Monitor proxy logs for any user who clicked.',
      keyLesson: 'Never click links in banking security alerts. Always open your browser and navigate directly to your bank using a known bookmark or official mobile app.'
    }
  },
  {
    id: 'postal-delivery-smishing',
    title: 'Postal Service Delivery Surcharge Smishing',
    scenarioType: 'sms',
    threatCategory: 'SMS Phishing (Smishing) / Card Skimming',
    mitreTechnique: 'T1566.002 - Spearphishing Link (SMS)',
    difficulty: 'Easy',
    estimatedMinutes: 4,
    sender: {
      name: '+1 (833) 492-9102',
      address: 'SMS Gateway / VoIP Provider'
    },
    recipient: '+1 (555) 234-5678',
    date: 'Today, 11:15 AM',
    simulatedUrl: 'https://usps-tracking-redeliver.top/pkg?id=94001000928',
    smsContent: {
      message: '[USPS Service Alert]: Package #94001000928 could not be delivered due to an incomplete street address on file. Please confirm your address and pay the $0.45 redelivery surcharge within 24h: https://usps-tracking-redeliver.top/pkg?id=94001000928'
    },
    indicators: [
      {
        id: 'toll-free-voip-sender',
        label: 'SMS sent from an unverified toll-free number rather than an official 5-digit postal shortcode',
        isRedFlag: true,
        explanation: 'Legitimate postal carriers (such as USPS) deliver tracking notifications via registered 5-digit shortcodes (e.g., 28777), not random toll-free VoIP numbers.'
      },
      {
        id: 'micro-charge-lure',
        label: 'A tiny financial fee lure ($0.45) designed to solicit credit card numbers',
        isRedFlag: true,
        explanation: 'Attackers request nominal sums like $0.30 to $1.50 because victims perceive minimal risk, but the fake form steals full credit card numbers and CVVs.'
      },
      {
        id: 'deceptive-tld',
        label: 'Deceptive domain using the ".top" top-level domain instead of .gov or .com',
        isRedFlag: true,
        explanation: 'The United States Postal Service operates on usps.com. The domain "usps-tracking-redeliver.top" is a cheap throwaway domain frequently used in mass cybercrime.'
      },
      {
        id: 'unsolicited-package-alert',
        label: 'Unsolicited notification received without having requested SMS updates',
        isRedFlag: true,
        explanation: 'Carriers never send automated SMS updates unless you specifically opted in on their official portal using a tracking number.'
      },
      {
        id: 'tracking-number-presence',
        label: 'The message contains a long tracking number so it must be real',
        isRedFlag: false,
        explanation: 'Distractor: Attackers generate random sequences of digits to mimic authentic tracking numbers.'
      }
    ],
    forensicReport: {
      summary: 'Widespread smishing lure leveraging brand impersonation of national postal couriers.',
      threatActorObjective: 'Harvest payment card details (PAN, expiry, CVV) and full residential address data for identity theft and credit card fraud.',
      socMitigation: '1. Report sender number to cellular carrier via SMS forwarding to 7726 (SPAM). 2. Submit domain to Google Safe Browsing and APWG.',
      keyLesson: 'Carriers do not hold packages hostage for small online redelivery fees via text message. Check tracking numbers directly on official courier portals.'
    }
  },
  {
    id: 'm365-password-reset',
    title: 'Corporate SSO Password Expiry Alert',
    scenarioType: 'email',
    threatCategory: 'Enterprise Credential Harvesting',
    mitreTechnique: 'T1566.002 - Spearphishing Link',
    difficulty: 'Medium',
    estimatedMinutes: 6,
    sender: {
      name: 'Microsoft 365 Account Security',
      address: 'no-reply@accountprotection-microsoft365.info',
      replyTo: 'security-ticket@accountprotection-microsoft365.info'
    },
    recipient: 'jordan.taylor@acme-corp.com',
    date: 'Today, 02:18 PM',
    subject: 'Action Required: Your Microsoft 365 account password will expire in 2 hours',
    simulatedUrl: 'https://login.microsoftonline.portal-auth.biz/common/oauth2/authorize',
    emailContent: {
      greeting: 'Hello Jordan Taylor,',
      paragraphs: [
        'In accordance with enterprise compliance policy, your corporate domain password for user jordan.taylor@acme-corp.com is scheduled to expire today in approximately 2 hours.',
        'To prevent interruption of your Outlook, Microsoft Teams, and OneDrive cloud access, please retain your current password or configure a new compliant credential below.',
        'Failure to validate within the designated maintenance window will require physical IT Helpdesk re-provisioning.'
      ],
      buttonText: 'Keep Current Password / Extend Access',
      footerText: 'Microsoft Corporation, One Microsoft Way, Redmond, WA 98052. Message Reference: MS-SSO-991204.'
    },
    indicators: [
      {
        id: 'lookalike-m365-domain',
        label: 'Lookalike domain (@accountprotection-microsoft365.info instead of @microsoft.com)',
        isRedFlag: true,
        explanation: 'Genuine Microsoft security notices originate from microsoft.com. Attackers string together official terms ("accountprotection", "microsoft365") on an external .info TLD.'
      },
      {
        id: 'keep-current-password-promise',
        label: 'A button promising to "Keep Current Password", which violates standard password expiration policies',
        isRedFlag: true,
        explanation: 'When an organization mandates password expiration, it is mathematically impossible to "extend" or keep the old password by clicking an email button. This is a telltale phishing lure.'
      },
      {
        id: 'subdomain-spoofing-link',
        label: 'Deceptive destination link masquerading with "login.microsoftonline" on a third-party ".biz" root domain',
        isRedFlag: true,
        explanation: 'The link looks like "login.microsoftonline.portal-auth.biz". The actual root domain is "portal-auth.biz", a malicious server capturing Single Sign-On credentials.'
      },
      {
        id: 'fear-of-helpdesk-trouble',
        label: 'Threat of inconvenience ("requires physical IT Helpdesk re-provisioning")',
        isRedFlag: true,
        explanation: 'Threatening friction or hassle motivates busy corporate workers to quickly click rather than risk losing access.'
      },
      {
        id: 'accurate-recipient-name',
        label: 'The email includes the user’s exact name and company email so it must be authentic',
        isRedFlag: false,
        explanation: 'Distractor: Attackers easily harvest corporate emails and employee names from LinkedIn, data breach dumps, and public company directories.'
      }
    ],
    forensicReport: {
      summary: 'Targeted corporate credential harvesting campaign aimed at Microsoft 365 / Entra ID tenant compromise.',
      threatActorObjective: 'Harvest active directory credentials and session cookies to achieve initial access to enterprise email, SharePoint documents, and Slack/Teams chat.',
      socMitigation: '1. Force global password reset and revoke all OAuth refresh tokens for user. 2. Enable FIDO2/passkey MFA requirement. 3. Block portal-auth.biz globally.',
      keyLesson: 'Password expirations do not offer a "Keep my old password" option. Verify password expiration notices inside your official computer system settings.'
    }
  },
  {
    id: 'ceo-wire-fraud-bec',
    title: 'Executive Wire Transfer Impersonation (BEC)',
    scenarioType: 'email',
    threatCategory: 'Business Email Compromise (BEC)',
    mitreTechnique: 'T1566.001 - Spearphishing Attachment / T1534 - Internal Spearphishing',
    difficulty: 'Hard',
    estimatedMinutes: 6,
    sender: {
      name: 'David Sterling (Chief Executive Officer)',
      address: 'david.sterling.ceo@exec-mail-corp.org',
      replyTo: 'david.sterling.ceo@exec-mail-corp.org'
    },
    recipient: 'claire.morrison@acme-corp.com (Finance Analyst)',
    date: 'Today, 03:52 PM',
    subject: 'CONFIDENTIAL: Urgent acquisition escrow deposit — Process before 4:30 PM cutoff',
    simulatedUrl: 'http://acme-finance.doc-view.net/escrow-agreement.pdf',
    emailContent: {
      greeting: 'Claire,',
      paragraphs: [
        'I am currently sequestered in a closed-door executive board meeting regarding an expedited acquisition. I cannot take direct phone calls right now.',
        'We need an immediate wire transfer of $48,500.00 wired to our external legal counsel escrow account before the 4:30 PM federal wire clearing deadline.',
        'Due to strict SEC non-disclosure agreements, please keep this completely confidential between you and me for now. Do not discuss this with the rest of the finance team until our official press release tomorrow morning.',
        'The wiring instructions and invoice are available in our secure escrow portal. Please process and reply directly to this email with the wire confirmation number as soon as completed.'
      ],
      buttonText: 'View Escrow Wiring Instructions',
      footerText: 'Sent from my iPad Pro. Confidential & Privileged Communication.'
    },
    indicators: [
      {
        id: 'external-display-name-spoof',
        label: 'External lookalike domain (@exec-mail-corp.org instead of internal @acme-corp.com)',
        isRedFlag: true,
        explanation: 'The sender uses the CEO’s real name in the display name, but the underlying email domain is an external unregistered lookalike (@exec-mail-corp.org), not the internal corporate email system.'
      },
      {
        id: 'secrecy-isolation-tactic',
        label: 'Enforced secrecy ("keep this confidential between you and me / do not discuss with team")',
        isRedFlag: true,
        explanation: 'Isolation is the signature technique of Business Email Compromise. It isolates the employee from peers who would immediately recognize the red flags.'
      },
      {
        id: 'refusal-of-voice-verification',
        label: 'Preemptive excuse to prevent phone verification ("cannot take direct phone calls right now")',
        isRedFlag: true,
        explanation: 'Attackers explicitly instruct victims not to call them because a single telephone call would instantly expose the impersonation.'
      },
      {
        id: 'bypassing-standard-controls',
        label: 'Bypassing standard dual-authorization financial procurement controls under extreme deadline pressure',
        isRedFlag: true,
        explanation: 'Legitimate corporate wire transfers require dual-control signoffs and established purchase orders, never unilateral email commands sent 30 minutes before cutoff.'
      },
      {
        id: 'ipad-footer-presence',
        label: 'The message ends with "Sent from my iPad Pro" which proves the CEO sent it during travel',
        isRedFlag: false,
        explanation: 'Distractor: Anyone can type "Sent from my iPad Pro" into an email signature to explain brief text or informal tone.'
      }
    ],
    forensicReport: {
      summary: 'High-severity Business Email Compromise (BEC) wire fraud attempt targeting corporate treasury accounts.',
      threatActorObjective: 'Coerce finance staff to bypass dual-authorization wire transfer controls and divert $48,500 to an offshore money-mule account.',
      socMitigation: '1. Contact finance employee immediately to confirm no funds were transferred. 2. Flag and quarantine exec-mail-corp.org across perimeter. 3. Enforce out-of-band callback protocol for all wire transfers above $5,000.',
      keyLesson: 'Never process financial transactions based on email alone. Always perform out-of-band verbal verification using pre-established internal numbers.'
    }
  },
  {
    id: 'malicious-invoice-attachment',
    title: 'Overdue Vendor Invoice with Double-Extension Attachment',
    scenarioType: 'email',
    threatCategory: 'Malware & Ransomware Delivery',
    mitreTechnique: 'T1566.001 - Spearphishing Attachment',
    difficulty: 'Medium',
    estimatedMinutes: 5,
    sender: {
      name: 'QuickBooks Invoicing Service',
      address: 'billing@quickbooks-invoice-direct.tech',
      replyTo: 'disputes@quickbooks-invoice-direct.tech'
    },
    recipient: 'accounts-payable@acme-corp.com',
    date: 'Yesterday, 04:30 PM',
    subject: 'OVERDUE INVOICE NOTICE #INV-88921 — Final notice prior to collections agency referral',
    simulatedUrl: 'http://quickbooks-invoice-direct.tech/download/Invoice_Summary_88921.pdf.exe',
    attachment: {
      filename: 'Invoice_Summary_88921.pdf.exe',
      displayFilename: 'Invoice_Summary_88921.pdf',
      filesize: '1.8 MB',
      type: 'Executable Binary disguised as PDF (.exe)'
    },
    emailContent: {
      greeting: 'Attention Accounts Payable,',
      paragraphs: [
        'Our records indicate that Invoice #INV-88921 is now 45 days past due. A late surcharge of 8.5% has been applied to your outstanding balance.',
        'If full payment is not received within 48 business hours, this matter will be referred to our third-party commercial debt collections agency, and your credit rating will be reported.',
        'Please download and inspect the attached detailed itemized invoice breakdown to clear this remittance immediately.'
      ],
      buttonText: null,
      footerText: 'Intuit QuickBooks Online Billing Portal. Powered by Intuit Billing Services Ltd.'
    },
    indicators: [
      {
        id: 'double-file-extension',
        label: 'Double file extension disguised as PDF (Invoice_Summary_88921.pdf.exe)',
        isRedFlag: true,
        explanation: 'The attachment ends in .pdf.exe. When opened on a Windows computer with default settings, the .exe extension is executed as code, running malware on the workstation.'
      },
      {
        id: 'unsolicited-unfamiliar-vendor',
        label: 'Unsolicited invoice reference without a matching Purchase Order (PO) number in your ERP',
        isRedFlag: true,
        explanation: 'Scammers blast generic invoice numbers hoping accounting staff will impulsively open the document to investigate whether they owe money.'
      },
      {
        id: 'third-party-tech-tld',
        label: 'Unofficial sender domain using ".tech" instead of official Intuit/QuickBooks domains',
        isRedFlag: true,
        explanation: 'Official QuickBooks notifications originate from intuit.com or quickbooks.com, never third-party domains like quickbooks-invoice-direct.tech.'
      },
      {
        id: 'aggressive-legal-threats',
        label: 'Aggressive threats of immediate debt collection and credit damage',
        isRedFlag: true,
        explanation: 'Intimidation and fear of financial harm are weaponized to create an urgent rush to open the payload.'
      },
      {
        id: 'pdf-icon-appearance',
        label: 'The file has a red Adobe PDF logo icon so it must be a document',
        isRedFlag: false,
        explanation: 'Distractor: Windows executables (.exe) can embed custom application icons that look identical to Adobe Acrobat PDF icons.'
      }
    ],
    forensicReport: {
      summary: 'Malware delivery campaign leveraging invoice lures to deploy an initial access trojan (e.g., RedLine Stealer / AsyncRAT).',
      threatActorObjective: 'Execute malicious binary payload on endpoint to steal browser credentials, cookies, crypto wallets, and establish C2 beacon.',
      socMitigation: '1. Isolate workstation from network immediately. 2. Collect memory dump and sandbox the binary. 3. Check EDR logs for child processes spawned from email client.',
      keyLesson: 'Never open email attachments with double extensions (.pdf.exe, .doc.vbs). Always verify invoice validity inside your ERP or with the vendor directly.'
    }
  }
];
