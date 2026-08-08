import React, { useEffect, useState } from 'react';
import { OpportunityDocument } from '../../types';
import { Sparkles, CheckCircle2, Loader2, FileText, Cpu } from 'lucide-react';

type Props = {
  documents: OpportunityDocument[];
  isAnalyzing: boolean;
  onComplete: () => void;
};

const ANALYSIS_STEPS = [
  'Uploading documents',
  'Extracting content',
  'Parsing spreadsheets',
  'Classifying documents',
  'Detecting amendments',
  'Extracting requirements',
  'Reconciling changes',
  'Building compliance matrix',
  'Comparing company profile',
  'Calculating fit score',
  'Preparing proposal workspace'
];

export const AnalysisProgressView: React.FC<Props> = ({ documents, isAnalyzing, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Increment step up to second-to-last step
    if (currentStep < ANALYSIS_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // On the last step, wait for isAnalyzing to become false before completing
      if (!isAnalyzing) {
        const timer = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [currentStep, isAnalyzing, onComplete]);

  const progressPercent = Math.round(((currentStep + 1) / ANALYSIS_STEPS.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      {/* Icon Ring */}
      <div className="relative inline-flex items-center justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-teal-50 border-4 border-teal-100 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-teal-600 animate-pulse" />
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
        Analyzing Opportunity Package
      </h1>
      <p className="text-sm text-slate-600 max-w-lg mx-auto mb-8">
        Gemini 3.6 Flash is extracting procurement requirements, reconciling amendments, and calculating company fit.
      </p>

      {/* Progress Bar */}
      <div className="bg-slate-200 h-3 rounded-full overflow-hidden max-w-xl mx-auto mb-4">
        <div
          className="bg-gradient-to-r from-teal-500 to-teal-400 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">{progressPercent}% Complete</span>

      {/* Step List */}
      <div className="mt-10 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-left max-w-xl mx-auto">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Analysis Stages</h3>
        <div className="space-y-2.5 text-xs">
          {ANALYSIS_STEPS.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div key={idx} className="flex items-center justify-between">
                <span className={`font-medium ${
                  isDone ? 'text-slate-900' : isCurrent ? 'text-teal-700 font-bold' : 'text-slate-400'
                }`}>
                  {idx + 1}. {step}
                </span>

                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Per Document Processing Badges */}
      <div className="mt-8 pt-6 border-t border-slate-200 max-w-xl mx-auto">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Document Processing Pipeline</h4>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {documents.map((doc) => (
            <div key={doc.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span>{doc.filename}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
