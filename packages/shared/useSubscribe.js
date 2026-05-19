import { useState, useEffect } from 'react'

/**
 * React hook for subscribing to an external store or observable pattern.
 * Automatically unsubscribes when component unmounts.
 *
 * @param {(callback: (value: T) => void) => (() => void)} subscribe
 *   Function that takes a callback and returns an unsubscribe function
 * @param {() => T} getInitial
 *   Function that returns the initial value
 * @returns {T} Current value from the subscription
 *
 * @example
 * // With custom observable
 * const locale = useSubscribe(
 *   (cb) => i18n.subscribe(cb),
 *   () => i18n.getLocale()
 * )
 *
 * @example
 * // With a simple value store
 * const config = useSubscribe(
 *   (cb) => store.subscribe('config', cb),
 *   () => store.getConfig()
 * )
 */
export function useSubscribe(subscribe, getInitial) {
  const [value, setValue] = useState(getInitial)

  useEffect(() => {
    const unsubscribe = subscribe(setValue)
    return unsubscribe
  }, [subscribe])

  return value
}
