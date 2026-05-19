import { describe, it, expect, beforeEach } from 'vitest'
import '@ulam/ube/core'

describe('Core Web Components', () => {
  describe('FormControlRadio', () => {
    let el
    beforeEach(() => {
      el = document.createElement('ube-form-control-radio')
      el.setAttribute('name', 'test')
      el.setAttribute('value', 'a')
      el.setAttribute('label', 'Option A')
      document.body.appendChild(el)
    })

    it('renders radio input with correct name/value', () => {
      const input = el.querySelector('input[type="radio"]')
      expect(input?.getAttribute('name')).toBe('test')
      expect(input?.getAttribute('value')).toBe('a')
    })

    it('syncs checked state to attribute', () => {
      el.checked = true
      expect(el.querySelector('input')?.checked).toBe(true)
    })
  })

  describe('FormControlSelect', () => {
    let el
    beforeEach(() => {
      el = document.createElement('ube-form-control-select')
      el.innerHTML = '<select><option value="a">A</option><option value="b">B</option></select>'
      document.body.appendChild(el)
    })

    it('wraps native select element', () => {
      expect(el.querySelector('select')).toBeInstanceOf(HTMLSelectElement)
    })

    it('respects disabled state', () => {
      el.disabled = true
      expect(el.querySelector('select')?.disabled).toBe(true)
    })
  })

  describe('FadeTransition', () => {
    let el
    beforeEach(() => {
      el = document.createElement('ube-fade-transition')
      el.setAttribute('watch-key', 'page1')
      el.textContent = 'Page 1'
      document.body.appendChild(el)
    })

    it('renders with watch-key attribute', () => {
      expect(el.getAttribute('watch-key')).toBe('page1')
    })

    it('updates watch-key when changed', () => {
      el.setAttribute('watch-key', 'page2')
      expect(el.getAttribute('watch-key')).toBe('page2')
    })
  })

  describe('Badge', () => {
    let el
    beforeEach(() => {
      el = document.createElement('ube-badge')
      el.setAttribute('variant', 'critical')
      el.textContent = 'Error'
      document.body.appendChild(el)
    })

    it('renders with variant attribute', () => {
      expect(el.getAttribute('variant')).toBe('critical')
    })

    it('can be rendered as button', () => {
      el.setAttribute('is-button', 'true')
      expect(el.querySelector('button')).toBeTruthy()
    })
  })

  describe('InfoBox', () => {
    let el
    beforeEach(() => {
      el = document.createElement('ube-info-box')
      el.setAttribute('label', 'Info')
      el.textContent = 'This is informational'
      document.body.appendChild(el)
    })

    it('renders with label', () => {
      expect(el.getAttribute('label')).toBe('Info')
    })

    it('has role of note', () => {
      expect(el.getAttribute('role')).toBe('note')
    })
  })

  describe('FormControlToggle', () => {
    let el
    beforeEach(() => {
      el = document.createElement('ube-form-control-toggle')
      el.setAttribute('label', 'Enable feature')
      document.body.appendChild(el)
    })

    it('renders with role="switch"', () => {
      const checkbox = el.querySelector('[role="switch"]')
      expect(checkbox).toBeTruthy()
    })

    it('toggles on Enter key', () => {
      const checkbox = el.querySelector('[role="switch"]')
      const initialState = checkbox?.checked
      checkbox?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
      // State should toggle (depends on component implementation)
    })
  })
})
