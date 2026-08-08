import React from 'react';
import { OpportunityAnalysis } from '../../types';
import { 
  GitCompare, 
  AlertTriangle, 
  Calendar, 
  FileSpreadsheet, 
  CheckCircle2, 
  Clock, 
  FileQuestion, 
  ShieldAlert, 
  ArrowRight,
  Info
} from 'lucide-react';

type Props = {
  analysis: OpportunityAnalysis;
};

export const AmendmentsConflictsView: React.FC<Props> = ({ analysis }) => {
  const amendments = analysis.amendments || [];
  const conflicts = analysis.conflicts || [];
  const missingDocs = analysis.missingDocuments || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <GitCompare className="w-4 h-4" />
            <span>Precedence Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Amendments, Conflicts & Analysis Completeness</h1>
          <p className="text-sm text-slate-600 mt-1">
            Automatically applies procurement authority precedence logic where later official amendments override obsolete solicitation text.
          </p>
        </div>

        {/* Completeness Badge */}
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
            analysis.analysisCompleteness === 'COMPLETE' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
            analysis.analysisCompleteness === 'MOSTLY COMPLETE' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
            'bg-rose-100 text-rose-900 border border-rose-300'
          }`}>
            Completeness: {analysis.analysisCompleteness}
          </span>
        </div>
      </div>

      {/* Precedence Rules Banner */}
      <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 text-xs space-y-2">
        <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Governing Precedence Hierarchy Rules</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          1. Later official amendments override conflicting earlier solicitation language. • 2. Official addenda modify or supplement the original solicitation. • 3. Official Q&A clarifies requirements. • 4. The main solicitation governs where no later modification exists.
        </p>
      </div>

      {/* Amendment Impact Summary */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-600" />
          <span>Amendment Impact Summary ({amendments.length})</span>
        </h2>

        {amendments.map((amend) => (
          <div key={amend.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-teal-500 text-slate-950 font-black text-xs rounded uppercase">
                  {amend.amendmentNumber}
                </span>
                <span className="font-bold text-slate-900 text-sm">{amend.sourceDocument}</span>
              </div>
              <span className="text-xs text-slate-500">Effective: {amend.effectiveDate}</span>
            </div>

            <p className="text-xs text-slate-700 font-medium">{amend.summary}</p>

            {/* Deadline Changes */}
            {amend.deadlinesChanged.length > 0 && (
              <div className="space-y-2 pt-1">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Governing Deadline Changes</h4>
                {amend.deadlinesChanged.map((dl, idx) => (
                  <div key={idx} className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900">{dl.label}:</span>
                      <span className="text-slate-500 line-through ml-2">{dl.previousDeadline}</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-amber-900">
                      <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                      <span>{dl.newGoverningDeadline} (Governing)</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Requirements Changed */}
            {amend.requirementsChanged.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Modified Requirements</h4>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  {amend.requirementsChanged.map((rc, idx) => (
                    <li key={idx}>{rc}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Document Conflicts List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Detected Precedence Conflicts ({conflicts.length})</span>
        </h2>

        <div className="space-y-4">
          {conflicts.map((conf) => (
            <div key={conf.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{conf.issue}</span>
                <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded">
                  Confidence: {conf.confidence}%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Earlier Requirement (Superseded)</span>
                  <p className="font-medium text-slate-700 mt-1">{conf.earlierRequirement}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">Source: {conf.earlierSource}</span>
                </div>

                <div className="p-3 bg-teal-50/60 border border-teal-200 rounded-lg">
                  <span className="text-[10px] font-bold text-teal-800 uppercase">Later Requirement (Governing)</span>
                  <p className="font-medium text-teal-950 mt-1">{conf.laterRequirement}</p>
                  <span className="text-[10px] text-teal-700 block mt-1">Source: {conf.laterSource}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-200/60 rounded-lg text-xs text-slate-800">
                <strong>Recommended Interpretation:</strong> {conf.recommendedInterpretation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Potentially Missing Procurement Documents */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileQuestion className="w-5 h-5 text-indigo-600" />
          <span>Potentially Missing Procurement Documents ({missingDocs.length})</span>
        </h2>

        {missingDocs.map((doc) => (
          <div key={doc.id} className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900">{doc.referencedDocument}</span>
              <p className="text-slate-600 mt-0.5">Referenced in {doc.sourceDocument} ({doc.sourcePage})</p>
              <p className="text-slate-500 text-[11px] mt-1">{doc.possibleImpact}</p>
            </div>
            <span className="px-2.5 py-1 bg-indigo-100 text-indigo-900 font-bold rounded shrink-0 text-[10px] uppercase">
              {doc.importance} IMPORTANCE
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
