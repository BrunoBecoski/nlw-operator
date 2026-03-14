import { tv } from "tailwind-variants";

const scoreRingRoot = tv({
  base: "relative inline-flex items-center justify-center w-[180px] h-[180px]",
});

export interface ScoreRingRootProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ScoreRingRoot({
  className,
  children,
  ...props
}: ScoreRingRootProps) {
  return (
    <div className={scoreRingRoot({ className })} {...props}>
      {children}
    </div>
  );
}

const scoreRingTrack = tv({
  base: "absolute border-4 border-border-primary rounded-full",
});

export interface ScoreRingTrackProps
  extends React.HTMLAttributes<SVGCircleElement> {}

export function ScoreRingTrack({ className, ...props }: ScoreRingTrackProps) {
  return (
    <circle
      cx="90"
      cy="90"
      r="70"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      className={scoreRingTrack({ className })}
      {...props}
    />
  );
}

const scoreRingIndicator = tv({
  base: "",
});

export interface ScoreRingIndicatorProps
  extends React.HTMLAttributes<SVGCircleElement> {
  score: number;
  maxScore?: number;
}

export function ScoreRingIndicator({
  className,
  score,
  maxScore = 10,
  ...props
}: ScoreRingIndicatorProps) {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const scoreColor =
    score < 4
      ? "text-accent-red"
      : score < 7
        ? "text-accent-amber"
        : "text-accent-green";

  return (
    <circle
      cx="90"
      cy="90"
      r="70"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray={circumference}
      strokeDashoffset={strokeDashoffset}
      className={scoreRingIndicator({
        className: `${scoreColor} ${className || ""}`,
      })}
      style={{ transformOrigin: "center" }}
      {...props}
    />
  );
}

const scoreRingCenter = tv({
  base: "absolute inset-0 flex flex-col items-center justify-center gap-1",
});

export interface ScoreRingCenterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ScoreRingCenter({
  className,
  children,
  ...props
}: ScoreRingCenterProps) {
  return (
    <div className={scoreRingCenter({ className })} {...props}>
      {children}
    </div>
  );
}

const scoreRingValue = tv({
  base: "text-5xl font-bold font-mono leading-none",
});

export interface ScoreRingValueProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  score: number;
}

export function ScoreRingValue({
  className,
  score,
  ...props
}: ScoreRingValueProps) {
  return (
    <span className={scoreRingValue({ className })} {...props}>
      {score}
    </span>
  );
}

const scoreRingLabel = tv({
  base: "text-base font-mono text-text-tertiary",
});

export interface ScoreRingLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  maxScore?: number;
}

export function ScoreRingLabel({
  className,
  maxScore = 10,
  ...props
}: ScoreRingLabelProps) {
  return (
    <span className={scoreRingLabel({ className })} {...props}>
      /{maxScore}
    </span>
  );
}

export { scoreRingRoot };

export interface ScoreRingProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  maxScore?: number;
  showDenominator?: boolean;
}

export function ScoreRing({
  className,
  score,
  maxScore = 10,
  showDenominator = true,
  ...props
}: ScoreRingProps) {
  const scoreColor =
    score < 4
      ? "text-accent-red"
      : score < 7
        ? "text-accent-amber"
        : "text-accent-green";

  return (
    <ScoreRingRoot className={className} {...props}>
      <svg
        className="absolute w-full h-full -rotate-90"
        viewBox="0 0 180 180"
        aria-label={`Score: ${score} out of ${maxScore}`}
      >
        <ScoreRingTrack />
        <ScoreRingIndicator score={score} maxScore={maxScore} />
      </svg>
      <ScoreRingCenter className={scoreColor}>
        <ScoreRingValue score={score} />
        {showDenominator && <ScoreRingLabel maxScore={maxScore} />}
      </ScoreRingCenter>
    </ScoreRingRoot>
  );
}
