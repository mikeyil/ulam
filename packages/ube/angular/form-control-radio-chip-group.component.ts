import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-form-control-radio-chip-group',
  template: `<ube-form-control-radio-chip-group
    #el
    [attr.legend]="legend"
    [attr.name]="name"
    [attr.value]="value"
    [attr.options]="JSON.stringify(options)"
    (change)="change.emit($event.detail.value)"
  ></ube-form-control-radio-chip-group>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormControlRadioChipGroupComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() legend?: string
  @Input() name?: string
  @Input() value?: string
  @Input() options: any[] = []
  @Output() change = new EventEmitter<string>()
}
