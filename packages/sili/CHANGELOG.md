# Changelog

All notable changes to @ulam/sili will be documented in this file.

## [0.3.0] - 2026-05-18

### Added

- **OverlayManager Component**: Generic multi-overlay orchestration supporting transitions across all overlay types.
  - Implements layer order: screen (0) < drawer/panel (1) < sheet (2) < dialog (3)
  - Automatic focus management: higher→lower closes with focus restore, lower→higher stacks with inert background
  - Supports 23 transition scenarios (screen↔panel, dialog↔sheet, etc.)
  - Base trigger/target tracking for focus restoration without explicit refs
  - Per-overlay `returnFocusRef` override for app-specific focus behavior
  - Works with any overlay orchestration pattern (data-driven, imperative, etc.)

- **Vue Adapter Expansion**: Added Dialog, Sheet, Drawer components with full sili hooks integration.
  - `Dialog`, `DialogShell`: Centered dialog with focus trap, ARIA hide, escape handling
  - `Sheet`, `SheetShell`: Bottom sheet with collapse support and scroll lock
  - `Drawer`, `DrawerShell`: Side drawer with focus trap and restoration
  - All fully wired with Vue composables; Shell variants provide structure-only primitives

- **Focus Management Documentation**: Added clear guide to sili's responsibilities vs app responsibilities.
  - Sili handles: focus trap, escape, return focus, layer order, transition rules
  - App handles: state management, overlay content, app-specific focus targets

- **Improved Initial Focus Management (WCAG 2.4.3)**: Automatic focus strategy for overlays on open.
  - Default: Focus heading with `tabIndex={-1}` → first focusable element → container (fallback)
  - Override props: `focusElementRef` (explicit element) and `initialFocusContainer` (use container)
  - New utility: `getInitialFocusTarget()` for finding best focus target in container
  - Documented warnings against skipping content to place focus lower on page
  - Integrated into Dialog, Sheet, Drawer, and OverlayManager

- **Comprehensive API Reference**: Full documentation of all vanilla, React, Vue, and Angular APIs
  - Method signatures with params and return types
  - React hook patterns and composable signatures
  - Component prop tables with descriptions
  - Vue composition API examples

### Changed

- **Overlay Component Naming**: Renamed `Modal` → `Dialog` for semantic accuracy (aligns with HTML `<dialog>` and ARIA `role="dialog"`).
  - Updated all adapters: React, Remix, Vue
  - `Modal` removed; `Dialog` is the standard
  - Maintained consistency across all overlay types

- **File Organization**: Moved `core/sili.css` → `base.css` at package root for better discoverability. Improved alignment with `@ulam/ube` organizational patterns.

- **CSS Reorganization**: Restructured `base.css` with clear section headers and logical grouping:
  - Shared backdrop styles (all overlay backdrops)
  - Drawer: base styles → focus state → open state → scroll lock interactions → RTL variants
  - BottomSheet: backdrop, panel, chrome/handle, content sections, close button → RTL variants → responsive media queries
  - Dialog: backdrop, panel, content sections
  - Global utilities (scroll lock, sheet collapsed state padding)
  - Accessibility: reduced motion media query
  - Print media query

- **CSS Dependencies**: Added `@ulam/ube` as a peer dependency (>=0.2.0) since `base.css` consumes ube's CSS custom properties (`--overlay-bg`, `--bg`, `--border`, etc.).

- **Focus Return Styling**: Added `[data-focus-return]` focus ring styling. Set on elements when overlays close and focus is restored, ensuring focus ring shows regardless of input modality. Managed by router plugin's `returnFocus()` utility.

- **Remix Adapter**: Updated to export `Dialog` (no backward-compat aliases).

### Fixed

- **Package Exports**: Updated `package.json` exports from `"./core/sili.css"` → `"./base.css"`
- **Files Array**: Added `base.css` to package files manifest

## [0.2.0] - 2026-05-18

### Changed (0.2.0)

- **Overlay Cleanup**: Removed unused token imports and keyboard handlers from Sheet component for cleaner implementation.

---

## [0.1.2] - 2026-05-14

Minor release with framework fixes.

---

## [0.1.0] - 2026-05-13

Initial public release of @ulam/sili.

### Added (0.1.0)

- **Vanilla Core**: Focus management utilities (`trapFocus`, `getFocusable`, `hideBackground`, `returnFocus`, `onEscapeKey`, `lockScroll`) with zero dependencies.

- **React Hooks**: `useFocusTrap`, `useAriaHide`, `useReturnFocus`, `useEscapeKey`, `useFocusOnMount`, `useFocusOnChange`, `usePaginationFocus`, `useDir`, `useMediaQuery`, `usePageTitle`.

- **React Components**: `Modal`, `Drawer`, `Sheet` overlay components with built-in focus management, ARIA hiding, and Escape handling.

- **React Router**: Hash-based router with automatic focus restoration on navigation, RTL support, and page title updates.

- **Vue Adapter**: Full Vue 3 composables matching React hooks API.

- **Angular Adapter**: Full Angular services and directives for focus management and overlays.

- **Remix Adapter**: Remix-compatible router hooks and overlay components (React hooks + Remix-backed routing).

- **CSS Framework**: `core/sili.css` for overlay styling (backdrops, panels, animations).

- **Accessibility**: All components handle WCAG focus management patterns (2.4.3) with proper focus trapping, restoration, and keyboard support.

---

## License

MIT
