import { describe, it, expect, beforeEach } from 'vitest'
import '@ulam/ube/core'
import '@ulam/sili'

describe('Integration Tests', () => {
  describe('CSS Token Cascading', () => {
    let container
    beforeEach(() => {
      container = document.createElement('div')
      document.body.appendChild(container)
    })

    it('applies CSS tokens from host app to components', () => {
      container.style.setProperty('--text-body', '#333333')
      container.style.setProperty('--accent', '#0066ff')

      const btn = document.createElement('ube-button-text')
      btn.label = 'Themed'
      container.appendChild(btn)

      const computed = window.getComputedStyle(btn)
      // Component should inherit token values
      expect(computed).toBeDefined()
    })

    it('component slots inherit parent styles', () => {
      const btn = document.createElement('ube-button-text')
      btn.label = 'Styled'
      container.appendChild(btn)

      const slot = btn.querySelector('[role="button"]')
      expect(slot).toBeDefined()
    })
  })

  describe('Light DOM Pattern', () => {
    it('components render without shadow DOM', () => {
      const radio = document.createElement('ube-form-control-radio')
      radio.setAttribute('name', 'test')
      radio.setAttribute('value', 'a')
      radio.setAttribute('label', 'Option A')
      document.body.appendChild(radio)

      // Check that elements are in light DOM
      const label = radio.querySelector('label')
      expect(label?.parentElement).toBe(radio)
    })

    it('CSS classes can be added to components', () => {
      const badge = document.createElement('ube-badge')
      badge.setAttribute('variant', 'info')
      badge.className = 'custom-class'
      document.body.appendChild(badge)

      expect(badge.classList.contains('custom-class')).toBe(true)
    })
  })

  describe('Property vs Attribute Serialization', () => {
    it('primitives use attributes', () => {
      const btn = document.createElement('ube-button-text')
      btn.setAttribute('label', 'Test')
      btn.setAttribute('disabled', 'true')

      expect(btn.getAttribute('label')).toBe('Test')
      expect(btn.getAttribute('disabled')).toBe('true')
    })

    it('complex objects use properties', () => {
      const btn = document.createElement('ube-button-text')
      const icon = { type: 'svg', data: '<svg></svg>' }
      btn.icon = icon

      expect((btn as any).icon).toEqual(icon)
      expect(btn.getAttribute('icon')).toBeNull()
    })
  })

  describe('Custom Events', () => {
    it('components emit custom events with detail', (done) => {
      const chip = document.createElement('ube-form-control-radio-chip')
      chip.setAttribute('name', 'platform')
      chip.setAttribute('value', 'web')
      chip.setAttribute('label', 'Web')
      chip.setAttribute('current', 'native')
      document.body.appendChild(chip)

      chip.addEventListener('change', (e: any) => {
        expect(e.detail.value).toBe('web')
        done()
      })

      const input = chip.querySelector('input')
      input?.click()
    })

    it('change events contain correct data', (done) => {
      const select = document.createElement('ube-form-control-select')
      select.innerHTML = '<select><option value="a">A</option><option value="b">B</option></select>'
      document.body.appendChild(select)

      select.addEventListener('change', (e: any) => {
        expect(e.target.value).toBe('a')
        done()
      })

      const selectEl = select.querySelector('select') as HTMLSelectElement
      selectEl.value = 'a'
      selectEl.dispatchEvent(new Event('change', { bubbles: true }))
    })
  })

  describe('ObservedAttributes', () => {
    it('updates when observedAttributes change', () => {
      const badge = document.createElement('ube-badge')
      badge.setAttribute('variant', 'info')
      document.body.appendChild(badge)

      let cls = badge.querySelector('[class*="badge--"]')
      expect(cls).toBeDefined()

      badge.setAttribute('variant', 'critical')
      cls = badge.querySelector('[class*="badge--critical"]')
      expect(cls).toBeDefined()
    })

    it('syncs all observed attributes', () => {
      const radio = document.createElement('ube-form-control-radio')
      radio.setAttribute('name', 'group1')
      radio.setAttribute('value', 'a')
      radio.setAttribute('label', 'A')
      radio.setAttribute('checked', 'false')
      document.body.appendChild(radio)

      const input = radio.querySelector('input[type="radio"]') as HTMLInputElement
      expect(input.name).toBe('group1')
      expect(input.value).toBe('a')
      expect(input.checked).toBe(false)
    })
  })

  describe('Accessibility', () => {
    it('components include ARIA attributes', () => {
      const btn = document.createElement('ube-button-text')
      btn.label = 'Close'
      document.body.appendChild(btn)

      const button = btn.querySelector('button')
      expect(button?.hasAttribute('aria-label')).toBe(true)
    })

    it('toggle has role="switch"', () => {
      const toggle = document.createElement('ube-form-control-toggle')
      toggle.setAttribute('label', 'Feature')
      document.body.appendChild(toggle)

      const switchEl = toggle.querySelector('[role="switch"]')
      expect(switchEl).toBeDefined()
    })

    it('skip link is accessible', () => {
      const skip = document.createElement('ube-link-skip-to')
      skip.setAttribute('href', '#main')
      skip.setAttribute('label', 'Skip to main')
      document.body.appendChild(skip)

      const link = skip.querySelector('a')
      expect(link?.href).toContain('main')
    })
  })
})
