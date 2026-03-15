"use client";

import { useState } from "react";
import ShameLeaderboard from "@/components/shame-leaderboard";
import StatsBar from "@/components/stats-bar";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import { Toggle } from "@/components/ui/toggle";

export default function Home() {
  const [roastMode, setRoastMode] = useState(false);
  const [code, setCode] = useState("");

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
      <CodeEditor value={code} onChange={setCode} />

      {/* Actions Bar */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Toggle
            label="roast mode"
            pressed={roastMode}
            onPressedChange={setRoastMode}
          />
          <span className="font-mono text-xs text-text-tertiary">
            {"// maximum sarcasm enabled"}
          </span>
        </div>
        <Button>$ roast_my_code</Button>
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
