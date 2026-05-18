# @ulam/ube

Accessible React UI components, theming, and design tokens. The sweet layer of the ulam framework.

Purple-first. Accessible out of the box. Zero external dependencies beyond React.

## The ulam framework

```text
ulam
├── @ulam/ube          sweet  : React UI components, theming, design tokens  ← you are here
├── @ulam/sili         hot    : focus management, overlays, routing
├── @ulam/taho         warm   : ARIA live region announcer
├── @ulam/calamansi    sour   : i18n, hooks, utilities, logic
└── @ulam/sawsawan     bridge : wires the above together
```

Use ube independently, or with the full ulam stack. No cross-package dependencies: ube does not import from taho, sili, calamansi, or sawsawan.

## Install

```bash
npm install @ulam/ube
```

Peer dependencies: `react >= 18`, `react-dom >= 18`.

### Optional: import aliases

The package names are Filipino food terms: meaningful to the framework but unfamiliar to most developers. If you prefer shorter or more descriptive import names, npm's built-in alias syntax lets you rename packages at install time without any changes to ube itself.

Install with aliases:

```bash
npm install ube@npm:@ulam/ube
npm install calamansi@npm:@ulam/calamansi
npm install sawsawan@npm:@ulam/sawsawan
```

Your `package.json` will show:

```json
{
  "dependencies": {
    "ube": "npm:@ulam/ube",
    "calamansi": "npm:@ulam/calamansi",
    "sawsawan": "npm:@ulam/sawsawan"
  }
}
```

Then import using whichever name you installed under:

```jsx
import { Button, Toggle } from 'ube'
import { useT, usePref } from 'calamansi'
```

Or use any name you like: the alias is yours to choose:

```bash
npm install ui@npm:@ulam/ube
npm install i18n@npm:@ulam/calamansi
```

The canonical package names (`@ulam/ube` etc.) are always the stable reference. Aliases are a local convenience and do not affect the published package.

## Quick start

### Import stylesheets at app root

```jsx
import '@ulam/ube/base-tokens.css'     // Design token primitives
import '@ulam/ube/base-typography.css' // Structural typography baseline
import '@ulam/ube/ui.css'               // Reset, utility styles, print, user preferences
```

These foundational imports must come first. Component-specific CSS is automatically imported by each component.

### Set up your app

```jsx
import { ButtonText, Toggle, InputSearch } from '@ulam/ube'
import { Announcer } from '@ulam/taho/react'
import { Router } from '@ulam/sili/react'

export default function App() {
  return (
    <Router>
      <Announcer />
      <AppShell />
    </Router>
  )
}
```

All components are tree-shakeable: only imported components bundle their CSS.

---

## Components

### ButtonText

Text button with icon support, state transitions, and semantic variants.

```jsx
import { ButtonText } from '@ulam/ube'

<ButtonText variant="primary" onClick={handleClick}>Save changes</ButtonText>
<ButtonText variant="primary" icon={<Star size={16} />} active={saved} activeLabel="Saved">Save</ButtonText>
<ButtonText variant="danger" fullWidth onClick={handleDelete}>Delete</ButtonText>
```

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger'` | `'primary'` | Visual style |
| `onClick` | function | - | Click handler |
| `disabled` | boolean | `false` | Disabled state |
| `fullWidth` | boolean | `false` | Stretches to container width |
| `icon` | ReactNode | - | Decorative icon (left of label) |
| `activeIcon` | ReactNode | - | Icon shown when `active` is true |
| `active` | boolean | `false` | Active/toggled state |
| `label` | string | - | `aria-label` override |
| `activeLabel` | string | - | `aria-label` when active |
| `className` | string | - | Additional CSS classes |

---

### ButtonIcon

Icon-only button. Always requires `label` for screen readers.

```jsx
import { ButtonIcon } from '@ulam/ube'

<ButtonIcon icon={<X size={20} />} label="Close" variant="accent" onClick={onClose} />
<ButtonIcon icon={<Settings size={20} />} label="Settings" variant="tertiary" onClick={onSettings} />
```

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `icon` | ReactNode | - | Icon element (required) |
| `label` | string | - | `aria-label` (required) |
| `variant` | `'accent' \| 'tertiary'` | `'accent'` | Visual style |
| `onClick` | function | - | Click handler |
| `disabled` | boolean | `false` | Disabled state |

