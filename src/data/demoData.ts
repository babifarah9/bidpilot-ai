import { CompanyProfile, Opportunity, OpportunityDocument, OpportunityAnalysis, ComplianceRequirement, AmendmentItem, ConflictItem, MissingDocumentItem, PricingCell, ProposalData, ReadinessReview } from '../types';

export const DEMO_COMPANY_PROFILE: CompanyProfile = {
  companyName: "Apex GovTech Solutions LLC",
  companyDescription: "Apex GovTech Solutions LLC is a premier SDVOSB technology consulting firm specializing in enterprise cloud architecture, DevSecOps automation, cyber defense, and mission-critical system modernization for federal agencies.",
  country: "United States",
  headquarters: "Reston, VA",
  companySize: "120 Employees",
  yearsInBusiness: 11,
  industry: "Government IT Services & Cyber Security",
  coreCapabilities: [
    "Enterprise Cloud Migration & Architecture (AWS, Azure, GCP)",
    "DevSecOps Pipeline Automation & CI/CD",
    "Zero Trust Architecture & FedRAMP Compliance",
    "24/7 Managed Security Operations (SOC)",
    "AI/ML Infrastructure Integration"
  ],
  productsAndServices: [
    "ApexCloud Migrate Suite",
    "ZeroTrust Sentinel Framework",
    "Continuous ATO Automation Engine"
  ],
  technicalExpertise: [
    "Kubernetes / OpenShift",
    "Terraform & Ansible Infrastructure as Code",
    "SIEM / Splunk / Elastic Security",
    "FedRAMP High & NIST SP 800-53 Rev 5",
    "Python, Node.js, Go, Java microservices"
  ],
  certifications: [
    "ISO 9001:2015 Quality Management",
    "ISO 27001:2013 Information Security Management",
    "CMMI Development Level 3",
    "AWS Premier Tier Services Partner",
    "Microsoft Cloud Solution Provider (GCC High)"
  ],
  licenses: ["Virginia Business License #VA-882019", "SAM.gov Active Registration"],
  securityClearances: ["Facility Security Clearance: Top Secret (Secret / TS/SCI cleared personnel)"],
  pastPerformance: [
    {
      client: "U.S. Department of Veterans Affairs (VA)",
      projectTitle: "Enterprise VistA Cloud Modernization & DevSecOps Support",
      contractValue: "$18,500,000",
      duration: "3 Years (2023 - Present)",
      description: "Migrated 45 core clinical microservices to FedRAMP High AWS GovCloud environment with zero downtime.",
      relevance: "Direct experience with VA cloud infrastructure, FedRAMP High standards, and VIP framework."
    },
    {
      client: "Defense Logistics Agency (DLA)",
      projectTitle: "Supply Chain Cyber Modernization & Zero Trust Implementation",
      contractValue: "$12,200,000",
      duration: "2.5 Years (2022 - 2025)",
      description: "Architected Zero Trust Network Architecture for 12 DLA regional centers, achieving ATO in record 90 days.",
      relevance: "Proves enterprise cybersecurity capabilities and NIST 800-53 compliance."
    },
    {
      client: "Department of Health & Human Services (HHS)",
      projectTitle: "Cloud Security Operations & Managed SOC",
      contractValue: "$8,900,000",
      duration: "2 Years (2024 - Present)",
      description: "Operated 24/7 SOC protecting sensitive health healthcare data across 14 operating divisions.",
      relevance: "Direct match for 24/7 cloud SOC and incident response operational requirements."
    }
  ],
  keyPersonnel: [
    {
      name: "Marcus Vance, PMP, CISSP",
      role: "Proposed Program Manager",
      yearsExperience: 18,
      clearance: "Top Secret / SCI",
      certifications: ["PMP", "CISSP", "AWS Solutions Architect Professional"]
    },
    {
      name: "Dr. Elena Rostova",
      role: "Chief Cloud Architect",
      yearsExperience: 15,
      clearance: "Secret",
      certifications: ["AWS Certified Security - Specialty", "CKA (Kubernetes)", "Azure Solutions Architect"]
    },
    {
      name: "David Sterling",
      role: "Lead Cybersecurity & FedRAMP Specialist",
      yearsExperience: 12,
      clearance: "Top Secret",
      certifications: ["CISM", "CEH", "NIST SP 800-53 Specialist"]
    }
  ],
  geographicEligibility: ["Nationwide US", "CONUS & OCONUS"],
  availableTeamSize: 24,
  partnersAndSubcontractors: ["CloudScale Systems Inc. (Subcontractor for legacy mainframe extraction)"],
  differentiators: [
    "Incumbent-level VA cloud experience with active FedRAMP High migration playbooks",
    "Proprietary Automated ATO pipeline reducing ATO compliance timelines by 40%",
    "100% US Citizen cleared engineering team based in Reston & Washington DC"
  ],
  estimatedProposalBudget: "$25,000 - $40,000",
  preferredProposalTone: "Executive",
  contactInformation: {
    email: "proposals@apexgovtech.com",
    phone: "(703) 555-0199",
    website: "https://www.apexgovtech.com",
    address: "11920 Sunset Hills Rd, Reston, VA 20190"
  }
};

