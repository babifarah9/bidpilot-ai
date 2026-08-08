import React from 'react';
import { AnalysisRecord } from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Sparkles, 
  FileText, 
  CheckSquare, 
  Scale, 
  Building2, 
  Info,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface OpportunityDashboardProps {
  record: AnalysisRecord;
  onGenerateProposal: () => void;
  onViewCompliance: () => void;
  onViewStrategy: () => void;
}

export const OpportunityDashboard: React.FC<OpportunityDashboardProps> = ({
  record,
  onGenerateProposal,
  onViewCompliance,
  onViewStrategy
}) => {
  const { opportunity, bidReadiness, complianceMatrix, missingDocuments } = record;

  // Calculate days remaining
  const calculateDaysRemaining = (deadlineStr: string) => {
    if (!deadlineStr || deadlineStr.includes('TBD')) return 'N/A';
    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} Days` : 'Deadline Passed';
  };

  const daysRemaining = calculateDaysRemaining(opportunity.submissionDeadline);

  const metCount = complianceMatrix.filter(c => c.companyStatus === 'MET').length;
  const partialCount = complianceMatrix.filter(c => c.companyStatus === 'PARTIALLY MET').length;
  const notMetCount = complianceMatrix.filter(c => c.companyStatus === 'NOT MET' || c.companyStatus === 'UNKNOWN').length;

  const missingDocsCount = missingDocuments.filter(d => d.status === 'Missing' || d.status === 'Action Required').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-800 space-y-8">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {opportunity.procurementType || 'RFP'} • {opportunity.solicitationNumber || 'REF-SOL'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Issuing Org: <strong className="text-slate-800">{opportunity.issuingOrganization}</strong>
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {opportunity.opportunityTitle}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
            <span>Place of Performance: <strong>{opportunity.placeOfPerformance}</strong></span>
            <span>•</span>
            <span>Contract Value: <strong>{opportunity.contractValue}</strong></span>
            <span>•</span>
            <span>Period: <strong>{opportunity.periodOfPerformance}</strong></span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <button
            id="dashboard-btn-generate"
            onClick={onGenerateProposal}
            className="px-6 py-3.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md shadow-teal-950/20 flex items-center justify-center gap-2 transition-all whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>Generate Full Proposal Draft</span>
          </button>
        </div>
      </div>

      {/* Hero Recommendation & Score Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recommendation Badge Card */}
        <div className={`p-6 rounded-xl border shadow-sm flex flex-col justify-between ${
          bidReadiness.recommendation === 'GO' ? 'bg-emerald-950 text-white border-emerald-800' :
          bidReadiness.recommendation === 'CONDITIONAL GO' ? 'bg-amber-950 text-white border-amber-800' :
          'bg-rose-950 text-white border-rose-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Bid Decision</span>
            {bidReadiness.recommendation === 'GO' ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            ) : bidReadiness.recommendation === 'CONDITIONAL GO' ? (
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-400" />
            )}
          </div>

          <div className="my-4">
            <div className={`text-3xl font-extrabold tracking-tight ${
              bidReadiness.recommendation === 'GO' ? 'text-emerald-300' :
              bidReadiness.recommendation === 'CONDITIONAL GO' ? 'text-amber-300' :
              'text-rose-300'
            }`}>
              {bidReadiness.recommendation}
            </div>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              {bidReadiness.executiveAssessment}
            </p>
          </div>

          <div className="text-xs font-semibold pt-2 border-t border-white/10 flex items-center justify-between">
            <span>Confidence Score: {bidReadiness.confidenceScore}%</span>
            <button onClick={onViewStrategy} className="underline text-teal-300 hover:text-white">
              View Strategy
            </button>
          </div>
        </div>

        {/* Fit Score Gauge Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Fit Score</span>
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-slate-400" />
              <div className="hidden group-hover:block absolute right-0 top-6 w-64 p-3 bg-slate-900 text-white text-[11px] rounded-lg shadow-xl z-20 font-normal">
                Strict Code Formula:<br />
                <strong>30% Eligibility + 25% Technical + 15% Past Perf + 15% Commercial + 15% Delivery</strong>
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-2 my-3">
            <span className="text-4xl font-extrabold text-slate-900">{bidReadiness.overallFitScore}</span>
            <span className="text-slate-400 font-bold text-lg">/ 100</span>
          </div>

          {/* Component Bar Preview */}
          <div className="space-y-1.5 text-[11px] text-slate-600">
            <div className="flex justify-between">
              <span>Eligibility (30%):</span>
              <span className="font-bold">{bidReadiness.componentScores.eligibilityAlignment}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-600 rounded-full" style={{ width: `${bidReadiness.componentScores.eligibilityAlignment}%` }} />
            </div>

            <div className="flex justify-between pt-1">
              <span>Technical (25%):</span>
              <span className="font-bold">{bidReadiness.componentScores.technicalCapabilityAlignment}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-600 rounded-full" style={{ width: `${bidReadiness.componentScores.technicalCapabilityAlignment}%` }} />
            </div>
          </div>
        </div>

        {/* Deadline & Effort Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Submission Timeline</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>

          <div className="my-2">
            <span className="text-2xl font-extrabold text-slate-900">{daysRemaining}</span>
            <p className="text-xs text-slate-500 mt-0.5">
              Deadline: <strong>{opportunity.submissionDeadline}</strong>
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>
              <span className="block text-[11px] text-slate-400">Proposal Effort</span>
              <strong className="text-slate-800">{bidReadiness.proposalEffortEstimateHours} Hours</strong>
            </div>
            <div>
              <span className="block text-[11px] text-slate-400">Prep Cost Est.</span>
              <strong className="text-slate-800">${bidReadiness.estimatedPrepCostUSD.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Matrix Snapshot */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Compliance & Requirements Matrix Overview</h3>
            <p className="text-xs text-slate-500">
              Total Requirements Analyzed: <strong>{complianceMatrix.length}</strong>
            </p>
          </div>

          <button
            onClick={onViewCompliance}
            className="px-3.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            View Full Matrix →
          </button>
        </div>

        {/* Status Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
            <span className="text-xs font-semibold text-emerald-700">Fully Met Requirements</span>
            <div className="text-2xl font-extrabold mt-1">{metCount}</div>
          </div>

          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
            <span className="text-xs font-semibold text-amber-700">Partially Met Gaps</span>
            <div className="text-2xl font-extrabold mt-1">{partialCount}</div>
          </div>

          <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
            <span className="text-xs font-semibold text-rose-700">Unmet / Disqualification Risks</span>
            <div className="text-2xl font-extrabold mt-1">{notMetCount}</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900">
            <span className="text-xs font-semibold text-slate-600">Action Needed Docs</span>
            <div className="text-2xl font-extrabold mt-1">{missingDocsCount}</div>
          </div>
        </div>
      </div>

      {/* Disqualification Risks & Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>Key Disqualification Risks</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-700">
            {(opportunity.disqualificationRisks || []).map((risk, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-rose-50/60 p-2.5 rounded border border-rose-100">
                <span className="font-bold text-rose-800">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>Recommended Bid Strategy</span>
          </div>

          <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded border border-slate-200 leading-relaxed font-medium">
            {bidReadiness.recommendedBidStrategy}
          </p>
        </div>
      </div>
    </div>
  );
};
