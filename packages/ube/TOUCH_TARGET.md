# Touch Target Utility

Detects undersized interactive elements on touch devices and automatically applies invisible 48×48 pixel tap target overlays. Works with any framework and requires no markup changes.

## Features

- **Auto-detection**: Scans DOM for interactive elements (`<button>`, `<a>`, `<input>`, custom ARIA roles, etc.)
- **Intelligent overlays**: Injects invisible ::after pseudo-element positioned over undersized controls
- **Collision detection**: Expands overlays as large as possible without overlapping nearby controls (up to 48×48)
- **Framework agnostic**: Works with vanilla JS, React, Vue, Angular, Remix
- **Debug mode**: Optional blue visualization to see overlay positions
- **Exemption support**: Skip specific elements with `data-no-touch-target-fix` attribute
- **Touch device only**: Uses media query `(hover: none) and (pointer: coarse)` to detect touch devices

## Installation

```bash
npm install @ulam/ube
```

## Quick Start

### Auto-initialization (Global)

Set a flag before loading the page:

```html
<script>
  window.__UBE_TOUCH_TARGET_AUTO_INIT = true
  window.__UBE_TOUCH_TARGET_DEBUG = false
</script>
<script type="module">
  import '@ulam/ube/touch-target.js'
</script>
```

### Manual Initialization

```javascript
import { initTouchTargets } from '@ulam/ube/touch-target.js'

// On page load
initTouchTargets({ debug: false })
```

### React Integration

```jsx
import { useEffect } from 'react'
import { initTouchTargets } from '@ulam/ube/touch-target.js'

export default function App() {
  useEffect(() => {
    initTouchTargets({ debug: process.env.NODE_ENV === 'development' })
  }, [])

  return <div>{/* Your app */}</div>
}
```

### Vue Integration

```vue
<script setup>
import { onMounted } from 'vue'
import { initTouchTargets } from '@ulam/ube/touch-target.js'

onMounted(() => {
  initTouchTargets({ debug: false })
})
</script>
```

### Angular Integration

```typescript
import { Component, OnInit } from '@angular/core'
import { initTouchTargets } from '@ulam/ube/touch-target.js'

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  ngOnInit() {
    initTouchTargets({ debug: false })
  }
}
```

## API

### `initTouchTargets(options)`

Initialize touch target detection and remediation.

**Parameters:**
- `options.debug` (boolean, default: `false`) — Show blue overlay visualization

**Returns:** void

```javascript
initTouchTargets({ debug: true })
```

### `exemptElement(element)`

Register an element to skip touch target fix.

```javascript
const btn = document.querySelector('.dont-fix-me')
exemptElement(btn)
initTouchTargets()
```

### `includeElement(element)`

Unregister element from exceptions.

```javascript
const btn = document.querySelector('.fix-me-again')
includeElement(btn)
```

### `setDebugMode(enabled)`

Enable/disable debug visualization.

```javascript
setDebugMode(true)  // Show overlays
```

### `getReport()`

Get a report of all processed elements.

```javascript
const report = getReport()
console.log(report)
// {
//   total: 12,
//   elements: [
//     { tag: 'button', original: '24×24', overlay: 48, text: 'Tiny' },
//     { tag: 'input', original: '20×20', overlay: 44, text: null }
//   ]
// }
```

## How It Works

1. **Detection**: On page load, scans DOM for interactive elements matching these selectors:
   - `<button>`, `<a href>`, `<input type="button|checkbox|radio|...">`, `<select>`, `<textarea>`
   - Custom elements with ARIA roles: `[role="button"]`, `[role="switch"]`, `[role="menuitem"]`, etc.

2. **Size check**: Measures each element with `getBoundingClientRect()`
   - Flags undersized elements (width < 48px OR height < 48px)

3. **Collision detection**: For each undersized element:
   - Checks for overlaps with nearby controls
   - Calculates maximum overlay size before collision
   - Never allows overlay smaller than 32×32

4. **Overlay injection**: For elements needing fix:
   - Adds `position: relative` to parent if static
   - Injects CSS rule for `::after` pseudo-element
   - Positions overlay absolutely centered over the control
   - Sets `pointer-events: auto` to capture interactions

5. **Event handling**: Overlay sits transparently over control
   - Click/tap events bubble down to original element
   - No JavaScript event listeners needed
   - Framework event handlers work normally

## Styling

The overlay is completely transparent by default. In debug mode, it shows as semi-transparent blue:

```css
/* Debug visualization (blue overlay) */
[data-touch-target-overlay]::after {
  background: rgba(0, 100, 255, 0.15);
}
```

For production, overlay is invisible:

```css
[data-touch-target-overlay]::after {
  background: transparent;
  pointer-events: auto;
}
```

## Exemptions

