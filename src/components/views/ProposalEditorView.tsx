import React, { useState } from 'react';
import { ProposalData, ProposalSection } from '../../types';
import { 
  PenTool, 
  Sparkles, 
  Save, 
  RotateCw, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  AlertCircle, 
  Edit3, 
  CheckCircle2, 
  Maximize2, 
  Minimize2,
  FileText,
  List,
  Layers,
  Check
} from 'lucide-react';

type Props = {
  proposal: ProposalData;
  onUpdateSection: (sectionId: string, newContent: string) => void;
  onRegenerateSection: (sectionId: string, instruction: string) => void;
  isGenerating: boolean;
};

export const ProposalEditorView: React.FC<Props> = ({
  proposal,
  onUpdateSection,
  onRegenerateSection,
  isGenerating
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(proposal.sections[0]?.id || '');
  const [editingContent, setEditingContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [customInstruction, setCustomInstruction] = useState<string>('');
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const activeSection = proposal.sections.find((s) => s.id === activeSectionId) || proposal.sections[0];

  const handleSelectSection = (s: ProposalSection) => {
    setActiveSectionId(s.id);
    setEditingContent(s.content);
    setIsEditing(false);
  };

  const handleSaveText = () => {
    if (activeSection) {
      onUpdateSection(activeSection.id, editingContent);
      setIsEditing(false);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    }
  };

  const handleQuickAction = (type: 'shorten' | 'expand' | 'executive' | 'compliance') => {
    if (!activeSection) return;

    let instr = '';
    if (type === 'shorten') instr = 'Shorten this section by 30% while maintaining compliance.';
    if (type === 'expand') instr = 'Expand this section with detailed technical architecture steps.';
    if (type === 'executive') instr = 'Rewrite in a formal executive tone suitable for C-level reviewers.';
    if (type === 'compliance') instr = 'Strengthen explicit alignment with solicitation requirements.';

    onRegenerateSection(activeSection.id, instr);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <PenTool className="w-4 h-4" />
            <span>AI Proposal Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Solicitation-Aligned First-Draft Proposal</h1>
          <p className="text-sm text-slate-600 mt-1">
            Grounded strictly in source documents and corporate profile facts with zero invented credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-teal-100 text-teal-900 font-bold text-xs rounded-lg border border-teal-300">
            {proposal.sections.length} Complete Sections
          </span>
        </div>
      </div>

      {saveToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Section changes saved successfully!</span>
        </div>
      )}

      {/* Main Grid: Section Navigation (Left) + Section Content Editor (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: 30+ Section Nav */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-2 lg:col-span-1 max-h-[75vh] overflow-y-auto">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
            Proposal Outline ({proposal.sections.length})
          </h3>

          <div className="space-y-1">
            {proposal.sections.map((s, idx) => {
              const isActive = s.id === activeSectionId;
              const hasInputRequired = s.content.includes('[USER INPUT REQUIRED]');

              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectSection(s)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between gap-2 ${
                    isActive
                      ? 'bg-slate-900 text-white font-bold shadow-sm'
                      : 'hover:bg-slate-100 text-slate-700 font-medium'
                  }`}
                >
                  <div className="truncate">
                    <span className="text-[10px] opacity-70 mr-1.5 font-mono">{idx + 1}.</span>
                    <span>{s.title}</span>
                  </div>

                  {hasInputRequired ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" title="User input required"></span>
                  ) : (
                    <Check className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Editor */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 flex flex-col justify-between">
          {activeSection ? (
            <>
              <div>
                {/* Section Header & Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-teal-700">Section {activeSection.sectionNumber}</span>
                    <h2 className="text-xl font-bold text-slate-900">{activeSection.title}</h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <button
                        onClick={handleSaveText}
                        className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Section</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingContent(activeSection.content);
                          setIsEditing(true);
                        }}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Text</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* AI Quick Actions Bar */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl mb-6 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" /> AI Refine:
                  </span>

                  <button
                    onClick={() => handleQuickAction('shorten')}
                    disabled={isGenerating}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition font-medium"
                  >
                    Shorten
                  </button>

                  <button
                    onClick={() => handleQuickAction('expand')}
                    disabled={isGenerating}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition font-medium"
                  >
                    Expand Tech Detail
                  </button>

                  <button
                    onClick={() => handleQuickAction('executive')}
                    disabled={isGenerating}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition font-medium"
                  >
                    Make Executive
                  </button>

                  <button
                    onClick={() => handleQuickAction('compliance')}
                    disabled={isGenerating}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition font-medium"
                  >
                    Improve Compliance
                  </button>
                </div>

                {/* Content Editor / Viewer */}
                {isEditing ? (
                  <textarea
                    rows={18}
                    className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {activeSection.content}
                  </div>
                )}
              </div>

              {/* Requirement Compliance Tags */}
              <div className="pt-4 border-t border-slate-200 mt-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Addressing Requirements</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeSection.requirementsAddressed.map((reqId, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-teal-50 text-teal-800 font-mono text-[10px] font-bold rounded border border-teal-200">
                      {reqId}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">Select a proposal section from the left outline.</div>
          )}
        </div>
      </div>

      {/* Risk Register Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <span>Project Risk Register & Mitigation Strategy</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-3">Risk Category</th>
                <th className="p-3">Identified Threat</th>
                <th className="p-3">Likelihood</th>
                <th className="p-3">Impact</th>
                <th className="p-3">Mitigation Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {proposal.riskRegister.map((risk) => (
                <tr key={risk.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900">{risk.category}</td>
                  <td className="p-3 text-slate-700">{risk.riskDescription}</td>
                  <td className="p-3 font-bold text-slate-600">{risk.likelihood}</td>
                  <td className="p-3 font-bold text-amber-700">{risk.impact}</td>
                  <td className="p-3 text-teal-900 font-medium bg-teal-50/50 p-2 rounded">{risk.mitigationStrategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Timeline Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-600" />
          <span>Project Implementation Schedule</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-3">Phase Name</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Key Deliverable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {proposal.projectTimeline.map((item) => (
                <tr key={item.phase} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900">{item.phase}</td>
                  <td className="p-3 text-teal-700 font-semibold">{item.duration}</td>
                  <td className="p-3 text-slate-700">{item.deliverable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
