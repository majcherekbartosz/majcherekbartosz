---
name: Warm Bento Culinary
colors:
  surface: '#fbf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#fbf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e4e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#554245'
  inverse-surface: '#30312f'
  inverse-on-surface: '#f2f0ed'
  outline: '#887175'
  outline-variant: '#dbc0c4'
  surface-tint: '#a03b56'
  primary: '#a03b56'
  on-primary: '#ffffff'
  primary-container: '#ff85a1'
  on-primary-container: '#771b38'
  inverse-primary: '#ffb1c0'
  secondary: '#77574d'
  on-secondary: '#ffffff'
  secondary-container: '#ffd3c6'
  on-secondary-container: '#7a594f'
  tertiary: '#645d53'
  on-tertiary: '#ffffff'
  tertiary-container: '#b3aa9e'
  on-tertiary-container: '#443f35'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9df'
  primary-fixed-dim: '#ffb1c0'
  on-primary-fixed: '#3f0016'
  on-primary-fixed-variant: '#81233f'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#e7bdb1'
  on-secondary-fixed: '#2c150e'
  on-secondary-fixed-variant: '#5d4037'
  tertiary-fixed: '#ebe1d4'
  tertiary-fixed-dim: '#cfc5b9'
  on-tertiary-fixed: '#1f1b13'
  on-tertiary-fixed-variant: '#4c463c'
  background: '#fbf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2df'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 64px
  gutter: 20px
  margin-mobile: 20px
  margin-desktop: 80px
---

## Brand & Style

The design system is centered on a "Culinary Diary" ethos—a digital sanctuary for preserving recipes and culinary memories. The personality is warm, feminine, and sophisticated, avoiding the clinical nature of typical utility apps. 

The aesthetic blends **Modern Minimalism** with **Tactile Softness**. It utilizes a bento-grid structure to organize content into digestible, playful modules. The emotional response should be one of comfort and inspiration, achieved through an "Editorial-meets-App" approach that prioritizes high-quality food photography and graceful movement.

## Colors

The palette is anchored in a soft, inviting cream background to reduce eye strain and mimic high-quality stationery.

- **Primary (#FF85A1):** A warm, vibrant pink used for key actions, brand moments, and highlighting active states.
- **Secondary (#7D5C52):** A muted cocoa brown used for body text and icon outlines to maintain a softer contrast than pure black.
- **Tertiary (#E8DED1):** A "latte" shade used for subtle container backgrounds and secondary buttons.
- **Neutral (#FAF8F5):** The base canvas, providing a warm, milky foundation for the entire UI.

## Typography

This design system employs a classic typographic pairing:
- **Serif (Playfair Display):** Reserved for recipe titles and section headers. It brings a literary, elegant feel to the diary.
- **Sans-serif (Plus Jakarta Sans):** Used for all functional UI components, measurements, and body text. Its rounded terminals complement the overall shape language.

Maintain generous line heights for recipe instructions to ensure legibility while cooking.

## Layout & Spacing

The layout follows a **Fluid Bento Grid** philosophy. Content is grouped into distinct "tiles" with varying sizes.

- **Grid:** Use a 12-column grid for desktop and a 4-column grid for mobile.
- **Bento Modules:** Tiles should span different column counts (e.g., a "Featured Recipe" card spanning 8 columns, while "Cooking Time" and "Difficulty" span 2 columns each).
- **Rhythm:** Use a 24px (md) standard for gutters and inner-card padding to ensure the UI feels "breathable" and premium.

## Elevation & Depth

Depth is created through **Tonal Layering** and **Ambient Shadows** rather than harsh borders.

- **Planes:** Surfaces should feel like they are floating slightly above the cream background.
- **Shadows:** Use extremely soft, long-range shadows (Blur: 30px, Y: 10px) with a very low opacity (5-8%) tinted with the secondary brown color (#7D5C52) to avoid "dirty" grey shadows.
- **Outlines:** Cards feature a 1px solid border in the Tertiary color (#E8DED1) to provide definition without breaking the softness.

## Shapes

The shape language is defined by **High Circularity**. 

- **Primary Cards:** Use a base radius of 24px to 32px for all main bento containers.
- **Interactive Elements:** Buttons and tags should be fully pill-shaped (rounded-full).
- **Images:** Photography within cards must inherit the container's corner radius or use a nested radius that is 4px smaller than the parent.

## Components

### Buttons
Primary buttons are pill-shaped with the Brand Pink background and white text. Secondary buttons use the Tertiary background with Secondary Brown text. All buttons have a subtle "press" animation that scales the element to 98%.

### Cards (Bento Tiles)
The core of the system. Cards feature a white or light cream background, a 1px border, and soft shadows. Image-focused cards should use "Center-Fill" cropping to maintain the grid's visual density. Text-heavy cards (ingredients list) use a slightly smaller radius (16px) for inner list items.

### Inputs & Selectors
Fields are pill-shaped with a 1px Tertiary border. Focus states transition the border to Brand Pink. Use a soft cream fill (#FAF8F5) inside inputs to distinguish them from the card background.

### Chips & Tags
Used for dietary labels (e.g., "Vegan", "Quick"). These are small, pill-shaped elements using low-saturation versions of the primary color with `label-sm` typography.

### Lists
Recipe steps should be displayed in a vertical list with custom-styled numbers using the Playfair Display font in the Brand Pink color, creating a clear and elegant sequence.