"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ShameLeaderboard from "@/components/shame-leaderboard";
import StatsBar from "@/components/stats-bar";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import { Toggle } from "@/components/ui/toggle";
import { useLanguageDetection } from "@/hooks/use-language-detection";
import { useTRPC } from "@/trpc/client";

export default function Home() {
  const [code, setCode] = useState("");
  const [roastMode, setRoastMode] = useState(true);
  const [manualLanguage, setManualLanguage] = useState<string | null>(null);
  const { detectedLanguage } = useLanguageDetection(code);

  const resolvedLanguage = manualLanguage ?? detectedLanguage ?? "javascript";

  const router = useRouter();
  const trpc = useTRPC();
  const createRoast = useMutation(
    trpc.roast.create.mutationOptions({
      onSuccess(data) {
        router.push(`/roast/${data.id}`);
      },
    }),
  );

  const isDisabled = code.trim().length === 0 || createRoast.isPending;

  return (
    <div className="w-full max-w-4xl mx-auto px-10 py-16 flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-4xl font-bold text-accent-green">
            &gt;
          </span>
          <h1 className="font-mono text-4xl font-bold text-text-primary">
            paste your code. get roasted.
          </h1>
        </div>
        <p className="font-mono text-sm text-text-secondary">
          {
            "// drop your code below and we'll rate it — brutally honest or full roast mode"
          }
        </p>
      </section>

      {/* Code Editor */}
      <CodeEditor
        value={code}
        onChange={setCode}
        language={resolvedLanguage as any}
        onLanguageChange={setManualLanguage}
      />

      {/* Actions Bar */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Toggle
            pressed={roastMode}
            onPressedChange={setRoastMode}
            label="roast mode"
          />
          <span className="font-mono text-xs text-text-tertiary">
            {"// maximum sarcasm enabled"}
          </span>
        </div>
        <Button
          disabled={isDisabled}
          onClick={() =>
            createRoast.mutate({
              code,
              language: resolvedLanguage,
              roastMode,
            })
          }
        >
          {createRoast.isPending ? "$ roasting..." : "$ roast_my_code"}
        </Button>
      </section>

      {/* Footer Stats */}
      <StatsBar />

      {/* Leaderboard Preview */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-lg font-medium text-text-primary">
            Top 3
          </h2>
          <a
            href="/leaderboard"
            className="font-mono text-sm text-text-secondary hover:text-text-primary px-3 py-1.5 border border-border-primary rounded-md transition-colors"
          >
            view all &gt;&gt;
          </a>
        </div>
        <p className="font-mono text-xs text-text-tertiary">
          {"// the worst code on the internet, ranked by shame"}
        </p>

        <ShameLeaderboard />
      </section>

      {/* Bottom Spacer */}
      <div className="h-16" />
    </div>
  );
}
