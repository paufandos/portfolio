# Design

The page is Pau's competitor accreditation at Spain Skills 2024: a warm ink field, the orange of his hoodie, the white desk and the concrete floor. It refuses the developer-portfolio template (dark sidebar, cards, tech pills).

## Tokens

| Token | Value | Use |
|---|---|---|
| `--field` | `#211916` | hero, competition and close fields; white text on it |
| `--field-deep` | `#0f0b0a` | hover on field buttons |
| `--orange-text` | `#a3390b` | orange labels on paper (AA contrast) |
| `--orange` | `#e0571a` | fandOS band (ink text), lanyard, badge number, underline accent |
| `--ink` | `#17110f` | text, top bar, agent-kit band |
| `--paper` | `#f3f1f0` | page ground |
| `--concrete` | `#6a5f5a` | secondary text, tile misses |
| `--rule` | `#d9d3d0` | hairlines between rows |

Colour is committed at band scale (whole sections in ink, orange or paper), never scattered as accents; orange is the only hue.

## Type

Archivo variable (width 62–125 %, weight 100–900), self-hosted. Display: weight 900 at 62–75 % width, uppercase for section titles, real case for product names (fandOS, agent-kit). Body: 17 px at 100 % width. Monospace only for real tool output.

## Components

- **Badge:** white card with an ink header carrying the years of experience, hanging from an orange lanyard; swings in once on load and tilts with the pointer on desktop; no motion with reduced motion. On phones it drops the details and barcode, and on desktop screens under 860 px tall the barcode, so the name and the LinkedIn action fit the first screen.
- **Results rows:** big condensed years on the left, company, role, text and stack on the right, separated by hairlines under a 3 px ink rule.
- **Project bands:** full-width sections, each in its own material (orange, ink, paper) with a real demonstration: fandOS screens in ink phone frames (four in a row from 600 px, staggered), terminal output, game board.
- **Buttons:** square, 48–52 px tall, white on ink, ink on paper, outlined as secondary.

No eyebrow labels, gradients, glass, glows or pills.
