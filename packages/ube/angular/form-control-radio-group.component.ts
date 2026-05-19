import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'

interface RadioOption {
  value: string | number
  label: string
}

/**
 * RadioGroup: fieldset + legend + FormControlRadio options.
 * Angular component for grouping regular radio buttons with aria-disabled support.
 */
@Component({
  selector: 'ube-form-control-radio-group',
  template: `
    <fieldset
      #wrapper
      [attr.aria-disabled]="disabled ? 'true' : undefined"
    >
      <legend class="sr-only">{{ legend }}</legend>
      <div class="radio-group">
        <label *ngFor="let opt of options" class="radio-control">
          <input
            type="radio"
            [name]="name"
            [value]="opt.value"
            [checked]="value === opt.value"
            [disabled]="disabled"
            (change)="handleChange(opt.value)"
          />
          <span>{{ opt.label }}</span>
        </label>
      </div>
    </fieldset>
  `,
  styleUrls: ['../../form-control-radio.css'],
})
export class FormControlRadioGroupComponent {
  @ViewChild('wrapper') wrapper!: ElementRef<HTMLFieldSetElement>

  @Input() legend: string = ''
  @Input() name: string = ''
  @Input() value: string | number | null = null
  @Input() options: RadioOption[] = []
  @Input() disabled = false

  @Output() valueChange = new EventEmitter<string | number>()

  handleChange(newValue: string | number) {
    if (!this.disabled) {
      this.valueChange.emit(newValue)
    }
  }
}
