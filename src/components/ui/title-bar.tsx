"use client";

import { tv } from "tailwind-variants";
import { RadiationDialSm } from "./radiation-dial";

export type TitleBarColor = "hazmat" | "red" | "orange" | "green";

const titleBarRoot = tv({
  base: "overflow-hidden rounded-sm",
  variants: {
    color: {
      hazmat: "border-4 border-hazmat-primary/80",
      red: "border-4 border-accent-red/80",
      orange: "border-4 border-accent-amber/80",
      green: "border-4 border-radiation-green/80",
    },
  },
  defaultVariants: {
    color: "hazmat",
  },
});

export interface TitleBarRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: TitleBarColor;
}

export function TitleBarRoot({
  className,
  color = "hazmat",
  children,
  ...props
}: TitleBarRootProps) {
  return (
    <div
      className={titleBarRoot({ color, className })}
      style={{ backgroundColor: "var(--color-bg-surface)" }}
      {...props}
    >
      {children}
    </div>
  );
}

const headerStyles = tv({
  base: "flex items-center h-10 px-2",
  variants: {
    color: {
      hazmat: "bg-hazmat-primary/80 text-black",
      red: "bg-accent-red/80 text-white",
      orange: "bg-accent-amber/80 text-black",
      green: "bg-radiation-green/80 text-black",
    },
  },
  defaultVariants: {
    color: "hazmat",
  },
});

export interface TitleBarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: TitleBarColor;
}

export function TitleBarHeader({
  className,
  color = "hazmat",
  ...props
}: TitleBarHeaderProps) {
  return (
    <div
      className={`${headerStyles({ color })} ${className ?? ""}`}
      {...props}
    />
  );
}

export interface TitleBarTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TitleBarTitle({ className, ...props }: TitleBarTitleProps) {
  return (
    <h3
      className={`font-mono text-sm font-bold ${className ?? ""}`}
      {...props}
    />
  );
}

export interface TitleBarSubtitleProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function TitleBarSubtitle({
  className,
  ...props
}: TitleBarSubtitleProps) {
  return (
    <span
      className={`font-mono text-xs opacity-70 ${className ?? ""}`}
      {...props}
    />
  );
}

export interface TitleBarActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function TitleBarActions({ className, ...props }: TitleBarActionsProps) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`} {...props} />
  );
}

export interface TitleBarPositionProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  color?: TitleBarColor;
}

export function TitleBarPosition({
  className,
  color,
  ...props
}: TitleBarPositionProps) {
  const textColorClass =
    color === "red"
      ? "text-accent-red"
      : color === "orange"
        ? "text-accent-amber"
        : color === "green"
          ? "text-[var(--color-badge-good)]"
          : "text-black";

  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 font-mono text-sm font-bold rounded-full bg-bg-surface ${textColorClass} ${className ?? ""}`}
      {...props}
    />
  );
}

export interface TitleBarLanguageProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function TitleBarLanguage({
  className,
  ...props
}: TitleBarLanguageProps) {
  return (
    <span
      className={`font-mono text-base font-bold ${className ?? ""}`}
      {...props}
    />
  );
}

export interface TitleBarScoreProps {
  score?: number;
  maxScore?: number;
  className?: string;
}

export function TitleBarScore({
  score,
  maxScore = 10,
  className,
}: TitleBarScoreProps) {
  if (score === undefined) return null;

  return (
    <RadiationDialSm score={score} maxScore={maxScore} className={className} />
  );
}

export interface TitleBarControlsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function TitleBarControls({ className }: TitleBarControlsProps) {
  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>
      <button
        type="button"
        className="p-1 bg-black/20 hover:bg-black/30 active:brightness-75 cursor-pointer transition-all rounded-sm"
        title="Minimizar"
        aria-label="Minimizar"
      >
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="2" y1="6" x2="10" y2="6" />
        </svg>
      </button>
      <button
        type="button"
        className="p-1 bg-black/20 hover:bg-black/30 active:brightness-75 cursor-pointer transition-all rounded-sm"
        title="Maximizar"
        aria-label="Maximizar"
      >
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="8" height="8" rx="0.5" />
        </svg>
      </button>
      <button
        type="button"
        className="p-1 bg-black/20 hover:bg-red-600 active:brightness-75 cursor-pointer transition-all rounded-sm"
        title="Fechar"
        aria-label="Fechar"
      >
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="2" y1="2" x2="10" y2="10" />
          <line x1="10" y1="2" x2="2" y2="10" />
        </svg>
      </button>
    </div>
  );
}
