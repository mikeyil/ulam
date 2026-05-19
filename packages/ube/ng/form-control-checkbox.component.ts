import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-form-control-checkbox',
  template: `<ube-form-control-checkbox
    #el
    [attr.value]="value"
    [attr.label]="label"
    [attr.checked]="checked"
    [attr.disabled]="disabled"
    (change)="checkedChange.emit($event.target.checked)"
  ></ube-form-control-checkbox>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormControlCheckboxComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() value?: string
  @Input() label?: string
  @Input() checked = false
  @Input() disabled = false
  @Output() checkedChange = new EventEmitter<boolean>()
}
