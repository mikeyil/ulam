import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-form-control-select',
  template: `<ube-form-control-select
    #el
    [attr.disabled]="disabled"
    (change)="valueChange.emit($event.target.value)"
  ><ng-content></ng-content></ube-form-control-select>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormControlSelectComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() disabled = false
  @Input() value?: string
  @Output() valueChange = new EventEmitter<string>()
}
