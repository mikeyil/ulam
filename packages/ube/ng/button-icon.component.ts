import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-button-icon',
  template: `<ube-button-icon
    #el
    [attr.variant]="variant"
    [attr.disabled]="disabled"
    [attr.label]="label"
    [attr.title]="title"
    (click)="click.emit($event)"
  ></ube-button-icon>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonIconComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() variant?: string
  @Input() disabled = false
  @Input() label?: string
  @Input() title?: string
  @Input() set icon(val: any) {
    if (this.el) {
      this.el.nativeElement.icon = val
    }
  }
  @Output() click = new EventEmitter<any>()

  focus() {
    this.el?.nativeElement?.focus()
  }
}
