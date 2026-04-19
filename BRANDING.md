# VRGT Brand Identity Guide

## Brand Overview

**VRGT – Vertex Realm Global Technologies**

A professional personal finance management platform with a modern, tech-forward visual identity.

**Tagline:** "At the peak of every digital realm."

---

## Color Palette

### Primary Colors

| Color | Hex Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| Dark Purple | `#26215C` | `--vrgt-dark-purple` | Backgrounds, dark elements |
| Medium Purple | `#534AB7` | `--vrgt-medium-purple` | Primary buttons, headings, interactive elements |
| Light Purple | `#AFA9EC` | `--vrgt-light-purple` | Borders, subtle accents, hover states |
| Teal | `#1D9E75` | `--vrgt-teal` | Success states, secondary actions, accents |
| Amber | `#EF9F27` | `--vrgt-amber` | Warnings, highlights, accent badges |
| Light Amber | `#FAC775` | `--vrgt-light-amber` | Inner highlights |

### Supporting Colors

| Color | Hex Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| Charcoal | `#2C2C2A` | `--vrgt-charcoal` | Text, dark elements |
| Gray | `#888780` | `--vrgt-gray` | Secondary text, labels |
| Light Gray | `#D3D1C7` | `--vrgt-light-gray` | Borders, dividers |
| Off-white | `#F1EFE8` | `--vrgt-off-white` | Backgrounds, cards |
| Very Light | `#EEEDFE` | `--vrgt-very-light` | Light backgrounds, subtle fills |

### Semantic Colors

- **Success:** `#1D9E75` (Teal)
- **Warning:** `#EF9F27` (Amber)
- **Error:** `#E74C3C` (Red)
- **Info:** `#534AB7` (Medium Purple)

---

## Gradients

### Primary Gradient
```css
background: linear-gradient(90deg, #26215C 0%, #7F77DD 55%, #1D9E75 100%);
```
Used for wordmarks, highlights, and feature elements.

### Hex Gradient
```css
background: linear-gradient(135deg, #26215C 0%, #3C3489 100%);
```
Used for the primary logo hexagon.

---

## Logo Variants

### 1. **Primary Logo** (`vrgt-logo.svg`)
- Hexagon + orbital rings + V mark + amber apex dot
- Use for: app icon, favicon, hero sections
- Minimum size: 64px

### 2. **Wordmark** (`vrgt-wordmark.svg`)
- "VRGT" with full expanded name below
- Use for: headers, page titles, large displays
- Minimum width: 300px

### 3. **Horizontal Lockup** (`vrgt-lockup-horizontal.svg`)
- Logo symbol + "VRGT" + expanded name (stacked)
- Use for: navbar, horizontal layouts
- Minimum width: 280px

### 4. **Favicon** (`favicon.svg`)
- Simplified hex logo for browser tab
- Available in: 16px, 32px, 48px, 64px

---

## Favicon Usage

The favicon comes in multiple formats for different contexts:

### SVG (Scalable)
```html
<link rel="icon" type="image/svg+xml" href="assets/branding/favicons/favicon.svg" />
```

### Dark Variant (64px, dark background)
- Use for: app launcher, about pages
- Color: Dark purple background with gradient

### Light Variant (64px, light background)
- Use for: light-themed contexts
- Color: White/light background with dark logo

### App Store (rounded square)
- For: iOS App Store, app marketplaces
- Corner radius: Large rounded square (App Store style)

### Monochrome (dark)
- For: monochrome contexts
- Color: Grayscale only

---

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
```

### Weights Used
- **700** (Bold) - Primary headings, brand name
- **600** (Semibold) - Section headings, emphasis
- **500** (Medium) - Labels, subheadings
- **400** (Regular) - Body text
- **300** (Light) - Secondary text, helper text

---

## Component Guidelines

### Buttons

**Primary Button**
- Background: `--vrgt-medium-purple` (#534AB7)
- Text: White
- Hover: Darker shade of purple
- Border: None
- Padding: 10px 24px
- Border-radius: 4px

**Secondary Button (Accent)**
- Background: `--vrgt-teal` (#1D9E75)
- Text: White
- Hover: Darker shade of teal

**Danger Button**
- Background: `#E74C3C`
- Text: White
- Hover: Darker red