---

### LinkBtnStyled

Anchor element styled with button classes, for external links or hash navigation.

```jsx
import { LinkBtnStyled } from '@ulam/ube'

<LinkBtnStyled href="https://example.com" className="btn--primary">Visit site</LinkBtnStyled>
<LinkBtnStyled href="#/settings" className="btn--secondary">Settings</LinkBtnStyled>
```

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `href` | string | - | Link destination (required) |
| `className` | string | - | CSS classes for button styling |
| `children` | ReactNode | - | Link label |

---

### Toggle

Binary on/off switch. Always pair with a visible label.

```jsx
import { Toggle } from '@ulam/ube'

<label htmlFor="live-search">
  <Toggle id="live-search" checked={liveSearch} onChange={setLiveSearch} />
  Live search
</label>
```

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | string | - | Input id, must match label's `htmlFor` |
| `checked` | boolean | - | Controlled value (required) |
| `onChange` | function | - | `(checked: boolean) => void` |
| `disabled` | boolean | `false` | Disabled state |

---

### ControlRadioChip

Radio input styled as a selectable chip. Group under a shared `name`.

```jsx
import { ControlRadioChip } from '@ulam/ube'

{['A', 'AA', 'AAA'].map(level => (
  <ControlRadioChip
    key={level}
    name="wcag-level"
    value={level.toLowerCase()}
    label={level}
    current={selectedLevel}
    onChange={setSelectedLevel}
  />
))}
```

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `name` | string | Radio group name (required) |
| `value` | string | This chip's value (required) |
| `label` | string | Visible label (required) |
| `current` | string | Currently selected value |
| `onChange` | function | `(value: string) => void` |

---

### ControlRadio

Plain accessible radio input with label for use in control layouts.

```jsx
import { ControlRadio } from '@ulam/ube'

<ControlRadio name="theme" value="dark" label="Dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
```

---

### ControlCheckbox

Plain accessible checkbox input with label for use in control layouts.

```jsx
import { ControlCheckbox } from '@ulam/ube'

<ControlCheckbox label="Accept terms" checked={accepted} onChange={setAccepted} />
```

---

### Select

Native-enhanced dropdown with keyboard support and token-driven sizing.

```jsx
import { Select } from '@ulam/ube'

<Select id="framework" value={value} onChange={e => setValue(e.target.value)}>
  <option value="react">React</option>
  <option value="vue">Vue</option>
</Select>
```

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `id` | string | Input id |
| `value` | string | Controlled value |
| `onChange` | function | Change handler |
| `disabled` | boolean | Disabled state |

---

### InputSearch

Self-contained search field with `form[role="search"]` wrapper, live or submit mode, clear button, and submit icon button.

```jsx
import { InputSearch } from '@ulam/ube'

// Live search: fires onChange on every keystroke, no submit button
<InputSearch
  id="site-search"
  value={query}
  onChange={setQuery}
  liveSearch
  label="Search the site"
  clearAriaLabel="Clear search"
/>

// Submit mode: shows search icon submit button, fires onSubmit on Enter or click
<InputSearch
  id="site-search"
  value={query}
  onChange={setQuery}
  onSubmit={handleSearch}
  label="Search the site"
  clearAriaLabel="Clear search"
  submitAriaLabel="Search"
/>
```

Pair with `usePref` from `@ulam/calamansi` to persist the live/submit preference:

```jsx
import { usePref } from '@ulam/calamansi'

const [liveSearch, setLiveSearch] = usePref('liveSearch', true)
```

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | string | - | Input id |
| `value` | string | - | Controlled value (required) |
| `onChange` | function | - | `(value: string) => void` (required) |
| `onSubmit` | function | - | Called on Enter or submit button click |
| `onClear` | function | - | Called on clear; defaults to `onChange('')` |
| `liveSearch` | boolean | `false` | Fire `onSubmit` on every keystroke, hide submit button |
| `placeholder` | string | `'Search…'` | Input placeholder |
| `disabled` | boolean | `false` | Disabled state |
| `label` | string | - | `aria-label` on the form (use when no visible label) |
| `submitAriaLabel` | string | `'Search'` | `aria-label` for the submit icon button |
| `clearAriaLabel` | string | `'Clear'` | `aria-label` for the clear button |
| `inputRef` | ref | - | Forward ref to the input element |

