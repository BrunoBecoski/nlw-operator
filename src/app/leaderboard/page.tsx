import { StatsBarClient } from "@/components/stats-bar-client";
import {
  type LeaderboardItem,
  LeaderboardTable,
} from "@/components/ui/leaderboard-table";
import { caller } from "@/trpc/server";

export const revalidate = 3600;

export const metadata = {
  title: "Shame Leaderboard | DevRoast",
  description: "The most roasted code on the internet",
};

export default async function LeaderboardPage() {
  const trpc = await caller();
  const [leaderboardData, stats] = await Promise.all([
    trpc.leaderboard.getLeaderboard({ limit: 20 }),
    trpc.roast.getStats(),
  ]);

  const items: LeaderboardItem[] = leaderboardData.map((entry, index) => ({
    rank: index + 1,
    code: entry.code,
    score: Number(entry.score),
    lang: entry.language,
  }));

  const totalCount =
    typeof stats.totalRoasts === "number" ? stats.totalRoasts : 0;
  const avgScore = typeof stats.avgScore === "number" ? stats.avgScore : 0;

  return (
    <div className="max-w-5xl mx-auto px-20 py-10 flex flex-col gap-10">
      {/* Hero Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-3xl font-bold text-accent-green">
            &gt;
          </span>
          <h1 className="font-mono text-3xl font-bold text-text-primary">
            shame_leaderboard
          </h1>
        </div>
        <p className="font-mono text-sm text-text-secondary">
          {"// the most roasted code on the internet"}
        </p>
        <StatsBarClient
          codesRoasted={totalCount}
          avgScore={avgScore}
          loadedCodesRoasted={totalCount}
          loadedAvgScore={avgScore}
        />
      </section>

      {/* Leaderboard Table */}
      <section className="flex flex-col gap-5">
        <LeaderboardTable
          items={items}
          maxScore={10}
          totalCount={totalCount}
          showDenominator={false}
        />
      </section>
    </div>
  );
}
