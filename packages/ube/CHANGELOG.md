# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-05-18

### Added
- `useAriaDisabled` hook for managing keyboard interactions on aria-disabled form controls
- `LinkSkipTo` component for accessible skip-to links with optional icon
- `FadeTransition` component for smooth cross-fade animations between content

### Changed
- **Toggle**: Now uses `useAriaDisabled` hook for proper Space/Enter key prevention on disabled state
- **Select**: Enhanced with `useAriaDisabled` hook, added support for `aria-invalid` and `aria-describedby` attributes, added mouse event handling for disabled state
- **Button**: Uses `aria-disabled` instead of native `disabled` attribute for better semantic control

### Fixed
- Disabled form controls now properly prevent Space and Enter key activation across Toggle and Select components
- Select component now prevents click interactions when disabled

## [0.1.3] - Previous release

See git history for details.
