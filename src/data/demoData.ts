import { CompanyProfile, OpportunityAnalysis, BidReadinessAnalysis, ComplianceItem, MissingDocumentItem, SubmissionTimeline, ProposalDraft, ProposalReadinessReview, AnalysisRecord, ProposalAudit } from '../types';

export const SAMPLE_COMPANY_PROFILE: CompanyProfile = {
  id: 'company-demo-01',
  companyName: 'Apex Tech Solutions Inc.',
  companyDescription: 'Apex Tech Solutions Inc. is an ISO 27001 & CMMI Level 3 certified IT consulting and cloud modernization firm specializing in federal enterprise architecture, cloud analytics, zero-trust cybersecurity, and custom AI pipeline development for public sector agencies.',
  country: 'United States',
  headquarters: 'Arlington, VA',
  companySize: '50-100 employees',
  yearsInBusiness: 9,
  industry: 'Information Technology & Federal Defense Contracting',
  coreCapabilities: [
    'Cloud Architecture & Migration (AWS / GCP / Azure GovCloud)',
    'Zero Trust Cybersecurity & FedRAMP Compliance',
    'Real-time Data Analytics & Predictive Dashboarding',
    'Enterprise AI / ML Pipeline Integration',
    'DevSecOps Automation & Infrastructure as Code (IaC)'
  ],
  productsAndServices: [
    'GovCloud Migration Suite',
    'Apex CyberShield Monitoring',
    'DataStream Analytics Platform',
    'Enterprise Agile Transformation Consulting'
  ],
  technicalExpertise: [
    'PostgreSQL, BigQuery, Snowflake, Firestore',
    'Kubernetes, Terraform, Docker, Microservices',
    'Python, TypeScript, React, Express, Go, Java',
    'NIST 800-53, CMMC 2.0, FedRAMP High, HIPAA'
  ],
  certifications: [
    'ISO 27001:2022 Certified',
    'ISO 9001:2015 Quality Management',
    'CMMI Services Level 3',
    'SBA 8(a) Certified Small Business',
    'AWS Premier GovCloud Partner',
    'Google Cloud Certified Partner'
  ],
  licenses: [
    'Virginia Corporate Business License #VA-883921',
    'DUNS / SAM.gov Registered (UEI: APEX992384KL1)'
  ],
  securityClearances: [
    'Facility Security Clearance (FSC): Top Secret / Secret Level'
  ],
  pastPerformance: [
    {
      id: 'pp-1',
      clientName: 'US Department of Homeland Security (DHS)',
      projectTitle: 'Enterprise Cloud Migration & Zero Trust Modernization',
      contractValue: '$4,200,000',
      periodOfPerformance: '2023 - 2025',
      relevance: 'Migrated legacy infrastructure to FedRAMP High AWS/GCP hybrid environment with 99.99% uptime.',
      keyResults: 'Reduced operational cloud spending by 28% and achieved 100% FedRAMP compliance within 8 months.'
    },
    {
      id: 'pp-2',
      clientName: 'Federal Aviation Administration (FAA)',
      projectTitle: 'Real-time Radar & Flight Telemetry Analytics Engine',
      contractValue: '$2,800,000',
      periodOfPerformance: '2022 - 2024',
      relevance: 'Engineered high-throughput streaming data pipeline processing over 10M daily events.',
      keyResults: 'Improved flight anomaly detection response times by 65% with zero unplanned downtime.'
    },
    {
      id: 'pp-3',
      clientName: 'Commonwealth of Virginia Dept. of Transportation',
      projectTitle: 'Smart Transit Traffic Monitoring & Cyber Defense',
      contractValue: '$1,950,000',
      periodOfPerformance: '2021 - 2023',
      relevance: 'Implemented automated security log monitoring and cloud analytics dashboard.',
      keyResults: 'Protected 45 regional IoT endpoints against ransomware and cyber intrusion threats.'
    }
  ],
  keyPersonnel: [
    {
      id: 'kp-1',
      name: 'Dr. Marcus Vance, PhD',
      role: 'Proposed Program Manager / Chief Technology Officer',
      yearsExperience: 18,
      securityClearance: 'Top Secret / SCI',
      certifications: ['PMP', 'CISSP', 'AWS Solutions Architect Professional', 'Google Professional Cloud Architect'],
      bio: 'Dr. Vance has led 12 large-scale federal cloud modernization programs across DoD, DHS, and DoT over his 18-year career.'
    },
    {
      id: 'kp-2',
      name: 'Elena Rostova, MSc',
      role: 'Lead Cloud & Cybersecurity Systems Architect',
      yearsExperience: 14,
      securityClearance: 'Secret',
      certifications: ['CISM', 'CCSP', 'Certified Kubernetes Administrator (CKA)'],
      bio: 'Former DoD senior cyber strategist specializing in Zero Trust architecture, NIST 800-53 controls, and container security.'
    },
    {
      id: 'kp-3',
      name: 'David Chen, PMP',
      role: 'Quality Assurance & Agile Governance Lead',
      yearsExperience: 11,
      securityClearance: 'Secret',
      certifications: ['PMP', 'Scrum Alliance SAFe Program Consultant', 'ITIL v4 Master'],
      bio: 'Expert in ISO 9001 quality frameworks, CMMI Level 3 process enforcement, and continuous DevSecOps governance.'
    }
  ],
  geographicEligibility: [
    'United States Nationwide',
    'Washington DC Metropolitan Area (DMV)',
    'Remote / Hybrid Federal Delivery'
  ],
  availableTeamSize: 24,
  partnersAndSubcontractors: [
    'CyberSentinel Systems LLC (Subcontractor - Pen Testing & SOC Services)',
    'Global Data Analytics Corp (Partner - Geospatial AI mapping)'
  ],
  differentiators: [
    'Proprietary Automated NIST 800-53 Compliance Verification Tooling',
    'In-house Top Secret Cleared Personnel Ready for Immediate Day-1 Deployment',
    'Proven 100% On-Time, On-Budget Federal Project Execution Record over 9 years',
    'Dual ISO 27001 + CMMI Level 3 Process Maturity'
  ],
  estimatedProposalBudget: '$3,500,000 - $5,000,000',
  preferredProposalTone: 'Formal Government',
  contactName: 'Sarah Jenkins, Vice President of Federal Proposals',
  contactEmail: 'proposals@apextechsolutions.gov.demo',
  contactPhone: '+1 (703) 555-0192'
};

