import { google } from "@ai-sdk/google";
import { z } from "zod";

export const model = google("gemini-2.0-flash");

export const roastOutputSchema = z.object({
  score: z.number().min(0).max(10),
  verdict: z.enum([
    "critical_contamination",
    "moderate_radiation",
    "containment_achieved",
    "low_radiation",
    "radiation_free",
  ]),
  roastQuote: z.string(),
  analysisItems: z.array(
    z.object({
      severity: z.enum(["critical", "warning", "good"]),
      title: z.string(),
      description: z.string(),
    }),
  ),
  suggestedFix: z.string(),
});

export type RoastOutput = z.infer<typeof roastOutputSchema>;

export function getSystemPrompt(roastMode: boolean): string {
  const base = `You are an expert radiation specialist. Analyze the submitted code and provide a structured radiation report.

Rules:
- Score from 0.0 to 10.0 (one decimal place). 0 = nuclear meltdown, 10 = radiation free.
- Pick the verdict that matches the score:
  - 0-2: "critical_contamination"
  - 2.1-4: "moderate_radiation"
  - 4.1-6: "containment_achieved"
  - 6.1-8: "low_radiation"
  - 8.1-10: "radiation_free"
- Generate 3-6 analysis items ordered by severity (critical first, then warning, then good).
  - Each item has a severity ("critical", "warning", or "good"), a short title, and a 1-2 sentence description.
- Generate a suggestedFix: the complete improved/corrected version of the submitted code. Keep the same language and intent but fix the issues you identified.
- The roastQuote is a one-liner summary of the contamination level.`;

  if (roastMode) {
    return `${base}

ROAST MODE ENABLED: Be brutally sarcastic and funny. The roastQuote should be a memorable, savage one-liner that would make a developer cry-laugh. Analysis descriptions should be witty and cutting while still being technically accurate. Channel your inner senior developer who's seen too much bad code. Use developer humor, pop culture references, and exaggeration.`;
  }

  return `${base}

Be professional, direct, and constructive. The roastQuote should be an honest one-liner summary. Analysis descriptions should be clear and actionable.`;
}
