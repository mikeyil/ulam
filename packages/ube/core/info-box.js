import { UbeElement } from './base-element.js'
import '../info-box.css'

/**
 * <ube-info-box>
 * Informational callout for tips, warnings, or supplemental content.
 *
 * Attributes (primitive values):
 *   label        - optional title text
 *
 * Slots:
 *   default      - box content (children)
 *
 * Usage:
 *   <ube-info-box>This is an informational message.</ube-info-box>
 *   <ube-info-box label="Note">This setting affects all platforms.</ube-info-box>
 */
class UbeInfoBox extends UbeElement {
  static get observedAttributes() {
    return ['label']
  }

  get label() {
    return this.getAttribute('label') || ''
  }
  set label(val) {
    this.setAttribute('label', val)
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
    // Set role and class
    this.setAttribute('role', 'note')
    this.className = 'info-box'

    // Ensure structure exists
    let body = this.querySelector('.info-box__body')
    if (!body) {
      // Create icon
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      icon.setAttribute('class', 'info-box__icon')
      icon.setAttribute('aria-hidden', 'true')
      icon.setAttribute('width', '13')
      icon.setAttribute('height', '13')
      icon.setAttribute('viewBox', '0 0 24 24')
      icon.setAttribute('fill', 'none')
      icon.setAttribute('stroke', 'currentColor')
      icon.setAttribute('stroke-width', '2')
      icon.setAttribute('stroke-linecap', 'round')
      icon.setAttribute('stroke-linejoin', 'round')

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', '12')
      circle.setAttribute('cy', '12')
      circle.setAttribute('r', '10')
      icon.appendChild(circle)

      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line1.setAttribute('x1', '12')
      line1.setAttribute('y1', '16')
      line1.setAttribute('x2', '12')
      line1.setAttribute('y2', '12')
      icon.appendChild(line1)

      const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line2.setAttribute('x1', '12')
      line2.setAttribute('y1', '8')
      line2.setAttribute('x2', '12.01')
      line2.setAttribute('y2', '8')
      icon.appendChild(line2)

      this.appendChild(icon)

      // Create body
      body = document.createElement('div')
      body.className = 'info-box__body'
      this.appendChild(body)
    }

    // Update label
    const label = this.getAttribute('label')
    let labelP = body.querySelector('.info-box__label')

    if (label) {
      if (!labelP) {
        labelP = document.createElement('p')
        labelP.className = 'info-box__label'
        body.insertBefore(labelP, body.firstChild)
      }
      labelP.textContent = label
    } else if (labelP) {
      labelP.remove()
    }

    // Ensure text paragraph exists
    let textP = body.querySelector('.info-box__text')
    if (!textP) {
      textP = document.createElement('p')
      textP.className = 'info-box__text'
      body.appendChild(textP)
    }
  }
}

customElements.define('ube-info-box', UbeInfoBox)
export default UbeInfoBox
