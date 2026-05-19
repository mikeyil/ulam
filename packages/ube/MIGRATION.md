# Migration Guide: @ulam/ube Component Consolidation (v0.3.2)

This guide helps you migrate to @ulam/ube v0.3.2, which consolidates related components and introduces aria-disabled pattern for form controls.

## Overview

v0.3.2 consolidates duplicate components:

- `ButtonText` + `ButtonIcon` → `Button` (single unified component)
- `FormInputSearch` + `FormInputWithClear` → `FormInputText` (single component with modes)
- Introduces `FormControlRadioGroup` for grouping related radio buttons
- All form controls now use aria-disabled pattern (stays in tab order, blocks interactions)

## Breaking Changes in v0.3.2

If you're upgrading from v0.3.1 or earlier:

1. **Replace `ButtonText` with `Button`**

   ```jsx
   // Before (v0.3.1)
   import { ButtonText } from '@ulam/ube/react'
   <ButtonText onClick={handleClick}>Save</ButtonText>

   // After (v0.3.2)
   import { Button } from '@ulam/ube/react'
   <Button onClick={handleClick}>Save</Button>
   ```

2. **Replace `ButtonIcon` with `Button` (icon-only mode)**

   ```jsx
   // Before (v0.3.1)
   import { ButtonIcon } from '@ulam/ube/react'
   <ButtonIcon icon={<X size={20} />} label="Close" />

   // After (v0.3.2)
   import { Button } from '@ulam/ube/react'
   <Button icon={<X size={20} />} label="Close" />
   // No children + icon = icon-only mode automatically
   ```

3. **Replace `FormInputSearch` with `FormInputText`**

   ```jsx
   // Before (v0.3.1)
   import { FormInputSearch } from '@ulam/ube/react'
   <FormInputSearch value={q} onChange={setQ} liveSearch />

   // After (v0.3.2)
   import { FormInputText } from '@ulam/ube/react'
   <FormInputText value={q} onChange={setQ} search liveSearch />
   ```

4. **Replace `FormInputWithClear` with `FormInputText`**

   ```jsx
   // Before (v0.3.1)
   import { FormInputWithClear } from '@ulam/ube/react'
   <FormInputWithClear value={v} onChange={setV} clearable />

   // After (v0.3.2)
   import { FormInputText } from '@ulam/ube/react'
   <FormInputText value={v} onChange={setV} clearable />
   ```

5. **Form controls: disabled → aria-disabled**
   Form controls no longer use native HTML `disabled` attribute. They use `aria-disabled="true"` instead, which:
   - Keeps elements in tab order (keyboard accessible even when disabled)
   - Shows dashed focus outline on focus (visual indication of disabled but focusable)
   - Still blocks interactions (Space/Enter, click, touch)
   - Works with screen readers (announces as "dimmed" or "unavailable")

   No code changes needed — the behavior is handled internally. If you have custom CSS targeting `:disabled` selectors on form controls, update them to `[aria-disabled="true"]`.

## Backward Compatibility

The vanilla web components core maintains **full backward compatibility**. If you're using vanilla components, no changes required — web components work identically in v0.3.2.

## New: Vanilla Web Components

If you're using vanilla JavaScript or a non-React framework, you can now use @ulam/ube directly as web components.

### Import the core components

```javascript
import '@ulam/ube/core'
```

This registers all web components globally (e.g., `<ube-button>`, `<ube-form-control-radio>`).

### Use components in HTML

```html
<ube-button
  label="Click me"
  @click="handleClick"
></ube-button>

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
const btn = document.querySelector('ube-button')

// Set properties
btn.icon = { type: 'svg', data: '<svg>...</svg>' }
btn.disabled = true

// Call methods
btn.focus()

// Listen for events
btn.addEventListener('click', (e) => {
  console.log('Button clicked')
})
```

## New: Vue Adapter

If you're migrating to Vue, install @ulam/ube and import from the Vue adapter.

### Import Vue components

```javascript
import { Button, FormControlRadio } from '@ulam/ube/vue'
```

### Use in templates

The Vue API mirrors the React API:

```vue
<template>
  <div>
    <Button
      @click="handleClick"
    >
      Click me
    </Button>

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
import { Button, FormControlRadio } from '@ulam/ube/vue'
import { ref } from 'vue'

export default {
  components: { Button, FormControlRadio },
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
<ube-button
  (click)="handleClick()"
>
  Click me
</ube-button>

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
import { Button, FormControlRadio } from '@ulam/ube/remix'
```

The Remix entry point is a re-export of the React adapter, so the consolidation applies identically.

## React: Consolidation in v0.3.2

Update your imports and component usage for the consolidation:

```jsx
import { Button, FormInputText, FormControlRadio } from '@ulam/ube/react'

export function MyComponent() {
  const [selected, setSelected] = useState('a')
  const [query, setQuery] = useState('')

  return (
    <>
      <Button onClick={handleClick}>Click me</Button>
      <FormInputText value={query} onChange={setQuery} search liveSearch />
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

See the Breaking Changes section above for detailed migration examples.

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

### Button

```text
Props: variant, size, disabled, busy, fullWidth, error, active, label, activeLabel, title, icon, iconPosition, activeIcon
Events: click
Methods: focus()
```

Unified button component for text, text-with-icon, and icon-only layouts. Icon-only mode is automatically detected when no children are provided.

### FormInputText

```text
Props: id, type, value, onChange, placeholder, disabled, label, search, liveSearch, showSubmit, onSubmit, clearable, onClear, width, height
Events: submit, clear, change
```

Unified text input supporting three modes: plain, search (with optional submit button), and clearable (with clear button when value is not empty).

### FormControlRadioGroup

```text
Props: legend, name, value, onChange, disabled, options: [{value, label}]
Events: change
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

@ulam/ube supports multiple entry points:

```javascript
// Vanilla web components (all frameworks)
import '@ulam/ube/core'

// Framework-specific adapters
import { Button } from '@ulam/ube/react'   // React
import { Button } from '@ulam/ube/vue'     // Vue 3
import { UbeModule } from '@ulam/ube/angular'  // Angular
import { Button } from '@ulam/ube/remix'   // Remix

// Design tokens and theme utilities
import { applyTheme, useThemeManager } from '@ulam/ube'

// CSS
import '@ulam/ube/ui.css'     // All styles
import '@ulam/ube/base-tokens.css' // Design tokens only
```

## Frequently Asked Questions

**Q: Will my React code break in v0.3.2?**
A: Only if you're using `ButtonText`, `ButtonIcon`, `FormInputSearch`, or `FormInputWithClear`. These have been consolidated into `Button` and `FormInputText`. See the Breaking Changes section for migration examples.

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

**Q: What's aria-disabled and why do form controls use it?**
A: `aria-disabled` is an ARIA attribute that indicates disabled state while keeping the element in the tab order. This improves keyboard navigation — users can tab to disabled controls and see they're disabled via visual feedback (dashed focus ring) and screen reader announcements. It blocks interactions (Space/Enter, click, touch) while remaining keyboard accessible.

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
