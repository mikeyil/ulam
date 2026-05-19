# Ulam Roadmap & Known Issues

Consolidated tracking for all packages. Updated: 2026-05-19 (v0.3.1 + optimizations released).

---

## v0.3.2 Optimizations (In Progress) 🚀

**Released**: 2026-05-19  
**Scope**: Performance improvements, security hardening, accessibility enhancements

### Completed Optimizations

- ✅ **Security**: Fixed Google API key URL exposure (moved to Authorization header)
- ✅ **Security**: Added provider URL whitelist (SSRF prevention)
- ✅ **Optimization**: Extracted shared `useSubscribe` hook (@ulam/shared package)
- ✅ **Optimization**: Migrated useProviderConfig to useSyncExternalStore (better re-render efficiency)
- ✅ **Performance**: Fixed event listener accumulation in form-control-select
- ✅ **Performance**: Simplified usePaginationFocus (O(n) → O(1) comparison)
- ✅ **Performance**: Added debouncing to usePref storage writes

### Documentation Created

- ✅ Root SECURITY.md (300+ lines comprehensive audit)
- ✅ packages/halohalo/SECURITY.md (API key storage guidelines)
- ✅ AUDIT_SUMMARY.md (quick reference guide)

---

## v0.3.1 Release Status ✅

**Released**: 2026-05-19  
**Scope**: Documentation, guides, audits (no code changes)

### Deliverables

- ✅ Consumer App Guide: App*/A11y* naming, organization patterns
- ✅ i18n Best Practices: 50+ language patterns, RTL support
- ✅ Root CHANGELOG.md: Complete version history
- ✅ Comprehensive audits: Stale refs, tokenization, code quality
- ✅ All packages v0.3.0 → v0.3.1
- ✅ Tags created & pushed: Ready for npm deploy

---

## @ulam/taho - ARIA Live Region Announcer

**Version**: 0.3.1  
**Status**: Stable ✅

### Current Features

- ✅ Vanilla core: `announce()`, `clearAnnouncements()`
- ✅ React hooks: `useAnnounce`, `Announcer` component
- ✅ Remix: Route announcer, React re-exports
- ✅ Vue composables: `useAnnounce`
- ✅ Angular service: `AnnounceService`, `provideAnnounce`
- ✅ Purpose & Scope documentation

### Known Limitations

- No message queuing (apps control what gets announced)
- No filtering or deduplication at framework level
- Relies on apps for appropriate message formatting

### Future Ideas (Not Scheduled)

- [ ] Toast component (notification UI + live region integration)
- [ ] Live region role documentation (polite, assertive, alert)
- [ ] Examples for async state announcements
- [ ] Screen reader testing guide
- [ ] Form validation error announcement examples

---

## @ulam/sili - Focus Management & Overlays

**Version**: 0.3.1  
**Status**: Stable ✅

### v0.3.0 Completion

- ✅ OverlayManager: 23 transition scenarios, automatic focus orchestration
- ✅ Vue components: Dialog, Sheet, Drawer with full sili integration
- ✅ Modal → Dialog rename (semantic accuracy with HTML `<dialog>`)
- ✅ WCAG 2.4.3 focus management
- ✅ API reference documentation
- ✅ MIGRATION.md for breaking changes
- ✅ PROGRESS.md with roadmap

### High Priority (Next Release)

- [ ] **Snackbar component** (layer 4+, transient, no focus trap)
  - For notifications without focus interruption
  - Auto-dismiss with optional action
  - Works with Dialog/Sheet/Drawer

- [ ] **Angular Components** (Dialog, Sheet, Drawer)
  - Component wrappers around services/directives
  - Full template integration
  - Input/output bindings

- [ ] **Vue Refinements**
  - Slot pattern improvements
  - Composition API examples
  - Transition integration

- [ ] **`focusElementSelector` Prop**
  - CSS selector alternative to focusElementRef
  - For dynamic/template-based focus targets

### Medium Priority

- [ ] Nested overlay examples (Dialog within Sheet, independent stacks)
- [ ] Form validation focus (focus invalid field, trap in error summary)
- [ ] Performance documentation (large overlay lists, 1000+ focusable elements)
- [ ] Visual focus flow diagram (focus movement, keyboard navigation, Escape behavior)

