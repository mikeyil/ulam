import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-form-input-search',
  template: `<ube-form-input-search
    #el
    [attr.value]="value"
    [attr.placeholder]="placeholder"
    [attr.disabled]="disabled"
    [attr.live-search]="liveSearch"
    (change)="valueChange.emit($event.target.value)"
    (search)="search.emit($event.detail.value)"
    (clear)="clear.emit()"
  ></ube-form-input-search>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormInputSearchComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() value?: string
  @Input() placeholder?: string
  @Input() disabled = false
  @Input() liveSearch = false
  @Output() valueChange = new EventEmitter<string>()
  @Output() search = new EventEmitter<string>()
  @Output() clear = new EventEmitter<void>()
}
