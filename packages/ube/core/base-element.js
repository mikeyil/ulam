// Base class for all @ulam/ube web components
// Provides: lifecycle management, attribute/property sync, common helpers

import { applyAriaDisabled } from './ariaDisabled.js'

export class UbeElement extends HTMLElement {
  constructor() {
    super()
    this._initialized = false
    this._ariaDisabledCleanup = null
  }

  /**
   * Hook: called when component is inserted into DOM
   * Override in subclasses, call super.connectedCallback()
   */
  connectedCallback() {
    if (!this._initialized) {
      this._render()
      this._initialized = true
    }
  }

  /**
   * Hook: called when observed attributes change
   * Override in subclasses, call super.attributeChangedCallback()
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (this._initialized) {
      this._render()
    }
  }

  /**
   * Must be overridden in subclasses
   * Returns array of attribute names to observe
   */
  static get observedAttributes() {
    return []
  }

  /**
   * Must be overridden in subclasses
   * Rebuilds component DOM when state changes
   */
  _render() {
    // Override in subclass
  }

  /**
   * Helper: dispatch custom event
   */
  _emitEvent(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true,
    }))
  }

  /**
   * Helper: toggle class with condition
   */
  _setClassIf(className, condition) {
    this.classList.toggle(className, condition)
  }

  /**
   * Helper: sync aria-* attributes
   */
  _setAriaLabel(label) {
    if (label) {
      this.setAttribute('aria-label', label)
    } else {
      this.removeAttribute('aria-label')
    }
  }

  /**
   * Helper: apply aria-disabled pattern (stays in tab order, blocks interactions)
   * Call in disabled setter: this._applyAriaDisabled(val)
   * Manages aria-disabled attribute and listener setup/cleanup
   */
  _applyAriaDisabled(disabled) {
    if (disabled) {
      this.setAttribute('aria-disabled', 'true')
      this._ariaDisabledCleanup?.()
      this._ariaDisabledCleanup = applyAriaDisabled(this)
    } else {
      this.removeAttribute('aria-disabled')
      this._ariaDisabledCleanup?.()
      this._ariaDisabledCleanup = null
    }
  }
}
