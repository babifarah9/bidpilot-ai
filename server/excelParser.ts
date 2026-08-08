import * as XLSX from 'xlsx';
import { PricingRequiredField, PricingWorkbookLineItem, PricingWorkbookReview } from '../src/types';

export interface ParsedSheetData {
  name: string;
  isHidden: boolean;
  rowCount: number;
  colCount: number;
  headers: string[];
  rows: {
    rowNumber: number;
    cells: {
      col: string;
      cellAddress: string;
      value: string;
      formula?: string;
      isHeader?: boolean;
    }[];
  }[];
  isScannedOrImage?: boolean;
}

export interface ParsedWorkbookResult {
  filename: string;
  sheetNames: string[];
  sheetsCount: number;
  sheets: ParsedSheetData[];
  hasFormulas: boolean;
  totalPopulatedCells: number;
  isScannedOrImage: boolean;
  formattedTextForGemini: string;
  preliminaryPricingReview: PricingWorkbookReview;
}

export function parseSpreadsheetWorkbook(fileBuffer: Buffer, filename: string): ParsedWorkbookResult {
  try {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer', cellFormula: true, cellNF: true });
    const sheetNames = workbook.SheetNames || [];
    
    let totalCells = 0;
    let hasFormulas = false;
    let totalHiddenSheets = 0;
    const parsedSheets: ParsedSheetData[] = [];
    const textLines: string[] = [];

    textLines.push(`SPREADSHEET WORKBOOK: ${filename}`);
    textLines.push(`Total Sheets: ${sheetNames.length} (${sheetNames.join(', ')})`);

    const requiredFields: PricingRequiredField[] = [];
    const lineItems: PricingWorkbookLineItem[] = [];
    const formulaIssues: { sheetName: string; cellAddress: string; formula: string; issue: string }[] = [];

    sheetNames.forEach((sheetName, sIdx) => {
      const sheet = workbook.Sheets[sheetName];
      // Check hidden sheet status if workbook.Workbook?.Sheets exists
      const sheetMeta = workbook.Workbook?.Sheets?.[sIdx];
      const isHidden = !!(sheetMeta && (sheetMeta.Hidden === 1 || sheetMeta.Hidden === 2));
      if (isHidden) totalHiddenSheets++;

      if (!sheet || !sheet['!ref']) {
        parsedSheets.push({
          name: sheetName,
          isHidden,
          rowCount: 0,
          colCount: 0,
          headers: [],
          rows: [],
          isScannedOrImage: false
        });
        textLines.push(`\n[Sheet: ${sheetName}] ${isHidden ? '(HIDDEN) ' : ''}- Empty sheet.`);
        return;
      }

      const range = XLSX.utils.decode_range(sheet['!ref']);
      const rowCount = range.e.r - range.s.r + 1;
      const colCount = range.e.c - range.s.c + 1;

      // Extract raw sheet matrix
      const matrix: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' });
      
      const sheetHeaders: string[] = [];
      const rows: ParsedSheetData['rows'] = [];
      let sheetCellCount = 0;

      // Find likely header row (first non-empty row)
      let headerRowIdx = 0;
      for (let r = 0; r < Math.min(10, matrix.length); r++) {
        const nonBlankCols = (matrix[r] || []).filter(c => String(c).trim() !== '').length;
        if (nonBlankCols >= 2) {
          headerRowIdx = r;
          sheetHeaders.push(...(matrix[r] || []).map((c: any) => String(c).trim()));
          break;
        }
      }

      textLines.push(`\n--- SHEET: "${sheetName}" ${isHidden ? '(FLAGGED AS HIDDEN SHEET)' : ''} ---`);

      matrix.forEach((rowArray, rIdx) => {
        // Skip completely empty rows
        if (!rowArray || rowArray.every(c => String(c).trim() === '')) return;

        const rowNumber = rIdx + 1;
        const cellObjects: ParsedSheetData['rows'][0]['cells'] = [];
        const rowTextParts: string[] = [];

        rowArray.forEach((cellVal, cIdx) => {
          const valStr = String(cellVal || '').trim();
          if (!valStr) return;

          sheetCellCount++;
          totalCells++;

          const colLetter = XLSX.utils.encode_col(cIdx);
          const cellAddress = `${colLetter}${rowNumber}`;
          
          // Access direct cell object for formula or raw value
          const cellObj = sheet[cellAddress];
          let formula: string | undefined = undefined;

          if (cellObj && cellObj.f) {
            formula = `=${cellObj.f}`;
            hasFormulas = true;

            // Simple sanity check for formula errors like #VALUE!, #REF!, #N/A
            if (valStr.startsWith('#')) {
              formulaIssues.push({
                sheetName,
                cellAddress,
                formula: `=${cellObj.f}`,
                issue: `Evaluated formula error: ${valStr}`
              });
            }
          }

          const isHeader = (rIdx === headerRowIdx);

          cellObjects.push({
            col: colLetter,
            cellAddress,
            value: valStr,
            formula,
            isHeader
          });

          rowTextParts.push(`${colLetter} (${sheetHeaders[cIdx] || `Col ${colLetter}`}): "${valStr}"${formula ? ` [Formula: ${formula}]` : ''}`);

          // Detect line items or pricing entries
          const lowerVal = valStr.toLowerCase();
          const colHeaderLower = (sheetHeaders[cIdx] || '').toLowerCase();

          // Check if this cell requires bidder input (e.g., blank rate/price, or contains [INPUT REQUIRED] / TBD)
          if (
            (colHeaderLower.includes('rate') || colHeaderLower.includes('price') || colHeaderLower.includes('bidder') || colHeaderLower.includes('proposed') || colHeaderLower.includes('cost')) &&
            (valStr === '' || lowerVal.includes('tbd') || lowerVal.includes('input') || lowerVal.includes('required') || lowerVal === '0' || lowerVal === '$0.00')
          ) {
            requiredFields.push({
              id: `req-${sheetName}-${cellAddress}`,
              sheetName,
              cellAddress,
              label: sheetHeaders[cIdx] || `Row ${rowNumber} Entry`,
              currentValue: valStr,
              status: 'Missing/Blank',
              isBidderEntered: true,
              isGovernmentPrefilled: false,
              notes: `Bidder input required for row ${rowNumber}`,
              sourceReference: `${filename} — ${sheetName} — Cell ${cellAddress}`
            });
          }
        });

        if (cellObjects.length > 0) {
          rows.push({
            rowNumber,
            cells: cellObjects
          });
          textLines.push(`Row ${rowNumber} [${filename} — ${sheetName} — Row ${rowNumber}]: ${rowTextParts.join(' | ')}`);
        }
      });

      const isScanned = (sheetCellCount === 0 && rowCount > 0);

      parsedSheets.push({
        name: sheetName,
        isHidden,
        rowCount,
        colCount,
        headers: sheetHeaders,
        rows,
        isScannedOrImage: isScanned
      });
    });

    const isWorkbookScanned = parsedSheets.every(s => s.isScannedOrImage) || totalCells === 0;

    // Preliminary Pricing Review assembly
    const preliminaryPricingReview: PricingWorkbookReview = {
      hasPricingWorkbook: requiredFields.length > 0 || lineItems.length > 0 || sheetNames.some(s => s.toLowerCase().includes('price') || s.toLowerCase().includes('cost') || s.toLowerCase().includes('boq')),
      workbookName: filename,
      totalSheets: sheetNames.length,
      currency: 'USD ($)',
      requiredFields,
      completedFieldsCount: Math.max(0, 10 - requiredFields.length),
      missingFieldsCount: requiredFields.length,
      formulaIssues,
      lineItems,
      reconciliationWarning: formulaIssues.length > 0 ? `${formulaIssues.length} spreadsheet formula error(s) detected.` : null,
      scannedWorkbookWarning: isWorkbookScanned ? 'Some workbook content may not be machine-readable.' : null
    };

    return {
      filename,
      sheetNames,
      sheetsCount: sheetNames.length,
      sheets: parsedSheets,
      hasFormulas,
      totalPopulatedCells: totalCells,
      isScannedOrImage: isWorkbookScanned,
      formattedTextForGemini: textLines.join('\n'),
      preliminaryPricingReview
    };
  } catch (err: any) {
    console.error(`Failed to parse spreadsheet ${filename}:`, err);
    return {
      filename,
      sheetNames: [],
      sheetsCount: 0,
      sheets: [],
      hasFormulas: false,
      totalPopulatedCells: 0,
      isScannedOrImage: true,
      formattedTextForGemini: `[SPREADSHEET FILE: ${filename}] (Unable to parse binary workbook structure. Error: ${err.message})`,
      preliminaryPricingReview: {
        hasPricingWorkbook: false,
        requiredFields: [],
        completedFieldsCount: 0,
        missingFieldsCount: 0,
        formulaIssues: [],
        lineItems: [],
        scannedWorkbookWarning: 'File could not be parsed as a standard machine-readable spreadsheet.'
      }
    };
  }
}
