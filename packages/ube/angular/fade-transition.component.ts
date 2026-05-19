import { Component, Input, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-fade-transition',
  template: `<ube-fade-transition
    #el
    [attr.watch-key]="String(watchKey)"
    [attr.direction]="direction"
  ><ng-content></ng-content></ube-fade-transition>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FadeTransitionComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() watchKey?: string | number
  @Input() direction?: string
}
