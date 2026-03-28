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
    <div className="flex items-center justify-center justify-evenly py-4">
      <div className="flex flex-col items-center gap-1">
        <div className="h-10 w-20 animate-pulse rounded bg-bg-surface" />
        <div className="h-4 w-32 animate-pulse rounded bg-bg-surface" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="h-10 w-20 animate-pulse rounded bg-bg-surface" />
        <div className="h-4 w-20 animate-pulse rounded bg-bg-surface" />
      </div>
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
    <div className="flex items-center justify-center justify-evenly py-4">
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-3xl font-bold text-hazmat-primary">
          <NumberFlow
            value={displayCodesRoasted}
            format={{ maximumFractionDigits: 0 }}
          />
        </span>
        <span className="font-mono text-xl font-bold text-text-primary">
          códigos roastados
        </span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-xl font-bold text-text-primary">
          nota média
        </span>
        <span className="font-mono text-3xl font-bold text-hazmat-primary">
          <NumberFlow
            value={displayAvgScore}
            format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
          />
          /10
        </span>
      </div>
    </div>
  );
}
