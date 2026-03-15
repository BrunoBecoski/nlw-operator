"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  bundledLanguages,
  createHighlighterCore,
  type HighlighterCore,
} from "shiki/bundle/web";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

let shikiInstance: HighlighterCore | null = null;

export interface UseShikiHighlighterResult {
  highlight: (code: string, lang: string) => string;
  isReady: boolean;
  loadLanguage: (lang: string) => Promise<void>;
  loadedLanguages: Set<string>;
}

export function useShikiHighlighter(): UseShikiHighlighterResult {
  const [isReady, setIsReady] = useState(false);
  const [loadedLanguages, setLoadedLanguages] = useState<Set<string>>(
    new Set(["javascript", "typescript"]),
  );
  const highlighterRef = useRef<HighlighterCore | null>(null);

  useEffect(() => {
    if (shikiInstance) {
      highlighterRef.current = shikiInstance;
      setIsReady(true);
      return;
    }

    async function initShiki() {
      try {
        const highlighter = await createHighlighterCore({
          themes: [await import("shiki/themes/vesper.mjs")],
          langs: [bundledLanguages.javascript, bundledLanguages.typescript],
          engine: createJavaScriptRegexEngine(),
        });

        shikiInstance = highlighter;
        highlighterRef.current = highlighter;
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize Shiki:", error);
      }
    }

    initShiki();
  }, []);

  const loadLanguage = useCallback(
    async (lang: string) => {
      if (loadedLanguages.has(lang)) {
        return;
      }

      try {
        const langModule =
          bundledLanguages[lang as keyof typeof bundledLanguages];
        if (langModule) {
          await shikiInstance?.loadLanguage(langModule);
          setLoadedLanguages((prev) => new Set([...prev, lang]));
        }
      } catch (error) {
        console.error(`Failed to load language ${lang}:`, error);
      }
    },
    [loadedLanguages],
  );

  const highlight = useCallback((code: string, lang: string): string => {
    if (!highlighterRef.current || !code) {
      return "";
    }

    try {
      const html = highlighterRef.current.codeToHtml(code, {
        lang,
        theme: "vesper",
      });

      return html;
    } catch (error) {
      console.error(`Failed to highlight code:`, error);
      return escapeHtml(code);
    }
  }, []);

  return {
    highlight,
    isReady,
    loadLanguage,
    loadedLanguages,
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
