import React from 'react';
import { 
  FileSearch, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  FileCheck2, 
  Building2, 
  Cpu, 
  ArrowRight,
  Target
} from 'lucide-react';

interface LandingPageProps {
  onAnalyzeClick: () => void;
  onDemoClick: () => void;
  onAboutTechClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onAnalyzeClick,
  onDemoClick,
  onAboutTechClick
}) => {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-112px)] text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 text-teal-300 text-xs font-semibold border border-teal-500/30 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>AI-Powered Procurement Intelligence & Proposal Generation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Know whether to bid before you spend days writing.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            BidPilot AI analyzes RFPs, RFQs, grants and tenders, identifies your compliance gaps, and generates a solicitation-aligned proposal draft using Gemini.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="landing-primary-cta"
              onClick={onAnalyzeClick}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-base shadow-lg shadow-teal-950/50 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <Upload className="w-5 h-5" />
              <span>Analyze an Opportunity</span>
            </button>

            <button
              id="landing-secondary-cta"
              onClick={onDemoClick}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-base border border-slate-700 flex items-center justify-center gap-2.5 transition-all"
            >
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span>Try Demo</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Grounded in Company Profile</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Zero Hallucinated Credentials</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>5-Factor Weighted Fit Score</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Full Compliance Matrix</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Designed for Small Businesses, Consultants & Government Contractors
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Qualifying opportunities and drafting compliant proposals used to take 40+ hours per solicitation. BidPilot AI slashes preparation time to minutes with rigorous compliance checks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 font-bold mb-5 border border-teal-100">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Opportunity Qualification</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload any PDF or text solicitation. Gemini extracts mandatory requirements, evaluation criteria, page limits, and contract details instantly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 font-bold mb-5 border border-teal-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Bid-Readiness & Compliance Matrix</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Calculates an objective 5-factor fit score, produces a GO / NO-GO recommendation, and maps MET / PARTIALLY MET status for every requirement.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 font-bold mb-5 border border-teal-100">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Grounded Proposal Draft Generation</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Generates a complete first-draft proposal adhering to solicitation structure. Replaces missing company data with explicit user placeholders instead of inventing claims.
            </p>
          </div>
        </div>
      </section>

      {/* Core Workflow Steps */}
      <section className="bg-slate-100/80 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
              End-to-End Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              How BidPilot AI Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-lg border border-slate-200 text-center relative">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">1</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Enter Company Profile</h4>
              <p className="text-xs text-slate-600">Capabilities, certifications, clearances, and past performance.</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 text-center relative">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">2</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Upload Solicitation</h4>
              <p className="text-xs text-slate-600">Drop your RFP, RFQ, grant, or tender PDF document.</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 text-center relative">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">3</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Get Bid Readiness Analysis</h4>
              <p className="text-xs text-slate-600">Review GO / NO-GO recommendation, fit score, & compliance gaps.</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 text-center relative">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">4</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Generate & Export Draft</h4>
              <p className="text-xs text-slate-600">Edit sections, run readiness audit, and export to DOCX/PDF.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Highlight Footer Teaser */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-900/50 rounded-xl border border-teal-500/30 text-teal-300">
              <Cpu className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Powered by Google AI Studio & Gemini 3.6 Flash</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                BidPilot AI utilizes Gemini 3.6 Flash for high-speed document understanding, requirement extraction, compliance matching, proposal generation, and quality audit.
              </p>
            </div>
          </div>

          <button
            id="landing-tech-btn"
            onClick={onAboutTechClick}
            className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold border border-teal-500/30 flex items-center gap-2 whitespace-nowrap transition-colors"
          >
            <span>About the Technology</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
