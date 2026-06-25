# Swoosh UI

A **Nike-inspired, industrial-strength React design system** — built as a realistic
mock so it can be imported into Claude Design with `/design-sync`.

> ⚠️ This is an unofficial mock for demonstration. It is **not affiliated with,
> endorsed by, or produced by Nike, Inc.** "Swoosh UI" is a placeholder brand that
> borrows Nike's public visual language (black/white, volt accent, bold type,
> pill buttons) for illustration only.

## What's inside

- **Design tokens** (`src/tokens/tokens.css`) — colors, typography, spacing, radius,
  elevation, and motion as `--swoosh-*` CSS variables. Re-theme the whole system by
  overriding `:root`.
- **Components** (`src/components/*`) — real, typed React components, each with
  co-located CSS that styles exclusively from the tokens:
  Button, IconButton, Input, Checkbox, Badge, Price, Card, ProductCard, Tabs,
  Breadcrumb, QuantityStepper, SizePicker, Hero, NavBar.
- A deterministic **build** that emits a compiled `dist/` (ESM + bundled CSS + types).

## Install & build

```bash
npm install
npm run build
```

This produces:

- `dist/index.js` — the bundled, compiled component library (ESM; React is external)
- `dist/index.css` — every component's styles plus the tokens, bundled
- `dist/index.d.ts` (+ per-module `.d.ts`) — the TypeScript API

`react` and `react-dom` are peer dependencies (`>=18`).

## Usage

```tsx
import { Button, ProductCard } from "@swoosh/ui";
import "@swoosh/ui/styles.css";

export function Example() {
  return (
    <>
      <Button variant="volt" size="lg">Join us</Button>
      <ProductCard
        image="https://example.com/shoe.jpg"
        name="Air Zoom Pegasus"
        category="Men's Road Running"
        price={130}
        originalPrice={160}
        badge="Sale"
      />
    </>
  );
}
```

Every component renders inside a `.swoosh-root` scope (applied automatically) so the
tokens and base typography apply without fighting the host app's global styles.

## Why this repo exists

`/design-sync` imports a design system **that already exists as code** and uploads it
to Claude Design, so Claude's design agent builds with these real components. This
repo is a complete, buildable example of exactly that kind of input: a `package`-shape
design system (no Storybook) with a real `dist/` build, ready to sync.
