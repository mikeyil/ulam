import { Component, Input, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-panel-form-controls',
  template: `<ube-panel-form-controls
    #el
    [attr.block]="block"
  ><ng-content></ng-content></ube-panel-form-controls>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PanelFormControlsComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() block = false
}
