import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-form-control-radio-chip',
  template: `<ube-form-control-radio-chip
    #el
    [attr.name]="name"
    [attr.value]="value"
    [attr.label]="label"
    [attr.current]="current"
    [attr.disabled]="disabled ? 'true' : 'false'"
    (change)="change.emit($event.detail.value)"
  ></ube-form-control-radio-chip>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormControlRadioChipComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() name?: string
  @Input() value?: string
  @Input() label?: string
  @Input() current?: string
  @Input() disabled = false
  @Output() change = new EventEmitter<string>()
}
