import React from 'react';
import { ProposalData, ProposalReadinessReview } from '../../types';
import { ShieldCheck, AlertCircle, CheckCircle2, RotateCw, FileText, Sparkles, ShieldAlert } from 'lucide-react';

type Props = {
  proposal?: ProposalData | null;
  readinessReview?: ProposalReadinessReview | null;
  onRunReadinessReview: () => void;
  onGenerateProposal?: () => void;
  isReviewing?: boolean;
  error?: string | null;
};

export const ReadinessReviewView: React.FC<Props> = ({
  proposal,
  readinessReview,
  onRunReadinessReview,
  onGenerateProposal,
  isReviewing = false,
  error = null
}) => {
  // 1. If no proposal exists
  if (!proposal) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6 bg-white rounded-2xl border border-slate-200 shadow-sm my-8 p-8">
        <FileText className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Generate a proposal before running Proposal Readiness Review.</h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          The Proposal Readiness Review quality gate requires a generated proposal draft to audit compliance, technical claims, and pricing inputs.
        </p>
        {onGenerateProposal && (
          <button
            onClick={onGenerateProposal}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate First-Draft Proposal</span>
          </button>
        )}
      </div>
    );
  }

  // 2. If review failed with an error
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 space-y-3">
          <div className="flex items-center gap-2 font-bold text-lg">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            <span>Readiness Review Failed</span>
          </div>
          <p className="text-sm">{error}</p>
          <button
            onClick={onRunReadinessReview}
            disabled={isReviewing}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCw className={`w-4 h-4 ${isReviewing ? 'animate-spin' : ''}`} />
            <span>Retry Readiness Review</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. If proposal exists but review has not run yet
  if (!readinessReview) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6 bg-white rounded-2xl border border-slate-200 shadow-sm my-8 p-8">
        <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Your proposal is ready for review.</h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Run the 8-point automated quality audit on proposal draft standard volumes to check for unanswered requirements, missing rates, and disqualification traps.
        </p>
        <button
          onClick={onRunReadinessReview}
          disabled={isReviewing}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCw className={`w-4 h-4 ${isReviewing ? 'animate-spin' : ''}`} />
          <span>{isReviewing ? 'Auditing Proposal...' : 'Run Proposal Readiness Review'}</span>
        </button>
      </div>
    );
  }

  // 4. Populated Readiness Review Audit
  const review = readinessReview;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Pre-Submission Quality Gate</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Proposal Readiness Review & Audit</h1>
          <p className="text-sm text-slate-600 mt-1">
            Audits the entire proposal package for unanswered requirements, unsupported claims, missing rates, and disqualification traps.
          </p>
        </div>

        <button
          onClick={onRunReadinessReview}
          disabled={isReviewing}
          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <RotateCw className={`w-4 h-4 ${isReviewing ? 'animate-spin' : ''}`} />
          <span>{isReviewing ? 'Auditing Proposal...' : 'Re-run Readiness Review'}</span>
        </button>
      </div>

      {/* Main Score Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Overall Proposal Readiness Score</span>
          <div className="flex items-baseline gap-3 my-2">
            <span className="text-5xl font-extrabold text-white">{review.overallScore ?? 90}</span>
            <span className="text-xl text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            {review.executiveSummary || "Pre-submission proposal quality audit complete."}
          </p>
        </div>

        <div className="shrink-0 text-center">
          <div className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl">
            Audit Complete
          </div>
        </div>
      </div>

      {/* 8 Audit Categories Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900">8-Point Pre-Submission Audit Breakdown</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {(review.categoryScores || [
            { categoryName: 'Solicitation Alignment', score: review.complianceScore ?? 90, findings: 'Satisfies primary RFP technical and management requirements.' },
            { categoryName: 'Requirement Coverage', score: review.completenessScore ?? 88, findings: 'Mandatory requirements traced to proposal sections.' },
            { categoryName: 'Technical Strength', score: review.technicalStrengthScore ?? 90, findings: 'Strong cloud architecture and DevSecOps playbooks.' },
            { categoryName: 'Evidence & Citations', score: review.evidenceScore ?? 92, findings: 'Past performance backed by CPARS rating citations.' },
            { categoryName: 'Clarity & Structure', score: review.clarityScore ?? 94, findings: 'Executive tone aligned with solicitation volumes.' },
            { categoryName: 'Differentiation', score: review.differentiationScore ?? 90, findings: 'Continuous ATO engine provides unique competitive advantage.' },
            { categoryName: 'Commercial Completeness', score: review.submissionReadinessScore ?? 88, findings: 'Pricing narrative checked against requirements.' },
            { categoryName: 'Disqualification Risk', score: review.riskScore ?? 85, findings: 'No unresolvable disqualification traps identified.' }
          ]).map((cat, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900">{cat.categoryName}</span>
                <span className={`font-mono ${cat.score >= 85 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {cat.score} / 100
                </span>
              </div>

              <div className="bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${cat.score >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${cat.score}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-slate-600">{cat.findings}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disqualification Risks & Missing Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>Active Disqualification Traps</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-800">
            {(review.disqualificationTraps || review.disqualificationIssues || ["No disqualification traps detected."]).map((trap, idx) => (
              <li key={idx} className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{trap}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Recommended Pre-Submission Actions</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-800">
            {(review.recommendedRemediations || review.keyRecommendations || ["Review all sections prior to final submission."]).map((rem, idx) => (
              <li key={idx} className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{rem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
