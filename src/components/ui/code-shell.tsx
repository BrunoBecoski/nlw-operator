"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { useShikiHighlighter } from "@/hooks/use-shiki-highlighter";
import { RadiationDialSm } from "./radiation-dial";

const codeShellRoot = tv({
  base: "rounded-sm overflow-hidden border-2 border-border-primary",
});

export interface CodeShellRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeShellRoot> {}

export function CodeShellRoot({
  className,
  children,
  ...props
}: CodeShellRootProps) {
  return (
    <div className={codeShellRoot({ className })} {...props}>
      {children}
    </div>
  );
}

const codeShellHeader = tv({
  base: "flex items-center justify-between h-10 px-4 bg-bg-surface",
});

export interface CodeShellHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeShellHeader({
  className,
  children,
  ...props
}: CodeShellHeaderProps) {
  return (
    <div className={codeShellHeader({ className })} {...props}>
      {children}
    </div>
  );
}

const codeShellLanguageBadge = tv({
  base: "px-2 py-0.5 rounded text-xs font-mono bg-bg-input border border-border-primary text-text-secondary",
});

export interface CodeShellLanguageBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  language?: string;
}

export function CodeShellLanguageBadge({
  className,
  language,
  children,
  ...props
}: CodeShellLanguageBadgeProps) {
  return (
    <span className={codeShellLanguageBadge({ className })} {...props}>
      {children || language}
    </span>
  );
}

const codeShellScore = tv({
  base: "flex items-center gap-1",
});

export interface CodeShellScoreProps
  extends React.HTMLAttributes<HTMLDivElement> {
  score?: number;
  maxScore?: number;
}

export function CodeShellScore({
  className,
  score,
  maxScore = 10,
  ...props
}: CodeShellScoreProps) {
  if (score === undefined) return null;

  return (
    <div className={codeShellScore({ className })} {...props}>
      <RadiationDialSm score={score} maxScore={maxScore} />
    </div>
  );
}

const codeShellCopyButton = tv({
  base: "p-1.5 cursor-pointer hover:bg-bg-input rounded transition-colors text-text-secondary hover:text-text-primary",
});

export interface CodeShellCopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onCopy?: () => void;
}

export const CodeShellCopyButton = forwardRef<
  HTMLButtonElement,
  CodeShellCopyButtonProps
>(({ className, onCopy, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={codeShellCopyButton({ className })}
      onClick={onCopy}
      {...props}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="Copy code"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    </button>
  );
});

CodeShellCopyButton.displayName = "CodeShellCopyButton";

const codeShellContent = tv({
  base: "bg-bg-input p-3 overflow-x-auto",
});

export interface CodeShellContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeShellContent({
  className,
  children,
  ...props
}: CodeShellContentProps) {
  return (
    <div className={codeShellContent({ className })} {...props}>
      {children}
    </div>
  );
}

const codeShellTextarea = tv({
  base: "w-full h-full bg-transparent font-mono text-sm text-text-primary resize-none focus:outline-none caret-accent-green",
});

export interface CodeShellTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const CodeShellTextarea = forwardRef<
  HTMLTextAreaElement,
  CodeShellTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={codeShellTextarea({ className })}
      style={{
        WebkitTextFillColor: "transparent",
      }}
      {...props}
    />
  );
});

CodeShellTextarea.displayName = "CodeShellTextarea";

const codeShellHighlight = tv({
  base: "font-mono text-sm overflow-x-auto",
});

export interface CodeShellHighlightProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "dangerouslySetInnerHTML"
  > {
  dangerouslySetInnerHTML?: { __html: string };
}

export const CodeShellHighlight = forwardRef<
  HTMLDivElement,
  CodeShellHighlightProps
>(({ className, dangerouslySetInnerHTML, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={codeShellHighlight({ className })}
      style={{
        whiteSpace: "pre",
        tabSize: 2,
      }}
      {...(dangerouslySetInnerHTML ? { dangerouslySetInnerHTML } : {})}
      {...props}
    />
  );
});

CodeShellHighlight.displayName = "CodeShellHighlight";

export interface CodeShellProps {
  language?: string;
  filename?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onLanguageChange?: (language: string) => void;
  detectedLanguage?: string | null;
  score?: number;
  maxScore?: number;
  showScore?: boolean;
  showHeader?: boolean;
  position?: number;
  editable?: boolean;
  className?: string;
}

export function CodeShell({
  language = "javascript",
  value = "",
  onChange,
  placeholder = "// paste your code here...",
  detectedLanguage,
  score,
  maxScore = 10,
  showScore = false,
  showHeader = true,
  position,
  editable = false,
  className,
}: CodeShellProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const { highlight, isReady } = useShikiHighlighter();
  const [highlightedHtml, setHighlightedHtml] = useState("");

  const effectiveLanguage = detectedLanguage || language;

  useEffect(() => {
    if (isReady && value) {
      highlight(value, effectiveLanguage).then(setHighlightedHtml);
    }
  }, [value, effectiveLanguage, isReady, highlight]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.currentTarget.scrollTop;
      highlightRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    },
    [onChange],
  );

  const displayHtml = highlightedHtml
    ? highlightedHtml.replace(/^<pre[^>]*>|<\/pre>$/g, "")
    : "";

  const handleCopy = useCallback(() => {
    if (value) {
      navigator.clipboard.writeText(value);
    }
  }, [value]);

  return (
    <CodeShellRoot className={className}>
      {showHeader && (
        <CodeShellHeader>
          <div className="flex items-center gap-2">
            {position !== undefined && (
              <span className="font-mono text-sm text-text-secondary">
                #{position}
              </span>
            )}
            <CodeShellLanguageBadge language={language} />
          </div>
          <div className="flex items-center gap-2">
            {showScore && score !== undefined && (
              <CodeShellScore score={score} maxScore={maxScore} />
            )}
            <CodeShellCopyButton onClick={handleCopy} />
          </div>
        </CodeShellHeader>
      )}
      <CodeShellContent>
        {editable && (
          <div className="relative w-full h-[360px]">
            <CodeShellHighlight
              ref={highlightRef}
              className="absolute inset-0 w-full h-full p-3 pointer-events-none overflow-hidden"
              dangerouslySetInnerHTML={{ __html: displayHtml }}
            />
            <CodeShellTextarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onScroll={handleScroll}
              placeholder={placeholder}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              className="absolute inset-0 w-full h-full p-3"
            />
          </div>
        )}
        {!editable && (
          <CodeShellHighlight
            dangerouslySetInnerHTML={{ __html: displayHtml }}
          />
        )}
      </CodeShellContent>
    </CodeShellRoot>
  );
}
