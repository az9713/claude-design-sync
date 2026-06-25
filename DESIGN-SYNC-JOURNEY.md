# From Code to Canvas and Back: The Nike Design System Journey

*A behind-the-scenes account of one full loop — building a design system as code,
syncing it into Claude Design, using it to design a slide deck, and pulling that
deck back out into runnable code. Every step here actually happened in one session;
the IDs and file names are real.*

---

## The arc in one picture

```
  ┌─────────────────┐   /design-sync   ┌──────────────────┐   design agent   ┌──────────────┐   get_file +    ┌─────────────────┐
  │  CODE            │  ──────────────▶ │  CLAUDE DESIGN   │ ───────────────▶ │  A DECK       │  reimplement    │  RUNNABLE CODE   │
  │  @swoosh/ui repo │                  │  (claude.ai)     │                  │  .dc.html     │ ──────────────▶ │  index.html      │
  │  14 components   │   convert+upload │  Nike DS project │   builds WITH    │  MORE GAME    │   export back   │  self-contained  │
  └─────────────────┘                  └──────────────────┘   your components └──────────────┘                 └─────────────────┘
       Act 1                Act 2                                  Act 3                            Act 4
```

Four acts:
1. **Build** a real component library as code.
2. **Sync** it into Claude Design so Claude's design agent designs with it.
3. **Design** a 5-slide Nike "MORE GAME" World Cup 2026 deck on that foundation.
4. **Export** that deck back into Claude Code as a standalone, runnable file.

---

## Cast of characters (so the rest makes sense)

| Thing | What it is |
|---|---|
| **Claude Design** (claude.ai/design) | Claude's visual design tool. You prompt a *design agent* and it builds working UI — screens, decks, prototypes — rendered live from real React. |
| **A "Design System project"** | A special project type in Claude Design that holds your reusable components, so the design agent builds with *them* instead of generic parts. |
| **`/design-sync`** | A Claude Code skill that converts a design-system **code repo** into the format Claude Design consumes, and uploads it. It does **not** design or scrape — it ships what you already built. |
| **The `DesignSync` tool** | The low-level API the skill (and I) use to read/write Claude Design projects: `list_projects`, `create_project`, `finalize_plan`, `write_files`, `get_file`, etc. |
| **`.dc.html`** | Claude Design's document format. Plain HTML plus custom elements (`<x-dc>`, `<x-import>`) that the Claude Design runtime renders. This is what a deck *is* inside Claude Design. |

---

# Act 1 — Building the Nike Design System (as code)

**Goal:** a real, buildable component library — because `/design-sync` can only ship
something that already exists as code. Its core principle is literally *"ship what
the customer already built — never a reimplementation."* So first we had to build it.

### What got created

A package-shape design system (React + TypeScript + esbuild), branded **"Swoosh UI"**
(`@swoosh/ui`) — Nike-inspired, explicitly a mock:

```
nike-design-system/
  package.json            # @swoosh/ui, build scripts, react peer dep
  build.mjs               # esbuild → dist/index.js (ESM) + dist/index.css
  tsconfig.build.json     # tsc --emitDeclarationOnly → .d.ts
  src/
    tokens/tokens.css     # --swoosh-* design tokens (the whole look)
    components/           # 14 components, each .tsx + .css + index.ts
      Button/ IconButton/ Input/ Checkbox/ Badge/ Price/ Card/
      ProductCard/ Tabs/ Breadcrumb/ QuantityStepper/ SizePicker/
      Hero/ NavBar/
    index.ts              # barrel: imports tokens, re-exports everything
```

### The two ideas that make it a *system*, not just components

1. **Tokens are the single source of the look.** Every component styles itself only
   from `--swoosh-*` CSS variables — colors (`--swoosh-color-black`, `-volt` = the
   signature `#cdfa00`), type, spacing, radius (`-radius-pill` for the buttons),
   shadows. Re-theme the whole system by overriding `:root`.
2. **Every component is self-scoping.** Each root carries a `swoosh-root` class that
   applies the font and box model — so there's *no provider to wrap*, which later
   made the conventions doc trivially simple for the design agent.

### Behind the scenes: the build

Two outputs, two tools, one command (`npm run build`):
- **esbuild** bundles `src/index.ts` → `dist/index.js` as an ESM IIFE, with React
  marked **external** (the consumer provides React), and collects every component's
  imported CSS into `dist/index.css`.
