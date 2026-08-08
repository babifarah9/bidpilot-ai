import React from 'react';
import { ComplianceRequirement } from '../../types';
import { Map, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

type Props = {
  requirements: ComplianceRequirement[];
};

export const RequirementCoverageView: React.FC<Props> = ({ requirements }) => {
  const total = requirements.length;
  const met = requirements.filter((r) => r.status === 'MET').length;
  const partial = requirements.filter((r) => r.status === 'PARTIALLY MET').length;
  const notMet = requirements.filter((r) => r.status === 'NOT MET').length;

  const coveragePercent = Math.round(((met + partial * 0.5) / total) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <Map className="w-4 h-4" />
            <span>Traceability Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Requirements Traceability Matrix</h1>
          <p className="text-sm text-slate-600 mt-1">
            End-to-end mapping confirming every solicitation requirement is addressed in a specific proposal section.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-sm">
            {coveragePercent}% Overall Coverage
          </span>
        </div>
      </div>

      {/* Coverage Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Traceability Progress</span>
          <span>{met} Met / {partial} Partial / {notMet} Unmet</span>
        </div>

        <div className="bg-slate-100 h-3 rounded-full overflow-hidden flex">
          <div className="bg-emerald-500 h-full" style={{ width: `${(met / total) * 100}%` }}></div>
          <div className="bg-amber-400 h-full" style={{ width: `${(partial / total) * 100}%` }}></div>
          <div className="bg-rose-500 h-full" style={{ width: `${(notMet / total) * 100}%` }}></div>
        </div>
      </div>

      {/* Traceability Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4">Req ID</th>
                <th className="p-4 w-2/5">Solicitation Requirement</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 font-bold text-teal-800">Target Proposal Section</th>
                <th className="p-4">Source Document & Page</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {requirements.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-mono font-bold text-slate-900">{req.requirementId}</td>
                  <td className="p-4 font-semibold text-slate-900">{req.requirement}</td>
                  <td className="p-4 font-medium text-slate-600">{req.category}</td>

                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                      req.status === 'MET' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>

                  <td className="p-4 font-bold text-teal-700">{req.proposalSection}</td>
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
