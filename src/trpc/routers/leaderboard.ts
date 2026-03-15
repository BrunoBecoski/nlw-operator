import { asc, count } from "drizzle-orm";
import { z } from "zod";
import { roasts } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "../init";

export const leaderboardRouter = createTRPCRouter({
  getShameLeaderboard: baseProcedure
    .input(z.object({ limit: z.number().min(1).max(10).default(3) }))
    .query(async ({ ctx, input }) => {
      const entries = await ctx.db
        .select({
          id: roasts.id,
          code: roasts.code,
          score: roasts.score,
          language: roasts.language,
        })
        .from(roasts)
        .orderBy(asc(roasts.score))
        .limit(input.limit);

      return entries;
    }),

  getTotalCount: baseProcedure.query(async ({ ctx }) => {
    const [result] = await ctx.db.select({ count: count() }).from(roasts);

    return result?.count ?? 0;
  }),
});