export const DEMO_DOCUMENTS: OpportunityDocument[] = [
  {
    id: "doc-01",
    filename: "Main_RFP_VA-26-00412.pdf",
    fileType: "pdf",
    classification: "RFP",
    fileSize: 2450000,
    pageCount: 58,
    uploadDate: "2026-08-01",
    processingStatus: "COMPLETED",
    priority: "HIGH",
    version: "v1.0",
    textContent: "RFP VA-26-00412 Department of Veterans Affairs Enterprise Cloud & Cyber Security Modernization. Proposal due date: September 15, 2026. Required clearance: Secret facility. Required certifications: ISO 27001 or equivalent."
  },
  {
    id: "doc-02",
    filename: "Statement_of_Work_SOW.docx",
    fileType: "docx",
    classification: "Statement of Work",
    fileSize: 1120000,
    pageCount: 24,
    uploadDate: "2026-08-01",
    processingStatus: "COMPLETED",
    priority: "HIGH",
    version: "v1.0",
    textContent: "Task 1: Cloud Architecture & Migration. Task 2: DevSecOps CI/CD Automation. Task 3: 24/7 Managed SOC. Task 4: FedRAMP High ATO Package Maintenance."
  },
  {
    id: "doc-03",
    filename: "Amendment_01_VA-26-00412.pdf",
    fileType: "pdf",
    classification: "Amendment",
    fileSize: 840000,
    pageCount: 6,
    uploadDate: "2026-08-05",
    processingStatus: "COMPLETED",
    priority: "HIGH",
    version: "v1.1",
    amendmentNumber: "Amendment 01",
    effectiveDate: "2026-08-05",
    textContent: "AMENDMENT 01: 1. Submission deadline extended from September 15, 2026 to September 30, 2026 at 17:00 EST. 2. Section C.3 certification requirement updated: ISO 27001 requirement replaced with MANDATORY FedRAMP High Authorization Sponsor/3PAO Package. 3. Section B Pricing Schedule requires fully loaded hourly rates."
  },
  {
    id: "doc-04",
    filename: "Pricing_Schedule.xlsx",
    fileType: "xlsx",
    classification: "Pricing Schedule",
    fileSize: 420000,
    sheetCount: 3,
    uploadDate: "2026-08-01",
    processingStatus: "COMPLETED",
    priority: "HIGH",
    version: "v1.0",
    sheetsData: [
      {
        sheetName: "Labor Rates",
        headers: ["Labor Category", "Base Hours", "Hourly Rate ($)", "Extended Total ($)"],
        rows: [
          ["Program Manager", 1920, 185.00, 355200],
          ["Chief Cloud Architect", 1920, 210.00, 403200],
          ["DevSecOps Engineer", 3840, "[USER INPUT REQUIRED]", "[USER INPUT REQUIRED]"],
          ["Cybersecurity Specialist", 1920, 165.00, 316800],
          ["24/7 SOC Analyst (L2)", 5760, 115.00, 662400]
        ]
      }
    ]
  },
  {
    id: "doc-05",
    filename: "Compliance_Matrix_Imported.xlsx",
    fileType: "xlsx",
    classification: "Compliance Matrix",
    fileSize: 310000,
    sheetCount: 2,
    uploadDate: "2026-08-01",
    processingStatus: "COMPLETED",
    priority: "MEDIUM",
    version: "v1.0",
    sheetsData: [
      {
        sheetName: "Requirements",
        headers: ["Req ID", "Description", "Mandatory", "Status"],
        rows: [
          ["REQ-M-01", "Must hold active Facility Clearance at Secret or higher", "Yes", "MET"],
          ["REQ-T-02", "Must demonstrate FedRAMP High Cloud Migration experience", "Yes", "MET"],
          ["REQ-S-03", "Must maintain 24/7/365 US-based Security Operations Center", "Yes", "MET"]
        ]
      }
    ]
  }
];

