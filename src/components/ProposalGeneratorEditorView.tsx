import React, { useState } from 'react';
import { ProposalDraft, ProposalSection, CompanyProfile, OpportunityAnalysis } from '../types';
import { 
  FileText, 
  Sparkles, 
  RefreshCw, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Save, 
  Layers, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

interface ProposalGeneratorEditorViewProps {
  proposal: ProposalDraft;
  companyProfile: CompanyProfile;
  opportunity: OpportunityAnalysis;
  onUpdateProposal: (updated: ProposalDraft) => void;
  onRunAudit: () => void;
  onEditSectionApi: (
    section: ProposalSection,
    action: 'regenerate' | 'improve' | 'shorten' | 'expand' | 'make-technical' | 'make-executive' | 'improve-compliance' | 'add-evidence' | 'flag-claims',
    userInstruction?: string
  ) => Promise<string>;
}

export const ProposalGeneratorEditorView: React.FC<ProposalGeneratorEditorViewProps> = ({
  proposal,
  companyProfile,
  opportunity,
  onUpdateProposal,
  onRunAudit,
  onEditSectionApi
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(proposal.sections[0]?.id || 'sec-1');
  const [showSources, setShowSources] = useState<boolean>(true);
  const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>('');
  const [customInstruction, setCustomInstruction] = useState<string>('');
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'sections' | 'projectPlan' | 'riskRegister' | 'pricing'>('sections');

  const selectedSection = proposal.sections.find(s => s.id === activeSectionId) || proposal.sections[0];

  const handleSelectSection = (sec: ProposalSection) => {
    setActiveSectionId(sec.id);
    setEditedText(sec.content);
    setIsEditingContent(false);
  };

  const handleSaveTextEdits = () => {
    if (!selectedSection) return;
    const updatedSections = proposal.sections.map(s =>
      s.id === selectedSection.id
        ? {
            ...s,
            content: editedText,
            isUserModified: true,
            hasPlaceholders: editedText.includes('[USER INPUT REQUIRED')
          }
        : s
    );
    onUpdateProposal({ ...proposal, sections: updatedSections, updatedAt: new Date().toISOString().split('T')[0] });
    setIsEditingContent(false);
  };

  const handleApplyAiAction = async (action: 'regenerate' | 'improve' | 'shorten' | 'expand' | 'make-technical' | 'make-executive' | 'improve-compliance' | 'add-evidence' | 'flag-claims') => {
    if (!selectedSection) return;
    setIsActionLoading(true);
    try {
      const updatedContent = await onEditSectionApi(selectedSection, action, customInstruction);
      const updatedSections = proposal.sections.map(s =>
        s.id === selectedSection.id
          ? {
              ...s,
              content: updatedContent,
              isUserModified: true,
              hasPlaceholders: updatedContent.includes('[USER INPUT REQUIRED')
            }
          : s
      );
      onUpdateProposal({ ...proposal, sections: updatedSections, updatedAt: new Date().toISOString().split('T')[0] });
      setEditedText(updatedContent);
      setCustomInstruction('');
    } catch (err) {
      console.error('Failed to update section via AI action:', err);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Count total placeholders across proposal
  const totalPlaceholders = proposal.sections.reduce((acc, sec) => {
    const matches = sec.content.match(/\[USER INPUT REQUIRED:[^\]]+\]/g);
    return acc + (matches ? matches.length : 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-800 space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-teal-700" />
            <h1 className="text-2xl font-bold text-slate-900">{proposal.title}</h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Grounded strictly in uploaded RFP requirements and company profile. Never invents unlisted achievements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSources(prev => !prev)}
            className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              showSources ? 'bg-slate-900 text-teal-300 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showSources ? 'Hide Sources' : 'Show Sources'}</span>
          </button>

          <button
            onClick={onRunAudit}
            className="px-5 py-2 hover:bg-teal-500 bg-teal-600 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4 text-teal-200" />
            <span>Run Proposal Readiness Audit →</span>
          </button>
        </div>
      </div>

      {/* Placeholders Banner Warning if placeholders exist */}
      {totalPlaceholders > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>
              <strong>{totalPlaceholders} User Input Placeholders Detected.</strong> BidPilot AI inserted explicit placeholders for missing company credentials to prevent hallucinations.
            </span>
          </div>
          <span className="text-[11px] bg-amber-200 px-2.5 py-1 rounded text-amber-900 font-bold uppercase whitespace-nowrap">
            Grounded Generation Rule Active
          </span>
        </div>
      )}

      {/* Main View Mode Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold text-slate-600 pb-2">
        <button
          onClick={() => setActiveTab('sections')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'sections' ? 'bg-slate-900 text-white shadow-sm' : 'hover:bg-slate-100'
          }`}
        >
          Proposal Narrative Sections ({proposal.sections.length})
        </button>

        <button
          onClick={() => setActiveTab('projectPlan')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'projectPlan' ? 'bg-slate-900 text-white shadow-sm' : 'hover:bg-slate-100'
          }`}
        >
          Project Work Plan & Milestones
        </button>

        <button
          onClick={() => setActiveTab('riskRegister')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'riskRegister' ? 'bg-slate-900 text-white shadow-sm' : 'hover:bg-slate-100'
          }`}
        >
          Proposal Risk Register
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'pricing' ? 'bg-slate-900 text-white shadow-sm' : 'hover:bg-slate-100'
          }`}
        >
          Pricing Support & Labor Matrix
        </button>
      </div>

      {/* View 1: Narrative Sections Editor */}
      {activeTab === 'sections' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation Tree */}
          <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-2">
              Proposal Section Navigation
            </h3>

            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
              {proposal.sections.map(sec => {
                const isSelected = sec.id === selectedSection?.id;
                const hasMissing = sec.content.includes('[USER INPUT REQUIRED');

                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSelectSection(sec)}
                    className={`w-full text-left p-3 rounded-lg text-xs transition-all flex items-start justify-between gap-2 border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-800 shadow-sm font-bold'
                        : 'hover:bg-slate-50 text-slate-800 border-transparent hover:border-slate-200 font-medium'
                    }`}
                  >
                    <div>
                      <span className={`block text-[10px] uppercase tracking-wider ${isSelected ? 'text-teal-400' : 'text-slate-500'}`}>
                        {sec.sectionNumber}
                      </span>
                      <span className="line-clamp-1">{sec.title}</span>
                    </div>

                    {hasMissing && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 whitespace-nowrap">
                        Fill Input
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Editor & AI Refinement Toolbar */}
          <div className="lg:col-span-8 space-y-4">
            {selectedSection && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">{selectedSection.sectionNumber}</span>
                    <h2 className="text-lg font-bold text-slate-900">{selectedSection.title}</h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEditingContent ? (
                      <button
                        onClick={handleSaveTextEdits}
                        className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Text Changes</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => { setEditedText(selectedSection.content); setIsEditingContent(true); }}
                        className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Text</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Source Mapping Drawer */}
                {showSources && (
                  <div className="p-3 bg-slate-900 text-white rounded-lg text-xs space-y-1 border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] text-teal-300 font-bold uppercase tracking-wider">
                      <span>Requirement Source Traceability</span>
                      <span>RFP Reference</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
                      <div>Relevant Section: <strong className="text-white">{selectedSection.relevantRfpSection}</strong></div>
                      <div>Source Page: <strong className="text-white">{selectedSection.relevantSourcePage}</strong></div>
                      <div>Requirement IDs: <strong className="text-teal-400">{(selectedSection.requirementIds || []).join(', ') || 'General'}</strong></div>
                    </div>
                  </div>
                )}

                {/* AI Refinement Actions Bar */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Gemini Section Refinement Actions:</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      disabled={isActionLoading}
                      onClick={() => handleApplyAiAction('regenerate')}
                      className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-slate-800 text-[11px]"
                    >
                      Regenerate
                    </button>
                    <button
                      disabled={isActionLoading}
                      onClick={() => handleApplyAiAction('make-technical')}
                      className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-slate-800 text-[11px]"
                    >
                      Make Technical
                    </button>
                    <button
                      disabled={isActionLoading}
                      onClick={() => handleApplyAiAction('make-executive')}
                      className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-slate-800 text-[11px]"
                    >
                      Make Executive
                    </button>
                    <button
                      disabled={isActionLoading}
                      onClick={() => handleApplyAiAction('improve-compliance')}
                      className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-slate-800 text-[11px]"
                    >
                      Improve Compliance
                    </button>
                    <button
                      disabled={isActionLoading}
                      onClick={() => handleApplyAiAction('add-evidence')}
                      className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-slate-800 text-[11px]"
                    >
                      Add Company Evidence
                    </button>
                    <button
                      disabled={isActionLoading}
                      onClick={() => handleApplyAiAction('shorten')}
                      className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-slate-800 text-[11px]"
                    >
                      Shorten
                    </button>
                    <button
                      disabled={isActionLoading}
                      onClick={() => handleApplyAiAction('expand')}
                      className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-slate-800 text-[11px]"
                    >
                      Expand
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={customInstruction}
                      onChange={e => setCustomInstruction(e.target.value)}
                      placeholder="Optional custom instruction e.g. Emphasize NIST 800-53 controls..."
                      className="flex-1 px-2.5 py-1 text-[11px] border border-slate-300 rounded bg-white"
                    />
                    <button
                      disabled={isActionLoading}
                      onClick={() => handleApplyAiAction('improve')}
                      className="px-3 py-1 rounded bg-teal-600 text-white font-bold text-[11px]"
                    >
                      Apply Custom Refinement
                    </button>
                  </div>
                </div>

                {/* Section Content Display / Editor */}
                {isEditingContent ? (
                  <textarea
                    rows={16}
                    value={editedText}
                    onChange={e => setEditedText(e.target.value)}
                    className="w-full p-4 border border-slate-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-teal-500 focus:outline-none leading-relaxed"
                  />
                ) : (
                  <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed text-slate-800 max-h-[500px] overflow-y-auto">
                    {selectedSection.content}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* View 2: Project Work Plan */}
      {activeTab === 'projectPlan' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Project Work Plan, Phases & Deliverables</h2>
            <p className="text-xs text-slate-500">Phased implementation methodology derived from solicitation requirements.</p>
          </div>

          <div className="space-y-6">
            {(proposal.projectPlan || []).map((phase, idx) => (
              <div key={phase.id || idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-2">
                  <span className="text-sm font-extrabold text-teal-800">{phase.phaseName}</span>
                  <span className="px-2.5 py-1 rounded bg-teal-100 text-teal-900 font-bold">{phase.duration}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Major Activities:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                      {phase.activities?.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Key Deliverables:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-teal-800 font-medium">
                      {phase.deliverables?.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Milestones: <strong>{phase.milestones?.join(' • ')}</strong></span>
                  <span>Responsibility: <strong>{phase.responsibilities}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: Risk Register */}
      {activeTab === 'riskRegister' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Proposal Risk Register & Mitigations</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Risk Event</th>
                  <th className="py-2.5 px-3">Prob. / Impact</th>
                  <th className="py-2.5 px-3">Severity</th>
                  <th className="py-2.5 px-3">Mitigation Strategy</th>
                  <th className="py-2.5 px-3">Contingency Plan</th>
                  <th className="py-2.5 px-3">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(proposal.riskRegister || []).map((rr, idx) => (
                  <tr key={rr.id || idx}>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{rr.risk}</td>
                    <td className="py-2.5 px-3 text-slate-600">{rr.probability} / {rr.impact}</td>
                    <td className="py-2.5 px-3 font-bold">{rr.severity}</td>
                    <td className="py-2.5 px-3 text-slate-700">{rr.mitigation}</td>
                    <td className="py-2.5 px-3 text-slate-700">{rr.contingency}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{rr.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 4: Pricing Support & Mandatory Disclaimer */}
      {activeTab === 'pricing' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="p-4 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-slate-950" />
              <span>PRICING REQUIREMENT: Pricing requires user validation before submission.</span>
            </div>
            <span className="text-xs bg-slate-950 text-white px-3 py-1 rounded uppercase font-bold">
              User Validation Mandatory
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Recommended Labor Categories & Hourly Estimates</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold uppercase text-[11px]">
                    <th className="py-2 px-3 border border-slate-200">Labor Category</th>
                    <th className="py-2 px-3 border border-slate-200">Estimated Rate</th>
                    <th className="py-2 px-3 border border-slate-200">Estimated Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {(proposal.pricingSupport?.laborCategories || []).map((lc, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-3 border border-slate-200 font-semibold">{lc.category}</td>
                      <td className="py-2 px-3 border border-slate-200">{lc.rateEstimate}</td>
                      <td className="py-2 px-3 border border-slate-200 font-bold">{lc.estimatedHours} Hrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">Pricing Assumptions & Checklist:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {(proposal.pricingSupport?.assumptions || []).map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
