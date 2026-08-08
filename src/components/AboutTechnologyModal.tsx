import React from 'react';
import { Cpu, X, Sparkles, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

interface AboutTechnologyModalProps {
  onClose: () => void;
}

export const AboutTechnologyModal: React.FC<AboutTechnologyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 my-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600/30 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">BidPilot AI System Architecture</h3>
              <p className="text-xs text-slate-400">Powered by Google AI Studio & Gemini 3.6 Flash</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-teal-300">
              <Zap className="w-4 h-4" />
              <span>1. Multi-Stage Pipeline Execution</span>
            </div>
            <p>
              BidPilot AI decouples procurement qualification into five distinct structured stages: (1) Solicitation Parsing, (2) Profile Capability Matching, (3) Deterministic 5-Factor Score Calculation, (4) Compliance Matrix Construction, and (5) Proposal Draft Generation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-teal-300">
              <ShieldCheck className="w-4 h-4" />
              <span>2. Strict Grounding & Zero Hallucination Rule</span>
            </div>
            <p>
              Gemini model prompts are strictly constrained: The model is forbidden from inventing company experience, certifications, clearances, past performance, or personnel credentials. Missing details are automatically replaced with visible <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">[USER INPUT REQUIRED: ...]</code> tags.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-teal-300">
              <Sparkles className="w-4 h-4" />
              <span>3. Code-Level Deterministic Fit Scoring</span>
            </div>
            <p>
              The Fit Score is computed server-side using an explicit weighted formula: <strong className="text-white">30% Eligibility + 25% Technical + 15% Past Performance + 15% Commercial + 15% Delivery</strong>. Model assessments inform the sub-scores, guaranteeing transparent, repeatable evaluation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-teal-300">
              <CheckCircle2 className="w-4 h-4" />
              <span>4. Server-Side Security & Key Protection</span>
            </div>
            <p>
              Gemini API keys are maintained exclusively on the Cloud Run Express backend (<code className="text-teal-300">server.ts</code>). Client requests interact strictly via typed REST endpoints, preventing secret exposure.
            </p>
          </div>
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors"
          >
            Close Architecture Summary
          </button>
        </div>
      </div>
    </div>
  );
};
