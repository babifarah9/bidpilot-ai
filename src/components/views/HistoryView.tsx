import React from 'react';
import { Opportunity } from '../../types';
import { History, Play, Layers, Calendar, ArrowRight, Trash2 } from 'lucide-react';

type Props = {
  opportunities: Opportunity[];
  activeOpportunity: Opportunity | null;
  onSelectOpportunity: (opp: Opportunity) => void;
  onDeleteOpportunity: (id: string) => void;
};

export const HistoryView: React.FC<Props> = ({
  opportunities,
  activeOpportunity,
  onSelectOpportunity,
  onDeleteOpportunity
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <History className="w-4 h-4" />
            <span>Opportunity History</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Analyzed Opportunity Packages</h1>
          <p className="text-sm text-slate-600 mt-1">
            Access previous bid evaluations, compliance matrices, and generated proposal drafts.
          </p>
        </div>

        <span className="text-xs bg-slate-100 font-semibold text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
          Saved Records: {opportunities.length}
        </span>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {opportunities.map((opp) => {
          const isActive = opp.id === activeOpportunity?.id;
          const analysis = opp.analysis;

          return (
            <div
              key={opp.id}
              className={`p-6 rounded-2xl border transition shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-800'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200'
              }`}
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                    analysis?.bidRecommendation === 'GO' ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-slate-950'
                  }`}>
                    {analysis?.bidRecommendation || 'ANALYZED'}
                  </span>

                  {opp.isDemo && (
                    <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 font-bold text-[10px] rounded uppercase">
                      Demo Package
                    </span>
                  )}

                  <span className={`text-xs ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                    Created: {opp.createdAt}
                  </span>
                </div>

                <h3 className="text-lg font-bold leading-tight">{opp.title}</h3>
                <p className={`text-xs ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
                  {opp.issuingOrganization} • Solicitation #{opp.solicitationNumber} • {opp.documents.length} Files
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right mr-2">
                  <div className={`text-2xl font-black ${isActive ? 'text-teal-400' : 'text-slate-900'}`}>
                    {analysis?.fitScore.overallFitScore || 0}<span className="text-xs text-slate-400 font-normal">/100</span>
                  </div>
                  <div className={`text-[10px] uppercase font-semibold ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                    Fit Score
                  </div>
                </div>

                <button
                  onClick={() => onSelectOpportunity(opp)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{isActive ? 'Active Workspace' : 'Open Opportunity'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {!opp.isDemo && (
                  <button
                    onClick={() => onDeleteOpportunity(opp.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
