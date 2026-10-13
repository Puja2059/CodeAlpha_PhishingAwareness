export const CHECKLIST_DATA = {
  individual: [
    {
      id: 'ind-1',
      title: 'Adopt a Dedicated Password Manager',
      description: 'Store unique 16+ character passwords for every account. Leverage automatic domain matching to prevent autofill on lookalike sites.'
    },
    {
      id: 'ind-2',
      title: 'Upgrade to Phishing-Resistant MFA (FIDO2 / Passkeys)',
      description: 'Replace SMS and voice OTPs with hardware security keys (e.g., YubiKey) or passkeys for critical services (Google, Apple, Microsoft, banking).'
    },
    {
      id: 'ind-3',
      title: 'Inspect Envelope Sender Domains Before Responding',
      description: 'Expand display names on mobile and desktop mail clients to verify the true domain after the @ sign.'
    },
    {
      id: 'ind-4',
      title: 'Practice Out-of-Band (OOB) Verification',
      description: 'Verify unexpected financial, credential, or legal requests by placing a direct call using verified numbers, never numbers provided in the message.'
    },
    {
      id: 'ind-5',
      title: 'Keep Browser & Operating System Updated',
      description: 'Enable automated updates to protect against zero-day browser vulnerabilities and malicious web kit exploits.'
    }
  ],
  organizational: [
    {
      id: 'org-1',
      title: 'Enforce Domain Email Authentication (SPF, DKIM, DMARC)',
      description: 'Implement a strict DMARC policy (p=reject) to stop attackers from spoofing your corporate domain name externally.'
    },
    {
      id: 'org-2',
      title: 'Dual-Authorization Controls for Financial Disbursements',
      description: 'Mandate independent two-person approval and verbal callback verification for any wire transfer or vendor banking account modification.'
    },
    {
      id: 'org-3',
      title: 'External Email Warning Banners',
      description: 'Prepend distinct visual banners to inbound messages originating from outside the organization to prevent executive impersonation.'
    },
    {
      id: 'org-4',
      title: 'One-Click "Report Phishing" Button Integration',
      description: 'Empower employees with a streamlined button in Outlook/Gmail to forward raw headers directly to the Security Operations Center (SOC).'
    },
    {
      id: 'org-5',
      title: 'Continuous Phishing Simulations & Blameless Culture',
      description: 'Conduct ongoing interactive simulations and encourage immediate reporting without fear of disciplinary retribution.'
    }
  ]
};
