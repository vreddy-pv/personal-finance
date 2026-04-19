# VRGT Component Styles Guide

This guide shows how to use the VRGT component styling system in your Angular components.

## Quick Start

All component styles are automatically imported in `src/styles.scss`. Simply use the CSS classes in your templates:

```html
<button class="btn btn-primary">Save</button>
<div class="card">
  <h1 class="card-title">My Card</h1>
</div>
```

Or use the SCSS mixins in your component styles:

```scss
@import 'styles/vrgt-colors.scss';
@import 'styles/vrgt-components.scss';

.my-custom-button {
  @include vrgt-button($vrgt-medium-purple);
}
```

---

## Buttons

### Basic Buttons

```html
<!-- Primary Button -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary Button (Teal) -->
<button class="btn btn-secondary">Secondary Action</button>

<!-- Success Button -->
<button class="btn btn-success">Success</button>

<!-- Warning Button -->
<button class="btn btn-warning">Warning</button>

<!-- Danger Button -->
<button class="btn btn-danger">Delete</button>

<!-- Outline Button -->
<button class="btn btn-outline">Outline</button>
```

### Button Sizes

```html
<button class="btn btn-primary btn-sm">Small Button</button>
<button class="btn btn-primary">Regular Button</button>
<button class="btn btn-primary btn-lg">Large Button</button>
```

### Button Variants

```html
<!-- Full Width Button -->
<button class="btn btn-primary btn-block">Full Width</button>

<!-- Icon Button -->
<button class="btn btn-primary btn-icon">
  <mat-icon>save</mat-icon>
</button>

<!-- Disabled Button -->
<button class="btn btn-primary" disabled>Disabled</button>
```

### Material Buttons (with Angular Material)

```html
<button mat-button>Text Button</button>
<button mat-raised-button>Raised Button</button>
<button mat-flat-button color="primary">Flat Primary</button>
<button mat-stroked-button color="accent">Stroked Accent</button>
<button mat-icon-button>
  <mat-icon>favorite</mat-icon>
</button>
```

---

## Cards

### Basic Card

```html
<div class="card">
  <h2 class="card-title">Card Title</h2>
  <p class="card-subtitle">Optional subtitle</p>
  <div class="card-content">
    <p>Card content goes here...</p>
  </div>
</div>
```

### Card with Header

```html
<div class="card">
  <div class="card-header">
    <h2 class="card-title">Card with Header</h2>
  </div>
  <div class="card-content">
    <p>Content with gradient purple header</p>
  </div>
</div>
```

### Card with Footer

```html
<div class="card">
  <h2 class="card-title">Card with Footer</h2>
  <div class="card-content">
    <p>Content goes here</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Material Card (with Angular Material)

```html
<mat-card class="card">
  <mat-card-header>
    <mat-card-title>Title</mat-card-title>
    <mat-card-subtitle>Subtitle</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Content</mat-card-content>
  <mat-card-actions>
    <button mat-button>Action</button>
  </mat-card-actions>
</mat-card>
```

---

## Forms

### Form Group

```html
<div class="form-group">
  <label class="form-label">
    Name
    <span class="required">*</span>
  </label>
  <input type="text" class="form-input" placeholder="Enter name">
</div>
```

### Form with Error/Success

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-input">
  <span class="form-error">Invalid email address</span>
</div>

<div class="form-group">
  <label class="form-label">Username</label>
  <input type="text" class="form-input">
  <span class="form-success">Username is available</span>
</div>
```

### Form Select

```html
<div class="form-group">
  <label class="form-label">Category</label>
  <select class="form-select">
    <option value="">Select a category</option>
    <option value="1">Category 1</option>
    <option value="2">Category 2</option>
  </select>
</div>
```

### Form Textarea

```html
<div class="form-group">
  <label class="form-label">Description</label>
  <textarea class="form-textarea" rows="4"></textarea>
</div>
```

### Material Form Fields

```html
<mat-form-field appearance="outline" class="full-width">
  <mat-label>Name</mat-label>
  <input matInput placeholder="Enter name" formControlName="name">
  <mat-error *ngIf="form.get('name')?.hasError('required')">
    Name is required
  </mat-error>
</mat-form-field>

<mat-form-field appearance="outline" class="full-width">
  <mat-label>Category</mat-label>
  <mat-select formControlName="category">
    <mat-option *ngFor="let cat of categories" [value]="cat.id">
      {{ cat.name }}
    </mat-option>
  </mat-select>
</mat-form-field>
```

---

## Badges

### Badge Variants

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-light">Light</span>
```

### Badges in Tables

```html
<div class="category-badge">
  <span class="badge badge-info">{{ transaction.category }}</span>
</div>
```

---

## Alerts

### Alert Variants

```html
<!-- Info Alert -->
<div class="alert alert-info">
  <strong>Note:</strong> This is an informational message.
  <button class="close-btn">&times;</button>
</div>

<!-- Success Alert -->
<div class="alert alert-success">
  <strong>Success!</strong> Transaction saved successfully.
  <button class="close-btn">&times;</button>
</div>

<!-- Warning Alert -->
<div class="alert alert-warning">
  <strong>Warning:</strong> Please review before proceeding.
  <button class="close-btn">&times;</button>
</div>

<!-- Danger Alert -->
<div class="alert alert-danger">
  <strong>Error:</strong> Something went wrong.
  <button class="close-btn">&times;</button>
</div>
```

---

## Dividers

### Basic Divider

```html
<p>Section above</p>
<div class="divider"></div>
<p>Section below</p>
```

### Divider with Text

```html
<div class="divider divider-text">OR</div>
```

### Vertical Divider

```html
<div style="display: flex;">
  <div>Left content</div>
  <div class="divider divider-vertical"></div>
  <div>Right content</div>
