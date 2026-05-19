import { Directive, ElementRef, Input, OnChanges, OnDestroy } from '@angular/core'
import { trapFocus } from '../core/focusTrap.js'

/**
 * Restricts Tab / Shift+Tab to the host element while [siliTrapFocus]="true".
 *
 * Usage:
 *   <div [siliTrapFocus]="isOpen">...</div>
 */
@Directive({ selector: '[siliTrapFocus]', standalone: true })
export class FocusTrapDirective {
  @Input('siliTrapFocus') active = false

  #cleanup = null

  constructor(private el) {}

  ngOnChanges() {
    if (this.#cleanup) { this.#cleanup(); this.#cleanup = null }
    if (this.active) this.#cleanup = trapFocus(this.el.nativeElement)
  }

  ngOnDestroy() {
    if (this.#cleanup) this.#cleanup()
  }
}