### Known Limitations - Sili

- **Fixed layer ordering**: screen=0, drawer=1, sheet=2, dialog=3 (not customizable)
  - Workaround: Create custom component wrapping OverlayManager
- **Single active overlay**: OverlayManager manages one active overlay at a time
  - Workaround: Use multiple OverlayManager instances
- **Hash router**: Basic implementation (migrate to React Router v7+ or Remix router for production)

### Testing Gaps - Sili

- [ ] Integration tests for all 23 transition scenarios
- [ ] Accessibility tests (axe-core, jest-axe)
- [ ] Keyboard navigation tests (Tab, Shift+Tab, Escape, arrows)
- [ ] Screen reader tests (NVDA, JAWS, VoiceOver)
- [ ] RTL layout tests

---

## @ulam/calamansi - Internationalization

**Version**: 0.3.1  
**Status**: Stable ✅

### Current Features - Calamansi

- ✅ Data-agnostic i18n with runtime locale switching
- ✅ String interpolation with variable substitution
- ✅ Per-locale fallback chains (e.g., en-US → en → default)
- ✅ localStorage-backed preference persistence
- ✅ Framework-agnostic vanilla core + React/Vue/Angular adapters
- ✅ Zero dependencies
- ✅ I18N-BEST-PRACTICES.md guide (50+ language patterns)

### Future Ideas - Calamansi

- [ ] Right-to-left (RTL) language support guide
- [ ] Pluralization and formatting documentation
- [ ] Examples for number and date formatting per locale
- [ ] Collation and sorting recommendations

### Notes - Calamansi

- No built-in pluralization (bring your own via Intl.PluralRules)
- No number/date formatting (use Intl APIs)
- Translation file management handled by apps

---

## @ulam/ube - Framework-Agnostic UI Components

**Version**: 0.3.1  
**Status**: Stable ✅

### v0.3.0 Completion (Framework-Agnostic Migration)

- ✅ 20 vanilla web components fully implemented
- ✅ React adapters: 20 components (100% backward compatible)
- ✅ Vue adapters: 20 single-file components
- ✅ Angular adapters: 20 component decorators + UbeModule
- ✅ Remix adapters: Re-exports from React
- ✅ Comprehensive test suite (unit, integration, accessibility)
- ✅ Design token system (colors, spacing, typography, motion)
- ✅ CSS theming (light, dark, fiesta modes)
- ✅ Complete documentation (CORE.md, MIGRATION.md, TESTING.md, PROGRESS.md)

### Known Limitations - Ube

- **CSS-in-JS not supported**: All styling via CSS files
  - Workaround: Shadow DOM or CSS modules for scoped styles
- **No built-in animation framework**: CSS animations only
  - Workaround: Add Framer Motion or similar if needed
- **React 18+ only**: Not backward compatible with React 17
  - Workaround: Pin Ube version if stuck on older React

### Future Ideas - Ube

- [ ] Component storybook or gallery
- [ ] More form control variants (textarea, datepicker, etc.)
- [ ] Theme customization guide
- [ ] Dark mode documentation examples
- [ ] Token system extension guide
- [ ] `useAriaDisabled` utility (accessibility for disabled states)
- [ ] Touch target utility (48px minimum per WCAG 2.5.5)

### Testing Coverage

- ✅ Unit tests for core components and React adapters
- ✅ Integration tests (CSS cascading, Light DOM, accessibility)
- ✅ Accessibility audit against WCAG 2.2 AA
- ⏳ Full integration test suite (in progress with OverlayManager)

---

## @ulam/halohalo - AI Provider Adapters

**Version**: 0.3.1  
**Status**: Stable ✅

### Current Features - Halohalo

- ✅ Provider abstraction (Anthropic, OpenAI, Google)
- ✅ API key management (localStorage-backed, never sent to server)
- ✅ Model selection and configuration per provider
- ✅ Completion calls with consistent interface across providers
- ✅ Tool calling and agentic mode
- ✅ Framework-agnostic vanilla core + React/Vue/Angular adapters
- ✅ Purpose & Scope documentation

