import { Suspense } from "react";
import { LeaderboardFetcher } from "./leaderboard-fetcher";
import { LeaderboardSkeleton } from "./leaderboard-skeleton";

export default function ShameLeaderboard() {
  return (
    <Suspense fallback={<LeaderboardSkeleton />}>
      <LeaderboardFetcher />
    </Suspense>
  );
}
