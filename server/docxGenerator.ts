import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { ProposalDraft, OpportunityAnalysis, CompanyProfile, ComplianceItem } from '../src/types';

export async function generateDocxBuffer(
  proposal: ProposalDraft,
  opportunity?: OpportunityAnalysis,
  companyProfile?: CompanyProfile,
  complianceMatrix?: ComplianceItem[]
): Promise<Buffer> {
  const children: any[] = [];

  // Title / Cover Block
  children.push(
    new Paragraph({
      text: proposal.title || 'PROPOSAL DRAFT',
      heading: HeadingLevel.TITLE,
      spacing: { before: 200, after: 120 }
    })
  );

  if (opportunity) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Solicitation Title: ', bold: true }),
          new TextRun(opportunity.opportunityTitle),
        ],
        spacing: { after: 80 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Issuing Organization: ', bold: true }),
          new TextRun(opportunity.issuingOrganization),
        ],
        spacing: { after: 80 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Solicitation Reference #: ', bold: true }),
          new TextRun(opportunity.solicitationNumber),
        ],
        spacing: { after: 160 }
      })
    );
  }

  if (companyProfile) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Prepared By: ', bold: true }),
          new TextRun(`${companyProfile.companyName} (${companyProfile.headquarters})`),
        ],
        spacing: { after: 80 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Contact: ', bold: true }),
          new TextRun(`${companyProfile.contactName} | ${companyProfile.contactEmail} | ${companyProfile.contactPhone}`),
        ],
        spacing: { after: 240 }
      })
    );
  }

  // Executive Summary
  if (proposal.executiveSummaryText) {
    children.push(
      new Paragraph({
        text: 'Executive Summary',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 }
      }),
      new Paragraph({
        text: proposal.executiveSummaryText,
        spacing: { after: 200 }
      })
    );
  }

  // Sections
  for (const sec of proposal.sections) {
    children.push(
      new Paragraph({
        text: `${sec.sectionNumber} ${sec.title}`,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 100 }
      })
    );

    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `Source RFP Section: ${sec.relevantRfpSection} | Source Page: ${sec.relevantSourcePage}`, italics: true, size: 18, color: '666666' })
        ],
        spacing: { after: 120 }
      })
    );

    // Split section content by paragraphs
    const paragraphs = sec.content.split('\n\n');
    for (const p of paragraphs) {
      if (p.trim().startsWith('#')) {
        // Heading
        const headingText = p.replace(/^#+\s*/, '').trim();
        children.push(
          new Paragraph({
            text: headingText,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 180, after: 80 }
          })
        );
      } else {
        children.push(
          new Paragraph({
            text: p.trim(),
            spacing: { after: 120 }
          })
        );
      }
    }
  }

  // Pricing Disclaimer & Table
  if (proposal.pricingSupport) {
    children.push(
      new Paragraph({
        text: 'Pricing Support & Labor Matrix',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 280, after: 120 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'DISCLAIMER: Pricing requires user validation before submission.', bold: true, color: 'C00000' })
        ],
        spacing: { after: 140 }
      })
    );

    if (proposal.pricingSupport.laborCategories?.length > 0) {
      const rows = [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Labor Category', bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Estimated Rate', bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Estimated Hours', bold: true })] })] }),
          ]
        }),
        ...proposal.pricingSupport.laborCategories.map(lc =>
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(lc.category)] }),
              new TableCell({ children: [new Paragraph(lc.rateEstimate)] }),
              new TableCell({ children: [new Paragraph(String(lc.estimatedHours))] }),
            ]
          })
        )
      ];

      children.push(
        new Table({
          rows,
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
            left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
            right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
          }
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children
      }
    ]
  });

  return await Packer.toBuffer(doc);
}
