import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import '@ulam/ube/core'

@Component({
  selector: 'ube-panel',
  template: `<div
    #el
    class="panel"
    [class]="panelClassName"
  >
    <div class="panel-header">
      <ube-button-back
        (click)="close.emit()"
        [attr.label]="closeAriaLabel"
        [attr.dir]="dir"
      ></ube-button-back>
      <h2 class="panel-title" [attr.dir]="dir">{{ heading }}</h2>
    </div>
    <ng-content></ng-content>
  </div>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PanelComponent),
      multi: true,
    },
  ],
})
export class PanelComponent {
  @ViewChild('el') el!: ElementRef<any>
  @Input() heading = ''
  @Input() panelClassName = ''
  @Input() closeAriaLabel = 'Close'
  @Input() dir: 'ltr' | 'rtl' = 'ltr'
  @Output() close = new EventEmitter<void>()

  focus() {
    this.el?.nativeElement?.focus()
  }
}
