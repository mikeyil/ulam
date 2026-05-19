import { Injectable } from '@angular/core'
import { hideBackground } from '../core/ariaHide.js'

/**
 * Hides all document.body children from the a11y tree while an overlay is open.
 * Returns a cleanup function to restore aria state.
 *
 * Usage:
 *   const restore = this.ariaHide.hide(this.panelEl.nativeElement)
 *   // later:
 *   restore()
 */
@Injectable({ providedIn: 'root' })
export class AriaHideService {
  hide(panelElement) {
    return hideBackground(panelElement)
  }
}
