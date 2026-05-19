import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import '@ulam/ube/core'

@Component({
  selector: 'ube-button-text',
  template: `<ube-button-text
    #el
    [attr.variant]="variant"
    [attr.disabled]="disabled"
    [attr.active]="active"
    [attr.full-width]="fullWidth"
    [attr.label]="label"
    [attr.active-label]="activeLabel"
    [attr.title]="title"
    (click)="click.emit($event)"
  ></ube-button-text>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonTextComponent implements AfterViewInit {
  @ViewChild('el') el!: ElementRef<any>
  @Input() variant?: string
  @Input() disabled = false
  @Input() active = false
  @Input() fullWidth = false
  @Input() label?: string
  @Input() activeLabel?: string
  @Input() title?: string
  @Input() set icon(val: any) {
    if (this.el) {
      this.el.nativeElement.icon = val
    }
  }
  @Input() set activeIcon(val: any) {
    if (this.el) {
      this.el.nativeElement.activeIcon = val
    }
  }
  @Output() click = new EventEmitter<any>()

  ngAfterViewInit() {
    // Icon properties set in setters
  }

  focus() {
    this.el?.nativeElement?.focus()
  }
}
