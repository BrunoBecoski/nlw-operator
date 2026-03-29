"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ShameLeaderboard from "@/components/shame-leaderboard";
import StatsBar from "@/components/stats-bar";
import { Button } from "@/components/ui/button";
import { CodeShell } from "@/components/ui/code-shell";
import {
  TitleBarControls,
  TitleBarHeader,
  TitleBarLanguageSelect,
  TitleBarRoot,
} from "@/components/ui/title-bar";
import { Toggle } from "@/components/ui/toggle";
import { useLanguageDetection } from "@/hooks/use-language-detection";
import { useTRPC } from "@/trpc/client";

const MAX_CHARS = 2000;

export default function Home() {
  const [code, setCode] = useState("");
  const [roastMode, setRoastMode] = useState(true);
  const [manualLanguage, setManualLanguage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { detectedLanguage } = useLanguageDetection(code);

  const resolvedLanguage = manualLanguage ?? detectedLanguage ?? "javascript";

  const router = useRouter();
  const trpc = useTRPC();
  const createRoast = useMutation(
    trpc.roast.create.mutationOptions({
      onSuccess(data) {
        setErrorMessage(null);
        router.push(`/roast/${data.id}`);
      },
      onError: (error) => {
        if (error.data?.code === "TOO_MANY_REQUESTS") {
          setErrorMessage("API quota exceeded. Please try again later.");
        } else {
          setErrorMessage(error.message || "Something went wrong. Try again.");
        }
      },
    }),
  );

  const isDisabled =
    code.trim().length === 0 ||
    createRoast.isPending ||
    code.length > MAX_CHARS;

  return (
    <div className="w-full max-w-4xl mx-auto px-10 py-16 flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-4xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h1 className="text-title">paste your code. get roasted.</h1>
        </div>
        <p className="text-comment">
          {
            "// cole seu código abaixo e nós vamos avaliar — honestamente brutal ou modo roast completo"
          }
        </p>
      </section>

      {/* Code Editor */}
      <div className="relative">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
          <TitleBarLanguageSelect
            value={resolvedLanguage}
            onChange={setManualLanguage}
            detectedLanguage={detectedLanguage}
          />
        </div>
        <TitleBarRoot>
          <TitleBarHeader className="justify-end relative">
            <TitleBarControls />
          </TitleBarHeader>
          <CodeShell
            value={code}
            onChange={setCode}
            language={resolvedLanguage}
            onLanguageChange={setManualLanguage}
            detectedLanguage={detectedLanguage}
            editable
            maxChars={MAX_CHARS}
          />
        </TitleBarRoot>
      </div>

      {/* Actions Bar */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Toggle
            pressed={roastMode}
            onPressedChange={setRoastMode}
            label="roast mode"
          />
          <span className="text-comment">{"// sarcasmo máximo ativado"}</span>
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
          {createRoast.isPending ? "$ roasting..." : "roast my code"}
        </Button>
      </section>

      {/* Error Message */}
      {errorMessage && (
        <section className="p-4 bg-accent-red/10 border border-accent-red rounded-sm">
          <p className="font-mono text-sm text-accent-red">
            ERROR: {errorMessage}
          </p>
        </section>
      )}

      {/* Footer Stats */}
      <hr className="border-border-primary" />
      <StatsBar />
      <hr className="border-border-primary" />

      {/* Leaderboard Preview */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-4xl font-bold text-hazmat-primary">
            Top 3
          </h2>
          <Link
            href="/leaderboard"
            className="inline-flex items-center justify-center whitespace-nowrap font-mono font-bold uppercase px-6 py-2 cursor-pointer transition-all duration-100 bg-transparent text-hazmat-primary border-2 border-t-hazmat-light border-l-hazmat-light border-r-hazmat-dark border-b-hazmat-dark hover:bg-hazmat-primary/10 rounded-sm"
          >
            leaderboard &gt;&gt;
          </Link>
        </div>
        <p className="text-comment">
          {"// o pior código da internet, rankeado por roasted"}
        </p>

        <ShameLeaderboard />
      </section>

      {/* Bottom Spacer */}
      <div className="h-16" />
    </div>
  );
}
