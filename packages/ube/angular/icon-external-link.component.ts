import { Component, Input, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-icon-external-link',
  template: `<ube-icon-external-link
    #el
    [attr.size]="size"
  ></ube-icon-external-link>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconExternalLinkComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() size?: string
}
