import React, { useState } from 'react';
import { OpportunityAnalysis, PricingCell } from '../../types';
import { DollarSign, AlertCircle, CheckCircle2, Edit3, Save, Info, Calculator } from 'lucide-react';

type Props = {
  analysis: OpportunityAnalysis;
  onUpdatePricingField: (fieldId: string, newValue: number) => void;
};

export const PricingReviewView: React.FC<Props> = ({ analysis, onUpdatePricingField }) => {
  const fields = analysis.pricingFields || [];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const missingCount = fields.filter((f) => f.isMissingInput).length;
  const completedCount = fields.length - missingCount;

  const handleSaveField = (id: string) => {
    const num = parseFloat(inputValue);
    if (!isNaN(num) && num > 0) {
      onUpdatePricingField(id, num);
      setEditingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <DollarSign className="w-4 h-4" />
            <span>Commercial Qualification</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Pricing Workbook Review</h1>
          <p className="text-sm text-slate-600 mt-1">
            Inspect pricing formulas, required rates, and fill in missing bidder input fields before proposal submission.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-lg">
            {missingCount} Missing Input{missingCount === 1 ? '' : 's'}
          </span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-lg">
            {completedCount} Completed
          </span>
        </div>
      </div>

      {/* Mandatory Notice */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-900 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>Mandatory Rule:</strong> Pricing requires user validation before submission. AI models are strictly prohibited from inventing dollar values or hourly rates.
          </span>
        </div>
      </div>

      {/* Pricing Fields Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-900 text-sm">
          Labor Category & Extended Cost Items
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4">Labor Category / Item</th>
                <th className="p-4">Sheet & Cell Ref</th>
                <th className="p-4">Row & Col</th>
                <th className="p-4">Rate / Cost Value ($)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {fields.map((field) => (
                <tr key={field.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-bold text-slate-900">{field.label}</td>
                  <td className="p-4 font-mono text-slate-600">
                    {field.sheetName} — <span className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-800">{field.cellRef}</span>
                  </td>
                  <td className="p-4 text-slate-500">Row {field.rowNumber}, {field.columnName}</td>

                  <td className="p-4 font-mono font-bold text-sm">
                    {editingId === field.id ? (
                      <input
                        type="number"
                        className="w-32 px-2 py-1 bg-white border border-teal-500 rounded text-xs focus:outline-none"
                        placeholder="e.g. 155.00"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    ) : field.isMissingInput ? (
                      <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-sans text-xs font-bold">
                        [USER INPUT REQUIRED]
                      </span>
                    ) : (
                      <span className="text-emerald-700">${typeof field.value === 'number' ? field.value.toFixed(2) : field.value} / hr</span>
                    )}
                  </td>

                  <td className="p-4">
                    {field.isMissingInput ? (
                      <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                        <AlertCircle className="w-3.5 h-3.5" /> Missing Rate
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Validated
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    {editingId === field.id ? (
                      <button
                        onClick={() => handleSaveField(field.id)}
                        className="px-3 py-1 bg-teal-500 text-slate-950 font-bold rounded text-xs hover:bg-teal-400 transition"
                      >
                        Save Rate
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(field.id);
                          setInputValue(typeof field.value === 'number' ? String(field.value) : '155.00');
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded text-xs transition flex items-center gap-1 ml-auto"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{field.isMissingInput ? 'Input Rate' : 'Edit Rate'}</span>
                      </button>
                    )}
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
