import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { CodeShell } from "@/components/ui/code-shell";
import { DiffLine } from "@/components/ui/diff-line";
import { RadiationDial } from "@/components/ui/radiation-dial";
import { caller } from "@/trpc/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const callerInstance = await caller();
  const roast = await callerInstance.roast.getById({ id });

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
  needs_serious_help: "needs_serious_help" as const,
  rough_around_edges: "critical" as const,
  decent_code: "warning" as const,
  solid_work: "good" as const,
  exceptional: "good" as const,
};

type DiffLineType = "added" | "removed" | "context";

function computeDiffLines(
  original: string,
  suggested: string,
): Array<{ type: DiffLineType; content: string }> {
  const originalLines = original.split("\n");
  const suggestedLines = suggested.split("\n");
  const lines: Array<{ type: DiffLineType; content: string }> = [];

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

export default async function RoastResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trpcCaller = await caller();
  const roast = await trpcCaller.roast.getById({ id });

  const badgeStatus = verdictToBadgeStatus[roast.verdict];
  const diffLines = roast.suggestedFix
    ? computeDiffLines(roast.code, roast.suggestedFix)
    : [];

  return (
    <main className="flex flex-col w-full">
      <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto px-10 md:px-20 py-10">
        {/* Score Hero */}
        <section className="flex items-center gap-12">
          <RadiationDial score={roast.score} maxScore={10} />

          <div className="flex flex-col gap-4 flex-1">
            <Badge status={badgeStatus}>verdict: {roast.verdict}</Badge>

            <p className="font-mono text-xl leading-relaxed text-text-primary">
              {roast.roastQuote
                ? `"${roast.roastQuote}"`
                : "No quote available."}
            </p>

            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-text-tertiary">
                lang: {roast.language}
              </span>
              <span className="font-mono text-xs text-text-tertiary">
                {"·"}
              </span>
              <span className="font-mono text-xs text-text-tertiary">
                {roast.lineCount} lines
              </span>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-border-primary" />

        {/* Submitted Code Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-sm font-bold text-text-primary">
              your_submission
            </h2>
          </div>

          <CodeShell
            value={roast.code}
            language={roast.language}
            score={roast.score}
            showScore
          />
        </section>

        {/* Divider */}
        <hr className="border-border-primary" />

        {/* Detailed Analysis Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {"//"}
            </span>
            <h2 className="font-mono text-sm font-bold text-text-primary">
              detailed_analysis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roast.analysisItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 p-5 border border-border-primary rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Badge status={item.severity}>{item.severity}</Badge>
                  <h3 className="font-mono text-sm font-medium text-text-primary">
                    {item.title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Suggested Fix Section */}
        {diffLines.length > 0 && (
          <>
            {/* Divider */}
            <hr className="border-border-primary" />

            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-accent-green">
                  {"//"}
                </span>
                <h2 className="font-mono text-sm font-bold text-text-primary">
                  suggested_fix
                </h2>
              </div>

              <div className="border border-border-primary bg-bg-input overflow-hidden">
                {/* Diff Header */}
                <div className="flex items-center gap-2 h-10 px-4 border-b border-border-primary">
                  <span className="font-mono text-xs font-medium text-text-secondary">
                    your_code.{roast.language} → improved_code.{roast.language}
                  </span>
                </div>

                {/* Diff Body */}
                <div className="flex flex-col py-1">
                  {diffLines.map((line, i) => (
                    <DiffLine key={`diff-${i.toString()}`} type={line.type}>
                      {line.content}
                    </DiffLine>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
