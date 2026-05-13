import { Directive, ElementRef, AfterViewInit } from '@angular/core'

/**
 * Focuses the host element after view init. Attach to any element with
 * tabindex="-1" to move focus programmatically on mount (WCAG 2.4.3).
 *
 * Usage:
 *   <h1 siliFocusOnMount tabindex="-1">Page Title</h1>
 */
@Directive({ selector: '[siliFocusOnMount]', standalone: true })
export class FocusOnMountDirective {
  constructor(private el) {}

  ngAfterViewInit() {
    this.el.nativeElement.focus()
  }
}
