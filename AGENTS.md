# DevRoast

Next.js app to roast your code. Paste code, get brutally honest feedback.

## Stack
- Next.js 16, React 19, TypeScript
- Tailwind CSS v4 (CSS variables in `@theme inline`)
- tailwind-variants for component variants
- Radix UI (toggle)
- Shiki for syntax highlighting (client-side)
- highlight.js for language auto-detection
- tRPC v11 with TanStack React Query
- Drizzle ORM with PostgreSQL
- NumberFlow for number animations

## Theme: Nuclear/Radiation + Windows XP

A retro aesthetic combining hazmat/radiation visuals with Windows XP styling.

### Design Tokens (globals.css)
**Colors:**
- `accent-green` (#c8ff00) - Hazmat yellow, primary accent
- `accent-red` (#ef4444) - Danger/warnings
- `accent-amber` (#f59e0b) - Caution indicators
- `text-primary` (#e5e5e5) - Main text
- `text-secondary` (#a3a3a3) - Secondary text
- `text-tertiary` (#737373) - Muted text
- `border-primary` (#555555) - Standard borders
- `bg-page` (#3a3a3a) - Page background
- `bg-surface` (#3a3a3a) - Surface/header background
- `bg-input` (#2a2a2a) - Input/code block background

**Fonts:** Space Mono (variable: `--font-mono`)

### Windows XP Styling
XP-style borders use light/dark shading:
```css
border: 2px solid;
border-top-color: #777;    /* light */
border-left-color: #777;   /* light */
border-right-color: #333;  /* dark */
border-bottom-color: #333; /* dark */
```

### Radiation Background
Pattern with subtle hazmat dots:
```css
.bg-radiation-pattern {
  background-color: #3a3a3a;
  background-image: url("data:image/svg+xml,...");
}
```

## Components

### CodeShell
Unified code display component with variants:
- `editable` - Editor mode with textarea overlay
- `showHeader` - Show/hide header bar
- `position` - Show rank/position (#1, #2, etc.)
- `showScore` - Display radiation score
- `score` / `maxScore` - Score values

**Sub-components:**
- `CodeShellRoot` - Container with XP border
- `CodeShellHeader` - Header bar (language badge, score, copy button)
- `CodeShellLanguageBadge` - Language indicator
- `CodeShellScore` - RadiationDialSm inline
- `CodeShellCopyButton` - Copy to clipboard
- `CodeShellContent` - Code display area
- `CodeShellTextarea` - Editable input
- `CodeShellHighlight` - Shiki-highlighted code

### Button Variants
- `hazmat` - Yellow fill with XP borders
- `outline` - Transparent with yellow border
- Disabled buttons have no hover effect

### Toggle
XP-style checkbox with accent-green when active.

### Badge
XP-styled status badges with indicator dots.

### RadiationDial
Geiger counter style meter:
- Full version for roast pages
- Sm (compact) for headers/tables
- Zones: DANGER (red), CAUTION (amber), SAFE (green)

### CodePreview
Collapsible code preview component:
- Shows header with position, language, score
- Collapsible with "Mostrar mais X linhas" / "Mostrar menos"
- Cursor pointer on expand/collapse buttons

## Commands
```bash
npm run dev    # development
npm run build  # production build
npm run lint   # biome check
```

## Conventions
- Named exports only
- Use `forwardRef` for interactive components
- Props extend native HTML attributes
- Use `tv()` from tailwind-variants for variants

## tRPC
See `src/trpc/AGENTS.md` for tRPC-specific patterns.

## Hooks
Located in `src/hooks/`:
- `useShikiHighlighter` - Shiki client-side singleton with JS engine
- `useLanguageDetection` - Auto-detect language via highlight.js (300ms debounce)

## Supported Languages
**For syntax highlighting (Shiki):**
javascript, typescript, python, go, rust, java, ruby, php, swift, kotlin, html, css, json, yaml, bash, sql, c, cpp

**For auto-detection (highlight.js):**
javascript, typescript, python, go, rust, java, ruby, php, sql, bash, xml, css, json, yaml, markdown, c, cpp, csharp, swift, kotlin, dart

**Aliases:** js→javascript, ts→typescript, py→python, rb→ruby, sh→bash, yml→yaml
