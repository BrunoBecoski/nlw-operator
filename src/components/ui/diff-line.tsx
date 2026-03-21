import { forwardRef } from "react";
import { tv } from "tailwind-variants";

export type DiffType = "removed" | "added" | "context";

const diffLinePrefix = tv({
  base: "w-4 text-center font-mono",
  variants: {
    type: {
      removed: "text-accent-red",
      added: "text-accent-green",
      context: "text-text-tertiary",
    },
  },
});

export interface DiffLinePrefixProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  type?: DiffType;
}

export const DiffLinePrefix = forwardRef<HTMLSpanElement, DiffLinePrefixProps>(
  ({ className, type = "context", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={diffLinePrefix({ type, className })}
        {...props}
      />
    );
  },
);

DiffLinePrefix.displayName = "DiffLinePrefix";

const diffLineContent = tv({
  base: "",
  variants: {
    type: {
      removed: "text-text-secondary",
      added: "",
      context: "text-text-secondary",
    },
  },
});

export interface DiffLineContentProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  type?: DiffType;
}

export const DiffLineContent = forwardRef<
  HTMLSpanElement,
  DiffLineContentProps
>(({ className, type = "context", ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={diffLineContent({ type, className })}
      {...props}
    />
  );
});

DiffLineContent.displayName = "DiffLineContent";

const diffLineRoot = tv({
  base: "flex gap-2 px-4 py-2 font-mono text-sm",
  variants: {
    type: {
      removed: "bg-accent-red/10",
      added: "bg-accent-green/10",
      context: "",
    },
  },
});

export interface DiffLineRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: DiffType;
}

export const DiffLineRoot = forwardRef<HTMLDivElement, DiffLineRootProps>(
  ({ className, type = "context", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${diffLineRoot({ type, className })} diffline-root`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DiffLineRoot.displayName = "DiffLineRoot";

export { diffLineRoot };

export interface DiffLineProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: DiffType;
  lineNumber?: string;
}

export function DiffLine({
  className,
  type = "context",
  lineNumber,
  children,
  ...props
}: DiffLineProps) {
  const prefixChar = type === "removed" ? "-" : type === "added" ? "+" : " ";

  return (
    <DiffLineRoot type={type} className={className} {...props}>
      <DiffLinePrefix type={type}>{lineNumber || prefixChar}</DiffLinePrefix>
      <DiffLineContent type={type}>{children}</DiffLineContent>
    </DiffLineRoot>
  );
}