- **tsc** emits `dist/**/*.d.ts` — the typed API contract.
- `npm install` produced a real **`package-lock.json`** — which matters because
  `/design-sync` does a *faithful* install (`npm ci`) from that lockfile.

Verified: `dist/index.js` (14 exports under one bundle), `dist/index.css` (23 KB,
tokens + styles), 30 `.d.ts` files. **This repo is the input to Act 2.**

> **How you create a Claude Design System (the takeaway):** you don't "design" one in
> a tool — you write a normal component library that *builds to a `dist/`*, with
> tokens for the look and types for the API. If you already have one, you skip
> straight to Act 2.

---

# Act 2 — `/design-sync` to claude.ai

This is the heart of it. `/design-sync` ran the repo through a deterministic
**converter** and uploaded the result. Here's what actually happened, in order.

### Step 0 — Expectations + target

- The skill detected **no `.design-sync/config.json`** → first-time import → it set
  expectations (high-fidelity, token cost) and asked to proceed.
- `DesignSync.list_projects` showed existing systems (Anthropic, Apple…). To avoid a
  name collision it confirmed a name and called `DesignSync.create_project` →
  **project `4d1dcc0f-1ee2-40f7-be34-fbc15d4d2daa` "Nike Design System"**.
- The new `projectId` was **pinned immediately** into `.design-sync/config.json`,
  *before any upload* — so a crash mid-run repairs the same project instead of
  orphaning it.

### Step 1 — Shape detection + staging

- No `.storybook/` → **shape = `package`** (the other shape is `storybook`).
- The converter scripts were copied into a throwaway `.ds-sync/` and given their own
  deps (`esbuild`, `ts-morph`, `@types/react`) — isolated from the repo's own
  toolchain.
- The render check needs a real browser. A cached **Chromium build 1228** was found,
  and **Playwright 1.61.1** (which pins exactly that build) was installed — so the
  check ran with **no 200 MB download**.

### Step 2 — Convert (the deterministic core)

`package-build.mjs` ran and produced a `ds-bundle/` — the *upload format*:

```
ds-bundle/
  _ds_bundle.js         # the compiled library as window.SwooshUi  ← what designs import
  _ds_bundle.css        # all component CSS
  styles.css            # @imports tokens + _ds_bundle.css  ← designs get this closure
  components/general/<Name>/
      <Name>.d.ts       # the API contract the design agent codes against
      <Name>.prompt.md  # usage doc for the agent
      <Name>.jsx        # one-line re-export stub
      <Name>.html       # the preview CARD humans browse
  _vendor/react*.js     # preview cards load React from here
  _ds_sync.json         # the "anchor" — content hashes for fast re-syncs
```

Key insight: **the bundle is your real compiled `dist/`**, wrapped so every export
hangs off `window.SwooshUi`. Nothing was reimplemented.

### Step 3 — Make the previews real, then grade them

A package-shape DS has **no reference render**, so quality is earned two ways:
- The first validate flagged `[RENDER_BLANK]` on Input/Price — they were showing the
  honest "floor card" (a component with no authored preview).
- So I **authored a preview story file per component** (`.design-sync/previews/<Name>.tsx`)
  — real JSX importing from `@swoosh/ui`, with realistic Nike content (volt buttons,
  product cards with sale badges, a size picker with struck-through sizes…).
- Rebuild → `[GRID_OVERFLOW]` on Hero/NavBar/Tabs (too wide for a grid cell) → fixed
  with `cfg.overrides.<Name> = {cardMode: "column"}`.
- `package-capture.mjs` screenshotted each story; I **looked at all 41 cells** and
  graded them on an absolute rubric (styled / complete / plausible). All **good**.

### Step 4 — The conventions header

