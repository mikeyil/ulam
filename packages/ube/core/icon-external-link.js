import { UbeElement } from './base-element.js'
import '../icon-external-link.css'

/**
 * <ube-icon-external-link>
 * Decorative external link icon. Use with external links or new-tab links.
 *
 * Attributes (primitive values):
 *   size         - icon size in px (default: '11')
 *
 * Usage:
 *   <a href="https://example.com">Visit site <ube-icon-external-link></ube-icon-external-link></a>
 */
class UbeIconExternalLink extends UbeElement {
  static get observedAttributes() {
    return ['size']
  }

  get size() {
    return this.getAttribute('size') || '11'
  }
  set size(val) {
    this.setAttribute('size', val)
  }

  connectedCallback() {
    super.connectedCallback()
    this._render()
  }

  attributeChangedCallback() {
    if (this._initialized) {
      this._render()
    }
  }

  _render() {
    const size = this.getAttribute('size') || '11'

    // Create or update SVG
    let svg = this.querySelector('svg')
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('aria-hidden', 'true')
      svg.setAttribute('class', 'external-link-icon')

      // Create path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6')
      svg.appendChild(path)

      // Create polyline
      const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
      polyline.setAttribute('points', '15 3 21 3 21 9')
      svg.appendChild(polyline)

      // Create line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', '10')
      line.setAttribute('y1', '14')
      line.setAttribute('x2', '21')
      line.setAttribute('y2', '3')
      svg.appendChild(line)

      this.appendChild(svg)
    }

    // Update SVG attributes
    svg.setAttribute('width', size)
    svg.setAttribute('height', size)
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '2')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')
  }
}

customElements.define('ube-icon-external-link', UbeIconExternalLink)
export default UbeIconExternalLink