export const SAMPLE_OPPORTUNITY: OpportunityAnalysis = {
  id: 'opp-demo-01',
  createdAt: '2026-08-01',
  opportunityTitle: 'NextGen Cloud Analytics & Zero-Trust Cybersecurity Modernization',
  issuingOrganization: 'US Department of Transportation (USDOT) - Federal Highway Administration',
  solicitationNumber: 'RFP-USDOT-2026-CLOUD-088',
  procurementType: 'RFP',
  submissionDeadline: '2026-09-15T17:00:00Z',
  originalSubmissionDeadline: '2026-08-20T17:00:00Z',
  questionsDeadline: '2026-08-20T17:00:00Z',
  expectedAwardDate: '2026-11-01',
  contractValue: '$4,500,000 Total Estimated Budget (3-Year Base + 2 Option Years)',
  periodOfPerformance: '3 Years Base (2026-2029) + 2 One-Year Option Periods',
  placeOfPerformance: 'Washington, DC (USDOT HQ) & Remote / Hybrid GovCloud Environment',
  contractType: 'Firm-Fixed-Price (FFP) with Time & Materials (T&M) Surge Support',
  
  // Multi-Document Workspace & Traceability Data
  documents: [
    {
      id: 'doc-1',
      filename: 'Main_RFP.pdf',
      type: 'Main Solicitation',
      size: 4280100,
      pageCount: 42,
      uploadedAt: '2026-08-01T10:15:00Z',
      status: 'Processed',
      priority: 'High',
      version: '1.0',
      versionStatus: 'Current',
      contentText: 'UNITED STATES DEPARTMENT OF TRANSPORTATION SOLICITATION RFP-USDOT-2026-CLOUD-088. Section A - Solicitation/Contract Form. Section B - Supplies or Services and Prices/Costs. Section C - Description/Specs/Work Statement. Section D - Packaging and Marking. Section E - Inspection and Acceptance. Section F - Deliveries or Performance. Section G - Contract Administration Data. Section H - Special Contract Requirements. Section I - Contract Clauses. Section J - List of Attachments. Section K - Representation & Certifications. Section L - Instructions to Offerors. Section M - Evaluation Factors for Award.'
    },
    {
      id: 'doc-2',
      filename: 'Statement_of_Work.pdf',
      type: 'Statement of Work',
      size: 2150000,
      pageCount: 18,
      uploadedAt: '2026-08-01T10:16:00Z',
      status: 'Processed',
      priority: 'High',
      version: '1.0',
      versionStatus: 'Current',
      contentText: 'USDOT STATEMENT OF WORK - NEXTGEN CLOUD & ZERO TRUST. Scope includes cloud infrastructure modernization across 5 regional traffic management centers, real-time vehicle telemetry analytics, automated NIST 800-53 security controls baseline, 24/7 SOC monitoring support, and disaster recovery with RTO < 1 hour.'
    },
    {
      id: 'doc-3',
      filename: 'Amendment_01.pdf',
      type: 'Amendment',
      size: 940000,
      pageCount: 6,
      uploadedAt: '2026-08-05T14:30:00Z',
      status: 'Processed',
      priority: 'High',
      version: '1.1',
      amendmentNumber: '01',
      effectiveDate: '2026-08-05',
      versionStatus: 'Current',
      contentText: 'AMENDMENT OF SOLICITATION 01 (SF-30). SOLICITATION NO. RFP-USDOT-2026-CLOUD-088. Item 1: Proposal submission deadline is hereby extended from August 20, 2026 to September 15, 2026 at 5:00 PM EST. Item 2: Cybersecurity control baseline in Section C.3 is upgraded from FedRAMP Moderate to FedRAMP High per NIST SP 800-53 Rev 5 guidelines. Item 3: Key Personnel requirements in Section H.2 are revised to mandate active CISSP or CISM certification for the Lead Cybersecurity Architect.'
    },
    {
      id: 'doc-4',
      filename: 'Pricing_Schedule.pdf',
      type: 'Pricing Schedule',
      size: 680000,
      pageCount: 5,
      uploadedAt: '2026-08-01T10:18:00Z',
      status: 'Processed',
      priority: 'High',
      version: '1.0',
      versionStatus: 'Current',
      contentText: 'ATTACHMENT B - PRICING SCHEDULE & CLIN STRUCTURE. CLIN 0001: Cloud Architecture & Zero Trust Migration (FFP). CLIN 0002: Continuous SOC Operations & Telemetry Monitoring (Monthly FFP). CLIN 0003: T&M Surge Capacity (Labor Rates per Hour for PM, Security Architect, Cloud Engineer, DevSecOps Specialist).'
    },
    {
      id: 'doc-5',
      filename: 'Pricing_Schedule.xlsx',
      type: 'Pricing Schedule',
      size: 450000,
      pageCount: 3,
      uploadedAt: '2026-08-01T10:20:00Z',
      status: 'Processed',
      priority: 'High',
      version: '1.0',
      versionStatus: 'Current',
      isSpreadsheet: true,
      sheetsCount: 3,
      sheetNames: ['CLIN Summary', 'Labor Rates', 'Travel & ODC'],
      hasFormulas: true,
      blankInputRequiredCount: 3,
      isScannedOrImage: false,
      contentText: 'SPREADSHEET WORKBOOK: Pricing_Schedule.xlsx\nSheets: CLIN Summary, Labor Rates, Travel & ODC\nCLIN 0001: Cloud Architecture & Zero Trust Migration - FFP $1,450,000\nCLIN 0002: SOC Operations - FFP $85,000/mo\nLabor Rates Sheet: PM Rate $185/hr, Cloud Architect Rate $195/hr, DevSecOps Specialist [BLANK - REQUIRED BIDDER INPUT], QA Specialist [BLANK - REQUIRED BIDDER INPUT]'
    }
  ],

  pricingWorkbookReview: {
    hasPricingWorkbook: true,
    workbookName: 'Pricing_Schedule.xlsx',
    totalSheets: 3,
    currency: 'USD ($)',
    totalCalculatedValue: '$3,850,000',
    completedFieldsCount: 8,
    missingFieldsCount: 3,
    requiredFields: [
      {
        id: 'rf-1',
        sheetName: 'Labor Rates',
        cellAddress: 'D14',
        label: 'DevSecOps Specialist Hourly Rate',
        currentValue: '[BLANK - USER INPUT REQUIRED]',
        status: 'Missing/Blank',
        isBidderEntered: true,
        isGovernmentPrefilled: false,
        notes: 'Mandatory hourly billing rate required for T&M Option Year 1 labor category.',
        sourceReference: 'Pricing_Schedule.xlsx — Labor Rates — Cell D14'
      },
      {
        id: 'rf-2',
        sheetName: 'Labor Rates',
        cellAddress: 'D18',
        label: 'Senior Cyber Incident Handler Hourly Rate',
        currentValue: '[BLANK - USER INPUT REQUIRED]',
        status: 'Missing/Blank',
        isBidderEntered: true,
        isGovernmentPrefilled: false,
        notes: 'Required rate entry for Level 3 incident response escalation.',
        sourceReference: 'Pricing_Schedule.xlsx — Labor Rates — Cell D18'
      },
      {
        id: 'rf-3',
        sheetName: 'Travel & ODC',
        cellAddress: 'E8',
        label: 'Regional Site Visit Travel Estimation Factor',
        currentValue: '[BLANK - USER INPUT REQUIRED]',
        status: 'Missing/Blank',
        isBidderEntered: true,
        isGovernmentPrefilled: false,
        notes: 'Estimated travel cost multiplier for 5 regional traffic management center visits.',
        sourceReference: 'Pricing_Schedule.xlsx — Travel & ODC — Cell E8'
      }
    ],
    formulaIssues: [
      {
        sheetName: 'CLIN Summary',
        cellAddress: 'F22',
        formula: '=SUM(F6:F20)+G22',
        issue: 'Formula cell F22 references unpopulated column G22. Total sum verified manually.'
      }
    ],
    lineItems: [
      {
        id: 'li-1',
        itemNumber: 'CLIN 0001',
        description: 'Cloud Architecture & Zero Trust Migration Baseline',
        quantity: 1,
        unit: 'Lot',
        unitPrice: '$1,450,000',
        extendedPrice: '$1,450,000',
        totalPrice: '$1,450,000',
        formula: '=D6*E6',
        isBidderInputRequired: false,
        sheetName: 'CLIN Summary',
        sourceCell: 'F6'
      },
      {
        id: 'li-2',
        itemNumber: 'CLIN 0002',
        description: '24/7 SOC Monitoring & Telemetry (12 Months)',
        quantity: 12,
        unit: 'Month',
        unitPrice: '$85,000',
        extendedPrice: '$1,020,000',
        totalPrice: '$1,020,000',
        formula: '=D7*E7',
        isBidderInputRequired: false,
        sheetName: 'CLIN Summary',
        sourceCell: 'F7'
      },
      {
        id: 'li-3',
        itemNumber: 'CLIN 0003A',
        description: 'Program Manager Labor Support (1,200 Hours)',
        quantity: 1200,
        unit: 'Hour',
        unitPrice: '$185',
        extendedPrice: '$222,000',
        laborCategory: 'Program Manager',
        laborHours: 1200,
        laborRate: '$185',
        totalPrice: '$222,000',
        formula: '=D12*E12',
        isBidderInputRequired: false,
        sheetName: 'Labor Rates',
        sourceCell: 'F12'
      },
      {
        id: 'li-4',
        itemNumber: 'CLIN 0003B',
        description: 'DevSecOps Specialist Surge Capacity (1,000 Hours)',
        quantity: 1000,
        unit: 'Hour',
        unitPrice: '[INPUT REQUIRED]',
        extendedPrice: '[INPUT REQUIRED]',
        laborCategory: 'DevSecOps Specialist',
        laborHours: 1000,
        laborRate: '[BLANK]',
        totalPrice: '[INPUT REQUIRED]',
        formula: '=D14*E14',
        isBidderInputRequired: true,
        sheetName: 'Labor Rates',
        sourceCell: 'F14'
      }
    ],
    reconciliationWarning: '3 required pricing fields are unpopulated in Pricing_Schedule.xlsx. Populate cells D14, D18, E8 before final submission.',
    scannedWorkbookWarning: null
  },

  amendments: [
    {
      id: 'amd-1',
      documentId: 'doc-3',
      documentName: 'Amendment_01.pdf',
      amendmentNumber: '01',
      publicationDate: '2026-08-05',
      effectiveDate: '2026-08-05',
      requirementsChanged: [
        'Upgraded cybersecurity baseline in Section C.3 from FedRAMP Moderate to FedRAMP High controls per NIST SP 800-53 Rev 5.',
        'Mandated active CISSP or CISM certification for Lead Cybersecurity Architect position.'
      ],
      deadlinesChanged: [
        'Proposal submission deadline extended from August 20, 2026 to September 15, 2026 at 5:00 PM EST.'
      ],
      formsChanged: [],
      pricingInstructionsChanged: [
        'Updated CLIN 0001 pricing narrative to include FedRAMP High Security Assessment Report (SAR) documentation deliverable.'
      ],
      evaluationCriteriaChanged: [
        'Increased Technical & System Architecture weight in Section M to reward demonstrated FedRAMP High deployment experience.'
      ],
      submissionInstructionsChanged: [],
      newRequirements: [
        'Deliverable 4.2: FedRAMP High System Security Plan (SSP) and Security Assessment Package within 60 days of contract award.'
      ],
      deletedRequirements: [
        'Deleted legacy FedRAMP Moderate baseline compliance reporting requirement.'
      ],
      impactSummaryText: 'Amendment 01 provides a significant 26-day deadline extension to September 15, 2026 while elevating security requirements to FedRAMP High. Apex Tech Solutions holds FedRAMP High DHS migration credentials, making this amendment highly advantageous to our competitive position.'
    }
  ],

  conflicts: [
    {
      id: 'conf-1',
      conflictType: 'Deadline Mismatch',
      issue: 'Proposal submission deadline listed in Main RFP differs from Amendment 01 official update.',
      earlierRequirement: 'Proposal submission due August 20, 2026 at 5:00 PM EST.',
      earlierSource: {
        documentId: 'doc-1',
        documentName: 'Main_RFP.pdf',
        pageNumber: 4,
        sectionName: 'Section A.4 - Submission Schedule'
      },
      laterRequirement: 'Proposal submission deadline extended to September 15, 2026 at 5:00 PM EST.',
      laterSource: {
        documentId: 'doc-3',
        documentName: 'Amendment_01.pdf',
        pageNumber: 2,
        sectionName: 'Item 1 - Revised Submission Schedule'
      },
      recommendedInterpretation: 'Governed by Amendment 01: The active submission deadline is September 15, 2026 at 5:00 PM EST.',
      confidence: 99,
      humanReviewRequired: false
    },
    {
      id: 'conf-2',
      conflictType: 'Technical Spec',
      issue: 'Cybersecurity compliance level specified in Statement of Work conflicts with Amendment 01.',
      earlierRequirement: 'SOW Section 3.2 specifies FedRAMP Moderate baseline controls.',
      earlierSource: {
        documentId: 'doc-2',
        documentName: 'Statement_of_Work.pdf',
        pageNumber: 12,
        sectionName: 'Section 3.2 - Security Baseline'
      },
      laterRequirement: 'Amendment 01 Item 2 supersedes FedRAMP Moderate and mandates FedRAMP High control implementation.',
      laterSource: {
        documentId: 'doc-3',
        documentName: 'Amendment_01.pdf',
        pageNumber: 3,
        sectionName: 'Item 2 - Security Controls Upgrade'
      },
      recommendedInterpretation: 'Governed by Amendment 01: All technical architecture, security controls, and pricing must reflect FedRAMP High compliance.',
      confidence: 98,
      humanReviewRequired: false
    }
  ],

  potentiallyMissingDocs: [
    {
      id: 'pmd-1',
      documentNameRef: 'Attachment D - Small Business Subcontracting Plan Form',
      whereReferenced: 'Main_RFP.pdf — Page 31, Section L.4.2',
      sourceDocumentName: 'Main_RFP.pdf',
      sourcePage: 31,
      importance: 'Medium',
      impactOnAnalysis: 'Referenced in Section L.4.2 for large business primes. Since Apex Tech Solutions is a certified SBA 8(a) small business, a formal subcontracting plan is exempt, but confirmation in proposal narrative is required.'
    }
  ],

  analysisCompleteness: 'MOSTLY COMPLETE',
  completenessReason: '4 core solicitation documents uploaded and reconciled across all amendments. Attachment D (Subcontracting Plan Form) referenced on Page 31 of Main_RFP.pdf is absent from the package, but is exempt for SBA 8(a) small business offerors.',

  requirementsCoverage: {
    totalMandatoryRequirements: 12,
    requirementsAddressed: 11,
    requirementsPartiallyAddressed: 1,
    requirementsNotAddressed: 0,
    coveragePercentage: 92,
    items: [
      {
        requirementId: 'REQ-01',
        requirementText: 'Zero Trust Architecture implementation compliant with Executive Order 14028 and NIST SP 800-207.',
        isMandatory: true,
        sourceDocument: 'Statement_of_Work.pdf',
        sourcePage: 8,
        sourceSection: 'Section C.3.1',
        proposalSectionNumber: 'Volume I - Section 2.1',
        proposalSectionTitle: 'Technical Approach & Zero Trust Architecture',
        coverageStatus: 'Addressed'
      },
      {
        requirementId: 'REQ-02',
        requirementText: 'Real-time telemetry data processing engine capable of handling 5M+ daily traffic events with sub-second latency.',
        isMandatory: true,
        sourceDocument: 'Statement_of_Work.pdf',
        sourcePage: 14,
        sourceSection: 'Section C.4.2',
        proposalSectionNumber: 'Volume I - Section 2.2',
        proposalSectionTitle: 'Real-Time Telemetry Analytics Engine',
        coverageStatus: 'Addressed'
      },
      {
        requirementId: 'REQ-03',
        requirementText: 'FedRAMP High multi-cloud deployment (AWS GovCloud / Google Cloud Gov).',
        isMandatory: true,
        sourceDocument: 'Amendment_01.pdf',
        sourcePage: 3,
        sourceSection: 'Item 2',
        proposalSectionNumber: 'Volume I - Section 2.3',
        proposalSectionTitle: 'Multi-Cloud Architecture & FedRAMP High Security',
        coverageStatus: 'Addressed'
      },
      {
        requirementId: 'REQ-04',
        requirementText: 'Key personnel must include a certified PMP Program Manager with at least 12 years of federal experience.',
        isMandatory: true,
        sourceDocument: 'Main_RFP.pdf',
        sourcePage: 28,
        sourceSection: 'Section H.2',
        proposalSectionNumber: 'Volume II - Section 3.1',
        proposalSectionTitle: 'Key Personnel Qualifications & Leadership',
        coverageStatus: 'Addressed'
      },
      {
        requirementId: 'REQ-05',
        requirementText: '24/7/365 Cyber Incident Response & SOC Support with 15-minute SLA for critical severity events.',
        isMandatory: true,
        sourceDocument: 'Statement_of_Work.pdf',
        sourcePage: 16,
        sourceSection: 'Section C.5.3',
        proposalSectionNumber: 'Volume I - Section 2.4',
        proposalSectionTitle: '24/7 Incident Response & SOC Operations',
        coverageStatus: 'Addressed'
      },
      {
        requirementId: 'REQ-06',
        requirementText: 'Lead Cybersecurity Architect must hold active CISSP or CISM credential.',
        isMandatory: true,
        sourceDocument: 'Amendment_01.pdf',
        sourcePage: 4,
        sourceSection: 'Item 3',
        proposalSectionNumber: 'Volume II - Section 3.2',
        proposalSectionTitle: 'Lead Cybersecurity Architect Credentials',
        coverageStatus: 'Addressed'
      }
    ]
  },

  eligibilityRequirements: [
    'Must be a US-based corporate entity registered in SAM.gov',
    'Active Secret level Facility Security Clearance required at proposal submission',
    'Minimum 5 years of experience delivering cloud solutions for federal or state transportation agencies',
    'Must hold ISO 27001 or equivalent cyber framework certification'
  ],
  mandatoryRequirements: [
    'REQ-01: Zero Trust Architecture implementation compliant with Executive Order 14028 and NIST SP 800-207.',
    'REQ-02: Real-time telemetry data processing engine capable of handling 5M+ daily traffic events with sub-second latency.',
    'REQ-03: FedRAMP High multi-cloud deployment (AWS GovCloud or Google Cloud Gov) [Updated by Amendment 01].',
    'REQ-04: Key personnel must include a certified PMP Program Manager with at least 12 years of federal experience.',
    'REQ-05: Provision of 24/7/365 Cyber Incident Response & SOC Support with 15-minute SLA for critical severity events.',
    'REQ-06: Lead Cybersecurity Architect must hold active CISSP or CISM certification [New in Amendment 01].',
    'REQ-07: Submission of audited financial statements for the past 2 fiscal years demonstrating annual revenue > $3M.'
  ],
  evaluationCriteria: [
    { id: 'ec-1', category: 'Technical & System Architecture', weightOrImportance: '35% (Highest Weight)', description: 'Technical superiority, Zero Trust compliance, scalability, FedRAMP High security, and cloud architecture resilience.' },
    { id: 'ec-2', category: 'Management & Staffing Approach', weightOrImportance: '25%', description: 'Qualifications of Key Personnel (PMP Program Manager & CISSP Architect), staffing availability, agile management, and transition plan.' },
    { id: 'ec-3', category: 'Past Performance & References', weightOrImportance: '20%', description: 'Demonstrated past performance on highly relevant federal cloud and cybersecurity projects within last 3 years.' },
    { id: 'ec-4', category: 'Cost / Price Realism', weightOrImportance: '20%', description: 'Cost reasonableness, transparent labor rate breakdown, and risk mitigation in fixed-price delivery.' }
  ],
  technicalRequirements: [
    'Multi-cloud Kubernetes cluster management (EKS/GKE)',
    'Automated NIST SP 800-53 Rev 5 security control mapping (FedRAMP High Baseline)',
    'API gateway with OAuth 2.0 / SAML 2.0 single sign-on integration',
    'Disaster recovery with Recovery Time Objective (RTO) < 1 hour and RPO < 15 minutes'
  ],
  managementRequirements: [
    'Bi-weekly Agile sprint demonstrations and burndown metrics reporting',
    'Quality Control Plan (QCP) aligned with ISO 9001 or CMMI frameworks',
    'Comprehensive Transition-In Plan completing full system takeover within 30 days of award'
  ],
  staffingRequirements: [
    'Program Manager (PMP, 12+ yrs experience, Secret clearance)',
    'Lead Security Architect (CISSP/CCSP required per Amendment 01, Secret clearance)',
    'Senior Cloud Engineer (AWS/GCP Certified Professional)'
  ],
  experienceRequirements: [
    'At least 3 past performance references within the last 3 years exceeding $1.5M in contract value'
  ],
  requiredCertifications: [
    'ISO 27001 Certification',
    'PMP for Program Manager',
    'CISSP or CISM for Lead Security Architect (Mandated by Amendment 01)'
  ],
  securityRequirements: [
    'Secret Facility Clearance',
    'All personnel must pass USDOT Background Investigation (Public Trust / Secret)'
  ],
  insuranceRequirements: [
    'Commercial General Liability ($2M per occurrence / $4M aggregate)',
    'Cyber Errors & Omissions Insurance ($5M aggregate)'
  ],
  financialRequirements: [
    'Audited financial statements for FY2024 and FY2025'
  ],
  requiredForms: [
    'Standard Form 1449 (Solicitation/Contract/Order for Commercial Items)',
    'Representations and Certifications (FAR 52.212-3)',
    'Form SF-30 Amendment 01 Acknowledgment'
  ],
  requiredAttachments: [
    'Volume I: Technical & Management Proposal (Max 40 Pages)',
    'Volume II: Past Performance References (Max 15 Pages)',
    'Volume III: Cost/Price Proposal & Labor Rate Matrix (Excel/PDF)',
    'Key Personnel Resumes and Signed Letters of Intent'
  ],
  submissionInstructions: 'Submissions must be transmitted electronically via email to proposals@dot.gov with subject line "SOLICITATION RFP-USDOT-2026-CLOUD-088 - [OFFEROR NAME]". Hard copies will not be accepted.',
  pageLimits: 'Volume I: 40 pages maximum (excluding Cover Page, TOC, and Resumes). Volume II: 15 pages maximum.',
  formattingRules: '12pt Times New Roman or Arial font, 1-inch margins on all sides, single-spaced, PDF format with searchable text.',
  pricingInstructions: 'Provide fully burdened hourly rates for all labor categories across Base Year and Option Years in the provided Pricing_Schedule.pdf template.',
  keyContractualClauses: [
    'FAR 52.227-14 Rights in Data - General',
    'FAR 52.204-21 Basic Safeguarding of Covered Contractor Information Systems',
    'FAR 52.212-4 Contract Terms and Conditions - Commercial Products and Commercial Services'
  ],
  disqualificationRisks: [
    'Late submission past September 15, 2026 5:00 PM EST (Updated by Amendment 01)',
    'Failure to submit active Secret Facility Clearance proof',
    'Exceeding page limit of 40 pages on Volume I Technical Proposal',
    'Failure to demonstrate CISSP/CISM credentials for Lead Security Architect (Amendment 01 Requirement)'
  ],
  overviewText: 'The US Department of Transportation seeks a qualified contractor to modernize its cloud analytics platform and implement zero-trust cybersecurity across multi-cloud transportation databases. Governed by 4 solicitation documents including Amendment 01, which extends deadline to Sept 15, 2026 and elevates cyber baseline to FedRAMP High.',
  specifiedStructure: [
    'Volume I: Technical & System Architecture',
    'Volume II: Management, Staffing & Governance',
    'Volume III: Past Performance & References',
    'Volume IV: Cost / Price Proposal'
  ]
};