export const DEMO_COMPLIANCE_MATRIX: ComplianceRequirement[] = [
  {
    id: "req-1",
    requirementId: "REQ-M-01",
    requirement: "Offeror must hold active Facility Security Clearance at SECRET level or higher at time of proposal submission.",
    category: "Security",
    isMandatory: true,
    status: "MET",
    companyEvidence: "Apex holds active Top Secret Facility Clearance verified in SAM.gov and CAGE #7X821.",
    gapAnalysis: "No gap. Exceeds requirement (Top Secret vs Secret).",
    recommendedAction: "Attach CAGE clearance verification letter in Volume I Appendix B.",
    proposalSection: "Volume I - Section 1.2 Corporate Security & Clearances",
    sourceDocument: "Main_RFP_VA-26-00412.pdf",
    sourcePage: "Page 12",
    sourceSection: "Section C.2.1 Security Requirements",
    confidence: 98,
    isImported: true
  },
  {
    id: "req-2",
    requirementId: "REQ-T-01",
    requirement: "Offeror must provide proof of FedRAMP High 3PAO Package or active FedRAMP High Authorization for proposed cloud architecture.",
    category: "Technical",
    isMandatory: true,
    status: "MET",
    companyEvidence: "Apex holds active AWS GovCloud FedRAMP High ATO & CMMI Level 3 certification.",
    gapAnalysis: "Fully met following Amendment 01 update which replaced ISO 27001 with FedRAMP High.",
    recommendedAction: "Include FedRAMP High Marketplace ID and ATO sponsorship package copy.",
    proposalSection: "Volume I - Section 3.4 FedRAMP High Security Architecture",
    sourceDocument: "Amendment_01_VA-26-00412.pdf",
    sourcePage: "Page 3",
    sourceSection: "Section C.3 Updated Certifications",
    amendmentStatus: "MODIFIED BY AMENDMENT 01",
    confidence: 95
  },
  {
    id: "req-3",
    requirementId: "REQ-S-01",
    requirement: "Proposed Key Personnel (Program Manager & Chief Cloud Architect) must hold minimum 12 years relevant federal experience and PMP/CISSP.",
    category: "Staffing",
    isMandatory: true,
    status: "MET",
    companyEvidence: "Marcus Vance (PM) has 18 yrs exp + PMP/CISSP. Dr. Elena Rostova has 15 yrs exp + AWS Security.",
    gapAnalysis: "No gap. Both proposed Key Personnel exceed years and certification thresholds.",
    recommendedAction: "Include signed letters of intent and detailed 3-page resumes.",
    proposalSection: "Volume II - Section 2.1 Key Personnel & Staffing Plan",
    sourceDocument: "Statement_of_Work_SOW.docx",
    sourcePage: "Page 8",
    sourceSection: "Section 4.1 Staffing Requirements",
    confidence: 96
  },
  {
    id: "req-4",
    requirementId: "REQ-P-01",
    requirement: "Offeror must cite at least two (2) past performance contracts exceeding $10M value in Federal Cloud Migration completed in last 3 years.",
    category: "Past Performance",
    isMandatory: true,
    status: "MET",
    companyEvidence: "VA VistA Cloud ($18.5M, 2023-Present) and DLA Supply Chain Cyber ($12.2M, 2022-2025).",
    gapAnalysis: "Fully compliant with two federal past performance citations over $10M threshold.",
    recommendedAction: "Format CPARS ratings and client references into Volume III.",
    proposalSection: "Volume III - Past Performance",
    sourceDocument: "Main_RFP_VA-26-00412.pdf",
    sourcePage: "Page 34",
    sourceSection: "Section M.2 Past Performance Evaluation Criteria",
    confidence: 94
  },
  {
    id: "req-5",
    requirementId: "REQ-C-01",
    requirement: "Pricing schedule must provide fully loaded hourly rates for all labor categories across 1 Base Year + 4 Option Years.",
    category: "Financial",
    isMandatory: true,
    status: "PARTIALLY MET",
    companyEvidence: "Rates provided for PM, Architect, Security Specialist, SOC Analyst in Pricing_Schedule.xlsx.",
    gapAnalysis: "DevSecOps Engineer hourly rate cell is blank in Pricing_Schedule.xlsx [USER INPUT REQUIRED].",
    recommendedAction: "Input proposed fully loaded hourly rate for DevSecOps Engineer in Pricing Review tab before final submission.",
    proposalSection: "Volume IV - Pricing Schedule & Cost Narrative",
    sourceDocument: "Pricing_Schedule.xlsx",
    sourcePage: "Sheet: Labor Rates",
    sourceSection: "Row 5 - DevSecOps Engineer",
    amendmentStatus: "AMENDED PRICING INSTRUCTIONS",
    confidence: 88
  }
];

