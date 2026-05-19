import { UbeElement } from './base-element.js'
import '../buttons.css'

/**
 * <ube-button-text>
 * Text button with icon support, state transitions, and semantic variants.
 *
 * Attributes (primitive values):
 *   variant       - 'primary' | 'secondary' | 'tertiary' | 'danger' (default: 'primary')
 *   disabled      - boolean flag (set via hasAttribute)
 *   active        - boolean flag (set via hasAttribute)
 *   full-width    - boolean flag (set via hasAttribute)
 *   label         - aria-label text
 *   active-label  - aria-label when active
 *   title         - title attribute (tooltip)
 *
 * Properties (complex objects):
 *   icon          - Element to render (left of label)
 *   activeIcon    - Element to render when active
 *
 * Usage:
 *   <ube-button-text variant="primary" label="Save">Save changes</ube-button-text>
 *
 *   const btn = document.querySelector('ube-button-text')
 *   btn.icon = document.querySelector('svg.star')
 *   btn.addEventListener('click', () => console.log('clicked'))
 */
class UbeButtonText extends UbeElement {
  constructor() {
    super()
    this.icon = null
    this.activeIcon = null
  }

  static get observedAttributes() {
    return ['variant', 'disabled', 'active', 'full-width', 'label', 'active-label', 'title']
  }

  // Getters/setters for easier access

  get variant() {
    return this.getAttribute('variant') || 'primary'
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

  get active() {
    return this.hasAttribute('active')
  }
  set active(val) {
    this.toggleAttribute('active', val)
  }

  get fullWidth() {
    return this.hasAttribute('full-width')
  }
  set fullWidth(val) {
    this.toggleAttribute('full-width', val)
  }

  connectedCallback() {
    super.connectedCallback()
    // Prevent click when disabled
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
    const displayIcon = this.active ? this.activeIcon : this.icon
    const displayLabel = this.active
      ? this.getAttribute('active-label')
      : this.getAttribute('label')

    // Build class list
    const classes = ['btn', variantClass]
    if (this.active) classes.push('btn__field--success')
    if (this.disabled) classes.push('btn--disabled')
    if (this.fullWidth) classes.push('btn--full-width')

    this.className = classes.join(' ')

    // Set aria-label
    if (displayLabel) {
      this._setAriaLabel(displayLabel)
    } else {
      this.removeAttribute('aria-label')
    }

    // Sync title attribute (for tooltip)
    const title = this.getAttribute('title')
    if (title) {
      this.setAttribute('title', title)
    }

    // Handle icon: update or create icon span
    let iconSpan = this.querySelector(':scope > .btn-icon')

    if (displayIcon) {
      if (!iconSpan) {
        iconSpan = document.createElement('span')
        iconSpan.className = 'btn-icon'
        this.insertBefore(iconSpan, this.firstChild)
      }
      // Clear and append cloned icon
      iconSpan.innerHTML = ''
      iconSpan.appendChild(displayIcon.cloneNode(true))
    } else {
      // Remove icon if not needed
      if (iconSpan) {
        iconSpan.remove()
      }
    }
  }
}

customElements.define('ube-button-text', UbeButtonText)
export default UbeButtonText
