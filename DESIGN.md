# Portfolio Design System — Aryan Iyappan

## Concept & Vision

A personal portfolio for a 19-year-old full-stack AI engineer and aspiring founder — built like a piece of Iron Man's suit interface. The site feels like classified tech: dark, precise, alive with subtle energy. The arc reactor powers the accent language. The repulsor defines the CTAs. Every element is functional, purposeful, engineered. Not flashy — *precise*.

The feeling: "This person doesn't just write code. He builds suits."

---

## Design Language

### Aesthetic Direction

**Iron Man / Mark Suit Interface.** Dark gunmetal surfaces. Arc reactor energy. HUD-style typography. Clean technical lines. Precision over decoration. The portfolio of someone who has read Tony Stark's playbook and taken notes.

Think: The HUD display inside the helmet. The arc reactor's steady pulse. The repulsor beam's focused energy. Everything serves a purpose.

### Color Palette

```css
:root {
  /* Backgrounds — deep space black, never pure */
  --color-bg: #09090B;
  --color-bg-subtle: #0F0F11;
  --color-bg-elevated: #18181B;
  --color-bg-surface: #1F1F23;

  /* Text — cool white, never pure */
  --color-text-primary: #FAFAFA;
  --color-text-secondary: #A1A1AA;
  --color-text-tertiary: #52525B;

  /* Arc Reactor — the power core (primary accent) */
  --color-arc-reactor: #00D4FF;
  --color-arc-reactor-glow: rgba(0, 212, 255, 0.15);
  --color-arc-reactor-dim: rgba(0, 212, 255, 0.6);

  /* Repulsor — the offensive system (secondary accent) */
  --color-repulsor: #FF3B3B;
  --color-repulsor-glow: rgba(255, 59, 59, 0.2);

  /* Gold Accent — classic Iron Man heritage */
  --color-gold: #D4A400;
  --color-gold-subtle: rgba(212, 164, 0, 0.15);

  /* Utility */
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-strong: rgba(255, 255, 255, 0.15);
}
```

**Color usage:**
- Arc reactor cyan: Primary accent — used for glows, active states, key highlights
- Repulsor red: Secondary accent — used for CTAs, important actions, energy
- Gold: Heritage accent — used sparingly for awards, legacy touches
- Never: Purple gradients, neon outer glows, cyan-on-dark with no purpose

### Typography

**HUD Font:** `Orbitron` — the definitive Iron Man tech font. Angular, engineered, instantly recognizable. Used for display headlines, section markers, and HUD-style labels.

**Body Font:** `Rajdhani` — a technical geometric sans with character. Highly legible, slightly futuristic without being gimmicky. Used for body text and descriptions.

**Mono Font:** `JetBrains Mono` — for code, metrics, technical data.

**Type Scale (fluid, clamp-based):**
```css
--text-display: clamp(3rem, 10vw, 7rem);
--text-headline: clamp(1.75rem, 4vw, 2.5rem);
--text-title: clamp(1.125rem, 2vw, 1.375rem);
--text-body: 1rem;
--text-small: 0.875rem;
--text-caption: 0.75rem;
--text-hud: 0.6875rem;  /* 11px — for HUD labels */

--leading-tight: 1.05;
--leading-normal: 1.5;
--leading-relaxed: 1.7;

--tracking-tight: -0.03em;
--tracking-normal: 0;
--tracking-wide: 0.1em;  /* HUD labels are wide-tracked */
```

**Usage rules:**
- Display/Headlines: `Orbitron`, `var(--tracking-tight)`, `var(--leading-tight)`
- Section HUD labels: `Orbitron`, `var(--tracking-wide)`, uppercase, `var(--text-hud)`
- Body: `Rajdhani`, `var(--tracking-normal)`, `var(--leading-relaxed)`
- All text: Sentence case except HUD labels

---

### Spatial System

