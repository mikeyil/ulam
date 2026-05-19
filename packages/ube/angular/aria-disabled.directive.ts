import { Directive, Input, ElementRef, OnDestroy, OnInit } from '@angular/core'
import { setAriaDisabled } from '../core/ariaDisabled.js'

/**
 * Angular directive for managing aria-disabled on any element.
 * Useful for custom controls (links, buttons, custom web components).
 *
 * Usage:
 *   <button [ubeAriaDisabled]="disabled">Click me</button>
 *   <a [ubeAriaDisabled]="isDisabled">Link</a>
 *
 * @example
 *   <button [ubeAriaDisabled]="true">Disabled</button>
 *   <button [ubeAriaDisabled]="false">Enabled</button>
 */
@Directive({
  selector: '[ubeAriaDisabled]',
  standalone: true,
})
export class UbeAriaDisabledDirective implements OnInit, OnDestroy {
  private disabled = false

  @Input()
  set ubeAriaDisabled(value: boolean) {
    this.disabled = value
    if (this.initialized) {
      this.applyDisabled()
    }
  }

  private initialized = false

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.initialized = true
    this.applyDisabled()
  }

  ngOnDestroy(): void {
    // Ensure cleanup happens
    if (this.disabled) {
      this.applyDisabled()
    }
  }

  private applyDisabled(): void {
    try {
      setAriaDisabled(this.el.nativeElement, this.disabled)
    } catch (error) {
      console.warn('ubeAriaDisabled: Element is not a valid control', this.el.nativeElement)
    }
  }
}
