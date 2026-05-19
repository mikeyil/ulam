import { Component, Input, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-link-skip-to',
  template: `<ube-link-skip-to
    #el
    [attr.href]="href"
    [attr.label]="label"
    [attr.show-icon]="showIcon"
  ></ube-link-skip-to>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LinkSkipToComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() href?: string
  @Input() label?: string
  @Input() showIcon = false
}
