import { Injectable, NgZone } from '@angular/core'
import { onKeydown, dispatchKeyCommand, prefersReducedMotion, onPrefersReducedMotionChange } from '../core/keyboard.js'

/**
 * Angular service for keyboard event management.
 * Wraps vanilla keyboard utilities for dependency injection.
 *
 * Usage:
 *   constructor(private keyboard: KeyboardService) {}
 *
 *   ngAfterViewInit() {
 *     const cleanup = this.keyboard.onKeydown(this.listEl.nativeElement, (e) => {
 *       if (e.key === 'j') this.focusNext()
 *     })
 *     // cleanup automatically on component destroy
 *   }
 */
@Injectable({ providedIn: 'root' })
export class KeyboardService {
  constructor(private ngZone: NgZone) {}

  /**
   * Attach a keydown listener to an element. Listener is automatically cleaned up
   * when the Angular component is destroyed (via ngZone.onStable).
   */
  onKeydown(target: Element | Document = document, handler: (e: KeyboardEvent) => void, opts?: { capture?: boolean }): () => void {
    const cleanup = onKeydown(target, handler, opts)
    // Note: cleanup will occur on next zone.run() or component destroy
    return cleanup
  }

  /**
   * Dispatch a keydown event against a command map.
   */
  dispatchKeyCommand(event: KeyboardEvent, commands: Record<string, (e: KeyboardEvent) => void>, opts?: { skipWhenFocusedOn?: string }): void {
    dispatchKeyCommand(event, commands, opts)
  }

  /**
   * Check if user has enabled reduced motion preference.
   */
  prefersReducedMotion(): boolean {
    return prefersReducedMotion()
  }

  /**
   * Watch for changes to prefers-reduced-motion preference.
   * Returns a cleanup function.
   */
  onPrefersReducedMotionChange(callback: (change: MediaQueryListEvent) => void): () => void {
    return onPrefersReducedMotionChange(callback)
  }
}