export const DEMO_AMENDMENTS: AmendmentItem[] = [
  {
    id: "amend-01",
    amendmentNumber: "Amendment 01",
    publicationDate: "2026-08-05",
    effectiveDate: "2026-08-05",
    sourceDocument: "Amendment_01_VA-26-00412.pdf",
    requirementsChanged: [
      "Replaced Section C.3 ISO 27001 requirement with mandatory FedRAMP High Authorization Package requirement.",
      "Added requirement for 24/7 SOC incident response SLA within 15 minutes of critical alert."
    ],
    deadlinesChanged: [
      {
        label: "Proposal Submission Deadline",
        previousDeadline: "September 15, 2026 @ 17:00 EST",
        newGoverningDeadline: "September 30, 2026 @ 17:00 EST"
      },
      {
        label: "Questions Submission Deadline",
        previousDeadline: "August 10, 2026 @ 12:00 EST",
        newGoverningDeadline: "August 18, 2026 @ 12:00 EST"
      }
    ],
    formsChanged: ["Updated Attachment B - Cost Proposal Template v2.0"],
    pricingInstructionsChanged: [
      "All hourly labor rates must be fully loaded inclusive of fringe, overhead, G&A, and fee."
    ],
    evaluationCriteriaChanged: [
      "Technical Approach weight increased to 40%; Past Performance modified to 25%."
    ],
    submissionInstructionsChanged: [
      "Electronic submission via VA Portal (MAX.gov) required in PDF format, single file per volume."
    ],
    newRequirements: [
      "Offerors must submit an explicit Continuous ATO (cATO) strategy in Volume I."
    ],
    deletedRequirements: [
      "Removed requirement for on-premise physical tape backup infrastructure."
    ],
    summary: "Amendment 01 extends proposal submission by 15 days to Sep 30, 2026, substitutes ISO 27001 with FedRAMP High ATO, updates cost template instructions, and adds cATO technical strategy requirement."
  }
];

export const DEMO_CONFLICTS: ConflictItem[] = [
  {
    id: "conf-01",
    issue: "Proposal Submission Deadline Conflict",
    earlierRequirement: "Proposal due September 15, 2026 at 17:00 EST",
    earlierSource: "Main_RFP_VA-26-00412.pdf — Page 1",
    laterRequirement: "Proposal due September 30, 2026 at 17:00 EST",
    laterSource: "Amendment_01_VA-26-00412.pdf — Page 1",
    recommendedInterpretation: "Use governing deadline September 30, 2026 per Amendment 01 precedence rule.",
    confidence: 100,
    needsHumanReview: false
  },
  {
    id: "conf-02",
    issue: "Mandatory Certification Framework",
    earlierRequirement: "Requires ISO 27001:2013 certification copy",
    earlierSource: "Main_RFP_VA-26-00412.pdf — Page 14, Section C.3",
    laterRequirement: "Requires FedRAMP High Authorization Sponsor/3PAO Package",
    laterSource: "Amendment_01_VA-26-00412.pdf — Page 3, Section C.3",
    recommendedInterpretation: "FedRAMP High Package supersedes ISO 27001. Provide both since company possesses both.",
    confidence: 96,
    needsHumanReview: false
  }
];

export const DEMO_MISSING_DOCS: MissingDocumentItem[] = [
  {
    id: "miss-01",
    referencedDocument: "Attachment C — Quality Assurance Surveillance Plan (QASP).pdf",
    sourceDocument: "Statement_of_Work_SOW.docx",
    sourcePage: "Page 19, Section 6.2",
    importance: "MEDIUM",
    possibleImpact: "QASP outlines government inspection and penalty thresholds. Review required before finalizing SLA metrics."
  }
];

