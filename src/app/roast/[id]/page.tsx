import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CodeShell } from "@/components/ui/code-shell";
import { RadiationDial } from "@/components/ui/radiation-dial";
import {
  TitleBarControls,
  TitleBarHeader,
  TitleBarLanguage,
  TitleBarRoot,
  TitleBarScore,
} from "@/components/ui/title-bar";
import { caller } from "@/trpc/server";
import { SuggestedFix } from "./suggested-fix";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const callerInstance = await caller();

  let roast: Awaited<ReturnType<typeof callerInstance.roast.getById>> | null =
    null;
  try {
    roast = await callerInstance.roast.getById({ id });
  } catch {
    return { title: "DevRoast" };
  }

  if (!roast) {
    return { title: "DevRoast" };
  }

  const title = `${roast.score}/10 — ${roast.language} Roast — DevRoast`;
  const description =
    roast.roastQuote ?? "See how your code scored on DevRoast.";

  return {
    title,
    description,
    openGraph: {
      title: `${roast.score}/10 — ${roast.language} Roast`,
      description,
      images: [
        {
          url: `/roast/${id}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${roast.score}/10 — ${roast.language} Roast`,
      description,
    },
  };
}

const verdictToBadgeStatus = {
  critical_contamination: "critical" as const,
  moderate_radiation: "critical" as const,
  containment_achieved: "warning" as const,
  low_radiation: "good" as const,
  radiation_free: "good" as const,
};

const severityToColor: Record<string, "red" | "orange" | "green"> = {
  critical_contamination: "red",
  critical: "red",
  warning: "orange",
  good: "green",
};

const getScoreColor = (score: number): "red" | "orange" | "green" => {
  if (score < 3.3) return "red";
  if (score < 6.6) return "orange";
  return "green";
};

export default async function RoastResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trpcCaller = await caller();

  let roast: Awaited<ReturnType<typeof trpcCaller.roast.getById>> | null = null;
  try {
    roast = await trpcCaller.roast.getById({ id });
  } catch {
    redirect("/");
  }

  if (!roast) {
    redirect("/");
  }

  const badgeStatus = verdictToBadgeStatus[roast.verdict];

  return (
    <main className="flex flex-col w-full">
      <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto px-10 py-16">
        {/* Score Hero */}
        <section className="flex items-center justify-center gap-12">
          <RadiationDial score={roast.score} maxScore={10} />

          <TitleBarRoot color={getScoreColor(roast.score)} className="flex-1">
            <TitleBarHeader
              color={getScoreColor(roast.score)}
              className="justify-between"
            >
              <Badge status={badgeStatus}>verdict: {roast.verdict}</Badge>
              <TitleBarControls />
            </TitleBarHeader>
            <div className="p-4 flex flex-col gap-4">
              <p className="text-subtitle">
                {roast.roastQuote
                  ? `"${roast.roastQuote}"`
                  : "No quote available."}
              </p>

              <div className="flex items-center gap-4 text-stats">
                <span>lang: {roast.language}</span>
                <span>{"·"}</span>
                <span>{roast.lineCount} lines</span>
              </div>
            </div>
          </TitleBarRoot>
        </section>

        {/* Divider */}
        <hr className="border-border-primary" />

        {/* Submitted Code Section */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-hazmat-primary">
                &gt;
              </span>
              <h2 className="text-subtitle">your submission</h2>
            </div>
            <p className="text-comment">
              {"// o código que você enviou para ser roastado"}
            </p>
          </div>

          <TitleBarRoot color={getScoreColor(roast.score)}>
            <TitleBarHeader
              color={getScoreColor(roast.score)}
              className="justify-between relative"
            >
              <TitleBarScore score={roast.score} />
              <div className="absolute left-1/2 -translate-x-1/2">
                <TitleBarLanguage>{roast.language}</TitleBarLanguage>
              </div>
              <TitleBarControls />
            </TitleBarHeader>
            <CodeShell value={roast.code} language={roast.language} />
          </TitleBarRoot>
        </section>

        {/* Divider */}
        <hr className="border-border-primary" />

        {/* Detailed Analysis Section */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-hazmat-primary">
                &gt;
              </span>
              <h2 className="text-subtitle">detailed analysis</h2>
            </div>
            <p className="text-comment">{"// onde você errou feio"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roast.analysisItems.map((item) => {
              const color = severityToColor[item.severity] ?? "orange";
              return (
                <TitleBarRoot key={item.id} color={color}>
                  <TitleBarHeader color={color} className="justify-between">
                    <Badge status={item.severity}>{item.severity}</Badge>
                    <TitleBarControls />
                  </TitleBarHeader>
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="font-mono text-sm font-medium text-text-primary">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </TitleBarRoot>
              );
            })}
          </div>
        </section>

        {/* Suggested Fix Section */}
        {roast.suggestedFix && (
          <>
            {/* Divider */}
            <hr className="border-border-primary" />

            <SuggestedFix
              suggestedFix={roast.suggestedFix}
              originalCode={roast.code}
              language={roast.language}
            />
          </>
        )}
      </div>
    </main>
  );
}