I wrote `.design-sync/conventions.md` — the doc that gets inlined into the *design
agent's* system prompt. It names the **real token vocabulary** (`var(--swoosh-*)`),
says "no provider needed — components self-scope," and gives one idiomatic snippet.
Then I **validated every token and component name in it against the built artifacts**
(a conventions file that names something that doesn't exist is worse than none) and
rebuilt so the README carried it.

### Step 5 — The incremental upload (the careful part)

Because the project started empty, the skill used the **incremental path**:
- `DesignSync.finalize_plan` → one approval covering all writes + cleanup deletes,
  returning a `planId` good for the whole run.
- Upload order is a strict fence:
  1. **Sentinel first** (`_ds_needs_recompile`) — fences the app's processing while
     files are mid-flight.
  2. **All 76 content files** (one `write_files` call, under the 256 cap).
  3. **Reconciliation deletes** — none (project was empty).
  4. **Sentinel re-arm**, then **`_ds_sync.json` absolutely last** — the anchor only
     ever vouches for a *fully applied* state.
- Final count: **78 files live**. `report_validate` recorded 14 components, 0 bad.

### Step 6 — The gotcha: the publish gate

The sync was perfect, but the system **didn't appear in the composer's "Design system"
dropdown**. Behind the scenes, the cause was a **`Published` toggle** on the project
page, left **off** by default. An unpublished system is fully present and openable —
but hidden from new projects until you publish it. Two things were needed:
- **Open the project once** — that fires the server-side *self-check* (triggered by
  the sentinel) which reads each `.d.ts` as the API, registers each `.html` as a
  card, and regenerates the manifest.
- **Tick `Published`** — which moved it into the dropdown next to Anthropic and Apple.

> **How `/design-sync` works (the takeaway):** it's a *converter + uploader*, not a
> designer. It compiles your repo to a `window.<Global>` bundle, generates an API
> contract + preview card + usage doc per component, verifies every card renders in a
> real browser, writes a content-hash *anchor* so future syncs only re-do what
> changed, and uploads behind a sentinel fence. Then **you publish** to make it
> usable.

---

# Act 3 — Designing the deck in Claude Design

With the **Nike Design System published**, the design agent in Claude Design could
build with it. The result was the project
**`dfb3e8c4-801c-4c98-9365-ad295b3577e3` "World Cup 2026 Slide Deck"** — a Nike
**"MORE GAME"** campaign: cover, tournament-scale stats (48 teams / 104 matches / 16
cities / 3 nations), the creative idea, an athletes roster, and a "GAME ON" close.

### What a deck *is* inside Claude Design

Reading the project's `World Cup 2026 Deck.dc.html` showed exactly how a design
consumes a synced design system. The mechanics:

- It opens with `<x-dc>` — the Claude Design document runtime (`support.js`).
- It pulls the **synced Nike bundle** straight out of the project:
  ```html
  <link rel="stylesheet" href="_ds/nike-design-system-4d1dcc0f.../_ds_bundle.css">
  <link rel="stylesheet" href="_ds/nike-design-system-4d1dcc0f.../styles.css">
  <!-- then loads _ds_bundle.js once window.React exists -->
  ```
  That `_ds/nike-design-system-4d1dcc0f.../` folder is **the exact bundle Act 2
  uploaded**, now living inside the deck project.
- Slides are inline-styled `<section>` siblings inside a `deck-stage` web component
  (`<x-import component-from-global-scope="deck-stage" width="1920" height="1080">`).
- It uses your real component on the closing slide:
  ```html
  <x-import component-from-global-scope="SwooshUi.Button" variant="volt" size="lg">
    Join the Campaign
  </x-import>
  ```
  `SwooshUi.Button` is **the Button we built in Act 1** — same volt pill, same API.
- Athlete photos are `<image-slot>` drop targets.

So the loop closed: the design agent reached into `window.SwooshUi.*` and the synced
`styles.css` closure — exactly the artifacts `/design-sync` produced — to compose a
brand-true deck.

*(Honest note: this deck was authored in Claude Design before I was handed the link.
I'm reconstructing how that step worked from the resulting `.dc.html`, which spells
out the consumption mechanics precisely — rather than having driven the design agent
myself.)*

---

# Act 4 — Export back to Claude Code

The ask: **import the project and implement the deck** as something runnable.

### Step 1 — Read the project out of Claude Design

Using `DesignSync` (the same tool, in reverse):
- `get_project` → confirmed it's a regular `PROJECT_TYPE_PROJECT` named "World Cup
  2026 Slide Deck".
- `list_files` → revealed the deck plus its dependencies: `World Cup 2026 Deck.dc.html`,
  a `.standalone-src.html`, the runtime (`deck-stage.js` 82 KB, `image-slot.js`,
  `support.js`), and the embedded `_ds/nike-design-system-…/` bundle.
- `get_file` → pulled the actual contents (text returned inline; the 82 KB runtime
  was auto-persisted to a side file).

### Step 2 — The implementation decision

The `.dc.html` only renders inside the Claude Design runtime (it needs `support.js`,
the `deck-stage` component, React, and the Nike bundle). Two ways to "implement" it:
- **(a)** download the whole runtime + bundle and hope it runs offline, or
- **(b)** keep the exact slide markup but replace the *runtime dependencies* with a
  tiny vanilla engine.

I chose **(b)** — it's both less fragile and a cleaner deliverable. The result is a
single self-contained `world-cup-2026-deck/index.html` with:
- the **5 slides verbatim** (same inline styles, same copy, same volt accents),
- a **~40-line vanilla slide engine**: fixed 1920×1080 stage scaled to fit and
  letterboxed, keyboard nav (←/→/Space/Home/End), click-halves, a fading HUD, and
  print-to-PDF,
- `<image-slot>` → styled "drop athlete photo" placeholders,
- `SwooshUi.Button variant="volt"` → a real volt pill `<button>` (reproducing the
  Nike Button CSS).

### Step 3 — Verify for real

I served the folder over a local HTTP server and **stepped through all 5 slides in a
browser**, screenshotting each: cover, the 48/104/16/3 stat grid, the volt-italic
idea headline, the three athlete placeholders, and "GAME ON." with the working volt
button. All five rendered correctly; navigation worked.

> **How the export back to Claude Code works (the takeaway):** there's no magic
> "export" button in this flow — `DesignSync.get_file` *is* the export. You read the
> design's source out of the project, then decide what "implement" means for your
> target: run it as-is with its runtime, or (as here) strip the runtime and keep the
> markup so it's portable. The design's content is plain HTML; only its *host* was
> proprietary.

---

## The three mechanisms, distilled

**Creating a Claude Design System** = writing a normal component library that builds
to a `dist/`. Tokens carry the look; `.d.ts` carries the API. There is no special
"design system editor" — code is the source of truth.

**`/design-sync`** = a deterministic *converter + verifier + uploader*. It compiles
your `dist/` into a `window.<Global>` bundle, derives an API contract, usage doc, and
a real **preview card** per component, render-checks every card in headless Chromium,
writes a content-hash **anchor** so re-syncs are incremental, uploads behind a
sentinel fence, and leaves you to **publish**. From then on Claude Design's agent
builds with your real components.

**Export back to code** = reading the design's source via `get_file` and
re-hosting it. The deck was authored against your synced bundle (`window.SwooshUi`,
`styles.css`); pulling it back is just reading files and replacing the proprietary
runtime with a portable one.

---

## Gotchas worth remembering

1. **`/design-sync` needs a repo, not a website.** It ships compiled code; it can't
   "build a design system from nike.com." (Act 1 had to exist first.)
2. **A fresh sync is unpublished.** All the data can be live and correct and *still*
   not show in the composer until you tick **Published**.
3. **Open the project once** to fire the self-check that registers cards + API.
4. **The anchor (`_ds_sync.json`) is sacred** — it's written last so it never vouches
   for a half-uploaded state; that's what keeps re-syncs trustworthy.
5. **"Implement a `.dc.html`" is a choice**, not a copy. Decide whether you want the
   Claude Design runtime or a portable reimplementation.

---

## Appendix — real artifacts from this run

| Artifact | Value |
|---|---|
| Design system repo | `nike-design-system/` (`@swoosh/ui`, `window.SwooshUi`, 14 components) |
| Claude Design DS project | `Nike Design System` · `4d1dcc0f-1ee2-40f7-be34-fbc15d4d2daa` |
| Files uploaded by sync | 78 (bundle + per-component `.d.ts`/`.prompt.md`/`.jsx`/`.html` + anchor) |
| Deck project | `World Cup 2026 Slide Deck` · `dfb3e8c4-801c-4c98-9365-ad295b3577e3` |
| Deck source format | `World Cup 2026 Deck.dc.html` (consumes `_ds/nike-design-system-4d1dcc0f…/`) |
| Implemented deck | `world-cup-2026-deck/index.html` (self-contained, 5 slides, verified) |
```

*Generated from a real end-to-end session: code → `/design-sync` → Claude Design →
deck → back to code.*
