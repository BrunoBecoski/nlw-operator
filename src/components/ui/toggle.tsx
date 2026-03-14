import * as TogglePrimitive from "@radix-ui/react-toggle";
import type { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const toggleRoot = tv({
  base: "inline-flex items-center gap-3 transition-colors",
});

export interface ToggleRootProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "pressed"> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export function ToggleRoot({
  className,
  children,
  pressed = false,
  onPressedChange,
  ...props
}: ToggleRootProps) {
  return (
    <TogglePrimitive.Root
      pressed={pressed}
      onPressedChange={onPressedChange}
      className={toggleRoot({ className })}
      {...props}
    >
      {children}
    </TogglePrimitive.Root>
  );
}

const toggleTrack = tv({
  base: "relative flex h-[22px] w-[40px] items-center rounded-full p-[3px] transition-colors bg-border-primary",
  variants: {
    checked: {
      true: "bg-accent-green",
    },
  },
});

export interface ToggleTrackProps extends React.HTMLAttributes<HTMLDivElement> {
  pressed?: boolean;
}

export function ToggleTrack({
  className,
  pressed = false,
  ...props
}: ToggleTrackProps) {
  return (
    <div className={toggleTrack({ className, checked: pressed })} {...props} />
  );
}

const toggleKnob = tv({
  base: "h-4 w-4 rounded-full bg-white shadow-sm transition-transform translate-x-0",
  variants: {
    checked: {
      true: "translate-x-[18px]",
    },
  },
});

export interface ToggleKnobProps extends React.HTMLAttributes<HTMLDivElement> {
  pressed?: boolean;
}

export function ToggleKnob({
  className,
  pressed = false,
  ...props
}: ToggleKnobProps) {
  return (
    <div className={toggleKnob({ className, checked: pressed })} {...props} />
  );
}

const toggleLabel = tv({
  base: "text-xs font-mono transition-colors text-text-secondary",
  variants: {
    checked: {
      true: "text-accent-green",
    },
  },
});

export interface ToggleLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  pressed?: boolean;
}

export function ToggleLabel({
  className,
  pressed = false,
  children,
  ...props
}: ToggleLabelProps) {
  return (
    <span className={toggleLabel({ className, checked: pressed })} {...props}>
      {children}
    </span>
  );
}

export { toggleRoot };

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "pressed"> {
  label?: string;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export function Toggle({
  className,
  label: labelText,
  pressed = false,
  onPressedChange,
  ...props
}: ToggleProps) {
  return (
    <ToggleRoot
      pressed={pressed}
      onPressedChange={onPressedChange}
      className={className}
      {...props}
    >
      <ToggleTrack pressed={pressed} />
      <ToggleKnob pressed={pressed} />
      {labelText && <ToggleLabel pressed={pressed}>{labelText}</ToggleLabel>}
    </ToggleRoot>
  );
}
