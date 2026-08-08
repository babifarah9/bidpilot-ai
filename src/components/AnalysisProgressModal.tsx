import React, { useEffect, useState } from 'react';
import { Sparkles, FileSearch, CheckCircle2, ShieldCheck, Scale, FileText } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Parsing Solicitation PDF & Requirements', detail: 'Extracting title, deadlines, evaluation criteria, page limits...' },
  { id: 2, title: 'Matching Company Profile & Clearances', detail: 'Cross-referencing capabilities, clearances, and past performance...' },
  { id: 3, title: 'Calculating Weighted 5-Factor Fit Score', detail: 'Applying deterministic formula: 30% Elig + 25% Tech + 15% Past + 15% Comm + 15% Deliv...' },
  { id: 4, title: 'Generating Compliance Matrix & Gap Analysis', detail: 'Mapping MET, PARTIALLY MET, and NOT MET status across all mandatory requirements...' },
  { id: 5, title: 'Identifying Missing Documents & Submission Timeline', detail: 'Checking required forms, certifications, financial audits, and key milestones...' }
];

export const AnalysisProgressModal: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev < STEPS.length ? prev + 1 : prev));
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-600/30 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">BidPilot AI Analysis Engine</h3>
            <p className="text-xs text-slate-400">Processing document with Gemini 3.6 Flash</p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {STEPS.map(step => {
            const isDone = step.id < activeStep;
            const isCurrent = step.id === activeStep;

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-lg border text-xs transition-all flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-slate-800 border-teal-500/60 text-white shadow-md'
                    : isDone
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                      {step.id}
                    </div>
                  )}
                </div>

                <div className="space-y-0.5">
                  <p className={`font-bold ${isCurrent ? 'text-teal-300' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                    {step.title}
                  </p>
                  <p className="text-[11px] text-slate-400">{step.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-center text-xs text-slate-400 font-medium italic">
          Validating structured JSON schemas and calculating bid readiness...
        </div>
      </div>
    </div>
  );
};
