import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const diffLine = tv({
  base: "flex gap-2 px-4 py-2 font-mono text-sm",
  variants: {
    type: {
      removed: "bg-accent-red/10",
      added: "bg-accent-green/10",
      context: "",
    },
  },
});

const prefix = tv({
  base: "w-4 text-center font-mono",
  variants: {
    type: {
      removed: "text-accent-red",
      added: "text-accent-green",
      context: "text-text-tertiary",
    },
  },
});

const code = tv({
  base: "",
  variants: {
    type: {
      removed: "text-text-secondary",
      added: "",
      context: "text-text-secondary",
    },
  },
});

export type DiffType = "removed" | "added" | "context";

export interface DiffLineProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: DiffType;
  lineNumber?: string;
}

const DiffLine = forwardRef<HTMLDivElement, DiffLineProps>(
  ({ className, type = "context", lineNumber, children, ...props }, ref) => {
    const prefixChar = type === "removed" ? "-" : type === "added" ? "+" : " ";

    return (
      <div ref={ref} className={diffLine({ type, className })} {...props}>
        <span className={prefix({ type })}>{lineNumber || prefixChar}</span>
        <span className={code({ type })}>{children}</span>
      </div>
    );
  },
);

DiffLine.displayName = "DiffLine";

export { DiffLine, diffLine };
