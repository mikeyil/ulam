# Keyboard Navigation & Shortcuts

@ulam/sili now includes vanilla keyboard event handling and list navigation utilities, with React hooks adapters.

## Vanilla Core

Use these utilities in vanilla JS, or as the foundation for other framework adapters.

### `onKeydown(target, handler, opts)`

Attach a keydown listener to an element and return a cleanup function.

```javascript
import { onKeydown } from '@ulam/sili'

const cleanup = onKeydown(document.querySelector('.list'), (e) => {
  if (e.key === 'j') focusNext()
  if (e.key === 'k') focusPrev()
})

// Later:
cleanup()
```

### `dispatchKeyCommand(event, commands, opts)`

Generic key command dispatcher. Maps key names to handler functions.

```javascript
import { dispatchKeyCommand } from '@ulam/sili'

document.addEventListener('keydown', (e) => {
  dispatchKeyCommand(e, {
    'j': () => focusNext(),
    'k': () => focusPrev(),
    's': () => toggleStar(),
    'Shift+ArrowUp': () => rankUp(),
    'Shift+ArrowDown': () => rankDown(),
  }, { skipWhenFocusedOn: 'input[type="search"]' })
})
```

### `prefersReducedMotion()`

Check if user has enabled reduced motion preference.

```javascript
import { prefersReducedMotion } from '@ulam/sili'

if (!prefersReducedMotion()) {
  el.style.transition = 'opacity 300ms'
}
```

### `onPrefersReducedMotionChange(callback)`

Watch for changes to prefers-reduced-motion preference.

```javascript
import { onPrefersReducedMotionChange } from '@ulam/sili'

const cleanup = onPrefersReducedMotionChange(({ matches }) => {
  console.log('reduced motion:', matches)
})

cleanup()
```

### `snapshotFlipPositions(listEl)`

Capture current positions of list items before a re-sort.

```javascript
import { snapshotFlipPositions, animateFlipList } from '@ulam/sili'

const snapshot = snapshotFlipPositions(ul)
setSorted(newOrder)  // trigger re-sort
// after layout:
animateFlipList(ul, snapshot)
```

### `animateFlipList(listEl, snapshot, opts)`

Animate items from old positions to new positions using FLIP technique.

```javascript
import { animateFlipList } from '@ulam/sili'

animateFlipList(ul, snapshot, {
  duration: 320,  // ms
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
})
```

---

## React Hooks

React-specific hooks built on the vanilla core.

### `useKeydown(handler, opts)`

Attach a keydown listener to a target element (or document) with automatic cleanup.

```javascript
import { useKeydown } from '@ulam/sili/react'

const listRef = useRef(null)
const handleKeyDown = useCallback((e) => {
  if (e.key === 'j') focusNext()
}, [])

useKeydown(handleKeyDown, { target: listRef })
```

### `useListNavigation(listRef, config)`

High-level hook for keyboard navigation in focusable list items.

Provides vim-style j/k navigation, custom action shortcuts, and smart context awareness.

```javascript
import { useListNavigation } from '@ulam/sili/react'

const listRef = useRef(null)
const itemRefs = useRef({})

useListNavigation(listRef, {
  items: displayResults,
  itemRefs: itemRefs.current,
  commands: {
    'j': (item, idx) => focusNext(),
    'k': (item, idx) => focusPrev(),
    's': (item, idx) => toggleStar(item.id),
    'e': (item, idx) => toggleArchive(item.id),
    'Shift+ArrowUp': (item, idx) => rankUp(item.id),
    'Shift+ArrowDown': (item, idx) => rankDown(item.id),
  },
  skipWhenFocusedOn: 'input[type="search"]'
})

return (
  <ul ref={listRef}>
    {displayResults.map(item => (
      <li
        key={item.id}
        ref={el => { itemRefs.current[item.id] = el }}
        tabIndex={0}
      >
        {item.title}
      </li>
    ))}
  </ul>
)
```

### `usePrefersReducedMotion()`

Reactive hook for prefers-reduced-motion media query.

```javascript
import { usePrefersReducedMotion } from '@ulam/sili/react'

export default function MyAnimation() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div style={{
      transition: prefersReducedMotion ? 'none' : 'opacity 300ms'
    }}>
      Content
    </div>
  )
}
```

### `useFlipList()`

React hook for FLIP list reordering animations.

```javascript
import { useFlipList } from '@ulam/sili/react'

export default function ResultsList() {
  const { listRef, snapshotPositions } = useFlipList()
  const [results, setResults] = useState([])

  const handleSort = (newSort) => {
    snapshotPositions()  // capture current positions
    setResults(sorted)   // trigger re-render
    // hook automatically animates items to new positions
  }

  return <ul ref={listRef}>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
}
```

---

## Framework Adapters

Currently implemented:

- **React** (`@ulam/sili/react`) — full implementation via hooks
- **Remix** (`@ulam/sili/remix`) — uses React hooks
- **Vue** (planned)
- **Angular** (planned)

For vanilla JS, import directly from `@ulam/sili`:

```javascript
import { onKeydown, dispatchKeyCommand, prefersReducedMotion } from '@ulam/sili'
```