export const DEMO_PRICING_FIELDS: PricingCell[] = [
  {
    id: "pr-1",
    sheetName: "Labor Rates",
    cellRef: "C3",
    rowNumber: 3,
    columnName: "Hourly Rate ($)",
    label: "Program Manager",
    value: 185.00,
    isRequired: true,
    isMissingInput: false
  },
  {
    id: "pr-2",
    sheetName: "Labor Rates",
    cellRef: "C4",
    rowNumber: 4,
    columnName: "Hourly Rate ($)",
    label: "Chief Cloud Architect",
    value: 210.00,
    isRequired: true,
    isMissingInput: false
  },
  {
    id: "pr-3",
    sheetName: "Labor Rates",
    cellRef: "C5",
    rowNumber: 5,
    columnName: "Hourly Rate ($)",
    label: "DevSecOps Engineer",
    value: "[USER INPUT REQUIRED]",
    isRequired: true,
    isMissingInput: true
  },
  {
    id: "pr-4",
    sheetName: "Labor Rates",
    cellRef: "C6",
    rowNumber: 6,
    columnName: "Hourly Rate ($)",
    label: "24/7 SOC Analyst (L2)",
    value: 115.00,
    isRequired: true,
    isMissingInput: false
  }
];

export const DEMO_ANALYSIS: OpportunityAnalysis = {
  opportunityId: "opp-demo-01",
  title: "Department of Veterans Affairs — Enterprise Cloud & Cyber Security Modernization",
  issuingOrganization: "U.S. Department of Veterans Affairs (VA / TAC)",
  solicitationNumber: "VA-26-00412",
  procurementType: "Full and Open Competition (SDVOSB Preference)",
  governingSubmissionDeadline: "2026-09-30T17:00:00-05:00",
  originalSubmissionDeadline: "2026-09-15T17:00:00-05:00",
  questionsDeadline: "2026-08-18T12:00:00-05:00",
  intentToBidDeadline: "2026-08-25T17:00:00-05:00",
  siteVisitDeadline: "N/A (Virtual Bidders Conference held Aug 10)",
  contractValue: "$24,500,000 (Estimated 5-Year Total)",
  periodOfPerformance: "1 Base Year + 4 Option Years",
  placeOfPerformance: "Government Facility (Reston/Austin VA Centers) & Remote CONUS",
  contractType: "Hybrid Firm-Fixed-Price (FFP) & Time-and-Materials (T&M)",
  analysisCompleteness: "MOSTLY COMPLETE",
  completenessExplanation: "All primary solicitation documents, amendments, and pricing templates analyzed. Attachment C (QASP) referenced but not uploaded.",
  bidRecommendation: "GO",
  fitScore: {
    eligibilityScore: 98, // 30% = 29.4
    technicalCapabilityScore: 94, // 25% = 23.5
    pastPerformanceScore: 96, // 15% = 14.4
    commercialAttractivenessScore: 90, // 15% = 13.5
    deliveryFeasibilityScore: 92, // 15% = 13.8
    overallFitScore: 95 // Total weighted: 94.6 rounded to 95
  },
  confidenceScore: 96,
  executiveAssessment: "Apex GovTech Solutions exhibits an outstanding 95/100 Fit Score for VA-26-00412. As a cleared SDVOSB with active VA cloud past performance ($18.5M contract) and FedRAMP High AWS GovCloud experience, Apex satisfies all mandatory requirements. Amendment 01 extended the submission deadline to Sept 30, providing sufficient proposal preparation time. One pricing field (DevSecOps Engineer hourly rate) requires user input before final submission.",
  requirements: DEMO_COMPLIANCE_MATRIX,
  amendments: DEMO_AMENDMENTS,
  conflicts: DEMO_CONFLICTS,
  missingDocuments: DEMO_MISSING_DOCS,
  pricingFields: DEMO_PRICING_FIELDS,
  proposalEffortEstimate: "45 - 60 Personnel Hours",
  estimatedPreparationCost: "$12,500",
  recommendedBidStrategy: "Emphasize incumbent-level VA VistA cloud migration success, highlight proprietary Continuous ATO engine to satisfy Amendment 01 cATO mandate, and leverage SDVOSB prime status with clear $24.5M fixed price cost realism.",
  disqualificationRisks: [
    "Unfilled hourly rate cell for DevSecOps Engineer in Pricing_Schedule.xlsx will result in non-responsive bid rejection if submitted unpriced.",
    "Failure to explicitly address Amendment 01 Continuous ATO (cATO) strategy in Volume I."
  ]
};

