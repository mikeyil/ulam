import { Injectable } from '@angular/core'
import { onEscapeKey } from '../core/escapeKey.js'

/**
 * Registers a document-level Escape key handler.
 * Returns a cleanup function to remove the listener.
 *
 * Usage:
 *   const off = this.escapeKey.listen(() => this.close())
 *   // later:
 *   off()
 */
@Injectable({ providedIn: 'root' })
export class EscapeKeyService {
  listen(handler, options) {
    return onEscapeKey(handler, options)
  }
}
