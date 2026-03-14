import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv } from "tailwind-variants";

const toggle = tv({
  base: "inline-flex items-center gap-3 transition-colors",
});

const track = tv({
  base: "relative flex h-[22px] w-[40px] items-center rounded-full p-[3px] transition-colors",
  variants: {
    pressed: {
      true: "bg-accent-green",
      false: "bg-border-primary",
    },
  },
});

const knob = tv({
  base: "h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
  variants: {
    pressed: {
      true: "translate-x-[18px]",
      false: "translate-x-0",
    },
  },
});

const label = tv({
  base: "text-xs font-mono transition-colors",
  variants: {
    pressed: {
      true: "text-accent-green",
      false: "text-text-secondary",
    },
  },
});

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "pressed"> {
  label?: string;
  pressed?: boolean;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, label: labelText, pressed = false, ...props }, ref) => {
    return (
      <TogglePrimitive.Root
        ref={ref}
        pressed={pressed}
        className={toggle({ className })}
        {...props}
      >
        <div className={track({ pressed })}>
          <div className={knob({ pressed })} />
        </div>
        {labelText && <span className={label({ pressed })}>{labelText}</span>}
      </TogglePrimitive.Root>
    );
  },
);

Toggle.displayName = "Toggle";

export { Toggle };
