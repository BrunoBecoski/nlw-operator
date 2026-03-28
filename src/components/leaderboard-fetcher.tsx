"use client";

import { useQueries } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CodeShell } from "@/components/ui/code-shell";
import {
  LeaderboardCodeCell,
  LeaderboardEntryRow,
  LeaderboardFooter,
} from "@/components/ui/leaderboard-table";
import type { TitleBarColor } from "@/components/ui/title-bar";
import {
  TitleBarControls,
  TitleBarHeader,
  TitleBarLanguage,
  TitleBarPosition,
  TitleBarRoot,
  TitleBarScore,
} from "@/components/ui/title-bar";
import { useTRPC } from "@/trpc/client";

interface LeaderboardItem {
  id: string;
  rank: number;
  code: string;
  score: number;
  lang: string;
}

const getScoreColor = (score: number): TitleBarColor => {
  if (score < 3.3) return "red";
  if (score < 6.6) return "orange";
  return "green";
};

const MAX_PREVIEW_LINES = 3;

function CodePreview({
  code,
  lang,
  position,
  score,
  id,
}: {
  code: string;
  lang: string;
  position?: number;
  score?: number;
  id: string;
}) {
  const router = useRouter();
  const lines = code.split("\n");
  const isLongCode = lines.length > MAX_PREVIEW_LINES;
  const [isOpen, setIsOpen] = useState(false);

  const previewCode = lines.slice(0, MAX_PREVIEW_LINES).join("\n");

  if (!isLongCode) {
    const color = getScoreColor(score ?? 0);
    return (
      <button
        type="button"
        className="w-full text-left cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => router.push(`/roast/${id}`)}
      >
        <TitleBarRoot color={color}>
          <TitleBarHeader color={color} className="justify-between relative">
            <div className="flex items-center gap-2">
              <TitleBarPosition color={color}>#{position}</TitleBarPosition>
              <TitleBarScore score={score} />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <TitleBarLanguage>{lang}</TitleBarLanguage>
            </div>
            <TitleBarControls />
          </TitleBarHeader>
          <CodeShell value={code} language={lang} />
        </TitleBarRoot>
      </button>
    );
  }

  if (isOpen) {
    const color = getScoreColor(score ?? 0);
    return (
      <div>
        <button
          type="button"
          className="w-full text-left cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => router.push(`/roast/${id}`)}
        >
          <TitleBarRoot color={color}>
            <TitleBarHeader color={color} className="justify-between relative">
              <div className="flex items-center gap-2">
                <TitleBarPosition color={color}>#{position}</TitleBarPosition>
                <TitleBarScore score={score} />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2">
                <TitleBarLanguage>{lang}</TitleBarLanguage>
              </div>
              <TitleBarControls />
            </TitleBarHeader>
            <CodeShell value={code} language={lang} />
          </TitleBarRoot>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="w-full h-8 flex items-center justify-center text-xs font-mono text-text-tertiary hover:text-text-secondary hover:cursor-pointer border-t border-border-primary transition-colors"
        >
          Show less
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="w-full text-left cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => router.push(`/roast/${id}`)}
      >
        <TitleBarRoot color={getScoreColor(score ?? 0)}>
          <TitleBarHeader
            color={getScoreColor(score ?? 0)}
            className="justify-between relative"
          >
            <div className="flex items-center gap-2">
              <TitleBarPosition color={getScoreColor(score ?? 0)}>
                #{position}
              </TitleBarPosition>
              <TitleBarScore score={score} />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <TitleBarLanguage>{lang}</TitleBarLanguage>
            </div>
            <TitleBarControls />
          </TitleBarHeader>
          <CodeShell value={previewCode} language={lang} />
        </TitleBarRoot>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="w-full h-8 flex items-center justify-center text-xs font-mono text-text-tertiary hover:text-text-secondary hover:cursor-pointer border-t border-border-primary transition-colors"
      >
        Show {lines.length - MAX_PREVIEW_LINES} more lines
      </button>
    </div>
  );
}

interface LeaderboardFetcherProps {
  initialData?: Array<{
    id: string;
    code: string;
    score: number;
    language: string;
  }>;
  initialTotalCount?: number;
}

export function LeaderboardFetcher({
  initialData,
  initialTotalCount,
}: LeaderboardFetcherProps) {
  const trpc = useTRPC();

  const results = useQueries({
    queries: [
      trpc.leaderboard.getShameLeaderboard.queryOptions({ limit: 3 }),
      trpc.leaderboard.getTotalCount.queryOptions(),
    ],
  });

  const [leaderboardResult, totalCountResult] = results;

  const isLoading = leaderboardResult.isLoading || totalCountResult.isLoading;

  if (isLoading && !initialData) {
    return <LeaderboardFetcherSkeleton />;
  }

  const leaderboardData = leaderboardResult.data ?? initialData ?? [];
  const totalCount = totalCountResult.data ?? initialTotalCount ?? 0;

  const items: LeaderboardItem[] = leaderboardData.map((entry, index) => ({
    id: entry.id,
    rank: index + 1,
    code: entry.code,
    score: Number(entry.score),
    lang: entry.language,
  }));

  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => (
        <LeaderboardEntryRow key={item.rank}>
          <LeaderboardCodeCell>
            <CodePreview
              id={item.id}
              code={item.code}
              lang={item.lang || "javascript"}
              position={item.rank}
              score={item.score}
            />
          </LeaderboardCodeCell>
        </LeaderboardEntryRow>
      ))}
      <LeaderboardFooter>
        mostrando top {items.length} de {totalCount}
      </LeaderboardFooter>
    </div>
  );
}

function LeaderboardFetcherSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col rounded-sm overflow-hidden"
          style={{
            border: "2px solid",
            borderTopColor: "#555",
            borderLeftColor: "#555",
            borderRightColor: "#333",
            borderBottomColor: "#333",
          }}
        >
          <div className="flex items-center justify-between h-10 px-4 bg-bg-surface">
            <div className="h-4 w-8 animate-pulse rounded bg-bg-input" />
            <div className="h-5 w-12 animate-pulse rounded bg-bg-input" />
          </div>
          <div className="p-4 bg-bg-input">
            <div className="h-4 w-3/4 animate-pulse rounded bg-bg-surface mb-2" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-bg-surface" />
          </div>
        </div>
      ))}
      <div className="h-4 w-48 mx-auto animate-pulse rounded bg-bg-input" />
    </div>
  );
}
