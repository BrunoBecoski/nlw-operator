import Link from "next/link";
import {
  type LeaderboardItem,
  LeaderboardTable,
} from "@/components/ui/leaderboard-table";

const mockLeaderboardEntries: LeaderboardItem[] = [
  {
    rank: 1,
    code: "function calculateTotal(items) { return items.reduce((a, b) => a + b.price, 0); }",
    score: 1,
  },
  {
    rank: 2,
    code: "const result = arr.map(x => x * 2).filter(x => x > 10);",
    score: 2,
  },
  {
    rank: 3,
    code: "for(var i=0; i<len; i++) { console.log(arr[i]); }",
    score: 3,
  },
  {
    rank: 4,
    code: "if (x == true) { return true; } else { return false; }",
    score: 4,
  },
  {
    rank: 5,
    code: "const arr = new Array(); arr.push(...args);",
    score: 5,
  },
];

export const metadata = {
  title: "Shame Leaderboard | DevRoast",
  description: "The most roasted code on the internet",
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-bg-page">
      {/* Navbar */}
      <header className="flex items-center justify-between h-14 px-10 border-b border-border-primary">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-accent-green">
            &gt;
          </span>
          <span className="font-mono text-lg font-medium text-text-primary">
            devroast
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="/leaderboard"
            className="font-mono text-sm text-text-primary"
          >
            leaderboard
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-20 py-10 flex flex-col gap-10">
        {/* Hero Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-3xl font-bold text-accent-green">
              &gt;
            </span>
            <h1 className="font-mono text-3xl font-bold text-text-primary">
              shame_leaderboard
            </h1>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            {"// the most roasted code on the internet"}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-tertiary">
              2,847 submissions
            </span>
            <span className="font-mono text-xs text-text-tertiary">·</span>
            <span className="font-mono text-xs text-text-tertiary">
              avg score: 4.2/10
            </span>
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="flex flex-col gap-5">
          <LeaderboardTable
            items={mockLeaderboardEntries}
            maxScore={10}
            totalCount={2847}
            showDenominator={false}
          />
        </section>
      </main>
    </div>
  );
}
