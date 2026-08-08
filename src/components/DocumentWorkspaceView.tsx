import React, { useState } from 'react';
import { OpportunityAnalysis, OpportunityDocument, AmendmentItem, DocumentConflict, MissingProcurementDocument } from '../types';
import { FileStack, FileText, FileSpreadsheet, AlertTriangle, CheckCircle2, Clock, Calendar, ArrowRight, ShieldAlert, Layers, ExternalLink, HelpCircle, FileCheck, RefreshCw, ChevronDown, ChevronRight, Filter, Calculator } from 'lucide-react';

interface DocumentWorkspaceViewProps {
  opportunity: OpportunityAnalysis;
}

export const DocumentWorkspaceView: React.FC<DocumentWorkspaceViewProps> = ({ opportunity }) => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [expandedConflictId, setExpandedConflictId] = useState<string | null>(opportunity.conflicts?.[0]?.id || null);

  const documents = opportunity.documents || [];
  const amendments = opportunity.amendments || [];
  const conflicts = opportunity.conflicts || [];
  const missingDocs = opportunity.potentiallyMissingDocs || [];
  const completeness = opportunity.analysisCompleteness || 'COMPLETE';
  const coverage = opportunity.requirementsCoverage;

  const filteredDocs = selectedTypeFilter === 'ALL'
    ? documents
    : documents.filter(d => d.type === selectedTypeFilter);

  const getCompletenessBadge = (status: string) => {
    switch (status) {
      case 'COMPLETE':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Complete Package (100%)</span>;
      case 'MOSTLY COMPLETE':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-300 text-xs font-bold"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Mostly Complete</span>;
      case 'INCOMPLETE':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold"><AlertTriangle className="w-4 h-4 text-amber-600" /> Missing Optional Attachments</span>;
      case 'CRITICAL DOCUMENTS MISSING':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold"><ShieldAlert className="w-4 h-4 text-rose-600" /> Critical Documents Missing</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Overview Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded border border-teal-800">
                {opportunity.solicitationNumber}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {documents.length} Document(s) Reconciled
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {opportunity.opportunityTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Issuing Authority: <span className="text-slate-200 font-semibold">{opportunity.issuingOrganization}</span>
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <div>{getCompletenessBadge(completeness)}</div>
            {opportunity.originalSubmissionDeadline && (
              <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Deadline Extended: {new Date(opportunity.submissionDeadline).toLocaleDateString()} (Prev: {new Date(opportunity.originalSubmissionDeadline).toLocaleDateString()})</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {opportunity.completenessReason || 'All uploaded documents have been classified and cross-referenced. Requirements and deadlines reflect the active governing authority (Amendments > Main RFP > Attachments).'}
        </p>

        {/* Coverage Progress Bar */}
        {coverage && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <div className="text-[11px] font-medium text-slate-400">Mandatory Requirements Coverage</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-lg font-bold text-teal-400">{coverage.coveragePercentage}%</div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-400 h-2 rounded-full" style={{ width: `${coverage.coveragePercentage}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <div className="text-[11px] font-medium text-slate-400">Addressed Requirements</div>
              <div className="text-lg font-bold text-white mt-1">
                {coverage.requirementsAddressed} / {coverage.totalMandatoryRequirements}
              </div>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <div className="text-[11px] font-medium text-slate-400">Active Amendments Reconciled</div>
              <div className="text-lg font-bold text-amber-400 mt-1">
                {amendments.length} Amendment(s)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1. Document Repository & Hierarchy Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileStack className="w-5 h-5 text-teal-700" />
            <h3 className="text-sm font-bold text-slate-900">Procurement Package Repository</h3>
            <span className="text-xs bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
              {documents.length} Files
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Filter:</span>
            {['ALL', 'Main Solicitation', 'Statement of Work', 'Amendment', 'Pricing Schedule'].map(ft => (
              <button
                key={ft}
                onClick={() => setSelectedTypeFilter(ft)}
                className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                  selectedTypeFilter === ft
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {ft === 'ALL' ? 'All Documents' : ft}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100/80 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Role / Classification</th>
                <th className="py-3 px-4">Pages / Size</th>
                <th className="py-3 px-4">Version / Amd #</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Authority Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc, idx) => {
                const isAmendment = doc.type === 'Amendment';
                const isSpreadsheet = doc.isSpreadsheet || doc.filename.endsWith('.xlsx') || doc.filename.endsWith('.xls') || doc.filename.endsWith('.csv');
                return (
                  <tr key={doc.id || idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        {isSpreadsheet ? (
                          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <FileText className={`w-4 h-4 ${isAmendment ? 'text-amber-600' : 'text-teal-600'}`} />
                        )}
                        <span>{doc.filename}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        isAmendment 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                          : isSpreadsheet 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {isSpreadsheet ? (
                        <span>{doc.sheetsCount || 1} Sheet(s) • {(doc.size / (1024 * 1024)).toFixed(2)} MB</span>
                      ) : (
                        <span>{doc.pageCount ? `${doc.pageCount} Pages • ` : ''}{(doc.size / (1024 * 1024)).toFixed(2)} MB</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">
                      {isAmendment ? (
                        <span className="bg-amber-50 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded text-[11px]">
                          Amd #{doc.amendmentNumber || '01'}
                        </span>
                      ) : isSpreadsheet ? (
                        <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold px-2 py-0.5 rounded text-[11px]">
                          Workbook
                        </span>
                      ) : (
                        <span className="text-slate-600">{doc.version || 'v1.0'}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        doc.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {doc.priority || 'High'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {isAmendment ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <RefreshCw className="w-3 h-3 text-amber-600" />
                          <span>Supersedes Earlier Terms</span>
                        </span>
                      ) : isSpreadsheet ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <Calculator className="w-3 h-3 text-emerald-600" />
                          <span>Formula Parsed</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-500">Active Baseline</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Amendments & Revisions Tracker */}
      {amendments.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <RefreshCw className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">Solicitation Amendments & Revisions Tracker</h3>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              {amendments.length} Active Amendment
            </span>
          </div>

          <div className="space-y-4">
            {amendments.map((amd, idx) => (
              <div key={amd.id || idx} className="border border-amber-200 bg-amber-50/40 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-600 text-white font-extrabold text-xs px-2.5 py-1 rounded">
                      Amendment #{amd.amendmentNumber || '01'}
                    </span>
                    <span className="text-sm font-bold text-slate-900">{amd.documentName}</span>
                  </div>
                  <span className="text-xs text-amber-900 font-semibold bg-amber-100 px-2.5 py-1 rounded border border-amber-300">
                    Effective Date: {amd.effectiveDate || amd.publicationDate}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Changed Deadlines */}
                  {amd.deadlinesChanged?.length > 0 && (
                    <div className="bg-white p-3.5 rounded-lg border border-amber-200 space-y-1.5">
                      <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Deadline Extensions / Changes</span>
                      </div>
                      <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                        {amd.deadlinesChanged.map((dl, i) => (
                          <li key={i} className="font-medium text-amber-950">{dl}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Requirements Changed */}
                  {amd.requirementsChanged?.length > 0 && (
                    <div className="bg-white p-3.5 rounded-lg border border-amber-200 space-y-1.5">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>Technical & Personnel Revisions</span>
                      </div>
                      <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                        {amd.requirementsChanged.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Gemini Impact Summary */}
                {amd.impactSummaryText && (
                  <div className="bg-white p-3.5 rounded-lg border border-amber-300/80 text-xs text-slate-800 leading-relaxed">
                    <span className="font-bold text-amber-950">Proposal Impact Summary: </span>
                    <span>{amd.impactSummaryText}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Document Hierarchy Conflict Resolution */}
      {conflicts.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">Document Hierarchy Conflict Resolution</h3>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
              {conflicts.length} Reconciled Conflicts
            </span>
          </div>

          <div className="space-y-3">
            {conflicts.map((conf) => {
              const isExpanded = expandedConflictId === conf.id;
              return (
                <div key={conf.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setExpandedConflictId(isExpanded ? null : conf.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 uppercase">
                        {conf.conflictType}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{conf.issue}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {conf.confidence}% Confidence
                      </span>
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Earlier Requirement (Pre-Amendment)</span>
                          <p className="font-medium text-slate-800">{conf.earlierRequirement}</p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            Source: {conf.earlierSource.documentName} (Pg {conf.earlierSource.pageNumber}, {conf.earlierSource.sectionName})
                          </p>
                        </div>

                        <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200 space-y-1">
                          <span className="text-[10px] font-bold text-amber-800 uppercase">Later Governing Requirement (Amendment)</span>
                          <p className="font-bold text-amber-950">{conf.laterRequirement}</p>
                          <p className="text-[11px] text-amber-800 font-mono">
                            Source: {conf.laterSource.documentName} (Pg {conf.laterSource.pageNumber}, {conf.laterSource.sectionName})
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-950">
                        <span className="font-bold text-teal-900">Recommended Interpretation: </span>
                        <span>{conf.recommendedInterpretation}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Potentially Missing Documents Panel */}
      {missingDocs.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <HelpCircle className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">Referenced Documents Audit (Package Pre-Flight Check)</h3>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {missingDocs.map((md) => (
              <div key={md.id} className="p-4 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{md.documentNameRef}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      md.importance === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {md.importance} Importance
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{md.impactOnAnalysis}</p>
                  <p className="text-[11px] font-mono text-slate-400">Referenced in: {md.whereReferenced}</p>
                </div>

                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded border border-teal-200 whitespace-nowrap">
                  Small Business Exempt / Verification Optional
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
