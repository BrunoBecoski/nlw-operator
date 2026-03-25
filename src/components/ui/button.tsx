import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap font-mono font-bold uppercase px-6 py-2 cursor-pointer transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 rounded-sm",
  variants: {
    variant: {
      hazmat: `
        bg-hazmat-primary text-black
        border-2 border-t-hazmat-light border-l-hazmat-light border-r-hazmat-dark border-b-hazmat-dark
        hover:brightness-110
        active:border-t-hazmat-dark active:border-l-hazmat-dark active:border-r-hazmat-light active:border-b-hazmat-light
      `,
      outline: `
        bg-transparent text-hazmat-primary
        border-2 border-t-hazmat-light border-l-hazmat-light border-r-hazmat-dark border-b-hazmat-dark
        hover:bg-hazmat-primary/10
        active:border-t-hazmat-dark active:border-l-hazmat-dark active:border-r-hazmat-light active:border-b-hazmat-light
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
