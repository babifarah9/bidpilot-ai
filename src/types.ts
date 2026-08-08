export interface CompanyProfile {
  id: string;
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
  pastPerformance: PastPerformanceItem[];
  keyPersonnel: KeyPersonnelItem[];
  geographicEligibility: string[];
  availableTeamSize: number;
  partnersAndSubcontractors: string[];
  differentiators: string[];
  estimatedProposalBudget: string;
  preferredProposalTone: 'Professional' | 'Technical' | 'Executive' | 'Persuasive' | 'Formal Government';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface PastPerformanceItem {
  id: string;
  clientName: string;
  projectTitle: string;
  contractValue: string;
  periodOfPerformance: string;
  relevance: string;
  keyResults: string;
}

export interface KeyPersonnelItem {
  id: string;
  name: string;
  role: string;
  yearsExperience: number;
  securityClearance?: string;
  certifications: string[];
  bio: string;
}

export type DocumentClassification =
  | 'Main Solicitation'
  | 'Amendment'
  | 'Addendum'
  | 'Questions and Answers'
  | 'Q&A Response'
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
  | 'Technical Data Sheet'
  | 'Other Spreadsheet'
  | 'Required Form'
  | 'Bid Form'
  | 'Contract Terms'
  | 'Contract Clause'
  | 'Security Requirements'
  | 'Evaluation Criteria'
  | 'Submission Instructions'
  | 'Past Performance Form'
  | 'Certifications'
  | 'Other';

export type DocumentProcessingStatus = 
  | 'Pending' 
  | 'Uploading' 
  | 'Processing' 
  | 'Processed' 
  | 'Processing Failed' 
  | 'Scanned PDF Warning';

export type DocumentVersionStatus = 'Current' | 'Superseded' | 'Possible Duplicate' | 'Needs Review';

export interface OpportunityDocument {
  id: string;
  filename: string;
  type: DocumentClassification;
  size: number; // in bytes
  pageCount?: number;
  uploadedAt: string;
  status: DocumentProcessingStatus;
  priority: 'High' | 'Medium' | 'Low';
  version?: string;
  amendmentNumber?: string;
  effectiveDate?: string;
  versionStatus?: DocumentVersionStatus;
  isScanned?: boolean;
  errorMessage?: string;
  contentText?: string;
  
  // Spreadsheet specific metadata
  isSpreadsheet?: boolean;
  sheetsCount?: number;
  sheetNames?: string[];
  hasFormulas?: boolean;
  blankInputRequiredCount?: number;
  isScannedOrImage?: boolean;
}

export interface PricingWorkbookLineItem {
  id: string;
  itemNumber: string;
  description: string;
  quantity?: number | string;
  unit?: string;
  unitPrice?: number | string;
  extendedPrice?: number | string;
  laborCategory?: string;
  laborHours?: number | string;
  laborRate?: number | string;
  travel?: number | string;
  materials?: number | string;
  subcontractorCosts?: number | string;
  overhead?: string;
  totalPrice?: number | string;
  currency?: string;
  assumptions?: string;
  formula?: string;
  isBidderInputRequired?: boolean;
  isCalculated?: boolean;
  sheetName: string;
  sourceCell: string; // e.g. "Pricing_Schedule.xlsx — Labor Rates — Cell D12"
}

export interface PricingRequiredField {
  id: string;
  sheetName: string;
  cellAddress: string; // e.g. "C14"
  label: string; // e.g. "Project Manager Hourly Rate"
  currentValue?: string;
  status: 'Completed' | 'Missing/Blank' | 'Formula Calculated';
  isBidderEntered: boolean;
  isGovernmentPrefilled: boolean;
  notes?: string;
  sourceReference: string; // "Pricing_Schedule.xlsx — Labor Rates — Cell C14"
}

export interface PricingWorkbookReview {
  hasPricingWorkbook: boolean;
  workbookName?: string;
  totalSheets?: number;
  currency?: string;
  totalCalculatedValue?: string | number;
  requiredFields: PricingRequiredField[];
  completedFieldsCount: number;
  missingFieldsCount: number; // blank required bidder inputs
  formulaIssues: {
    sheetName: string;
    cellAddress: string;
    formula: string;
    issue: string; // e.g. "#VALUE! error or non-reconciling total"
  }[];
  lineItems: PricingWorkbookLineItem[];
  reconciliationWarning?: string | null;
  scannedWorkbookWarning?: string | null;
}

export interface AmendmentItem {
  id: string;
  documentId: string;
  documentName: string;
  amendmentNumber: string;
  publicationDate?: string;
  effectiveDate?: string;
  requirementsChanged: string[];
  deadlinesChanged: string[];
  formsChanged: string[];
  pricingInstructionsChanged: string[];
  evaluationCriteriaChanged: string[];
  submissionInstructionsChanged: string[];
  newRequirements: string[];
  deletedRequirements: string[];
  impactSummaryText: string;
}

export interface DocumentConflict {
  id: string;
  conflictType: 
    | 'Deadline Mismatch' 
    | 'Page Limit Change' 
    | 'Eligibility Rule' 
    | 'Technical Spec' 
    | 'Submission Method' 
    | 'Pricing Instructions' 
    | 'Certifications' 
    | 'Evaluation Criteria' 
    | 'Scope Inconsistency' 
    | 'Superseded Attachment' 
    | 'Other';
  issue: string;
  earlierRequirement: string;
  earlierSource: {
    documentId: string;
    documentName: string;
    pageNumber: string | number;
    sectionName?: string;
  };
  laterRequirement: string;
  laterSource: {
    documentId: string;
    documentName: string;
    pageNumber: string | number;
    sectionName?: string;
  };
  recommendedInterpretation: string;
  confidence: number; // 0-100
  humanReviewRequired: boolean;
}

export interface MissingProcurementDocument {
  id: string;
  documentNameRef: string; // e.g. "Attachment D - Subcontracting Plan Form"
  whereReferenced: string; // e.g. "Section L.4.2"
  sourceDocumentName: string;
  sourcePage: string | number;
  importance: 'Critical' | 'High' | 'Medium' | 'Low';
  impactOnAnalysis: string;
}

export interface SourceCitation {
  documentId: string;
  documentName: string;
  pageNumber: string | number;
  sectionName?: string;
  requirementId?: string;
  sourceExcerpt?: string;
}

export interface RequirementTraceabilityItem {
  requirementId: string;
  requirementText: string;
  isMandatory: boolean;
  sourceDocument: string;
  sourcePage: string | number;
  sourceSection?: string;
  proposalSectionNumber: string;
  proposalSectionTitle: string;
  coverageStatus: 'Addressed' | 'Partially Addressed' | 'Not Addressed';
}

export interface RequirementsCoverageSummary {
  totalMandatoryRequirements: number;
  requirementsAddressed: number;
  requirementsPartiallyAddressed: number;
  requirementsNotAddressed: number;
  coveragePercentage: number;
  items: RequirementTraceabilityItem[];
}

export interface OpportunityAnalysis {
  id: string;
  createdAt: string;
  opportunityTitle: string;
  issuingOrganization: string;
  solicitationNumber: string;
  procurementType: 'RFP' | 'RFQ' | 'Grant' | 'Tender' | 'RFI' | 'Solicitation' | 'Other';
  submissionDeadline: string;
  originalSubmissionDeadline?: string;
  questionsDeadline: string;
  expectedAwardDate: string;
  contractValue: string;
  periodOfPerformance: string;
  placeOfPerformance: string;
  contractType: string;
  
  // Multi-Document Package Metadata
  documents: OpportunityDocument[];
  amendments?: AmendmentItem[];
  conflicts?: DocumentConflict[];
  potentiallyMissingDocs?: MissingProcurementDocument[];
  analysisCompleteness?: 'COMPLETE' | 'MOSTLY COMPLETE' | 'INCOMPLETE' | 'CRITICAL DOCUMENTS MISSING';
  completenessReason?: string;
  requirementsCoverage?: RequirementsCoverageSummary;

  // Categorized Requirements
  eligibilityRequirements: string[];
  mandatoryRequirements: string[];
  evaluationCriteria: EvaluationCriterion[];
  technicalRequirements: string[];
  managementRequirements: string[];
  staffingRequirements: string[];
  experienceRequirements: string[];
  requiredCertifications: string[];
  securityRequirements: string[];
  insuranceRequirements: string[];
  financialRequirements: string[];
  requiredForms: string[];
  requiredAttachments: string[];
  submissionInstructions: string;
  pageLimits: string;
  formattingRules: string;
  pricingInstructions: string;
  keyContractualClauses: string[];
  disqualificationRisks: string[];
  
  // Pricing & Workbook Analysis
  pricingWorkbookReview?: PricingWorkbookReview;
  
  // Raw summary / overview
  overviewText: string;
  specifiedStructure?: string[]; // Volume/Section structure if specified in RFP
}

export interface EvaluationCriterion {
  id: string;
  category: string;
  weightOrImportance: string;
  description: string;
}

export interface ComponentScores {
  eligibilityAlignment: number; // 0-100
  technicalCapabilityAlignment: number; // 0-100
  pastPerformanceAlignment: number; // 0-100
  commercialAttractiveness: number; // 0-100
  deliveryFeasibility: number; // 0-100
}

export interface BidReadinessAnalysis {
  recommendation: 'GO' | 'CONDITIONAL GO' | 'NO-GO';
  componentScores: ComponentScores;
  overallFitScore: number; // Calculated strictly via formula: 0.3*elig + 0.25*tech + 0.15*past + 0.15*comm + 0.15*deliv
  confidenceScore: number; // 0-100
  executiveAssessment: string;
  eligibilityDetermination: string;
  technicalAlignmentText: string;
  pastPerformanceAlignmentText: string;
  deliveryFeasibilityText: string;
  commercialAttractivenessText: string;
  complianceRiskText: string;
  proposalEffortEstimateHours: number;
  estimatedPrepCostUSD: number;
  recommendedBidStrategy: string;
}

export interface ComplianceItem {
  id: string;
  requirementId: string;
  requirement: string;
  requirementType: 'Mandatory' | 'Optional' | 'Technical' | 'Management' | 'Staffing' | 'Past Performance' | 'Financial/Legal';
  isMandatory: boolean;
  sourceSection: string;
  sourcePage: string;
  sourceDocument?: string;
  companyStatus: 'MET' | 'PARTIALLY MET' | 'NOT MET' | 'UNKNOWN' | 'HUMAN REVIEW REQUIRED';
  evidenceFromProfile: string;
  gap: string;
  recommendedAction: string;
  proposalSectionAddressed: string;
  amendmentStatus?: 'Original' | 'Amended' | 'New in Amendment' | 'Superseded';
  confidence?: number;
  riskLevel?: 'High' | 'Medium' | 'Low';
  isImportedFromSpreadsheet?: boolean;
  sourceSheet?: string;
  sourceCell?: string;
}

export interface MissingDocumentItem {
  id: string;
  documentType: string; // e.g. "ISO 27001 Certification", "Audited Financials", "Signed Form SF-1449"
  description: string;
  isMandatory: boolean;
  status: 'Ready' | 'Missing' | 'Action Required' | 'In Progress';
  actionNeeded: string;
}

export interface SubmissionTimeline {
  questionsDeadline: string;
  intentToBidDeadline: string;
  siteVisitDeadline?: string;
  registrationDeadline?: string;
  proposalSubmissionDeadline: string;
  internalReviewDeadline: string;
  draftCompletionTarget: string;
  pricingCompletionTarget: string;
  finalComplianceReviewDate: string;
  submissionReadinessDate: string;
}

export interface ProposalSection {
  id: string;
  sectionNumber: string;
  title: string;
  content: string; // Markdown or HTML content
  relevantRfpSection: string;
  relevantSourcePage: string;
  relevantSourceDocument?: string;
  sources?: SourceCitation[];
  requirementIds: string[];
  isUserModified?: boolean;
  hasPlaceholders?: boolean;
  wordCount?: number;
}

export interface ProposalDraft {
  id: string;
  opportunityId: string;
  companyId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  sections: ProposalSection[];
  executiveSummaryText: string;
  technicalResponseText: string;
  projectPlan: ProjectPlanPhase[];
  riskRegister: RiskRegisterItem[];
  pricingSupport: PricingSupportDetails;
}

export interface ProjectPlanPhase {
  id: string;
  phaseName: string;
  duration: string;
  activities: string[];
  deliverables: string[];
  dependencies: string[];
  milestones: string[];
  responsibilities: string;
}

export interface RiskRegisterItem {
  id: string;
  risk: string;
  probability: 'High' | 'Medium' | 'Low';
  impact: 'High' | 'Medium' | 'Low';
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
  mitigation: string;
  contingency: string;
  owner: string;
}

export interface PricingSupportDetails {
  pricingStructureRecommendations: string;
  laborCategories: { category: string; rateEstimate: string; estimatedHours: number }[];
  estimatedTotalHours: number;
  costCategories: { category: string; description: string; estimatedCost: string }[];
  assumptions: string[];
  pricingChecklist: string[];
  missingPricingInputs: string[];
  disclaimer: string;
}

export interface ProposalAuditFinding {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  sectionRef: string;
  issue: string;
  recommendedAction: string;
}

export interface ProposalAudit {
  overallReadinessScore: number;
  readinessGrade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'C' | 'D' | 'F';
  summaryVerdict: string;
  scores: {
    groundingScore: number;
    complianceCoverageScore: number;
    placeholderFillScore: number;
    attachmentReadinessScore: number;
    toneScore: number;
    pricingValidationScore: number;
  };
  findings: ProposalAuditFinding[];
}

export interface ProposalReadinessReview {
  overallScore: number; // 0-100
  categories: {
    complianceScore: number;
    completenessScore: number;
    technicalStrengthScore: number;
    evidenceScore: number;
    clarityScore: number;
    differentiationScore: number;
    riskScore: number;
    submissionReadinessScore: number;
  };
  unansweredRequirements: string[];
  unsupportedClaims: string[];
  missingDocuments: string[];
  missingPricing: string[];
  contradictoryStatements: string[];
  incompleteSections: string[];
  pageLimitRisks: string[];
  disqualificationRisks: string[];
  actionableRecommendations: string[];
}

export interface AnalysisRecord {
  id: string;
  title: string;
  clientOrganization: string;
  dateAnalyzed: string;
  fitScore: number;
  recommendation: 'GO' | 'CONDITIONAL GO' | 'NO-GO';
  proposalStatus: 'Not Started' | 'Draft Generated' | 'In Review' | 'Completed';
  companyProfile: CompanyProfile;
  opportunity: OpportunityAnalysis;
  bidReadiness: BidReadinessAnalysis;
  complianceMatrix: ComplianceItem[];
  missingDocuments: MissingDocumentItem[];
  submissionTimeline: SubmissionTimeline;
  proposalDraft?: ProposalDraft;
  readinessReview?: ProposalReadinessReview;
  isDemo?: boolean;
}