// Strict scoring calculation:
// 30% Eligibility (100) + 25% Technical (95) + 15% Past Perf (90) + 15% Commercial (85) + 15% Delivery (90)
// = (0.30*100) + (0.25*95) + (0.15*90) + (0.15*85) + (0.15*90)
// = 30 + 23.75 + 13.5 + 12.75 + 13.5 = 93.5 -> 94
export const SAMPLE_BID_READINESS: BidReadinessAnalysis = {
  recommendation: 'GO',
  componentScores: {
    eligibilityAlignment: 100,
    technicalCapabilityAlignment: 95,
    pastPerformanceAlignment: 90,
    commercialAttractiveness: 85,
    deliveryFeasibility: 90
  },
  overallFitScore: 94,
  confidenceScore: 92,
  executiveAssessment: 'Apex Tech Solutions presents an exceptionally strong alignment for RFP-USDOT-2026-CLOUD-088. All mandatory eligibility requirements are fully satisfied, including SAM.gov active status, Secret Facility Clearance, ISO 27001 certification, and relevant federal past performance with DHS and FAA.',
  eligibilityDetermination: 'FULLY ELIGIBLE. Offeror possesses all required corporate clearances, registrations, ISO certifications, and financial history.',
  technicalAlignmentText: 'High Technical Alignment (95%). Core capabilities directly match multi-cloud deployment, zero trust frameworks (NIST 800-207), and high-throughput real-time streaming telemetry.',
  pastPerformanceAlignmentText: 'Strong Past Performance (90%). Three recent federal contracts exceeding $1.9M - $4.2M directly mirror the USDOT operational scope and technology stack.',
  deliveryFeasibilityText: 'High Feasibility (90%). Key personnel (Dr. Marcus Vance and Elena Rostova) exceed experience requirements and possess active Top Secret/Secret clearances.',
  commercialAttractivenessText: 'Attractive Commercial Fit (85%). Project scope ($4.5M) aligns with Apex Tech’s target proposal budget ($3.5M-$5.0M) with healthy labor rate margins.',
  complianceRiskText: 'Low Compliance Risk. Key risk is strictly adhering to the 40-page technical volume limit and submitting audited FY24/25 financials.',
  proposalEffortEstimateHours: 65,
  estimatedPrepCostUSD: 9750,
  recommendedBidStrategy: 'Pursue Prime Bid aggressively. Highlight dual ISO 27001/CMMI Level 3 certifications, immediate Day-1 Secret cleared team availability, and proven DHS zero-trust implementation success.'
};