export const DEMO_PROPOSAL: ProposalData = {
  id: "prop-demo-01",
  opportunityId: "opp-demo-01",
  createdDate: "2026-08-07",
  lastModified: "2026-08-07",
  sections: [
    {
      id: "sec-1",
      sectionNumber: "1.0",
      title: "Cover Page & Executive Summary",
      content: `## 1.0 Executive Summary

### 1.1 Understanding of the Requirement
The Department of Veterans Affairs (VA) requires a modernized, resilient, and highly secure Enterprise Cloud & Cyber Security Infrastructure to support over 9 million Veterans nationwide. Under Solicitation VA-26-00412 (as amended by Amendment 01), the VA seeks an experienced partner to deliver full-lifecycle cloud architecture, DevSecOps pipeline automation, 24/7 Security Operations Center (SOC) monitoring, and continuous FedRAMP High Authorization package maintenance across AWS GovCloud environments.

### 1.2 Proposed Solution Overview
Apex GovTech Solutions LLC (Apex), a verified Service-Disabled Veteran-Owned Small Business (SDVOSB), proposes our proven **ApexCloud Modernization Framework** paired with our **ZeroTrust Sentinel Framework**. Our solution provides:
- **Zero-Downtime Migration**: Execution of 45+ clinical and administrative workloads using automated Terraform/Ansible IaC pipelines.
- **Continuous ATO (cATO) Engine**: Automated vulnerability tracking and NIST 800-53 Rev 5 compliance mapping, directly satisfying Amendment 01 requirements.
- **24/7 Managed SOC**: Dedicated cleared L2/L3 security analysts guaranteeing a 15-minute SLA for critical incident response.

### 1.3 Key Differentiators & Expected Outcomes
1. **Proven VA Experience**: Active prime contractor on the $18.5M VA VistA Cloud Modernization project with flawless CPARS ratings.
2. **Turnkey FedRAMP High Compliance**: Pre-built FedRAMP High 3PAO packages accelerating Authority to Operate by 40%.
3. **100% Cleared US Engineering**: All personnel based in Reston, VA holding Secret or Top Secret clearances.`,
      sourceReferences: ["Main_RFP_VA-26-00412.pdf — Page 1-5", "Amendment_01_VA-26-00412.pdf — Page 1-3"],
      isSolicitationDefined: true,
      unsupportedClaims: [],
      status: "COMPLETE"
    },
    {
      id: "sec-2",
      sectionNumber: "2.0",
      title: "Volume I: Technical & Management Approach",
      content: `## 2.0 Technical & Management Approach

### 2.1 Architecture & Cloud Infrastructure Strategy
Apex will deploy an immutable, multi-region AWS GovCloud High architecture utilizing Kubernetes (OpenShift) containers. All infrastructure is deployed via GitOps workflows with automated security scanning prior to code commits.

### 2.2 DevSecOps Pipeline & Continuous ATO (cATO)
In accordance with Amendment 01 Section C.3, Apex integrates automated Static & Dynamic Application Security Testing (SAST/DAST) directly into every release cycle.
- **Vulnerability Remediation**: Automated PR checks against NIST SP 800-53 controls.
- **cATO Reporting**: Real-time compliance dashboards updated automatically for VA ISO review.

### 2.3 24/7 Managed Security Operations (SOC)
Apex's Security Operations Center provides continuous monitoring using Splunk Enterprise Security and Elastic SIEM.
- **Incident SLA**: 15-minute initial triage for Critical (Severity 1) alerts.
- **Threat Hunting**: Proactive MITRE ATT&CK framework mapping.`,
      sourceReferences: ["Statement_of_Work_SOW.docx — Page 6-12", "Amendment_01_VA-26-00412.pdf — Page 3"],
      isSolicitationDefined: true,
      unsupportedClaims: [],
      status: "COMPLETE"
    },
    {
      id: "sec-3",
      sectionNumber: "3.0",
      title: "Volume II: Staffing Plan & Key Personnel",
      content: `## 3.0 Staffing Plan & Key Personnel

### 3.1 Key Personnel Qualifications
Apex commits top-tier leadership meeting all mandatory requirements under REQ-S-01:
1. **Marcus Vance, PMP, CISSP** — *Proposed Program Manager*
   - 18 years federal IT experience; Top Secret clearance; Lead PM on $18.5M VA cloud project.
2. **Dr. Elena Rostova** — *Chief Cloud Architect*
   - 15 years enterprise cloud experience; AWS Certified Security Specialist & CKA; architected 40+ federal cloud migrations.

### 3.2 Key Personnel Summary Table
| Name | Role | Years Experience | Security Clearance | Certifications |
| :--- | :--- | :--- | :--- | :--- |
| Marcus Vance | Program Manager | 18 Years | Top Secret / SCI | PMP, CISSP, AWS Architect |
| Dr. Elena Rostova | Chief Cloud Architect | 15 Years | Secret | AWS Security, CKA, Azure Arch |
| David Sterling | Cybersecurity Lead | 12 Years | Top Secret | CISM, CEH, NIST Specialist |
| [USER INPUT REQUIRED] | DevSecOps Lead | [USER INPUT REQUIRED] | Secret | CKA, Terraform |`,
      sourceReferences: ["Statement_of_Work_SOW.docx — Page 8-10"],
      isSolicitationDefined: true,
      unsupportedClaims: ["[USER INPUT REQUIRED: Confirm DevSecOps Lead name & biography]"],
      status: "NEEDS INPUT"
    },
    {
      id: "sec-4",
      sectionNumber: "4.0",
      title: "Volume III: Corporate Experience & Past Performance",
      content: `## 4.0 Corporate Experience & Past Performance

### 4.1 Citation 1: U.S. Department of Veterans Affairs (VA)
- **Contract Name**: Enterprise VistA Cloud Modernization
- **Value**: $18,500,000 | **Period**: 2023 – Present
- **Relevance**: Directly mirrors RFP requirements, migrating clinical healthcare services to AWS GovCloud High under FedRAMP controls.

### 4.2 Citation 2: Defense Logistics Agency (DLA)
- **Contract Name**: Supply Chain Cyber Modernization & Zero Trust
- **Value**: $12,200,000 | **Period**: 2022 – 2025
- **Relevance**: Demonstrated enterprise zero-trust deployment across 12 defense logistics nodes.`,
      sourceReferences: ["Main_RFP_VA-26-00412.pdf — Page 34"],
      isSolicitationDefined: true,
      unsupportedClaims: [],
      status: "COMPLETE"
    },
    {
      id: "sec-5",
      sectionNumber: "5.0",
      title: "Volume IV: Cost Proposal & Pricing Narrative",
      content: `## 5.0 Cost Proposal & Pricing Narrative

### 5.1 Pricing Structure & Methodology
Apex presents a competitive, realistic firm-fixed-price and time-and-materials pricing schedule adhering to Amendment 01 fully loaded rate requirements.

### 5.2 Labor Rates Summary
- Program Manager: $185.00/hr
- Chief Cloud Architect: $210.00/hr
- DevSecOps Engineer: [USER INPUT REQUIRED: Insert validated hourly rate]
- Cybersecurity Specialist: $165.00/hr
- 24/7 SOC Analyst (L2): $115.00/hr

*Note: Pricing requires final user input validation in Pricing Review before official portal submission.*`,
      sourceReferences: ["Pricing_Schedule.xlsx — Sheet: Labor Rates"],
      isSolicitationDefined: true,
      unsupportedClaims: ["[USER INPUT REQUIRED: Finalize DevSecOps Engineer hourly rate in Pricing Schedule]"],
      status: "NEEDS INPUT"
    }
  ],
  riskRegister: [
    {
      id: "risk-1",
      risk: "Unfilled labor rate in Pricing Schedule causing non-responsive proposal disqualification.",
      probability: "LOW",
      impact: "HIGH",
      severity: "CRITICAL",
      mitigation: "Flagged in BidPilot AI Pricing Review tab; rate validation prompt displayed prior to export.",
      contingency: "Apply default company rate card value ($155.00/hr) upon user confirmation.",
      owner: "Proposal Manager"
    },
    {
      id: "risk-2",
      risk: "Third-party dependency on Attachment C QASP SLA inspection metrics.",
      probability: "MEDIUM",
      impact: "MEDIUM",
      severity: "MEDIUM",
      mitigation: "Propose standard VA QASP SLA benchmark (99.99% availability, 15-min incident triage) with assumptions section.",
      contingency: "Adjust SLA metrics during post-award clarification if QASP details differ.",
      owner: "Lead Cloud Architect"
    }
  ],
  projectTimeline: [
    {
      phase: "Phase 1: Mobilization & Governance",
      activities: ["Project Kickoff", "Security Clearances Verification", "Environment Setup"],
      deliverables: ["Project Management Plan (PMP)", "Quality Control Plan"],
      milestones: ["Kickoff + 14 Days"],
      duration: "Month 1"
    },
    {
      phase: "Phase 2: Architecture & DevSecOps Foundation",
      activities: ["AWS GovCloud Landing Zone Build", "GitOps CI/CD Pipeline Setup", "cATO Baseline Configuration"],
      deliverables: ["Cloud Architecture Blueprint", "FedRAMP High System Security Plan (SSP)"],
      milestones: ["ATO Package Submission (Month 3)"],
      duration: "Months 2 - 4"
    },
    {
      phase: "Phase 3: Workload Migration & 24/7 SOC",
      activities: ["Migrate 45 Clinical Microservices", "Activate 24/7 SOC Monitoring", "Conduct Failover Drills"],
      deliverables: ["Migration Verification Report", "SOC Operational Readiness Certificate"],
      milestones: ["Full Operational Capability (FOC)"],
      duration: "Months 5 - 12"
    }
  ],
  pricingNarrative: "Apex's pricing is grounded in historical labor rates from our incumbent VA VistA cloud contract ($18.5M). All rates are fully loaded and formatted per Amendment 01 instructions."
};

