import { UbeElement } from './base-element.js'

/**
 * <ube-panel-form-controls>
 * Layout wrapper for form control rows in panels.
 * Supports both inline (toggle row) and block (group) layouts.
 *
 * Attributes (primitive values):
 *   label        - label text (required)
 *   description  - optional description text
 *   block        - 'true' | 'false' (default: 'false') - use block layout instead of inline
 *   disabled     - 'true' | 'false' - applies disabled styling
 *   sm           - 'true' | 'false' - compact size (inline only)
 *
 * Slots:
 *   default      - form control and optional notes
 *
 * Usage:
 *   <ube-panel-form-controls label="Live search" description="Results appear as you type.">
 *     <ube-form-control-toggle id="live-search" checked></ube-form-control-toggle>
 *   </ube-panel-form-controls>
 *
 *   <ube-panel-form-controls label="Theme" description="Choose your scheme." block="true">
 *     <ube-form-control-radio-chip-group>...</ube-form-control-radio-chip-group>
 *   </ube-panel-form-controls>
 */
class UbePanelFormControls extends UbeElement {
  static get observedAttributes() {
    return ['label', 'description', 'block', 'disabled', 'sm']
  }

  get label() {
    return this.getAttribute('label') || ''
  }
  set label(val) {
    this.setAttribute('label', val)
  }

  get block() {
    return this.getAttribute('block') === 'true'
  }
  set block(val) {
    this.toggleAttribute('block', val === 'true' || val === true)
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
    const label = this.getAttribute('label') || ''
    const description = this.getAttribute('description')
    const block = this.getAttribute('block') === 'true'
    const disabled = this.getAttribute('disabled') === 'true'
    const sm = this.getAttribute('sm') === 'true'

    // Determine classes
    const classes = [block ? 'panel-group' : 'panel-toggle-row']
    if (!block && sm) classes.push('panel-toggle-row--sm')
    if (!block && disabled) classes.push('panel-toggle-row--disabled')

    this.className = classes.filter(Boolean).join(' ')

    // Get or create label container
    let labelContainer = this.querySelector(':scope > div:first-child')
    if (!labelContainer) {
      labelContainer = document.createElement('div')
      this.insertBefore(labelContainer, this.firstChild)
    }

    // Update label heading
    const labelClass = block ? 'panel-group__label' : 'panel-toggle-label'
    let heading = labelContainer.querySelector('h3')
    if (!heading) {
      heading = document.createElement('h3')
      heading.className = labelClass
      labelContainer.insertBefore(heading, labelContainer.firstChild)
    }
    heading.textContent = label
    heading.className = labelClass

    // Update description
    const descClass = block ? 'panel-group__desc' : 'panel-toggle-desc'
    let descP = labelContainer.querySelector('p')
    if (description) {
      if (!descP) {
        descP = document.createElement('p')
        descP.className = descClass
        labelContainer.appendChild(descP)
      }
      descP.textContent = description
      descP.className = descClass
    } else if (descP) {
      descP.remove()
    }

    // For inline layout: separate control from notes
    if (!block) {
      // Last child slot content is the control
      const slot = this.querySelector('slot')
      if (!slot) {
        // If slot doesn't exist, we're in manual content mode
        // This is handled by the user's structure
      }
    }
  }
}

customElements.define('ube-panel-form-controls', UbePanelFormControls)
export default UbePanelFormControls
