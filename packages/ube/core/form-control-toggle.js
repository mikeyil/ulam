import { UbeElement } from './base-element.js'
import '../form-control-toggle.css'

/**
 * <ube-form-control-toggle>
 * Accessible switch/toggle input. Checkbox styled as visual toggle.
 *
 * Attributes (primitive values):
 *   id           - input id
 *   checked      - boolean flag (set via hasAttribute)
 *   disabled     - boolean flag (set via hasAttribute)
 *
 * Events:
 *   change       - Standard change event when toggled
 *
 * Usage:
 *   <ube-form-control-toggle id="live-search" checked></ube-form-control-toggle>
 *
 *   <label htmlFor="live-search">Live search</label>
 *
 *   const toggle = document.querySelector('ube-form-control-toggle')
 *   toggle.addEventListener('change', (e) => console.log('toggled:', e.target.checked))
 */
class UbeFormControlToggle extends UbeElement {
  constructor() {
    super()
    this._input = null
    this._track = null
    this._thumb = null
  }

  static get observedAttributes() {
    return ['id', 'checked', 'disabled']
  }

  get checked() {
    return this.hasAttribute('checked')
  }
  set checked(val) {
    this.toggleAttribute('checked', val)
    if (this._input) {
      this._input.checked = val
    }
    this._updateThumb()
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }
  set disabled(val) {
    this.toggleAttribute('disabled', val)
    this._applyAriaDisabled(val)
  }

  connectedCallback() {
    super.connectedCallback()
    this._setupToggle()
  }

  attributeChangedCallback() {
    if (this._initialized) {
      this._render()
    }
  }

  _setupToggle() {
    // Create wrapper span
    if (!this.classList.contains('toggle')) {
      this.className = 'toggle'
    }

    // Create input if needed
    if (!this._input) {
      this._input = document.createElement('input')
      this._input.type = 'checkbox'
      this._input.role = 'switch'
      this._input.className = 'toggle__input'
      this.appendChild(this._input)
    }

    // Create track + thumb if needed
    if (!this._track) {
      this._track = document.createElement('span')
      this._track.className = 'toggle__track'
      this._track.setAttribute('aria-hidden', 'true')

      this._thumb = document.createElement('span')
      this._thumb.className = 'toggle__thumb'
      this._thumb.setAttribute('role', 'presentation')

      this._track.appendChild(this._thumb)
      this.appendChild(this._track)
    }

    // Attach listeners
    this._input.addEventListener('change', this._handleChange)
    this._input.addEventListener('keydown', this._handleKeyDown)

    this._render()
  }

  _handleChange = (e) => {
    if (this.hasAttribute('aria-disabled')) return
    this.checked = e.target.checked
    this._emitEvent('change', { checked: e.target.checked })
  }

  _handleKeyDown = (e) => {
    if (!this.hasAttribute('aria-disabled') && e.key === 'Enter') {
      // Toggle on Enter
      this.checked = !this.checked
      this._emitEvent('change', { checked: this.checked })
    }
  }

  _updateThumb() {
    if (!this._thumb) return

    const checked = this.checked

    // Remove old indicator
    const oldIndicator = this._thumb.querySelector('[role="presentation"]')
    if (oldIndicator) {
      oldIndicator.remove()
    }

    // Create new indicator
    const indicator = document.createElement('span')
    indicator.setAttribute('role', 'presentation')
    indicator.className = checked ? 'toggle__on' : 'toggle__off'
    this._thumb.appendChild(indicator)
  }

  _render() {
    if (!this._input) return

    const id = this.getAttribute('id')
    const checked = this.hasAttribute('checked')
    const disabled = this.hasAttribute('disabled')

    // Sync input attributes
    if (id) this._input.id = id
    this._input.checked = checked
    this._input.toggleAttribute('aria-disabled', disabled)

    // Update thumb visual
    this._updateThumb()
  }
}

customElements.define('ube-form-control-toggle', UbeFormControlToggle)
export default UbeFormControlToggle
