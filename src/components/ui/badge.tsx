import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const badge = tv({
  base: "inline-flex items-center gap-2 font-mono text-xs font-bold uppercase px-3 py-1 bg-bg-surface rounded-sm",
  variants: {
    status: {
      critical: "text-accent-red",
      warning: "text-accent-amber",
      good: "text-[var(--color-badge-good)]",
      needs_serious_help: "text-accent-red",
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
      needs_serious_help: "bg-accent-red",
    },
  },
});

type BadgeStatus = "critical" | "warning" | "good" | "needs_serious_help";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: BadgeStatus;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, status = "good", children, ...props }, ref) => {
    const statusLabel: Record<BadgeStatus, string> = {
      critical: "critical",
      warning: "warning",
      good: "good",
      needs_serious_help: "needs_serious_help",
    };

    return (
      <div ref={ref} className={badge({ status, className })} {...props}>
        <span className={dot({ status })} />
        <span>{children || statusLabel[status]}</span>
      </div>
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badge };
