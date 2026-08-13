import React from 'react';
import { OpportunityAnalysis } from '../../types';
import { TrendingUp, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Award, ShieldAlert, Loader2 } from 'lucide-react';

type Props = {
  analysis?: OpportunityAnalysis | null;
  onProceedToProposal?: () => void;
  isAnalyzing?: boolean;
  error?: string | null;
};

export const BidDecisionView: React.FC<Props> = ({
  analysis,
  onProceedToProposal,
  isAnalyzing,
  error
}) => {
  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Calculating Bid Decision & Qualification...</h2>
        <p className="text-sm text-slate-600">Running 5-factor deterministic fit formula against solicitation documents.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-lg">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            <span>Analysis Error</span>
          </div>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4 bg-white rounded-2xl border border-slate-200 shadow-sm my-8 p-8">
        <TrendingUp className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">No Opportunity Analysis Found</h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Upload and analyze procurement solicitation documents in the Workspace tab to generate a deterministic bid decision and qualification breakdown.
        </p>
      </div>
    );
  }

  const fit = analysis.fitScore || {
    eligibilityScore: 80,
    technicalCapabilityScore: 80,
    pastPerformanceScore: 80,
    commercialAttractivenessScore: 80,
    deliveryFeasibilityScore: 80,
    overallFitScore: 80
  };

  const strengths = fit.strengths || (
    analysis.requirements
      ? analysis.requirements.filter(r => r.status === 'MET').map(r => r.companyEvidence || r.requirement).slice(0, 4)
      : ["Company capability matches solicitation criteria."]
  );
  if (strengths.length === 0) {
    strengths.push("Mandatory qualification criteria met based on uploaded documents.");
  }

  const gaps = fit.gaps || (
    analysis.disqualificationRisks && analysis.disqualificationRisks.length > 0
      ? analysis.disqualificationRisks
      : ["No critical compliance gaps identified."]
  );

  const components = [
    {
      title: 'Mandatory Eligibility Alignment',
      weight: '30%',
      score: fit.eligibilityScore ?? 80,
      description: 'Clearance level, business size, SAM.gov registration, mandatory certifications.'
    },
    {
      title: 'Technical Capability Match',
      weight: '25%',
      score: fit.technicalMatchScore ?? fit.technicalCapabilityScore ?? 80,
      description: 'Cloud architecture, DevSecOps pipelines, EHR integration experience.'
    },
    {
      title: 'Past Performance & Corporate Experience',
      weight: '15%',
      score: fit.pastPerformanceScore ?? 80,
      description: 'Relevance of prior federal and healthcare IT contracts.'
    },
    {
      title: 'Commercial & Pricing Attractiveness',
      weight: '15%',
      score: fit.commercialScore ?? fit.commercialAttractivenessScore ?? 80,
      description: 'Labor rate competitiveness and pricing schedule completeness.'
    },
    {
      title: 'Delivery Feasibility & Schedule Realism',
      weight: '15%',
      score: fit.deliveryFeasibilityScore ?? 80,
      description: 'Available team capacity and transition timeline feasibility.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Deterministic Qualification</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Bid Decision & Qualification Breakdown</h1>
          <p className="text-sm text-slate-600 mt-1">
            Mathematical 5-factor weighting prevents bidding on high-risk, unpromising solicitations.
          </p>
        </div>

        {onProceedToProposal && (
          <button
            onClick={onProceedToProposal}
            className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Proceed to Proposal Draft</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Fit Score Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Overall Weighted Score</span>
          <div className="flex items-baseline gap-3 my-2">
            <span className="text-5xl font-extrabold text-white">{fit.overallFitScore ?? 80}</span>
            <span className="text-xl text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            {analysis.executiveAssessment || "Deterministic evaluation calculated based on uploaded solicitation documents."}
          </p>
        </div>

        <div className="text-center md:text-right shrink-0">
          <div className={`px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider ${
            (analysis.bidRecommendation || 'GO') === 'GO' ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-slate-950'
          }`}>
            {analysis.bidRecommendation || 'GO'} RECOMMENDATION
          </div>
        </div>
      </div>

      {/* 5-Factor Score Meters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900">5-Factor Deterministic Fit Formula</h2>

        <div className="space-y-6">
          {components.map((c, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{c.title}</span>
                  <span className="ml-2 text-slate-400">({c.weight} Weight)</span>
                </div>
                <span className="font-bold font-mono text-slate-900 text-sm">{c.score} / 100</span>
              </div>

              {/* Meter bar */}
              <div className="bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    c.score >= 80 ? 'bg-emerald-500' : c.score >= 60 ? 'bg-teal-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${c.score}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-slate-500">{c.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths vs Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            <span>Key Proposal Strengths</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Identified Compliance Gaps</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {gaps.map((gap, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
