import { UbeElement } from './base-element.js'
import '../link-btn-styled.css'

/**
 * <ube-link-btn-styled>
 * Anchor element styled as a button. For external links or hash navigation.
 *
 * Attributes (primitive values):
 *   href         - link destination (required)
 *   target       - '_blank' | '_self' | '_parent' | '_top' (default: '_self')
 *   rel          - rel attribute (e.g., 'noopener noreferrer' for _blank)
 *   title        - title attribute (tooltip)
 *
 * Slots:
 *   default      - link label (children)
 *
 * Usage:
 *   <ube-link-btn-styled href="https://example.com">Visit</ube-link-btn-styled>
 *   <ube-link-btn-styled href="#/settings">Settings</ube-link-btn-styled>
 *
 *   const link = document.querySelector('ube-link-btn-styled')
 *   link.addEventListener('click', (e) => console.log('navigating'))
 */
class UbeLinkBtnStyled extends UbeElement {
  static get observedAttributes() {
    return ['href', 'target', 'rel', 'title']
  }

  get href() {
    return this.getAttribute('href') || ''
  }
  set href(val) {
    this.setAttribute('href', val)
  }

  get target() {
    return this.getAttribute('target') || '_self'
  }
  set target(val) {
    this.setAttribute('target', val)
  }

  connectedCallback() {
    super.connectedCallback()
    this._syncAttributes()
  }

  attributeChangedCallback() {
    if (this._initialized) {
      this._syncAttributes()
    }
  }

  _syncAttributes() {
    const href = this.getAttribute('href')
    const target = this.getAttribute('target')
    const rel = this.getAttribute('rel')
    const title = this.getAttribute('title')

    if (href) {
      this.setAttribute('href', href)
    }
    if (target) {
      this.setAttribute('target', target)
    }
    if (rel) {
      this.setAttribute('rel', rel)
    }
    if (title) {
      this.setAttribute('title', title)
    }

    // Apply button styling class
    if (!this.classList.contains('link-btn-styled')) {
      this.classList.add('link-btn-styled')
    }
  }

  _render() {
    // LinkBtnStyled is just a styled anchor, rendering is mostly CSS
    // Ensure the tag is <a>
    if (this.tagName !== 'A') {
      // Component must be used as <a is="ube-link-btn-styled"> or wrapped in adapter
      console.warn('LinkBtnStyled should be an <a> element')
    }
  }
}

customElements.define('ube-link-btn-styled', UbeLinkBtnStyled)
export default UbeLinkBtnStyled
