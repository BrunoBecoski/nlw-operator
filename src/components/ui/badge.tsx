import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const badge = tv({
  base: "inline-flex items-center gap-2 font-mono text-xs font-bold uppercase px-3 py-1 bg-bg-surface rounded-sm",
  variants: {
    status: {
      critical: "text-accent-red",
      warning: "text-accent-amber",
      good: "text-[var(--color-badge-good)]",
      critical_contamination: "text-accent-red",
      moderate_radiation: "text-accent-red",
      containment_achieved: "text-accent-amber",
      low_radiation: "text-[var(--color-badge-good)]",
      radiation_free: "text-[var(--color-badge-good)]",
    },
  },
});

const dot = tv({
  base: "h-2 w-2",
  variants: {
    status: {
      critical: "bg-accent-red",
      warning: "bg-accent-amber",
      good: "bg-[var(--color-badge-good)]",
      critical_contamination: "bg-accent-red",
      moderate_radiation: "bg-accent-red",
      containment_achieved: "bg-accent-amber",
      low_radiation: "bg-[var(--color-badge-good)]",
      radiation_free: "bg-[var(--color-badge-good)]",
    },
  },
});

type BadgeStatus =
  | "critical"
  | "warning"
  | "good"
  | "critical_contamination"
  | "moderate_radiation"
  | "containment_achieved"
  | "low_radiation"
  | "radiation_free";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: BadgeStatus;
}

const verdictLabels: Record<BadgeStatus, string> = {
  critical: "critical",
  warning: "warning",
  good: "good",
  critical_contamination: "critical_contamination",
  moderate_radiation: "moderate_radiation",
  containment_achieved: "containment_achieved",
  low_radiation: "low_radiation",
  radiation_free: "radiation_free",
};

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, status = "good", children, ...props }, ref) => {
    return (
      <div ref={ref} className={badge({ status, className })} {...props}>
        <span className={dot({ status })} />
        <span>{children || verdictLabels[status]}</span>
      </div>
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badge };
