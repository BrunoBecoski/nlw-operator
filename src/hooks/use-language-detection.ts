"use client";

import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import css from "highlight.js/lib/languages/css";
import dart from "highlight.js/lib/languages/dart";
import go from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import kotlin from "highlight.js/lib/languages/kotlin";
import markdown from "highlight.js/lib/languages/markdown";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import rust from "highlight.js/lib/languages/rust";
import sql from "highlight.js/lib/languages/sql";
import swift from "highlight.js/lib/languages/swift";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import { useEffect, useRef, useState } from "react";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("java", java);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("php", php);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("dart", dart);

const HLJS_LANGUAGE_IDS = [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "java",
  "ruby",
  "php",
  "sql",
  "bash",
  "xml",
  "css",
  "json",
  "yaml",
  "markdown",
  "c",
  "cpp",
  "csharp",
  "swift",
  "kotlin",
  "dart",
];

export interface UseLanguageDetectionResult {
  detectedLanguage: string | null;
  confidence: number;
}

export function useLanguageDetection(
  code: string,
  debounceMs: number = 300,
): UseLanguageDetectionResult {
  const [result, setResult] = useState<UseLanguageDetectionResult>({
    detectedLanguage: null,
    confidence: 0,
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!code || code.trim().length < 10) {
      setResult({ detectedLanguage: null, confidence: 0 });
      return;
    }

    timeoutRef.current = setTimeout(() => {
      try {
        const detection = hljs.highlightAuto(code, HLJS_LANGUAGE_IDS);

        if (detection.relevance >= 5) {
          setResult({
            detectedLanguage: detection.language || null,
            confidence: detection.relevance,
          });
        } else {
          setResult({ detectedLanguage: null, confidence: 0 });
        }
      } catch {
        setResult({ detectedLanguage: null, confidence: 0 });
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [code, debounceMs]);

  return result;
}
