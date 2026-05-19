# Known Issues and Future Work

## Current Focus (0.3.0 Released)

### Completed in 0.3.0

- ✅ Focus management improvements (WCAG 2.4.3)
- ✅ OverlayManager enhancements (23 transition scenarios)
- ✅ Screen component consolidation (DataError/NoResults → Screen)
- ✅ Modal → Dialog rename across all adapters
- ✅ Comprehensive API documentation
- ✅ Quick-start guides for all frameworks
- ✅ Purpose & Scope documentation

## Current Session: Documentation Polish

### Completed

- ✅ All packages support vanilla-only usage with framework adapters as optional add-ons
- ✅ Framework adapter instructions clarified (vanilla, /react, /vue, /angular, /remix)
- ✅ Install instructions added where missing (@ulam/calamansi)
- ✅ Codebase audited—no dead/unused code found (Panel.jsx and Screen.jsx are internal primitives)
- ✅ Documentation redundancy eliminated
- ✅ @ulam/sawsawan renamed to @ulam/sauce (integration bridge)
- ✅ Sili documentation enhanced with layer ordering and Escape key behavior

## Near Term (Next Release)

### @ulam/sili

- [ ] Add Snackbar component (layer 4+, transient dismissible notifications, no focus trap)
- [ ] Add Angular Dialog/Sheet/Drawer components (currently only services/directives)
- [ ] Expand Vue adapter with Dialog/Sheet/Drawer components
- [ ] Add `focusElementSelector` prop for finding focus target by CSS selector (complement to focusElementRef)
- [ ] Document performance considerations for large overlay lists
- [ ] Add examples for nested overlays
- [ ] Add form validation focus management (focus invalid field on submit, trap focus in error summary)

### @ulam/ube

- ✅ Convert to framework-agnostic vanilla web components (20 components)
- ✅ Add React adapters (20 components, 100% backward compatible)
- ✅ Add Vue adapters (20 components)
- ✅ Add Angular adapters (20 components + UbeModule)
- ✅ Add Remix adapter (re-exports from React)
- ✅ Create comprehensive test suite (unit, integration, infrastructure)
- ✅ Complete documentation (CORE.md, MIGRATION.md, TESTING.md, PROGRESS.md)
- [ ] Create component storybook or component gallery
- [ ] Add more form control variants (textarea, datepicker, etc.)
- [ ] Create theme customization guide
- [ ] Add dark mode documentation examples
- [ ] Document token system and how to extend it
- [ ] Refine useAriaDisabled utility (accessibility for disabled states)
- [ ] Add touch target utility (minimum 48px touch targets per WCAG 2.5.5)

### @ulam/calamansi

- [ ] Add right-to-left (RTL) language support guide
- [ ] Create pluralization and formatting documentation
- [ ] Add examples for number and date formatting per locale

### @ulam/taho

- [ ] Add Toast component (works with announcer, combines notification UI with live region announcements)
- [ ] Add live region role documentation (polite, assertive, alert)
- [ ] Create examples for async state announcements
- [ ] Document screen reader testing approaches
- [ ] Add form validation error announcement examples (error summary, field-level errors)

## Known Limitations

### sili

- **OverlayManager layer ordering is fixed**: Cannot customize screen=0, drawer=1, sheet=2, dialog=3 hierarchy. Workaround: create custom component wrapping OverlayManager logic.
- **Single active overlay**: OverlayManager manages one active overlay at a time. Workaround: use multiple OverlayManager instances for independent overlay stacks.
- **Hash router**: React and Remix adapters include a basic hash router. Migrate to React Router or Remix router for production SPAs.

### ube

- **CSS-in-JS not supported**: All styling is CSS files. Workaround: shadow DOM or CSS modules if you need scoped styles.
- **No built-in animation framework**: Uses CSS animations only. Workaround: add libraries like Framer Motion if needed.
- **React 18+ only**: Not backward compatible with React 17. Workaround: pin ube version if stuck on older React.

### Framework Support

- **Angular**: Only Angular 17+ with standalone components. Workaround: refactor to standalone pattern or use older version of Angular.
- **Vue**: Only Vue 3. Workaround: use Vue 2 alternatives like vue-focus, vue-announcer.

## Bugs to Track

### None Currently Reported

If you encounter bugs, please:

1. Check the [GitHub issues](https://github.com/anthropics/ulam/issues)
2. Provide:
   - Minimal reproduction case
   - Browser/device
   - Framework and version
   - Expected vs actual behavior

## Roadmap Ideas (Not Yet Scheduled)

### Accessibility Enhancements

- [ ] Add breadcrumb component with ARIA landmarks
- [ ] Add combobox component (autocomplete with keyboard navigation)
- [ ] Add tooltip announcer component (use @ulam/taho for dynamic announcements, not Screen ariaLive)
- [ ] Create guide: "When to use @ulam/taho for announcements vs when to use Screen for static content"

### Developer Experience

- [ ] Create CLI tool for scaffolding apps with ulam
- [ ] Add development mode warnings (e.g., missing ARIA labels)
- [ ] Create ESLint plugin for accessibility rules
- [ ] Add debug mode overlay showing focus boundaries

### Performance

- [ ] Add virtual scrolling support for large overlay lists
- [ ] Optimize focus trap for very large containers (1000+ focusable elements)
- [ ] Add lazy-loading examples for overlay content

### Internationalization

- [ ] Add direction-aware overlay positioning (RTL support improvements)
- [ ] Add language-specific keyboard shortcut guides

## Removed/Deprecated Features

### v0.3.0

- **Removed**: `Modal` component (renamed to `Dialog`)
- **Removed**: `DataError` component (replaced by `Screen variant="error"`)
- **Removed**: `NoResults` component (replaced by `Screen variant="no-results"`)
- **Removed**: `baseReturnFocusRef` prop from OverlayManager (automatic trigger tracking)
- **Removed**: Modal aliases for backward compatibility

### Migration Guides

See [UPDATES.md](UPDATES.md) for detailed migration instructions.

## Testing

### Test Coverage Goals

- [ ] Add integration tests for all 23 OverlayManager transition scenarios
- [ ] Add accessibility tests (axe-core, jest-axe)
- [ ] Add keyboard navigation tests (Tab, Shift+Tab, Escape, Arrow keys)
- [ ] Add screen reader tests (NVDA, JAWS, VoiceOver)

## Documentation

### Done

- ✅ API Reference (sili README)
- ✅ Common Patterns (sili README)
- ✅ Quick-start guides (root README)
- ✅ Purpose & Scope (all package READMEs)
- ✅ Migration guide (UPDATES.md)

### In Progress

- [ ] Contributing guide (CONTRIBUTING.md)
- [ ] Video tutorials for getting started
- [ ] Accessibility testing guide
- [ ] Theming guide for ube

### Needed

- [ ] Focus flow diagram for sili (visual representation of focus movement through overlays)
- [ ] Architecture overview for sili (how focus management, overlay stacking, and routing fit together)
- [ ] Component story documentation for ube (Storybook or prop docs for 20+ components)

## Contact & Feedback

- Issues: Open on GitHub
- Questions: See package READMEs for detailed docs
- Feedback: File an issue with `feedback:` prefix
