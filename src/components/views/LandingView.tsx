import React from 'react';
import { 
  ArrowRight, 
  Play, 
  Files, 
  Cpu, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  FileSearch, 
  Building2,
  FileCheck
} from 'lucide-react';

type Props = {
  onAnalyzeClick: () => void;
  onTryDemoClick: () => void;
  onOpenAboutTech: () => void;
  onCompanyProfileClick: () => void;
};

export const LandingView: React.FC<Props> = ({
  onAnalyzeClick,
  onTryDemoClick,
  onOpenAboutTech,
  onCompanyProfileClick,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-20 pb-24 border-b border-slate-800">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>AI-Powered Government & Enterprise Proposal Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Know whether to bid before you spend days writing.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            BidPilot AI analyzes complete RFP, RFQ, grant and tender packages, identifies compliance gaps, and generates a solicitation-aligned proposal draft using Gemini.
          </p>

          {/* CTA Group */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onAnalyzeClick}
              className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-base rounded-xl transition shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Analyze an Opportunity</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={onTryDemoClick}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/90 hover:bg-slate-800 text-white font-semibold text-base rounded-xl border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Try Demo</span>
            </button>
          </div>

          {/* Core Value Proposition Banner */}
          <div className="mt-12 inline-block bg-slate-800/50 backdrop-blur-md border border-slate-700/60 rounded-xl px-6 py-3 text-xs sm:text-sm text-slate-300">
            <span className="font-semibold text-teal-400 uppercase tracking-wider mr-2">Core Value Proposition:</span>
            “Know whether to bid, what you need, and generate your first proposal draft in minutes.”
          </div>
        </div>
      </section>

      {/* Primary Value Pillars */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            End-to-End Procurement Qualification & Proposal Intelligence
          </h2>
          <p className="mt-3 text-slate-600">
            Designed for government contractors, small business prime offerors, consultants, and enterprise capture teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-6">
              <Files className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Multi-Document Analysis</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Upload complete opportunity packages including RFPs, SOWs, Excel pricing schedules, and amendments (.pdf, .docx, .xlsx, .xls, .csv).
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Preserves page & cell citations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Up to 20 files per opportunity
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Amendment & Precedence Engine</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Detects addenda, Q&As, and amendments. Automatically applies precedence logic so later official modifications override outdated solicitation language.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Displays governing deadlines
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Flags human review conflicts
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Grounded Proposal Draft & Review</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Generates a full solicitation-aligned proposal draft grounded strictly in source documents and your company profile with zero invented credentials.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Inserts <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">[USER INPUT REQUIRED]</code> tags
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Proposal Readiness Review scoring
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core User Flow Overview */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Step-by-Step Guidance</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">14-Step Core Workflow</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onCompanyProfileClick}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-teal-400" />
                <span>Configure Company Profile</span>
              </button>
              <button
                onClick={onOpenAboutTech}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-teal-400" />
                <span>About Technology</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
              <span className="text-xs font-bold text-teal-400">Steps 1–3</span>
              <h4 className="font-semibold text-white mt-1">Profile & Package Upload</h4>
              <p className="text-xs text-slate-400 mt-1">Enter company capabilities and upload multi-file RFPs, SOWs, and pricing workbooks.</p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
              <span className="text-xs font-bold text-teal-400">Steps 4–7</span>
              <h4 className="font-semibold text-white mt-1">AI Classification & Fit Score</h4>
              <p className="text-xs text-slate-400 mt-1">Gemini extracts requirements, checks profile alignment, and calculates weighted 0-100 Fit Score.</p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
              <span className="text-xs font-bold text-teal-400">Steps 8–10</span>
              <h4 className="font-semibold text-white mt-1">Amendments & Compliance Matrix</h4>
              <p className="text-xs text-slate-400 mt-1">Review governing deadlines, conflicts, missing documents, and compliance gap analysis.</p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
              <span className="text-xs font-bold text-teal-400">Steps 11–14</span>
              <h4 className="font-semibold text-white mt-1">Proposal & Readiness Review</h4>
              <p className="text-xs text-slate-400 mt-1">Generate full 30+ section draft, refine sections, run readiness review, and export PDF/DOCX.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
