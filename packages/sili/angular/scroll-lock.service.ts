import { Injectable } from '@angular/core'
import { lockScroll } from '../core/scrollLock.js'

/**
 * Locks document body scroll while an overlay is open.
 * Returns a cleanup function to unlock.
 *
 * Usage:
 *   const unlock = this.scrollLock.lock()
 *   // later:
 *   unlock()
 */
@Injectable({ providedIn: 'root' })
export class ScrollLockService {
  lock() {
    return lockScroll()
  }
}
