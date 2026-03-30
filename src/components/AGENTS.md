# Padrões de Componentes

## Estrutura de Diretórios

```
src/components/
├── ui/                     # Componentes genéricos de UI
│   ├── button.tsx
│   ├── badge.tsx
│   ├── code-input.tsx
│   ├── code-shell.tsx
│   ├── collapsible.tsx
│   ├── diff-line.tsx
│   ├── leaderboard-table.tsx
│   ├── radiation-dial.tsx
│   ├── stats-bar.tsx
│   ├── title-bar.tsx
│   └── toggle.tsx
├── navbar.tsx              # Componente de layout
├── stats-bar-client.tsx    # Client component com NumberFlow
├── stats-bar-with-data.tsx # Componente com tRPC query
├── og/                     # Componentes de Open Graph
└── leaderboard-fetcher.tsx # Feature components
```

## Localização de Componentes

| Tipo | Localização | Quando usar |
|------|-------------|-------------|
| UI Genérico | `src/components/ui/` | Reutilizável em toda app (Button, Badge, etc) |
| Feature | `src/components/` | Específico do app (StatsBar, Leaderboard) |
| Page | `src/app/[page]/` | Agrupamento de features por página |

## Padrões por Tipo

### Componentes UI Genéricos

**Arquivo:** `src/components/ui/[nome].tsx`

- **Estrutura:** Composição com `*Root`, `*Header`, `*Content`, `*Footer`
- **Exports:** Sempre named exports
- **Variantes:** `tailwind-variants` (tv)
- **Props:** Extendem elementos HTML nativos via `HTMLAttributes`
- **Refs:** Usam `forwardRef`

Consulte `src/components/ui/AGENTS.md` para detalhes completos.

### Componentes de Features

**Arquivo:** `src/components/[nome].tsx`

Podem usar padrões mais flexíveis conforme necessidade:

- **Client Components:** `"use client"` para interatividade
- **Server Components:** Para SSR e dados server-side
- **NumberFlow:** Animações de números com `@number-flow/react`
- **tRPC:** Queries com `@tanstack/react-query`

### Componentes de Pages

**Arquivo:** `src/app/[page]/page.tsx`

- Podem usar default export
- Geralmente são Server Components
- Importam e organizam componentes de features

## Cores do Tema

O tema usa CSS custom properties definidas em `src/app/globals.css`:

```css
/* Background */
--color-bg-page: #3a3a3a;      /* Fundo da página */
--color-bg-surface: #3a3a3a;    /* Cards, surfaces */
--color-bg-input: #3a3a3a;     /* Inputs, code blocks */

/* Text */
--color-text-primary: #e5e5e5;
--color-text-secondary: #a3a3a3;
--color-text-tertiary: #737373;

/* Accents */
--color-hazmat-primary: #f0c000;
--color-radiation-green: #c8ff00;
```

**Uso:**
```tsx
<div className="bg-bg-page text-text-primary" />
<div style={{ backgroundColor: "var(--color-bg-surface)" }} />
```

## Componentes Principais

### CodeShell

Componente unificado para exibição de código com variantes:
- `editable` - Modo editor com textarea
- `maxChars` - Limite de caracteres
- `showFooter` - Mostrar/ocultar rodapé

### RadiationDial

Medidor estilo Geiger com zonas:
- DANGER (vermelho) - Score < 33.3%
- CAUTION (âmbar) - Score 33.3% - 66.6%
- SAFE (verde) - Score >= 66.6%

### LeaderboardTable

Tabela de ranking com:
- Posição, username, score, linguagem
- RadiationDial compactos
- Linhas clicáveis para visualização

### TitleBar

Barra de título estilo Windows XP com variantes:
- `hazmat`, `red`, `orange`, `green`
- Controles de janela (minimizar, maximizar, fechar)
- Badge de posição e linguagem

## Exports

| Tipo | Export | Exemplo |
|------|--------|---------|
| UI Genérico | Named | `export { Button, button }` |
| Feature | Named | `export { StatsBar }` |
| Page | Default | `export default function Page() {}` |

## Antipadrões a Evitar

- ❌ Default exports em componentes UI genéricos
- ❌ `twMerge` manual ao invés de `tv`
- ❌ Props não tipadas
- ❌ Sem `forwardRef` em componentes interativos
- ❌ Variáveis CSS hardcoded ao invés de custom properties
