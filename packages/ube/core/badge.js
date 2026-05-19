import { UbeElement } from './base-element.js'
import '../badge.css'

/**
 * <ube-badge>
 * Semantic badge for severity levels, status, and counts. Can be interactive (button).
 *
 * Attributes (primitive values):
 *   variant      - 'critical' | 'high' | 'medium' | 'best-practice' | 'info' | 'success' | 'warning' | 'neutral'
 *   prefix       - small prefix label (e.g., 'SC')
 *   bg           - custom background color (CSS custom property)
 *   color        - custom text color (CSS custom property)
 *   is-button    - 'true' | 'false' (renders as button if true)
 *
 * Slots:
 *   default      - badge label/content
 *
 * Events:
 *   click        - Standard click event (if is-button=true)
 *
 * Usage:
 *   <ube-badge variant="critical">Critical</ube-badge>
 *   <ube-badge variant="high" prefix="SC">2.4.3</ube-badge>
 *   <ube-badge variant="success" is-button="true">Clickable</ube-badge>
 *
 *   const badge = document.querySelector('ube-badge')
 *   badge.addEventListener('click', () => console.log('clicked'))
 */
class UbeBadge extends UbeElement {
  constructor() {
    super()
    this._element = null
  }

  static get observedAttributes() {
    return ['variant', 'prefix', 'bg', 'color', 'is-button']
  }

  get variant() {
    return this.getAttribute('variant') || ''
  }
  set variant(val) {
    this.setAttribute('variant', val)
  }

  get isButton() {
    return this.getAttribute('is-button') === 'true'
  }
  set isButton(val) {
    this.toggleAttribute('is-button', val)
  }

  connectedCallback() {
    super.connectedCallback()
    this._setupElement()
  }

  attributeChangedCallback() {
    if (this._initialized) {
      this._render()
    }
  }

  _setupElement() {
    // Create element (button or span) based on is-button attribute
    this._createElement()
    this._render()
  }

  _createElement() {
    const isButton = this.getAttribute('is-button') === 'true'

    if (this._element && ((isButton && this._element.tagName === 'BUTTON') || (!isButton && this._element.tagName === 'SPAN'))) {
      // Element type is correct, don't recreate
      return
    }

    // Remove old element
    if (this._element) {
      const content = Array.from(this._element.childNodes)
      this._element.remove()
      this._element = null
    }

    // Create new element
    if (isButton) {
      this._element = document.createElement('button')
      this._element.type = 'button'
    } else {
      this._element = document.createElement('span')
    }

    this.appendChild(this._element)
  }

  _render() {
    if (!this._element) return

    const variant = this.getAttribute('variant') || ''
    const prefix = this.getAttribute('prefix')
    const bg = this.getAttribute('bg')
    const color = this.getAttribute('color')

    // Update element classes
    const classes = ['badge', `badge--${variant}`]
    this._element.className = classes.filter(Boolean).join(' ')

    // Set CSS custom properties for custom colors
    if (bg || color) {
      if (bg) this._element.style.setProperty('--badge-bg', bg)
      if (color) this._element.style.setProperty('--badge-text', color)
    } else {
      this._element.style.removeProperty('--badge-bg')
      this._element.style.removeProperty('--badge-text')
    }

    // Update content
    const slot = this.querySelector('slot')
    if (!slot) {
      // Manually update content
      this._element.innerHTML = ''

      if (prefix) {
        const prefixSpan = document.createElement('span')
        prefixSpan.className = 'badge-prefix'
        prefixSpan.textContent = prefix
        this._element.appendChild(prefixSpan)
      }

      // Add text content from attributes or slot
      const textNode = Array.from(this.childNodes).find(n => n.nodeType === 3)
      if (textNode) {
        this._element.appendChild(textNode.cloneNode(true))
      }
    }
  }
}

customElements.define('ube-badge', UbeBadge)
export default UbeBadge
