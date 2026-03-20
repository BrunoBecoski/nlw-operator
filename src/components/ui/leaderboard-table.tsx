import { tv } from "tailwind-variants";
import {
  CodeBlockContent,
  CodeBlockDots,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockRoot,
} from "@/components/ui/code-block";
import { RadiationDial } from "@/components/ui/radiation-dial";

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
  lang?: string;
}

const leaderboardEntryRow = tv({
  base: "flex flex-col border border-border-primary rounded-md overflow-hidden",
});

export interface LeaderboardEntryRowProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function LeaderboardEntryRow({
  className,
  children,
  ...props
}: LeaderboardEntryRowProps) {
  return (
    <div className={leaderboardEntryRow({ className })} {...props}>
      {children}
    </div>
  );
}

export interface LeaderboardMetaRowProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const leaderboardMetaRow = tv({
  base: "flex items-center justify-between h-12 px-5 border-b border-border-primary bg-bg-surface",
});

export function LeaderboardMetaRow({
  className,
  children,
  ...props
}: LeaderboardMetaRowProps) {
  return (
    <div className={leaderboardMetaRow({ className })} {...props}>
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
  showDenominator?: boolean;
}

export function LeaderboardTable({
  items,
  maxScore = 10,
  totalCount,
  showDenominator = false,
}: LeaderboardTableProps) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => (
        <LeaderboardEntryRow key={item.rank}>
          <LeaderboardMetaRow>
            <span className="font-mono text-sm text-text-secondary">
              #{item.rank}
            </span>
            <RadiationDial score={item.score} maxScore={maxScore} />
          </LeaderboardMetaRow>
          <LeaderboardCodeCell>
            <CodeBlockRoot>
              <CodeBlockHeader>
                <CodeBlockDots />
                <CodeBlockFilename lang={item.lang || "js"} />
              </CodeBlockHeader>
              <CodeBlockContent
                code={item.code}
                lang={item.lang || "javascript"}
              />
            </CodeBlockRoot>
          </LeaderboardCodeCell>
        </LeaderboardEntryRow>
      ))}
      {totalCount && (
        <LeaderboardFooter>
          showing top {items.length} of {totalCount} · view full leaderboard
          &gt;&gt;
        </LeaderboardFooter>
      )}
    </div>
  );
}