### Cards

- Background: White or `--vrgt-very-light`
- Border: 1px solid `--vrgt-light-gray`
- Shadow: `0 2px 8px rgba(38, 33, 92, 0.1)` (light)
- Hover Shadow: `0 4px 12px rgba(38, 33, 92, 0.15)` (elevated)
- Border-radius: 8px

### Form Fields

- Border: 1px solid `--vrgt-light-gray`
- Focus border: `--vrgt-medium-purple`
- Focus background: `rgba(83, 74, 183, 0.05)`
- Label color: `--vrgt-gray`
- Placeholder: Light gray

### Input Validation

- **Valid**: Green check with `--vrgt-success` (#1D9E75)
- **Error**: Red border with error icon
- **Warning**: Amber border with warning icon

---

## Using VRGT Colors in Your Code

### SCSS
```scss
@import 'styles/vrgt-colors.scss';

.my-component {
  background: $vrgt-medium-purple;
  color: white;
  border: 1px solid $vrgt-light-purple;

  &:hover {
    background: darken($vrgt-medium-purple, 5%);
  }
}
```

### TypeScript / CSS
```typescript
const colors = {
  primary: 'var(--vrgt-medium-purple)',
  teal: 'var(--vrgt-teal)',
  amber: 'var(--vrgt-amber)'
};

// Or inline CSS
<div style="background: var(--vrgt-medium-purple)"></div>
```

---

## Asset Locations

```
services/frontend/src/assets/branding/
├── logos/
│   ├── vrgt-logo.svg              # Primary logo (hex + V)
│   ├── vrgt-wordmark.svg          # Logo + text
│   ├── vrgt-lockup-horizontal.svg # Side-by-side layout
│   └── vrgt-brand-guide.svg       # Full brand guide reference
├── favicons/
│   ├── favicon.svg                # SVG favicon (all sizes)
│   └── [png variants - convert from SVG as needed]
└── icons/
    └── [future: icon library]
```

---

## Converting SVG Favicons to PNG

To create .ico and .png favicon files from the SVG:

### Using ImageMagick
```bash
convert -density 256x256 -background none favicon.svg -define icon:auto-resize=64,48,32,16 favicon.ico
convert -density 256 favicon.svg -resize 192x192 -background white favicon-192x192.png
convert -density 256 favicon.svg -resize 512x512 -background white favicon-512x512.png
```

### Using Online Tool
Visit: https://convertio.co/svg-ico/ or similar SVG to PNG converter

### Using RealFaviconGenerator
Upload `vrgt-brand-guide.svg` and generate all favicon variants at: https://realfavicongenerator.net/

---

## Best Practices

### Do's ✓
- Use the primary purple for main CTAs and headings
- Use the teal for secondary actions and success states
- Maintain minimum 64px size for logo usage
- Keep adequate whitespace around logo (min 1/4 of logo height)
- Use the full horizontal lockup for navbar/headers
- Apply consistent spacing using 4px/8px grid

### Don'ts ✗
- Don't resize logo below 64px
- Don't change colors without design review
- Don't overlay logo on busy backgrounds
- Don't stretch or skew logo
- Don't use logo in negative space without contrast testing
- Don't mix multiple gradient variations

---

## Accessibility

- Maintain minimum 4.5:1 contrast ratio for body text
- Use `--vrgt-teal` + white for success feedback (supports colorblind users)
- Test all color combinations with Contrast Checker
- Don't rely on color alone for status indication

---

## Future Enhancements

- [ ] Icon library (24px Material Icons in VRGT colors)
- [ ] Animation guidelines (hover states, transitions)
- [ ] Dark mode palette variant
- [ ] Illustration style guide
- [ ] Photography treatment guidelines

---

## Questions or Updates?

This branding guide should be updated as the design system evolves. For changes, coordinate with the design team and update both this document and the related SCSS/SVG files.

**Last Updated:** April 2026
**Version:** 1.0
