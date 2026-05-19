import { UbeElement } from './base-element.js'
import '../buttons.css'

/**
 * <ube-button-icon>
 * Icon-only button. Always requires aria-label for screen readers.
 *
 * Attributes (primitive values):
 *   label        - aria-label text (required for accessibility)
 *   variant      - 'accent' | 'tertiary' (default: 'accent')
 *   disabled     - boolean flag (set via hasAttribute)
 *   title        - title attribute (tooltip)
 *
 * Properties (complex objects):
 *   icon         - Element to render (required)
 *
 * Usage:
 *   <ube-button-icon label="Close">X</ube-button-icon>
 *
 *   const btn = document.querySelector('ube-button-icon')
 *   btn.icon = document.querySelector('svg.close-icon')
 *   btn.addEventListener('click', () => console.log('closed'))
 */
class UbeButtonIcon extends UbeElement {
  constructor() {
    super()
    this.icon = null
  }

  static get observedAttributes() {
    return ['label', 'variant', 'disabled', 'title']
  }

  get label() {
    return this.getAttribute('label') || ''
  }
  set label(val) {
    this.setAttribute('label', val)
  }

  get variant() {
    return this.getAttribute('variant') || 'accent'
  }
  set variant(val) {
    this.setAttribute('variant', val)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }
  set disabled(val) {
    this.toggleAttribute('disabled', val)
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this._handleClick)
  }

  _handleClick = (e) => {
    if (this.disabled) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  _render() {
    const variantClass = `btn--${this.variant}`
    const classes = ['btn', 'btn--icon', variantClass]
    if (this.disabled) classes.push('btn--disabled')

    this.className = classes.join(' ')

    // Set aria-label
    const label = this.getAttribute('label')
    if (label) {
      this._setAriaLabel(label)
    }

    // Sync title attribute
    const title = this.getAttribute('title')
    if (title) {
      this.setAttribute('title', title)
    }

    // Render icon
    const iconSpan = this.querySelector(':scope > .btn-icon')

    if (this.icon) {
      if (!iconSpan) {
        const newIconSpan = document.createElement('span')
        newIconSpan.className = 'btn-icon'
        this.appendChild(newIconSpan)
      }
      const span = this.querySelector(':scope > .btn-icon')
      span.innerHTML = ''
      span.appendChild(this.icon.cloneNode(true))
    } else if (iconSpan) {
      iconSpan.remove()
    }
  }
}

customElements.define('ube-button-icon', UbeButtonIcon)
export default UbeButtonIcon
