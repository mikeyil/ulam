import { announce } from '../core/index.js'

/**
 * Returns the announce() function. Use inside Vue components when you prefer
 * composable-style imports. Direct import from '@ulam/taho' is also fine.
 *
 * Both of these are equivalent:
 *
 *   // composable style (inside setup())
 *   const announce = useAnnounce()
 *   announce('Settings: Saved')
 *
 *   // direct import (anywhere)
 *   import { announce } from '@ulam/taho'
 *   announce('Settings: Saved')
 */
export function useAnnounce() {
  return announce
}