export const SAMPLE_COMPLIANCE_MATRIX: ComplianceItem[] = [
  {
    id: 'cm-1',
    requirementId: 'REQ-01',
    requirement: 'Zero Trust Architecture implementation compliant with Executive Order 14028 and NIST SP 800-207.',
    requirementType: 'Mandatory',
    isMandatory: true,
    sourceSection: 'Section C.3.1',
    sourcePage: 'Page 8',
    sourceDocument: 'Statement_of_Work.pdf',
    companyStatus: 'MET',
    evidenceFromProfile: 'Apex CyberShield framework built on NIST 800-207 Zero Trust architecture. Proven DHS contract implementation.',
    gap: 'None. Full capability.',
    recommendedAction: 'Highlight DHS Zero Trust case study and architectural diagram in Volume I Section 2.',
    proposalSectionAddressed: 'Volume I - Section 2.1 Technical Approach & Zero Trust',
    amendmentStatus: 'Original',
    confidence: 98,
    riskLevel: 'Low'
  },
  {
    id: 'cm-2',
    requirementId: 'REQ-02',
    requirement: 'Real-time telemetry data processing engine capable of handling 5M+ daily traffic events with sub-second latency.',
    requirementType: 'Technical',
    isMandatory: true,
    sourceSection: 'Section C.4.2',
    sourcePage: 'Page 14',
    sourceDocument: 'Statement_of_Work.pdf',
    companyStatus: 'MET',
    evidenceFromProfile: 'DataStream Analytics Platform processes 10M+ daily flight telemetry events for FAA with 65% latency reduction.',
    gap: 'None. Directly exceeds required 5M daily threshold.',
    recommendedAction: 'Include FAA telemetry performance metrics graph and latency benchmark chart.',
    proposalSectionAddressed: 'Volume I - Section 2.2 Cloud Analytics Engine',
    amendmentStatus: 'Original',
    confidence: 96,
    riskLevel: 'Low'
  },
  {
    id: 'cm-3',
    requirementId: 'REQ-03',
    requirement: 'FedRAMP High multi-cloud deployment (AWS GovCloud or Google Cloud Gov) [Upgraded in Amendment 01].',
    requirementType: 'Technical',
    isMandatory: true,
    sourceSection: 'Item 2',
    sourcePage: 'Page 3',
    sourceDocument: 'Amendment_01.pdf',
    companyStatus: 'MET',
    evidenceFromProfile: 'AWS Premier GovCloud Partner and Google Cloud Certified Partner with FedRAMP High DHS migration record.',
    gap: 'None. DHS past performance already certified at FedRAMP High baseline.',
    recommendedAction: 'Emphasize dual AWS/GCP GovCloud certifications and FedRAMP High System Security Plan experience.',
    proposalSectionAddressed: 'Volume I - Section 2.3 Multi-Cloud Architecture',
    amendmentStatus: 'Amended',
    confidence: 95,
    riskLevel: 'Low'
  },
  {
    id: 'cm-4',
    requirementId: 'REQ-04',
    requirement: 'Key personnel must include a certified PMP Program Manager with at least 12 years of federal experience.',
    requirementType: 'Staffing',
    isMandatory: true,
    sourceSection: 'Section H.2',
    sourcePage: 'Page 28',
    sourceDocument: 'Main_RFP.pdf',
    companyStatus: 'MET',
    evidenceFromProfile: 'Dr. Marcus Vance (PMP, CISSP) has 18 years of federal program management experience.',
    gap: 'None. Exceeds requirement by 6 years.',
    recommendedAction: 'Attach Dr. Vance resume and signed Letter of Intent in Appendix A.',
    proposalSectionAddressed: 'Volume II - Key Personnel & Resumes',
    amendmentStatus: 'Original',
    confidence: 99,
    riskLevel: 'Low'
  },
  {
    id: 'cm-5',
    requirementId: 'REQ-05',
    requirement: '24/7/365 Cyber Incident Response & SOC Support with 15-minute SLA for critical severity events.',
    requirementType: 'Management',
    isMandatory: true,
    sourceSection: 'Section C.5.3',
    sourcePage: 'Page 16',
    sourceDocument: 'Statement_of_Work.pdf',
    companyStatus: 'PARTIALLY MET',
    evidenceFromProfile: 'In-house SOC operates 18/7. Partner CyberSentinel Systems LLC provides overnight 24/7 incident coverage.',
    gap: 'Requires subcontractor CyberSentinel Systems for seamless 24/7 coverage.',
    recommendedAction: 'Detail joint SOC escalation workflow with CyberSentinel Systems LLC in Management volume.',
    proposalSectionAddressed: 'Volume II - Section 3.2 Cyber SOC & Escalation SLA',
    amendmentStatus: 'Original',
    confidence: 88,
    riskLevel: 'Medium'
  },
  {
    id: 'cm-6',
    requirementId: 'REQ-06',
    requirement: 'Lead Cybersecurity Architect must hold active CISSP or CISM certification [New in Amendment 01].',
    requirementType: 'Staffing',
    isMandatory: true,
    sourceSection: 'Item 3',
    sourcePage: 'Page 4',
    sourceDocument: 'Amendment_01.pdf',
    companyStatus: 'MET',
    evidenceFromProfile: 'Elena Rostova holds active CISM & CCSP. Proposed PM Dr. Marcus Vance holds active CISSP.',
    gap: 'None.',
    recommendedAction: 'Highlight Elena Rostova CISM credential and attach certificate copy.',
    proposalSectionAddressed: 'Volume II - Section 3.2 Lead Cybersecurity Architect Credentials',
    amendmentStatus: 'New in Amendment',
    confidence: 97,
    riskLevel: 'Low'
  },
  {
    id: 'cm-7',
    requirementId: 'REQ-07',
    requirement: 'Submission of audited financial statements for the past 2 fiscal years demonstrating revenue > $3M.',
    requirementType: 'Financial/Legal',
    isMandatory: true,
    sourceSection: 'Section L.8',
    sourcePage: 'Page 38',
    sourceDocument: 'Main_RFP.pdf',
    companyStatus: 'MET',
    evidenceFromProfile: 'Audited financials for FY24 and FY25 prepared by KPMG available.',
    gap: 'None.',
    recommendedAction: 'Include CPA-audited financial summary in Volume IV Appendix.',
    proposalSectionAddressed: 'Volume IV - Financial Attachments',
    amendmentStatus: 'Original',
    confidence: 99,
    riskLevel: 'Low'
  }
];

