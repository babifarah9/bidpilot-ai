import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { parseDocumentBuffer } from "./server/documentParser";
import { analyzeOpportunityPackage, generateFullProposalDraft, runProposalReadinessReview } from "./server/geminiService";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;;

  // Body parsers with high limit for document uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // --- API ROUTES FIRST ---

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "BidPilot AI Server",
      timestamp: new Date().toISOString(),
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // Document Parse API
  app.post("/api/parse-document", async (req, res) => {
    try {
      const { filename, fileBase64 } = req.body;
      if (!filename || !fileBase64) {
        return res.status(400).json({ error: "Missing filename or fileBase64" });
      }

      const buffer = Buffer.from(fileBase64, "base64");
      const parsed = await parseDocumentBuffer(buffer, filename);

      return res.json({
        success: true,
        filename,
        pageCount: parsed.pageCount,
        sheetCount: parsed.sheetCount,
        sheetsData: parsed.sheetsData,
        textContent: parsed.text,
        isScanned: parsed.isScanned
      });
    } catch (error) {
      console.error("Error parsing document:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to parse document"
      });
    }
  });

  // Analyze Opportunity Package API
  app.post("/api/analyze-opportunity", async (req, res) => {
    try {
      const { title, solicitationNumber, documents, companyProfile } = req.body;
      if (!Array.isArray(documents) || documents.length === 0 || !companyProfile) {
  return res.status(400).json({
    success: false,
    error: "Uploaded documents and company profile are required for opportunity analysis"
  });
}

      const analysisResult = await analyzeOpportunityPackage(
  title || "Uploaded Opportunity Package",
  solicitationNumber || "Not provided",
  documents,
  companyProfile
);

      return res.json({
        success: true,
        analysis: analysisResult
      });
    } catch (error) {
      console.error("Error analyzing opportunity:", error);
      return res.status(500).json({
  success: false,
  error:
    error instanceof Error
      ? error.message
      : "Opportunity analysis failed"
});
    }
  });

  // Generate Full Proposal Draft API
  app.post("/api/generate-proposal", async (req, res) => {
    try {
      const { analysis, companyProfile, additionalNotes } = req.body;
      if (!analysis || !companyProfile) {
        return res.status(400).json({ error: "Missing analysis or companyProfile" });
      }

      const proposalDraft = await generateFullProposalDraft(
        analysis,
        companyProfile,
        additionalNotes
      );

      return res.json({
        success: true,
        proposal: proposalDraft,
        proposalDraft
      });
    } catch (error) {
      console.error("Error generating proposal draft:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to generate proposal draft"
      });
    }
  });

  // Run Proposal Readiness Review API
  app.post("/api/readiness-review", async (req, res) => {
    try {
      const { analysis, proposal, companyProfile } = req.body;
      if (!analysis || !proposal || !companyProfile) {
        return res.status(400).json({ error: "Missing required parameters for readiness review" });
      }

      const review = await runProposalReadinessReview(
        analysis,
        proposal,
        companyProfile
      );

      return res.json({
        success: true,
        readinessReview: review
      });
    } catch (error) {
      console.error("Error running readiness review:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to run readiness review"
      });
    }
  });

  // --- VITE MIDDLEWARE / STATIC SERVING ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BidPilot AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
