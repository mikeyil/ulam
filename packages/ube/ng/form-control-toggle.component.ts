import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-form-control-toggle',
  template: `<ube-form-control-toggle
    #el
    [attr.checked]="checked"
    [attr.disabled]="disabled"
    [attr.label]="label"
    (change)="checkedChange.emit($event.target.checked)"
  ></ube-form-control-toggle>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormControlToggleComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() checked = false
  @Input() disabled = false
  @Input() label?: string
  @Output() checkedChange = new EventEmitter<boolean>()
}