Skip specific elements using the `data-no-touch-target-fix` attribute:

```html
<!-- This button won't get a touch target overlay -->
<button data-no-touch-target-fix onclick="alert('Click')">
  Exempt
</button>
```

Or programmatically:

```javascript
const btn = document.querySelector('#special-btn')
exemptElement(btn)
initTouchTargets()
```

## Collision Handling

When interactive elements are too close together, overlays shrink to avoid blocking adjacent controls:

```
Scenario 1: Tight spacing (4px apart)
┌─────┐ ┌─────┐ ┌─────┐
│24×24│ │24×24│ │24×24│  Original size
└─────┘ └─────┘ └─────┘

┌──────────┐ ┌──────────┐ ┌──────────┐
│  36×36   │ │  36×36   │ │  36×36   │  Collision-aware overlays
│  overlay │ │  overlay │ │  overlay │
└──────────┘ └──────────┘ └──────────┘

Scenario 2: Good spacing (24px apart)
┌─────────┐           ┌─────────┐           ┌─────────┐
│24×24btn │           │24×24btn │           │24×24btn │  Original
└─────────┘           └─────────┘           └─────────┘

┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│    48×48      │   │    48×48      │   │    48×48      │  Full overlays
│    overlay    │   │    overlay    │   │    overlay    │
└───────────────┘   └───────────────┘   └───────────────┘
```

## Performance

- **One-time scan**: Runs once on page load
- **No polling**: No continuous DOM monitoring
- **Minimal overhead**: Single stylesheet injection, class additions only
- **Light DOM friendly**: Works with framework virtual DOMs (React, Vue, etc.)

## Browser Support

Works on all modern browsers with touch support:
- iOS Safari 12+
- Android Chrome/Firefox/Samsung Internet
- Windows/Mac with touch input

Desktop browsers (no touch) automatically skip the utility.

## Testing

### Test Page

Open `touch-target.demo.html` in a touch device or use DevTools device emulation:

```bash
# Serve the demo page
npx http-server packages/ube/

# Open in browser:
# http://localhost:8000/touch-target.demo.html
```

The demo includes:
- Undersized buttons (20×20, 32×32)
- Tiny links
- Checkboxes and radio buttons
- Closely-spaced controls (collision scenarios)
- Custom ARIA elements
- Edge cases (hidden, nested, SVG)

### Linting

Use the included linter in your test suite:

```javascript
import { analyzeTouchTargets } from '@ulam/ube/touch-target.linter.js'

const html = `<button style="width: 20px; height: 20px;">Tiny</button>`
const issues = analyzeTouchTargets(html)

console.log(issues)
// [{ element: 'button', width: 20, height: 20, message: 'Touch target too small...' }]
```

## Common Issues

### Overlay isn't showing (debug mode)

- Device isn't touch-enabled (enable in DevTools)
- Element is hidden or not visible (check `display`, `visibility`, `opacity`)
- Element has `data-no-touch-target-fix` attribute
- Parent element has `pointer-events: none`

### Overlay is too small

- Nearby controls are blocking expansion (collision detection working as intended)
- Increase spacing between controls to allow larger overlays
- Or exempt one control with `data-no-touch-target-fix`

### Events not firing

- Make sure the overlay's parent (`position: relative`) contains the original interactive element
- Check that custom event listeners are on the original control, not added to the overlay
- Browser should automatically bubble events through the overlay to the control below

## Accessibility

- **Keyboard navigation**: Overlay doesn't affect tab order (overlay has `pointer-events: auto` only, no `tabindex`)
- **Screen readers**: No changes to semantics; screen readers see original control unchanged
- **ARIA attributes**: All ARIA attributes preserved (overlay is transparent)
- **Focus management**: Original control receives focus and outline; overlay doesn't interfere

The overlay is a **visual-only** enhancement for touch users. It doesn't affect keyboard users or screen reader users.

## Alternatives Considered

| Approach | Pros | Cons |
|----------|------|------|
| **::after overlay** (chosen) | No markup changes, works with all frameworks, lightweight | Requires `position: relative` parent |
| **Wrapper element** | More control over positioning | Breaks virtual DOM in React/Vue, requires markup changes |
| **Native disabled + aria-disabled** | Semantic | Removes from tab order (not desired for this use case) |
| **CSS-only scale/padding** | Simple | May break layouts, can't handle all controls equally |

## Future Enhancements

- [ ] Automatic spacing redistribution (rearrange closely-packed controls)
- [ ] Visual indicators for collision (warn in debug mode)
- [ ] Integration with design token system (use design spacing guidelines)
- [ ] Tap feedback animation (pulse on touch)
- [ ] Analytics reporting (report undersized controls to dashboard)

## License

MIT — use freely in your projects.
