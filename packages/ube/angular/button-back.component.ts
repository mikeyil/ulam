import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-button-back',
  template: `<ube-button-back
    #el
    [attr.disabled]="disabled"
    [attr.label]="label"
    [attr.title]="title"
    (click)="click.emit($event)"
  ></ube-button-back>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonBackComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() disabled = false
  @Input() label?: string
  @Input() title?: string
  @Output() click = new EventEmitter<any>()

  focus() {
    this.el?.nativeElement?.focus()
  }
}