**4pt base grid:**
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
```

**Layout rhythm:** Alternates between dense technical sections and open compositions. Sections have clear visual boundaries — like suit panels.

**Max content width:** `max-w-[1200px]` centered with `px-6` gutters.

**Responsive:**
- Mobile: Single column, `px-6 py-12`
- Tablet: `md:px-8`
- Desktop: `lg:px-12`

---

### Motion Philosophy

**Principle:** The arc reactor doesn't bounce — it pulses with contained energy. Motion is smooth, precise, purposeful. Like JARVIS responding.

**Timing:** Exponential easing (`cubic-bezier(0.16, 1, 0.3, 1)`). Spring physics for interactive elements.

**Signature animations:**
- **Arc reactor pulse:** Subtle glow breathing on key accent elements (2-3s cycle, very subtle)
- **Staggered mount:** Sections fade-up with 80ms stagger between children
- **Repulsor hover:** Elements intensify glow on hover — like charging the repulsor
- **Scan line:** Very subtle horizontal line animation on section entry

**Motion tokens:**
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-pulse: 2500ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-repulsor: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

**Reduced motion:** All animations disabled for `prefers-reduced-motion`. Static glow states instead.

---

### Visual Assets

**Icons:** Phosphor Icons (thin/regular weight, 1.5 stroke). Minimal use — only functional.

**Arc Reactor Effect:** The signature visual element — a subtle glowing circle with concentric rings, used as a section marker or decorative accent. Implemented via CSS radial gradients + box-shadow.

**HUD Lines:** Thin horizontal rules with subtle glow (`box-shadow: 0 0 10px rgba(0, 212, 255, 0.3)`).

**Decorative elements:**
- Corner brackets on key sections (like targeting HUD corners)
- Subtle scan-line texture overlay (very faint, pointer-events-none)
- Grid dot pattern in hero background (barely visible)

---

## Layout & Structure

### Page Architecture

```
┌─────────────────────────────────────────────────────┐
│ NAVIGATION (floating, glass panel)                  │
│ Logo left · Links right                             │
│ Subtle arc reactor glow on active section           │
├─────────────────────────────────────────────────────┤
│                                                     │
│ HERO (full viewport, asymmetric)                    │
│ Left column: Name (Orbitron, massive)               │
│             Title line with arc reactor underline   │
│             1-line positioning                       │
│ Right column: Status indicator (arc reactor pulse)  │
│             + Repulsor CTA button                   │
│ Background: Subtle grid + scan lines                │
│                                                     │
├─────────────────────────────────────────────────────┤
│ ╔═══════════════════════════════════════════════════╗│
│ ║  [ HUD LABEL: PROJECTS ]                         ║│
│ ╠═══════════════════════════════════════════════════╣│
│  Featured Project (large, left)                     │
│  ┌─────────────────────────────────┬────────────┐  │
│  │ Project title + description     │ Metrics    │  │
│  │ + links                         │ panel      │  │
│  └─────────────────────────────────┴────────────┘  │
│  Secondary projects in asymmetric grid             │
│                                                     │
├─────────────────────────────────────────────────────┤
│ ╔═══════════════════════════════════════════════════╗│
│ ║  [ HUD LABEL: OPEN SOURCE ]                       ║│
│ ╠═══════════════════════════════════════════════════╣│
│  Strawberry GraphQL contribution                   │
│  Code-style display with PR links                  │
│  Arc reactor glow on contribution count            │
│                                                     │
├─────────────────────────────────────────────────────┤
│ ╔═══════════════════════════════════════════════════╗│
│ ║  [ HUD LABEL: EXPERIENCE ]                        ║│
│ ╠═══════════════════════════════════════════════════╣│
│  Timeline with repulsor energy line                 │
│  Role + company + dates                            │
│  Compact bullet points                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│ ╔═══════════════════════════════════════════════════╗│
│ ║  [ HUD LABEL: RECOGNITION ]                      ║│
│ ╠═══════════════════════════════════════════════════╣│
│  Awards displayed as HUD status entries            │
│  Gold accents for place indicators                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│ FOOTER (minimal, panel aesthetic)                  │
│ Contact links + status indicator                   │
│ "Systems nominal" easter egg                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Layout Rules

1. **Asymmetric compositions throughout.** 60/40 or 70/30 splits. Never centered equally.
2. **HUD labels define sections.** Uppercase Orbitron labels with wide tracking and corner brackets.
3. **Panels have subtle borders** — like suit armor plates, not card containers.
4. **Grid-based alignment** — everything snaps to a clear visual grid.
5. **Hero is the command center** — full viewport, most dramatic typography.
6. **On mobile:** Single column, HUD labels become horizontal rules, panels stack.

---

## Component Inventory

### Navigation
- **Appearance:** Fixed position, floating glass panel (`backdrop-blur-md`, subtle border). Logo: "AIYAPPAN" in Orbitron, letter-spaced. Links in Rajdhani, uppercase HUD style.
- **States:** Default (transparent-ish). Scrolled (stronger glass + border). Active section gets subtle arc reactor underline.
- **Mobile:** Hamburger → full-screen overlay with centered links.