export const SAMPLE_MISSING_DOCS: MissingDocumentItem[] = [
  {
    id: 'md-1',
    documentType: 'Signed Form SF-1449',
    description: 'Solicitation cover sheet signed by authorized corporate officer',
    isMandatory: true,
    status: 'Action Required',
    actionNeeded: 'Generate filled SF-1449 and obtain VP signature before submission date.'
  },
  {
    id: 'md-2',
    documentType: 'Signed Letters of Intent (Key Personnel)',
    description: 'Letters of intent for Dr. Marcus Vance and Elena Rostova',
    isMandatory: true,
    status: 'Ready',
    actionNeeded: 'PDF copies signed and archived in proposal package repository.'
  },
  {
    id: 'md-3',
    documentType: 'Cyber E&O Insurance Certificate ($5M)',
    description: 'Proof of commercial cyber liability insurance coverage',
    isMandatory: true,
    status: 'Ready',
    actionNeeded: 'Certificate of Insurance attached.'
  },
  {
    id: 'md-4',
    documentType: 'Subcontractor Teaming Agreement',
    description: 'Executed teaming agreement with CyberSentinel Systems LLC',
    isMandatory: false,
    status: 'In Progress',
    actionNeeded: 'Finalize Schedule B labor rates with CyberSentinel by Aug 22.'
  }
];

