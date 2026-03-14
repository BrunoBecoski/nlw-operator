import { tv } from "tailwind-variants";

const statsBar = tv({
  base: "flex items-center justify-center gap-6",
});

export interface StatsBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StatsBar({ className, ...props }: StatsBarProps) {
  return <div className={statsBar({ className })} {...props} />;
}

const statsItem = tv({
  base: "font-mono text-xs text-text-tertiary",
});

export interface StatsItemProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function StatsItem({ className, children, ...props }: StatsItemProps) {
  return (
    <span className={statsItem({ className })} {...props}>
      {children}
    </span>
  );
}

const statsDot = tv({
  base: "text-text-tertiary",
});

export interface StatsDotProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function StatsDot({ className, ...props }: StatsDotProps) {
  return (
    <span className={statsDot({ className })} {...props}>
      ·
    </span>
  );
}

export interface StatsBarDataProps {
  codesRoasted?: number;
  avgScore?: number;
}

export function StatsBarData({
  codesRoasted = 0,
  avgScore = 0,
}: StatsBarDataProps) {
  return (
    <StatsBar>
      <StatsItem>{codesRoasted.toLocaleString()} codes roasted</StatsItem>
      <StatsDot />
      <StatsItem>avg score: {avgScore.toFixed(1)}/10</StatsItem>
    </StatsBar>
  );
}
