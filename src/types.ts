export type CompanyProfile = {
  companyName: string;
  companyDescription: string;
  country: string;
  headquarters: string;
  companySize: string;
  yearsInBusiness: number;
  industry: string;
  coreCapabilities: string[];
  productsAndServices: string[];
  technicalExpertise: string[];
  certifications: string[];
  licenses: string[];
  securityClearances: string[];
  pastPerformance: {
    client: string;
    projectTitle: string;
    contractValue: string;
    duration: string;
    description: string;
    relevance: string;
  }[];
  keyPersonnel: {
    name: string;
    role: string;
    yearsExperience: number;
    clearance: string;
    certifications: string[];
  }[];
  geographicEligibility: string[];
  availableTeamSize: number;
  partnersAndSubcontractors: string[];
  differentiators: string[];
  estimatedProposalBudget: string;
  preferredProposalTone: 'Professional' | 'Executive' | 'Technical' | 'Persuasive';
  contactInformation: {
    email: string;
    phone: string;
    website: string;
    address: string;
  };
};

export type DocumentType =
  | 'Main Solicitation'
  | 'RFP'
  | 'RFQ'
  | 'Grant Notice'
  | 'Tender'
  | 'Amendment'
  | 'Addendum'
  | 'Questions and Answers'
  | 'Statement of Work'
  | 'Statement of Objectives'
  | 'Performance Work Statement'
  | 'Technical Appendix'
  | 'Pricing Document'
  | 'Pricing Schedule'
  | 'Cost Workbook'
  | 'Bill of Quantities'
  | 'Compliance Matrix'
  | 'Staffing Plan'
  | 'Deliverables Schedule'
  | 'Evaluation Worksheet'
  | 'Financial Template'
  | 'Required Form'
  | 'Contract Terms'
  | 'Security Requirements'
  | 'Evaluation Criteria'
  | 'Submission Instructions'
  | 'Certifications'
  | 'Other';

export type OpportunityDocument = {
  id: string;
  filename: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'xls' | 'csv';
  classification: DocumentType;
  fileSize: number;
  pageCount?: number;
  sheetCount?: number;
  uploadDate: string;
  processingStatus: 'PENDING' | 'PARSED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'SCAN_DETECTED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  version: string;
  amendmentNumber?: string;
  effectiveDate?: string;
  sheetsData?: Array<{
    sheetName: string;
    rows: Array<Array<string | number>>;
    headers: string[];
  }>;
  textContent?: string;
  isScanned?: boolean;
};

export type RequirementStatus = 'MET' | 'PARTIALLY MET' | 'NOT MET' | 'UNKNOWN' | 'HUMAN REVIEW REQUIRED';

export type ComplianceRequirement = {
  id: string;
  requirementId: string;
  requirement: string;
  category: 'Eligibility' | 'Technical' | 'Management' | 'Staffing' | 'Past Performance' | 'Security' | 'Financial' | 'Formatting & Submission';
  isMandatory: boolean;
  status: RequirementStatus;
  companyEvidence: string;
  gapAnalysis: string;
  recommendedAction: string;
  proposalSection: string;
  sourceDocument: string;
  sourcePage: string;
  sourceSection: string;
  amendmentStatus?: string;
  confidence: number; // 0-100
  isImported?: boolean;
};

export type AmendmentItem = {
  id: string;
  amendmentNumber: string;
  publicationDate: string;
  effectiveDate: string;
  sourceDocument: string;
  requirementsChanged: string[];
  deadlinesChanged: {
    label: string;
    previousDeadline: string;
    newGoverningDeadline: string;
  }[];
  formsChanged: string[];
  pricingInstructionsChanged: string[];
  evaluationCriteriaChanged: string[];
  submissionInstructionsChanged: string[];
  newRequirements: string[];
  deletedRequirements: string[];
  summary: string;
};

export type ConflictItem = {
  id: string;
  issue: string;
  earlierRequirement: string;
  earlierSource: string;
  laterRequirement: string;
  laterSource: string;
  recommendedInterpretation: string;
  confidence: number;
  needsHumanReview: boolean;
};

export type MissingDocumentItem = {
  id: string;
  referencedDocument: string;
  sourceDocument: string;
  sourcePage: string;
  importance: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  possibleImpact: string;
};