---

### InputWithClear

Generic text input with a clear button. Use `SearchInput` for dedicated search fields. Use this for any other clearable input (filter fields, tag inputs, etc.).

```jsx
import { InputWithClear } from '@ulam/ube'

<InputWithClear
  id="filter"
  value={filter}
  onChange={setFilter}
  clearAriaLabel="Clear filter"
  wrapClassName="filter-wrap"
  inputClassName="filter-input"
  clearButtonClassName="filter-clear"
/>
```

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | string | - | Input id |
| `type` | string | `'text'` | Input type |
| `value` | string | - | Controlled value |
| `onChange` | function | - | `(value: string) => void` |
| `onClear` | function | - | Override clear behavior |
| `clearAriaLabel` | string | - | `aria-label` for clear button (required) |
| `clearIcon` | ReactNode | `'↺'` | Clear button icon |
| `wrapClassName` | string | `''` | Class on the wrapper div |
| `inputClassName` | string | `''` | Class on the input |
| `clearButtonClassName` | string | `''` | Class on the clear button |
| `inputRef` | ref | - | Forward ref to the input element |

---

### Badge

Semantic badge for severity levels, status, and counts. Supports click for interactive use.

```jsx
import { Badge } from '@ulam/ube'

<Badge variant="critical">Critical</Badge>
<Badge variant="high" prefix="SC">2.4.3</Badge>
<Badge variant="success" onClick={handleClick}>Clickable</Badge>
```

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `variant` | `'critical' \| 'high' \| 'medium' \| 'best-practice' \| 'info' \| 'success' \| 'warning' \| 'neutral'` | Color variant |
| `prefix` | string | Small prefix label inside the badge |
| `onClick` | function | Makes the badge a button |
| `bg` | string | Custom background color |
| `color` | string | Custom text color |

---

### InfoBox

Informational callout for tips, warnings, or supplemental content.

```jsx
import { InfoBox } from '@ulam/ube'

<InfoBox>This setting affects all platforms.</InfoBox>
```

---

### Panel

Detail panel with `useFocusOnMount` and `usePageTitle` built in. Use for routed detail panels.

```jsx
import { Panel } from '@ulam/ube'

<Panel heading="Finding Detail" onClose={onClose} closeAriaLabel="Close panel">
  {children}
</Panel>
```

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `heading` | string | Panel title |
| `onClose` | function | Close handler |
| `closeAriaLabel` | string | `aria-label` for close button |
| `children` | ReactNode | Panel body content |

---

### ButtonBack

RTL-aware back chevron button. Flips direction when `html[dir="rtl"]`.

```jsx
import { ButtonBack } from '@ulam/ube'

<ButtonBack onClick={onBack} label="Back to results" />
```

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `onClick` | function | Click handler |
| `label` | string | `aria-label` |

---

### NoResults

Empty state with illustration and message.

```jsx
import { NoResults } from '@ulam/ube'

<NoResults message="No results for this query." />
```

---

### DataError

Error state with retry action.

```jsx
import { DataError } from '@ulam/ube'

<DataError message="Failed to load data." onRetry={retryData} />
```

---

## Plugins

Ube works with two companion packages for live region announcements and routing. Both are part of the ulam framework and listed as optional peer dependencies.

### Announce

ARIA live region system from `@ulam/taho`. Call `announce()` from anywhere: no prop drilling, no context wiring.

```jsx
import { Announcer, announce, useAnnounce } from '@ulam/taho/react'

// Mount once at app root
<Announcer />

// Direct call from any module
announce('Settings: Saved')
announce('Error: Invalid key', { priority: 'assertive' })

// Hook style
const announce = useAnnounce()
announce('Copy: Copied to clipboard')
```

