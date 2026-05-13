import { Injectable } from '@angular/core'
import { trapFocus, getFocusable } from '../core/focusTrap.js'

/**
 * Service for programmatic focus trap management.
 * For declarative use, prefer the FocusTrapDirective instead.
 */
@Injectable({ providedIn: 'root' })
export class FocusTrapService {
  trap(element) {
    return trapFocus(element)
  }

  getFocusable(element) {
    return getFocusable(element)
  }
}
