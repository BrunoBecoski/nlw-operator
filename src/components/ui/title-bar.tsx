"use client";

import { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { RadiationDialSm } from "./radiation-dial";

const SUPPORTED_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "java",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "c",
  "cpp",
  "html",
  "css",
  "json",
  "yaml",
  "sql",
  "bash",
  "markdown",
];

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

export interface TitleBarLanguageSelectProps {
  value: string;
  onChange: (language: string) => void;
  detectedLanguage?: string | null;
  className?: string;
}

export function TitleBarLanguageSelect({
  value,
  onChange,
  detectedLanguage,
  className,
}: TitleBarLanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAutoDetected = !value || detectedLanguage === value;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className ?? ""}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 font-mono text-base font-bold hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="Select language"
      >
        <span>{value}</span>
        {isAutoDetected && detectedLanguage && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-60"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="currentColor"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-[100] min-w-[120px] bg-bg-surface border border-border-primary rounded-sm shadow-lg max-h-[200px] overflow-y-auto pointer-events-auto">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                onChange(lang);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 font-mono text-sm hover:bg-hazmat-primary/20 transition-colors cursor-pointer ${
                lang === value ? "bg-hazmat-primary/30 text-hazmat-primary" : ""
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
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