export type PricingCell = {
  id: string;
  sheetName: string;
  cellRef: string;
  rowNumber: number;
  columnName: string;
  label: string;
  value: string | number;
  formula?: string;
  isMissingInput: boolean; // [USER INPUT REQUIRED]
  isRequired: boolean;
};

export type FitScoreBreakdown = {
  eligibilityScore: number; // 30%
  technicalCapabilityScore: number; // 25%
  technicalMatchScore?: number;
  pastPerformanceScore: number; // 15%
  commercialAttractivenessScore: number; // 15%
  commercialScore?: number;
  deliveryFeasibilityScore: number; // 15%
  overallFitScore: number; // Weighted calculation
};

export type OpportunityAnalysis = {
  opportunityId: string;
  title: string;
  issuingOrganization: string;
  solicitationNumber: string;
  procurementType: string;
  governingSubmissionDeadline: string;
  originalSubmissionDeadline?: string;
  questionsDeadline: string;
  intentToBidDeadline: string;
  siteVisitDeadline?: string;
  contractValue: string;
  periodOfPerformance: string;
  placeOfPerformance: string;
  contractType: string;
  analysisCompleteness: 'COMPLETE' | 'MOSTLY COMPLETE' | 'INCOMPLETE' | 'CRITICAL DOCUMENTS MISSING';
  completenessExplanation: string;
  
  bidRecommendation: 'GO' | 'CONDITIONAL GO' | 'NO-GO';
  fitScore: FitScoreBreakdown;
  confidenceScore: number;
  executiveAssessment: string;
  
  requirements: ComplianceRequirement[];
  amendments: AmendmentItem[];
  conflicts: ConflictItem[];
  missingDocuments: MissingDocumentItem[];
  pricingFields: PricingCell[];
  
  proposalEffortEstimate: string;
  estimatedPreparationCost: string;
  recommendedBidStrategy: string;
  disqualificationRisks: string[];
};

export type ProposalSection = {
  id: string;
  title: string;
  sectionNumber: string;
  content: string;
  sourceReferences: string[];
  isSolicitationDefined: boolean;
  unsupportedClaims: string[];
  status: 'DRAFT' | 'REVIEWED' | 'COMPLETE' | 'NEEDS INPUT';
};

export type RiskItem = {
  id: string;
  risk: string;
  probability: 'HIGH' | 'MEDIUM' | 'LOW';
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  mitigation: string;
  contingency: string;
  owner: string;
};

export type ProposalData = {
  id: string;
  opportunityId: string;
  createdDate: string;
  lastModified: string;
  sections: ProposalSection[];
  riskRegister: RiskItem[];
  projectTimeline: {
    phase: string;
    activities: string[];
    deliverables: string[];
    milestones: string[];
    duration: string;
  }[];
  pricingNarrative: string;
};

export type ReadinessReview = {
  overallScore: number; // 0-100
  complianceScore: number;
  completenessScore: number;
  technicalStrengthScore: number;
  evidenceScore: number;
  clarityScore: number;
  differentiationScore: number;
  riskScore: number;
  submissionReadinessScore: number;
  unansweredRequirements: string[];
  unsupportedClaims: string[];
  missingDocuments: string[];
  missingPricingInputs: string[];
  incompleteSections: string[];
  disqualificationIssues: string[];
  keyRecommendations: string[];
  executiveSummary?: string;
  categoryScores?: Array<{
    categoryName: string;
    score: number;
    findings: string;
  }>;
  disqualificationTraps?: string[];
  recommendedRemediations?: string[];
};

export type ProposalReadinessReview = ReadinessReview;

export type Opportunity = {
  id: string;
  title: string;
  issuingOrganization: string;
  solicitationNumber: string;
  createdDate?: string;
  createdAt?: string;
  currentDeadline?: string;
  analysisStatus?: 'NOT_STARTED' | 'ANALYZING' | 'ANALYZED' | 'FAILED';
  proposalStatus?: 'NOT_STARTED' | 'DRAFTING' | 'GENERATED' | 'REVIEWED';
  documents: OpportunityDocument[];
  analysis?: OpportunityAnalysis;
  proposal?: ProposalData;
  proposalDraft?: ProposalData;
  readinessReview?: ReadinessReview | ProposalReadinessReview;
  isDemo?: boolean;
};
