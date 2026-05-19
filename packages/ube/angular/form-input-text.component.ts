import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'ube-form-input-text',
  template: `
    <div
      #wrapper
      [style.width]="width"
      [style.height]="height"
      [ngClass]="['form-input', inputClasses]"
    >
      <!-- Search mode -->
      <ng-container *ngIf="search">
        <form
          role="search"
          [attr.aria-label]="label"
          (ngSubmit)="handleSubmit()"
        >
          <input
            #input
            [attr.id]="id"
            [attr.type]="type"
            [value]="value"
            [attr.placeholder]="placeholder"
            [disabled]="disabled"
            [ngClass]="['form-input__field', inputClassName]"
            (input)="valueChange.emit($event.target.value)"
          />
          <button
            *ngIf="clearable && value"
            type="button"
            [attr.aria-label]="clearAriaLabel"
            [ngClass]="['form-input__clear', clearButtonClassName]"
            (click)="handleClear()"
          >
            {{ clearIcon }}
          </button>
          <button
            *ngIf="showSubmit && !liveSearch"
            type="submit"
            [disabled]="disabled"
            [attr.aria-label]="submitAriaLabel"
            class="form-input__submit"
          >
            🔍
          </button>
        </form>
      </ng-container>

      <!-- Clear mode -->
      <ng-container *ngIf="!search && clearable">
        <input
          #input
          [attr.id]="id"
          [attr.type]="type"
          [value]="value"
          [attr.placeholder]="placeholder"
          [disabled]="disabled"
          [ngClass]="['form-input__field', inputClassName]"
          (input)="valueChange.emit($event.target.value)"
        />
        <button
          *ngIf="value"
          type="button"
          [attr.aria-label]="clearAriaLabel"
          [ngClass]="['form-input__clear', clearButtonClassName]"
          (click)="handleClear()"
        >
          {{ clearIcon }}
        </button>
      </ng-container>

      <!-- Plain mode -->
      <ng-container *ngIf="!search && !clearable">
        <input
          #input
          [attr.id]="id"
          [attr.type]="type"
          [value]="value"
          [attr.placeholder]="placeholder"
          [disabled]="disabled"
          [ngClass]="['form-input__field', inputClassName]"
          (input)="valueChange.emit($event.target.value)"
        />
      </ng-container>
    </div>
  `,
  styleUrls: ['../../form-input-text.css'],
})
export class FormInputTextComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>
  @ViewChild('wrapper') wrapper!: ElementRef<HTMLDivElement>

  @Input() id?: string
  @Input() type = 'text'
  @Input() value = ''
  @Input() search = false
  @Input() liveSearch = false
  @Input() showSubmit = true
  @Input() clearable = false
  @Input() placeholder?: string
  @Input() disabled = false
  @Input() label?: string
  @Input() width = '100%'
  @Input() height?: string
  @Input() submitAriaLabel = 'Search'
  @Input() clearAriaLabel = 'Clear'
  @Input() clearIcon = '✕'
  @Input() wrapClassName = ''
  @Input() inputClassName = ''
  @Input() clearButtonClassName = ''

  @Output() valueChange = new EventEmitter<string>()
  @Output() submit = new EventEmitter<string>()
  @Output() clear = new EventEmitter<void>()

  get inputClasses(): string {
    const classes: string[] = ['form-input']
    if (this.search) {
      classes.push('form-input--search')
      if (this.liveSearch) classes.push('form-input--live')
    } else if (this.clearable) {
      classes.push('form-input--with-clear')
    }
    if (this.wrapClassName) classes.push(this.wrapClassName)
    return classes.join(' ')
  }

  handleSubmit(): void {
    this.submit.emit(this.value)
  }

  handleClear(): void {
    this.clear.emit()
    this.valueChange.emit('')
    this.input?.nativeElement?.focus()
  }
}
