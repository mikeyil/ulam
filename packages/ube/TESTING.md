# Testing Strategy for @ulam/ube

This document covers testing approaches for the vanilla web components and framework adapters.

## Test Structure

```text
__tests__/
  ├── core.test.js           # Vanilla web component tests
  ├── react.test.jsx         # React adapter tests
  └── integration.test.js    # Cross-framework integration tests
```

## Running Tests

```bash
npm test                 # Run all tests
npm run test:coverage  # Generate coverage report
```

## Core Web Component Tests (`core.test.js`)

Tests for vanilla web components verify:

- **Attribute binding**: Components accept and sync attributes correctly
- **Property access**: Complex properties (icons, options) are accessible via JS
- **Event emission**: Components emit custom events with correct detail payloads
- **State management**: Internal state (checked, active, current) syncs with attributes
- **Accessibility**: ARIA attributes are set appropriately

### Example: Button

```javascript
it('respects disabled state (aria-disabled)', () => {
  el.disabled = true
  expect(el.getAttribute('aria-disabled')).toBe('true')
})

it('emits click event on button click', (done) => {
  el.addEventListener('click', () => {
    done()
  })
  el.querySelector('button')?.click()
})

it('detects icon-only mode when no children', () => {
  el.icon = svgElement  // icon property
  // No children = icon-only mode
  expect(el.classList.contains('btn--icon')).toBe(true)
})
```

### Coverage Areas

- Button / ButtonBack
- LinkBtnStyled / LinkSkipTo
- FormControlRadio / FormControlCheckbox / FormControlSelect / FormControlToggle
- FormInputText (plain, search, clearable modes)
- Badge / InfoBox / IconExternalLink
- PanelFormControls / FadeTransition
- FormControlRadioChip / FormControlRadioChipGroup
- FormControlRadioGroup (new)

## React Adapter Tests (`react.test.jsx`)

Tests for React adapters verify:

- **Prop → Attribute mapping**: React props are serialized to HTML attributes
- **Complex properties**: Objects (icons) are set via properties, not attributes
- **Event handling**: Change/click events are caught and re-emitted appropriately
- **useState integration**: Controlled components with React state work correctly
- **Rendering**: Components render the correct web component element

### Example: FormControlRadioChipGroup

```javascript
it('serializes options to JSON', () => {
  render(
    <FormControlRadioChipGroup
      legend="Platform"
      name="platform"
      value="web"
      onChange={() => {}}
      options={[
        { value: 'web', label: 'Web' },
        { value: 'native', label: 'Native' },
      ]}
    />
  )
  const group = document.querySelector('ube-form-control-radio-chip-group')
  const optionsAttr = group?.getAttribute('options')
  expect(optionsAttr).toBe(JSON.stringify(options))
})
```

### Setup

React tests use:

- `@testing-library/react` for rendering
- `@testing-library/user-event` for user interactions
- `vitest` for test runner

## Integration Tests (`integration.test.js`)

Tests for cross-cutting concerns:

### CSS Token Cascading

Verify that CSS custom properties (tokens) defined on a parent app cascade to components:

```javascript
it('applies CSS tokens from host app to components', () => {
  container.style.setProperty('--text-body', '#333333')
  container.style.setProperty('--accent', '#0066ff')

  const btn = document.createElement('ube-button-text')
  btn.label = 'Themed'
  container.appendChild(btn)

  const computed = window.getComputedStyle(btn)
  expect(computed).toBeDefined()
})
```

### Light DOM Pattern

Verify that components render in light DOM (not shadow DOM) so:

- CSS tokens cascade from host
- Slot-based content displays correctly
- External styling can target components

```javascript
it('components render without shadow DOM', () => {
  const radio = document.createElement('ube-form-control-radio')
  radio.setAttribute('name', 'test')
  radio.setAttribute('value', 'a')
  radio.setAttribute('label', 'Option A')
  document.body.appendChild(radio)

  const label = radio.querySelector('label')
  expect(label?.parentElement).toBe(radio)
})
```

### Property vs Attribute Serialization

Verify correct serialization strategy:

- Primitives (string, boolean, number) → attributes
- Complex objects (icons, options) → properties

```javascript
it('primitives use attributes', () => {
  const btn = document.createElement('ube-button-text')
  btn.setAttribute('label', 'Test')
  expect(btn.getAttribute('label')).toBe('Test')
})

it('complex objects use properties', () => {
  const btn = document.createElement('ube-button-text')
  const icon = { type: 'svg', data: '<svg></svg>' }
  btn.icon = icon
  expect((btn as any).icon).toEqual(icon)
})
```

### Custom Events

Verify events emit with correct detail payloads:

```javascript
it('components emit custom events with detail', (done) => {
  const chip = document.createElement('ube-form-control-radio-chip')
  chip.setAttribute('name', 'platform')
  chip.setAttribute('value', 'web')
  chip.setAttribute('current', 'native')
  document.body.appendChild(chip)

  chip.addEventListener('change', (e: any) => {
    expect(e.detail.value).toBe('web')
    done()
  })

  const input = chip.querySelector('input')
  input?.click()
})
```

### Accessibility

Verify components include proper accessibility attributes:

```javascript
it('components include ARIA attributes', () => {
  const btn = document.createElement('ube-button-text')
  btn.label = 'Close'
  document.body.appendChild(btn)

  const button = btn.querySelector('button')
  expect(button?.hasAttribute('aria-label')).toBe(true)
})

it('toggle has role="switch"', () => {
  const toggle = document.createElement('ube-form-control-toggle')
  toggle.setAttribute('label', 'Feature')
  document.body.appendChild(toggle)

  const switchEl = toggle.querySelector('[role="switch"]')
  expect(switchEl).toBeDefined()
})
```

## Test Environment Setup

### vitest.config.js

```javascript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

## Adding New Component Tests

When adding a new component:

1. **Core test** (`core.test.js`):
   - Create describe block for component
   - Test observedAttributes
   - Test property accessors
   - Test event emission
   - Test accessibility (aria-*)

2. **React adapter test** (`react.test.jsx`):
   - Test prop → attribute mapping
   - Test complex property handling (icons)
   - Test event handling
   - Test with React state

3. **Integration test** (`integration.test.js`):
   - If component uses CSS tokens: add token cascading test
   - If component emits events: add event detail test
   - If component has accessibility features: add a11y test

## CI Integration

Tests run as part of the build pipeline:

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

## Coverage Goals

- **Core components**: 80%+ statement coverage
- **React adapters**: 70%+ (simpler wrapper layer)
- **Integration**: 100% for critical paths (events, accessibility)

## Debugging Tests

Run a single test file:

```bash
npx vitest __tests__/core.test.js
```

Run a specific test:

```bash
npx vitest -t "Button"
```

Watch mode:

```bash
npx vitest --watch
```
