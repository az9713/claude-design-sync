# MORE GAME — Nike · FIFA World Cup 2026 (deck)

Local, self-contained implementation of the **World Cup 2026 Deck** from the
Claude Design project `dfb3e8c4-801c-4c98-9365-ad295b3577e3`.

## Run it
Just open **`index.html`** in any browser — no build, no dependencies, no internet.
(Or serve the folder: `node _serve.mjs` → http://127.0.0.1:8731/)

## Controls
- **← / →**, **Space**, **PgUp/PgDn** — prev / next
- **Click** left or right half of the stage — prev / next
- **Home / End** — first / last · **R** — restart · **P** — print / export to PDF

## What it is
5 slides at 1920×1080, scaled to fit the viewport (letterboxed):
1. **Cover** — MORE GAME
2. **Scale** — 48 teams / 104 matches / 16 cities / 3 nations
3. **The Idea** — "When the game gets bigger, so does the stage for greatness."
4. **Athletes** — three image placeholders (drop in real photography)
5. **Game On** — closing CTA

## How it was built
The source deck (`World Cup 2026 Deck.dc.html`) is in Claude Design's `.dc.html`
format and depends on the Claude Design runtime (`support.js`, a `deck-stage` web
component, `<image-slot>` elements, React, and the `SwooshUi.Button` from the Nike
Design System). This implementation keeps the exact slide markup but replaces those
runtime dependencies with a ~40-line vanilla slide engine, so it runs anywhere:
- `<image-slot>` → styled "drop photo" placeholders
- `SwooshUi.Button variant="volt"` → a real volt pill button

To use real athlete photos, replace each `<div class="image-slot">…</div>` on
slide 4 with an `<img>` (object-fit: cover).
