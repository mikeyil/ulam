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

## Vue Composables

Use Vue composables for keyboard navigation in Vue 3 apps.

### `useKeydown(handler, opts)`

Attach a keydown listener with Vue lifecycle management.

```javascript
import { useKeydown } from '@ulam/sili/vue'
import { ref } from 'vue'

export default {
  setup() {
    const listRef = ref(null)
    const handleKeyDown = (e) => {
      if (e.key === 'j') focusNext()
    }
    useKeydown(handleKeyDown, { target: listRef })
    return { listRef }
  }
}
```

### `useListNavigation(config)`

High-level composable for vim-style list navigation.

```javascript
import { useListNavigation } from '@ulam/sili/vue'
import { ref } from 'vue'

export default {
  setup() {
    const listRef = ref(null)
    const itemRefs = ref({})
    const results = ref([...])

    useListNavigation({
      target: listRef,
      items: results,
      itemRefs: itemRefs.value,
      commands: {
        'j': (item, idx) => { focusNext() },
        'k': (item, idx) => { focusPrev() },
        's': (item, idx) => { toggleStar(item.id) }
      }
    })

    return { listRef, itemRefs, results }
  }
}
```

### `usePrefersReducedMotion()`

Reactive composable for prefers-reduced-motion.

```javascript
import { usePrefersReducedMotion } from '@ulam/sili/vue'

export default {
  setup() {
    const prefersReducedMotion = usePrefersReducedMotion()
    return { prefersReducedMotion }
  }
}

<div :style="{ transition: prefersReducedMotion ? 'none' : 'opacity 300ms' }">
  Content
</div>
```

### `useFlipList()`

FLIP animation composable for list reordering.

```javascript
import { useFlipList } from '@ulam/sili/vue'
import { ref } from 'vue'

export default {
  setup() {
    const { listRef, snapshotPositions } = useFlipList()
    const results = ref([])

    const handleSort = (newSort) => {
      snapshotPositions()
      results.value = newSort
    }

    return { listRef, results, handleSort }
  }
}
```

---

## Angular Services & Directives

Use Angular services for dependency injection or the standalone directive for simple cases.

### `KeyboardService`

Injectable service for keyboard event management.

```typescript
import { KeyboardService } from '@ulam/sili/angular'

@Component({...})
export class ResultsComponent {
  constructor(private keyboard: KeyboardService) {}

  ngAfterViewInit() {
    const cleanup = this.keyboard.onKeydown(
      this.listEl.nativeElement,
      (e) => {
        if (e.key === 'j') this.focusNext()
      }
    )
    // Cleanup will occur on component destroy
  }
}
```

### `AnimationService`

Injectable service for FLIP animations.

```typescript
import { AnimationService } from '@ulam/sili/angular'

@Component({...})
export class ResultsComponent {
  constructor(private animation: AnimationService) {}

  handleSort() {
    this.animation.snapshotFlipPositions(this.listEl.nativeElement)
    this.results = newSort  // Change detection occurs
    this.animation.animateFlipList(this.listEl.nativeElement)
  }
}
```

### `ListNavigationDirective`

Standalone directive for keyboard navigation on list elements.

```typescript
import { ListNavigationDirective } from '@ulam/sili/angular'

@Component({
  selector: 'app-results',
  imports: [ListNavigationDirective],
  template: `
    <ul [appListNavigation]="navigationConfig">
      <li *ngFor="let item of items" [attr.data-list-id]="item.id" tabindex="0">
        {{ item.title }}
      </li>
    </ul>
  `
})
export class ResultsComponent {
  items = [...]
  navigationConfig = {
    commands: {
      'j': () => this.focusNext(),
      'k': () => this.focusPrev(),
      's': () => this.toggleStar()
    }
  }
}
```

---

## Remix

Remix uses React, so import React hooks from `@ulam/sili/remix`:

```typescript
import { useKeydown, useListNavigation, usePrefersReducedMotion, useFlipList } from '@ulam/sili/remix'
import { useRef, useCallback } from 'react'

export default function Results() {
  const listRef = useRef(null)
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'j') focusNext()
  }, [])

  useKeydown(handleKeyDown, { target: listRef })

  return <ul ref={listRef}>{/* results */}</ul>
}
```

Vanilla core utilities also available:

```typescript
import { onKeydown, dispatchKeyCommand, prefersReducedMotion, snapshotFlipPositions, animateFlipList } from '@ulam/sili/remix'
```

---

## Framework Adapters Summary

All frameworks follow the same vanilla core → framework-specific lifecycle pattern:

| Framework | Import Path | Hook/Service Type | Lifecycle |
|-----------|-------------|-------------------|-----------|
| **Vanilla** | `@ulam/sili` | Direct function calls | Manual cleanup |
| **React** | `@ulam/sili/react` | Hooks (useEffect) | Automatic cleanup on unmount |
| **Remix** | `@ulam/sili/remix` | React hooks + vanilla | Same as React |
| **Vue** | `@ulam/sili/vue` | Composables (onMounted/onUnmounted) | Automatic cleanup on unmount |
| **Angular** | `@ulam/sili/angular` | Services + Directives | Injectable or standalone |

For vanilla JS, import directly from `@ulam/sili`:

```javascript
import { onKeydown, dispatchKeyCommand, prefersReducedMotion } from '@ulam/sili'
```
