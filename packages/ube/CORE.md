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
  <ube-button-text variant="primary">Click me</ube-button-text>

  <script type="module">
    import '@ulam/ube/core'

    const btn = document.querySelector('ube-button-text')
    btn.addEventListener('click', () => console.log('clicked'))
  </script>
</body>
</html>
```

## Components

### ButtonText

Text button with icon support, state transitions, and semantic variants.

**Attributes:**

- `variant` — `'primary'` | `'secondary'` | `'tertiary'` | `'danger'` (default: `'primary'`)
- `disabled` — Boolean flag
- `active` — Boolean flag (toggled state)
- `full-width` — Boolean flag
- `label` — aria-label text
- `active-label` — aria-label when active
- `title` — Tooltip text

**Properties:**

- `icon` — DOM Element (rendered left of label)
- `activeIcon` — DOM Element (rendered when active)

**Events:**

- `click` — Standard click event

**Example:**

```html
<ube-button-text variant="primary" label="Save">Save</ube-button-text>

<script type="module">
  import '@ulam/ube/core'

  const btn = document.querySelector('ube-button-text')

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
# Serve packages/ube/core/test-button-text.html in a browser
```

Open `test-button-text.html` to manually test ButtonText:

- Basic variants (primary, secondary, tertiary, danger)
- States (enabled, disabled, active)
- Icon property
- Click handling
- Toggle active state

## Framework Adapters

Need React? Use `@ulam/ube/react`:

```javascript
import { ButtonText } from '@ulam/ube/react'
```

Vue, Angular, and Remix adapters coming soon.

## Migrating from @ulam/ube/react

If you're currently using React components from `@ulam/ube`:

**Old (React components directly from ube):**

```javascript
import { ButtonText } from '@ulam/ube'
```

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
