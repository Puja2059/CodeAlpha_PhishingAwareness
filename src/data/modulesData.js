export const MODULES_DATA = [
  {
    id: 1,
    slug: 'introduction-to-phishing',
    title: 'Introduction to Phishing & Social Engineering',
    shortDescription: 'Master the fundamentals of social engineering, attacker objectives, and the modern taxonomy of phishing vectors.',
    icon: 'ShieldAlert',
    category: 'Foundations',
    estimatedMinutes: 8,
    level: 'Beginner',
    sections: [
      {
        heading: 'What is Phishing and Social Engineering?',
        content: `Phishing is a form of social engineering where attackers manipulate human psychology rather than exploiting technical software bugs alone. Instead of attempting to breach cryptographic algorithms or break firewalls directly, cybercriminals exploit human traits such as trust, urgency, fear, helpfulness, and curiosity.

Social engineering turns authorized users into unwilling accomplices. By impersonating trustworthy entities—such as banking institutions, enterprise IT support, cloud providers, or executive colleagues—adversaries deceive victims into surrendering sensitive credentials, transferring funds, or executing malicious payloads.`
      },
      {
        heading: 'Primary Attacker Objectives',
        content: `Understanding what cybercriminals seek enables defensive thinking. Most phishing campaigns pursue one or more of these core objectives:

• **Credential Harvesting:** Stealing usernames, passwords, session tokens, and one-time codes to compromise enterprise networks, cloud accounts (Microsoft 365, Google Workspace), or personal banking portals.
• **Financial Theft & Wire Fraud:** Diverting vendor payments, rerouting payroll direct deposits, or coercing immediate wire transfers under false pretenses.
• **Initial Access Brokerage:** Establishing a persistent backdoor on a corporate endpoint to sell network access to ransomware gangs (e.g., LockBit, BlackCat).
• **Identity Theft & Extortion:** Exfiltrating personally identifiable information (PII) such as Social Security numbers, passport photos, and confidential company IP.`
      },
      {
        heading: 'Modern Taxonomy of Phishing Attacks',
        content: `Phishing has evolved far beyond generic spam emails. Today’s threat landscape encompasses specialized vectors:

1. **Bulk Email Phishing (Mass Phishing):** Automated, high-volume campaigns sent to millions simultaneously, hoping a small percentage will take the bait (e.g., generic fake Netflix billing notices).
2. **Spear Phishing:** Highly customized attacks tailored to a specific individual or organization. Attackers conduct Open-Source Intelligence (OSINT) via LinkedIn, corporate websites, and social media to craft plausible pretexts.
3. **Whaling:** Spear phishing specifically targeted at high-profile executives (C-Suite, board members, senior legal counsel) with high financial authority.
4. **Smishing (SMS Phishing):** Deceptive text messages exploiting high smartphone open rates, often claiming missed deliveries, bank fraud alerts, or tax refunds.
5. **Vishing (Voice Phishing):** Phone-based manipulation. Attackers increasingly leverage generative AI voice cloning to impersonate family members, colleagues, or senior executives.
6. **Clone Phishing:** The attacker intercepts or captures a legitimate previously delivered email, duplicates its structure, and replaces links or attachments with malicious variants.
7. **Business Email Compromise (BEC):** Attackers compromise or spoof corporate executive email accounts to request fraudulent wire transfers or invoice rerouting without malware.
8. **Quishing (QR Code Phishing):** Embedding malicious URLs inside QR codes on parking meters, restaurant menus, or email PDFs, bypassing traditional email link scanners because the URL is stored as an image.`
      },
      {
        heading: 'Impact on Individuals & Organizations',
        content: `According to global threat intelligence reports, over **85% of cybersecurity breaches involve a human element**, and phishing remains the leading initial attack vector.

• **For Individuals:** Financial ruin, stolen credit profiles, compromised cloud storage, unauthorized password resets across linked accounts, and emotional distress.
• **For Organizations:** Multi-million-dollar ransomware recovery costs, operational downtime, severe reputational damage, regulatory fines (GDPR, HIPAA, SEC penalties), and loss of intellectual property.`
      }
    ],
    keyTakeaways: [
      'Phishing exploits human psychology (trust, urgency, fear) rather than technical vulnerabilities.',
      'Attackers seek credentials, financial transfers, and initial network footholds.',
      'Modern attacks extend beyond email to SMS (smishing), phone calls (vishing), and QR codes (quishing).',
      'Over 85% of breaches involve a human element; vigilance is an essential security control.'
    ],
    quickCheck: {
      question: 'Which phishing variant specifically targets high-ranking executives with high financial authority?',
      options: ['Smishing', 'Whaling', 'Clone Phishing', 'Quishing'],
      correctIndex: 1,
      explanation: 'Whaling is a specialized spear phishing attack directed at C-suite executives, directors, or senior financial managers due to their elevated access and authority.'
    }
  },
  {
    id: 2,
    slug: 'detecting-suspicious-emails',
    title: 'Detecting Suspicious Emails & Spoofing',
    shortDescription: 'Learn how to dissect email headers, recognize display name spoofing, analyze urgent lures, and inspect suspicious attachments.',
    icon: 'MailWarning',
    category: 'Inspection Techniques',
    estimatedMinutes: 10,
    level: 'Beginner',
    sections: [
      {
        heading: 'Anatomy of Email Sender Addresses',
        content: `Every email contains two critical sender identifiers that attackers frequently manipulate:

1. **Display Name:** The arbitrary friendly label shown prominently in mail clients (e.g., "PayPal Security Team" or "CEO John Smith"). Any sender can configure this to say anything.
2. **Actual Email Address (Envelope Sender):** The genuine address behind the display name (e.g., \`support@paypa1-security-alert.com\` or \`ceo.company@gmail.com\`).

**Display Name Spoofing** is the most common technique on mobile devices because mail apps often truncate or hide the actual email address, displaying only the friendly name. Always expand the sender details to inspect the actual domain following the '@' symbol!`
      },
      {
        heading: 'Urgency, Fear, and Artificial Deadlines',
        content: `Attackers deliberately provoke an adrenaline response to bypass your analytical critical thinking. Common psychological triggers include:

• "Your account will be suspended within 24 hours unless you verify immediately!"
• "Unauthorized purchase of $1,849.00 processed. Call this number now to cancel."
• "Legal Notice: Lawsuit pending against your company. View subpoena."
• "Payroll processing error: Verify your banking details before midnight to receive salary."

Legitimate institutions give reasonable advance notice for administrative actions and almost never threaten permanent account deletion within hours without alternative recourse.`
      },
      {
        heading: 'The "Clean Grammar" Myth: AI-Generated Phishing',
        content: `For decades, users were taught: *"Look for typos and bad grammar to spot phishing."* 

**This rule is dangerously outdated.** Today, threat actors utilize Large Language Models (LLMs) and automated translation tools to craft grammatically flawless, eloquent, and culturally convincing messages in any language.

While awkward phrasing can still indicate generic spam, the absence of spelling errors is **never** proof that an email is legitimate.`
      },
      {
        heading: 'Dangerous Attachments & Double Extensions',
        content: `Threat actors frequently deliver malware via email attachments disguised as mundane business documents:

• **Double Extensions:** Windows by default hides known file extensions. Attackers name files \`Invoice_Q3.pdf.exe\` or \`Contract.docx.vbs\`. The user sees \`Invoice_Q3.pdf\`, but opening it executes malicious binary code.
• **Archived & Password-Protected Files:** Files compressed in \`.zip\`, \`.rar\`, or \`.7z\` formats—with the password written in the email body—prevent automated email gateway antivirus scanners from inspecting the archive contents.
• **Macro-Enabled Documents:** Files ending in \`.docm\` or \`.xlsm\` asking users to *"Enable Editing"* or *"Enable Content"* run embedded Visual Basic scripts that download backdoors.
• **Disk Images & Script Containers:** Modern phishing increasingly uses \`.iso\`, \`.img\`, \`.vhd\`, \`.html\`, or \`.hta\` files to bypass endpoint security.`
      }
    ],
    interactiveType: 'emailDissection',
    keyTakeaways: [
      'Always look past the Display Name to verify the genuine domain behind the "@" sign.',
      'High urgency, threats of immediate suspension, and fear are designed to disable critical analysis.',
      'Flawless spelling and grammar do NOT guarantee authenticity—AI crafts immaculate phishing lures.',
      'Beware of double extensions (.pdf.exe), password-protected archives, and macro-enabled documents.'
    ],
    quickCheck: {
      question: 'Why do attackers frequently put passwords to attached ZIP files directly inside the email body?',
      options: [
        'To ensure only the intended recipient can open the file',
        'To comply with enterprise email encryption standards',
        'To prevent automated email security filters from inspecting the zipped contents',
        'Because ZIP files cannot be opened without a text hint'
      ],
      correctIndex: 2,
      explanation: 'Password-protected archives are encrypted. Automated email gateways cannot inspect the archive without the password, allowing malware to bypass perimeter filters until the human victim manually unzips it.'
    }
  },
  {
    id: 3,
    slug: 'identifying-fake-websites-and-urls',
    title: 'Identifying Fake Websites & Deceptive URLs',
    shortDescription: 'Uncover typosquatting, subdomain deception, lookalike domains, and why the HTTPS padlock does NOT mean a website is safe.',
    icon: 'Globe',
    category: 'Inspection Techniques',
    estimatedMinutes: 9,
    level: 'Intermediate',
    sections: [
      {
        heading: 'Anatomy of a Uniform Resource Locator (URL)',
        content: `To spot deceptive links, you must understand how a domain is resolved by the Internet Domain Name System (DNS):

Consider: \`https://portal.bank.example.com/login/auth\`
• **Protocol:** \`https://\` (encryption layer)
• **Subdomain(s):** \`portal.bank\`
• **Registered Domain (Root Domain):** \`example.com\`
• **Top-Level Domain (TLD):** \`.com\`
• **Path & Query:** \`/login/auth\`

**Golden Rule of URL Inspection:** Always read backwards from the first single forward slash (\`/\`) immediately following the protocol. The word immediately preceding that slash, combined with its TLD, is the actual server you are communicating with.

In \`https://chase.com.security-verify.org/login\`, the domain is **security-verify.org**, NOT chase.com!`
      },
      {
        heading: 'The Padlock Fallacy: Why HTTPS ≠ Safe',
        content: `A persistent and dangerous cybersecurity myth is: *"If you see the padlock icon or HTTPS, the site is safe and trustworthy."*

**The Truth:** HTTPS only ensures that the communication between your browser and the remote server is encrypted against eavesdropping in transit. It says **absolutely nothing** about the honesty or intentions of the entity running that server!

Today, free automated Certificate Authorities (such as Let's Encrypt) issue SSL/TLS certificates in seconds to anyone. Cybercrime telemetry indicates that **over 80% of active phishing websites now display the HTTPS padlock**. A padlock on a phishing site simply means your stolen password will be transmitted securely to the criminal.`
      },
      {
        heading: 'Domain Deception Strategies',
        content: `Attackers employ clever psychological tricks to make malicious links appear authentic:

1. **Typosquatting (Combosquatting):** Registering common spelling mistakes or subtle character substitutions (e.g., \`paypa1.com\`, \`micros0ft.com\`, \`netflix-account-update.com\`).
2. **Subdomain Prepending:** Putting the target company's genuine domain into their own subdomain (e.g., \`https://paypal.com.customer-resolution-center.biz\`). Mobile address bars often truncate long URLs, showing only \`paypal.com...\`.
3. **IDN Homograph Attacks:** Using characters from other alphabets (like Cyrillic or Greek) that look identical to Latin characters (e.g., Cyrillic 'а' [U+0430] looks identical to Latin 'a' [U+0061]).
4. **Open Redirects & Legitimate Cloud Hosting:** Abusing genuine cloud infrastructure (e.g., \`docs.google.com\`, \`forms.office.com\`, \`firebaseapp.com\`, \`blob.core.windows.net\`) to host phishing forms on trusted domains.`
      },
      {
        heading: 'Safe Verification Habits',
        content: `• **Hover Before You Click:** On a desktop computer, hover your mouse over any hyperlink to examine the true destination preview in your browser's bottom status bar.
• **Never Click Links in Sensitive Alerts:** If you receive an alert from your bank, cloud provider, or utility, navigate to the service independently by typing their official bookmark or known address into the address bar.
• **Beware URL Shorteners:** Unsolicited links using \`bit.ly\`, \`tinyurl.com\`, or \`t.co\` disguise the true destination. Use URL expanders or avoid clicking them altogether.`
      }
    ],
    interactiveType: 'urlInspector',
    keyTakeaways: [
      'The registered root domain is immediately to the left of the first single forward slash (/).',
      'The HTTPS padlock means data is encrypted in transit—it does NOT mean the site is legitimate or safe.',
      'Attackers disguise URLs using subdomains, typosquatting, and free cloud storage services.',
      'Always navigate directly to sensitive portals through known bookmarks rather than email links.'
    ],
    quickCheck: {
      question: 'In the URL "https://apple.com.manage-subscriptions-id82.net/verify", who owns the server hosting this page?',
      options: [
        'Apple Inc. (apple.com)',
        'manage-subscriptions-id82.net',
        'The official Apple subscription department',
        'Both Apple and the network provider'
      ],
      correctIndex: 1,
      explanation: 'The root domain immediately before the first single slash is "manage-subscriptions-id82.net". "apple.com" is merely a deceptive subdomain string configured by the attacker.'
    }
  },
  {
    id: 4,
    slug: 'social-engineering-tactics',
    title: 'Social Engineering Psychology & Manipulations',
    shortDescription: 'Understand how attackers weaponize authority, fear, curiosity, and urgency—and master the safest human responses.',
    icon: 'Brain',
    category: 'Human Defense',
    estimatedMinutes: 9,
    level: 'Intermediate',
    sections: [
      {
        heading: 'The Psychological Weaponry of Cybercriminals',
        content: `Social engineering is hacking without code. Attackers systematically exploit fundamental human cognitive biases described by psychologist Robert Cialdini:

• **Authority:** We are conditioned to obey leadership, law enforcement, and IT administrators. Impersonating a CEO, auditor, or government agency intimidates employees into bypassing safety protocols.
• **Urgency & Scarcity:** Limiting time creates panic ("Process within 30 minutes or services will terminate"). Panic suppresses critical thinking.
• **Fear of Consequences:** Threatening job loss, legal action, account closure, or public humiliation coerces compliance.
• **Curiosity & Greed:** Unsolicited promises of bonuses ("Q4 Salary Review.xlsx"), tax rebates, secret organizational changes, or free gift cards bait clicks.
• **Helpfulness & Likability:** Playing the role of a distressed colleague or polite vendor appeals to our natural desire to assist others.`
      },
      {
        heading: 'Realistic Corporate & Personal Pretexts',
        content: `Attackers build elaborate scenarios (pretexts) designed to feel plausible within daily workflows:

1. **The Executive "Quick Favor" Pretext:**
*"I'm currently stuck in an executive board meeting and cannot take calls. I need you to purchase 5 Apple gift cards for a client presentation immediately. Email me the codes right away."*
(Targets administrative staff who hesitate to question a superior).

2. **The "IT Helpdesk Urgent Patch" Pretext:**
*"Hello, this is Kevin from Global Corporate IT. We detected anomalous traffic from your laptop. Please navigate to [remote-support-tool.site] and grant me remote access so I can clean the infection."*
(Exploits trust in technical support personnel).

3. **The "Vendor Bank Details Changed" Pretext:**
*"Please note our banking partner has changed due to an annual audit. Please update wire transfer routing numbers for invoice #4491 to the attached account before issuing payment."*
(Classic Business Email Compromise costing billions annually).`
      },
      {
        heading: 'Out-of-Band (OOB) Verification: The Silver Bullet',
        content: `The single most effective countermeasure against social engineering is **Out-of-Band (OOB) Verification**.

What is Out-of-Band Verification?
It means validating any sensitive, unusual, or financial request through a completely separate, pre-established communication channel:

• If an email requests a wire change, **call the vendor** using the verified phone number stored in your vendor master directory—NEVER the phone number listed in the suspicious email.
• If a chat message from your CEO asks for urgent gift cards, **reach out via internal corporate Slack/Teams or telephone** to verify verbally.
• If a text message claims your bank blocked your card, **call the number printed on the back of your physical payment card**.`
      }
    ],
    interactiveType: 'scenarioDecision',
    keyTakeaways: [
      'Attackers weaponize authority, urgency, curiosity, and helpfulness to bypass rationality.',
      'Common pretexts include executive gift card requests, urgent IT remote desktop calls, and vendor invoice changes.',
      'Out-of-band verification (calling via a known trusted number) defeats 99% of social engineering attempts.',
      'Never use contact numbers or email addresses provided inside the suspicious message itself.'
    ],
    quickCheck: {
      question: 'Your company CFO emails you asking for an urgent bank wire transfer to a new account, insisting they are in a confidential meeting and cannot take calls. What is the safest response?',
      options: [
        'Process the wire immediately to avoid angering the CFO',
        'Reply to the email asking if this is really the CFO',
        'Follow established internal protocol: verify verbally through known internal channels before processing',
        'Forward the email to your personal account for recordkeeping'
      ],
      correctIndex: 2,
      explanation: 'Never reply to the suspicious email (which reaches the attacker). Always use a separate, verified verification channel (OOB) and adhere to multi-person financial authorization controls.'
    }
  },
  {
    id: 5,
    slug: 'safe-response-and-prevention',
    title: 'Safe Response, Incident Protocol & Prevention',
    shortDescription: 'Actionable defense frameworks: phishing-resistant MFA, password managers, and step-by-step incident response when a click happens.',
    icon: 'ShieldCheck',
    category: 'Incident Response & Defense',
    estimatedMinutes: 10,
    level: 'Advanced',
    sections: [
      {
        heading: 'Phishing-Resistant MFA vs Legacy 2FA',
        content: `Not all Multi-Factor Authentication (MFA) methods offer equal protection against modern phishing:

• **SMS & Voice One-Time Codes (Vulnerable):** Attackers use reverse-proxy tools (like Evilginx) to capture your password and the SMS code simultaneously in real-time, or execute SIM-swapping attacks.
• **Mobile Push Approvals (Vulnerable to Fatigue):** Attackers spam your phone with dozens of login push notifications at 2 AM until you click "Approve" out of exhaustion ("MFA Fatigue").
• **FIDO2 / WebAuthn & Passkeys (Phishing-Resistant):** Hardware security keys (YubiKeys) and cryptographic passkeys bind the authentication cryptographic exchange to the exact domain in your browser URL bar. If you are on \`paypa1.com\`, the browser refuses to release the cryptographic signature for \`paypal.com\`. **Even if the victim falls for the phishing lure, the credentials cannot be stolen.**`
      },
      {
        heading: 'Password Managers as a Phishing Shield',
        content: `Password managers (Bitwarden, 1Password, KeePass) provide a crucial anti-phishing safeguard that humans cannot match:

**Automated Domain Matching:** A password manager checks the exact cryptographic Uniform Resource Identifier of the webpage. If you visit \`netflix-update-billing.com\`, the password manager will refuse to autofill your credentials because the domain does not match \`netflix.com\`. 

If your password manager does not offer to autofill your credentials on a login page where it normally does, treat that page immediately as a phishing attempt!`
      },
      {
        heading: 'Incident Response Playbook: "I Clicked A Link - What Now?"',
        content: `Mistakes happen. Rapid, disciplined action minimizes the impact of a compromised credential or malicious download:

**Step 1: Disconnect and Isolate (If a file was downloaded or run)**
• Unplug the physical Ethernet cable and disconnect from Wi-Fi immediately to prevent lateral network propagation.

**Step 2: Change Compromised Credentials (From a clean device)**
• If you entered a password on a fake page, use a separate, uncompromised device (e.g., your smartphone) to change the password immediately.
• Ensure the new password is long, unique, and stored in a password manager.

**Step 3: Invalidate Active Sessions & Review Connected Devices**
• Log into the legitimate portal and use the "Sign out of all sessions" or "Revoke active tokens" feature.
• Check your security settings for newly added MFA devices or unauthorized forwarding rules in your email inbox!

**Step 4: Report to Security Personnel / SOC**
• Forward the phishing email as an attachment (or use your company's "Report Phishing" button) to your IT Security or SOC team so they can block the domain across firewalls and purge it from other employees' inboxes.

**Step 5: Alert Financial Institutions (If banking details were exposed)**
• Notify your card issuer to place a hold or replace payment cards.`
      },
      {
        heading: 'Public Reporting Resources',
        content: `Reporting phishing helps threat intelligence agencies dismantle malicious infrastructure globally:

• **United States:** Report to the Cybersecurity and Infrastructure Security Agency (CISA) at \`phishing-report@us-cert.gov\` and the FTC at \`reportfraud.ftc.gov\`.
• **United Kingdom:** Forward suspicious emails to the National Cyber Security Centre (NCSC) at \`report@phishing.gov.uk\`.
• **Anti-Phishing Working Group (APWG):** Forward raw phishing emails to \`reportphishing@apwg.org\`.`
      }
    ],
    interactiveType: 'preventionChecklist',
    keyTakeaways: [
      'FIDO2 Passkeys and hardware security keys are cryptographically phishing-resistant.',
      'Password managers safeguard against spoofed domains by refusing to autofill credentials on lookalike URLs.',
      'If you enter credentials on a fake page, change the password from a clean device and revoke all active sessions immediately.',
      'Always report phishing attempts to internal IT and public reporting portals to protect others.'
    ],
    quickCheck: {
      question: 'Why are FIDO2 hardware keys and passkeys considered "phishing-resistant" compared to SMS codes?',
      options: [
        'They require an internet connection to function',
        'They cryptographically bind authentication to the exact legitimate domain, refusing to authenticate on spoofed URLs',
        'They can only be used on Windows computers',
        'They send a secondary text message to your phone'
      ],
      correctIndex: 1,
      explanation: 'WebAuthn/FIDO2 keys mathematically link the signature to the browser origin. Even if a user visits a deceptive phishing replica, the key will not release valid credentials to the malicious domain.'
    }
  },
  {
    id: 6,
    slug: 'knowledge-assessment',
    title: 'Comprehensive Knowledge Assessment',
    shortDescription: 'Put your phishing detection skills to the test in a 12-question final certification exam and earn your Phish Hunter badge.',
    icon: 'Award',
    category: 'Certification',
    estimatedMinutes: 12,
    level: 'Comprehensive',
    isAssessment: true,
    sections: [
      {
        heading: 'Final Certification Overview',
        content: `Congratulations on progressing through the Phishing Awareness Training curriculum!

The final assessment evaluates your comprehensive mastery of:
• Deconstructing deceptive email headers and display name spoofing
• Identifying lookalike domains, subdomains, and URL manipulation
• Recognizing psychological social engineering pretexts
• Modern phishing-resistant authentication methods
• Incident response protocols and safe mitigation steps

**Exam Details:**
• 12 multiple-choice and scenario-based questions
• Passing score: **80% (10 out of 12 correct)**
• Instant forensic explanations for every answer
• Completion certificate badge awarded upon passing`
      }
    ],
    keyTakeaways: [
      'Take your time to read each scenario carefully.',
      'Look for subtle domain anomalies and emotional manipulation cues.',
      'Aim for 80% or higher to unlock the certified badge.'
    ]
  }
];
