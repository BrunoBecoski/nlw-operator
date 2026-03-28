"use client";

import { useState } from "react";
import { DiffLine, DiffLineContainer } from "@/components/ui/diff-line";
import {
  TitleBarControls,
  TitleBarHeader,
  TitleBarRoot,
  TitleBarTitle,
} from "@/components/ui/title-bar";

type DiffLineType = "added" | "removed" | "context";

interface DiffLineData {
  type: DiffLineType;
  content: string;
}

interface SuggestedFixProps {
  suggestedFix: string;
  originalCode: string;
  language: string;
}

function computeDiffLines(original: string, suggested: string): DiffLineData[] {
  const originalLines = original.split("\n");
  const suggestedLines = suggested.split("\n");
  const lines: DiffLineData[] = [];

  const maxLen = Math.max(originalLines.length, suggestedLines.length);

  for (let i = 0; i < maxLen; i++) {
    const orig = originalLines[i];
    const sugg = suggestedLines[i];

    if (orig === sugg) {
      lines.push({ type: "context", content: orig ?? "" });
    } else {
      if (orig !== undefined) {
        lines.push({ type: "removed", content: orig });
      }
      if (sugg !== undefined) {
        lines.push({ type: "added", content: sugg });
      }
    }
  }

  return lines;
}

export function SuggestedFix({
  suggestedFix,
  originalCode,
  language,
}: SuggestedFixProps) {
  const [copied, setCopied] = useState(false);

  const diffLines = computeDiffLines(originalCode, suggestedFix);
  const suggestedFixLines = suggestedFix.split("\n").length;
  const suggestedFixChars = suggestedFix.length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(suggestedFix);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h2 className="text-subtitle">suggested fix</h2>
        </div>
        <p className="text-comment">{"// como deveria ser feito"}</p>
      </div>

      <TitleBarRoot>
        <TitleBarHeader className="justify-between relative">
          <TitleBarTitle>
            your_code.{language} → improved_code.{language}
          </TitleBarTitle>
          <TitleBarControls />
        </TitleBarHeader>
        <DiffLineContainer>
          {diffLines.map((line, i) => (
            <DiffLine key={`diff-${i.toString()}`} type={line.type}>
              {line.content}
            </DiffLine>
          ))}
        </DiffLineContainer>
        <div className="flex justify-between items-center px-3 py-1.5 bg-[#2a2a2a] border-t border-[#555555]">
          <span className="text-[#a3a3a3] text-xs">
            {suggestedFixLines} linhas · {suggestedFixChars} caracteres
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs text-[#a3a3a3] hover:text-[#c8ff00] transition-colors cursor-pointer"
          >
            {copied ? "✓ copiado" : "📋 copiar"}
          </button>
        </div>
      </TitleBarRoot>
    </section>
  );
}