</div>
```

---

## Text Utilities

### Text Colors

```html
<p class="text-primary">Primary text in purple</p>
<p class="text-secondary">Secondary text in teal</p>
<p class="text-success">Success text in green</p>
<p class="text-warning">Warning text in amber</p>
<p class="text-danger">Danger text in red</p>
<p class="text-muted">Muted text in gray</p>
```

### Text Styles

```html
<p class="text-bold">Bold text</p>
<p class="text-center">Centered text</p>
```

---

## Usage in TypeScript Components

### Import and Use Mixins

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-component',
  template: `
    <button [ngClass]="buttonClasses">Click me</button>
  `,
  styles: [`
    @import 'styles/vrgt-colors.scss';
    @import 'styles/vrgt-components.scss';
    
    .custom-btn {
      @include vrgt-button($vrgt-success);
    }
  `]
})
export class CustomComponent {
  buttonClasses = 'btn btn-primary';
}
```

### Dynamic Styling with CSS Variables

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  template: `
    <button [style.background-color]="buttonColor">
      Dynamic Button
    </button>
  `
})
export class DynamicComponent {
  buttonColor = 'var(--vrgt-medium-purple)';
}
```

---

## Responsive Behavior

All components automatically adjust for mobile devices:

```scss
// Small buttons on mobile
@media (max-width: 768px) {
  .btn {
    min-height: 44px;  // Larger touch target
    padding: 12px 16px;
  }
}
```

---

## Dark Mode Support

All components automatically support dark mode:

```html
<!-- In dark mode, components automatically adapt -->
<div class="card">
  <!-- Dark background, light text -->
  <h1>This card adapts to dark mode</h1>
</div>
```

The dark mode is activated via `prefers-color-scheme: dark` media query.

---

## Accessibility Features

### High Contrast Mode

Components automatically adjust borders for high contrast mode:

```html
<!-- In high contrast mode, borders are thicker -->
<button class="btn btn-primary">
  Better visibility in high contrast
</button>
```

### Reduced Motion

Components respect `prefers-reduced-motion`:

```html
<!-- In reduced motion mode, transitions are disabled -->
<button class="btn btn-primary">
  No animations, just instant changes
</button>
```

---

## Complete Example: Transaction Form

```html
<div class="card">
  <div class="card-header">
    <h2 class="card-title">Add Transaction</h2>
    <p class="card-subtitle">Create a new transaction</p>
  </div>
  
  <form [formGroup]="form" class="card-content">
    <!-- Date Field -->
    <div class="form-group">
      <label class="form-label">
        Date <span class="required">*</span>
      </label>
      <input 
        type="date" 
        class="form-input" 
        formControlName="date"
        required>
      <span class="form-error" 
        *ngIf="form.get('date')?.hasError('required')">
        Date is required
      </span>
    </div>

    <!-- Description Field -->
    <div class="form-group">
      <label class="form-label">
        Description <span class="required">*</span>
      </label>
      <input 
        type="text" 
        class="form-input" 
        placeholder="Enter description"
        formControlName="description"
        required>
    </div>

    <!-- Amount Field -->
    <div class="form-group">
      <label class="form-label">
        Amount <span class="required">*</span>
      </label>
      <input 
        type="number" 
        class="form-input" 
        placeholder="0.00"
        formControlName="amount"
        required>
    </div>

    <!-- Category Field -->
    <div class="form-group">
      <label class="form-label">
        Category <span class="required">*</span>
      </label>
      <select class="form-select" formControlName="category" required>
        <option value="">Select a category</option>
        <option *ngFor="let cat of categories" [value]="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- Type Field -->
    <div class="form-group">
      <label class="form-label">
        Type <span class="required">*</span>
      </label>
      <select class="form-select" formControlName="type" required>
        <option value="">Select type</option>
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
      </select>
    </div>

    <!-- Alert -->
    <div class="alert alert-info" *ngIf="showInfo">
      Fill in all fields to save the transaction
    </div>

    <!-- Divider -->
    <div class="divider"></div>

    <!-- Buttons -->
    <div style="text-align: right; gap: 8px; display: flex; justify-content: flex-end;">
      <button type="button" class="btn btn-outline" (click)="onCancel()">
        Cancel
      </button>
      <button 
        type="submit" 
        class="btn btn-primary"
        [disabled]="!form.valid"
        (click)="onSave()">
        Save Transaction
      </button>
    </div>
  </form>
</div>
```

---

## Color Reference

For quick reference, all VRGT colors are available:

```scss
@import 'styles/vrgt-colors.scss';

// Available colors:
// $vrgt-dark-purple: #26215C
// $vrgt-medium-purple: #534AB7
// $vrgt-light-purple: #AFA9EC
// $vrgt-teal: #1D9E75
// $vrgt-amber: #EF9F27
// $vrgt-light-amber: #FAC775
// $vrgt-charcoal: #2C2C2A
// $vrgt-gray: #888780
// $vrgt-light-gray: #D3D1C7
// $vrgt-off-white: #F1EFE8
// $vrgt-very-light: #EEEDFE
```

---

## Need Help?

Refer to these files:
- **Colors:** `src/styles/vrgt-colors.scss`
- **Components:** `src/styles/vrgt-components.scss`
- **Branding:** `BRANDING.md`

For specific component examples, check:
- **Dashboard:** `src/app/components/dashboard/`
- **Summary:** `src/app/components/summary/`
- **Add Transaction Dialog:** `src/app/components/add-transaction-dialog/`
