"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { useLanguageDetection } from "@/hooks/use-language-detection";
import { useShikiHighlighter } from "@/hooks/use-shiki-highlighter";
import {
  getLanguageByHljsId,
  LANGUAGES,
  type LanguageKey,
} from "@/lib/languages";

const codeEditorRoot = tv({
  base: "flex flex-col rounded-md border border-border-primary overflow-hidden",
});

export interface CodeEditorRootProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeEditorRoot({
  className,
  children,
  ...props
}: CodeEditorRootProps) {
  return (
    <div className={codeEditorRoot({ className })} {...props}>
      {children}
    </div>
  );
}

const codeEditorHeader = tv({
  base: "flex items-center gap-3 h-10 px-4 border-b border-border-primary bg-bg-surface",
});

export interface CodeEditorHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeEditorHeader({
  className,
  children,
  ...props
}: CodeEditorHeaderProps) {
  return (
    <div className={codeEditorHeader({ className })} {...props}>
      {children}
    </div>
  );
}

const codeEditorDots = tv({
  base: "flex items-center gap-2",
});

export interface CodeEditorDotsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeEditorDots({ className, ...props }: CodeEditorDotsProps) {
  return (
    <div className={codeEditorDots({ className })} {...props}>
      <span className="h-2.5 w-2.5 rounded-full bg-accent-red" />
      <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
      <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />
    </div>
  );
}

const codeEditorFilename = tv({
  base: "text-text-tertiary font-mono text-xs",
});

export interface CodeEditorFilenameProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  filename?: string;
}

export function CodeEditorFilename({
  className,
  filename = "code.js",
  ...props
}: CodeEditorFilenameProps) {
  return (
    <span className={codeEditorFilename({ className })} {...props}>
      {filename}
    </span>
  );
}

const codeEditorLanguageBadge = tv({
  base: "px-2 py-0.5 rounded text-xs font-mono bg-bg-surface border border-border-primary text-text-secondary",
});

export interface CodeEditorLanguageBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  language?: string;
}

export function CodeEditorLanguageBadge({
  className,
  language,
  ...props
}: CodeEditorLanguageBadgeProps) {
  if (!language) return null;

  const langKey = getLanguageByHljsId(language);
  const langName = langKey ? LANGUAGES[langKey].name : language;

  return (
    <span className={codeEditorLanguageBadge({ className })} {...props}>
      {langName}
    </span>
  );
}

const codeEditorAreaContainer = tv({
  base: "relative w-full h-[360px] bg-bg-input overflow-hidden",
});

export interface CodeEditorAreaContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeEditorAreaContainer({
  className,
  children,
  ...props
}: CodeEditorAreaContainerProps) {
  return (
    <div className={codeEditorAreaContainer({ className })} {...props}>
      {children}
    </div>
  );
}

const codeEditorTextarea = tv({
  base: "absolute inset-0 w-full h-full p-4 bg-transparent font-mono text-sm text-text-primary resize-none focus:outline-none caret-accent-green z-10",
});

export interface CodeEditorTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const CodeEditorTextarea = forwardRef<
  HTMLTextAreaElement,
  CodeEditorTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={codeEditorTextarea({ className })}
      style={{
        WebkitTextFillColor: "transparent",
      }}
      {...props}
    />
  );
});

const codeEditorHighlight = tv({
  base: "absolute inset-0 w-full h-full p-4 font-mono text-sm overflow-hidden pointer-events-none z-0",
});

export interface CodeEditorHighlightProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "dangerouslySetInnerHTML"
  > {
  dangerouslySetInnerHTML?: { __html: string };
}

export const CodeEditorHighlight = forwardRef<
  HTMLDivElement,
  CodeEditorHighlightProps
>(({ className, dangerouslySetInnerHTML, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={codeEditorHighlight({ className })}
      style={{
        whiteSpace: "pre",
        tabSize: 2,
      }}
      {...(dangerouslySetInnerHTML ? { dangerouslySetInnerHTML } : {})}
      {...props}
    />
  );
});

export interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  filename?: string;
  placeholder?: string;
  language?: LanguageKey;
  onLanguageChange?: (language: string) => void;
  detectedLanguage?: string | null;
}

export function CodeEditor({
  value = "",
  onChange,
  filename = "code.js",
  placeholder = "// paste your garbage code here...",
  language: manualLanguage,
  onLanguageChange,
  detectedLanguage: detectedLangProp,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const { highlight, isReady } = useShikiHighlighter();
  const { detectedLanguage } = useLanguageDetection(value);
  const [highlightedHtml, setHighlightedHtml] = useState("");

  const effectiveLanguage = manualLanguage
    ? LANGUAGES[manualLanguage].shikiId
    : detectedLangProp || "javascript";

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

  useEffect(() => {
    if (detectedLanguage && !manualLanguage) {
      onLanguageChange?.(detectedLanguage);
    }
  }, [detectedLanguage, manualLanguage, onLanguageChange]);

  const displayHtml = highlightedHtml
    ? highlightedHtml.replace(/^<pre[^>]*>|<\/pre>$/g, "")
    : "";

  return (
    <CodeEditorRoot>
      <CodeEditorHeader>
        <CodeEditorDots />
        <div className="flex-1" />
        <CodeEditorLanguageBadge
          language={manualLanguage || detectedLanguage || undefined}
        />
        <CodeEditorFilename filename={filename} />
      </CodeEditorHeader>
      <CodeEditorAreaContainer>
        <CodeEditorHighlight
          ref={highlightRef}
          dangerouslySetInnerHTML={{ __html: displayHtml }}
        />
        <CodeEditorTextarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onScroll={handleScroll}
          placeholder={placeholder}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </CodeEditorAreaContainer>
    </CodeEditorRoot>
  );
}
