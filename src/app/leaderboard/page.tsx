import { LeaderboardTableWithData } from "@/components/leaderboard-table-with-data";
import { StatsBarWithData } from "@/components/stats-bar-with-data";

export const revalidate = 3600;

export const metadata = {
  title: "Shame Leaderboard | DevRoast",
  description: "The most roasted code on the internet",
};

export default function LeaderboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-20 py-10 flex flex-col gap-10">
      {/* Hero Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-3xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h1 className="font-mono text-3xl font-bold text-text-primary">
            shame_leaderboard
          </h1>
        </div>
        <p className="font-mono text-sm text-text-secondary">
          {"// the most roasted code on the internet"}
        </p>
        <StatsBarWithData />
      </section>

      {/* Leaderboard Table */}
      <section className="flex flex-col gap-5">
        <LeaderboardTableWithData />
      </section>
    </div>
  );
}
