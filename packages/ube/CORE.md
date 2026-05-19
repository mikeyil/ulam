# @ulam/ube/core — Vanilla Web Components

Framework-agnostic web components. No React, no dependencies—just HTML, CSS, and web platform APIs.

## Usage

### Register components

```javascript
import '@ulam/ube/core'  // Registers all ube web components
```

### Use in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@ulam/ube/base-tokens.css">
  <link rel="stylesheet" href="node_modules/@ulam/ube/base-typography.css">
  <link rel="stylesheet" href="node_modules/@ulam/ube/ui.css">
</head>
<body>
  <ube-button-back aria-label="Go back"></ube-button-back>
  <ube-badge variant="info">New</ube-badge>

  <script type="module">
    import '@ulam/ube/core'

    const badge = document.querySelector('ube-badge')
    badge.addEventListener('click', () => console.log('clicked'))
  </script>
</body>
</html>
```

## Components

Core exports these web components:

### ButtonBack

Specialized button for "go back" navigation with RTL support.

**Attributes:**

- `aria-label` — Label for screen readers (required)
- `dir` — `'ltr'` | `'rtl'` (default: `'ltr'`)

**Events:**

- `click` — Standard click event

**Example:**

```html
<ube-button-back aria-label="Go back"></ube-button-back>
```

### Badge

Informational badge with multiple style variants.

**Attributes:**

- `variant` — `'info'` | `'success'` | `'warning'` | `'critical'` (default: `'info'`)
- `is-button` — Boolean (renders as button instead of div)

**Events:**

- `click` — Standard click event (if is-button is true)

**Example:**

```html
<ube-badge variant="critical">Error</ube-badge>
<ube-badge is-button aria-label="Dismiss">Done</ube-badge>
```

## Design Decisions

### Light DOM (no shadow encapsulation)

All components render to light DOM. This allows:

- CSS tokens from the host app to cascade (`--text-body`, `--accent`, etc.)
- Easy styling overrides via CSS classes
- Direct DOM access via `.querySelector()`

Trade-off: components can't hide internal styles, but ube's design prioritizes theme flexibility.

### Properties for complex objects, attributes for primitives

```javascript
// Primitives: use attributes
btn.setAttribute('variant', 'primary')
btn.variant = 'secondary'  // same as above

// Complex objects: use properties
btn.icon = svgElement  // NOT btn.setAttribute('icon', '...')
```

Web components can't serialize complex objects to HTML attributes, so JSX elements, DOM nodes, and callbacks are passed as properties instead.

### Semantic HTML event names

Components fire standard events: `click`, `change`, `input`, `submit`. No custom event names (no `buttonClick` or `toggleChanged`). This matches native HTML element behavior.

## Testing

Run the test harness:

```bash
# Serve packages/ube/__tests__/test-button.html in a browser
```

Test files cover:

- All component variants and props
- Accessibility (keyboard, focus, ARIA)
- State transitions
- Event handling
- Icon rendering
- aria-disabled pattern (keyboard accessibility when disabled)

## Framework Adapters

All framework adapters are available:

```javascript
// React
import { Button } from '@ulam/ube/react'

// Vue
import { Button } from '@ulam/ube/vue'

// Angular
import { UbeModule } from '@ulam/ube/angular'

// Remix (React-based)
import { Button } from '@ulam/ube/remix'
```

## v0.3.2: Component Consolidation

Framework adapters have been consolidated:

- React: `Button` component unified (replaces ButtonText + ButtonIcon)
- Vue: `Button` component unified (replaces ButtonText + ButtonIcon)
- Angular: `ButtonComponent` unified
- React: `FormInputText` component (replaces FormInputSearch + FormInputWithClear)
- All frameworks: Added `FormControlRadioGroup` for semantic radio grouping
- All form controls now use aria-disabled pattern (keyboard accessible disabled state)

Web components (core) remain focused on core functionality. Use framework adapters for Button and FormInputText.

See [MIGRATION.md](./MIGRATION.md) for detailed migration guide from v0.3.1.

**React example:**

```javascript
import { Button, FormInputText } from '@ulam/ube/react'

export function MyForm() {
  return (
    <>
      <Button onClick={handleSave}>Save</Button>
      <Button icon={<X />} label="Close" />
      <FormInputText 
        value={search} 
        onChange={setSearch}
        search
        liveSearch
      />
    </>
  )
}
```

**Web component example:**

```html
<ube-form-control-radio name="theme" value="light">
  <input type="radio" name="theme" value="light">
  <label>Light</label>
</ube-form-control-radio>
```

## Implementation Notes

### Rendering pattern

Components rebuild their DOM when attributes change via `attributeChangedCallback`:

```javascript
static get observedAttributes() {
  return ['variant', 'disabled', 'active']
}

attributeChangedCallback(name, oldValue, newValue) {
  if (this._initialized) {
    this._render()  // Rebuild DOM
  }
}
```

This is imperative (no JSX), but efficient: each attribute change triggers a localized re-render.

### Icon Handling in Adapters

Framework adapters handle icons appropriately for each framework:

**React:**

```javascript
import { Button } from '@ulam/ube/react'
import { X } from 'lucide-react'

<Button icon={<X size={20} />}>Delete</Button>
```

**Vue:**

```vue
<template>
  <Button :icon="closeIcon">Close</Button>
</template>

<script>
import { Button } from '@ulam/ube/vue'
import { X } from 'some-icon-lib'

export default {
  components: { Button },
  setup() {
    return { closeIcon: X }
  }
}
</script>
```

**Vanilla JS:**

```javascript
const btn = document.createElement('ube-button-back')
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
// Configure SVG...
btn.setAttribute('aria-label', 'Close')
```

### aria-disabled Pattern

Form controls use `aria-disabled` instead of HTML `disabled` to stay in tab order while blocking interactions:

```javascript
// Setting disabled state
control.setAttribute('aria-disabled', 'true')

// Control remains in tab order but:
// - Blocks Space/Enter keydown
// - Blocks click/touch interactions
// - Shows visual disabled state via CSS
// - Screen readers announce as "unavailable" or "dimmed"
```

CSS for disabled styling:

```css
[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}

[aria-disabled="true"]:focus-visible {
  outline: 2px dashed var(--focus-disabled);
}
```

## Browser Support

- Chrome/Edge 89+ (web components standard)
- Safari 14+
- Firefox 63+
- Mobile: iOS Safari 14+, Chrome Android 89+

**ElementInternals API** (for better form integration) is not yet widely supported. Current fallback uses name attributes + hidden inputs.

---

## Available Adapters

- ✅ Core vanilla web components
- ✅ React adapter (`@ulam/ube/react`)
- ✅ Vue 3 adapter (`@ulam/ube/vue`)
- ✅ Angular adapter (`@ulam/ube/angular`)
- ✅ Remix adapter (`@ulam/ube/remix`)

## Roadmap

- [ ] ElementInternals API support for form validation
- [ ] Storybook for interactive component documentation
- [ ] Additional form control types (date picker, time picker, combobox)
- [ ] Tooltip component
- [ ] Modal/dialog component
