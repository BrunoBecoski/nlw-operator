# Padrões de Componentes UI

## Visão Geral

Todos os componentes de UI devem ser criados na pasta `src/components/ui/` seguindo os padrões descritos abaixo.

## Estrutura de Arquivos

Cada componente deve ter seu próprio arquivo, por exemplo:
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`

## Padrões Obrigatórios

### 1. Named Exports

Sempre use **named exports**, nunca default exports.

```tsx
// ✅ Correto
export interface ButtonProps { ... }
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...)

// ❌ Errado
export default function Button() { ... }
```

### 2. Extensão de Props Nativas

Extenda as propriedades nativas do elemento HTML correspondente usando `HTMLAttributes`:

```tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}
```

### 3. Uso do forwardRef

Todos os componentes interativos devem usar `forwardRef` para permitir referências:

```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button ref={ref} {...props} />;
  }
);

Button.displayName = "Button";
```

### 4. Variantes com tailwind-variants

Use `tailwind-variants` (tv) para criar variantes de componentes. Não use `twMerge` manualmente - o `tv` faz o merge automaticamente.

```tsx
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "classes base compartilhadas",
  variants: {
    variant: {
      default: "classes para variante default",
      outline: "classes para variante outline",
    },
    size: {
      sm: "classes para tamanho small",
      md: "classes para tamanho medium",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// Uso no componente
className={button({ variant, size, className })}
```

### 5. Props de Interface

Exporte a interface de props com `export interface` para permitir extensão:

```tsx
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}
```

### 6. Função tv Exportada

Exporte a função de variantes para permitir uso externo:

```tsx
export { Button, button }; // button = função tv
```

## Exemplo Completo

```tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  variants: {
    variant: {
      default: "bg-green-500 text-white hover:bg-green-600",
      outline: "border border-gray-300 bg-white hover:bg-gray-100",
    },
    size: {
      sm: "h-8 px-3 text-xs",
      md: "h-9 px-4 py-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
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
```

## Criando Novos Componentes

1. Crie o arquivo em `src/components/ui/[nome].tsx`
2. Siga os padrões acima
3. Adicione exemplo na página de demo em `src/app/components-demo/page.tsx`

---

## Padrões de Componentes de Features

### Visão Geral

Componentes de features (não genéricos de UI) podem usar outros padrões conforme a necessidade.

### Client Components com NumberFlow

Para componentes que precisam de animação de números, use `@number-flow/react`:

```tsx
// src/components/stats-bar-client.tsx
"use client";

import NumberFlow from "@number-flow/react";

interface Props {
  codesRoasted?: number;
  avgScore?: number;
  loadedCodesRoasted?: number;
  loadedAvgScore?: number;
}

export function StatsBarClient({
  codesRoasted = 0,
  avgScore = 0,
  loadedCodesRoasted,
  loadedAvgScore,
}: Props) {
  const displayCodesRoasted = loadedCodesRoasted ?? codesRoasted;
  const displayAvgScore = loadedAvgScore ?? avgScore;

  return (
    <div>
      <NumberFlow
        value={displayCodesRoasted}
        format={{ maximumFractionDigits: 0 }}
      />
      <NumberFlow
        value={displayAvgScore}
        format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
      />
    </div>
  );
}
```

O padrão de uso com tRPC:

```tsx
// src/components/stats-bar-with-data.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { StatsBarClient } from "./stats-bar-client";
import { useTRPC } from "@/trpc/client";

export function StatsBarWithData() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.roast.getStats.queryOptions());

  const totalRoasts = data?.totalRoasts ?? 0;
  const avgScore = typeof data?.avgScore === "number" ? data.avgScore : 0;

  return (
    <StatsBarClient
      codesRoasted={0}           // valor inicial
      avgScore={0}                // valor inicial
      loadedCodesRoasted={totalRoasts}
      loadedAvgScore={avgScore}
    />
  );
}
```

### Skeleton Components

Para loading states, use skeletons com `animate-pulse`:

```tsx
export function StatsBarSkeleton() {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="h-4 w-32 animate-pulse rounded bg-bg-surface" />
      <span className="text-text-tertiary">·</span>
      <div className="h-4 w-20 animate-pulse rounded bg-bg-surface" />
    </div>
  );
}
```

**Nota**: Para componentes com NumberFlow, prefira não usar skeleton e deixe os números começarem em 0 para que a animação ocorra.

### Collapsible Components

Para componentes expansíveis/collapsible, use `@radix-ui/react-collapsible`:

```tsx
// src/components/ui/collapsible.tsx
"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const collapsible = tv({ base: "" });

export const Collapsible = forwardRef<HTMLDivElement, CollapsiblePrimitive.CollapsibleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <CollapsiblePrimitive.Root ref={ref} className={collapsible({ className })} {...props}>
        {children}
      </CollapsiblePrimitive.Root>
    );
  }
);

const collapsibleTrigger = tv({ base: "cursor-pointer select-none" });

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsiblePrimitive.CollapsibleTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <CollapsiblePrimitive.Trigger ref={ref} className={collapsibleTrigger({ className })} {...props}>
        {children}
      </CollapsiblePrimitive.Trigger>
    );
  }
);

const collapsibleContent = tv({
  base: "overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",
});

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsiblePrimitive.CollapsibleContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <CollapsiblePrimitive.Content ref={ref} className={collapsibleContent({ className })} {...props}>
        {children}
      </CollapsiblePrimitive.Content>
    );
  }
);
```

Adicione as animações no `globals.css`:

```css
@keyframes collapse-down {
  from { height: 0; }
  to { height: var(--radix-collapsible-content-height); }
}

@keyframes collapse-up {
  from { height: var(--radix-collapsible-content-height); }
  to { height: 0; }
}

.animate-collapse-down {
  animation: collapse-down 0.2s ease-out;
}

.animate-collapse-up {
  animation: collapse-up 0.2s ease-out;
}
```
