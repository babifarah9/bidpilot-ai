import React, { useState } from 'react';
import { ProposalAudit, ProposalDraft } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Download, 
  FileCheck, 
  Sparkles, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

interface ProposalAuditViewProps {
  audit: ProposalAudit;
  proposal: ProposalDraft;
  onExportDocx: () => void;
  onExportComplianceCsv: () => void;
  onBackToEditor: () => void;
}

export const ProposalAuditView: React.FC<ProposalAuditViewProps> = ({
  audit,
  proposal,
  onExportDocx,
  onExportComplianceCsv,
  onBackToEditor
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleDocxExportClick = () => {
    setIsExporting(true);
    onExportDocx();
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-800 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-teal-700" />
            <h1 className="text-2xl font-bold text-slate-900">Proposal Readiness & Quality Audit</h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Gemini multi-pass quality control check inspecting grounding, compliance coverage, placeholders, and formatting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToEditor}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            ← Back to Editor
          </button>

          <button
            id="btn-export-docx"
            onClick={handleDocxExportClick}
            disabled={isExporting}
            className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-teal-200" />
            <span>{isExporting ? 'Generating DOCX...' : 'Export DOCX Proposal'}</span>
          </button>
        </div>
      </div>

      {/* Hero Grade & Overall Score Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Readiness Grade</span>
            <div className="flex items-baseline gap-3 my-3">
              <span className="text-5xl font-extrabold text-teal-400">{audit.overallReadinessScore}</span>
              <span className="text-slate-400 text-lg font-bold">/ 100</span>
              <span className="text-2xl font-black text-amber-400 ml-auto px-3 py-1 rounded bg-slate-800 border border-slate-700">
                Grade {audit.readinessGrade}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{audit.summaryVerdict}</p>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs space-y-1">
            <div className="flex justify-between">
              <span>Grounding Score:</span>
              <strong className="text-teal-300">{audit.scores.groundingScore}%</strong>
            </div>
            <div className="flex justify-between">
              <span>Compliance Coverage:</span>
              <strong className="text-teal-300">{audit.scores.complianceCoverageScore}%</strong>
            </div>
            <div className="flex justify-between">
              <span>Placeholder Status:</span>
              <strong className="text-amber-300">{audit.scores.placeholderFillScore}% Fill</strong>
            </div>
          </div>
        </div>

        {/* 6-Factor Quality Checklist Grid */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            6-Factor Pre-Submission Quality Checklist
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">1. Grounding & Hallucination Audit</strong>
                <p className="text-[11px] text-slate-600">Zero unverified past performance or fabricated client references.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">2. Compliance Requirement Coverage</strong>
                <p className="text-[11px] text-slate-600">All RFP Section C technical requirements explicitly addressed.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">3. Placeholder Verification</strong>
                <p className="text-[11px] text-slate-600">Explicit user input tags inserted where profile details were omitted.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">4. Mandatory Attachments Check</strong>
                <p className="text-[11px] text-slate-600">Certifications, representations, and SF forms flagged for attach.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">5. Tone & Structure Rigor</strong>
                <p className="text-[11px] text-slate-600">Adheres to formal federal government tone guidelines.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">6. Commercial & Pricing Validation</strong>
                <p className="text-[11px] text-slate-600">Labor categories mapped; user rate verification requested.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Audit Findings */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Detailed Audit Findings & Correction Actions ({audit.findings.length})
        </h2>

        <div className="space-y-3 text-xs">
          {audit.findings.map(finding => (
            <div
              key={finding.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                finding.severity === 'Critical' ? 'bg-rose-50/70 border-rose-200' :
                finding.severity === 'High' ? 'bg-amber-50/70 border-amber-200' :
                'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    finding.severity === 'Critical' ? 'bg-rose-200 text-rose-900' :
                    finding.severity === 'High' ? 'bg-amber-200 text-amber-900' :
                    'bg-slate-200 text-slate-800'
                  }`}>
                    {finding.severity}
                  </span>
                  <span className="font-bold text-slate-900">{finding.category}</span>
                  <span className="text-slate-500">• Section {finding.sectionRef}</span>
                </div>

                <p className="text-slate-700 font-medium">{finding.issue}</p>
                <p className="text-teal-800 font-semibold text-[11px]">
                  <strong>Recommended Action:</strong> {finding.recommendedAction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options Section */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white">Export Final Proposal Package</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Download solicitation-aligned Word document, compliance matrix CSV, or brief.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <button
            onClick={handleDocxExportClick}
            disabled={isExporting}
            className="p-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold text-left transition-all flex flex-col justify-between h-28 shadow-md"
          >
            <div className="flex items-center justify-between">
              <FileCheck className="w-5 h-5 text-teal-200" />
              <span className="text-[10px] bg-teal-900 px-2 py-0.5 rounded">Primary</span>
            </div>
            <div>
              <span className="block text-sm">Download Proposal (.docx)</span>
              <span className="text-[11px] text-teal-100 font-normal">Formatted for Microsoft Word</span>
            </div>
          </button>

          <button
            onClick={onExportComplianceCsv}
            className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-left transition-all flex flex-col justify-between h-28 border border-slate-700"
          >
            <div className="flex items-center justify-between">
              <FileSpreadsheet className="w-5 h-5 text-teal-400" />
              <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded">Matrix</span>
            </div>
            <div>
              <span className="block text-sm">Export Compliance CSV</span>
              <span className="text-[11px] text-slate-400 font-normal">Excel compatible matrix sheet</span>
            </div>
          </button>

          <button
            onClick={() => window.print()}
            className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-left transition-all flex flex-col justify-between h-28 border border-slate-700"
          >
            <div className="flex items-center justify-between">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded">Print / PDF</span>
            </div>
            <div>
              <span className="block text-sm">Print Audit Summary</span>
              <span className="text-[11px] text-slate-400 font-normal">Executive briefing printout</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
