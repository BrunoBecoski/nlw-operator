"use client";

import { useQuery } from "@tanstack/react-query";
import { LeaderboardTable } from "@/components/ui/leaderboard-table";
import { useTRPC } from "@/trpc/client";

export function LeaderboardTableWithData() {
  const trpc = useTRPC();

  const { data: leaderboardData } = useQuery(
    trpc.leaderboard.getLeaderboard.queryOptions({ limit: 20 }),
  );

  const { data: stats } = useQuery(trpc.roast.getStats.queryOptions());

  if (!leaderboardData || !stats) {
    return <div>Loading...</div>;
  }

  const items = leaderboardData.map((entry, index) => ({
    id: entry.id,
    rank: index + 1,
    code: entry.code,
    score: Number(entry.score),
    lang: entry.language,
  }));

  const totalCount =
    typeof stats.totalRoasts === "number" ? stats.totalRoasts : 0;

  return (
    <LeaderboardTable items={items} maxScore={10} totalCount={totalCount} />
  );
}
