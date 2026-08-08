import React, { useState } from 'react';
import { OpportunityDocument } from '../../types';
import { Table, FileSpreadsheet, Search, Filter, Info } from 'lucide-react';

type Props = {
  documents: OpportunityDocument[];
};

export const SpreadsheetViewer: React.FC<Props> = ({ documents }) => {
  const spreadsheetDocs = documents.filter(
    (d) => d.fileType === 'xlsx' || d.fileType === 'xls' || d.fileType === 'csv'
  );

  const [selectedDocId, setSelectedDocId] = useState<string>(spreadsheetDocs[0]?.id || '');
  const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inspectedCell, setInspectedCell] = useState<{ ref: string; val: any; header: string } | null>(null);

  const currentDoc = spreadsheetDocs.find((d) => d.id === selectedDocId) || spreadsheetDocs[0];
  const sheets = currentDoc?.sheetsData || [];
  const currentSheet = sheets[activeSheetIndex] || sheets[0];

  if (spreadsheetDocs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center bg-white rounded-2xl border border-slate-200 shadow-sm my-8">
        <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">No Spreadsheets Uploaded</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Upload an Excel workbook (.xlsx, .xls) or CSV pricing schedule in the Opportunity Workspace to preview tables and inspect cell references.
        </p>
      </div>
    );
  }

  const filteredRows = currentSheet?.rows.filter((row) =>
    row.some((cell) => String(cell).toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <Table className="w-4 h-4" />
            <span>Interactive Spreadsheet Preview</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Spreadsheet Viewer & Inspector</h1>
          <p className="text-sm text-slate-600 mt-1">
            Inspect headers, formulas, cell coordinates, and blank input fields across uploaded workbooks.
          </p>
        </div>

        {/* Workbook Dropdown */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 px-2">Workbook:</span>
          <select
            className="bg-slate-50 font-semibold text-slate-900 text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none cursor-pointer"
            value={selectedDocId}
            onChange={(e) => {
              setSelectedDocId(e.target.value);
              setActiveSheetIndex(0);
            }}
          >
            {spreadsheetDocs.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.filename}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sheet Tabs & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Sheet Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 w-full sm:w-auto pb-2 sm:pb-0">
            {sheets.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSheetIndex(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeSheetIndex === idx
                    ? 'bg-teal-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s.sheetName}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search sheet cells..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Inspected Cell Banner */}
        {inspectedCell && (
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold bg-teal-200 text-teal-950 px-2 py-0.5 rounded">
                Cell {inspectedCell.ref}
              </span>
              <span>
                <strong>Header:</strong> {inspectedCell.header || 'N/A'} | <strong>Value:</strong>{' '}
                {String(inspectedCell.val)}
              </span>
            </div>
            <button
              onClick={() => setInspectedCell(null)}
              className="text-teal-700 hover:text-teal-950 font-bold"
            >
              Clear
            </button>
          </div>
        )}

        {/* Table View */}
        {currentSheet ? (
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="p-3 bg-slate-200/80 text-center w-12 text-slate-500 font-mono">#</th>
                  {currentSheet.headers.map((h, hIdx) => (
                    <th key={hIdx} className="p-3 border-r border-slate-200 last:border-0 font-mono text-slate-800">
                      {String.fromCharCode(65 + hIdx)}: {h || `Col ${hIdx + 1}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-slate-800">
                {filteredRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition">
                    <td className="p-3 bg-slate-100 text-center text-slate-500 font-semibold border-r border-slate-200 select-none">
                      {rIdx + 2}
                    </td>
                    {row.map((cell, cIdx) => {
                      const cellRef = `${String.fromCharCode(65 + cIdx)}${rIdx + 2}`;
                      const isUserInput = String(cell).includes('[USER INPUT REQUIRED]') || String(cell).trim() === '';

                      return (
                        <td
                          key={cIdx}
                          onClick={() =>
                            setInspectedCell({
                              ref: cellRef,
                              val: cell,
                              header: currentSheet.headers[cIdx] || ''
                            })
                          }
                          className={`p-3 border-r border-slate-200 last:border-0 cursor-pointer transition ${
                            isUserInput
                              ? 'bg-amber-100 text-amber-900 font-bold'
                              : 'hover:bg-teal-50/50'
                          }`}
                        >
                          {isUserInput ? '[USER INPUT REQUIRED]' : String(cell)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">No sheet content available.</div>
        )}
      </div>
    </div>
  );
};
