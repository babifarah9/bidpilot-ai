import React from 'react';
import { 
  FileSearch, 
  Building2, 
  Upload, 
  LayoutDashboard, 
  FileStack,
  FileSpreadsheet,
  CheckSquare, 
  Scale, 
  FileText, 
  ShieldCheck, 
  Download, 
  History, 
  Cpu, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { AnalysisRecord } from '../types';

export type ActiveTab = 
  | 'landing'
  | 'profile'
  | 'upload'
  | 'dashboard'
  | 'doc-workspace'
  | 'pricing-review'
  | 'compliance'
  | 'decision'
  | 'editor'
  | 'readiness'
  | 'export'
  | 'history'
  | 'about-tech';

interface HeaderNavProps {
  activeTab: ActiveTab;
  setActiveTab?: (tab: ActiveTab) => void;
  onSelectTab?: (tab: ActiveTab) => void;
  currentRecord?: AnalysisRecord | null;
  onLoadDemo?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onSelectTab,
  currentRecord,
  onLoadDemo
}) => {
  const handleTabChange = (tab: ActiveTab) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };
  return (
    <header id="main-header" className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange('landing')}>
            <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-900/40 border border-teal-400/30">
              <FileSearch className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">BidPilot <span className="text-teal-400">AI</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                  Gov & Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Opportunity Qualification & Proposal Platform</p>
            </div>
          </div>

          {/* Quick Context Indicator if opportunity loaded */}
          {currentRecord && (
            <div className="hidden xl:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700 text-xs text-slate-300">
              <span className="font-semibold text-teal-300 truncate max-w-[200px]" title={currentRecord.opportunity.opportunityTitle}>
                {currentRecord.opportunity.solicitationNumber || currentRecord.opportunity.opportunityTitle}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                currentRecord.bidReadiness.recommendation === 'GO' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                currentRecord.bidReadiness.recommendation === 'CONDITIONAL GO' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                'bg-rose-950 text-rose-300 border border-rose-800'
              }`}>
                {currentRecord.bidReadiness.recommendation} ({currentRecord.bidReadiness.overallFitScore}%)
              </span>
            </div>
          )}

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <button
              id="nav-btn-demo"
              onClick={onLoadDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 transition-all shadow-sm"
              title="Load full pre-analyzed demo opportunity & company profile"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Try Demo Data</span>
            </button>

            <button
              id="nav-btn-analyze"
              onClick={() => handleTabChange('upload')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-sm shadow-teal-900/50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Analyze RFP</span>
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex items-center overflow-x-auto scrollbar-none py-2 gap-1 border-t border-slate-800/80 text-xs font-medium text-slate-300">
          <button
            id="tab-landing"
            onClick={() => handleTabChange('landing')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'landing' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Home
          </button>

          <button
            id="tab-profile"
            onClick={() => handleTabChange('profile')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'profile' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            Company Profile
          </button>

          <button
            id="tab-upload"
            onClick={() => handleTabChange('upload')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'upload' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            Upload Opportunity
          </button>

          {currentRecord && (
            <>
              <div className="h-4 w-px bg-slate-800 my-auto mx-1" />

              <button
                id="tab-dashboard"
                onClick={() => handleTabChange('dashboard')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'dashboard' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-teal-400" />
                Dashboard
              </button>

              <button
                id="tab-doc-workspace"
                onClick={() => handleTabChange('doc-workspace')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'doc-workspace' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <FileStack className="w-3.5 h-3.5 text-amber-400" />
                <span>Document Package</span>
                {currentRecord.opportunity.documents && currentRecord.opportunity.documents.length > 0 && (
                  <span className="bg-slate-800 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-500/30">
                    {currentRecord.opportunity.documents.length}
                  </span>
                )}
              </button>

              <button
                id="tab-pricing-review"
                onClick={() => handleTabChange('pricing-review')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'pricing-review' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pricing Workbook</span>
                {currentRecord.opportunity.pricingWorkbookReview?.missingFieldsCount ? (
                  <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                    {currentRecord.opportunity.pricingWorkbookReview.missingFieldsCount} Blank
                  </span>
                ) : null}
              </button>

              <button
                id="tab-compliance"
                onClick={() => handleTabChange('compliance')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'compliance' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                Compliance Matrix
              </button>

              <button
                id="tab-decision"
                onClick={() => handleTabChange('decision')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'decision' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-slate-400" />
                Bid Decision
              </button>

              <button
                id="tab-editor"
                onClick={() => handleTabChange('editor')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'editor' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Proposal Draft
              </button>

              <button
                id="tab-readiness"
                onClick={() => handleTabChange('readiness')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'readiness' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Proposal Audit
              </button>

              <button
                id="tab-export"
                onClick={() => handleTabChange('export')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'export' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                Export
              </button>
            </>
          )}

          <div className="h-4 w-px bg-slate-800 my-auto mx-1 ml-auto" />

          <button
            id="tab-history"
            onClick={() => handleTabChange('history')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'history' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            History
          </button>

          <button
            id="tab-about-tech"
            onClick={() => handleTabChange('about-tech')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'about-tech' ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/40' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            About Tech
          </button>
        </div>
      </div>
    </header>
  );
};