export const SAMPLE_TIMELINE: SubmissionTimeline = {
  questionsDeadline: '2026-08-20T17:00:00Z',
  intentToBidDeadline: '2026-08-22T17:00:00Z',
  siteVisitDeadline: 'N/A (Virtual Procurement)',
  registrationDeadline: 'Active in SAM.gov',
  proposalSubmissionDeadline: '2026-09-15T17:00:00Z',
  internalReviewDeadline: '2026-09-10T12:00:00Z',
  draftCompletionTarget: '2026-09-01T17:00:00Z',
  pricingCompletionTarget: '2026-09-05T17:00:00Z',
  finalComplianceReviewDate: '2026-09-12T09:00:00Z',
  submissionReadinessDate: '2026-09-14T12:00:00Z'
};

export const SAMPLE_PROPOSAL_DRAFT: ProposalDraft = {
  id: 'prop-demo-01',
  opportunityId: 'opp-demo-01',
  companyId: 'company-demo-01',
  title: 'Full First-Draft Proposal for RFP-USDOT-2026-CLOUD-088',
  createdAt: '2026-08-07',
  updatedAt: '2026-08-07',
  executiveSummaryText: 'Apex Tech Solutions Inc. is pleased to present this comprehensive proposal to the US Department of Transportation for the NextGen Cloud Analytics & Zero-Trust Cybersecurity Modernization program. Combining 9 years of federal cloud engineering expertise with an active Top Secret facility clearance, ISO 27001 certification, and CMMI Level 3 process maturity, Apex offers USDOT a low-risk, high-performance partner ready for immediate deployment.',
  technicalResponseText: 'Our technical approach centers on a microservices-based multi-cloud architecture deployed on FedRAMP High AWS GovCloud and Google Cloud Platform. The solution leverages Kubernetes orchestration, automated Terraform infrastructure, and a real-time event pipeline capable of processing over 10,000,000 daily telemetry streams with sub-second latency.',
  sections: [
    {
      id: 'sec-1',
      sectionNumber: 'Volume I - 1.0',
      title: 'Executive Summary',
      relevantRfpSection: 'Section L.4 / Section M.1',
      relevantSourcePage: 'Page 8',
      requirementIds: ['REQ-01', 'REQ-03'],
      content: `# Executive Summary

## 1.1 Understanding of the USDOT Mission & Challenge
The Federal Highway Administration requires a modernized, resilient, multi-cloud analytics infrastructure paired with Zero Trust cybersecurity to protect critical transportation telemetry data across 50 state jurisdictions. Modern transportation networks demand real-time data ingest (5M+ daily events) with zero downtime and strict compliance with Executive Order 14028.

## 1.2 Proposed Apex Solution Overview
Apex Tech Solutions proposes **Apex GovCloud Modernizer & CyberShield**, a battle-tested, FedRAMP High compliant framework engineered specifically for public sector telemetry and high-consequence data analytics.

Key pillars of the Apex solution include:
- **Zero Trust Security Architecture**: Native NIST SP 800-207 implementation featuring automated identity verification, micro-segmentation, and Continuous Diagnostics and Mitigation (CDM).
- **High-Throughput Analytics Engine**: Built on serverless stream processing (Apache Kafka / BigQuery / GCP PubSub) proven on FAA radar analytics handling 10M+ daily events with 65% latency reduction.
- **ISO 27001 & CMMI Level 3 Governance**: Rigorous quality assurance backed by active Top Secret facility cleared engineers ready for immediate Day-1 ramp-up.

## 1.3 Key Differentiators & Value Proposition
1. **Immediate Execution Readiness**: In-house cleared key personnel (Dr. Marcus Vance, Elena Rostova) with active Top Secret/Secret credentials require zero onboarding lead time.
2. **Proven Federal Performance**: Successfully executed highly relevant cloud modernization contracts for DHS ($4.2M) and FAA ($2.8M) with 100% on-time milestone completion.
3. **Guaranteed Compliance**: Dual ISO 27001 / ISO 9001 certifications ensure flawless quality control and continuous FedRAMP audit readiness.
`
    },
    {
      id: 'sec-2',
      sectionNumber: 'Volume I - 2.0',
      title: 'Technical Approach & System Architecture',
      relevantRfpSection: 'Section C.3 & Section C.4',
      relevantSourcePage: 'Pages 12-19',
      requirementIds: ['REQ-01', 'REQ-02', 'REQ-03'],
      content: `# Technical Approach & System Architecture

## 2.1 Zero Trust Security Framework (NIST SP 800-207 & EO 14028)
Apex implements a strict Zero Trust Architecture (ZTA) enforcing explicit verification, least privilege access, and assumed breach posture across all USDOT cloud compute and data boundaries.

### Architectural Controls:
- **Identity & Access Management (IAM)**: Integration with USDOT Single Sign-On (SSO) via SAML 2.0 and mandatory Multi-Factor Authentication (MFA).
- **Micro-segmentation**: Containerized workload segregation using Kubernetes NetworkPolicies and Istio service mesh mTLS encryption in transit (TLS 1.3).
- **Data Protection at Rest**: Hardware Security Module (HSM) backed AES-256 encryption across all storage volumes and database instances.

## 2.2 Real-Time Cloud Telemetry & Analytics Engine
To fulfill USDOT's requirement for processing 5M+ daily traffic telemetry events with sub-second latency, Apex deploys a distributed streaming architecture:
1. **Ingest Layer**: API Gateway cluster behind Cloudflare GovShield with automated DDoS protection and rate limiting.
2. **Stream Processing**: Apache Flink / Kafka pipeline with auto-scaling compute worker nodes.
3. **Analytical Data Store**: Columnar storage optimized for high-speed spatial-temporal querying and automated retention policy enforcement.

[USER INPUT REQUIRED: Insert specific USDOT legacy database schema connection strings if applicable]`
    },
    {
      id: 'sec-3',
      sectionNumber: 'Volume II - 1.0',
      title: 'Management Approach, Governance & Staffing',
      relevantRfpSection: 'Section C.6 & Section H.2',
      relevantSourcePage: 'Pages 25-32',
      requirementIds: ['REQ-04', 'REQ-05'],
      content: `# Management Approach, Governance & Staffing

## 3.1 Program Management & Agile Governance
Apex utilizes an Agile DevSecOps management framework operating under CMMI Services Level 3 standards.
- **Sprint Cadence**: 2-week sprint cycles with bi-weekly demonstrations for USDOT stakeholders.
- **Risk & Quality Oversight**: Integrated ISO 9001 Quality Control Plan overseen directly by Program Manager Dr. Marcus Vance.

## 3.2 Key Personnel Qualifications
- **Program Manager**: Dr. Marcus Vance, PhD (PMP, CISSP) - 18 Years Federal PM experience.
- **Lead Security Architect**: Elena Rostova, MSc (CISM, CCSP) - 14 Years Zero Trust & FedRAMP experience.
- **Quality Assurance Lead**: David Chen, PMP (SAFe SPC) - 11 Years CMMI L3 governance experience.

## 3.3 24/7/365 Cyber Incident Response & SOC Operations
To guarantee full 24/7 coverage and a 15-minute SLA for critical severity incidents, Apex integrates its primary SOC with specialized tier-3 escalation partner CyberSentinel Systems LLC.
`
    },
    {
      id: 'sec-4',
      sectionNumber: 'Volume III - 1.0',
      title: 'Corporate Experience & Past Performance',
      relevantRfpSection: 'Section L.6 & Section M.3',
      relevantSourcePage: 'Pages 33-36',
      requirementIds: ['REQ-06'],
      content: `# Corporate Experience & Past Performance

## 4.1 Relevant Contract 1: US Department of Homeland Security (DHS)
- **Contract Name**: Enterprise Cloud Migration & Zero Trust Modernization
- **Value**: $4,200,000 | **Period**: 2023 - 2025
- **Relevance**: Direct multi-cloud zero trust architecture implementation for federal agency matching USDOT parameters.

## 4.2 Relevant Contract 2: Federal Aviation Administration (FAA)
- **Contract Name**: Real-time Radar & Telemetry Analytics Engine
- **Value**: $2,800,000 | **Period**: 2022 - 2024
- **Relevance**: High-throughput telemetry data stream processing (10M+ daily events).

## 4.3 Relevant Contract 3: Commonwealth of Virginia Dept. of Transportation
- **Contract Name**: Smart Transit Traffic Monitoring & Cyber Defense
- **Value**: $1,950,000 | **Period**: 2021 - 2023
- **Relevance**: State DOT traffic telemetry monitoring and cloud security baseline.
`
    },
    {
      id: 'sec-5',
      sectionNumber: 'Volume IV - 1.0',
      title: 'Cost / Price Narrative & Labor Structure',
      relevantRfpSection: 'Section L.8 / Pricing Template',
      relevantSourcePage: 'Pages 38-40',
      requirementIds: [],
      content: `# Cost / Price Narrative & Labor Structure

> **Pricing requires user validation before submission.**

## 5.1 Pricing Structure Overview
Apex proposes a Firm-Fixed-Price (FFP) structure for core engineering, cloud setup, and baseline SOC support, combined with Time & Materials (T&M) surge support for task-order based custom feature developments.

## 5.2 Labor Category Breakdown & Hourly Estimates
- **Program Manager (PMP)**: 1,800 Hours/Yr | Fully Burdened Rate: [USER INPUT REQUIRED: Confirm Rate]
- **Lead Security Architect**: 2,000 Hours/Yr | Fully Burdened Rate: [USER INPUT REQUIRED: Confirm Rate]
- **Senior Cloud Engineer**: 3,600 Hours/Yr | Fully Burdened Rate: [USER INPUT REQUIRED: Confirm Rate]
- **DevSecOps Engineer**: 2,000 Hours/Yr | Fully Burdened Rate: [USER INPUT REQUIRED: Confirm Rate]

## 5.3 Cost Assumptions & Financial Statements
1. All cloud infrastructure costs (AWS/GCP consumption) billed directly to government via USDOT enterprise billing agreement.
2. Attached in Appendix IV-A are CPA-audited financial statements for FY2024 and FY2025.
`
    }
  ],
  projectPlan: [
    {
      id: 'phase-1',
      phaseName: 'Phase 1: Mobilization & Transition-In',
      duration: 'Month 1 (Days 1 - 30)',
      activities: ['Kickoff meeting', 'Security clearance validation', 'Environment provisioning', 'Initial gap analysis'],
      deliverables: ['Final Project Management Plan', 'Transition-In Roadmap', 'System Security Plan (SSP) Draft'],
      dependencies: ['Award Notice', 'GovCloud Account Access'],
      milestones: ['Day 15 Clearance Approval', 'Day 30 Governance Kickoff'],
      responsibilities: 'Program Manager & Lead Security Architect'
    },
    {
      id: 'phase-2',
      phaseName: 'Phase 2: Zero Trust Baseline & Ingest Engine Deployment',
      duration: 'Months 2 - 6',
      activities: ['Zero trust network microsegmentation', 'Telemetry streaming pipeline setup', 'API Gateway integration'],
      deliverables: ['Zero Trust Deployment Report', 'Telemetry Ingest Engine (5M+ events/day capacity)'],
      dependencies: ['Phase 1 Infrastructure Signoff'],
      milestones: ['Month 3 Streaming Pipeline Benchmark', 'Month 6 Security ATO Assessment'],
      responsibilities: 'Cloud Engineering Team & Security Architect'
    },
    {
      id: 'phase-3',
      phaseName: 'Phase 3: Operations, SOC Support & Continuous Optimization',
      duration: 'Months 7 - 36',
      activities: ['24/7/365 SOC monitoring', 'Quarterly disaster recovery dry-runs', 'Continuous FedRAMP audit maintenance'],
      deliverables: ['Monthly SLA Performance Reports', 'Annual System Audits'],
      dependencies: ['Authority to Operate (ATO) Approval'],
      milestones: ['Quarterly Performance Reviews', 'Option Year Review'],
      responsibilities: 'SOC Lead & Program Manager'
    }
  ],
  riskRegister: [
    {
      id: 'rr-1',
      risk: 'Delay in obtaining GovCloud account elevated permissions from USDOT IT team',
      probability: 'Medium',
      impact: 'Medium',
      severity: 'Moderate',
      mitigation: 'Submit pre-populated clearance and account request forms on Day 1 of contract award.',
      contingency: 'Initiate staging development in local isolated sandbox while permissions propagate.',
      owner: 'Dr. Marcus Vance (PM)'
    },
    {
      id: 'rr-2',
      risk: 'Unforeseen spikes in traffic telemetry exceeding 15M daily events',
      probability: 'Low',
      impact: 'High',
      severity: 'Moderate',
      mitigation: 'Implement auto-scaling Kubernetes worker pools with buffer queues in Kafka.',
      contingency: 'Dynamically allocate additional cloud compute under T&M surge task order.',
      owner: 'Elena Rostova (Lead Architect)'
    },
    {
      id: 'rr-3',
      risk: 'Subcontractor SOC coverage communication gap during handoff hours',
      probability: 'Low',
      impact: 'High',
      severity: 'Critical',
      mitigation: 'Standardize PagerDuty automated escalation protocols and joint daily standups.',
      contingency: 'Maintain 24/7 secondary on-call primary Apex engineer rotation.',
      owner: 'David Chen (QA Lead)'
    }
  ],
  pricingSupport: {
    pricingStructureRecommendations: 'Propose Firm-Fixed-Price (FFP) for core engineering and SOC maintenance, plus T&M labor rate schedule for ad-hoc technical enhancements.',
    laborCategories: [
      { category: 'Program Manager (PMP, 18 yrs exp)', rateEstimate: '$185 / hr', estimatedHours: 1800 },
      { category: 'Lead Security Architect (CISSP, Secret)', rateEstimate: '$170 / hr', estimatedHours: 2000 },
      { category: 'Senior Cloud Engineer (AWS/GCP Certified)', rateEstimate: '$150 / hr', estimatedHours: 3600 },
      { category: 'DevSecOps & Automation Engineer', rateEstimate: '$140 / hr', estimatedHours: 2000 },
      { category: 'QA & Compliance Governance Lead', rateEstimate: '$130 / hr', estimatedHours: 1200 }
    ],
    estimatedTotalHours: 10600,
    costCategories: [
      { category: 'Direct Labor', description: 'Core personnel engineering & project management', estimatedCost: '$1,620,000 / yr' },
      { category: 'Subcontractor Services', description: 'CyberSentinel Systems 24/7 SOC escalation support', estimatedCost: '$280,000 / yr' },
      { category: 'Other Direct Costs (ODC)', description: 'Travel to USDOT HQ, testing tools, software licenses', estimatedCost: '$45,000 / yr' }
    ],
    assumptions: [
      'USDOT provides cloud infrastructure subscription billing accounts.',
      'Labor rates escalated by 3.5% for Option Years 1 and 2.',
      'Facility security clearances maintained at no cost to government.'
    ],
    pricingChecklist: [
      'FAR 52.212-3 Certifications included',
      'Labor rate matrix attached in Excel',
      'Audited financial statements attached',
      'Subcontractor cost breakdown validated'
    ],
    missingPricingInputs: [
      'Final approved overhead rate percentage',
      'Option year 2 travel cost allowance'
    ],
    disclaimer: 'Pricing requires user validation before submission.'
  }
};

