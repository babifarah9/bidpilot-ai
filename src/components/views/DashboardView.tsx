import React from 'react';
import { Opportunity } from '../../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Calendar, 
  Clock, 
  FileText, 
  GitCompare, 
  CheckSquare, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Building2
} from 'lucide-react';

type Props = {
  opportunity: Opportunity;
  onGenerateProposalClick: () => void;
  onNavigateToTab: (tab: any) => void;
};

export const DashboardView: React.FC<Props> = ({
  opportunity,
  onGenerateProposalClick,
  onNavigateToTab
}) => {
  const analysis = opportunity.analysis;
  if (!analysis) return null;

  const fit = analysis.fitScore;
  const deadlineDate = new Date(analysis.governingSubmissionDeadline);
  const now = new Date();
  const daysRemaining = Math.max(0, Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  const totalReqs = analysis.requirements.length;
  const metReqs = analysis.requirements.filter((r) => r.status === 'MET').length;
  const missingReqs = analysis.requirements.filter((r) => r.status === 'NOT MET' || r.status === 'PARTIALLY MET').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Demo Banner if Demo */}
      {opportunity.isDemo && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-900 font-semibold text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-black text-[10px] rounded uppercase">DEMO DATA</span>
            <span>Pre-loaded fictional VA enterprise cloud opportunity package.</span>
          </div>
          <span className="text-amber-800 text-[11px] underline cursor-pointer" onClick={() => onNavigateToTab('documents')}>
            View 5 Uploaded Demo Files →
          </span>
        </div>
      )}

      {/* Main Hero Summary Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {/* GO / CONDITIONAL GO / NO-GO BADGE */}
              <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-black text-xs uppercase tracking-wider ${
                analysis.bidRecommendation === 'GO' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' :
                analysis.bidRecommendation === 'CONDITIONAL GO' ? 'bg-amber-400 text-slate-950' :
                'bg-rose-500 text-white'
              }`}>
                {analysis.bidRecommendation === 'GO' && <CheckCircle2 className="w-4 h-4" />}
                {analysis.bidRecommendation === 'CONDITIONAL GO' && <AlertTriangle className="w-4 h-4" />}
                {analysis.bidRecommendation === 'NO-GO' && <XCircle className="w-4 h-4" />}
                <span>{analysis.bidRecommendation} RECOMMENDATION</span>
              </div>

              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                Confidence: {analysis.confidenceScore}%
              </span>

              {analysis.amendments.length > 0 && (
                <span className="text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full font-semibold">
                  Governed by {analysis.amendments[0].amendmentNumber}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {analysis.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300 font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-400" />
                {analysis.issuingOrganization}
              </span>
              <span>• Solicitation #{analysis.solicitationNumber}</span>
              <span>• Value: {analysis.contractValue}</span>
              <span>• Type: {analysis.contractType}</span>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="shrink-0 bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 text-center w-full lg:w-72">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Overall Fit Score</div>
            <div className="text-4xl font-black text-teal-400 my-1">{fit.overallFitScore}<span className="text-lg font-normal text-slate-400">/100</span></div>
            <p className="text-[11px] text-slate-400 mb-4">Calculated deterministically from 5 weighted factors</p>

            <button
              onClick={onGenerateProposalClick}
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Generate Full Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Governing Deadlines Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Governing Deadline</span>
            <div className="text-lg font-bold text-slate-900">
              {new Date(analysis.governingSubmissionDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <span className="text-xs font-semibold text-amber-600">{daysRemaining} Days Remaining</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Documents & Amendments</span>
            <div className="text-lg font-bold text-slate-900">{opportunity.documents.length} Files Uploaded</div>
            <span className="text-xs font-semibold text-teal-600">{analysis.amendments.length} Amendments Detected</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Requirements Compliance</span>
            <div className="text-lg font-bold text-slate-900">{metReqs} / {totalReqs} Met</div>
            <span className="text-xs font-semibold text-emerald-600">{Math.round((metReqs / totalReqs) * 100)}% Met Coverage</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Proposal Readiness</span>
            <div className="text-lg font-bold text-slate-900">{opportunity.readinessReview?.overallScore || 90} / 100</div>
            <span className="text-xs font-semibold text-indigo-600">Draft Ready for Review</span>
          </div>
        </div>
      </div>

      {/* Executive Assessment & Disqualification Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <span>Executive Bid Assessment</span>
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {analysis.executiveAssessment}
          </p>

          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recommended Strategy</h4>
            <p className="text-xs text-slate-600 bg-teal-50/50 border border-teal-100 p-3 rounded-lg">
              {analysis.recommendedBidStrategy}
            </p>
          </div>
        </div>

        {/* Disqualification Risks */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>Disqualification Risks</span>
          </h3>

          <div className="space-y-3">
            {analysis.disqualificationRisks.map((risk, idx) => (
              <div key={idx} className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{risk}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateToTab('pricing')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 transition"
            >
              Resolve Pricing Gaps →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigateToTab('amendments')}
          className="p-5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-sm text-left transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Amendments & Conflicts</span>
            <GitCompare className="w-5 h-5 text-teal-600 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analysis.amendments.length} Amendments</div>
          <p className="text-xs text-slate-500 mt-1">{analysis.conflicts.length} Precedence conflicts detected</p>
        </button>

        <button
          onClick={() => onNavigateToTab('compliance')}
          className="p-5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-sm text-left transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Compliance Matrix</span>
            <CheckSquare className="w-5 h-5 text-teal-600 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalReqs} Requirements</div>
          <p className="text-xs text-slate-500 mt-1">{missingReqs} Partial / Unmet gaps</p>
        </button>

        <button
          onClick={() => onNavigateToTab('bid')}
          className="p-5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-sm text-left transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Fit Score Breakdown</span>
            <TrendingUp className="w-5 h-5 text-teal-600 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{fit.overallFitScore} / 100 Score</div>
          <p className="text-xs text-slate-500 mt-1">30% Eligibility + 25% Tech + 15% Past Perf</p>
        </button>

        <button
          onClick={() => onNavigateToTab('readiness')}
          className="p-5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-sm text-left transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Proposal Readiness</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{opportunity.readinessReview?.overallScore || 90} Score</div>
          <p className="text-xs text-slate-500 mt-1">Audit compliance & unsupported claims</p>
        </button>
      </div>
    </div>
  );
};
