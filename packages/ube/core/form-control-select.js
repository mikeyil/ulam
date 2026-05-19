import { UbeElement } from './base-element.js'
import '../form-control-select.css'

/**
 * <ube-form-control-select>
 * Native select element with enhanced styling. Wraps <select> with chevron icon.
 *
 * Attributes (primitive values):
 *   value        - currently selected value
 *   disabled     - boolean flag (set via hasAttribute)
 *   id           - input id
 *   wrap-class   - CSS class for wrapper div
 *
 * Slots:
 *   default      - <option> elements
 *
 * Events:
 *   change       - Standard change event
 *
 * Usage:
 *   <ube-form-control-select id="framework" value="react">
 *     <option value="react">React</option>
 *     <option value="vue">Vue</option>
 *   </ube-form-control-select>
 *
 *   const select = document.querySelector('ube-form-control-select')
 *   select.value = 'vue'
 *   select.addEventListener('change', (e) => console.log(e.target.value))
 */
class UbeFormControlSelect extends UbeElement {
  constructor() {
    super()
    this._select = null
    this._wrap = null
  }

  static get observedAttributes() {
    return ['value', 'disabled', 'id', 'wrap-class']
  }

  get value() {
    return this._select ? this._select.value : this.getAttribute('value') || ''
  }
  set value(val) {
    this.setAttribute('value', val)
    if (this._select) {
      this._select.value = val
    }
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
    if (!this._initialized) {
      this._setupSelect()
      this._initialized = true
    }
  }

  attributeChangedCallback() {
    if (this._initialized) {
      this._render()
    }
  }

  _setupSelect() {
    // Check if select already exists (from slot)
    this._select = this.querySelector('select')

    if (!this._select) {
      // Create wrapper div
      this._wrap = document.createElement('div')
      this._wrap.className = 'select-wrap'

      // Create select element
      this._select = document.createElement('select')
      this._select.className = 'select'

      this._wrap.appendChild(this._select)

      // Create chevron icon
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('class', 'select__chevron')
      svg.setAttribute('aria-hidden', 'true')
      svg.setAttribute('width', '14')
      svg.setAttribute('height', '14')
      svg.setAttribute('viewBox', '0 0 24 24')
      svg.setAttribute('fill', 'none')
      svg.setAttribute('stroke', 'currentColor')
      svg.setAttribute('stroke-width', '2')
      svg.setAttribute('stroke-linecap', 'round')
      svg.setAttribute('stroke-linejoin', 'round')

      const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
      polyline.setAttribute('points', '6 9 12 15 18 9')
      svg.appendChild(polyline)

      this._wrap.appendChild(svg)
      this.appendChild(this._wrap)
    }

    // Attach listeners only once
    this._select.addEventListener('change', this._handleChange)

    this._render()
  }

  _handleChange = (e) => {
    if (this.hasAttribute('aria-disabled')) return
    this._emitEvent('change', { value: e.target.value })
  }


  _render() {
    if (!this._select) return

    const value = this.getAttribute('value')
    const disabled = this.hasAttribute('disabled')
    const id = this.getAttribute('id')
    const wrapClass = this.getAttribute('wrap-class') || ''

    // Sync select attributes
    if (value) this._select.value = value
    if (id) this._select.id = id
    this._select.toggleAttribute('aria-disabled', disabled)

    // Sync wrapper classes
    if (this._wrap) {
      const classes = ['select-wrap', wrapClass].filter(Boolean)
      this._wrap.className = classes.join(' ')
    }
  }
}

customElements.define('ube-form-control-select', UbeFormControlSelect)
export default UbeFormControlSelect