**Message format:** prefix with context: `"Settings: Saved"` not `"Saved"`. Bare messages are ambiguous to screen reader users who may miss where the message came from.

**Priority:**

- `'polite'` (default): waits for a natural pause. Use for confirmations, results, background changes.
- `'assertive'`: interrupts immediately. Use only for errors and urgent alerts.

**Do not announce:** focus-managed transitions (modals opening, page navigation). Screen readers announce focus targets automatically.

**Implementation:** two always-in-DOM live regions with auto-clearing after ~1 second. Duplicate messages re-announce reliably via clear-then-set cycle.

---

### Router

Hash-based routing with built-in focus management, RTL support, Escape handling, and page title updates. Comes from `@ulam/sili/react`.

```jsx
import { Router, useRouter, Drawer, Sheet, Modal } from '@ulam/sili/react'
import {
  useFocusOnMount, useReturnFocus, useFocusTrap,
  usePaginationFocus, useAriaHide, useDir,
  useMediaQuery, usePageTitle, useEscapeKey,
} from '@ulam/sili/react'

// Wrap app
<Router>
  <AppShell />
</Router>

// In components
const { route, navigate } = useRouter()
const dir = useDir()           // 'ltr' | 'rtl', reactive to html[dir]
const headingRef = useFocusOnMount()  // focus this element on mount
usePageTitle('Page Name')      // sets document.title = "AppName | Page Name"
```

**Components:**

- **`Router`**: context provider, wraps the app
- **`Modal`**: centered dialog, focus trap, Escape-to-dismiss, stacks at z-index 301
- **`Drawer`**: slide-in panel from left, focus management built in
- **`BottomSheet`**: slide-up sheet from bottom, focus management, desktop collapse

**Focus management hooks:**

| Hook | Description |
| ---- | ----------- |
| `useFocusOnMount(ref?)` | Move focus to element on mount (page headings, modal open) |
| `useReturnFocus()` | Restore focus to trigger element on unmount |
| `useFocusTrap(containerRef, active)` | Restrict Tab to container while active |
| `usePaginationFocus(headingRef, pageIndex)` | Re-focus heading on page change within a modal or sheet |
| `useAriaHide(panelRef, active)` | Set `inert` on background content while overlay is open |
| `useEscapeKey(handler, active)` | Call handler when Escape is pressed |

**Layout hooks:**

| Hook | Description |
| ---- | ----------- |
| `useDir()` | Reactive `document.documentElement.dir`: `'ltr'` or `'rtl'` |
| `useMediaQuery(query)` | Reactive `window.matchMedia` |
| `usePageTitle(title)` | Sets `document.title` to `"AppName \| title"` |

**Focus rules (WCAG 2.4.3):**

1. New page: focus the main heading (`tabIndex={-1}`)
2. Modal open: focus first focusable element (usually close button)
3. Modal close: restore focus to trigger (`useReturnFocus`)
4. Overlay open: set background inert (`useAriaHide`, overlays do this automatically)
5. Escape: each overlay layer handles its own
6. Paginated content: use `usePaginationFocus` on page change
7. Accordion: leave focus on trigger, do not use `useFocusOnMount` on content

---

### Theme

Dark, light, auto, and fiesta modes as first-class features.

```jsx
import { useThemeManager } from '@ulam/ube'

useThemeManager(theme, onFiestaActivated)
```

Sets `data-theme` on `<html>` and handles fiesta mode color cycling. All ube components respond to `[data-theme="dark"]` automatically via CSS tokens.

---

## CSS Usage

### Foundational stylesheets

Ube's CSS is split into foundational and component-specific layers for better tree-shaking:

**Foundational imports** (required, load once):

```css
@import '@ulam/ube/base-tokens.css';     /* Primitives: colors, spacing, typography, motion, sizing */
@import '@ulam/ube/base-typography.css'; /* Body text, headings, links, selection, monospace baseline */
@import '@ulam/ube/base-reset.css';      /* Normalize + ube defaults (imported by ui.css) */
@import '@ulam/ube/base-utils.css';      /* Focus rings, aria-disabled state, visually-hidden (imported by ui.css) */
@import '@ulam/ube/ui.css';              /* Shorthand: loads base-reset, base-utils, base-user-prefs, base-print */
```

