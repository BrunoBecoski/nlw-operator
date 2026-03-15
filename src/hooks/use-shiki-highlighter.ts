"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  bundledLanguages,
  createHighlighterCore,
  type HighlighterCore,
  type LanguageInput,
} from "shiki/bundle/web";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

let shikiInstance: HighlighterCore | null = null;

export interface UseShikiHighlighterResult {
  highlight: (code: string, lang: string) => Promise<string>;
  isReady: boolean;
}

const SUPPORTED_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "java",
  "cpp",
  "c",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "html",
  "css",
  "json",
  "yaml",
  "bash",
  "sql",
] as const;

const languageAliases: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  rb: "ruby",
  sh: "bash",
  yml: "yaml",
};

function normalizeLang(lang: string): string {
  const normalized = lang.toLowerCase();
  return languageAliases[normalized] || normalized;
}

function isLangSupported(lang: string): boolean {
  return SUPPORTED_LANGUAGES.includes(
    lang as (typeof SUPPORTED_LANGUAGES)[number],
  );
}

export function useShikiHighlighter(): UseShikiHighlighterResult {
  const [isReady, setIsReady] = useState(false);
  const highlighterRef = useRef<HighlighterCore | null>(null);

  useEffect(() => {
    if (shikiInstance) {
      highlighterRef.current = shikiInstance;
      setIsReady(true);
      return;
    }

    async function init() {
      try {
        const langs: LanguageInput[] = [];

        for (const lang of SUPPORTED_LANGUAGES) {
          const mod = (bundledLanguages as Record<string, LanguageInput>)[lang];
          if (mod) langs.push(mod);
        }

        if (langs.length === 0) {
          langs.push(bundledLanguages.javascript);
        }

        const highlighter = await createHighlighterCore({
          themes: [await import("shiki/themes/vesper.mjs")],
          langs,
          engine: createJavaScriptRegexEngine(),
        });

        shikiInstance = highlighter;
        highlighterRef.current = highlighter;
        setIsReady(true);
      } catch (err) {
        console.error("Shiki init failed:", err);
      }
    }

    init();
  }, []);

  const highlight = useCallback(
    async (code: string, lang: string): Promise<string> => {
      if (!code || !highlighterRef.current) {
        return escapeHtml(code);
      }

      const normalized = normalizeLang(lang);

      if (!isLangSupported(normalized)) {
        return escapeHtml(code);
      }

      try {
        return highlighterRef.current.codeToHtml(code, {
          lang: normalized,
          theme: "vesper",
        });
      } catch {
        return escapeHtml(code);
      }
    },
    [],
  );

  return { highlight, isReady };
}

function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