### Known Limitations - Halohalo

- No message history (apps manage conversation state)
- No streaming response handling (returns complete results)
- No rate limiting or retry logic (use middleware patterns)
- No token counting or pricing calculation (external concern)
- No API key validation or rotation (user responsibility)
- No multi-user authentication or access control

### Future Ideas - Halohalo

- [ ] Streaming response support
- [ ] Message history management
- [ ] Rate limiting and retry strategies
- [ ] Token counting utilities
- [ ] Additional provider support

---

## @ulam/sawsawan - Integration Bridge

**Version**: 0.3.1  
**Status**: Stable ✅

### Current Features - Sawsawan

- ✅ Wires ube and calamansi together without circular dependencies
- ✅ Sets `html[lang]` on locale changes
- ✅ Sets `html[dir]` for RTL locale support
- ✅ Wires i18n announcements (locale switch notifications)
- ✅ Framework-agnostic integration patterns
- ✅ Purpose & Scope documentation

### Design - Sawsawan

- Only package that imports from others
- No downstream dependencies (nothing imports sawsawan)
- Pure composition of other packages' APIs

---

## Framework Support

| Framework | taho | sili | calamansi | ube | halohalo | Status |
| --------- | ---- | ---- | --------- | --- | -------- | ------ |
| Vanilla | ✅ | ✅ | ✅ | ✅ | ✅ | Core |
| React 18+ | ✅ | ✅ | ✅ | ✅ | ✅ | Full |
| Vue 3 | ✅ | ✅ | ✅ | ✅ | ✅ | Full |
| Angular 17+ | ✅ | ✅ | ✅ | ✅ | ✅ | Full |
| Remix | ✅ | ✅ | ✅ | ✅ | ✅ | Full |

---

## Documentation Status

### Complete ✅

- Root README.md (framework overview, quick starts)
- Package READMEs (API reference, usage examples)
- CHANGELOG.md (complete v0.1.0 → v0.3.1 history)
- Purpose & Scope (all packages)
- docs/ARCHITECTURE.md (unified framework structure)
- docs/CONSUMER-APP-GUIDE.md (naming conventions, patterns)
- packages/calamansi/I18N-BEST-PRACTICES.md (50+ language patterns)
- packages/sili/MIGRATION.md (Modal → Dialog breaking change)
- packages/sili/PROGRESS.md (roadmap, known limitations)
- packages/ube/CORE.md (design decisions)
- packages/ube/MIGRATION.md (framework-agnostic migration)
- packages/ube/TESTING.md (test structure)
- packages/ube/PROGRESS.md (project status)

### Future Documentation Ideas

- [ ] Breadcrumb component guide (ARIA landmarks)
- [ ] Combobox component (autocomplete with keyboard navigation)
- [ ] When to use @ulam/taho vs @ulam/sili for announcements
- [ ] Contributing guide (CONTRIBUTING.md)
- [ ] Video tutorials for getting started
- [ ] Accessibility testing guide (screen reader, keyboard)
- [ ] Theming guide for ube

---

## Known Issues

### None Currently Reported

If you encounter issues:

1. Check [GitHub issues](https://github.com/mikeyil/ulam/issues)
2. Provide:
   - Minimal reproduction case
   - Browser/device
   - Framework and version
   - Expected vs actual behavior

---

## Bugs to Track

(None currently in progress)

---

## Code Quality Metrics

| Metric | Status |
| ------ | ------ |
| Code duplication | 0 (intentional adapters) |
| Dead code | 0 |
| Markdown linting | ✅ Clean |
| Unused imports | 0 |
| Token duplication | 0 |
| Stale references | ✅ Fixed (Modal→Dialog) |

---

## Version Strategy

Follows **semantic versioning** per package:

- **Major** (X.0.0): Breaking API changes
- **Minor** (0.X.0): New features, backward compatible
- **Patch** (0.0.X): Bug fixes, documentation improvements

All packages released together at same version number.

---

## Contact & Feedback

- **Issues**: Open on [GitHub](https://github.com/mikeyil/ulam/issues)
- **Questions**: See package READMEs for detailed docs
- **Feedback**: File an issue with `feedback:` prefix
