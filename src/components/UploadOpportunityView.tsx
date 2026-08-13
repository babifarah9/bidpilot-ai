import React, { useState } from 'react';
import { CompanyProfile, OpportunityDocument, DocumentType } from '../types';
import { Upload, FileText, Sparkles, AlertTriangle, Building2, ShieldCheck, Plus, Trash2, FileCode, CheckCircle2, FileStack, Layers, AlertCircle, Info } from 'lucide-react';

interface UploadOpportunityViewProps {
  companyProfile: CompanyProfile;
  onStartAnalysis: (documentText: string, files?: File[], documentsMetadata?: OpportunityDocument[]) => void;
  onLoadDemo: () => void;
  isAnalyzing: boolean;
}

const DOCUMENT_TYPES: DocumentType[] = [
  'Main Solicitation',
  'Statement of Work',
  'Statement of Objectives',
  'Performance Work Statement',
  'Amendment',
  'Addendum',
  'Q&A Response',
  'Pricing Schedule',
  'Bid Form',
  'Technical Appendix',
  'Security Requirements',
  'Contract Clause',
  'Evaluation Criteria',
  'Submission Instructions',
  'Other'
];

export const UploadOpportunityView: React.FC<UploadOpportunityViewProps> = ({
  companyProfile,
  onStartAnalysis,
  onLoadDemo,
  isAnalyzing
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<{ file: File; meta: OpportunityDocument }[]>([]);
  const [pastedText, setPastedText] = useState('');

  const autoClassifyFilename = (filename: string): DocumentType => {
    const lower = filename.toLowerCase();
    if (lower.includes('amend') || lower.includes('addendum') || lower.includes('sf30') || lower.includes('mod')) return 'Amendment';
    if (lower.includes('sow') || lower.includes('statement_of_work') || lower.includes('pws') || lower.includes('soo')) return 'Statement of Work';
    if (lower.includes('price') || lower.includes('pricing') || lower.includes('clin') || lower.includes('fee')) return 'Pricing Schedule';
    if (lower.includes('q&a') || lower.includes('qa') || lower.includes('question')) return 'Q&A Response';
    if (lower.includes('security') || lower.includes('cyber') || lower.includes('fedramp')) return 'Security Requirements';
    if (lower.includes('appendix') || lower.includes('tech') || lower.includes('attach')) return 'Technical Appendix';
    return 'Main Solicitation';
  };

  const addFiles = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const newItems = fileArray.map((file, idx) => {
      const type = autoClassifyFilename(file.name);
      const isAmend = type === 'Amendment';
      const meta: OpportunityDocument = {
        id: `uploaded-${Date.now()}-${idx}`,
        filename: file.name,
        fileType: (file.name.split('.').pop()?.toLowerCase() || 'pdf') as any,
        classification: type,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        processingStatus: 'COMPLETED',
        priority: isAmend ? 'HIGH' : 'MEDIUM',
        version: isAmend ? '1.1' : '1.0',
        amendmentNumber: isAmend ? '01' : undefined
      };
      return { file, meta };
    });
    setFileList(prev => [...prev, ...newItems]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setFileList(prev => prev.filter((_, i) => i !== index));
  };

  const updateMeta = (index: number, updates: Partial<OpportunityDocument>) => {
    setFileList(prev => prev.map((item, i) => i === index ? { ...item, meta: { ...item.meta, ...updates } } : item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileList.length === 0 && !pastedText.trim()) return;
    
    const files = fileList.map(item => item.file);
    const metadata = fileList.map(item => item.meta);

    onStartAnalysis(pastedText, files, metadata);
  };

  const totalPackageSize = fileList.reduce((acc, curr) => acc + curr.file.size, 0);
  const amendmentsCount = fileList.filter(item => item.meta.type === 'Amendment').length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-slate-800">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-3">
          <FileStack className="w-3.5 h-3.5 text-teal-600" />
          <span>Step 2: Multi-Document Procurement Workspace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Upload Opportunity Document Package
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
          Upload all PDF documents for a single solicitation — including the Main RFP, Statement of Work, Amendments, Pricing Schedules, and Q&A attachments. BidPilot AI synthesizes them into one unified opportunity.
        </p>
      </div>

      {/* Active Profile Status Header */}
      <div className="bg-slate-900 text-white p-4 rounded-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400 font-bold border border-slate-700">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Active Company Profile:</span>
              <span className="text-sm font-bold text-white">{companyProfile.companyName || 'Unnamed Company'}</span>
            </div>
            <p className="text-xs text-slate-400">
              {companyProfile.industry || 'General Industry'} • {companyProfile.certifications?.length || 0} Certifications • {companyProfile.pastPerformance?.length || 0} Past Performance Records
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-teal-300 bg-teal-950 px-3 py-1 rounded-md border border-teal-800 flex items-center gap-1.5 whitespace-nowrap">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>Profile Ready for Grounding</span>
        </span>
      </div>

      {/* Quick Demo Package Loader */}
      <div className="mb-8 bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 text-white p-5 rounded-xl border border-teal-500/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-800/60 rounded-lg text-teal-300 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Load Pre-Configured Multi-Document Package</h3>
              <span className="text-[10px] font-bold uppercase bg-teal-800 text-teal-200 px-2 py-0.5 rounded">5 Files</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              USDOT NextGen Cloud Package: <span className="text-teal-300 font-mono">Main_RFP.pdf</span>, <span className="text-teal-300 font-mono">Statement_of_Work.pdf</span>, <span className="text-teal-300 font-mono">Amendment_01.pdf</span>, <span className="text-teal-300 font-mono">Pricing_Schedule.pdf</span>, & <span className="text-emerald-300 font-mono font-bold">Pricing_Schedule.xlsx</span>.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLoadDemo}
          className="px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs whitespace-nowrap shadow-sm transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Run Demo Multi-Doc Package</span>
        </button>
      </div>

      {/* Main Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          {/* File Drag & Drop Multi-File Zone */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Upload Opportunity Document Files (PDF, Word, Excel, CSV, Text)
              </label>
              <span className="text-xs text-slate-500 font-medium">
                Multiple files supported • Auto-classified
              </span>
            </div>

            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                dragActive ? 'border-teal-500 bg-teal-50/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
              }`}
            >
              <FileStack className="w-10 h-10 text-teal-600 mx-auto mb-3" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">
                  Drag and drop all solicitation PDF, Word, Excel, or CSV files here, or{' '}
                  <label className="text-teal-700 font-bold hover:underline cursor-pointer">
                    browse files
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.csv"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-xs text-slate-500">
                  Upload RFP, SOW, Amendments, Pricing Schedules (.xlsx, .csv), and Q&A documents together (Up to 25MB per file)
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Package Document Repository List */}
          {fileList.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-600" />
                  <span>Procurement Package Files ({fileList.length} Files Selected)</span>
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  Total Size: {(totalPackageSize / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50">
                {fileList.map((item, idx) => (
                  <div key={item.meta.id || idx} className="p-3.5 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:bg-slate-50/80 transition-all">
                    <div className="flex items-center gap-3 min-w-[240px]">
                      <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-teal-700">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-900 truncate" title={item.file.name}>
                          {item.file.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {(item.file.size / 1024).toFixed(0)} KB • {item.file.type || 'PDF Document'}
                        </p>
                      </div>
                    </div>

                    {/* Classification and Amendment Metadata Selectors */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Document Role</label>
                        <select
                          value={item.meta.classification}
                          onChange={e => updateMeta(idx, { classification: e.target.value as DocumentType })}
                          className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                          {DOCUMENT_TYPES.map(dt => (
                            <option key={dt} value={dt}>{dt}</option>
                          ))}
                        </select>
                      </div>

                      {item.meta.classification === 'Amendment' && (
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Amd #</label>
                          <input
                            type="text"
                            value={item.meta.amendmentNumber || '01'}
                            onChange={e => updateMeta(idx, { amendmentNumber: e.target.value })}
                            placeholder="01"
                            className="w-16 text-xs font-semibold bg-amber-50 border border-amber-300 rounded px-2 py-1 text-amber-900 focus:outline-none"
                          />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all ml-auto md:ml-0"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Package Summary & Pre-Flight Analysis Warning */}
              <div className="bg-teal-50/80 border border-teal-200 p-3.5 rounded-lg flex items-start gap-3">
                <Info className="w-4 h-4 text-teal-700 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-teal-900">
                  <span className="font-bold">Multi-Document Analysis Package Ready: </span>
                  {amendmentsCount > 0 ? (
                    <span>Contains {amendmentsCount} amendment document(s). BidPilot AI will automatically reconcile conflicting deadlines and updated scope items.</span>
                  ) : (
                    <span>All {fileList.length} documents will be analyzed as a single unified procurement opportunity.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase">OR PASTE TEXT</span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Text Paste Option */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Option B: Paste Additional Solicitation Text or Q&A Notes
            </label>
            <textarea
              rows={4}
              value={pastedText}
              onChange={e => setPastedText(e.target.value)}
              placeholder="Paste solicitation text, SOW clauses, amendment summaries, or agency Q&A responses..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-teal-500 focus:outline-none bg-slate-50/50"
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              setFileList([]);
              setPastedText('');
            }}
            disabled={fileList.length === 0 && !pastedText.trim()}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-50"
          >
            Clear Workspace
          </button>

          <button
            type="submit"
            disabled={isAnalyzing || (fileList.length === 0 && !pastedText.trim())}
            className={`px-8 py-3.5 rounded-lg font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
              isAnalyzing || (fileList.length === 0 && !pastedText.trim())
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-950/20'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing Document Package with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-teal-200" />
                <span>
                  {fileList.length > 1
                    ? `Analyze Opportunity Package (${fileList.length} Documents)`
                    : 'Analyze Procurement Opportunity'}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
