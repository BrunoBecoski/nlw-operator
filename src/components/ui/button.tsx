import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap font-mono font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider text-xs cursor-pointer h-10 px-6 py-2 rounded-md",
  variants: {
    variant: {
      hazmat:
        "bg-accent-green text-black border border-accent-green/50 hover:shadow-[0_0_15px_var(--color-accent-green)] active:scale-95 focus-visible:ring-accent-green",
      outline:
        "bg-transparent text-accent-green border-2 border-accent-green hover:shadow-[0_0_15px_var(--color-accent-green)] hover:bg-accent-green/10 active:scale-95 focus-visible:ring-accent-green",
    },
  },
  defaultVariants: {
    variant: "hazmat",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button className={button({ variant, className })} ref={ref} {...props} />
    );
  },
);

Button.displayName = "Button";

export { Button, button };
