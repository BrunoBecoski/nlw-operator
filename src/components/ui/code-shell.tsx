"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { useShikiHighlighter } from "@/hooks/use-shiki-highlighter";
import { RadiationDialSm } from "./radiation-dial";
import {
  TitleBarClose,
  TitleBarHeader,
  TitleBarLanguage,
  TitleBarMaximize,
  TitleBarMinimize,
  TitleBarPosition,
  TitleBarRoot,
  TitleBarScore,
  TitleBarWindowControls,
} from "./title-bar";

const codeShellRoot = tv({
  base: "rounded-sm overflow-hidden",
  variants: {
    bordered: {
      true: "border-4 border-hazmat-primary",
    },
  },
  defaultVariants: {
    bordered: true,
  },
});

export interface CodeShellRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeShellRoot> {}

export function CodeShellRoot({
  className,
  bordered,
  children,
  ...props
}: CodeShellRootProps) {
  return (
    <div
      className={codeShellRoot({ bordered, className })}
      style={{ backgroundColor: "var(--color-bg-surface)" }}
      {...props}
    >
      {children}
    </div>
  );
}

const codeShellContent = tv({
  base: "p-3 overflow-x-auto",
});

export interface CodeShellContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeShellContent({
  className,
  children,
  ...props
}: CodeShellContentProps) {
  return (
    <div
      className={codeShellContent({ className })}
      style={{ backgroundColor: "var(--color-bg-input)" }}
      {...props}
    >
      {children}
    </div>
  );
}

const codeShellTextarea = tv({
  base: "w-full h-full bg-transparent font-mono text-sm text-text-primary resize-none focus:outline-none caret-hazmat-primary",
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
  bordered?: boolean;
  onClick?: () => void;
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
  bordered = true,
  onClick,
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
    <CodeShellRoot
      className={`${onClick ? "hover:cursor-pointer hover:opacity-90" : ""} ${className ?? ""}`}
      bordered={bordered}
      onClick={(e) => {
        if (e.target instanceof HTMLElement && !e.target.closest("button")) {
          onClick?.();
        }
      }}
    >
      {showHeader && (
        <TitleBarRoot bordered={false}>
          <TitleBarHeader className="justify-between relative">
            <div className="flex items-center gap-2">
              {position !== undefined && (
                <TitleBarPosition>#{position}</TitleBarPosition>
              )}
              {score !== undefined && showScore && (
                <TitleBarScore score={score} maxScore={maxScore} />
              )}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <TitleBarLanguage>{effectiveLanguage}</TitleBarLanguage>
            </div>
            <TitleBarWindowControls>
              <TitleBarMinimize />
              <TitleBarMaximize />
              <TitleBarClose />
            </TitleBarWindowControls>
          </TitleBarHeader>
        </TitleBarRoot>
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
        {!editable && displayHtml ? (
          <CodeShellHighlight
            dangerouslySetInnerHTML={{ __html: displayHtml }}
          />
        ) : (
          <CodeShellHighlight>
            <pre
              style={{
                backgroundColor: "var(--color-bg-input)",
                padding: "12px",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
              }}
            >
              <code>
                {value.split("\n").map((line, i) => (
                  <span
                    key={`${line}-${i}`}
                    style={{
                      display: "block",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {line || " "}
                  </span>
                ))}
              </code>
            </pre>
          </CodeShellHighlight>
        )}
      </CodeShellContent>
    </CodeShellRoot>
  );
}
