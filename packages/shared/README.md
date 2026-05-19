# @ulam/shared

Shared utilities for internal ulam packages.

**Status**: Stable ✅  
**Version**: 0.3.1

## Purpose & Scope

Internal utilities package used across ulam packages to reduce code duplication. Not intended for external consumption.

## Exports

### useSubscribe

React hook for subscribing to external stores or observable patterns.

```javascript
import { useSubscribe } from '@ulam/shared/useSubscribe'

function MyComponent() {
  // Subscribe to calamansi locale changes
  const locale = useSubscribe(
    (callback) => i18n.subscribe(callback),
    () => i18n.getLocale()
  )

  return <p>Current locale: {locale}</p>
}
```

**Signature**:

```typescript
function useSubscribe<T>(
  subscribe: (callback: (value: T) => void) => () => void,
  getInitial: () => T
): T
```

**Parameters**:

- `subscribe`: Function that takes a callback and returns an unsubscribe function
- `getInitial`: Function that returns the initial value

**Returns**: Current value from the subscription

**Cleanup**: Automatically unsubscribes when component unmounts

## Internal Usage

Used by:

- `@ulam/calamansi/react` — useT() hook
- Other framework adapters with subscription patterns

## Contributing

This package is for internal use only. Changes should be coordinated with packages that depend on it.
