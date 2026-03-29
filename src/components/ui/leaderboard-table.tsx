"use client";

import { tv } from "tailwind-variants";
import { CodeShell } from "@/components/ui/code-shell";
import type { TitleBarColor } from "@/components/ui/title-bar";
import {
  TitleBarControls,
  TitleBarHeader,
  TitleBarLanguage,
  TitleBarPosition,
  TitleBarRoot,
  TitleBarScore,
} from "@/components/ui/title-bar";

const getScoreColor = (score: number): TitleBarColor => {
  if (score < 3.3) return "red";
  if (score < 6.6) return "orange";
  return "green";
};

const leaderboardRoot = tv({
  base: "flex flex-col rounded-sm overflow-hidden",
});

export interface LeaderboardRootProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function LeaderboardRoot({
  className,
  children,
  ...props
}: LeaderboardRootProps) {
  return (
    <div className={leaderboardRoot({ className })} {...props}>
      {children}
    </div>
  );
}

const leaderboardHeader = tv({
  base: "flex items-center h-10 px-5 border-b border-border-primary bg-bg-surface",
});

export interface LeaderboardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function LeaderboardHeader({
  className,
  children,
  ...props
}: LeaderboardHeaderProps) {
  return (
    <div className={leaderboardHeader({ className })} {...props}>
      {children}
    </div>
  );
}

const leaderboardRow = tv({
  base: "flex items-center px-5 py-4 border-b border-border-primary last:border-0",
});

export interface LeaderboardRowProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function LeaderboardRow({
  className,
  children,
  ...props
}: LeaderboardRowProps) {
  return (
    <div className={leaderboardRow({ className })} {...props}>
      {children}
    </div>
  );
}

const leaderboardCell = tv({
  base: "",
});

export interface LeaderboardCellProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function LeaderboardCell({
  className,
  children,
  ...props
}: LeaderboardCellProps) {
  return (
    <span className={leaderboardCell({ className })} {...props}>
      {children}
    </span>
  );
}

const leaderboardFooter = tv({
  base: "font-mono text-xs text-text-tertiary text-center py-2",
});

export interface LeaderboardFooterProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function LeaderboardFooter({
  className,
  children,
  ...props
}: LeaderboardFooterProps) {
  return (
    <p className={leaderboardFooter({ className })} {...props}>
      {children}
    </p>
  );
}

export interface LeaderboardItem {
  id: string;
  rank: number;
  code: string;
  score: number;
  lang?: string;
}

const leaderboardEntryRow = tv({
  base: "flex flex-col rounded-sm overflow-hidden",
});

export interface LeaderboardEntryRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "a";
  href?: string;
}

export function LeaderboardEntryRow({
  className,
  children,
  as = "div",
  href,
  ...props
}: LeaderboardEntryRowProps) {
  const rowClasses = leaderboardEntryRow({ className });
  const baseStyle = { borderColor: "var(--color-border-primary)" };

  if (as === "a" && href) {
    return (
      <a href={href} className={rowClasses} style={baseStyle}>
        {children}
      </a>
    );
  }

  return (
    <div className={rowClasses} style={baseStyle} {...props}>
      {children}
    </div>
  );
}

export interface LeaderboardMetaRowProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const leaderboardMetaRow = tv({
  base: "flex items-center justify-between h-10 px-4",
});

export function LeaderboardMetaRow({
  className,
  children,
  ...props
}: LeaderboardMetaRowProps) {
  return (
    <div
      className={leaderboardMetaRow({ className })}
      style={{ backgroundColor: "var(--color-bg-surface)" }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface LeaderboardCodeCellProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const leaderboardCodeCell = tv({
  base: "",
});

export function LeaderboardCodeCell({
  className,
  children,
  ...props
}: LeaderboardCodeCellProps) {
  return (
    <div className={leaderboardCodeCell({ className })} {...props}>
      {children}
    </div>
  );
}

export interface LeaderboardTableProps {
  items: LeaderboardItem[];
  maxScore?: number;
  totalCount?: number;
}

export function LeaderboardTable({
  items,
  maxScore = 10,
  totalCount,
}: LeaderboardTableProps) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => {
        const color = getScoreColor(item.score);
        return (
          <LeaderboardEntryRow
            key={item.rank}
            as="a"
            href={`/roast/${item.id}`}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <TitleBarRoot color={color}>
              <TitleBarHeader
                color={color}
                className="justify-between relative"
              >
                <div className="flex items-center gap-2">
                  <TitleBarPosition color={color}>
                    #{item.rank}
                  </TitleBarPosition>
                  <TitleBarScore score={item.score} maxScore={maxScore} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2">
                  <TitleBarLanguage>
                    {item.lang || "javascript"}
                  </TitleBarLanguage>
                </div>
                <TitleBarControls />
              </TitleBarHeader>
              <CodeShell
                value={item.code}
                language={item.lang || "javascript"}
              />
            </TitleBarRoot>
          </LeaderboardEntryRow>
        );
      })}
      {totalCount && (
        <LeaderboardFooter>
          mostrando top {items.length} de {totalCount}
        </LeaderboardFooter>
      )}
    </div>
  );
}
