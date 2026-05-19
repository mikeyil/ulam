# Migration Guide: Framework-Agnostic @ulam/ube

This guide helps you migrate from the old React-only @ulam/ube to the new framework-agnostic architecture.

## Overview

The new @ulam/ube is built on vanilla web components with framework-specific adapters. The React API remains identical, but you now have the option to use @ulam/ube in Vue, Angular, or Remix projects.

## Breaking Changes

**None.** The React API is backward-compatible. Existing React code works without changes.

## New: Vanilla Web Components

If you're using vanilla JavaScript or a non-React framework, you can now use @ulam/ube directly as web components.

### Import the core components

```javascript
import '@ulam/ube/core'
```

This registers all web components globally (e.g., `<ube-button-text>`, `<ube-form-control-radio>`).

### Use components in HTML

```html
<ube-button-text
  label="Click me"
  @click="handleClick"
></ube-button-text>

<ube-form-control-radio
  name="group"
  value="a"
  label="Option A"
  current="a"
  @change="handleChange"
></ube-form-control-radio>
```

### Access properties and methods

```javascript
const btn = document.querySelector('ube-button-text')

// Set properties
btn.icon = { type: 'svg', data: '<svg>...</svg>' }
btn.disabled = true

// Call methods
btn.focus()

// Listen for events
btn.addEventListener('change', (e) => {
  console.log('Value:', e.detail.value)
})
```

## New: Vue Adapter

If you're migrating to Vue, install @ulam/ube and import from the Vue adapter.

### Import Vue components

```javascript
import { ButtonText, FormControlRadio } from '@ulam/ube/vue'
```

### Use in templates

The Vue API mirrors the React API:

```vue
<template>
  <div>
    <ButtonText
      label="Click me"
      @click="handleClick"
    />

    <FormControlRadio
      name="group"
      value="a"
      label="Option A"
      :current="selected"
      @change="selected = $event"
    />
  </div>
</template>

<script>
import { ButtonText, FormControlRadio } from '@ulam/ube/vue'
import { ref } from 'vue'

export default {
  components: { ButtonText, FormControlRadio },
  setup() {
    const selected = ref('a')
    return {
      selected,
      handleClick: () => console.log('clicked'),
    }
  },
}
</script>
```

## New: Angular Adapter

Import the UbeModule in your Angular app.

### Import the module

```typescript
import { UbeModule } from '@ulam/ube/angular'

@NgModule({
  declarations: [],
  imports: [CommonModule, UbeModule],
})
export class AppModule {}
```

### Use in templates (Angular)

The Angular API uses Angular conventions (property binding, event binding):

```html
<ube-button-text
  [attr.label]="'Click me'"
  (click)="handleClick()"
></ube-button-text>

<ube-form-control-radio
  name="group"
  value="a"
  label="Option A"
  [attr.current]="selected"
  (change)="selected = $event"
></ube-form-control-radio>
```

You can also use Angular's two-way binding pattern:

```html
<ube-form-control-radio
  name="group"
  value="a"
  label="Option A"
  [(checked)]="isSelected"
></ube-form-control-radio>
```

## New: Remix Adapter

Remix is React-based, so it uses the same React adapter. No changes needed.

```javascript
import { ButtonText, FormControlRadio } from '@ulam/ube/remix'
```

The Remix entry point is a re-export of the React adapter, so existing code works identically.

## React: No Changes Required

The React API remains unchanged:

```jsx
import { ButtonText, FormControlRadio } from '@ulam/ube/react'

export function MyComponent() {
  const [selected, setSelected] = useState('a')

  return (
    <>
      <ButtonText label="Click me" />
      <FormControlRadio
        name="group"
        value="a"
        label="Option A"
        current={selected}
        onChange={setSelected}
      />
    </>
  )
}
```

All existing React code works without modification.

## Architecture Details

### Light DOM

Components render in light DOM (not shadow DOM) so:

- CSS tokens from your app cascade to components
- Slot-based content works correctly
- External styles can target components

### Property vs Attribute

The architecture distinguishes between:

- **Primitives** (string, boolean): Use HTML attributes
  - `<ube-button label="Text" disabled>`
- **Complex objects** (icons, options): Use JavaScript properties
  - `btn.icon = { type: 'svg', data: '...' }`

### CSS Tokens

Define tokens on your app root, and all components inherit them:

