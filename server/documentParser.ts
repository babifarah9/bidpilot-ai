import * as XLSX from 'xlsx';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

export type ParsedDocumentContent = {
  text: string;
  pageCount?: number;
  sheetCount?: number;
  sheetsData?: Array<{
    sheetName: string;
    rows: Array<Array<string | number>>;
    headers: string[];
  }>;
  isScanned?: boolean;
};

/**
 * Parses uploaded document buffer based on file extension
 */
export async function parseDocumentBuffer(
  buffer: Buffer,
  filename: string
): Promise<ParsedDocumentContent> {
  const ext = filename.split('.').pop()?.toLowerCase() || '';

  if (ext === 'xlsx' || ext === 'xls' || ext === 'csv') {
    return parseSpreadsheetBuffer(buffer, ext, filename);
  }

  if (ext === 'pdf') {
    return parsePdfBuffer(buffer);
  }

  if (ext === 'docx') {
    return parseWordBuffer(buffer);
  }

  // Fallback as plain text
  const textContent = buffer.toString('utf-8');
  return {
    text: textContent,
    pageCount: 1
  };
}

/**
 * Parses Excel or CSV workbook with XLSX
 */
function parseSpreadsheetBuffer(buffer: Buffer, ext: string, filename: string): ParsedDocumentContent {
  try {
    // Fast read without calculating formulas or HTML
    const workbook = XLSX.read(buffer, { type: 'buffer', cellFormula: false, cellHTML: false, dense: true });
    const sheetCount = workbook.SheetNames.length;
    const sheetsData: Array<{
      sheetName: string;
      rows: Array<Array<string | number>>;
      headers: string[];
    }> = [];

    let combinedText = `Spreadsheet Document (${ext.toUpperCase()})\nSheet Count: ${sheetCount}\n\n`;

    // Limit max sheets and max rows per sheet for speed
    const maxSheets = Math.min(sheetCount, 10);
    for (let i = 0; i < maxSheets; i++) {
      const sheetName = workbook.SheetNames[i];
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) continue;

      const jsonData = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, { header: 1 });
      const headers: string[] = (jsonData[0] || []).map((h) => String(h || ''));
      const rows = jsonData.slice(1, 101); // Cap at top 100 rows per sheet for instant response

      sheetsData.push({
        sheetName,
        headers,
        rows: rows as Array<Array<string | number>>
      });

      combinedText += `--- Sheet: ${sheetName} ---\nHeaders: ${headers.join(' | ')}\n`;
      rows.forEach((row, idx) => {
        combinedText += `Row ${idx + 2}: ${row.join(' | ')}\n`;
      });
      combinedText += '\n';
    }

    return {
      text: combinedText.slice(0, 50000), // Cap max text size
      sheetCount,
      sheetsData
    };
  } catch (error) {
    console.error('Spreadsheet parse error:', error);
    return {
      text: `[Spreadsheet File ${filename}]: ${error instanceof Error ? error.message : String(error)}`,
      sheetCount: 1
    };
  }
}

/**
 * Parses PDF buffer using pdf-parse with strict timeout safeguard
 */
async function parsePdfBuffer(buffer: Buffer): Promise<ParsedDocumentContent> {
  let parser: PDFParse | null = null;

  const estPages = Math.max(1, Math.round(buffer.length / 35000));

  try {
    const parsePromise = (async (): Promise<ParsedDocumentContent> => {
      parser = new PDFParse({ data: buffer });
      const textResult = await parser.getText();
      const text = (textResult.text || '').slice(0, 100000);
      const pageCount = textResult.total || estPages;
      const isScanned = text.trim().length < 50 && pageCount > 0;

      return {
        text,
        pageCount,
        isScanned
      };
    })();

    // 2-second hard timeout for PDF extraction
    const timeoutPromise = new Promise<ParsedDocumentContent>((resolve) => {
      setTimeout(() => {
        resolve({
          text: `[PDF Document Stream - ${buffer.length} bytes extracted]`,
          pageCount: estPages,
          isScanned: false
        });
      }, 2000);
    });

    return await Promise.race([parsePromise, timeoutPromise]);
  } catch (error) {
    console.error('PDF parse error:', error);
    return {
      text: `[PDF File]: ${error instanceof Error ? error.message : String(error)}`,
      pageCount: estPages,
      isScanned: false
    };
  } finally {
    if (parser) {
      try {
        await (parser as any).destroy();
      } catch (err) {
        // ignore cleanup error
      }
    }
  }
}

/**
 * Parses Word (.docx) buffer using mammoth with timeout safeguard
 */
async function parseWordBuffer(buffer: Buffer): Promise<ParsedDocumentContent> {
  try {
    const estPages = Math.max(1, Math.round(buffer.length / 25000));

    const parsePromise = (async (): Promise<ParsedDocumentContent> => {
      const result = await mammoth.extractRawText({ buffer });
      const text = (result.value || '').slice(0, 100000);
      const wordCount = text.split(/\s+/).length;
      const pageCount = Math.max(1, Math.ceil(wordCount / 450));

      return {
        text,
        pageCount
      };
    })();

    const timeoutPromise = new Promise<ParsedDocumentContent>((resolve) => {
      setTimeout(() => {
        resolve({
          text: `[Word Document Stream - ${buffer.length} bytes]`,
          pageCount: estPages
        });
      }, 2000);
    });

    return await Promise.race([parsePromise, timeoutPromise]);
  } catch (error) {
    console.error('Word parse error:', error);
    return {
      text: `[Word Document]: ${error instanceof Error ? error.message : String(error)}`,
      pageCount: 1
    };
  }
}
