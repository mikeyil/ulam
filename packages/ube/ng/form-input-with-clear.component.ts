import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-form-input-with-clear',
  template: `<ube-form-input-with-clear
    #el
    [attr.value]="value"
    [attr.placeholder]="placeholder"
    [attr.disabled]="disabled"
    (change)="valueChange.emit($event.target.value)"
    (clear)="clear.emit()"
  ></ube-form-input-with-clear>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormInputWithClearComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() value?: string
  @Input() placeholder?: string
  @Input() disabled = false
  @Output() valueChange = new EventEmitter<string>()
  @Output() clear = new EventEmitter<void>()
}
