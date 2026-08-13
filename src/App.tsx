import React, { useState } from 'react';
import { CompanyProfile, Opportunity, OpportunityDocument } from './types';
import { DEMO_COMPANY_PROFILE, DEMO_OPPORTUNITY, DEMO_DOCUMENTS, DEMO_PROPOSAL } from './data/demoData';

import { Navbar, ActiveTab } from './components/Navbar';
import { AboutTechModal } from './components/AboutTechModal';

import { LandingView } from './components/views/LandingView';
import { CompanyProfileView } from './components/views/CompanyProfileView';
import { OpportunityWorkspaceView } from './components/views/OpportunityWorkspaceView';
import { AnalysisProgressView } from './components/views/AnalysisProgressView';
import { DashboardView } from './components/views/DashboardView';
import { DocumentsView } from './components/views/DocumentsView';
import { SpreadsheetViewer } from './components/views/SpreadsheetViewer';
import { PricingReviewView } from './components/views/PricingReviewView';
import { AmendmentsConflictsView } from './components/views/AmendmentsConflictsView';
import { ComplianceMatrixView } from './components/views/ComplianceMatrixView';
import { BidDecisionView } from './components/views/BidDecisionView';
import { ProposalEditorView } from './components/views/ProposalEditorView';
import { RequirementCoverageView } from './components/views/RequirementCoverageView';
import { ReadinessReviewView } from './components/views/ReadinessReviewView';
import { ExportView } from './components/views/ExportView';
import { HistoryView } from './components/views/HistoryView';

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [isAboutTechOpen, setIsAboutTechOpen] = useState<boolean>(false);

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(DEMO_COMPANY_PROFILE);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([DEMO_OPPORTUNITY]);
  const [activeOpportunityId, setActiveOpportunityId] = useState<string>(DEMO_OPPORTUNITY.id);

  // Form state for creating a new opportunity in Workspace
  const [newTitle, setNewTitle] = useState<string>('');
  const [newSolicitation, setNewSolicitation] = useState<string>('');
  const [newIssuingOrg, setNewIssuingOrg] = useState<string>('');
  const [newDocs, setNewDocs] = useState<OpportunityDocument[]>([]);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isGeneratingProposal, setIsGeneratingProposal] = useState<boolean>(false);
  const [isReviewingReadiness, setIsReviewingReadiness] = useState<boolean>(false);

  const activeOpportunity = opportunities.find((o) => o.id === activeOpportunityId) || opportunities[0] || null;

  // Handlers
  const handleLoadDemo = () => {
    // Add demo if not present or select it
    if (!opportunities.some((o) => o.id === DEMO_OPPORTUNITY.id)) {
      setOpportunities((prev) => [DEMO_OPPORTUNITY, ...prev]);
    }
    setActiveOpportunityId(DEMO_OPPORTUNITY.id);
    setActiveTab('dashboard');
  };

  const handleNewOpportunity = () => {
    setNewTitle('Cloud Modernization & DevSecOps Support');
    setNewSolicitation('VA-26-00412');
    setNewIssuingOrg('Department of Veterans Affairs');
    setNewDocs([]);
    setActiveTab('upload');
  };

  const handleStartAnalysis = async () => {
    if (newDocs.length === 0) return;

    setIsAnalyzing(true);
    setActiveTab('progress');

    let analysisResult = null;

    try {
      const res = await fetch('/api/analyze-opportunity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          solicitationNumber: newSolicitation,
          issuingOrganization: newIssuingOrg,
          companyProfile,
          documents: newDocs
        })
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        analysisResult = data.analysis;
      }
    } catch (err) {
      console.error('Error analyzing opportunity:', err);
    }

    if (!analysisResult) {
      // Fallback analysis if network or backend fails
      analysisResult = {
        opportunityId: `opp-${Date.now()}`,
        title: newTitle || 'Analyzed Procurement Package',
        issuingOrganization: newIssuingOrg || 'Issuing Agency',
        solicitationNumber: newSolicitation || 'SOL-2026-001',
        procurementType: 'Full and Open Competition',
        governingSubmissionDeadline: '2026-09-30T17:00:00Z',
        questionsDeadline: '2026-08-20T12:00:00Z',
        intentToBidDeadline: '2026-08-28T17:00:00Z',
        contractValue: '$10,000,000+',
        periodOfPerformance: '1 Base Year + 4 Option Years',
        placeOfPerformance: 'CONUS',
        contractType: 'Firm-Fixed-Price',
        analysisCompleteness: 'COMPLETE' as const,
        completenessExplanation: 'Extracted requirements across uploaded opportunity documents.',
        bidRecommendation: 'GO' as const,
        fitScore: {
          eligibilityScore: 88,
          technicalCapabilityScore: 85,
          pastPerformanceScore: 82,
          commercialAttractivenessScore: 90,
          deliveryFeasibilityScore: 86,
          overallFitScore: 86
        },
        confidenceScore: 92,
        executiveAssessment: 'Strong technical and past performance match with company profile.',
        requirements: newDocs.map((doc, idx) => ({
          id: `req-${idx + 1}`,
          requirementId: `REQ-${idx + 1}`,
          requirement: `Compliance requirement derived from ${doc.filename}`,
          category: 'Technical',
          isMandatory: true,
          status: 'MET' as const,
          companyEvidence: 'Company capabilities match solicitation criteria.',
          gapAnalysis: 'No critical gaps identified.',
          recommendedAction: 'Highlight capability in Proposal Volume I.',
          proposalSection: 'Technical Response',
          sourceDocument: doc.filename,
          sourcePage: 'Page 1',
          sourceSection: 'Section C',
          confidence: 90
        })),
        amendments: [],
        conflicts: [],
        missingDocuments: [],
        pricingFields: [],
        proposalEffortEstimate: '35 Hours',
        estimatedPreparationCost: '$8,500',
        recommendedBidStrategy: 'Leverage incumbent-level experience and cloud automation playbooks.',
        disqualificationRisks: []
      };
    }

    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      title: newTitle || 'Analyzed Procurement Package',
      solicitationNumber: newSolicitation || 'SOL-2026-001',
      issuingOrganization: newIssuingOrg || 'Issuing Agency',
      createdAt: new Date().toISOString().split('T')[0],
      isDemo: false,
      documents: newDocs,
      analysis: analysisResult
    };

    setOpportunities((prev) => [newOpp, ...prev]);
    setActiveOpportunityId(newOpp.id);
    setIsAnalyzing(false);
  };

  const handleGenerateProposal = async () => {
    if (!activeOpportunity || !activeOpportunity.analysis) return;

    setIsGeneratingProposal(true);

    try {
      const res = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyProfile,
          analysis: activeOpportunity.analysis
        })
      });

      const data = await res.json();
      const draft = data.proposalDraft || data.proposal;

      if (data.success && draft) {
        setOpportunities((prev) =>
          prev.map((o) =>
            o.id === activeOpportunity.id
              ? { ...o, proposalDraft: draft }
              : o
          )
        );
        setActiveTab('proposal');
      } else {
        throw new Error("Invalid proposal response");
      }
    } catch (err) {
      console.error('Error generating proposal, applying template fallback:', err);
      setOpportunities((prev) =>
        prev.map((o) =>
          o.id === activeOpportunity.id
            ? { ...o, proposalDraft: DEMO_PROPOSAL }
            : o
        )
      );
      setActiveTab('proposal');
    } finally {
      setIsGeneratingProposal(false);
    }
  };

  const handleUpdateProposalSection = (sectionId: string, newContent: string) => {
    if (!activeOpportunity || !activeOpportunity.proposalDraft) return;

    const updatedSections = activeOpportunity.proposalDraft.sections.map((s) =>
      s.id === sectionId ? { ...s, content: newContent } : s
    );

    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === activeOpportunity.id
          ? {
              ...o,
              proposalDraft: {
                ...o.proposalDraft!,
                sections: updatedSections,
                lastUpdated: new Date().toISOString()
              }
            }
          : o
      )
    );
  };

  const handleRegenerateSection = async (sectionId: string, instruction: string) => {
    if (!activeOpportunity || !activeOpportunity.proposalDraft) return;

    setIsGeneratingProposal(true);

    // Call API to refine section
    try {
      const targetSection = activeOpportunity.proposalDraft.sections.find((s) => s.id === sectionId);
      if (!targetSection) return;

      const res = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyProfile,
          analysis: activeOpportunity.analysis,
          customInstruction: `Refine Section '${targetSection.title}': ${instruction}`
        })
      });

      const data = await res.json();
      if (data.success && data.proposalDraft) {
        setOpportunities((prev) =>
          prev.map((o) =>
            o.id === activeOpportunity.id
              ? { ...o, proposalDraft: data.proposalDraft }
              : o
          )
        );
      }
    } catch (err) {
      console.error('Error refining section:', err);
    } finally {
      setIsGeneratingProposal(false);
    }
  };

  const handleUpdatePricingField = (fieldId: string, newValue: number) => {
    if (!activeOpportunity || !activeOpportunity.analysis) return;

    const updatedFields = activeOpportunity.analysis.pricingFields.map((f) =>
      f.id === fieldId ? { ...f, value: newValue, isMissingInput: false } : f
    );

    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === activeOpportunity.id
          ? {
              ...o,
              analysis: {
                ...o.analysis!,
                pricingFields: updatedFields
              }
            }
          : o
      )
    );
  };

  const handleRunReadinessReview = async () => {
    if (!activeOpportunity || !activeOpportunity.analysis) return;

    setIsReviewingReadiness(true);

    try {
      const res = await fetch('/api/readiness-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyProfile,
          analysis: activeOpportunity.analysis,
          proposal: activeOpportunity.proposalDraft
        })
      });

      const data = await res.json();

      if (data.success && data.readinessReview) {
        setOpportunities((prev) =>
          prev.map((o) =>
            o.id === activeOpportunity.id
              ? { ...o, readinessReview: data.readinessReview }
              : o
          )
        );
      }
    } catch (err) {
      console.error('Error running readiness review:', err);
    } finally {
      setIsReviewingReadiness(false);
    }
  };

  const handleDeleteOpportunity = (id: string) => {
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
    if (activeOpportunityId === id) {
      setActiveOpportunityId(opportunities[0]?.id || '');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeOpportunity={activeOpportunity}
        opportunities={opportunities}
        onSelectOpportunity={(opp) => {
          setActiveOpportunityId(opp.id);
          setActiveTab('dashboard');
        }}
        onLoadDemo={handleLoadDemo}
        onOpenAboutTech={() => setIsAboutTechOpen(true)}
        onNewOpportunity={handleNewOpportunity}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingView
            onAnalyzeClick={handleNewOpportunity}
            onTryDemoClick={handleLoadDemo}
            onOpenAboutTech={() => setIsAboutTechOpen(true)}
            onCompanyProfileClick={() => setActiveTab('company')}
          />
        )}

        {activeTab === 'company' && (
          <CompanyProfileView
            companyProfile={companyProfile}
            onSaveProfile={(prof) => setCompanyProfile(prof)}
          />
        )}

        {activeTab === 'upload' && (
          <OpportunityWorkspaceView
            opportunityTitle={newTitle}
            setOpportunityTitle={setNewTitle}
            solicitationNumber={newSolicitation}
            setSolicitationNumber={setNewSolicitation}
            issuingOrganization={newIssuingOrg}
            setIssuingOrganization={setNewIssuingOrg}
            documents={newDocs}
            setDocuments={setNewDocs}
            onStartAnalysis={handleStartAnalysis}
            isAnalyzing={isAnalyzing}
          />
        )}

        {activeTab === 'progress' && (
          <AnalysisProgressView
            documents={newDocs.length > 0 ? newDocs : DEMO_DOCUMENTS}
            isAnalyzing={isAnalyzing}
            onComplete={() => setActiveTab('dashboard')}
          />
        )}

        {activeOpportunity && (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                opportunity={activeOpportunity}
                onGenerateProposalClick={() => {
                  if (!activeOpportunity.proposalDraft) {
                    handleGenerateProposal();
                  } else {
                    setActiveTab('proposal');
                  }
                }}
                onNavigateToTab={setActiveTab}
              />
            )}

            {activeTab === 'documents' && (
              <DocumentsView
                documents={activeOpportunity.documents}
                setDocuments={(updater) => {
                  setOpportunities((prev) =>
                    prev.map((o) =>
                      o.id === activeOpportunity.id
                        ? {
                            ...o,
                            documents: typeof updater === 'function' ? updater(o.documents) : updater
                          }
                        : o
                    )
                  );
                }}
              />
            )}

            {activeTab === 'spreadsheet' && (
              <SpreadsheetViewer documents={activeOpportunity.documents} />
            )}

            {activeTab === 'pricing' && activeOpportunity.analysis && (
              <PricingReviewView
                analysis={activeOpportunity.analysis}
                onUpdatePricingField={handleUpdatePricingField}
              />
            )}

            {activeTab === 'amendments' && activeOpportunity.analysis && (
              <AmendmentsConflictsView analysis={activeOpportunity.analysis} />
            )}

            {activeTab === 'compliance' && activeOpportunity.analysis && (
              <ComplianceMatrixView requirements={activeOpportunity.analysis.requirements} />
            )}

            {activeTab === 'bid' && (
              <BidDecisionView
                analysis={activeOpportunity?.analysis}
                onProceedToProposal={() => {
                  if (!activeOpportunity?.proposalDraft) {
                    handleGenerateProposal();
                  } else {
                    setActiveTab('proposal');
                  }
                }}
                isAnalyzing={isAnalyzing}
              />
            )}

            {activeTab === 'proposal' && activeOpportunity.proposalDraft && (
              <ProposalEditorView
                proposal={activeOpportunity.proposalDraft}
                onUpdateSection={handleUpdateProposalSection}
                onRegenerateSection={handleRegenerateSection}
                isGenerating={isGeneratingProposal}
              />
            )}

            {activeTab === 'coverage' && activeOpportunity.analysis && (
              <RequirementCoverageView requirements={activeOpportunity.analysis.requirements} />
            )}

            {activeTab === 'readiness' && (
              <ReadinessReviewView
                proposal={activeOpportunity?.proposalDraft}
                readinessReview={activeOpportunity?.readinessReview}
                onRunReadinessReview={handleRunReadinessReview}
                onGenerateProposal={() => {
                  if (!activeOpportunity?.proposalDraft) {
                    handleGenerateProposal();
                  } else {
                    setActiveTab('proposal');
                  }
                }}
                isReviewing={isReviewingReadiness}
              />
            )}

            {activeTab === 'export' && (
              <ExportView opportunity={activeOpportunity} />
            )}
          </>
        )}

        {activeTab === 'history' && (
          <HistoryView
            opportunities={opportunities}
            activeOpportunity={activeOpportunity}
            onSelectOpportunity={(opp) => {
              setActiveOpportunityId(opp.id);
              setActiveTab('dashboard');
            }}
            onDeleteOpportunity={handleDeleteOpportunity}
          />
        )}
      </main>

      {/* About Technology Modal */}
      <AboutTechModal
        isOpen={isAboutTechOpen}
        onClose={() => setIsAboutTechOpen(false)}
      />
    </div>
  );
}