export const SAMPLE_READINESS_REVIEW: ProposalReadinessReview = {
  overallScore: 94,
  categories: {
    complianceScore: 98,
    completenessScore: 95,
    technicalStrengthScore: 96,
    evidenceScore: 92,
    clarityScore: 94,
    differentiationScore: 91,
    riskScore: 89,
    submissionReadinessScore: 95
  },
  unansweredRequirements: [],
  unsupportedClaims: [
    'Claim in Volume I Section 2.2 regarding 99.999% SLA needs past FAA performance uptime record reference appended.'
  ],
  missingDocuments: [
    'Form SF-1449 signature pending final VP execution.',
    'Final Schedule B rate sheet signed by Subcontractor CyberSentinel Systems LLC.'
  ],
  missingPricing: [
    'Confirm fully burdened hourly rates for Option Years 1 and 2.'
  ],
  contradictoryStatements: [],
  incompleteSections: [],
  pageLimitRisks: [
    'Volume I is currently at 36 pages (Page limit is 40 pages max). Maintain current concise font formatting.'
  ],
  disqualificationRisks: [
    'Ensure email submission subject line matches exact string specified in RFP Section L.'
  ],
  actionableRecommendations: [
    'Obtain signature on SF-1449 immediately.',
    'Confirm option-year labor rates with finance team.',
    'Verify searchable text layer on generated PDF export before sending to dot.gov.'
  ]
};

