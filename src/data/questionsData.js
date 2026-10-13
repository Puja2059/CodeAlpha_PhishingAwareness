export const QUESTIONS_DATA = [
  {
    id: 1,
    category: 'Email Security',
    question: 'You receive an urgent email from "PayPal Security Team" warning that your account is locked. When you hover over the sender name, the underlying address shows "security-update@paypa1-support.com". What is this technique called?',
    options: [
      'DNS Poisoning',
      'Display Name Spoofing with Typosquatting',
      'SQL Injection',
      'Cross-Site Scripting (XSS)'
    ],
    correctIndex: 1,
    explanation: 'The attacker uses Display Name Spoofing (showing "PayPal Security Team") combined with Typosquatting (substituting the letter "l" with the digit "1" in "paypa1-support.com") to trick the recipient into trusting a deceptive domain.'
  },
  {
    id: 2,
    category: 'Web & URL Security',
    question: 'You receive a link: "https://login.microsoft.com.account-verification-portal.net/auth". If you click this link, which organization controls the server you are visiting?',
    options: [
      'Microsoft Corporation (microsoft.com)',
      'The organization that owns account-verification-portal.net',
      'Both Microsoft and the portal simultaneously',
      'Your local Internet Service Provider (ISP)'
    ],
    correctIndex: 1,
    explanation: 'In domain hierarchy, the true registered domain is immediately to the left of the first single forward slash. Here, "login.microsoft.com" is merely a deceptive subdomain string on the third-party domain "account-verification-portal.net".'
  },
  {
    id: 3,
    category: 'Web & URL Security',
    question: 'A website has a secure HTTPS padlock icon in the browser address bar. What does this padlock actually signify?',
    options: [
      'The website has been audited and certified as authentic and malware-free',
      'The website belongs to a legitimate business approved by government authorities',
      'The data transmitted between your browser and the web server is encrypted in transit',
      'Your login credentials cannot be stolen or intercepted by the website owner'
    ],
    correctIndex: 2,
    explanation: 'The padlock indicates HTTPS encryption in transit—protecting data from eavesdroppers on the local network. It does NOT verify the honesty or legitimacy of the website owner. Over 80% of active phishing sites now have HTTPS padlocks.'
  },
  {
    id: 4,
    category: 'Social Engineering',
    question: 'Your company CEO sends you an email: "I am trapped in an emergency investor meeting and cannot take phone calls. Buy 10 $100 Apple Gift Cards and email me the PIN codes right now." What psychological lever is the attacker manipulating most?',
    options: [
      'Curiosity and Greed',
      'Authority, Urgency, and Preemptive Communication Isolation',
      'Sympathy for charity',
      'Technical curiosity'
    ],
    correctIndex: 1,
    explanation: 'The attacker weaponizes organizational authority (the CEO), intense urgency ("right now"), and preemptive communication isolation ("cannot take phone calls") to intimidate the employee into compliance without verbal verification.'
  },
  {
    id: 5,
    category: 'Modern Vectors',
    question: 'An email arrives with a PDF document asking you to scan a QR code with your mobile camera to authenticate a multi-factor session. What is this attack vector called?',
    options: [
      'Smishing',
      'Quishing (QR Code Phishing)',
      'Vishing',
      'Watering Hole Attack'
    ],
    correctIndex: 1,
    explanation: 'Quishing (QR code phishing) uses QR codes to embed malicious URLs. Because the link is rendered as an image, legacy email security gateways cannot easily parse the link text, and scanning moves the victim away from protected corporate endpoints to personal phones.'
  },
  {
    id: 6,
    category: 'Defense Mechanisms',
    question: 'Why are FIDO2/WebAuthn hardware security keys (e.g., YubiKeys) and passkeys considered "phishing-resistant" compared to SMS one-time passcodes?',
    options: [
      'They only work when connected to a VPN',
      'They cryptographically bind authentication to the exact domain in the browser address bar',
      'They expire every 30 seconds like authenticator apps',
      'They require biometric facial recognition approved by the government'
    ],
    correctIndex: 1,
    explanation: 'FIDO2/WebAuthn protocol mathematically signs authentication challenges only for the legitimate origin. If a user is on a phishing replica (e.g., "paypa1.com"), the browser origin does not match "paypal.com", and the key refuses to release credentials.'
  },
  {
    id: 7,
    category: 'Incident Response',
    question: 'You accidentally clicked a suspicious link in an email and entered your corporate username and password before realizing it was a fake page. What is the FIRST action you should take?',
    options: [
      'Turn off your computer monitor and wait for tomorrow',
      'Immediately change your password from a clean, uncompromised device and revoke active sessions',
      'Send an apology email to the sender of the phishing message',
      'Format your entire computer hard drive'
    ],
    correctIndex: 1,
    explanation: 'Time is critical. Immediately change your credentials from an uncompromised device to lock out the adversary before they use your password, terminate/revoke active sessions, and report the incident to your IT security/SOC team.'
  },
  {
    id: 8,
    category: 'Detection Techniques',
    question: 'An email arrives with an attachment named "Quarterly_Bonus_Calculation.pdf.exe". What should you conclude about this file?',
    options: [
      'It is an Adobe PDF file with enhanced security features',
      'It is a high-risk executable binary disguised with a double file extension',
      'It is an encrypted archive that requires Acrobat Reader Pro',
      'It is a spreadsheet template from Microsoft Office'
    ],
    correctIndex: 1,
    explanation: 'Windows systems often hide the true extension. Attackers append ".pdf.exe" so users think it is a harmless PDF. Clicking it executes an executable binary program (.exe), potentially running ransomware or an info-stealer.'
  },
  {
    id: 9,
    category: 'Social Engineering',
    question: 'A supplier sends an email stating their banking account details have changed and requests all future wire transfers be routed to a new account. What is the mandatory security verification procedure?',
    options: [
      'Reply to the email asking the sender to confirm their banking account number',
      'Execute Out-of-Band (OOB) verification by calling a known, pre-established telephone number for the vendor',
      'Search Google for the new bank account number to see if complaints exist',
      'Split the wire into two smaller transfers to reduce financial risk'
    ],
    correctIndex: 1,
    explanation: 'Never verify banking changes using the contact information inside the suspicious email! Always initiate an out-of-band phone call using verified telephone contacts from your internal master vendor database.'
  },
  {
    id: 10,
    category: 'Defense Mechanisms',
    question: 'How do reputable password managers (e.g., Bitwarden, 1Password) protect users from submitting credentials to phishing websites?',
    options: [
      'They block all emails that contain hyperlinks',
      'They strictly match the registered domain (FQDN) and refuse to autofill on lookalike or mismatched URLs',
      'They automatically report fraudulent websites to the FBI',
      'They decrypt your passwords using cloud artificial intelligence'
    ],
    correctIndex: 1,
    explanation: 'Password managers match the exact Uniform Resource Identifier. If you visit "amaz0n-security.com", the manager recognizes it is not "amazon.com" and will not offer or autofill your Amazon password.'
  },
  {
    id: 11,
    category: 'Modern Vectors',
    question: 'You receive an unsolicited phone call from someone claiming to be "Corporate IT Helpdesk". They state your computer is beaconing malware and urge you to install remote support software. What type of attack is this?',
    options: [
      'Smishing',
      'Vishing (Voice Phishing)',
      'Drive-by Download',
      'DNS Spoofing'
    ],
    correctIndex: 1,
    explanation: 'Vishing (voice phishing) uses telephone calls and social engineering to impersonate trusted authorities (like IT support or fraud departments) to manipulate victims into giving remote desktop access or MFA tokens.'
  },
  {
    id: 12,
    category: 'Email Security',
    question: 'Which of the following statements about modern phishing attacks is TRUE?',
    options: [
      'Phishing emails always contain blatant grammatical and spelling errors',
      'Attackers can use AI to craft grammatically flawless, highly contextualized phishing lures',
      'If an email has an official company logo, it cannot be a phishing attack',
      'Phishing only targets non-technical employees, not developers or IT staff'
    ],
    correctIndex: 1,
    explanation: 'Modern adversaries extensively use generative AI and automated scraping to produce grammatically pristine, highly convincing lures. Flawless grammar and official logos are never guarantees of authenticity.'
  }
];
