# Changelog

All notable changes to @ulam/sili will be documented in this file.

## [0.3.0] - Unreleased

### Changed

- **File Organization**: Moved `core/sili.css` → `base.css` at package root for better discoverability. Improved alignment with `@ulam/ube` organizational patterns.

- **CSS Reorganization**: Restructured `base.css` with clear section headers and logical grouping:
  - Shared backdrop styles (all overlay backdrops)
  - Drawer: base styles → focus state → open state → scroll lock interactions → RTL variants
  - BottomSheet: backdrop, panel, chrome/handle, content sections, close button → RTL variants → responsive media queries
  - Modal: backdrop, panel, content sections
  - Global utilities (scroll lock, sheet collapsed state padding)
  - Accessibility: reduced motion media query
  - Print media query

- **CSS Dependencies**: Added `@ulam/ube` as a peer dependency (>=0.2.0) since `base.css` consumes ube's CSS custom properties (`--overlay-bg`, `--bg`, `--border`, etc.).

- **Focus Return Styling**: Added `[data-focus-return]` focus ring styling. Set on elements when overlays close and focus is restored, ensuring focus ring shows regardless of input modality. Managed by router plugin's `returnFocus()` utility.

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
