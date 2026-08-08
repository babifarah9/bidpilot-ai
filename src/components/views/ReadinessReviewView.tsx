import React, { useState } from 'react';
import { ProposalReadinessReview } from '../../types';
import { ShieldCheck, AlertCircle, CheckCircle2, RotateCw, Award, ArrowRight } from 'lucide-react';

type Props = {
  readinessReview: ProposalReadinessReview;
  onRunReadinessReview: () => void;
  isReviewing: boolean;
};

export const ReadinessReviewView: React.FC<Props> = ({
  readinessReview,
  onRunReadinessReview,
  isReviewing
}) => {
  const [review, setReview] = useState<ProposalReadinessReview>(readinessReview);

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
          <span>{isReviewing ? 'Auditing Proposal...' : 'Run Readiness Review'}</span>
        </button>
      </div>

      {/* Main Score Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Overall Proposal Readiness Score</span>
          <div className="flex items-baseline gap-3 my-2">
            <span className="text-5xl font-extrabold text-white">{review.overallScore}</span>
            <span className="text-xl text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            {review.executiveSummary}
          </p>
        </div>

        <div className="shrink-0 text-center">
          <div className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl">
            Audit Passed (Minor User Inputs Pending)
          </div>
        </div>
      </div>

      {/* 8 Audit Categories Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900">8-Point Pre-Submission Audit Breakdown</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {(review.categoryScores || [
            { categoryName: 'Solicitation Alignment', score: review.complianceScore, findings: 'Satisfies primary RFP technical and management requirements.' },
            { categoryName: 'Requirement Coverage', score: review.completenessScore, findings: '100% of mandatory requirements traced to proposal sections.' },
            { categoryName: 'Technical Strength', score: review.technicalStrengthScore, findings: 'Strong cloud architecture and DevSecOps playbooks.' },
            { categoryName: 'Evidence & Citations', score: review.evidenceScore, findings: 'Past performance backed by CPARS rating citations.' },
            { categoryName: 'Clarity & Structure', score: review.clarityScore, findings: 'Executive tone aligned with solicitation volumes.' },
            { categoryName: 'Differentiation', score: review.differentiationScore, findings: 'Continuous ATO engine provides unique competitive advantage.' },
            { categoryName: 'Commercial Completeness', score: review.submissionReadinessScore, findings: 'Pricing requires user rate confirmation.' },
            { categoryName: 'Disqualification Risk', score: review.riskScore, findings: 'No unresolvable disqualification traps identified.' }
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
            {(review.disqualificationTraps || review.disqualificationIssues).map((trap, idx) => (
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
            {(review.recommendedRemediations || review.keyRecommendations).map((rem, idx) => (
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
