import { tv } from "tailwind-variants";

interface RadiationDialProps {
  score: number;
  maxScore?: number;
}

type RadiationLevel = "safe" | "caution" | "danger";

const ZONE_COLORS = {
  safe: { fill: "var(--color-accent-green)", glow: "rgba(200,255,0,0.8)" },
  caution: { fill: "var(--color-accent-amber)", glow: "rgba(245,158,11,0.8)" },
  danger: { fill: "var(--color-accent-red)", glow: "rgba(239,68,68,0.8)" },
};

const getRadiationLevel = (percentage: number): RadiationLevel => {
  if (percentage >= 66.6) return "safe";
  if (percentage >= 33.3) return "caution";
  return "danger";
};

const radiationDialRoot = tv({
  base: "relative inline-flex flex-col items-center gap-2",
});

export interface RadiationDialRootProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function RadiationDialRoot({
  className,
  children,
  ...props
}: RadiationDialRootProps) {
  return (
    <div className={radiationDialRoot({ className })} {...props}>
      {children}
    </div>
  );
}

export function RadiationDial({ score, maxScore = 10 }: RadiationDialProps) {
  const percentage = (score / maxScore) * 100;
  const level = getRadiationLevel(percentage);
  const levelColor = ZONE_COLORS[level];

  const centerX = 160;
  const centerY = 170;
  const radius = 100;
  const needleLength = radius - 25;

  const calculateAngle = (pct: number): number => {
    return -180 + pct * 1.8;
  };

  const currentAngle = calculateAngle(percentage);

  const needleX =
    centerX + needleLength * Math.cos((currentAngle * Math.PI) / 180);
  const needleY =
    centerY + needleLength * Math.sin((currentAngle * Math.PI) / 180);

  const arcPath = (start: number, end: number, r: number) => {
    const x1 = centerX + r * Math.cos((start * Math.PI) / 180);
    const y1 = centerY + r * Math.sin((start * Math.PI) / 180);
    const x2 = centerX + r * Math.cos((end * Math.PI) / 180);
    const y2 = centerY + r * Math.sin((end * Math.PI) / 180);
    const largeArc = end - start > 90 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <RadiationDialRoot>
      <svg
        width={320}
        height={280}
        viewBox="0 0 320 280"
        className="overflow-visible"
        role="img"
        aria-label={`Radiation level: ${level} - Score ${score} out of ${maxScore}`}
      >
        <path
          d={arcPath(-180, 0, radius)}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={2}
          strokeLinecap="round"
        />

        <path
          d={arcPath(-180, -120, radius)}
          fill="none"
          stroke={ZONE_COLORS.danger.fill}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <path
          d={arcPath(-120, -60, radius)}
          fill="none"
          stroke={ZONE_COLORS.caution.fill}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <path
          d={arcPath(-60, 0, radius)}
          fill="none"
          stroke={ZONE_COLORS.safe.fill}
          strokeWidth={4}
          strokeLinecap="round"
        />

        <text
          x={centerX - radius + 15}
          y={centerY + 25}
          textAnchor="middle"
          fill={ZONE_COLORS.danger.fill}
          fontSize="11"
          fontFamily="monospace"
          fontWeight="bold"
        >
          DANGER
        </text>

        <text
          x={centerX}
          y={centerY - radius + 20}
          textAnchor="middle"
          fill={ZONE_COLORS.caution.fill}
          fontSize="11"
          fontFamily="monospace"
          fontWeight="bold"
        >
          CAUTION
        </text>

        <text
          x={centerX + radius - 15}
          y={centerY + 25}
          textAnchor="middle"
          fill={ZONE_COLORS.safe.fill}
          fontSize="11"
          fontFamily="monospace"
          fontWeight="bold"
        >
          SAFE
        </text>

        <line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke={levelColor.fill}
          strokeWidth={4}
          strokeLinecap="round"
        />

        <circle cx={centerX} cy={centerY} r={6} fill={levelColor.fill} />

        <text
          x={centerX}
          y={260}
          textAnchor="middle"
          fill={levelColor.fill}
          fontSize="28"
          fontFamily="monospace"
          fontWeight="bold"
          style={{
            filter: `drop-shadow(0 0 8px ${levelColor.glow})`,
          }}
        >
          {score}/{maxScore}
        </text>
      </svg>
    </RadiationDialRoot>
  );
}
