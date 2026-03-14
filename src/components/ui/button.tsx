import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-accent-green text-black hover:bg-accent-green/90",
      destructive: "bg-accent-red text-white hover:bg-accent-red/90",
      outline:
        "border border-border-primary bg-white text-text-secondary hover:bg-bg-surface",
      secondary: "bg-bg-surface text-text-primary hover:bg-border-primary",
      ghost: "hover:bg-bg-surface text-text-secondary",
      link: "text-accent-green underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-6 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={button({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, button };
