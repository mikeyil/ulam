import { UbeElement } from './base-element.js'
import '../link-skip-to.css'

/**
 * <ube-link-skip-to>
 * Skip-to-main link. Hidden by default, shows on focus for keyboard navigation.
 *
 * Attributes (primitive values):
 *   href         - link destination (e.g., '#main')
 *   show-icon    - 'true' | 'false' (default: 'true')
 *
 * Slots:
 *   default      - link label (children)
 *
 * Usage:
 *   <ube-link-skip-to href="#main">Skip to main content</ube-link-skip-to>
 *
 *   const link = document.querySelector('ube-link-skip-to')
 *   link.addEventListener('click', () => console.log('skipping'))
 */
class UbeLinkSkipTo extends UbeElement {
  static get observedAttributes() {
    return ['href', 'show-icon']
  }

  get href() {
    return this.getAttribute('href') || ''
  }
  set href(val) {
    this.setAttribute('href', val)
  }

  get showIcon() {
    const attr = this.getAttribute('show-icon')
    return attr !== 'false'
  }
  set showIcon(val) {
    this.toggleAttribute('show-icon', val)
  }

  connectedCallback() {
    super.connectedCallback()
    this._render()
  }

  _render() {
    const href = this.getAttribute('href')
    const showIcon = this.showIcon

    // Apply skip link styling
    if (!this.classList.contains('skip-link')) {
      this.classList.add('skip-link')
    }

    // Create icon SVG (arrow down)
    const createIcon = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('width', '14')
      svg.setAttribute('height', '14')
      svg.setAttribute('viewBox', '0 0 24 24')
      svg.setAttribute('fill', 'none')
      svg.setAttribute('stroke', 'currentColor')
      svg.setAttribute('stroke-width', '2')
      svg.setAttribute('stroke-linecap', 'round')
      svg.setAttribute('stroke-linejoin', 'round')
      svg.setAttribute('aria-hidden', 'true')
      svg.setAttribute('focusable', 'false')

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', '12')
      line.setAttribute('y1', '5')
      line.setAttribute('x2', '12')
      line.setAttribute('y2', '19')
      svg.appendChild(line)

      const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
      polyline.setAttribute('points', '19 12 12 19 5 12')
      svg.appendChild(polyline)

      return svg
    }

    // Get slot content
    const slot = this.querySelector('slot')
    let iconSpan = this.querySelector(':scope > .skip-icon')

    if (showIcon) {
      if (!iconSpan) {
        iconSpan = document.createElement('span')
        iconSpan.className = 'skip-icon'
        this.appendChild(iconSpan)
      }
      iconSpan.innerHTML = ''
      iconSpan.appendChild(createIcon())
    } else if (iconSpan) {
      iconSpan.remove()
    }
  }
}

customElements.define('ube-link-skip-to', UbeLinkSkipTo)
export default UbeLinkSkipTo
