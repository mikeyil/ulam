# UBE Framework-Agnostic Migration Progress

## Phase 1: Core Web Components

### Completed

#### Week 1: ButtonText (Proof of Concept)

✅ `core/base-element.js` (60 lines)

- Base class for all ube web components
- Lifecycle hooks: `connectedCallback`, `attributeChangedCallback`
- Helpers: `_emitEvent`, `_setClassIf`, `_setAriaLabel`

✅ `core/button-text.js` (120 lines)

- Full implementation: attributes, properties, rendering, event handling
- Attributes: `variant`, `disabled`, `active`, `full-width`, `label`, `active-label`, `title`
- Properties: `icon`, `activeIcon` (for JSX/DOM elements)
- Events: standard `click` event
- Tested: attributes sync to DOM classes, icon rendering works, disabled state prevents clicks

✅ `core/index.js`

- Exports `UbeElement` and `UbeButtonText`
- Registers web component via `customElements.define`

✅ `react/ButtonText.jsx` (65 lines)

- React adapter (thin wrapper)
- Handles React props → web component attributes/properties
- Uses `useEffect` to sync icon/activeIcon properties
- API identical to original React component

✅ `react/index.js`

- Exports React adapters
- Re-exports utilities from theme.js, taho

✅ `CORE.md`

- Documentation for vanilla web component usage
- Design decisions documented (light DOM, property vs attribute, event naming)
- Migration guide for React users
- Browser support table

✅ `core/test-button-text.html`

- Manual test harness with 5 test groups
- Tests: variants, states, attributes, icon property, interactivity
- Can be opened in browser for quick validation

### Validation

✅ Syntax check: `node -c` passes for all .js files
✅ Build: `npm run build` completes successfully
✅ No linter errors
✅ Directory structure correct (core/, react/)

### Next: Port remaining 19 components

**Category A: Simple Form Elements** (3 components, ~4.5 hrs)

- [ ] FormControlRadio
- [ ] FormControlCheckbox
- [ ] FormControlSelect

**Category B: More Buttons & Links** (4 components, ~6 hrs)

- [ ] ButtonIcon
- [ ] ButtonBack
- [ ] LinkBtnStyled
- [ ] LinkSkipTo

**Category C: Input Wrappers** (2 components, ~3 hrs)

- [ ] FormInputSearch
- [ ] FormInputWithClear

**Category D: Complex Components** (5 components, ~12.5 hrs)

- [ ] Toggle
- [ ] FormControlRadioChip
- [ ] FormControlRadioChipGroup
- [ ] Panel
- [ ] Screen
- [ ] Badge
- [ ] InfoBox

**Category E: Utilities** (4 components, ~4 hrs)

- [ ] FadeTransition
- [ ] IconExternalLink
- [ ] PanelFormControls

---

## Notes

### ButtonText Implementation Details

#### Light DOM approach works great

- CSS classes (`.btn`, `.btn--primary`, `.btn__field--success`, etc.) apply correctly
- Design tokens (`--text-body`, `--accent`, etc.) cascade from host app
- No shadow DOM means styles stay flexible and themeable

#### Icon rendering pattern

- Icons are properties (not attributes) because they're DOM elements
- React adapter uses `useEffect` to sync the property when prop changes
- Web component clones the icon on render to avoid moving DOM around

#### State management is simple

- Attributes drive state: `disabled`, `active`, `full-width`, etc.
- Getters/setters on the class make it ergonomic: `btn.active = true` → `setAttribute('active', '')`
- `attributeChangedCallback` triggers re-render, updates DOM classes

#### Event handling

- Standard `click` event fires naturally from button element
- Disabled check prevents propagation if needed
- No custom event names—just native browser events

### React Adapter Pattern

The React adapter is **very thin**:

```jsx
<ube-button-text
  ref={ref}
  variant={variant}
  disabled={disabled}
  // ... pass all attributes
>
  {children}
</ube-button-text>
```

Special handling only for complex properties (icon, activeIcon) via `useEffect`. Everything else is direct prop → attribute mapping.

### File Sizes

- `base-element.js`: 60 lines (reusable for all components)
- `button-text.js`: 120 lines (pure vanilla web component)
- `ButtonText.jsx`: 65 lines (React adapter)

Pattern: vanilla component is ~2-3x the size of the React adapter, but the base class amortizes across all components.

---

## Risk Assessment

✅ **Light DOM works** — no issues with CSS tokens cascading
✅ **Icon property works** — React useEffect can sync DOM elements
✅ **Event handling is standard** — no custom event complications
⚠️ **Form integration** — haven't tested form submission yet (next component: Toggle)

---

## Estimated Remaining Effort

- **Phase 1 (Core): 30-35 hrs remaining** (out of 35-45 total)
  - Components: 25-30 hrs
  - Testing: 2-3 hrs
  - Docs updates: 1-2 hrs

- **Phase 2 (React): 10-12 hrs** (very fast once patterns locked in)
- **Phase 3 (Vue/Angular): 8-12 hrs**
- **Phase 4 (Integration): 10-15 hrs**
- **Phase 5 (Docs): 5-8 hrs**

**Total: 63-82 hrs remaining** (current session: ~2 hrs invested)
