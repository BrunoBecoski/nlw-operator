import { tv } from "tailwind-variants";
import { ScoreRing } from "@/components/ui/score-ring";

const leaderboardRoot = tv({
  base: "flex flex-col border border-border-primary rounded-md overflow-hidden",
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
  rank: number;
  code: string;
  score: number;
}

export interface LeaderboardTableProps {
  items: LeaderboardItem[];
  maxScore?: number;
  totalCount?: number;
  showDenominator?: boolean;
}

export function LeaderboardTable({
  items,
  maxScore = 10,
  totalCount,
  showDenominator = false,
}: LeaderboardTableProps) {
  return (
    <LeaderboardRoot>
      <LeaderboardHeader>
        <LeaderboardCell className="w-12 text-xs text-text-tertiary">
          rank
        </LeaderboardCell>
        <LeaderboardCell className="flex-1 text-xs text-text-tertiary">
          code preview
        </LeaderboardCell>
        <LeaderboardCell className="text-xs text-text-tertiary">
          score
        </LeaderboardCell>
      </LeaderboardHeader>
      {items.map((item) => (
        <LeaderboardRow key={item.rank}>
          <LeaderboardCell className="w-12 text-sm text-text-secondary">
            #{item.rank}
          </LeaderboardCell>
          <LeaderboardCell className="flex-1 text-sm text-text-secondary truncate pr-4">
            {item.code}
          </LeaderboardCell>
          <ScoreRing
            score={item.score}
            maxScore={maxScore}
            showDenominator={showDenominator}
          />
        </LeaderboardRow>
      ))}
      {totalCount && (
        <LeaderboardFooter>
          showing top {items.length} of {totalCount} · view full leaderboard
          &gt;&gt;
        </LeaderboardFooter>
      )}
    </LeaderboardRoot>
  );
}
