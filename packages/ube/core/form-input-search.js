import { UbeElement } from './base-element.js'
import '../form-control-button.css'
import '../form-input.css'
import '../form-input-search.css'

/**
 * <ube-form-input-search>
 * Self-contained search field with form[role="search"] wrapper.
 * Supports live search (onChange on keystroke) or submit mode (onSubmit on Enter/click).
 *
 * Attributes (primitive values):
 *   value              - input value
 *   id                 - input id
 *   placeholder        - input placeholder (default: 'Search…')
 *   disabled           - boolean flag
 *   live-search        - 'true' | 'false' (default: 'false')
 *   label              - aria-label on the form
 *   submit-aria-label  - aria-label for submit button (default: 'Search')
 *   clear-aria-label   - aria-label for clear button (default: 'Clear')
 *
 * Events:
 *   input              - Standard input event
 *   submit             - Custom submit event (contains value)
 *   clear              - Custom clear event
 *
 * Usage:
 *   <ube-form-input-search
 *     id="site-search"
 *     value="search term"
 *     label="Search the site"
 *   ></ube-form-input-search>
 *
 *   const search = document.querySelector('ube-form-input-search')
 *   search.addEventListener('input', (e) => console.log('typing'))
 *   search.addEventListener('submit', (e) => console.log('submitted', e.detail.value))
 */
class UbeFormInputSearch extends UbeElement {
  constructor() {
    super()
    this._form = null
    this._input = null
    this._clearButton = null
    this._submitButton = null
  }

  static get observedAttributes() {
    return ['value', 'id', 'placeholder', 'disabled', 'live-search', 'label', 'submit-aria-label', 'clear-aria-label']
  }

  get value() {
    return this._input ? this._input.value : this.getAttribute('value') || ''
  }
  set value(val) {
    this.setAttribute('value', val)
    if (this._input) {
      this._input.value = val
    }
    this._updateButtonVisibility()
  }

  connectedCallback() {
    super.connectedCallback()
    this._setupForm()
  }

  attributeChangedCallback() {
    if (this._initialized) {
      this._render()
    }
  }

  _setupForm() {
    // Create form wrapper if needed
    if (!this._form) {
      this._form = document.createElement('form')
      this._form.role = 'search'
      this._form.className = 'input-search'
      this.appendChild(this._form)
    }

    // Create input if needed
    if (!this._input) {
      this._input = document.createElement('input')
      this._input.type = 'text'
      this._input.className = 'input-search__input'
      this._form.appendChild(this._input)
    }

    // Attach listeners
    this._form.addEventListener('submit', this._handleSubmit)
    this._input.addEventListener('input', this._handleInput)

    this._render()
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    this._emitEvent('submit', { value: this.value })
  }

  _handleInput = (e) => {
    this.setAttribute('value', e.target.value)
    this._updateButtonVisibility()
    this._emitEvent('input', { value: e.target.value })
  }

  _handleClear = (e) => {
    e.preventDefault()
    this.value = ''
    this._emitEvent('clear', { value: '' })
    this._input?.focus()
  }

  _handleSubmitButton = (e) => {
    e.preventDefault()
    this._emitEvent('submit', { value: this.value })
  }

  _updateButtonVisibility() {
    const hasValue = this.value.length > 0
    const liveSearch = this.getAttribute('live-search') === 'true'

    // Clear button
    if (hasValue && !this._clearButton) {
      this._createClearButton()
    } else if (!hasValue && this._clearButton) {
      this._clearButton.remove()
      this._clearButton = null
    }

    // Submit button (only in non-live mode)
    if (!liveSearch && !this._submitButton) {
      this._createSubmitButton()
    } else if (liveSearch && this._submitButton) {
      this._submitButton.remove()
      this._submitButton = null
    }
  }

  _createClearButton() {
    if (this._clearButton) return

    this._clearButton = document.createElement('button')
    this._clearButton.type = 'button'
    this._clearButton.className = 'input-search__clear'
    this._clearButton.textContent = '✕'

    const clearAriaLabel = this.getAttribute('clear-aria-label') || 'Clear'
    this._clearButton.setAttribute('aria-label', clearAriaLabel)

    this._clearButton.addEventListener('click', this._handleClear)
    this._form.appendChild(this._clearButton)
  }

  _createSubmitButton() {
    if (this._submitButton) return

    this._submitButton = document.createElement('button')
    this._submitButton.type = 'submit'
    this._submitButton.className = 'input-search__submit'
    this._submitButton.textContent = '🔍'

    const submitAriaLabel = this.getAttribute('submit-aria-label') || 'Search'
    this._submitButton.setAttribute('aria-label', submitAriaLabel)

    this._form.appendChild(this._submitButton)
  }

  _render() {
    if (!this._form || !this._input) return

    const value = this.getAttribute('value') || ''
    const id = this.getAttribute('id')
    const placeholder = this.getAttribute('placeholder') || 'Search…'
    const disabled = this.hasAttribute('disabled')
    const liveSearch = this.getAttribute('live-search') === 'true'
    const label = this.getAttribute('label')

    // Sync form attributes
    if (label) {
      this._form.setAttribute('aria-label', label)
    } else {
      this._form.removeAttribute('aria-label')
    }

    // Sync input attributes
    this._input.value = value
    if (id) this._input.id = id
    this._input.placeholder = placeholder
    this._input.disabled = disabled

    // Sync buttons
    this._updateButtonVisibility()

    // Update submit button disabled state
    if (this._submitButton) {
      this._submitButton.disabled = disabled
    }
  }
}

customElements.define('ube-form-input-search', UbeFormInputSearch)
export default UbeFormInputSearch
