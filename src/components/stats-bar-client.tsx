"use client";

import NumberFlow from "@number-flow/react";

export interface StatsBarDataProps {
  codesRoasted?: number;
  avgScore?: number;
  loadedCodesRoasted?: number;
  loadedAvgScore?: number;
}

export function StatsBarSkeleton() {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="h-4 w-32 animate-pulse rounded bg-bg-surface" />
      <span className="text-text-tertiary">·</span>
      <div className="h-4 w-20 animate-pulse rounded bg-bg-surface" />
    </div>
  );
}

export function StatsBarClient({
  codesRoasted = 0,
  avgScore = 0,
  loadedCodesRoasted,
  loadedAvgScore,
}: StatsBarDataProps) {
  const displayCodesRoasted = loadedCodesRoasted ?? codesRoasted;
  const displayAvgScore = loadedAvgScore ?? avgScore;

  return (
    <div className="flex items-center justify-center gap-6">
      <span className="font-mono text-xs text-text-tertiary">
        <NumberFlow
          value={displayCodesRoasted}
          format={{ maximumFractionDigits: 0 }}
        />
        {" codes roasted"}
      </span>
      <span className="text-text-tertiary">·</span>
      <span className="font-mono text-xs text-text-tertiary">
        avg score:{" "}
        <NumberFlow
          value={displayAvgScore}
          format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
        />
        /10
      </span>
    </div>
  );
}
