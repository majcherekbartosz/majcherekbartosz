---
name: Artisanal Rosé Minimalist
colors:
  surface: '#fff8f8'
  surface-dim: '#e7d6d9'
  surface-bright: '#fff8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f3'
  surface-container: '#fbeaed'
  surface-container-high: '#f5e4e8'
  surface-container-highest: '#efdee2'
  on-surface: '#22191c'
  on-surface-variant: '#4d4447'
  inverse-surface: '#382e31'
  inverse-on-surface: '#feecf0'
  outline: '#7f7478'
  outline-variant: '#d0c3c7'
  surface-tint: '#6b5a60'
  primary: '#6b5a60'
  on-primary: '#ffffff'
  primary-container: '#fce4ec'
  on-primary-container: '#76646b'
  inverse-primary: '#d7c1c8'
  secondary: '#665c5e'
  on-secondary: '#ffffff'
  secondary-container: '#ebdcdf'
  on-secondary-container: '#6a6063'
  tertiary: '#ab2c5d'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffe3e8'
  on-tertiary-container: '#b93768'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f4dce4'
  primary-fixed-dim: '#d7c1c8'
  on-primary-fixed: '#25181e'
  on-primary-fixed-variant: '#524249'
  secondary-fixed: '#eddfe2'
  secondary-fixed-dim: '#d1c3c6'
  on-secondary-fixed: '#211a1c'
  on-secondary-fixed-variant: '#4e4447'
  tertiary-fixed: '#ffd9e1'
  tertiary-fixed-dim: '#ffb1c5'
  on-tertiary-fixed: '#3f001b'
  on-tertiary-fixed-variant: '#8b0e45'
  background: '#fff8f8'
  on-background: '#22191c'
  surface-variant: '#efdee2'
typography:
  headline-xl:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system embodies an **Artisanal Minimalist** aesthetic, tailored specifically for the warmth of home cooking and the refinement of a culinary diary. The personality is gentle, premium, and deeply personal—evoking the feeling of a sun-drenched kitchen and hand-pasted recipe scrapbooks.

The style leverages high-quality editorial typography and a restrained use of color to create a calm, focused environment. It avoids the clinical coldness of typical tech products, favoring soft edges, subtle depth, and intentional whitespace. The interface should feel like a premium lifestyle magazine: breathable, authoritative, yet approachable.

Key visual pillars:
- **Calmness:** Generous whitespace and a low-vibrancy palette.
- **Craftsmanship:** Use of sophisticated serifs and thin-line iconography.
- **Warmth:** Soft pink tints and off-white backgrounds that reduce eye strain and feel "homey."

## Colors

The palette is a sophisticated study in tonal pinks and warm neutrals. 

- **Primary & Secondary:** These are utilized for large surface areas, page backgrounds, and subtle containers. They provide the "blush" that defines the brand's warmth.
- **Tertiary (Accent):** A deeper rose used sparingly for critical call-to-actions, active states, and small semantic highlights (like hearts or badges).
- **Neutral:** A warm, dark charcoal-brown replaces pure black for all text and structural borders to maintain the soft, artisanal feel.
- **Functional Colors:** Success, warning, and error states should be desaturated to match the palette's "dusty" profile (e.g., a sage green for success rather than a neon green).

## Typography

The typography strategy relies on the contrast between a literary serif and a functional sans-serif.

- **Headlines:** Use *Libre Caslon Text* for all titles and headings. Its historical, high-contrast stems evoke a sense of tradition and premium editorial quality.
- **Body:** Use *Work Sans* for all long-form text, ingredient lists, and instructions. It offers excellent legibility at smaller sizes and maintains a clean, modern balance against the serif headings.
- **Labels:** Small metadata (like cooking time or serving sizes) should use *Work Sans* in all-caps with generous letter-spacing to create a "tag" effect without cluttering the hierarchy.

## Layout & Spacing

The layout follows a **Fluid Grid** model with an emphasis on "white space as a luxury."

- **Grid:** A 12-column grid for desktop with wide 24px gutters. Elements should often span 6 or 8 columns to leave intentional "breathing room" on the sides of the content.
- **Rhythm:** Spacing follows an 8px base unit. Vertical rhythm is critical; use `stack-lg` (48px) to separate major sections like "Ingredients" from "Instructions" to give the eye a place to rest.
- **Mobile:** Transition to a 4-column grid with 16px margins. Card components should use full-bleed or near full-bleed widths to maximize food photography impact.

## Elevation & Depth

This system avoids heavy drop shadows in favor of **Tonal Layers** and **Soft Ambient Shadows**.

- **Surfaces:** Depth is primarily communicated through color shifts. The main page background is the darkest "pink tint," while active cards or modals use the lighter off-white to "pop" forward.
- **Shadows:** When necessary (e.g., for floating action buttons or dropdown menus), use ultra-soft, diffused shadows tinted with the primary brand color rather than black.
  - *Shadow Spec:* `0 8px 32px rgba(74, 63, 66, 0.06)` — This creates a subtle lift that feels natural and light.
- **Outlines:** Use thin, low-contrast borders (`1px solid #FCE4EC`) for secondary cards to maintain structure without adding visual weight.

## Shapes

The shape language is **Rounded**, reflecting the organic nature of food and ingredients. 

- **Cards & Inputs:** Use the standard 0.5rem (8px) radius. This provides a modern, approachable feel while remaining structured.
- **Large Elements:** Major section containers or "featured recipe" cards can scale up to `rounded-xl` (1.5rem) to emphasize their importance and softness.
- **Interactive Elements:** Buttons and tags should utilize the pill-shape convention to make them feel "touchable" and distinct from informational containers.

## Components

- **Buttons:** Primary buttons are pill-shaped with the tertiary rose background and white text. Secondary buttons are outlined with a soft pink border and neutral text.
- **Recipe Cards:** These should feature a full-width image at the top with a `16:9` aspect ratio. Content below the image should have generous 24px padding. Titles use `headline-md`.
- **Chips/Tags:** Used for categories (e.g., "Breakfast"). These are small, pill-shaped elements with a secondary pink background and `label-caps` typography.
- **Input Fields:** Search bars and text inputs should be off-white with a subtle 1px border. Use the body-font for placeholder text to keep it readable and clean.
- **Lists:** Ingredient lists should feature custom bullet points (small pink dots) and utilize `body-lg` for readability while cooking. 
- **Progress Indicators:** When following a recipe, use a soft, thick line in the tertiary color to show movement through the steps.