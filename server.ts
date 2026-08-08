import express from 'express';
import path from 'path';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import {
  analyzeOpportunityService,
  generateProposalService,
  editProposalSectionService,
  reviewProposalReadinessService
} from './server/geminiService';
import { parseSpreadsheetWorkbook } from './server/excelParser';
import { generateDocxBuffer } from './server/docxGenerator';
import { SAMPLE_ANALYSIS_RECORD } from './src/data/demoData';

const app = express();
const PORT = 3000;

// Configure body parsers & file uploads
const upload = multer({ limits: { fileSize: 25 * 1024 * 1024 } }); // 25MB max
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health Check API
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'BidPilot AI Server' });
});

// Demo Data Endpoint
app.get('/api/demo-data', (_req, res) => {
  res.json(SAMPLE_ANALYSIS_RECORD);
});

// 1. Opportunity Analysis API (Multi-Document & Single-File Support)
app.post('/api/analyze-opportunity', upload.any(), async (req, res) => {
  try {
    const { companyProfileJson, documentText, documentsMetadata } = req.body;
    let companyProfile;
    try {
      companyProfile = typeof companyProfileJson === 'string' ? JSON.parse(companyProfileJson) : companyProfileJson;
    } catch {
      return res.status(400).json({ error: 'Invalid companyProfile JSON format.' });
    }

    let parsedMeta: any[] = [];
    if (documentsMetadata) {
      try {
        parsedMeta = typeof documentsMetadata === 'string' ? JSON.parse(documentsMetadata) : documentsMetadata;
      } catch {
        parsedMeta = [];
      }
    }

    const files = (req.files as Express.Multer.File[]) || [];
    const documentInputs: any[] = [];

    if (files.length > 0) {
      files.forEach((file, idx) => {
        const meta = parsedMeta.find((m: any) => m.filename === file.originalname) || parsedMeta[idx] || {};
        const ext = path.extname(file.originalname || '').toLowerCase();
        const isExcel = ['.xlsx', '.xls', '.csv'].includes(ext) || 
                        file.mimetype.includes('spreadsheet') || 
                        file.mimetype.includes('excel') || 
                        file.mimetype.includes('csv');
        const isText = file.mimetype.includes('text') || file.mimetype.includes('json') || ext === '.txt';

        if (isExcel) {
          const parsedExcel = parseSpreadsheetWorkbook(file.buffer, file.originalname || `Spreadsheet_${idx + 1}.xlsx`);
          
          // Auto-classify spreadsheet if type not specified
          let autoType = meta.type;
          if (!autoType || autoType === 'Main Solicitation' || autoType === 'Other') {
            const lowerName = (file.originalname || '').toLowerCase();
            if (lowerName.includes('price') || lowerName.includes('cost') || lowerName.includes('rate')) {
              autoType = 'Pricing Schedule';
            } else if (lowerName.includes('matrix') || lowerName.includes('compliance')) {
              autoType = 'Compliance Matrix';
            } else if (lowerName.includes('boq') || lowerName.includes('quantity')) {
              autoType = 'Bill of Quantities';
            } else if (lowerName.includes('staff') || lowerName.includes('labor')) {
              autoType = 'Staffing Plan';
            } else {
              autoType = 'Pricing Schedule';
            }
          }

          documentInputs.push({
            id: meta.id || `doc-${idx + 1}`,
            filename: file.originalname || `Spreadsheet_${idx + 1}.xlsx`,
            type: autoType,
            fileMimeType: file.mimetype,
            fileBase64: file.buffer.toString('base64'),
            contentText: parsedExcel.formattedTextForGemini,
            size: file.size,
            isSpreadsheet: true,
            sheetsCount: parsedExcel.sheetsCount,
            sheetNames: parsedExcel.sheetNames,
            hasFormulas: parsedExcel.hasFormulas,
            isScannedOrImage: parsedExcel.isScannedOrImage,
            preliminaryPricingReview: parsedExcel.preliminaryPricingReview
          });
        } else {
          documentInputs.push({
            id: meta.id || `doc-${idx + 1}`,
            filename: file.originalname || `Document_${idx + 1}.pdf`,
            type: meta.type || 'Main Solicitation',
            fileMimeType: file.mimetype,
            fileBase64: file.buffer.toString('base64'),
            contentText: isText ? file.buffer.toString('utf-8') : undefined,
            size: file.size
          });
        }
      });
    } else if (parsedMeta.length > 0) {
      parsedMeta.forEach((m: any, idx: number) => {
        documentInputs.push({
          id: m.id || `doc-${idx + 1}`,
          filename: m.filename || `Document_${idx + 1}.pdf`,
          type: m.type || 'Main Solicitation',
          contentText: m.contentText || documentText,
          size: m.size || 1024000
        });
      });
    } else if (documentText) {
      documentInputs.push({
        id: 'doc-1',
        filename: 'Solicitation_Document.pdf',
        type: 'Main Solicitation',
        contentText: documentText,
        size: documentText.length
      });
    }

    if (documentInputs.length === 0) {
      return res.status(400).json({ error: 'No documents provided for analysis.' });
    }

    const analysisResult = await analyzeOpportunityService(
      documentInputs,
      companyProfile
    );

    res.json(analysisResult);
  } catch (error: any) {
    console.error('Error in /api/analyze-opportunity:', error);
    res.status(500).json({
      error: 'Failed to analyze opportunity document package.',
      details: error.message || String(error)
    });
  }
});

