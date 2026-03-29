import { google } from "@ai-sdk/google";
import { TRPCError } from "@trpc/server";
import { generateText, Output } from "ai";
import { asc, avg, count, eq } from "drizzle-orm";
import { z } from "zod";
import { analysisItems, roasts } from "@/db/schema";
import { getSystemPrompt, roastOutputSchema } from "@/lib/ai";
import { baseProcedure, createTRPCRouter } from "../init";

const model = google("gemini-3.1-flash-lite-preview");

export const roastRouter = createTRPCRouter({
  getStats: baseProcedure.query(async ({ ctx }) => {
    const [stats] = await ctx.db
      .select({
        totalRoasts: count(),
        avgScore: avg(roasts.score),
      })
      .from(roasts);

    return {
      totalRoasts: stats?.totalRoasts ?? 0,
      avgScore: stats?.avgScore ? Number.parseFloat(stats.avgScore) : 0,
    };
  }),

  create: baseProcedure
    .input(
      z.object({
        code: z.string().min(1).max(2000),
        language: z.string(),
        roastMode: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let output: (typeof roastOutputSchema)["_output"] | undefined;
      try {
        const result = await generateText({
          model,
          maxRetries: 0,
          output: Output.object({
            schema: roastOutputSchema,
          }),
          system: getSystemPrompt(input.roastMode),
          prompt: `Language: ${input.language}\n\nCode:\n${input.code}`,
        });
        output = result.output;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        if (
          message.includes("quota") ||
          message.includes("rate limit") ||
          message.includes("TooManyRequests")
        ) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "API quota exceeded. Please try again later.",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "AI failed to generate a response",
        });
      }

      if (!output) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "AI failed to generate a valid response",
        });
      }

      const lineCount = input.code.split("\n").length;

      const [roast] = await ctx.db
        .insert(roasts)
        .values({
          code: input.code,
          language: input.language,
          lineCount,
          roastMode: input.roastMode,
          score: output.score,
          verdict: output.verdict,
          roastQuote: output.roastQuote,
          suggestedFix: output.suggestedFix,
        })
        .returning({ id: roasts.id });

      if (output.analysisItems.length > 0) {
        await ctx.db.insert(analysisItems).values(
          output.analysisItems.map(
            (
              item: {
                severity: "critical" | "warning" | "good";
                title: string;
                description: string;
              },
              index: number,
            ) => ({
              roastId: roast.id,
              severity: item.severity,
              title: item.title,
              description: item.description,
              order: index,
            }),
          ),
        );
      }

      return { id: roast.id };
    }),

  getById: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [roast] = await ctx.db
        .select()
        .from(roasts)
        .where(eq(roasts.id, input.id));

      if (!roast) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Roast not found",
        });
      }

      const items = await ctx.db
        .select()
        .from(analysisItems)
        .where(eq(analysisItems.roastId, roast.id))
        .orderBy(asc(analysisItems.order));

      return {
        ...roast,
        analysisItems: items,
      };
    }),
});
