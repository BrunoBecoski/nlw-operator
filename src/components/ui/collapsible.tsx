"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const collapsible = tv({
  base: "",
});

export interface CollapsibleProps
  extends CollapsiblePrimitive.CollapsibleProps {}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <CollapsiblePrimitive.Root
        ref={ref}
        className={collapsible({ className })}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Root>
    );
  },
);

Collapsible.displayName = "Collapsible";

const collapsibleTrigger = tv({
  base: "cursor-pointer select-none flex items-center justify-center",
});

export interface CollapsibleTriggerProps
  extends CollapsiblePrimitive.CollapsibleTriggerProps {}

export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      className={collapsibleTrigger({ className })}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Trigger>
  );
});

CollapsibleTrigger.displayName = "CollapsibleTrigger";

const collapsibleContent = tv({
  base: "overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",
});

export interface CollapsibleContentProps
  extends CollapsiblePrimitive.CollapsibleContentProps {}

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={collapsibleContent({ className })}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Content>
  );
});

CollapsibleContent.displayName = "CollapsibleContent";
