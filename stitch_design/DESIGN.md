---
name: Synthetique Aesthetic
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c1c7d3'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8b919d'
  outline-variant: '#414751'
  surface-tint: '#a4c9ff'
  primary: '#a4c9ff'
  on-primary: '#00315d'
  primary-container: '#60a5fa'
  on-primary-container: '#003a6b'
  inverse-primary: '#0060ac'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#2fd9f4'
  on-tertiary: '#00363e'
  tertiary-container: '#00b2ca'
  on-tertiary-container: '#003f48'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a4c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#a2eeff'
  tertiary-fixed-dim: '#2fd9f4'
  on-tertiary-fixed: '#001f25'
  on-tertiary-fixed-variant: '#004e5a'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 160px
---

## Brand & Style

This design system is built for an elite AI Full Stack Developer portfolio, prioritizing a "Technical Luxury" aesthetic. It draws heavy inspiration from high-end developer tools and premium hardware interfaces, blending **Minimalism** with **Futuristic** accents.

The core philosophy revolves around precision and depth. The UI feels like a high-end command center—dark, focused, and incredibly responsive. We utilize **Glassmorphism** sparingly to indicate hierarchy and **High-Contrast** typography to ensure readability against the deep void of the background. The emotional response should be one of absolute competence, innovation, and "invisible" complexity. Whitespace is treated as a premium asset, used to isolate projects and code snippets as if they were artifacts in a gallery.

## Colors

The palette is rooted in a "Rich Black" ecosystem. The primary background (#09090B) provides a near-infinite canvas, allowing the card surfaces (#18181B) to lift off the page through subtle luminosity rather than heavy shadows.

**Accent Strategy:**
- **Electric Blue (#60A5FA):** Primary action color and focus state.
- **Purple (#A855F7):** Secondary emphasis, used for AI-specific features or tags.
- **Cyan (#22D3EE):** Tertiary highlights for success states or system status.
- **Gradients:** Use linear gradients (45-degree angle) combining these three colors for high-impact elements like primary buttons or "Active Project" borders. Always use these sparingly to maintain the minimalist integrity.

## Typography

This design system leverages **Geist** for its mathematical precision and Swiss-inspired clarity. For technical metadata and code-related labels, **JetBrains Mono** is introduced to provide a functional, "engineered" contrast.

Headlines should utilize tight letter-spacing and heavy weights to create a "blocky," structural feel. Body text remains generous in line-height to ensure maximum legibility against dark backgrounds. Use "Display" styles only for hero sections where the text acts as a primary visual element.

## Layout & Spacing

The layout follows a **Fixed Grid** approach for the main content container to maintain the "editorial" feel typical of premium developer portfolios. 

- **Grid:** A 12-column grid system is used for desktop, collapsing to 4 columns on mobile.
- **Rhythm:** An 8px linear scale governs all padding and margins.
- **Sectioning:** Vertical rhythm is intentionally slow. Large "Section Gaps" (160px+) are used to separate major portfolio categories (Work, Tools, About), allowing each section to command the user's full attention. 
- **Alignment:** Strict left-alignment for text content, with occasional centered hero elements for dramatic effect.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Subtle Glassmorphism**.

1.  **Base (Level 0):** The #09090B background.
2.  **Surface (Level 1):** The #18181B cards. These do not use shadows; instead, they use a **Thin Border** (1px solid rgba(255, 255, 255, 0.08)) to define their edges.
3.  **Floating (Level 2):** Navigation bars and dropdowns. These use a `backdrop-filter: blur(12px)` with a semi-transparent background (rgba(9, 9, 11, 0.7)).
4.  **Interactive:** On hover, cards may feature a **Soft Glow**—a low-opacity radial gradient that follows the cursor, mimicking a localized light source behind the glass.

## Shapes

The design system uses a **Rounded** language to soften the technical edge of the dark theme. 

- **Cards & Sections:** Use `rounded-2xl` (1.5rem / 24px) to create a modern, friendly silhouette.
- **Buttons & Inputs:** Use `rounded-lg` (1rem / 16px) for a tighter, more functional appearance.
- **Tags/Chips:** Use fully rounded pill shapes to distinguish them from interactive buttons.
- **Borders:** All borders must be 1px wide. Avoid thicker borders to maintain the "refined" aesthetic.

## Components

### Buttons
- **Primary:** Solid background (White or Gradient) with black text. No shadow, but a 2px offset "halo" glow on focus.
- **Secondary:** Transparent background with a thin 1px white border. Subtle white fill (10% opacity) on hover.
- **Ghost:** No border or background. Only text, turning white on hover.

### Cards
Cards are the primary container. They must feature a subtle top-down linear gradient (from #18181B to #111827) and a 1px border. For "Featured" projects, use a **Gradient Outline**—a 1px border with a linear gradient of Blue to Purple.

### Input Fields
Inputs should be dark (#09090B) with a 1px border. Upon focus, the border color transitions to Electric Blue, and a very soft blue outer glow appears.

### Chips & Tags
Used for tech stacks (e.g., "Next.js", "OpenAI"). Use JetBrains Mono, small caps, with a dark gray background (#27272A) and no border.

### Code Blocks
A signature component. Use a slightly different dark shade (#020617), `rounded-xl`, and include a "Copy" button that appears only on hover. Use high-contrast syntax highlighting based on a modified "Vercel Dark" theme.