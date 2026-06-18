---
name: Seraphic Blush
colors:
  surface: '#fff8f8'
  surface-dim: '#e2d7d9'
  surface-bright: '#fff8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf1f3'
  surface-container: '#f7ebed'
  surface-container-high: '#f1e5e8'
  surface-container-highest: '#ebe0e2'
  on-surface: '#1f1a1c'
  on-surface-variant: '#554245'
  inverse-surface: '#352f31'
  inverse-on-surface: '#f9eef0'
  outline: '#887175'
  outline-variant: '#dbc0c4'
  surface-tint: '#a03b56'
  primary: '#a03b56'
  on-primary: '#ffffff'
  primary-container: '#ff85a1'
  on-primary-container: '#771b38'
  inverse-primary: '#ffb1c0'
  secondary: '#665c5f'
  on-secondary: '#ffffff'
  secondary-container: '#eadce0'
  on-secondary-container: '#6a6063'
  tertiary: '#006d36'
  on-tertiary: '#ffffff'
  tertiary-container: '#57bf77'
  on-tertiary-container: '#004a22'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9df'
  primary-fixed-dim: '#ffb1c0'
  on-primary-fixed: '#3f0016'
  on-primary-fixed-variant: '#81233f'
  secondary-fixed: '#eddfe3'
  secondary-fixed-dim: '#d1c3c7'
  on-secondary-fixed: '#211a1d'
  on-secondary-fixed-variant: '#4e4448'
  tertiary-fixed: '#90f9aa'
  tertiary-fixed-dim: '#74dc90'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005227'
  background: '#fff8f8'
  on-background: '#1f1a1c'
  surface-variant: '#ebe0e2'
typography:
  display-lg:
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
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 48px
---

## Brand & Style

This design system embodies a **Hyper-Feminine Minimalism** aesthetic, blending the structured elegance of "Bento" layouts with a soft, romantic palette. The brand personality is optimistic, chic, and inviting, targeting a demographic that appreciates editorial sophistication with a friendly, modern touch. 

The visual style leverages **Glassmorphism** and **Soft Tonal Layering**. Surfaces feel lightweight and airy, utilizing translucent overlays to maintain depth without the heaviness of traditional shadows. The emotional response should be one of "warm clarity"—an interface that feels like a high-end digital boutique: organized, breathable, and aesthetically nurturing.

## Colors

The palette is monochromatic and high-vibrancy, centered around a signature **Bright Pink (#FF85A1)**. This primary hue serves as the singular driver for action, used for buttons, active states, and critical accents. 

The background is a consistent **Light Pink (#FFF0F4)**, providing a warmer, more sophisticated alternative to pure white. **Pure White (#FFFFFF)** is reserved exclusively for elevated surfaces, container cards, and the bottom navigation bar to create a distinct visual "lift" from the background. All previous dark burgundy or brown tones are removed in favor of soft neutral greys for secondary text to maintain a low-contrast, ethereal feel.

## Typography

This design system employs a high-contrast typographic pairing to reinforce its editorial character. **Playfair Display** is used for all headlines and display text, providing a classical, high-fashion authority. Titles should use "Title Case" to emphasize the serif's elegant terminals.

**Plus Jakarta Sans** provides a contemporary, soft balance for functional text. Its geometric but rounded nature complements the serif headlines while ensuring maximum legibility for body copy and UI labels. Tracking on headlines should be slightly tightened (-2%), while labels benefit from a slight increase in letter spacing (+1%) to improve scannability against the light pink backgrounds.

## Layout & Spacing

The layout follows a **Fluid Bento Grid** philosophy. Content is organized into distinct "cells" or "tiles" with varied aspect ratios, creating a mosaic effect that feels both structured and playful.

- **Grid Model:** A 12-column grid on desktop and a 4-column grid on mobile. 
- **Bento Logic:** Elements are grouped into containers with uniform padding. Vertical spacing between bento groups is generous (40px+) to allow the design to breathe.
- **Alignment:** All containers utilize a consistent 16px gutter. 
- **Reflow:** On mobile, bento cells stack vertically, but maintaining a "2x2" small-card pattern for secondary actions is encouraged to keep the visual density interesting.

## Elevation & Depth

Depth is conveyed through **Tonal Separation** rather than heavy shadows. 
- **Level 0 (Background):** The canvas uses the secondary Light Pink (#FFF0F4).
- **Level 1 (Bento Cells):** Cards and containers use Pure White (#FFFFFF). They feature a very soft, high-diffusion shadow (0px 4px 20px) with the primary color at 5% opacity to create a "pink-tinted" glow.
- **Level 2 (Interactive):** Buttons and active states utilize a solid Primary Pink (#FF85A1) fill.
- **Glass Effect:** Floating headers or modal overlays use a white backdrop-filter (blur: 12px) at 80% opacity, allowing the background pink to subtly bleed through.

## Shapes

The shape language is consistently **Rounded**, avoiding sharp corners to maintain the friendly and approachable brand persona.
- **Standard Containers:** Use a 0.5rem (8px) radius.
- **Bento Cards:** Use a larger "rounded-lg" (16px) radius to emphasize the modular structure.
- **Interactive Elements:** Buttons and input fields follow the rounded-lg standard, while smaller chips or badges may use a full pill-shape.

## Components

### Buttons
Primary buttons are solid **#FF85A1** with white text. They should have a subtle "lift" on hover. Secondary buttons use an outline of the primary color with a transparent fill.

### Bottom Navigation
The navigation bar must sit on a **Pure White (#FFFFFF)** background. The active state indicator is a small horizontal bar or a tinted glyph in **#FF85A1**. Inactive icons should use a medium-grey neutral.

### Cards (Bento Cells)
All cards use a white background. Content within cards should be padded at 24px. Borders are unnecessary; depth should be handled by the subtle tinted shadow described in the Elevation section.

### Input Fields
Inputs use a white background with a 1px border of the secondary pink. Upon focus, the border transitions to the Primary Pink (#FF85A1) with a soft outer glow.

### Chips & Tags
Small labels used for categorization should have a light pink fill (#FFF0F4) and #FF85A1 text to remain legible without competing with primary call-to-action buttons.