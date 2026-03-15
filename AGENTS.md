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

## Dependencies
- `shiki` - syntax highlighting
- `highlight.js` - language detection
- `@trpc/server`, `@trpc/client`, `@trpc/tanstack-react-query` - type-safe API layer
- `@tanstack/react-query` - data fetching and caching
- `@number-flow/react` - animated numbers
- `zod` - input validation

## Commands
```bash
npm run dev    # development
npm run build  # production build
npm run lint   # biome check
```

## Design Tokens (globals.css)
- **Colors**: `accent-green`, `accent-red`, `accent-amber`, `text-primary`, `text-secondary`, `text-tertiary`, `border-primary`, `bg-page`, `bg-surface`, `bg-input`
- **Fonts**: `font-mono` (JetBrains Mono), `font-mono-secondary` (IBM Plex Mono)

## Componentes UI
Located in `src/components/ui/`. All use composition pattern:
- `*Root` - container principal
- `*Header` / `*Content` / `*Footer` - sections
- `*Prefix` / `*Suffix` - attachments

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

## Code Editor
Textarea overlay architecture:
- Textarea (z-index 2) - transparent, receives input
- Div (z-index 1) - renders Shiki-highlighted HTML
- Scroll sync between both elements
