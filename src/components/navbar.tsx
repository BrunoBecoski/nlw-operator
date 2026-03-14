import Link from "next/link";
import { tv } from "tailwind-variants";

const navbar = tv({
  base: "flex items-center justify-between h-14 px-10 border-b border-border-primary bg-bg-page",
});

const logo = tv({
  base: "flex items-center gap-2",
});

const navLink = tv({
  base: "font-mono text-sm text-text-secondary hover:text-text-primary transition-colors",
});

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Navbar({ className, ...props }: NavbarProps) {
  return (
    <nav className={navbar({ className })} {...props}>
      <div className={logo()}>
        <span className="font-mono text-xl font-bold text-accent-green">
          &gt;
        </span>
        <span className="font-mono text-lg font-medium text-text-primary">
          devroast
        </span>
      </div>
      <Link href="/leaderboard" className={navLink()}>
        leaderboard
      </Link>
    </nav>
  );
}
