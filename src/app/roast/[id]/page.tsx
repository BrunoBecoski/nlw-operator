import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CodeBlockContent,
  CodeBlockDots,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockRoot,
} from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import { ScoreRing } from "@/components/ui/score-ring";

const mockSubmittedCode = `function calculateTotal(items) {
  return items.reduce((a, b) => a + b.price, 0);
}`;

const mockDiffLines = [
  {
    type: "context" as const,
    lineNumber: "1",
    content: "function calculateTotal(items) {",
  },
  {
    type: "removed" as const,
    lineNumber: "2",
    content: "  return items.reduce((a, b) => a + b.price, 0);",
  },
  {
    type: "added" as const,
    lineNumber: "2",
    content: "  return items.reduce((acc, item) => acc + item.price, 0);",
  },
  { type: "context" as const, lineNumber: "3", content: "}" },
];

const mockIssues = [
  {
    title: "Confusing variable names",
    description:
      "'a' and 'b' are not descriptive. Use meaningful names like 'acc' and 'item'.",
    severity: "warning" as const,
  },
  {
    title: "Missing type safety",
    description:
      "Consider adding TypeScript types for the items array and return type.",
    severity: "critical" as const,
  },
  {
    title: "No null check",
    description: "If items is null or undefined, this will throw an error.",
    severity: "warning" as const,
  },
  {
    title: "Consider arrow function syntax",
    description:
      "Could be simplified to: items?.reduce((acc, { price }) => acc + price, 0) ?? 0",
    severity: "good" as const,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Roast #${id.slice(0, 8)} | DevRoast`,
    description: "Get brutally honest feedback on your code",
  };
}

export default async function RoastResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Navbar */}
      <header className="flex items-center justify-between h-14 px-10 border-b border-border-primary">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-accent-green">
            &gt;
          </span>
          <span className="font-mono text-lg font-medium text-text-primary">
            devroast
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/leaderboard"
            className="font-mono text-sm text-text-secondary hover:text-text-primary"
          >
            leaderboard
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-20 py-10 flex flex-col gap-10">
        {/* Score Hero */}
        <section className="flex gap-12">
          <ScoreRing score={3.5} maxScore={10} showDenominator />
          <div className="flex flex-col gap-4 flex-1">
            <Badge status="needs_serious_help">
              verdict: needs_serious_help
            </Badge>
            <h1 className="font-mono text-xl text-text-primary leading-relaxed">
              &quot;this code looks like it was written during a power outage...
              in 2005.&quot;
            </h1>
            <div className="flex items-center gap-4 text-text-tertiary font-mono text-xs">
              <span>lang: javascript</span>
              <span>·</span>
              <span>7 lines</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                share
              </Button>
              <Button variant="outline" size="sm">
                roast again
              </Button>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-border-primary" />

        {/* Submitted Code Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {"//"}
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              your_submission
            </span>
          </div>
          <CodeBlockRoot>
            <CodeBlockHeader>
              <CodeBlockDots />
              <CodeBlockFilename lang="js" />
            </CodeBlockHeader>
            <div className="flex">
              <div className="flex flex-col py-3 pr-3 pl-4 border-r border-border-primary font-mono text-xs text-text-tertiary text-right select-none">
                {mockSubmittedCode.split("\n").map((_, idx) => {
                  const lineNum = idx + 1;
                  return <span key={`ln-${lineNum}`}>{lineNum}</span>;
                })}
              </div>
              <div className="flex-1">
                <CodeBlockContent code={mockSubmittedCode} lang="javascript" />
              </div>
            </div>
          </CodeBlockRoot>
        </section>

        {/* Divider */}
        <div className="h-px bg-border-primary" />

        {/* Analysis Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {"//"}
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              detailed_analysis
            </span>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {mockIssues.map((issue) => (
              <div
                key={issue.title}
                className="flex flex-col gap-3 p-5 border border-border-primary rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Badge status={issue.severity}>{issue.severity}</Badge>
                  <h3 className="font-mono text-sm font-medium text-text-primary">
                    {issue.title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-text-secondary">
                  {issue.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-border-primary" />

        {/* Suggested Fix Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              {"//"}
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              suggested_fix
            </span>
          </div>
          <div className="border border-border-primary rounded-md overflow-hidden">
            <div className="flex items-center h-10 px-4 border-b border-border-primary">
              <span className="font-mono text-xs text-text-secondary">
                your_code.js → improved_code.js
              </span>
            </div>
            <div className="bg-bg-input">
              {mockDiffLines.map((line) => (
                <DiffLine
                  key={line.lineNumber}
                  type={line.type}
                  lineNumber={line.lineNumber}
                >
                  {line.content}
                </DiffLine>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
