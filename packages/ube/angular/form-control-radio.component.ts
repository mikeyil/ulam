import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-form-control-radio',
  template: `<ube-form-control-radio
    #el
    [attr.name]="name"
    [attr.value]="value"
    [attr.label]="label"
    [attr.checked]="checked"
    [attr.disabled]="disabled"
    (change)="checkedChange.emit($event.target.checked)"
  ></ube-form-control-radio>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormControlRadioComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() name?: string
  @Input() value?: string
  @Input() label?: string
  @Input() checked = false
  @Input() disabled = false
  @Output() checkedChange = new EventEmitter<boolean>()
}
