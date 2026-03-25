import * as TogglePrimitive from "@radix-ui/react-toggle";
import type { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const toggleRoot = tv({
  base: "inline-flex items-center gap-3 transition-colors cursor-pointer",
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
  base: "relative flex h-[24px] w-[48px] bg-bg-input",
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
    <div
      className={`${toggleTrack({ className })} toggle-track ${pressed ? "checked" : ""}`}
      {...props}
    />
  );
}

const toggleKnob = tv({
  base: "absolute top-[3px] left-[3px] h-[14px] w-[14px] bg-bg-surface transition-all duration-100",
  variants: {
    checked: {
      true: "translate-x-[24px]",
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
    <div
      className={`${toggleKnob({ className, checked: pressed })} toggle-knob ${pressed ? "checked" : ""}`}
      {...props}
    />
  );
}

const toggleLabel = tv({
  base: "text-xs font-mono font-bold uppercase transition-colors text-text-secondary",
  variants: {
    checked: {
      true: "text-hazmat-primary",
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
      <ToggleTrack pressed={pressed}>
        <ToggleKnob pressed={pressed} />
      </ToggleTrack>
      {labelText && <ToggleLabel pressed={pressed}>{labelText}</ToggleLabel>}
    </ToggleRoot>
  );
}
