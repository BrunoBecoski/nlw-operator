"use client";

import { useQueries } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import {
  CodeBlockContent,
  CodeBlockDots,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockRoot,
} from "@/components/ui/code-block";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LeaderboardCodeCell,
  LeaderboardEntryRow,
  LeaderboardFooter,
  type LeaderboardItem,
  LeaderboardMetaRow,
} from "@/components/ui/leaderboard-table";
import { ScoreRing } from "@/components/ui/score-ring";
import { useTRPC } from "@/trpc/client";

const MAX_PREVIEW_LINES = 3;

function CodePreview({ code, lang }: { code: string; lang: string }) {
  const lines = code.split("\n");
  const isLongCode = lines.length > MAX_PREVIEW_LINES;
  const [isOpen, setIsOpen] = useState(false);

  if (!isLongCode) {
    return (
      <CodeBlockRoot>
        <CodeBlockHeader>
          <CodeBlockDots />
          <CodeBlockFilename lang={lang} />
        </CodeBlockHeader>
        <CodeBlockContent code={code} lang={lang} />
      </CodeBlockRoot>
    );
  }

  const previewCode = lines.slice(0, MAX_PREVIEW_LINES).join("\n");

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CodeBlockRoot>
        <CodeBlockHeader>
          <CodeBlockDots />
          <CodeBlockFilename lang={lang} />
        </CodeBlockHeader>
        <div className="relative">
          <CodeBlockContent code={isOpen ? code : previewCode} lang={lang} />
          {!isOpen && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-bg-input to-transparent pointer-events-none" />
          )}
        </div>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="w-full h-8 flex items-center justify-center text-xs font-mono text-text-tertiary hover:text-text-secondary border-t border-border-primary transition-colors"
          >
            {isOpen
              ? "Show less"
              : `Show ${lines.length - MAX_PREVIEW_LINES} more lines`}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CodeBlockContent code={code} lang={lang} />
        </CollapsibleContent>
      </CodeBlockRoot>
    </Collapsible>
  );
}

export function LeaderboardFetcher() {
  const trpc = useTRPC();

  const results = useQueries({
    queries: [
      trpc.leaderboard.getShameLeaderboard.queryOptions({ limit: 3 }),
      trpc.leaderboard.getTotalCount.queryOptions(),
    ],
  });

  const [leaderboardResult, totalCountResult] = results;

  const isLoading = leaderboardResult.isLoading || totalCountResult.isLoading;

  if (isLoading) {
    return <LeaderboardFetcherSkeleton />;
  }

  const leaderboardData = leaderboardResult.data ?? [];
  const totalCount = totalCountResult.data ?? 0;

  const items: LeaderboardItem[] = leaderboardData.map((entry, index) => ({
    rank: index + 1,
    code: entry.code,
    score: Number(entry.score),
    lang: entry.language,
  }));

  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => (
        <LeaderboardEntryRow key={item.rank}>
          <LeaderboardMetaRow>
            <Link
              href={`/roast/${item.rank}`}
              className="font-mono text-sm text-text-secondary hover:text-accent-green transition-colors"
            >
              #{item.rank}
            </Link>
            <ScoreRing
              score={item.score}
              maxScore={10}
              showDenominator={false}
            />
          </LeaderboardMetaRow>
          <LeaderboardCodeCell>
            <Link href={`/roast/${item.rank}`} className="block">
              <CodePreview code={item.code} lang={item.lang || "javascript"} />
            </Link>
          </LeaderboardCodeCell>
        </LeaderboardEntryRow>
      ))}
      <LeaderboardFooter>
        showing top {items.length} of {totalCount} · view full leaderboard
        &gt;&gt;
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
          className="flex flex-col border border-border-primary rounded-md overflow-hidden"
        >
          <div className="flex items-center justify-between h-12 px-5 border-b border-border-primary bg-bg-surface">
            <div className="h-4 w-8 animate-pulse rounded bg-bg-input" />
            <div className="h-10 w-10 animate-pulse rounded-full bg-bg-input" />
          </div>
          <div className="p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-bg-input mb-2" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-bg-input" />
          </div>
        </div>
      ))}
      <div className="h-4 w-48 mx-auto animate-pulse rounded bg-bg-input" />
    </div>
  );
}
