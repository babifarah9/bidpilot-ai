import React, { useState } from 'react';
import { ComplianceRequirement, RequirementStatus } from '../../types';
import { CheckSquare, Filter, Search, CheckCircle2, AlertTriangle, XCircle, HelpCircle, FileText, Sparkles } from 'lucide-react';

type Props = {
  requirements: ComplianceRequirement[];
};

export const ComplianceMatrixView: React.FC<Props> = ({ requirements }) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterMandatoryOnly, setFilterMandatoryOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = requirements.filter((req) => {
    if (filterCategory !== 'ALL' && req.category !== filterCategory) return false;
    if (filterStatus !== 'ALL' && req.status !== filterStatus) return false;
    if (filterMandatoryOnly && !req.isMandatory) return false;
    if (
      searchTerm &&
      !req.requirement.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !req.companyEvidence.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const getStatusBadge = (status: RequirementStatus) => {
    switch (status) {
      case 'MET':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px] rounded uppercase inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> MET</span>;
      case 'PARTIALLY MET':
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] rounded uppercase inline-flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-600" /> PARTIALLY MET</span>;
      case 'NOT MET':
        return <span className="px-2.5 py-1 bg-rose-100 text-rose-900 border border-rose-300 font-bold text-[10px] rounded uppercase inline-flex items-center gap-1"><XCircle className="w-3 h-3 text-rose-600" /> NOT MET</span>;
      default:
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-300 font-bold text-[10px] rounded uppercase inline-flex items-center gap-1"><HelpCircle className="w-3 h-3 text-slate-500" /> REVIEW REQUIRED</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Compliance Audit</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Solicitation Compliance Matrix</h1>
          <p className="text-sm text-slate-600 mt-1">
            Every extracted requirement is mapped to company evidence, gap analysis, proposal section, and exact source citation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-slate-100 text-slate-800 font-bold text-xs rounded-lg border border-slate-200">
            Total Requirements: {requirements.length}
          </span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              className="bg-slate-50 font-medium text-slate-800 border border-slate-300 px-2.5 py-1.5 rounded-lg focus:outline-none"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="Eligibility">Eligibility</option>
              <option value="Technical">Technical</option>
              <option value="Management">Management</option>
              <option value="Staffing">Staffing</option>
              <option value="Past Performance">Past Performance</option>
              <option value="Security">Security</option>
              <option value="Financial">Financial</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            className="bg-slate-50 font-medium text-slate-800 border border-slate-300 px-2.5 py-1.5 rounded-lg focus:outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="MET">MET</option>
            <option value="PARTIALLY MET">PARTIALLY MET</option>
            <option value="NOT MET">NOT MET</option>
            <option value="HUMAN REVIEW REQUIRED">HUMAN REVIEW REQUIRED</option>
          </select>

          {/* Mandatory Checkbox */}
          <label className="flex items-center gap-1.5 font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filterMandatoryOnly}
              onChange={(e) => setFilterMandatoryOnly(e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span>Mandatory Only</span>
          </label>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search requirements..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Compliance Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4">Req ID</th>
                <th className="p-4 w-1/3">Solicitation Requirement</th>
                <th className="p-4">Category</th>
                <th className="p-4">Compliance Status</th>
                <th className="p-4 w-1/4">Company Evidence / Gap Analysis</th>
                <th className="p-4">Target Proposal Section</th>
                <th className="p-4">Source Citation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-mono font-bold text-slate-900">
                    {req.requirementId}
                    {req.isImported && (
                      <span className="block text-[9px] text-indigo-600 font-sans font-bold uppercase mt-0.5">
                        Imported
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <p className="font-semibold text-slate-900 leading-snug">{req.requirement}</p>
                    {req.amendmentStatus && (
                      <span className="inline-block text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded uppercase mt-1">
                        {req.amendmentStatus}
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded text-[10px]">
                      {req.category}
                    </span>
                  </td>

                  <td className="p-4">{getStatusBadge(req.status)}</td>

                  <td className="p-4">
                    <p className="text-slate-800 font-medium leading-tight">{req.companyEvidence}</p>
                    {req.gapAnalysis && (
                      <p className="text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded mt-1 border border-amber-200">
                        <strong>Gap:</strong> {req.gapAnalysis}
                      </p>
                    )}
                  </td>

                  <td className="p-4 font-medium text-teal-800">{req.proposalSection}</td>

                  <td className="p-4 font-mono text-[11px] text-slate-500">
                    {req.sourceDocument} — {req.sourcePage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