### Hero
- **Appearance:** Full viewport (`min-h-[100dvh]`). Name: Orbitron, massive, letter-spaced tight. Title: Rajdhani, smaller, with subtle arc reactor line underneath. Right side: Pulsing status indicator (arc reactor core animation) + repulsor CTA ("View Work →").
- **Background:** Very subtle dot grid pattern + faint scan line overlay.
- **States:** Entrance: staggered fade-up for name → title → CTA.

### Project Panel
- **Appearance:** Dark surface (`--color-bg-surface`) with subtle border. Corner bracket accents. Project name: Orbitron. Description: Rajdhani. Metrics: JetBrains Mono with arc reactor color.
- **States:** Hover: border glows brighter, slight lift via shadow.
- **No:** Card shadows, skill tag pills, stock images, colored left borders.

### Open Source Panel
- **Appearance:** Code terminal aesthetic. Monospace for technical details. PR numbers highlighted in arc reactor cyan. Contribution links as inline text with underline.
- **States:** Links glow on hover.

### Experience Item
- **Appearance:** Left side has thin repulsor-red vertical line (the energy conduit). Company name: Rajdhani bold. Role: secondary color. Dates: tertiary mono. Bullets: minimal dashes.
- **States:** No interactive states.

### Award Entry
- **Appearance:** Gold accent marker (thin line or dot). Award text inline. One line per award.
- **States:** N/A

### Footer
- **Appearance:** Panel with subtle top border. Three contact links. Status line: "SYSTEMS NOMINAL" in HUD style (easter egg reference).
- **States:** Links glow on hover.
- **No:** Social icon grid, colored backgrounds.

---

## Technical Approach

### Stack
- **Framework:** Next.js (App Router, RSC by default, Client Components for animations)
- **Styling:** Tailwind CSS v3 with custom design tokens as CSS variables
- **Animation:** Framer Motion for orchestrated reveals and continuous glow animations
- **Icons:** Phosphor React (thin variant)

### Architecture
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── navigation.tsx
│   ├── hero.tsx
│   ├── projects.tsx
│   ├── open-source.tsx
│   ├── experience.tsx
│   ├── awards.tsx
│   ├── footer.tsx
│   └── ui/
│       ├── arc-reactor.tsx    # Glowing circle effect
│       ├── hud-label.tsx      # Section label component
│       ├── repulsor-button.tsx
│       └── panel.tsx          # Base panel component
└── lib/
    └── data.ts
```

### Performance
- All images: `next/image` with explicit dimensions
- Fonts: `next/font` with `display: swap` (Orbitron, Rajdhani, JetBrains Mono)
- Animations: GPU-accelerated only (`transform`, `opacity`)
- Glow effects: CSS `box-shadow` and `text-shadow` only (no filter: blur for performance)
- Scan-line overlay: Fixed position, pointer-events-none, very low opacity

---

## Anti-Patterns (Strictly Forbidden)

1. ❌ **No centered hero** — asymmetric command center layout only
2. ❌ **No purple/blue gradient backgrounds** — arc reactor cyan or nothing
3. ❌ **No pure black (#000) or pure white (#FFF)** — use defined palette
4. ❌ **No Inter, Roboto, or system defaults** — Orbitron + Rajdhani only
5. ❌ **No skill bars or percentage indicators** — no resume-style filler
6. ❌ **No stock photos** — project artifacts only
7. ❌ **No bounce/elastic easing** — exponential ease only
8. ❌ **No side-stripe borders** — panel borders only
9. ❌ **No card shadow decoration** — subtle border + glow only
10. ❌ **No generic 3-column equal grids** — asymmetric 60/40 or 70/30 only

---

## Design Tokens Summary

```css
/* Core palette */
--color-bg: #09090B;
--color-bg-subtle: #0F0F11;
--color-bg-elevated: #18181B;
--color-bg-surface: #1F1F23;
--color-text-primary: #FAFAFA;
--color-text-secondary: #A1A1AA;
--color-text-tertiary: #52525B;
--color-arc-reactor: #00D4FF;
--color-arc-reactor-glow: rgba(0, 212, 255, 0.15);
--color-repulsor: #FF3B3B;
--color-gold: #D4A400;
--color-border: rgba(255, 255, 255, 0.08);
--color-border-strong: rgba(255, 255, 255, 0.15);

/* Typography */
--font-display: 'Orbitron', sans-serif;
--font-body: 'Rajdhani', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Spacing — 4pt grid */
--space-1 through --space-32

/* Motion */
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-pulse: 2500ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```
