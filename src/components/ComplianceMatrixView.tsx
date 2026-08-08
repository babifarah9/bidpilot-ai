import React, { useState } from 'react';
import { ComplianceItem, MissingDocumentItem } from '../types';
import { CheckSquare, Search, Filter, AlertTriangle, CheckCircle2, XCircle, HelpCircle, FileCheck, FileWarning } from 'lucide-react';

interface ComplianceMatrixViewProps {
  complianceMatrix: ComplianceItem[];
  missingDocuments: MissingDocumentItem[];
}

export const ComplianceMatrixView: React.FC<ComplianceMatrixViewProps> = ({
  complianceMatrix,
  missingDocuments
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'MET' | 'PARTIALLY MET' | 'NOT MET' | 'UNKNOWN'>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const filteredMatrix = complianceMatrix.filter(item => {
    const matchesSearch = item.requirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.requirementId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.evidenceFromProfile.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || item.companyStatus === statusFilter;
    const matchesType = typeFilter === 'ALL' || item.requirementType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-800 space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-teal-700" />
            <h1 className="text-2xl font-bold text-slate-900">Compliance & Requirements Matrix</h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Detailed mapping of solicitation requirements against your company profile, gap analysis, and target proposal sections.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            MET: {complianceMatrix.filter(c => c.companyStatus === 'MET').length}
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 border border-amber-200">
            PARTIAL: {complianceMatrix.filter(c => c.companyStatus === 'PARTIALLY MET').length}
          </span>
          <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 border border-rose-200">
            UNMET: {complianceMatrix.filter(c => c.companyStatus === 'NOT MET' || c.companyStatus === 'UNKNOWN').length}
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search requirement ID, keywords, evidence..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-bold text-slate-700">Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 border border-slate-300 rounded bg-white font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="MET">MET</option>
              <option value="PARTIALLY MET">PARTIALLY MET</option>
              <option value="NOT MET">NOT MET</option>
              <option value="UNKNOWN">UNKNOWN</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Compliance Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3 w-20">Req ID</th>
                <th className="py-3 px-3 w-48">Requirement Description</th>
                <th className="py-3 px-3 w-28">Type / Source</th>
                <th className="py-3 px-3 w-28 text-center">Status</th>
                <th className="py-3 px-3 w-48">Company Profile Evidence</th>
                <th className="py-3 px-3 w-44">Gap & Mitigation</th>
                <th className="py-3 px-3 w-44">Proposal Section Addressed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredMatrix.map((item, idx) => (
                <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                  <td className="py-3 px-3 font-bold text-slate-900 align-top">
                    {item.requirementId}
                    {item.isMandatory && (
                      <span className="block text-[10px] text-rose-600 font-bold uppercase mt-0.5">Mandatory</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-slate-800 font-medium align-top leading-relaxed">
                    {item.requirement}
                  </td>

                  <td className="py-3 px-3 text-slate-600 align-top space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-semibold text-[10px] text-slate-700">
                      {item.requirementType}
                    </span>
                    {item.isImportedFromSpreadsheet || (item.sourceDocument && (item.sourceDocument.endsWith('.xlsx') || item.sourceDocument.endsWith('.xls') || item.sourceDocument.endsWith('.csv'))) ? (
                      <div className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block">
                        📊 {item.sourceDocument || 'Pricing_Schedule.xlsx'} {item.sourceSheet ? `— ${item.sourceSheet}` : ''} {item.sourceCell ? `— ${item.sourceCell}` : ''}
                      </div>
                    ) : (
                      <div className="text-[10px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 inline-block">
                        📄 {item.sourceDocument || 'Main_RFP.pdf'}
                      </div>
                    )}
                    <div className="text-[10px] text-slate-500">
                      {item.sourceSection} ({item.sourcePage})
                    </div>
                    {item.amendmentStatus && item.amendmentStatus !== 'Original' && (
                      <span className="inline-block px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[9px]">
                        ⚡ {item.amendmentStatus}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 align-top text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-extrabold text-[10px] ${
                      item.companyStatus === 'MET' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      item.companyStatus === 'PARTIALLY MET' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      item.companyStatus === 'NOT MET' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}>
                      {item.companyStatus === 'MET' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {item.companyStatus === 'PARTIALLY MET' && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                      {item.companyStatus === 'NOT MET' && <XCircle className="w-3 h-3 text-rose-600" />}
                      <span>{item.companyStatus}</span>
                    </span>
                  </td>

                  <td className="py-3 px-3 text-slate-700 align-top leading-relaxed font-normal">
                    {item.evidenceFromProfile || <span className="text-slate-400 italic">No direct profile record found.</span>}
                  </td>

                  <td className="py-3 px-3 align-top text-xs space-y-1">
                    {item.gap ? (
                      <div className="text-rose-800 bg-rose-50 p-2 rounded border border-rose-100 text-[11px]">
                        <strong>Gap:</strong> {item.gap}
                        {item.recommendedAction && (
                          <div className="mt-1 text-slate-700"><strong>Action:</strong> {item.recommendedAction}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-emerald-700 font-semibold text-[11px]">✓ No gap identified</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-slate-800 font-semibold align-top text-[11px]">
                    {item.proposalSectionAddressed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Missing Documents & Attachments Checklist */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileCheck className="w-5 h-5 text-teal-700" />
          <h2 className="text-base font-bold text-slate-900">Missing & Required Documents Checklist</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(missingDocuments || []).map(doc => (
            <div key={doc.id} className={`p-4 rounded-lg border text-xs space-y-2 ${
              doc.status === 'Ready' ? 'bg-emerald-50/50 border-emerald-200' :
              doc.status === 'Missing' ? 'bg-rose-50/50 border-rose-200' :
              'bg-amber-50/50 border-amber-200'
            }`}>
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>{doc.documentType}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${
                  doc.status === 'Ready' ? 'bg-emerald-200 text-emerald-900' :
                  doc.status === 'Missing' ? 'bg-rose-200 text-rose-900' :
                  'bg-amber-200 text-amber-900'
                }`}>
                  {doc.status}
                </span>
              </div>

              <p className="text-slate-600">{doc.description}</p>
              <div className="text-[11px] text-slate-700 pt-1 border-t border-slate-200/60 font-medium">
                <strong>Action Needed:</strong> {doc.actionNeeded}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
