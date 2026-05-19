import { UbeElement } from './base-element.js'
import '../buttons.css'

/**
 * <ube-button-back>
 * RTL-aware back chevron button. Flips direction when html[dir="rtl"].
 *
 * Attributes (primitive values):
 *   label        - aria-label text (required for accessibility)
 *   disabled     - boolean flag (set via hasAttribute)
 *   title        - title attribute (tooltip)
 *   dir          - 'ltr' | 'rtl' (responsive to html[dir])
 *
 * Events:
 *   click        - Standard click event
 *
 * Usage:
 *   <ube-button-back label="Back to results"></ube-button-back>
 *
 *   const btn = document.querySelector('ube-button-back')
 *   btn.addEventListener('click', () => window.history.back())
 */
class UbeButtonBack extends UbeElement {
  constructor() {
    super()
    this._dirObserver = null
  }

  static get observedAttributes() {
    return ['label', 'disabled', 'title']
  }

  get label() {
    return this.getAttribute('label') || ''
  }
  set label(val) {
    this.setAttribute('label', val)
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

    // Watch for html[dir] changes
    this._startDirObserver()
  }

  disconnectedCallback() {
    if (this._dirObserver) {
      this._dirObserver.disconnect()
      this._dirObserver = null
    }
  }

  _startDirObserver() {
    const htmlEl = document.documentElement
    this._dirObserver = new MutationObserver(() => {
      if (this._initialized) {
        this._render()
      }
    })

    this._dirObserver.observe(htmlEl, {
      attributes: true,
      attributeFilter: ['dir'],
    })
  }

  _handleClick = (e) => {
    if (this.disabled) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  _getDir() {
    return document.documentElement.getAttribute('dir') || 'ltr'
  }

  _render() {
    const classes = ['btn', 'btn--icon', 'btn--tertiary']
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

    // Render icon (responsive to dir)
    const dir = this._getDir()
    const isRtl = dir === 'rtl'

    // Create SVG icon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('width', '20')
    svg.setAttribute('height', '20')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '2.5')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    // LTR: points="15 18 9 12 15 6" (left-pointing)
    // RTL: points="9 18 15 12 9 6" (right-pointing)
    polyline.setAttribute('points', isRtl ? '9 18 15 12 9 6' : '15 18 9 12 15 6')
    svg.appendChild(polyline)

    // Update or create icon span
    let iconSpan = this.querySelector(':scope > .btn-icon')
    if (!iconSpan) {
      iconSpan = document.createElement('span')
      iconSpan.className = 'btn-icon'
      this.appendChild(iconSpan)
    }

    iconSpan.innerHTML = ''
    iconSpan.appendChild(svg)
  }
}

customElements.define('ube-button-back', UbeButtonBack)
export default UbeButtonBack
