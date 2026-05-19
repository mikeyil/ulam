import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

/**
 * Unified button component supporting text, icon, or icon+text layouts.
 * Angular standalone component wrapping core Button logic.
 */
@Component({
  selector: 'ube-button',
  template: `
    <button
      #btn
      type="button"
      [class]="buttonClasses"
      [disabled]="disabled || busy"
      [attr.aria-label]="label"
      [attr.aria-busy]="busy ? true : undefined"
      [attr.title]="title"
      (click)="handleClick($event)"
    >
      <span *ngIf="iconPosition === 'start' && displayIcon" class="btn-icon">
        <ng-container *ngComponentOutlet="displayIcon"></ng-container>
      </span>
      <ng-content></ng-content>
      <span *ngIf="iconPosition === 'end' && displayIcon" class="btn-icon">
        <ng-container *ngComponentOutlet="displayIcon"></ng-container>
      </span>
    </button>
  `,
  styleUrls: ['../../buttons.css'],
  standalone: true,
})
export class ButtonComponent {
  @ViewChild('btn') btn!: ElementRef<HTMLButtonElement>

  @Input() label?: string
  @Input() activeLabel?: string
  @Input() icon?: any
  @Input() activeIcon?: any
  @Input() active = false
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'accent' = 'primary'
  @Input() disabled = false
  @Input() busy = false
  @Input() fullWidth = false
  @Input() error = false
  @Input() align: 'left' | 'center' | 'right' = 'center'
  @Input() size: 'compact' | 'default' | 'large' = 'default'
  @Input() iconPosition: 'start' | 'end' = 'start'
  @Input() title?: string

  @Output() click = new EventEmitter<MouseEvent>()

  get displayIcon() {
    return this.active ? this.activeIcon : this.icon
  }

  get displayLabel() {
    return this.active ? this.activeLabel : this.label
  }

  get isIconOnly() {
    return this.displayIcon && !this.hasText()
  }

  get buttonClasses(): string {
    const classes: string[] = []

    if (this.isIconOnly) {
      classes.push('btn--icon')
      if (this.variant === 'accent') classes.push('btn--icon-accent')
      else if (this.variant === 'tertiary') classes.push('btn--icon-tertiary')
    } else {
      classes.push('btn')
      classes.push(`btn--${this.variant}`)
    }

    if (this.active) classes.push('btn__field--success')
    if (this.busy) classes.push('btn--busy')
    if (this.fullWidth) classes.push('btn--full-width')
    if (!this.isIconOnly && this.align !== 'center') classes.push(`btn--align-${this.align}`)
    if (!this.isIconOnly && this.size !== 'default') classes.push(`btn--size-${this.size}`)
    if (this.error) classes.push('btn--error')

    return classes.join(' ')
  }

  private hasText(): boolean {
    // Check if ng-content has text content
    // For simplicity, return true if not icon-only (will be determined by usage)
    return true
  }

  handleClick(event: MouseEvent) {
    if (!this.disabled && !this.busy) {
      this.click.emit(event)
    }
  }

  focus() {
    this.btn?.nativeElement?.focus()
  }
}
