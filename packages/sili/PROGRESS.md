# @ulam/sili Progress & Roadmap

## Current Status: v0.3.0 Released

### v0.3.0 Highlights (2026-05-18)

✅ **OverlayManager Component**
- Multi-overlay orchestration supporting 23 transition scenarios
- Layer order: screen (0) < drawer/panel (1) < sheet (2) < dialog (3)
- Automatic focus management with focus restoration
- Works with any overlay orchestration pattern

✅ **Framework Completeness**
- React: Full component set (Dialog, Sheet, Drawer) + hooks
- Vue: Full component set (Dialog, Sheet, Drawer) + composables
- Remix: Dialog, Sheet, Drawer + route-based focus
- Angular: Services + directives (component support in next release)

✅ **Focus Management (WCAG 2.4.3)**
- Automatic initial focus strategy (heading → first focusable → container)
- Focus trap with getInitialFocusTarget() utility
- Focus restoration on overlay close
- Escape key handling with custom callbacks
- Scroll lock during overlays

✅ **Accessibility**
- ARIA hiding of background content during overlays
- Proper focus sequencing across nested overlays
- Keyboard navigation support
- Screen reader announcements via aria-live

✅ **Documentation**
- Complete API reference (vanilla, React, Vue, Angular)
- Focus management guide
- Breaking change migration guide (Modal → Dialog)
- Purpose & Scope documentation
- Quick-start examples for all frameworks

---

## Near Term: Next Release

### High Priority

- [ ] **Add Snackbar component** (layer 4+, transient, no focus trap)
  - For notifications that don't interrupt focus
  - Works alongside Dialog/Sheet/Drawer
  - Auto-dismiss with optional action button

- [ ] **Add Angular Components** (Dialog, Sheet, Drawer)
  - Component wrappers around directives
  - Full template integration
  - Input/output bindings for all sili properties

- [ ] **Vue Adapter Completion** (Dialog/Sheet/Drawer refinements)
  - Slot pattern improvements
  - Composition API examples
  - Transition integration

- [ ] **`focusElementSelector` Prop**
  - CSS selector alternative to focusElementRef
  - For dynamic or template-based focus targets
  - Complements explicit element refs

### Medium Priority

- [ ] **Nested Overlay Examples**
  - Dialog within Sheet
  - Multiple independent overlay stacks
  - Focus movement patterns

- [ ] **Form Validation Focus**
  - Focus invalid field on submit
  - Trap focus in error summary
  - Announce validation errors (with @ulam/taho)

- [ ] **Performance Documentation**
  - Large overlay lists
  - Focus trap performance with 1000+ focusable elements
  - Virtual scrolling patterns

- [ ] **Visual Focus Flow Diagram**
  - Show focus movement through overlay hierarchy
  - Keyboard navigation patterns
  - Escape key behavior by layer

---

## Known Limitations

### Current Design

- **Fixed layer ordering**: screen=0, drawer=1, sheet=2, dialog=3 (not customizable)
  - Workaround: Create custom component wrapping OverlayManager logic

- **Single active overlay**: OverlayManager manages one active overlay at a time
  - Workaround: Use multiple OverlayManager instances for independent stacks

- **Hash router in React/Remix**: Basic implementation for demos
  - Migrate to React Router v7+ or Remix router for production

---

## Testing & Quality

### Test Coverage Goals

- [ ] Integration tests for all 23 OverlayManager transition scenarios
- [ ] Accessibility tests (axe-core, jest-axe)
- [ ] Keyboard navigation tests (Tab, Shift+Tab, Escape, Arrow keys)
- [ ] Screen reader tests (NVDA, JAWS, VoiceOver)
- [ ] RTL layout tests for drawer positioning

### Current Status

- ✅ Unit tests for vanilla core utilities
- ✅ React component tests (focus trap, escape handling)
- ✅ Accessibility audit against WCAG 2.4.3
- ⏳ Full integration test suite (in progress with OverlayManager)

---

## Related Packages

### @ulam/taho

Announcements for overlay state changes (optional integration):

```javascript
// When Dialog opens
announce('Dialog: Confirm Action', { priority: 'assertive' })

// When overlay closes
announce('Dialog closed')
```

See [@ulam/taho](../taho) for live region announcements.

### @ulam/ube

UI components for overlay content:

```jsx
<Dialog open={isOpen}>
  <ube-button variant="primary" onClick={handleConfirm}>
    Confirm
  </ube-button>
</Dialog>
```

See [@ulam/ube](../ube) for 20+ web components.

### @ulam/calamansi

i18n support for overlay labels and messages:

```jsx
const t = useT()
<Dialog open={isOpen} title={t('dialog.confirm')}>
  {t('dialog.confirmMessage')}
</Dialog>
```

See [@ulam/calamansi](../calamansi) for runtime locale switching.

---

## Contributing

Interested in contributing? See the main [CONTRIBUTING.md](../../CONTRIBUTING.md) guide.

**Current focus areas:**
- Accessibility testing and screen reader validation
- Component examples for Vue and Angular
- Performance optimization for focus trap with large lists
- Documentation improvements and visual diagrams

---

## Version History

| Version | Date | Focus |
|---------|------|-------|
| [0.3.0](./CHANGELOG.md#030---2026-05-18) | 2026-05-18 | OverlayManager, Modal→Dialog, Accessibility |
| [0.2.0](./CHANGELOG.md#020---2026-05-18) | 2026-05-18 | Overlay refinements |
| [0.1.2](./CHANGELOG.md#012---2026-05-14) | 2026-05-14 | Framework fixes |
| [0.1.0](./CHANGELOG.md#010---2026-05-13) | 2026-05-13 | Initial release |

---

## Questions?

- **API Reference**: See [README.md](./README.md)
- **Focus Management**: See [README.md - Focus Management Section](./README.md)
- **Breaking Changes**: See [MIGRATION.md](./MIGRATION.md)
- **Changelog**: See [CHANGELOG.md](./CHANGELOG.md)
