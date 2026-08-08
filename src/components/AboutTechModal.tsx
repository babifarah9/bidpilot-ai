import React from 'react';
import { X, Cpu, ShieldCheck, FileCheck, Layers, Sparkles } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AboutTechModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-teal-50 text-teal-700 rounded-xl border border-teal-100">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-teal-700 uppercase">Hackathon Technology Section</span>
            <h2 className="text-2xl font-bold text-slate-900">About the Technology</h2>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
          <p className="text-slate-700 font-medium leading-relaxed">
            “BidPilot AI uses Gemini for multi-document understanding, procurement requirement extraction, compliance analysis, company-to-opportunity matching, amendment reconciliation, proposal generation, and proposal readiness review.”
          </p>
        </div>

        <div className="space-y-4 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Gemini 3.6 Flash Multi-Document Intelligence</h4>
              <p className="mt-0.5">
                Analyzes complete opportunity packages comprising PDFs, Word documents, Excel workbooks, and CSV spreadsheets simultaneously without flattening source identity or page metadata.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0 mt-0.5">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Amendment Reconciliation & Authority Precedence</h4>
              <p className="mt-0.5">
                Automatically detects official amendments, addenda, and Q&A logs, applying strict precedence logic where later official amendments override obsolete solicitation requirements and deadlines.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-0.5">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Hybrid Deterministic + GenAI Architecture</h4>
              <p className="mt-0.5">
                Uses Gemini for semantic document extraction and proposal section generation, while enforcing deterministic application logic for mathematical Fit Score weighting (30% Eligibility, 25% Tech, 15% Past Perf, 15% Commercial, 15% Delivery) and spreadsheet parsing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Prompt Injection Defense & Hallucination Guardrails</h4>
              <p className="mt-0.5">
                Treats procurement attachments as untrusted content, preventing prompt injection. Proposal generation strictly references company profile facts and inserts <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">[USER INPUT REQUIRED]</code> tags whenever credentials or rates are missing.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
