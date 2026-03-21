import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap font-mono font-bold uppercase px-6 py-2 cursor-pointer transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 rounded-sm",
  variants: {
    variant: {
      hazmat: `
        bg-accent-green text-black
        border-2 border-t-accent-green-light border-l-accent-green-light border-r-accent-green-dark border-b-accent-green-dark
        hover:brightness-110
        active:border-t-accent-green-dark active:border-l-accent-green-dark active:border-r-accent-green-light active:border-b-accent-green-light
      `,
      outline: `
        bg-transparent text-accent-green
        border-2 border-t-accent-green-light border-l-accent-green-light border-r-accent-green-dark border-b-accent-green-dark
        hover:bg-accent-green/10
        active:border-t-accent-green-dark active:border-l-accent-green-dark active:border-r-accent-green-light active:border-b-accent-green-light
      `,
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
