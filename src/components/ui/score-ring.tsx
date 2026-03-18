import { tv } from "tailwind-variants";

const scoreRingRoot = tv({
  base: "relative inline-block",
  variants: {
    size: {
      sm: "w-14 h-14",
      md: "w-[180px] h-[180px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ScoreRingRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md";
}

export function ScoreRingRoot({
  className,
  children,
  size = "md",
  ...props
}: ScoreRingRootProps) {
  return (
    <div className={scoreRingRoot({ size, className })} {...props}>
      {children}
    </div>
  );
}

const scoreRingTrack = tv({
  base: "absolute border-4 border-border-primary rounded-full text-text-tertiary",
});

const TRACK_SIZES = {
  sm: { cx: 28, cy: 28, r: 24, strokeWidth: 2 },
  md: { cx: 90, cy: 90, r: 70, strokeWidth: 4 },
};

export interface ScoreRingTrackProps
  extends React.HTMLAttributes<SVGCircleElement> {
  size?: "sm" | "md";
}

export function ScoreRingTrack({
  className,
  size = "md",
  ...props
}: ScoreRingTrackProps) {
  const trackVars = TRACK_SIZES[size];
  return (
    <circle
      cx={trackVars.cx}
      cy={trackVars.cy}
      r={trackVars.r}
      fill="none"
      stroke="currentColor"
      strokeWidth={trackVars.strokeWidth}
      className={scoreRingTrack({ className })}
      {...props}
    />
  );
}

const scoreRingIndicator = tv({
  base: "",
});

const INDICATOR_SIZES = {
  sm: { cx: 28, cy: 28, r: 24, strokeWidth: 2 },
  md: { cx: 90, cy: 90, r: 70, strokeWidth: 4 },
};

export interface ScoreRingIndicatorProps
  extends React.HTMLAttributes<SVGCircleElement> {
  score: number;
  maxScore?: number;
  size?: "sm" | "md";
}

export function ScoreRingIndicator({
  className,
  score,
  maxScore = 10,
  size = "md",
  ...props
}: ScoreRingIndicatorProps) {
  const percentage = (score / maxScore) * 100;
  const sizeVars = INDICATOR_SIZES[size];
  const circumference = 2 * Math.PI * sizeVars.r;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <circle
      cx={sizeVars.cx}
      cy={sizeVars.cy}
      r={sizeVars.r}
      fill="none"
      stroke="url(#ring-gradient)"
      strokeWidth={sizeVars.strokeWidth}
      strokeLinecap="round"
      strokeDasharray={circumference}
      strokeDashoffset={strokeDashoffset}
      className={scoreRingIndicator({
        className: `${className || ""}`,
      })}
      style={{ transformOrigin: "center" }}
      {...props}
    />
  );
}

const scoreRingCenter = tv({
  base: "absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-1",
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
  base: "font-bold font-mono leading-none",
  variants: {
    size: {
      sm: "text-lg font-semibold",
      md: "text-5xl",
    },
  },
});

export interface ScoreRingValueProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  score: number;
  size?: "sm" | "md";
}

export function ScoreRingValue({
  className,
  score,
  size = "md",
  ...props
}: ScoreRingValueProps) {
  return (
    <span className={scoreRingValue({ size, className })} {...props}>
      {score}
    </span>
  );
}

const scoreRingLabel = tv({
  base: "font-mono text-text-tertiary",
  variants: {
    size: {
      sm: "text-[8px]",
      md: "text-base",
    },
  },
});

export interface ScoreRingLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  maxScore?: number;
  size?: "sm" | "md";
}

export function ScoreRingLabel({
  className,
  maxScore = 10,
  size = "md",
  ...props
}: ScoreRingLabelProps) {
  return (
    <span className={scoreRingLabel({ size, className })} {...props}>
      /{maxScore}
    </span>
  );
}

export { scoreRingRoot };

export interface ScoreRingProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  maxScore?: number;
  showDenominator?: boolean;
  size?: "sm" | "md";
}

export function ScoreRing({
  className,
  score,
  maxScore = 10,
  showDenominator = true,
  size = "md",
  ...props
}: ScoreRingProps) {
  const scoreColor =
    score < 4
      ? "text-accent-red"
      : score < 7
        ? "text-accent-amber"
        : "text-accent-green";

  const transitionZone = 0.08;
  const redEnd = 0.25 + transitionZone;
  const orangeStart = 0.25 - transitionZone / 2;
  const orangeEnd = 0.5 + transitionZone;
  const yellowStart = 0.5 - transitionZone / 2;
  const yellowEnd = 0.75 + transitionZone;
  const greenStart = 0.75 - transitionZone / 2;

  const viewBoxSize = size === "sm" ? "0 0 56 56" : "0 0 180 180";
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * (size === "sm" ? 24 : 70);

  return (
    <ScoreRingRoot size={size} className={className} {...props}>
      <svg
        className="absolute w-full h-full -rotate-90"
        viewBox={viewBoxSize}
        aria-label={`Score: ${score} out of ${maxScore}`}
      >
        <ScoreRingTrack size={size} />
        <g>
          <circle
            cx={size === "sm" ? 28 : 90}
            cy={size === "sm" ? 28 : 90}
            r={size === "sm" ? 24 : 70}
            fill="none"
            stroke="currentColor"
            strokeWidth={size === "sm" ? 2 : 4}
            strokeDasharray={`${(Math.min(percentage, redEnd * 100) / 100) * circumference} ${circumference}`}
            className="text-accent-red"
            strokeLinecap="round"
          />
          {percentage > orangeStart * 100 && (
            <circle
              cx={size === "sm" ? 28 : 90}
              cy={size === "sm" ? 28 : 90}
              r={size === "sm" ? 24 : 70}
              fill="none"
              stroke="currentColor"
              strokeWidth={size === "sm" ? 2 : 4}
              strokeDasharray={`${((Math.min(percentage, orangeEnd * 100) - orangeStart * 100) / 100) * circumference} ${circumference}`}
              strokeDashoffset={`${-orangeStart * circumference}`}
              className="text-orange-400"
              strokeLinecap="round"
            />
          )}
          {percentage > yellowStart * 100 && (
            <circle
              cx={size === "sm" ? 28 : 90}
              cy={size === "sm" ? 28 : 90}
              r={size === "sm" ? 24 : 70}
              fill="none"
              stroke="currentColor"
              strokeWidth={size === "sm" ? 2 : 4}
              strokeDasharray={`${((Math.min(percentage, yellowEnd * 100) - yellowStart * 100) / 100) * circumference} ${circumference}`}
              strokeDashoffset={`${-yellowStart * circumference}`}
              className="text-yellow-400"
              strokeLinecap="round"
            />
          )}
          {percentage > greenStart * 100 && (
            <circle
              cx={size === "sm" ? 28 : 90}
              cy={size === "sm" ? 28 : 90}
              r={size === "sm" ? 24 : 70}
              fill="none"
              stroke="currentColor"
              strokeWidth={size === "sm" ? 2 : 4}
              strokeDasharray={`${((percentage - greenStart * 100) / 100) * circumference} ${circumference}`}
              strokeDashoffset={`${-greenStart * circumference}`}
              className="text-accent-green"
              strokeLinecap="round"
            />
          )}
        </g>
      </svg>
      <ScoreRingCenter className={scoreColor}>
        <ScoreRingValue size={size} score={score} />
        {showDenominator && <ScoreRingLabel size={size} maxScore={maxScore} />}
      </ScoreRingCenter>
    </ScoreRingRoot>
  );
}
