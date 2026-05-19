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
  <ube-button variant="primary">Click me</ube-button>

  <script type="module">
    import '@ulam/ube/core'

    const btn = document.querySelector('ube-button')
    btn.addEventListener('click', () => console.log('clicked'))
  </script>
</body>
</html>
```

## Components

### Button

Unified button component supporting text, text-with-icon, and icon-only layouts. Icon-only mode is automatically detected when no text content is provided.

**Attributes:**

- `variant` — `'primary'` | `'secondary'` | `'tertiary'` | `'accent'` (default: `'primary'`)
- `size` — `'compact'` | `'default'` | `'large'` (default: `'default'`)
- `disabled` — Boolean flag (uses aria-disabled, stays in tab order)
- `busy` — Boolean flag (loading/processing state)
- `active` — Boolean flag (toggled state)
- `full-width` — Boolean flag
- `error` — Boolean flag (error/danger state)
- `label` — aria-label text (required for icon-only mode)
- `active-label` — aria-label when active
- `icon-position` — `'start'` | `'end'` (default: `'start'`)
- `title` — Tooltip text

**Properties:**

- `icon` — DOM Element (rendered left or right of label based on iconPosition)
- `activeIcon` — DOM Element (rendered when active)

**Events:**

- `click` — Standard click event

**Example:**

```html
<!-- Text button -->
<ube-button variant="primary">Save</ube-button>

<!-- Text with icon -->
<ube-button variant="primary" icon-position="end">
  Next
  <svg class="icon">...</svg>
</ube-button>

<!-- Icon-only button -->
<ube-button label="Close" variant="accent">
  <svg class="icon" aria-hidden="true">...</svg>
</ube-button>

<script type="module">
  import '@ulam/ube/core'

  const btn = document.querySelector('ube-button')

  // Set icon (must be a DOM element)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '16')
  svg.setAttribute('height', '16')
  svg.innerHTML = '<circle cx="8" cy="8" r="7" fill="currentColor"/>'
  btn.icon = svg

  // Listen for clicks
  btn.addEventListener('click', () => {
    console.log('clicked')
  })

  // Toggle state
  btn.active = true
  console.log(btn.active)  // true
</script>
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

The core web components have been consolidated:

- `ube-button-text` + `ube-button-icon` → `ube-button` (auto-detects icon-only mode)
- `ube-form-input-search` + `ube-form-input-with-clear` → `ube-form-input-text` (modes: search, clearable, plain)
- Added `ube-form-control-radio-group` for semantic radio grouping
- All form controls now use aria-disabled pattern (keyboard accessible disabled state)

See [MIGRATION.md](./MIGRATION.md) for detailed migration guide from v0.3.1.

**New (React adapter):**

```javascript
import { ButtonText } from '@ulam/ube/react'
```

The API is identical—no code changes needed. The React adapter wraps the vanilla web component.

**Or go vanilla:**

```html
<ube-button-text variant="primary">Save</ube-button-text>
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

### Icon handling

Icons must be DOM elements, not strings. This allows React to pass JSX, vanilla JS to pass SVG elements, etc.

```javascript
// Setting icon
const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
btn.icon = icon

// Rendering icon (inside _render)
if (displayIcon) {
  const iconSpan = document.createElement('span')
  iconSpan.className = 'btn-icon'
  iconSpan.appendChild(displayIcon.cloneNode(true))  // Clone to avoid moving DOM
}
```

### Disabled state

Disabled buttons prevent click propagation:

```javascript
connectedCallback() {
  this.addEventListener('click', (e) => {
    if (this.disabled) {
      e.preventDefault()
      e.stopPropagation()
    }
  })
}
```

## Browser Support

- Chrome/Edge 89+ (web components standard)
- Safari 14+
- Firefox 63+
- Mobile: iOS Safari 14+, Chrome Android 89+

**ElementInternals API** (for better form integration) is not yet widely supported. Current fallback uses name attributes + hidden inputs.

---

## Roadmap

- [ ] All 20 components ported to vanilla
- [ ] Vue adapter
- [ ] Angular adapter
- [ ] Remix adapter
- [ ] ElementInternals API support when browser support improves
- [ ] Storybook for component documentation
