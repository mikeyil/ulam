import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

/**
 * Angular adapter for <ube-badge>
 * Wraps vanilla web component with Angular property bindings and event handling
 */
@Component({
  selector: 'ube-badge',
  template: `<ube-badge
    #el
    [attr.variant]="variant"
    [attr.is-button]="isButton"
    (click)="click.emit($event)"
  ><ng-content></ng-content></ube-badge>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BadgeComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() variant?: string
  @Input() isButton = false
  @Input() set bgColor(val: string | undefined) {
    if (this.el && val) {
      this.el.nativeElement.style.setProperty('--badge-bg', val)
    }
  }
  @Input() set textColor(val: string | undefined) {
    if (this.el && val) {
      this.el.nativeElement.style.setProperty('--badge-color', val)
    }
  }
  @Output() click = new EventEmitter<any>()
}
