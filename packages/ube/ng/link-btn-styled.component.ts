import { Component, Input, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-link-btn-styled',
  template: `<ube-link-btn-styled
    #el
    [attr.variant]="variant"
    [attr.href]="href"
    [attr.target]="target"
    [attr.rel]="rel"
    [attr.title]="title"
  ><ng-content></ng-content></ube-link-btn-styled>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LinkBtnStyledComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() variant?: string
  @Input() href?: string
  @Input() target?: string
  @Input() rel?: string
  @Input() title?: string
}
