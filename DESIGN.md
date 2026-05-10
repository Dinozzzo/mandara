# DESIGN.md — Mandara

Design specification for the Mandara liqueur website.

**Style direction**: Editorial luxury — warm, organic, refined. Inspired by premium fragrance campaigns and high-end fashion editorials, not beverage industry conventions.

---

## Color System

All colors should be defined as CSS custom properties on `:root`.

| Token         | Variable                | Hex       | Role                                                                 |
| ------------- | ----------------------- | --------- | -------------------------------------------------------------------- |
| Mandarin      | `--color-mandarin`      | `#E5A04F` | Primary brand accent. CTAs, key highlights, brand moments.           |
| Bitter Orange | `--color-bitter-orange` | `#DD7D2E` | Secondary accent. Hover states, gradient endpoints, depth.           |
| Grove         | `--color-grove`         | `#7A8966` | Botanical accent. Subtle decorative touches, supporting brand color. |
| Ivory         | `--color-ivory`         | `#FAF4E8` | Primary background. Light surfaces, cards.                           |
| Umber         | `--color-umber`         | `#4A3A28` | Body text, secondary text, soft dark elements.                       |
| Ink           | `--color-ink`           | `#2A1F11` | Primary text, headings, deepest dark zones.                          |

### Usage rules

- **Default background**: Ivory (`--color-ivory`)
- **Default body text**: Umber (`--color-umber`)
- **Headings**: Ink (`--color-ink`)
- **Accent uses**: Mandarin sparingly — it should feel like a precious highlight, not a wallpaper
- **No pure white** (`#FFFFFF`) and **no pure black** (`#000000`) anywhere on the site
- **No additional colors** without explicit approval

---

## Typography

### Font families

- **Display / Headings**: **Jost** — Google Fonts
  - Weights to load: 300, 400, 500
  - Use 400 as default for headings; 300 for large editorial headings; 500 only for emphasis
- **Body**: **Inter** — Google Fonts
  - Weights to load: 400, 500
  - 400 default; 500 for emphasis and small UI elements

### Type scale (mobile-first; scale up on desktop)

| Token            | Mobile | Desktop | Usage                  |
| ---------------- | ------ | ------- | ---------------------- |
| `--text-xs`      | 12px   | 12px    | Captions, meta, footer |
| `--text-sm`      | 14px   | 14px    | Small body, labels     |
| `--text-base`    | 16px   | 17px    | Body text              |
| `--text-lg`      | 18px   | 20px    | Lead paragraphs        |
| `--text-xl`      | 22px   | 28px    | Subheadings (h3)       |
| `--text-2xl`     | 28px   | 40px    | Section headings (h2)  |
| `--text-3xl`     | 40px   | 64px    | Hero / display (h1)    |
| `--text-display` | 56px   | 96px+   | Editorial hero moments |

### Typographic details

- **Headings (Jost)**: letter-spacing slightly opened (`0.02em` to `0.08em` depending on size). Larger headings get more tracking.
- **Body (Inter)**: letter-spacing neutral (`0` to `-0.01em`). Line-height `1.6` to `1.7` for readability.
- **All caps**: reserved for small labels and section eyebrows. Always with generous letter-spacing (`0.15em`).
- **No italics for emphasis** — use weight or color shifts instead.

---

## Spacing scale

8px base grid. Use these tokens consistently.

| Token        | Value |
| ------------ | ----- |
| `--space-1`  | 4px   |
| `--space-2`  | 8px   |
| `--space-3`  | 12px  |
| `--space-4`  | 16px  |
| `--space-6`  | 24px  |
| `--space-8`  | 32px  |
| `--space-12` | 48px  |
| `--space-16` | 64px  |
| `--space-24` | 96px  |
| `--space-32` | 128px |
| `--space-40` | 160px |

Section vertical padding (desktop): `--space-32` to `--space-40`. Mobile: `--space-16` to `--space-24`.

---

## Layout

- **Max content width**: 1440px
- **Default container padding**: 24px mobile, 48px tablet, 80px+ desktop
- **Generous whitespace** is non-negotiable. When in doubt, add more.

### Breakpoints

| Name    | Min width |
| ------- | --------- |
| Mobile  | 0         |
| Tablet  | 768px     |
| Desktop | 1024px    |
| Wide    | 1440px    |

---

## Radius & elevation

- **Border radius**: minimal. `2px` for small elements, `4px` for cards. Avoid rounded blobs.
- **Shadows**: subtle and warm. Avoid hard or blue-tinted shadows. Prefer:
  - `0 2px 12px rgba(42, 31, 17, 0.06)` (soft)
  - `0 8px 32px rgba(42, 31, 17, 0.10)` (lifted)

---

## Motion (Phase 2 — not implemented yet)

Reserved for later. When animations are added:

- Use **GSAP** for scroll-triggered and choreographed motion
- Easings: prefer `power2.out`, `power3.inOut`, `expo.out` — never linear, never bouncy
- Durations: 0.6s–1.2s for most transitions
- Respect `prefers-reduced-motion`

---

## Imagery

- Photos are provided in `../images/`
- Treat photography as the visual centerpiece — give images room to breathe
- No filters, no overlays, no opacity reductions unless I request them
- Aspect ratios should be intentional (portrait for product, editorial 4:5 or 3:4 for lifestyle)

---

## Don'ts

- No emoji anywhere in UI copy
- No gradient backgrounds (gradients reserved for very specific accent moments, approved case by case)
- No drop caps, no quirky decorative flourishes
- No icon libraries (Lucide, Font Awesome, etc.) without approval
- No glassmorphism, no neumorphism, no 2020s SaaS aesthetic
