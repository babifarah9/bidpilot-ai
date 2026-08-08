import React, { useState } from 'react';
import { OpportunityDocument, DocumentType } from '../../types';
import { Files, FileText, FileSpreadsheet, Eye, Trash2, RefreshCw, Layers, CheckCircle2, AlertTriangle, X } from 'lucide-react';

type Props = {
  documents: OpportunityDocument[];
  setDocuments: React.Dispatch<React.SetStateAction<OpportunityDocument[]>>;
};

const DOCUMENT_TYPES: DocumentType[] = [
  'Main Solicitation',
  'RFP',
  'RFQ',
  'Grant Notice',
  'Tender',
  'Amendment',
  'Addendum',
  'Questions and Answers',
  'Statement of Work',
  'Statement of Objectives',
  'Performance Work Statement',
  'Technical Appendix',
  'Pricing Document',
  'Pricing Schedule',
  'Cost Workbook',
  'Bill of Quantities',
  'Compliance Matrix',
  'Staffing Plan',
  'Deliverables Schedule',
  'Evaluation Worksheet',
  'Financial Template',
  'Required Form',
  'Contract Terms',
  'Security Requirements',
  'Evaluation Criteria',
  'Submission Instructions',
  'Certifications',
  'Other'
];

export const DocumentsView: React.FC<Props> = ({ documents, setDocuments }) => {
  const [selectedDoc, setSelectedDoc] = useState<OpportunityDocument | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleReclassify = (id: string, newClass: DocumentType) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, classification: newClass } : d))
    );
  };

  const handleRemove = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <Files className="w-4 h-4" />
            <span>Document Repository</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Uploaded Opportunity Package</h1>
          <p className="text-sm text-slate-600 mt-1">
            Every document preserves page numbers, cell references, and version history.
          </p>
        </div>
        <span className="text-xs bg-slate-100 font-semibold text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          Total Files: {documents.length}
        </span>
      </div>

      {/* Document Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4">Filename & Format</th>
                <th className="p-4">Classification</th>
                <th className="p-4">Pages / Sheets</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Version</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg shrink-0 ${
                        doc.fileType === 'pdf' ? 'bg-rose-50 text-rose-600' :
                        doc.fileType === 'docx' ? 'bg-blue-50 text-blue-600' :
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {doc.fileType === 'xlsx' || doc.fileType === 'xls' || doc.fileType === 'csv' ? (
                          <FileSpreadsheet className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{doc.filename}</div>
                        <div className="text-[11px] text-slate-400">{formatFileSize(doc.fileSize)} • Uploaded {doc.uploadDate}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <select
                      className="bg-slate-100 text-slate-800 text-xs font-medium px-2 py-1 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                      value={doc.classification}
                      onChange={(e) => handleReclassify(doc.id, e.target.value as DocumentType)}
                    >
                      {DOCUMENT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-4 font-medium text-slate-700">
                    {doc.pageCount ? `${doc.pageCount} Pages` : doc.sheetCount ? `${doc.sheetCount} Sheets` : '1 Document'}
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      doc.priority === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {doc.priority}
                    </span>
                  </td>

                  <td className="p-4 text-slate-600 font-mono">
                    {doc.version} {doc.amendmentNumber ? `(${doc.amendmentNumber})` : ''}
                  </td>

                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                      doc.processingStatus === 'COMPLETED' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {doc.processingStatus}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded transition flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={() => handleRemove(doc.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Document Content Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[85vh] flex flex-col p-6 relative">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">{selectedDoc.filename}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Type: {selectedDoc.classification} • Size: {formatFileSize(selectedDoc.fileSize)}
            </p>

            <div className="flex-1 overflow-y-auto bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap">
              {selectedDoc.textContent || 'No text content available or binary format.'}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
