"use client";

import { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { RadiationDialSm } from "./radiation-dial";

const titleBarRoot = tv({
  base: "overflow-hidden",
  variants: {
    bordered: {
      true: "border-4 border-hazmat-primary",
    },
  },
  defaultVariants: {
    bordered: true,
  },
});

export interface TitleBarRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof titleBarRoot> {}

export function TitleBarRoot({
  className,
  bordered,
  children,
  ...props
}: TitleBarRootProps) {
  return (
    <div
      className={titleBarRoot({ bordered, className })}
      style={{ backgroundColor: "var(--color-bg-surface)" }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TitleBarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function TitleBarHeader({ className, ...props }: TitleBarHeaderProps) {
  return (
    <div
      className={`flex items-center h-10 px-2 bg-hazmat-primary xp-border-top-only ${className ?? ""}`}
      {...props}
    />
  );
}

export interface TitleBarTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TitleBarTitle({ className, ...props }: TitleBarTitleProps) {
  return (
    <h3
      className={`font-mono text-sm text-black font-bold ${className ?? ""}`}
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
      className={`font-mono text-xs text-black/70 ${className ?? ""}`}
      {...props}
    />
  );
}

export interface TitleBarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function TitleBarContent({ className, ...props }: TitleBarContentProps) {
  return (
    <div
      className={className}
      style={{ backgroundColor: "var(--color-bg-input)" }}
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
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function TitleBarPosition({
  className,
  ...props
}: TitleBarPositionProps) {
  return (
    <span
      className={`font-mono text-sm text-black font-bold ${className ?? ""}`}
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
      className={`font-mono text-base font-bold text-black ${className ?? ""}`}
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

export interface TitleBarWindowControlsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function TitleBarWindowControls({
  className,
  ...props
}: TitleBarWindowControlsProps) {
  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`} {...props} />
  );
}

const titleBarWindowButton = tv({
  base: "p-1 hover:brightness-90 active:brightness-75 cursor-pointer transition-all rounded-sm",
});

export interface TitleBarWindowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function TitleBarWindowButton({
  className,
  ...props
}: TitleBarWindowButtonProps) {
  return (
    <button
      type="button"
      className={titleBarWindowButton({ className })}
      {...props}
    />
  );
}

export function TitleBarMinimize() {
  return (
    <TitleBarWindowButton className="bg-black/20 hover:bg-black/30">
      <svg
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
    </TitleBarWindowButton>
  );
}

export function TitleBarMaximize() {
  return (
    <TitleBarWindowButton className="bg-black/20 hover:bg-black/30">
      <svg
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
    </TitleBarWindowButton>
  );
}

export function TitleBarClose() {
  return (
    <TitleBarWindowButton className="bg-black/20 hover:bg-red-600">
      <svg
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
    </TitleBarWindowButton>
  );
}
