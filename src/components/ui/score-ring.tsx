import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const scoreRing = tv({
  base: "relative inline-flex items-center justify-center w-[180px] h-[180px]",
});

const outerRing = tv({
  base: "absolute border-4 border-border-primary rounded-full",
});

const gradientArc = tv({
  base: "absolute border-4 rounded-full",
});

const center = tv({
  base: "absolute inset-0 flex flex-col items-center justify-center gap-1",
});

export interface ScoreRingProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  maxScore?: number;
  showDenominator?: boolean;
}

const ScoreRing = forwardRef<HTMLDivElement, ScoreRingProps>(
  (
    { className, score, maxScore = 10, showDenominator = true, ...props },
    ref,
  ) => {
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
      <div ref={ref} className={scoreRing({ className })} {...props}>
        <svg
          className="absolute w-full h-full -rotate-90"
          viewBox="0 0 180 180"
          aria-label={`Score: ${score} out of ${maxScore}`}
        >
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-border-primary"
          />
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
            className={scoreColor}
            style={{
              transformOrigin: "center",
            }}
          />
        </svg>
        <div className={center({ className: scoreColor })}>
          <span className="text-5xl font-bold font-mono leading-none">
            {score}
          </span>
          {showDenominator && (
            <span className="text-base font-mono text-text-tertiary">
              /{maxScore}
            </span>
          )}
        </div>
      </div>
    );
  },
);

ScoreRing.displayName = "ScoreRing";

export { ScoreRing, scoreRing };
