import React from 'react';
import { 
  Briefcase, 
  FileText, 
  Upload, 
  LayoutDashboard, 
  Files, 
  Table, 
  DollarSign, 
  GitCompare, 
  CheckSquare, 
  TrendingUp, 
  PenTool, 
  Map, 
  ShieldCheck, 
  Download, 
  History, 
  Cpu, 
  Building2,
  PlusCircle,
  Play
} from 'lucide-react';
import { Opportunity } from '../types';

export type ActiveTab =
  | 'landing'
  | 'company'
  | 'upload'
  | 'progress'
  | 'dashboard'
  | 'documents'
  | 'spreadsheet'
  | 'pricing'
  | 'amendments'
  | 'compliance'
  | 'bid'
  | 'proposal'
  | 'coverage'
  | 'readiness'
  | 'export'
  | 'history';

type Props = {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeOpportunity: Opportunity | null;
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onLoadDemo: () => void;
  onOpenAboutTech: () => void;
  onNewOpportunity: () => void;
};

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  activeOpportunity,
  opportunities,
  onSelectOpportunity,
  onLoadDemo,
  onOpenAboutTech,
  onNewOpportunity,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-teal-500/20">
              BP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">BidPilot AI</span>
                <span className="text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Government & Enterprise Opportunity Qualification & Draft Proposal Engine
              </p>
            </div>
          </div>

          {/* Center / Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Active Opportunity Switcher */}
            {opportunities.length > 0 && (
              <div className="hidden md:flex items-center gap-2 bg-slate-800 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200">
                <span className="text-slate-400 font-medium">Opportunity:</span>
                <select
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer max-w-[200px] truncate"
                  value={activeOpportunity?.id || ''}
                  onChange={(e) => {
                    const opp = opportunities.find((o) => o.id === e.target.value);
                    if (opp) onSelectOpportunity(opp);
                  }}
                >
                  {opportunities.map((opp) => (
                    <option key={opp.id} value={opp.id} className="bg-slate-900 text-white">
                      {opp.title} {opp.isDemo ? '(DEMO)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Try Demo CTA Button */}
            <button
              onClick={onLoadDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs rounded-lg transition shadow-sm"
              title="Load full pre-configured fictional demo opportunity"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Try Demo</span>
            </button>

            {/* New Opportunity Button */}
            <button
              onClick={onNewOpportunity}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs rounded-lg transition"
            >
              <PlusCircle className="w-3.5 h-3.5 text-teal-400" />
              <span>New Bid</span>
            </button>

            {/* Company Profile Button */}
            <button
              onClick={() => setActiveTab('company')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'company'
                  ? 'bg-slate-800 text-teal-300 border border-teal-500/40'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Company Profile</span>
            </button>

            {/* About Technology Modal Trigger */}
            <button
              onClick={onOpenAboutTech}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
              title="About the Technology / Gemini Hackathon"
            >
              <Cpu className="w-4 h-4 text-teal-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      {activeOpportunity && (
        <div className="bg-slate-950 border-t border-slate-800 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 text-xs font-medium py-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'dashboard'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'documents'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Files className="w-3.5 h-3.5" />
              <span>Documents ({activeOpportunity.documents.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('spreadsheet')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'spreadsheet'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Spreadsheets</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'pricing'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Pricing Review</span>
            </button>

            <button
              onClick={() => setActiveTab('amendments')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition relative ${
                activeTab === 'amendments'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Amendments & Conflicts</span>
              {activeOpportunity.analysis?.amendments.length ? (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              ) : null}
            </button>

            <button
              onClick={() => setActiveTab('compliance')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'compliance'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Compliance Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('bid')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'bid'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Bid Decision</span>
            </button>

            <button
              onClick={() => setActiveTab('proposal')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'proposal'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold text-teal-200">Proposal Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('coverage')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'coverage'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Traceability</span>
            </button>

            <button
              onClick={() => setActiveTab('readiness')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'readiness'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Readiness Review</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'export'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition ${
                activeTab === 'history'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
