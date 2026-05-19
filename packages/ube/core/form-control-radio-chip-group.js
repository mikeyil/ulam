import { UbeElement } from './base-element.js'
import '../form-control-radio-chip-group.css'

/**
 * <ube-form-control-radio-chip-group>
 * Group container for <ube-form-control-radio-chip> elements.
 * Renders as fieldset with visually hidden legend.
 *
 * Attributes:
 *   legend      - legend text (required, visually hidden)
 *   name        - radio group name (passed to child chips)
 *   value       - currently selected value
 *   options     - JSON string of [{value: string, label: string}, ...]
 *
 * Events:
 *   change      - fires when a chip is selected, detail.value = selected value
 *
 * Usage:
 *   <ube-form-control-radio-chip-group
 *     legend="Platform"
 *     name="platform"
 *     value="web"
 *     options='[{"value":"web","label":"Web"},{"value":"native","label":"Native"}]'
 *   ></ube-form-control-radio-chip-group>
 */
class UbeFormControlRadioChipGroup extends UbeElement {
  constructor() {
    super()
    this._fieldset = null
    this._chipContainer = null
  }

  static get observedAttributes() {
    return ['legend', 'name', 'value', 'options']
  }

  get legend() {
    return this.getAttribute('legend') || ''
  }
  set legend(val) {
    this.setAttribute('legend', val)
  }

  get name() {
    return this.getAttribute('name') || ''
  }
  set name(val) {
    this.setAttribute('name', val)
  }

  get value() {
    return this.getAttribute('value') || ''
  }
  set value(val) {
    this.setAttribute('value', val)
  }

  get options() {
    const optionsStr = this.getAttribute('options')
    if (!optionsStr) return []
    try {
      return JSON.parse(optionsStr)
    } catch {
      return []
    }
  }
  set options(val) {
    this.setAttribute('options', JSON.stringify(val))
  }

  connectedCallback() {
    super.connectedCallback()
    this._setupGroup()
  }

  attributeChangedCallback() {
    if (this._initialized) {
      this._render()
    }
  }

  _setupGroup() {
    // Create fieldset wrapper
    if (!this._fieldset) {
      this._fieldset = document.createElement('fieldset')
      this.appendChild(this._fieldset)
    }

    // Create legend
    let legend = this._fieldset.querySelector('legend')
    if (!legend) {
      legend = document.createElement('legend')
      legend.className = 'sr-only'
      this._fieldset.appendChild(legend)
    }

    // Create chip container
    if (!this._chipContainer) {
      this._chipContainer = document.createElement('div')
      this._chipContainer.className = 'radio-chip-group'
      this._fieldset.appendChild(this._chipContainer)
    }

    this._render()
  }

  _render() {
    if (!this._fieldset || !this._chipContainer) return

    const legend = this.getAttribute('legend') || ''
    const name = this.getAttribute('name')
    const value = this.getAttribute('value')
    const optionsStr = this.getAttribute('options')

    // Update legend
    const legendEl = this._fieldset.querySelector('legend')
    if (legendEl) {
      legendEl.textContent = legend
    }

    // Parse options
    let options = []
    if (optionsStr) {
      try {
        options = JSON.parse(optionsStr)
      } catch {
        options = []
      }
    }

    // Render chips
    this._chipContainer.innerHTML = ''
    options.forEach(opt => {
      const chip = document.createElement('ube-form-control-radio-chip')
      chip.setAttribute('name', name)
      chip.setAttribute('value', opt.value)
      chip.setAttribute('label', opt.label || '')
      chip.setAttribute('current', value)
      chip.addEventListener('change', (e) => this._handleChipChange(e))
      this._chipContainer.appendChild(chip)
    })
  }

  _handleChipChange(e) {
    const newValue = e.detail?.value || e.target?.getAttribute?.('value')
    if (newValue) {
      this.value = newValue
      this._emitEvent('change', { value: newValue })
    }
  }
}

customElements.define('ube-form-control-radio-chip-group', UbeFormControlRadioChipGroup)
export default UbeFormControlRadioChipGroup
