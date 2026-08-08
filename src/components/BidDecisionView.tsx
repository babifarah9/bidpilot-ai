import React from 'react';
import { BidReadinessAnalysis, SubmissionTimeline, RiskRegisterItem, OpportunityAnalysis } from '../types';
import { Scale, CheckCircle2, AlertTriangle, XCircle, Clock, ShieldAlert, Calculator, Calendar } from 'lucide-react';

interface BidDecisionViewProps {
  bidReadiness: BidReadinessAnalysis;
  timeline: SubmissionTimeline;
  riskRegister: RiskRegisterItem[];
  opportunity: OpportunityAnalysis;
  onProceedToProposal: () => void;
}

export const BidDecisionView: React.FC<BidDecisionViewProps> = ({
  bidReadiness,
  timeline,
  riskRegister,
  opportunity,
  onProceedToProposal
}) => {
  const { componentScores } = bidReadiness;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-800 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-teal-700" />
            <h1 className="text-2xl font-bold text-slate-900">Bid Decision & Qualification Analysis</h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Calculated bid-readiness analysis, deterministic formula scoring, risk register, and submission timeline.
          </p>
        </div>

        <button
          onClick={onProceedToProposal}
          className="px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
        >
          Generate First-Draft Proposal →
        </button>
      </div>

      {/* Decision Hero & Formula Proof */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommendation Card */}
        <div className={`p-6 rounded-xl border shadow-sm text-white flex flex-col justify-between ${
          bidReadiness.recommendation === 'GO' ? 'bg-emerald-950 border-emerald-800' :
          bidReadiness.recommendation === 'CONDITIONAL GO' ? 'bg-amber-950 border-amber-800' :
          'bg-rose-950 border-rose-800'
        }`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Final Decision</span>
            <div className={`text-4xl font-extrabold mt-2 ${
              bidReadiness.recommendation === 'GO' ? 'text-emerald-300' :
              bidReadiness.recommendation === 'CONDITIONAL GO' ? 'text-amber-300' :
              'text-rose-300'
            }`}>
              {bidReadiness.recommendation}
            </div>
            <p className="text-xs text-slate-200 mt-3 leading-relaxed">
              {bidReadiness.executiveAssessment}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs space-y-1">
            <div className="flex justify-between">
              <span>Confidence:</span>
              <strong className="text-white">{bidReadiness.confidenceScore}%</strong>
            </div>
            <div className="flex justify-between">
              <span>Est. Proposal Hours:</span>
              <strong className="text-white">{bidReadiness.proposalEffortEstimateHours} Hrs</strong>
            </div>
            <div className="flex justify-between">
              <span>Est. Preparation Cost:</span>
              <strong className="text-white">${bidReadiness.estimatedPrepCostUSD.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Scoring Breakdown & Formula Explanation */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-teal-700" />
              <h3 className="text-base font-bold text-slate-900">Deterministic Weighted Fit Score Calculation</h3>
            </div>
            <div className="text-xl font-extrabold text-slate-900">
              Score: <span className="text-teal-700">{bidReadiness.overallFitScore} / 100</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-700 leading-relaxed">
            Fit Score = (0.30 × {componentScores.eligibilityAlignment}) + (0.25 × {componentScores.technicalCapabilityAlignment}) + (0.15 × {componentScores.pastPerformanceAlignment}) + (0.15 × {componentScores.commercialAttractiveness}) + (0.15 × {componentScores.deliveryFeasibility})<br />
            = {(0.30 * componentScores.eligibilityAlignment).toFixed(1)} + {(0.25 * componentScores.technicalCapabilityAlignment).toFixed(1)} + {(0.15 * componentScores.pastPerformanceAlignment).toFixed(1)} + {(0.15 * componentScores.commercialAttractiveness).toFixed(1)} + {(0.15 * componentScores.deliveryFeasibility).toFixed(1)} = <strong>{bidReadiness.overallFitScore}%</strong>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Eligibility Alignment (30%)</span>
                <span>{componentScores.eligibilityAlignment}%</span>
              </div>
              <p className="text-[11px] text-slate-600">{bidReadiness.eligibilityDetermination}</p>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Technical Capability (25%)</span>
                <span>{componentScores.technicalCapabilityAlignment}%</span>
              </div>
              <p className="text-[11px] text-slate-600">{bidReadiness.technicalAlignmentText}</p>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Past Performance (15%)</span>
                <span>{componentScores.pastPerformanceAlignment}%</span>
              </div>
              <p className="text-[11px] text-slate-600">{bidReadiness.pastPerformanceAlignmentText}</p>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Delivery Feasibility (15%)</span>
                <span>{componentScores.deliveryFeasibility}%</span>
              </div>
              <p className="text-[11px] text-slate-600">{bidReadiness.deliveryFeasibilityText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Register */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldAlert className="w-5 h-5 text-rose-700" />
          <h2 className="text-base font-bold text-slate-900">Proposal Risk Register & Mitigations</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Risk Description</th>
                <th className="py-2.5 px-3 w-24">Prob. / Impact</th>
                <th className="py-2.5 px-3 w-24 text-center">Severity</th>
                <th className="py-2.5 px-3">Mitigation Strategy</th>
                <th className="py-2.5 px-3">Contingency Plan</th>
                <th className="py-2.5 px-3 w-32">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {(riskRegister || []).map((rr, idx) => (
                <tr key={rr.id || idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-slate-900 leading-snug">{rr.risk}</td>
                  <td className="py-2.5 px-3 text-slate-600">
                    <div>P: <strong>{rr.probability}</strong></div>
                    <div>I: <strong>{rr.impact}</strong></div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      rr.severity === 'Critical' ? 'bg-rose-200 text-rose-900' :
                      rr.severity === 'High' ? 'bg-amber-200 text-amber-900' :
                      'bg-slate-200 text-slate-800'
                    }`}>
                      {rr.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{rr.mitigation}</td>
                  <td className="py-2.5 px-3 text-slate-700">{rr.contingency}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{rr.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submission Timeline Calendar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Calendar className="w-5 h-5 text-teal-700" />
          <h2 className="text-base font-bold text-slate-900">Deadline & Submission Milestone Timeline</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Questions Deadline</span>
            <div className="font-extrabold text-slate-900">{timeline.questionsDeadline}</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Draft Completion Target</span>
            <div className="font-extrabold text-slate-900">{timeline.draftCompletionTarget}</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Pricing Completion Target</span>
            <div className="font-extrabold text-slate-900">{timeline.pricingCompletionTarget}</div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
            <span className="text-[11px] font-bold text-amber-700 uppercase">Proposal Submission Deadline</span>
            <div className="font-extrabold text-amber-900">{timeline.proposalSubmissionDeadline}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