```html
<html style="--text-body: #333; --accent: #0066ff">
  <body>
    <ube-button-text label="Themed"></ube-button-text>
    <!-- Button uses parent tokens automatically -->
  </body>
</html>
```

## Framework Specifics

### React

- Props map 1:1 to component attributes/properties
- Complex objects (icon, options) are properties
- Use `onChange` handlers for controlled components
- Icons set via `useEffect` watchers

```jsx
<ButtonText icon={myIcon} onChange={handleChange} />
```

### Vue

- Props use camelCase (Vue convention)
- Use `v-model` for controlled components via `update:*` events
- Complex properties handled via watchers
- Slots supported where applicable

```vue
<ButtonText :icon="myIcon" @change="handleChange" />
```

### Angular

- Inputs use property binding `[attr.name]="value"`
- Outputs use event binding `(change)="handler()"`
- Two-way binding via `[(ngModel)]` or custom patterns
- Complex properties set in component class or via `@Input` setters
- Use `ViewChild` to access template reference

```typescript
@ViewChild('btn') btn!: ElementRef<any>
ngAfterViewInit() {
  this.btn.nativeElement.icon = this.icon
}
```

## Component API Reference

All components expose the same API across frameworks:

### ButtonText

```text
Props: variant, disabled, active, fullWidth, label, activeLabel, title, icon, activeIcon
Events: click
Methods: focus()
```

### FormControlRadio

```text
Props: name, value, label, checked, disabled
Events: change
```

### FormControlRadioChipGroup

```text
Props: legend, name, value, options: [{value, label}], onChange
Events: change (detail.value)
```

### FadeTransition

```text
Props: watchKey, direction, prefersReducedMotion
Events: (none)
Slots: children
```

See [CORE.md](./CORE.md) for complete component documentation.

## Testing

All components include test suites:

```bash
npm test              # Run all tests
npm run test:coverage # Coverage report
```

Test files:

- `__tests__/core.test.js`: Vanilla component tests
- `__tests__/react.test.jsx`: React adapter tests
- `__tests__/integration.test.js`: Cross-framework integration tests

See [TESTING.md](./TESTING.md) for detailed testing guide.

## Entry Points

The new @ulam/ube supports multiple entry points:

```javascript
// Vanilla web components (all frameworks)
import '@ulam/ube/core'

// Framework-specific adapters
import { ButtonText } from '@ulam/ube/react'   // React
import { ButtonText } from '@ulam/ube/vue'     // Vue 3
import { ButtonTextComponent } from '@ulam/ube/angular'  // Angular
import { ButtonText } from '@ulam/ube/remix'   // Remix

// Design tokens and theme utilities
import { applyTheme, useThemeManager } from '@ulam/ube'

// CSS
import '@ulam/ube/ui.css'     // All styles
import '@ulam/ube/tokens.css' // Design tokens only
```

## Frequently Asked Questions

**Q: Will my React code break?**
A: No. The React API is 100% backward-compatible. Existing React code works without changes.

**Q: Can I use vanilla components in React?**
A: Yes, but the framework adapters are more idiomatic. Use React adapters for best React integration.

**Q: Do I need to import both core and framework adapters?**
A: No. Framework adapters import the core automatically. Import the adapter for your framework.

**Q: Can I switch frameworks later?**
A: Yes. The component APIs are consistent across all frameworks. Migrating from React to Vue is straightforward.

**Q: How do I handle events in vanilla JavaScript?**
A: Use `addEventListener` on component elements:

```javascript
const btn = document.querySelector('ube-button-text')
btn.addEventListener('change', (e) => {
  console.log('Value:', e.detail.value)
})
```

**Q: Do I need a CSS-in-JS library?**
A: No. Components include their CSS, which you import at the entry point. CSS is framework-agnostic.

**Q: How do I set custom colors on Badge?**
A: Use CSS properties:

```html
<ube-badge
  variant="custom"
  style="--badge-bg: #ff0000; --badge-color: #ffffff"
>
  Custom
</ube-badge>
```

Or set via JavaScript:

```javascript
const badge = document.querySelector('ube-badge')
badge.style.setProperty('--badge-bg', '#ff0000')
badge.style.setProperty('--badge-color', '#ffffff')
```

## Support

For issues, questions, or contributions, see [GitHub](https://github.com/mikeyil/ulam).