export const DEMO_READINESS_REVIEW: ReadinessReview = {
  overallScore: 92,
  complianceScore: 98,
  completenessScore: 88,
  technicalStrengthScore: 95,
  evidenceScore: 96,
  clarityScore: 94,
  differentiationScore: 92,
  riskScore: 85,
  submissionReadinessScore: 88,
  unansweredRequirements: [],
  unsupportedClaims: [
    "[USER INPUT REQUIRED: Confirm DevSecOps Lead name & biography in Volume II]",
    "[USER INPUT REQUIRED: Fill DevSecOps Engineer rate in Pricing_Schedule.xlsx]"
  ],
  missingDocuments: [
    "Attachment C — Quality Assurance Surveillance Plan (QASP).pdf (Referenced in SOW Page 19)"
  ],
  missingPricingInputs: [
    "Pricing_Schedule.xlsx -> Labor Rates -> Row 5 (DevSecOps Engineer Hourly Rate)"
  ],
  incompleteSections: [
    "Volume II - Section 3.2 DevSecOps Lead Resume",
    "Volume IV - Section 5.2 DevSecOps Labor Rate"
  ],
  disqualificationIssues: [
    "CRITICAL: Unfilled Pricing Schedule field will cause proposal rejection if submitted to VA portal without value."
  ],
  keyRecommendations: [
    "1. Open the 'Pricing Workbook Review' tab and enter the proposed hourly rate for DevSecOps Engineer (e.g. $155.00/hr).",
    "2. Update Volume II Section 3.2 with the named DevSecOps Lead personnel.",
    "3. Review the Amendment 01 Continuous ATO (cATO) strategy in Volume I to ensure 100% alignment with evaluator expectations.",
    "4. Export the final package in PDF/DOCX format after completing the two required user inputs."
  ]
};

export const INITIAL_DEMO_OPPORTUNITY: Opportunity = {
  id: "opp-demo-01",
  title: "Department of Veterans Affairs — Enterprise Cloud & Cyber Security Modernization",
  issuingOrganization: "U.S. Department of Veterans Affairs (VA / TAC)",
  solicitationNumber: "VA-26-00412",
  createdDate: "2026-08-01",
  currentDeadline: "2026-09-30T17:00:00-05:00",
  analysisStatus: "ANALYZED",
  proposalStatus: "GENERATED",
  documents: DEMO_DOCUMENTS,
  analysis: DEMO_ANALYSIS,
  proposal: DEMO_PROPOSAL,
  readinessReview: DEMO_READINESS_REVIEW,
  isDemo: true
};

export const DEMO_OPPORTUNITY = INITIAL_DEMO_OPPORTUNITY;
