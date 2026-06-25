# Design-sync notes — Swoosh UI (@swoosh/ui)

Repo-specific facts for future syncs.

## Build / shape
- Shape: **package** (no Storybook).
- Build: `npm run build` (esbuild → `dist/index.js` ESM + `dist/index.css`; `tsc` emits `.d.ts`). Re-run before the converter when source changed.
- Converter entry: `--entry ./dist/index.js`; `cssEntry: ./dist/index.css` (tokens + all component CSS are bundled into that one file).
- `--node-modules ./node_modules` (repo's own; has react, react-dom, @types/react as devDeps).
- Global: `window.SwooshUi` (auto-derived from pkg).

## Known render warns (triaged — not new on re-sync)
- `[GRID_OVERFLOW]` on **Hero, NavBar, Tabs** — these are full-width components. Resolved with `cfg.overrides.<Name> = {"cardMode": "column"}`. Expected; do not re-chase.

## Re-sync risks (what can silently go stale)
- **ProductCard previews use inline SVG data-URI placeholders** (`.design-sync/previews/ProductCard.tsx`), not real product images — deliberate so cards render with no network. If you want real imagery, swap the `img()` helper.
- **Tabs / QuantityStepper / SizePicker previews use local `useState` wrappers** to render a controlled state. Fine for static capture; if those component APIs change (controlled→uncontrolled), the previews need updating.
- All 14 components authored + graded `good` on the absolute rubric (no reference render exists for a package-shape DS).
- **Brand:** "Swoosh UI" is a mock, **unaffiliated with Nike, Inc.** It borrows Nike's public visual language for demonstration.

## Conventions header
- `.design-sync/conventions.md` is wired via `readmeHeader` and validated against the build (all tokens + component names verified present). Keep it true on re-sync; don't rewrite wholesale.
