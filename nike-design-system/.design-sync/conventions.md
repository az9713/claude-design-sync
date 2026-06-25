# Swoosh UI — usage conventions

Nike-inspired React design system. Import real components from `@swoosh/ui` and
style your own layout glue with the system's CSS variables. Never hand-roll a
component that already exists here.

## Setup & wrapping

- Components are **self-styling**: every component root carries the `swoosh-root`
  class, which applies the font family, base color, and `box-sizing`. There is **no
  React provider to wrap** — just render components directly.
- For your **own** layout containers (wrappers, sections, grids), add `className="swoosh-root"`
  to the outermost element so your text and spacing inherit the same tokens as the
  components inside it.
- The compiled stylesheet must be loaded once: `import "@swoosh/ui/styles.css";`. It
  defines every `--swoosh-*` token and all component styles.

## Styling idiom — CSS variables (tokens), not classes

This is a **token** system. Do not invent class names; style your layout with the
`var(--swoosh-*)` custom properties. Real names (use these exactly):

- **Color:** `--swoosh-color-black` `--swoosh-color-white` `--swoosh-color-volt`
  (signature accent) `--swoosh-color-volt-ink` `--swoosh-color-gray-50` `…-100`
  `…-200` `…-300` `…-500` `…-700` `…-900` `--swoosh-color-sale` (red)
  `--swoosh-color-success` `--swoosh-color-surface` `--swoosh-color-surface-muted`
  `--swoosh-color-text` `--swoosh-color-text-muted` `--swoosh-color-border`
- **Type:** `--swoosh-font-sans`; weights `--swoosh-font-weight-regular|medium|bold`;
  sizes `--swoosh-font-size-xs|sm|md|lg|xl|2xl|display`; `--swoosh-line-tight`
  `--swoosh-line-normal`; `--swoosh-letter-tight`
- **Spacing (4px scale):** `--swoosh-space-1` `-2` `-3` `-4` `-5` `-6` `-8` `-10`
- **Radius:** `--swoosh-radius-sm|md|lg|pill` (buttons/badges use `pill`)
- **Elevation:** `--swoosh-shadow-sm` `--swoosh-shadow-md`

Brand feel: black/white with a single volt-green accent, bold condensed headings,
generous whitespace, fully-rounded pill controls.

## Components

`Badge` `Breadcrumb` `Button` `Card` `Checkbox` `Hero` `IconButton` `Input`
`NavBar` `Price` `ProductCard` `QuantityStepper` `SizePicker` `Tabs`. Each has a
`<Name>.d.ts` (its prop contract) and `<Name>.prompt.md` (usage) under
`components/general/<Name>/`. **Read those before composing a component** — they are
the source of truth for props.

## Where the truth lives

- `styles.css` (+ its `@import`s: tokens and `_ds_bundle.css`) — all tokens and
  component styles. Read it before styling.
- `components/general/<Name>/<Name>.d.ts` — the exact props for each component.

## Idiomatic example

```tsx
import { Hero, ProductCard, Button } from "@swoosh/ui";
import "@swoosh/ui/styles.css";

export function Landing() {
  return (
    <div className="swoosh-root" style={{ display: "grid", gap: "var(--swoosh-space-8)" }}>
      <Hero title="Just Do It." ctaLabel="Shop Now" onCtaClick={() => {}} />
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--swoosh-space-5)",
        }}
      >
        <ProductCard image="/am270.jpg" name="Nike Air Max 270" category="Men's Shoes" price={150} />
        <ProductCard image="/free.jpg" name="Nike Free Run" price={89.99} originalPrice={120} badge="Sale" />
        <ProductCard image="/dunk.jpg" name="Nike Dunk Low" category="Lifestyle" price={110} badge="Just In" />
      </section>
      <Button variant="volt" size="lg">Explore all</Button>
    </div>
  );
}
```
