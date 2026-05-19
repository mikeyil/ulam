import { Component, Input, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-info-box',
  template: `<ube-info-box
    #el
    [attr.label]="label"
  ><ng-content></ng-content></ube-info-box>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InfoBoxComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() label?: string
}