Or simply:

```jsx
import '@ulam/ube/base-tokens.css'
import '@ulam/ube/base-typography.css'
import '@ulam/ube/ui.css'
```

### Component CSS

Each component imports its own CSS automatically. No additional imports needed:

```jsx
import { ButtonText } from '@ulam/ube'  // buttons.css imported automatically
import { ControlRadio } from '@ulam/ube' // form-control-radio.css imported automatically
```

Unused components are completely removed from production bundles, including their CSS.

### Theming

Override any CSS custom property to retheme. All components respond to token changes immediately:

```css
:root {
  --bg: #fafaf9;
  --text-heading: #1c1917;
  --accent: #7c3aed;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1c1917;
    --text-heading: #fafaf9;
    --accent: #a78bfa;
  }
}
```

Dark mode is built-in. Use `[data-theme="dark"]` to explicitly set theme without relying on system preference.

### Print styles

Modal, drawer, and sheet overlays are hidden on print. Content flows naturally. No additional configuration needed—included in `base-print.css` (via `ui.css`).

### Reduced motion

All animations and transitions respect `prefers-reduced-motion: reduce`. No opt-in needed.

---

## Design tokens

All components consume CSS custom properties. Override any token to retheme without touching component code.

Tokens are organized into two layers:

- **Foundational tokens** (`base-tokens.css`): Global design primitives (colors, typography families, spacing scale, sizing, motion, focus)
- **Component tokens**: Component-specific tokens defined at the top of each component's CSS file (e.g., badge colors, button icons, form control sizing)

This organization enables better tree-shaking: component tokens are removed if the component is unused.

### Foundational color tokens

| Token | Description |
| ----- | ----------- |
| `--bg` | Page background |
| `--bg-subtle` | Slightly off-background (cards, panels) |
| `--text-heading` | Primary text (headings, labels) |
| `--text-body` | Body text (default paragraph text) |
| `--text-muted` | Secondary / placeholder text |
| `--text-disabled` | Disabled text (intentionally low contrast per WCAG 1.4.3) |
| `--border` | Default border |
| `--border-control` | Form control border (≥4.6:1 contrast for enabled controls) |
| `--accent` | Primary accent (purple) |
| `--accent-bg` | Accent background |
| `--accent-text` | Text on accent background |
| `--focus` | Focus outline color (≥3:1 against all surfaces) |
| `--success` | Success state |
| `--error` | Error / warning state |
| `--overlay-bg` | Modal/overlay backdrop |

**Sizing tokens:**

| Token | Value | Description |
| ----- | ----- | ----------- |
| `--touch-target` | `44px` | Minimum touch target (WCAG 2.5.5) |
| `--input-height` | `4rem` | Standard input/select height |
| `--btn-height-standard` | `44px` | Standard button height |
| `--btn-height-compact` | `44px` | Compact button height |

**Spacing scale (`--space-N`):** `1=0.25rem`, `2=0.5rem`, `3=0.75rem`, `4=1rem`, `5=1.25rem`, `6=1.5rem`, `8=2rem`, `10=2.5rem`

**Typography:**

| Token | Size | Description |
| ----- | ---- | ----------- |
| `--font` | — | Body font stack (Inter) |
| `--font-display` | — | Display font stack (Outfit) |
| `--mono` | — | Monospace font stack |
| `--fs-small` | 0.875rem (14px) | Metadata, labels, fine print (minimum) |
| `--fs-body` | 1rem (16px) | Body text, inputs, button text |
| `--fs-sub` | 1.25rem (20px) | Card headings, slightly emphasized text |
| `--fs-heading` | 1.5rem (24px) | Section headings (h3 inside panels) |
| `--fs-h2` | clamp(1.5rem, 8vw, 2.25rem) | Panel titles (h2), scales up on desktop |
| `--fs-h1` | clamp(1.75rem, 10.5vw, 2.667rem) | Page title, scales up on desktop |

**Motion:**

