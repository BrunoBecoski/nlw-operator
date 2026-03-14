# DevRoast

Next.js app to roast your code. Paste code, get brutally honest feedback.

## Stack
- Next.js 16, React 19, TypeScript
- Tailwind CSS v4 (CSS variables in `@theme inline`)
- tailwind-variants for component variants
- Radix UI (toggle)
- Shiki for syntax highlighting

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
