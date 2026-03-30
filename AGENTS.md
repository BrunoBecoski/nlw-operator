# DevRoast

Next.js app to roast your code. Paste code, get brutally honest feedback.

## Stack
- Next.js 16, React 19, TypeScript
- Tailwind CSS v4 (CSS variables in `@theme inline`)
- tailwind-variants for component variants
- Radix UI (toggle, collapsible)
- Shiki for syntax highlighting (client-side)
- highlight.js for language auto-detection
- tRPC v11 with TanStack React Query
- Drizzle ORM with PostgreSQL
- NumberFlow for number animations

## Theme: Nuclear/Radiation + Windows XP

A retro aesthetic combining hazmat/radiation visuals with Windows XP styling.

### Design Tokens (globals.css)
**Colors:**
- `hazmat-primary` (#f0c000) - Hazmat yellow
- `hazmat-light` (#ffd700) - Lighter hazmat
- `hazmat-dark` (#b8860b) - Darker hazmat
- `radiation-green` (#c8ff00) - Primary accent
- `radiation-green-light` (#e0ff4d) - Lighter variant
- `radiation-green-dark` (#9ab800) - Darker variant
- `badge-good` (#c8ff00) - Good status
- `accent-red` (#ef4444) - Danger/warnings
- `accent-amber` (#f59e0b) - Caution indicators
- `text-primary` (#e5e5e5) - Main text
- `text-secondary` (#a3a3a3) - Secondary text
- `text-tertiary` (#737373) - Muted text
- `border-primary` (#555555) - Standard borders
- `border-primary-light` (#777777) - Light borders
- `border-primary-dark` (#333333) - Dark borders
- `bg-page` (#3a3a3a) - Page background
- `bg-surface` (#3a3a3a) - Surface/header background
- `bg-input` (#2a2a2a) - Input/code block background
- `bg-dark` (#0d0d0d) - Darkest background
- `neon-green` (#39ff14) - Neon accent
- `core-green` (#00ff41) - Core green
- `warning-orange` (#ff6b00) - Warning indicator
- `radiation-purple` (#9d00ff) - Purple accent

**Syntax Highlighting Colors:**
- `syn-keyword` (#c084fc) - Keywords
- `syn-function` (#60a5fa) - Functions
- `syn-variable` (#fb923c) - Variables
- `syn-operator` (#fcd34d) - Operators
- `syn-number` (#f472b6) - Numbers

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
Solid background:
```css
.bg-radiation-pattern {
  background-color: #3a3a3a;
}
```

## Components

### CodeShell
Unified code display component with variants:
- `editable` - Editor mode with textarea overlay
- `maxChars` - Character limit
- `showFooter` - Show/hide footer (default: true)

**Exports:**
- `CodeShell` - Main component
- `CodeShellRoot` - Container with XP border
- `CodeShellContent` - Code display area (bg-input)
- `CodeShellTextarea` - Editable input overlay
- `CodeShellHighlight` - Shiki-highlighted code
- `CodeShellFooter` - Footer with line count, char count, copy button

### Button
- `hazmat` - Yellow fill with XP borders (default)
- `outline` - Transparent with yellow border

**Exports:** `Button`, `button` (tv function)

### Toggle
XP-style checkbox with hazmat yellow when active.
- `ToggleRoot` - Container
- `ToggleTrack` - Track background
- `ToggleKnob` - Sliding knob
- `ToggleLabel` - Text label

### Badge
XP-styled status badges with indicator dots.

**Statuses:** critical, warning, good, critical_contamination, moderate_radiation, containment_achieved, low_radiation, radiation_free

### RadiationDial
Geiger counter style meter:
- `RadiationDial` - Full version for roast pages (320x280)
- `RadiationDialSm` - Compact version for headers/tables (40x26)

**Zones:**
- DANGER (red) - Score < 33.3%
- CAUTION (amber) - Score 33.3% - 66.6%
- SAFE (green) - Score >= 66.6%

### Collapsible
Collapsible section using Radix UI:
- `Collapsible` - Root container
- `CollapsibleTrigger` - Toggle button
- `CollapsibleContent` - Animated content (uses collapse-down/collapse-up)

### CodeInput
Textarea component with header and language dots:
- `CodeInput` - Main component
- `CodeInputRoot` - Container
- `CodeInputHeader` - Header bar
- `CodeInputDots` - Traffic light dots (red, amber, green)
- `CodeInputFilename` - Filename display
- `CodeInputArea` - Textarea

### StatsBar
Statistics display component:
- `StatsBar` - Container
- `StatsItem` - Individual stat
- `StatsDot` - Separator dot
- `StatsBarData` - Pre-built with codes roasted and avg score

### LeaderboardTable
Table showing ranked submissions with:
- Position, username, score, language
- RadiationDialSm indicators
- Clickable rows for roast view

### DiffLine
Line-by-line diff display:
- `DiffLine` - Main component
- `DiffLineRoot` - Line container
- `DiffLinePrefix` - Line number/prefix
- `DiffLineContent` - Line text
- `DiffLineContainer` - Container for multiple lines

**Types:** removed (red), added (green), context (neutral)

### TitleBar
Windows XP style title bar with variants:
- `TitleBarRoot` - Container (variants: hazmat, red, orange, green)
- `TitleBarHeader` - Gradient header bar
- `TitleBarTitle` - Title text
- `TitleBarSubtitle` - Subtitle text
- `TitleBarActions` - Action buttons container
- `TitleBarPosition` - Position badge (#1, #2, etc.)
- `TitleBarLanguage` - Language display
- `TitleBarLanguageSelect` - Language dropdown selector
- `TitleBarScore` - RadiationDialSm inline
- `TitleBarControls` - Window controls (minimize, maximize, close)

### Navbar
Navigation bar using xp-border-bottom:
- Logo with radiation symbol
- Leaderboard link

## CSS Classes

### XP Borders
- `toolbar-xp` - Full 3D beveled border
- `toolbar-xp-navbar` - Only top/bottom borders with gradient
- `xp-border-bottom` - Gradient borders top/bottom
- `retro-outset` - Windows 95 outset effect
- `retro-inset` - Windows 95 inset effect
- `retro-border` - Simple retro border
- `language-badge` - Code language badge
- `xp-inset` - Inset container
- `xp-copy-button` - Copy button with XP style
- `codeblock-root` - Code block container

### Scrollbar (Hazmat Style)
Yellow scrollbar matching theme:
- Track: `--color-bg-input`
- Thumb: `--color-hazmat-dark`
- Thumb hover: `--color-hazmat-primary`

### Text Styles
- `.text-title` - H1 titles (2.25rem, bold)
- `.text-subtitle` - Subtitles (1.25rem, bold)
- `.text-comment` - Comment style text (0.875rem, tertiary)
- `.text-stats` - Stats/info text (0.875rem, tertiary)

### Animations
- `animate-collapse-down` - Collapsible expand
- `animate-collapse-up` - Collapsible collapse
- `animate-needle-pulse` - Needle indicator pulse
- `animate-hazmat-flicker` - Hazmat light flicker
- `animate-nuclear-pulse` - Nuclear glow pulse
- `bg-radiation-glow` - Subtle background pulse

### Glow Effects
- `.glow-neon` - Neon green glow
- `.glow-hazmat` - Hazmat yellow glow
- `.glow-green` - Green glow

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
javascript, typescript, python, go, rust, java, ruby, php, swift, kotlin, html, css, json, yaml, sql, bash, c, cpp, markdown

**For auto-detection (highlight.js):**
javascript, typescript, python, go, rust, java, ruby, php, sql, bash, xml, css, json, yaml, markdown, c, cpp, csharp, swift, kotlin, dart

**Aliases:** js→javascript, ts→typescript, py→python, rb→ruby, sh→bash, yml→yaml
