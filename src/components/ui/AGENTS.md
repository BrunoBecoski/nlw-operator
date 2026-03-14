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