// 2. Full Proposal Generation API
app.post('/api/generate-proposal', async (req, res) => {
  try {
    const { opportunity, companyProfile, complianceMatrix, customInstructions } = req.body;
    if (!opportunity || !companyProfile) {
      return res.status(400).json({ error: 'Missing opportunity or companyProfile payload.' });
    }

    const proposalDraft = await generateProposalService(
      opportunity,
      companyProfile,
      complianceMatrix || [],
      customInstructions
    );

    res.json(proposalDraft);
  } catch (error: any) {
    console.error('Error in /api/generate-proposal:', error);
    res.status(500).json({
      error: 'Failed to generate proposal draft.',
      details: error.message || String(error)
    });
  }
});

// 3. Section Editor Action API
app.post('/api/edit-proposal-section', async (req, res) => {
  try {
    const { section, action, companyProfile, opportunity, userInstruction } = req.body;
    if (!section || !action || !companyProfile || !opportunity) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    const result = await editProposalSectionService(
      section,
      action,
      companyProfile,
      opportunity,
      userInstruction
    );

    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/edit-proposal-section:', error);
    res.status(500).json({
      error: 'Failed to update section.',
      details: error.message || String(error)
    });
  }
});

// 4. Proposal Readiness Review API
app.post('/api/review-proposal-readiness', async (req, res) => {
  try {
    const { proposal, opportunity, complianceMatrix, companyProfile } = req.body;
    if (!proposal || !opportunity || !companyProfile) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    const readinessReview = await reviewProposalReadinessService(
      proposal,
      opportunity,
      complianceMatrix || [],
      companyProfile
    );

    res.json(readinessReview);
  } catch (error: any) {
    console.error('Error in /api/review-proposal-readiness:', error);
    res.status(500).json({
      error: 'Failed to review proposal readiness.',
      details: error.message || String(error)
    });
  }
});

// 5. DOCX Export API
app.post('/api/export-docx', async (req, res) => {
  try {
    const { proposal, opportunity, companyProfile, complianceMatrix } = req.body;
    if (!proposal) {
      return res.status(400).json({ error: 'Missing proposal object.' });
    }

    const docxBuffer = await generateDocxBuffer(
      proposal,
      opportunity,
      companyProfile,
      complianceMatrix
    );

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="BidPilot_Proposal_${Date.now()}.docx"`);
    res.send(docxBuffer);
  } catch (error: any) {
    console.error('Error in /api/export-docx:', error);
    res.status(500).json({
      error: 'Failed to generate DOCX file.',
      details: error.message || String(error)
    });
  }
});

// Vite middleware or production static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BidPilot AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
