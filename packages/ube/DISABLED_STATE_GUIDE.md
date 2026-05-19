# Unified Disabled State Pattern

## Overview

All actionable elements (buttons, links, inputs, custom controls) should use the `aria-disabled="true"` pattern instead of the native `disabled` attribute. This ensures:

- Elements stay in the tab order (focusable but inactive)
- Keyboard/pointer/touch interactions are blocked
- Screen readers announce disabled state
- Visual indication is clear and consistent
- Support for users with `prefers-reduced-transparency: reduce`

## Usage

### Web Components
```javascript
// Built-in to all @ulam/ube form controls
chip.disabled = true   // automatically sets aria-disabled
```

### Any Element (Links, Buttons, Custom Controls)
```javascript
import { setAriaDisabled } from '@ulam/ube'

const btn = document.querySelector('.my-button')
setAriaDisabled(btn, true)   // enable aria-disabled
setAriaDisabled(btn, false)  // disable aria-disabled
```

### React
```jsx
import { useAriaDisabled } from '@ulam/ube'

function MyButton({ disabled }) {
  const ref = useRef(null)
  useAriaDisabled(ref, disabled)  // manage aria-disabled on ref.current
  
  return <button ref={ref}>Click me</button>
}
```

### Manual Setup
```javascript
import { applyAriaDisabled } from '@ulam/ube'

el.setAttribute('aria-disabled', 'true')
const cleanup = applyAriaDisabled(el)

// Later, to re-enable:
el.removeAttribute('aria-disabled')
cleanup()
```

## CSS Styling

### Default Disabled Appearance

All `[aria-disabled="true"]` elements get:
- `opacity: 0.5` — visual indication of disabled state
- `cursor: not-allowed` — shows interaction is blocked
- Dashed outline on `:focus-visible` — communicates "focusable but inactive"

### Component-Specific Overrides

Each component can customize disabled appearance in its CSS file. Example from `form-control-radio.css`:

```css
input[type="radio"].control[aria-disabled="true"] {
  color: var(--text-disabled);
  opacity: 0.5;
}

@media (prefers-reduced-transparency: reduce) {
  input[type="radio"].control[aria-disabled="true"] {
    opacity: 1;
    background-color: var(--border);
    border-color: var(--text-disabled);
  }
}

input[type="radio"].control[aria-disabled="true"]:focus-visible {
  outline: var(--focus-outline-width) dashed var(--focus-disabled);
  outline-offset: var(--focus-outline-offset);
}
```

### Suppress Hover/Active States

Always prevent hover/active styling on disabled elements:

```css
.my-control:not([aria-disabled="true"]):hover {
  background: var(--hover-color);
}
```

## Prefers-Reduced-Transparency Support

For users with `prefers-reduced-transparency: reduce`, each component should provide an alternative to opacity:

```css
[aria-disabled="true"] {
  opacity: 0.5;
}

@media (prefers-reduced-transparency: reduce) {
  [aria-disabled="true"] {
    opacity: 1;
    /* Use color/border changes instead */
    background-color: var(--border);
    border-color: var(--text-disabled);
  }
}
```

## Accessibility Contract

- **Keyboard**: Space/Enter blocked via `preventDefault`
- **Pointer**: Click blocked via `preventDefault`
- **Touch**: Touch/swipe interactions blocked via `preventDefault`
- **Tab Order**: Element remains focusable (no `tabindex="-1"`)
- **Screen Reader**: `aria-disabled="true"` announced as "dimmed" or "unavailable"
- **Focus Indicator**: Dashed outline (not solid) shows "focusable but inactive"

## Backward Compatibility

### Native `disabled` Attribute

The `aria-disabled` pattern replaces native `disabled`. If you have legacy code using `disabled`:

```javascript
// ❌ Old way (removes from tab order, removes from keyboard access)
<input type="text" disabled />

// ✅ New way (stays focusable, screen-reader accessible)
<input type="text" aria-disabled="true" />
```

### `.btn--disabled` Class

Buttons previously used `.btn--disabled` class. This is now deprecated in favor of `aria-disabled="true"`:

```jsx
// ❌ Old way
<button className="btn btn--disabled">Disabled</button>

// ✅ New way (if using React)
const ref = useRef(null)
useAriaDisabled(ref, true)
return <button ref={ref} className="btn">Disabled</button>
```

## Implementation Checklist

When adding disabled support to a new control:

- [ ] Web component: add `disabled` setter that calls `this._applyAriaDisabled(val)`
- [ ] Web component: sync `aria-disabled` on underlying input in `_render()`
- [ ] React adapter: use `useAriaDisabled(ref, disabled)` hook
- [ ] CSS: add `[aria-disabled="true"]` selectors for disabled appearance
- [ ] CSS: add `@media (prefers-reduced-transparency: reduce)` fallback
- [ ] CSS: add dashed outline for `:focus-visible` on disabled
- [ ] CSS: suppress hover/active states with `:not([aria-disabled="true"])`

## Testing

1. **Keyboard**: Tab to disabled element, verify Space/Enter doesn't activate
2. **Touch**: Tap disabled element, verify no interaction
3. **Visual**: Verify disabled appearance (opacity or color contrast)
4. **Screen Reader**: Verify control announced as disabled
5. **Reduced Transparency**: Enable in OS settings, verify alternative styling used
6. **Tab Order**: Verify element remains in tab order

## References

- [aria-disabled ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WCAG 2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG21/Understanding/pointer-cancellation.html)
- [WCAG 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