| Token | Value | Description |
| ----- | ----- | ----------- |
| `--duration-fast` | `150ms` | Micro-interactions (color, border) |
| `--duration-base` | `250ms` | Standard transitions (panel, element) |
| `--ease-out` | cubic-bezier(...) | Spring-y easing (slides entering) |
| `--ease-in-out` | cubic-bezier(...) | Balanced easing (state toggles) |

**Focus:**

| Token | Value | Description |
| ----- | ----- | ----------- |
| `--focus-outline-width` | `2px` | Keyboard focus outline width |
| `--focus-outline-offset` | `2px` | Keyboard focus outline offset |

**Component-specific tokens** are defined at the top of their respective CSS files (e.g., `badge.css`, `buttons.css`, `form-control-toggle.css`) for scope and tree-shaking.

---

## Subpath exports

### Components and utilities

| Import | Contents |
| ------ | -------- |
| `@ulam/ube` | `ButtonText`, `ButtonIcon`, `ButtonBack`, `LinkBtnStyled`, `LinkSkipTo`, `Toggle`, `ControlRadioChip`, `ControlRadioChipGroup`, `ControlRadio`, `ControlCheckbox`, `Select`, `InputSearch`, `InputWithClear`, `Badge`, `InfoBox`, `Panel`, `PanelRowControl`, `NoResults`, `DataError`, `FadeTransition`, `IconExternalLink`, `useThemeManager` |

Announce comes from `@ulam/taho/react`. Routing and overlays come from `@ulam/sili/react`.

### Stylesheets

| Import | Purpose |
| ------ | ------- |
| `@ulam/ube/base-tokens.css` | Global design token primitives (colors, spacing, typography families, sizing, motion) |
| `@ulam/ube/base-typography.css` | Body text, headings, links, selection, monospace styling |
| `@ulam/ube/base-reset.css` | Normalize + ube-specific reset rules |
| `@ulam/ube/base-utils.css` | Focus rings, aria-disabled state, visually-hidden utilities |
| `@ulam/ube/base-user-prefs.css` | User preference media queries (reduced motion, prefers-color-scheme) |
| `@ulam/ube/base-print.css` | Print stylesheet (overlay hiding, content flow) |
| `@ulam/ube/ui.css` | Shorthand: imports all `base-*.css` files |
| `@ulam/ube/theme-fiesta.css` | Fiesta theme color cycling (optional, load after `ui.css`) |

Component stylesheets (e.g., `buttons.css`, `form-control-toggle.css`) are imported automatically by their components—no manual import needed.

---

## Design principles

**Accessible by default.** Every component meets WCAG 2.2 AA. Keyboard navigation, focus management, and screen reader semantics are built in, not bolted on.

**Token-driven.** No hardcoded colors, sizes, or spacing in component code. Change a token, retheme everything.

**Touch-safe.** 44px minimum touch targets on all interactive elements (WCAG 2.5.5).

**Motion-respectful.** All animations and transitions are suppressed under `prefers-reduced-motion: reduce`.

**RTL-aware.** Direction-sensitive components (`ButtonBack`, overlays, layout) respond to `html[dir="rtl"]` automatically.

**Zero opinion on data.** Components accept props and call handlers. No built-in state management, no assumptions about routing libraries (beyond the included router plugin), no opinions about where your data lives.

---

## Roadmap

Planned improvements to the @ulam/ube library:

- [ ] **useAriaDisabled hook documentation + examples** `[a11y]` — Document the `aria-disabled` accessibility pattern extracted during a11yfred development. Usage: preventing Space/Enter activation while keeping disabled controls keyboard-focusable and in tab order. Includes reference implementations (Select and Toggle components) and keyboard focus outline requirements for WCAG 2.4.11 compliance.

- [ ] **Heading levels and styles abstraction** `[design]` — Create a utility component or helper hook that decouples semantic heading levels (h1–h6) from visual styles (display, body, sub, etc.). Example: `<HeadingText level={2} style="display">Title</HeadingText>` renders an `<h2>` with large display-style text. Reduces cognitive load in apps where heading hierarchy doesn't match visual prominence.

---

## License

MIT
