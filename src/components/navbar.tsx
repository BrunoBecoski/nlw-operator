import Link from "next/link";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Navbar({ className, ...props }: NavbarProps) {
  return (
    <nav
      className={`flex items-center justify-between h-12 px-4 bg-hazmat-primary ${className ?? ""} xp-border-bottom`}
      {...props}
    >
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <span
          className="text-xl text-black"
          role="img"
          aria-label="Radiation symbol"
        >
          ☢️
        </span>
        <span className="font-mono text-sm font-black text-black bg-[#f0c000]">
          devroast
        </span>
      </Link>
      <Link
        href="/leaderboard"
        className="font-mono text-xs font-bold uppercase text-black hover:text-text-primary transition-colors px-3 py-1 hover:bg-[#3a3a3a]"
      >
        leaderboard
      </Link>
    </nav>
  );
}
