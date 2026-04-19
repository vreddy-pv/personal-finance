# VRGT Branding Implementation Guide

## Quick Start

### 1. Import Brand Colors in Components

```typescript
import { VRGT_COLORS, VRGT_LOGOS } from '@shared/constants/branding.constants';

export class MyComponent {
  primaryColor = VRGT_COLORS.mediumPurple;
  logoPath = VRGT_LOGOS.horizontal;
}
```

### 2. Use Colors in Templates

```html
<!-- Using component property -->
<button [style.background-color]="primaryColor">Click me</button>

<!-- Using CSS variable -->
<div style="color: var(--vrgt-medium-purple)">Styled Text</div>
```

### 3. Use Colors in SCSS

```scss
@import 'styles/vrgt-colors.scss';

.my-card {
  background: $vrgt-very-light;
  border: 1px solid $vrgt-light-purple;
  color: $vrgt-charcoal;
}
```

---

## Common Use Cases

### Navbar with VRGT Logo

```html
<nav class="navbar">
  <img [src]="VRGT_LOGOS.horizontal" alt="VRGT" class="logo">
  <span class="brand-name">{{ VRGT_BRANDING.appTitle }}</span>
</nav>
```

```scss
.navbar {
  background: $vrgt-dark-purple;
  color: white;

  .logo {
    height: 40px;
    margin-right: 16px;
  }
}
```

### Primary Action Button

```html
<button class="btn btn-primary" (click)="onSave()">
  <mat-icon>save</mat-icon>
  Save Transaction
</button>
```

```scss
.btn {
  padding: 10px 24px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &.btn-primary {
    background: $vrgt-medium-purple;
    color: white;
    border: none;

    &:hover {
      background: darken($vrgt-medium-purple, 5%);
      box-shadow: 0 2px 8px rgba($vrgt-dark-purple, 0.2);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
```

### Transaction Status Indicator

```html
<div [ngSwitch]="status" class="status-badge">
  <span *ngSwitchCase="'success'" class="badge-success">
    <mat-icon>check_circle</mat-icon> Completed
  </span>
  <span *ngSwitchCase="'warning'" class="badge-warning">
    <mat-icon>warning</mat-icon> Pending
  </span>
  <span *ngSwitchCase="'error'" class="badge-error">
    <mat-icon>error</mat-icon> Failed
  </span>
</div>
```

```scss
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;

  .badge-success {
    background: rgba($vrgt-teal, 0.1);
    color: $vrgt-teal;
  }

  .badge-warning {
    background: rgba($vrgt-amber, 0.1);
    color: darken($vrgt-amber, 10%);
  }

  .badge-error {
    background: rgba(#E74C3C, 0.1);
    color: #E74C3C;
  }
}
```

### Card with VRGT Styling

```html
<mat-card class="vrgt-card">
  <mat-card-header>
    <h2 class="card-title">Recent Transactions</h2>
  </mat-card-header>
  <mat-card-content>
    <!-- Card content -->
  </mat-card-content>
</mat-card>
```

```scss
.vrgt-card {
  background: white;
  border: 1px solid $vrgt-light-gray;
  box-shadow: 0 2px 8px rgba($vrgt-dark-purple, 0.1);

  &:hover {
    box-shadow: 0 4px 12px rgba($vrgt-dark-purple, 0.15);
    transition: box-shadow 0.3s ease;
  }

  .card-title {
    color: $vrgt-dark-purple;
    font-weight: 600;
    margin: 0;
  }
}
```

### Form Input with VRGT Focus State

```html
<mat-form-field class="vrgt-form-field">
  <mat-label>Transaction Amount</mat-label>
  <input matInput type="number" [(ngModel)]="amount" />
  <mat-currency-symbol matPrefix>$</mat-currency-symbol>
</mat-form-field>
```

```scss
.vrgt-form-field {
  width: 100%;
  margin-bottom: 16px;

  &.mat-focused {
    .mat-form-field-focus-overlay {
      background-color: rgba($vrgt-medium-purple, 0.05);
    }

    .mat-form-field-label {
      color: $vrgt-medium-purple;
    }

    .mat-form-field-underline {
      background-color: $vrgt-medium-purple;
    }
  }
}
```

### Header with Gradient

```html
<div class="header-hero">
  <h1>Welcome to VRGT</h1>
  <p>Manage your finances at the peak of digital realm</p>
</div>
```

```scss
.header-hero {
  background: $vrgt-gradient-primary;
  color: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;

  h1 {
    margin: 0 0 8px 0;
    font-size: 32px;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 14px;
    opacity: 0.95;
  }
}
```

---

## Color Accessibility

### High Contrast Combinations

✓ **Dark Purple text on Very Light background**
```scss
color: $vrgt-dark-purple;
background: $vrgt-very-light;
```

✓ **White text on Medium Purple background**
```scss
color: white;
background: $vrgt-medium-purple;
```

✓ **White text on Teal background**
```scss
color: white;
background: $vrgt-teal;
```

### Low Contrast (Avoid)
✗ **Gray text on Off-white background** - Use only for placeholder/disabled states

---

## Dark Mode Support (Future)

When implementing dark mode, use these mappings:

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --vrgt-bg-primary: #{$vrgt-dark-purple};
    --vrgt-bg-secondary: #{$vrgt-charcoal};
    --vrgt-text-primary: white;
    --vrgt-text-secondary: #{$vrgt-light-gray};
  }
}
```

---

## Testing VRGT Colors

### Manual Testing Checklist
- [ ] Logo displays correctly in navbar
- [ ] All buttons use correct hover/active states
- [ ] Color contrast meets WCAG AA standards
- [ ] Status badges are distinguishable for colorblind users
- [ ] Favicon displays in browser tab
- [ ] Print styles maintain color integrity

### Automated Testing
```typescript
// Example: Test color contrast
import { getComputedStyle } from '@testing-library/dom';

it('should have sufficient color contrast', () => {
  const element = document.querySelector('.primary-button');
  const bgColor = getComputedStyle(element).backgroundColor;
  const textColor = getComputedStyle(element).color;
  
  // Assert contrast ratio >= 4.5:1
  expect(getContrastRatio(bgColor, textColor)).toBeGreaterThanOrEqual(4.5);
});
```

---

## Updating the Branding System

If you need to modify colors:

1. **Update** `src/styles/vrgt-colors.scss`
2. **Update** `src/app/shared/constants/branding.constants.ts`
3. **Update** `BRANDING.md` documentation
4. **Test** all components with new colors
5. **Commit** with message: `feat: update VRGT brand colors`

---

## Resource Files

| File | Purpose |
|------|---------|
| `src/styles/vrgt-colors.scss` | SCSS color variables and CSS custom properties |
| `src/app/shared/constants/branding.constants.ts` | TypeScript color and logo constants |
| `src/styles.scss` | Global styles with VRGT theme |
| `src/index.html` | Favicon references and meta tags |
| `src/assets/branding/logos/*` | SVG logo variants |
| `src/assets/branding/favicons/*` | Favicon assets |

---

## Support

For questions about VRGT branding implementation, refer to:
1. **BRANDING.md** - Brand identity guidelines
2. **BRANDING_IMPLEMENTATION.md** - This file (code examples)
3. **vrgt-colors.scss** - Available color variables
4. **branding.constants.ts** - Available constants in TypeScript
