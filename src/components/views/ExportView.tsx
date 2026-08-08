import React, { useState } from 'react';
import { Opportunity } from '../../types';
import { Download, FileText, CheckSquare, Printer, Sparkles, CheckCircle2 } from 'lucide-react';

type Props = {
  opportunity: Opportunity;
};

export const ExportView: React.FC<Props> = ({ opportunity }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (type: string) => {
    setDownloadSuccess(`Generated and downloaded ${type} package!`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <Download className="w-4 h-4" />
            <span>Submission Package Export</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Export & Final Package Generation</h1>
          <p className="text-sm text-slate-600 mt-1">
            Download polished proposal documents, compliance matrices, and readiness reports formatted for submission.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Export Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Option 1 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">1. Full Proposal Draft</h3>
            <p className="text-xs text-slate-600 mt-1">
              Complete 30+ section technical and management proposal package with risk register and timeline.
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <button
              onClick={() => handleDownload('Full Proposal Draft (PDF)')}
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Proposal PDF</span>
            </button>
            <button
              onClick={() => handleDownload('Full Proposal Draft (DOCX)')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition cursor-pointer"
            >
              Download Editable Word (.docx)
            </button>
          </div>
        </div>

        {/* Option 2 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">2. Compliance Matrix</h3>
            <p className="text-xs text-slate-600 mt-1">
              Itemized requirement-by-requirement compliance traceability matrix with company evidence and source citations.
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <button
              onClick={() => handleDownload('Compliance Matrix (Excel)')}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => handleDownload('Compliance Matrix (CSV)')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition cursor-pointer"
            >
              Download CSV Matrix
            </button>
          </div>
        </div>

        {/* Option 3 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">3. Bid Readiness Brief</h3>
            <p className="text-xs text-slate-600 mt-1">
              Executive 1-page qualification summary, 5-factor fit score, amendment audit, and pricing gaps.
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <button
              onClick={() => handleDownload('Executive Bid Readiness Brief')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Executive Brief</span>
            </button>
          </div>
        </div>
      </div>

      {/* Package Preview Container */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Submission Package Manifest</h3>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 font-mono text-slate-700">
          <div>• <strong>Opportunity:</strong> {opportunity.title} ({opportunity.solicitationNumber})</div>
          <div>• <strong>Issuing Org:</strong> {opportunity.analysis?.issuingOrganization}</div>
          <div>• <strong>Submission Deadline:</strong> {opportunity.analysis?.governingSubmissionDeadline}</div>
          <div>• <strong>Total Package Files:</strong> {opportunity.documents.length} Source Documents</div>
          <div>• <strong>Proposal Sections:</strong> {opportunity.proposalDraft?.sections.length || 0} Sections Ready</div>
          <div>• <strong>Compliance Requirements:</strong> {opportunity.analysis?.requirements.length || 0} Traced Requirements</div>
        </div>
      </div>
    </div>
  );
};
