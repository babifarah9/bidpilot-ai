import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { parseDocumentBuffer } from "./server/documentParser";
import { analyzeOpportunityPackage, generateFullProposalDraft, runProposalReadinessReview } from "./server/geminiService";

const CALLE_BASE_URL = process.env.CALLE_BASE_URL || "https://api.heycall-e.com";

const supplierVerificationSchema = {
  type: "object",
  required: [
    "availability",
    "lead_time",
    "geographic_coverage",
    "certification_status",
    "indicative_pricing",
    "follow_up_required"
  ],
  properties: {
    availability: {
      type: "string",
      description: "Whether the requested product/service appears available; use unknown if the recipient cannot confirm."
    },
    lead_time: {
      type: "string",
      description: "Recipient-stated lead time or unknown."
    },
    geographic_coverage: {
      type: "string",
      description: "Recipient-stated coverage relevant to the procurement opportunity or unknown."
    },
    certification_status: {
      type: "string",
      description: "Relevant certification/qualification status stated by the recipient or unknown."
    },
    indicative_pricing: {
      type: "string",
      description: "Any non-binding indicative pricing voluntarily provided, otherwise not_provided."
    },
    follow_up_required: {
      type: "boolean",
      description: "True when a human procurement follow-up is needed."
    },
    notes: {
      type: "string",
      description: "Short factual notes from the call."
    }
  }
};

function requireCalleKey() {
  const apiKey = process.env.CALLE_API_KEY;
  if (!apiKey) {
    throw new Error("CALL-E is not configured. Add CALLE_API_KEY to the server environment.");
  }
  return apiKey;
}

async function calleFetch(endpoint: string, init?: RequestInit) {
  const apiKey = requireCalleKey();
  const response = await fetch(`${CALLE_BASE_URL}${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  });

  const text = await response.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const detail = data?.detail || data?.message || data?.error || `CALL-E API returned ${response.status}`;
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }

  return data;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // --- API ROUTES FIRST ---

  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "BidPilot AI Server",
      timestamp: new Date().toISOString(),
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      calleConfigured: Boolean(process.env.CALLE_API_KEY)
    });
  });

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

      return res.json({ success: true, analysis: analysisResult });
    } catch (error) {
      console.error("Error analyzing opportunity:", error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Opportunity analysis failed"
      });
    }
  });

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

      return res.json({ success: true, proposal: proposalDraft, proposalDraft });
    } catch (error) {
      console.error("Error generating proposal draft:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to generate proposal draft"
      });
    }
  });

  app.post("/api/readiness-review", async (req, res) => {
    try {
      const { analysis, proposal, companyProfile } = req.body;
      if (!analysis || !proposal || !companyProfile) {
        return res.status(400).json({ error: "Missing required parameters for readiness review" });
      }

      const review = await runProposalReadinessReview(analysis, proposal, companyProfile);
      return res.json({ success: true, readinessReview: review });
    } catch (error) {
      console.error("Error running readiness review:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to run readiness review"
      });
    }
  });

  // CALL-E hackathon: authorized supplier/provider fact verification.
  app.post("/api/calle/verification", async (req, res) => {
    try {
      const {
        opportunityId,
        solicitationNumber,
        supplierName,
        phone,
        region,
        questions,
        authorized
      } = req.body;

      if (authorized !== true) {
        return res.status(400).json({ error: "Explicit call authorization is required." });
      }
      if (!supplierName || !questions || !/^\+[1-9]\d{7,14}$/.test(String(phone || ""))) {
        return res.status(400).json({
          error: "Supplier name, verification questions, and a valid E.164 phone number are required."
        });
      }

      const task = [
        `Call ${supplierName} at ${phone} for procurement fact verification.`,
        "At the beginning, identify yourself as an AI calling on behalf of BidPilot for procurement verification.",
        "Do not place orders, negotiate binding terms, make commitments, or request sensitive personal information.",
        "Ask only for factual business information relevant to the verification request below.",
        `Procurement reference: ${solicitationNumber || "not provided"}.`,
        "Verification request:",
        String(questions),
        "If the recipient does not know, record the answer as unknown rather than inferring it."
      ].join("\n");

      const call = await calleFetch("/v1/calls", {
        method: "POST",
        headers: {
          "Idempotency-Key": `bidpilot_${String(opportunityId || "opp")}_${Date.now()}`
        },
        body: JSON.stringify({
          task,
          recipients: [
            {
              phones: [phone],
              region: region || "US",
              locale: "en-US"
            }
          ],
          result_schema: {
            type: "object",
            required: ["completed_count"],
            properties: {
              completed_count: { type: "integer" }
            }
          },
          recipient_result_schema: supplierVerificationSchema,
          metadata: {
            source: "bidpilot-voice",
            opportunity_id: String(opportunityId || ""),
            solicitation_number: String(solicitationNumber || "")
          }
        })
      });

      return res.status(202).json({
        success: true,
        callId: call.id || call.call_id,
        call
      });
    } catch (error) {
      console.error("CALL-E verification error:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "CALL-E verification failed"
      });
    }
  });

  app.get("/api/calle/verification/:callId", async (req, res) => {
    try {
      const callId = encodeURIComponent(req.params.callId);
      const call = await calleFetch(`/v1/calls/${callId}`);
      return res.json({ success: true, call });
    } catch (error) {
      console.error("CALL-E result error:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Unable to retrieve CALL-E result"
      });
    }
  });

  // --- VITE MIDDLEWARE / STATIC SERVING ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
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
