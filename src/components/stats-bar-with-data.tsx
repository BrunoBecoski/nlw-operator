"use client";

import { useQuery } from "@tanstack/react-query";
import { StatsBarClient } from "@/components/stats-bar-client";
import { useTRPC } from "@/trpc/client";

export function StatsBarWithData() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.roast.getStats.queryOptions());

  const totalRoasts = data?.totalRoasts ?? 0;
  const avgScore = typeof data?.avgScore === "number" ? data.avgScore : 0;

  return (
    <StatsBarClient
      codesRoasted={0}
      avgScore={0}
      loadedCodesRoasted={totalRoasts}
      loadedAvgScore={avgScore}
    />
  );
}