export const SAMPLE_ANALYSIS_RECORD: AnalysisRecord = {
  id: 'rec-demo-01',
  title: SAMPLE_OPPORTUNITY.opportunityTitle,
  clientOrganization: SAMPLE_OPPORTUNITY.issuingOrganization,
  dateAnalyzed: '2026-08-07',
  fitScore: SAMPLE_BID_READINESS.overallFitScore,
  recommendation: SAMPLE_BID_READINESS.recommendation,
  proposalStatus: 'Draft Generated',
  companyProfile: SAMPLE_COMPANY_PROFILE,
  opportunity: SAMPLE_OPPORTUNITY,
  bidReadiness: SAMPLE_BID_READINESS,
  complianceMatrix: SAMPLE_COMPLIANCE_MATRIX,
  missingDocuments: SAMPLE_MISSING_DOCS,
  submissionTimeline: SAMPLE_TIMELINE,
  proposalDraft: SAMPLE_PROPOSAL_DRAFT,
  readinessReview: SAMPLE_READINESS_REVIEW,
  isDemo: true
};

export const DEMO_ANALYSIS_RECORD = SAMPLE_ANALYSIS_RECORD;

export const DEMO_PROPOSAL_DRAFT = SAMPLE_PROPOSAL_DRAFT;

export const DEMO_PROPOSAL_AUDIT: ProposalAudit = {
  overallReadinessScore: 93,
  readinessGrade: 'A',
  summaryVerdict: 'Proposal package is highly compliant and grounded in verified Apex Tech credentials. All technical requirements are satisfied. 2 user placeholders require final rate confirmation.',
  scores: {
    groundingScore: 98,
    complianceCoverageScore: 96,
    placeholderFillScore: 90,
    attachmentReadinessScore: 92,
    toneScore: 95,
    pricingValidationScore: 88
  },
  findings: [
    {
      id: 'f-1',
      severity: 'High',
      category: 'Placeholder Input Required',
      sectionRef: 'Volume IV - Section 5.2',
      issue: 'Fully burdened hourly rates contain [USER INPUT REQUIRED] placeholders.',
      recommendedAction: 'Input corporate fully burdened hourly rates before final submission to USDOT.'
    },
    {
      id: 'f-2',
      severity: 'Medium',
      category: 'Signature Verification',
      sectionRef: 'Required Attachments',
      issue: 'Form SF-1449 requires physical or digital signature of corporate VP.',
      recommendedAction: 'Print or sign PDF Form SF-1449 and attach to submission package.'
    },
    {
      id: 'f-3',
      severity: 'Low',
      category: 'Subcontractor Teaming',
      sectionRef: 'Volume II - Section 3.3',
      issue: 'CyberSentinel Systems teaming agreement Schedule B pending final signature.',
      recommendedAction: 'Confirm executed copy of teaming agreement is stored in proposal records.'
    }
  ]
};

