import Link from "next/link";
import { tv } from "tailwind-variants";

const navbar = tv({
  base: "flex items-center justify-between h-10 px-4 bg-bg-surface border-b-2 border-border-primary",
});

const logo = tv({
  base: "flex items-center gap-2 cursor-pointer",
});

const navLink = tv({
  base: "font-mono text-xs font-bold uppercase text-text-secondary hover:text-text-primary transition-colors px-3 py-1 hover:bg-bg-input rounded",
});

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Navbar({ className, ...props }: NavbarProps) {
  return (
    <nav className={`${navbar({ className })} navbar-xp-bar`} {...props}>
      <Link href="/" className={logo()}>
        <span
          className="text-xl text-accent-green"
          role="img"
          aria-label="Radiation symbol"
        >
          ☢️
        </span>
        <span className="font-mono text-sm font-medium text-text-primary">
          devroast
        </span>
      </Link>
      <Link href="/leaderboard" className={navLink()}>
        leaderboard
      </Link>
    </nav>
  );
}
