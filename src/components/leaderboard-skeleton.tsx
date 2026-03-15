export function LeaderboardSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col border border-border-primary rounded-md overflow-hidden"
        >
          <div className="flex items-center justify-between h-12 px-5 border-b border-border-primary bg-bg-surface">
            <div className="h-4 w-8 animate-pulse rounded bg-bg-input" />
            <div className="h-10 w-10 animate-pulse rounded-full bg-bg-input" />
          </div>
          <div className="p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-bg-input mb-2" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-bg-input" />
          </div>
        </div>
      ))}
      <div className="h-4 w-48 mx-auto animate-pulse rounded bg-bg-input" />
    </div>
  );
}
