import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { initTouchTargets, exemptElement, includeElement, getReport } from '../touch-target.js'

describe('Touch Target Utility', () => {
  let container

  beforeEach(() => {
    // Create a test container
    container = document.createElement('div')
    document.body.appendChild(container)

    // Mock touch device detection
    vi.stubGlobal('matchMedia', () => ({
      matches: true,
    }))
  })

  afterEach(() => {
    document.body.removeChild(container)
    vi.unstubAllGlobals()
  })

  describe('Detection', () => {
    it('detects undersized button elements', () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      btn.textContent = 'Tiny'
      container.appendChild(btn)

      initTouchTargets()

      const report = getReport()
      expect(report.total).toBeGreaterThan(0)
      expect(report.elements.some(el => el.tag === 'button')).toBe(true)
    })

    it('detects undersized links', () => {
      const link = document.createElement('a')
      link.href = '#'
      link.style.width = '20px'
      link.style.height = '20px'
      link.textContent = 'Link'
      container.appendChild(link)

      initTouchTargets()

      const report = getReport()
      expect(report.elements.some(el => el.tag === 'a')).toBe(true)
    })

    it('detects checkboxes', () => {
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      container.appendChild(checkbox)

      initTouchTargets()

      const report = getReport()
      expect(report.elements.some(el => el.tag === 'input')).toBe(true)
    })

    it('detects radio buttons', () => {
      const radio = document.createElement('input')
      radio.type = 'radio'
      container.appendChild(radio)

      initTouchTargets()

      const report = getReport()
      expect(report.elements.some(el => el.tag === 'input')).toBe(true)
    })

    it('detects elements with ARIA roles', () => {
      const customBtn = document.createElement('div')
      customBtn.setAttribute('role', 'button')
      customBtn.style.width = '20px'
      customBtn.style.height = '20px'
      container.appendChild(customBtn)

      initTouchTargets()

      const report = getReport()
      expect(report.elements.length).toBeGreaterThan(0)
    })
  })

  describe('Overlay injection', () => {
    it('adds overlay class to undersized button', () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      container.appendChild(btn)

      initTouchTargets()

      expect(btn.className).toMatch(/ube-touch-target-/)
    })

    it('sets position:relative on parent if needed', () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      container.appendChild(btn)

      initTouchTargets()

      const computed = window.getComputedStyle(btn)
      expect(['relative', 'absolute', 'fixed']).toContain(computed.position)
    })

    it('adds data attributes for debugging', () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      container.appendChild(btn)

      initTouchTargets()

      expect(btn.hasAttribute('data-touch-target-size')).toBe(true)
      expect(btn.hasAttribute('data-touch-target-overlay')).toBe(true)
    })
  })

  describe('Exemptions', () => {
    it('skips elements with data-no-touch-target-fix attribute', () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      btn.setAttribute('data-no-touch-target-fix', 'true')
      container.appendChild(btn)

      initTouchTargets()

      expect(btn.className).not.toMatch(/ube-touch-target-/)
    })

    it('skips exempted elements via API', () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      container.appendChild(btn)

      exemptElement(btn)
      initTouchTargets()

      expect(btn.className).not.toMatch(/ube-touch-target-/)
    })

    it('includes elements via API', () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      container.appendChild(btn)

      exemptElement(btn)
      includeElement(btn)
      initTouchTargets()

      expect(btn.className).toMatch(/ube-touch-target-/)
    })
  })

  describe('Hidden elements', () => {
    it('skips hidden elements (display:none)', () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      btn.style.display = 'none'
      container.appendChild(btn)

      initTouchTargets()

      expect(btn.className).not.toMatch(/ube-touch-target-/)
    })

    it('skips elements with visibility:hidden', () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      btn.style.visibility = 'hidden'
      container.appendChild(btn)

      initTouchTargets()

      expect(btn.className).not.toMatch(/ube-touch-target-/)
    })
  })

  describe('Collision detection', () => {
    it('creates smaller overlays for closely spaced controls', () => {
      // Create two tiny buttons side by side
      const btn1 = document.createElement('button')
      btn1.style.width = '20px'
      btn1.style.height = '20px'
      btn1.style.margin = '0'
      container.appendChild(btn1)

      const btn2 = document.createElement('button')
      btn2.style.width = '20px'
      btn2.style.height = '20px'
      btn2.style.margin = '0'
      btn2.style.marginLeft = '4px'
      container.appendChild(btn2)

      initTouchTargets()

      const size1 = parseInt(btn1.getAttribute('data-touch-target-overlay'))
      const size2 = parseInt(btn2.getAttribute('data-touch-target-overlay'))

      // Both should have reduced overlays due to collision
      expect(size1).toBeLessThanOrEqual(44)
      expect(size2).toBeLessThanOrEqual(44)
    })

    it('allows full 48×48 overlays for well-spaced controls', () => {
      const btn1 = document.createElement('button')
      btn1.style.width = '20px'
      btn1.style.height = '20px'
      container.appendChild(btn1)

      const spacer = document.createElement('div')
      spacer.style.width = '100px'
      spacer.style.height = '1px'
      container.appendChild(spacer)

      const btn2 = document.createElement('button')
      btn2.style.width = '20px'
      btn2.style.height = '20px'
      container.appendChild(btn2)

      initTouchTargets()

      const size1 = parseInt(btn1.getAttribute('data-touch-target-overlay'))
      const size2 = parseInt(btn2.getAttribute('data-touch-target-overlay'))

      // Both should be able to expand to near 48
      expect(size1).toBeGreaterThan(40)
      expect(size2).toBeGreaterThan(40)
    })
  })

  describe('Non-touch devices', () => {
    it('skips initialization on non-touch devices', () => {
      vi.stubGlobal('matchMedia', () => ({
        matches: false, // Not a touch device
      }))

      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      container.appendChild(btn)

      initTouchTargets()

      expect(btn.className).not.toMatch(/ube-touch-target-/)
    })
  })

  describe('Reporting', () => {
    it('returns empty report when no undersized controls', () => {
      const btn = document.createElement('button')
      btn.style.width = '100px'
      btn.style.height = '50px'
      container.appendChild(btn)

      initTouchTargets()

      const report = getReport()
      // Normal-sized button shouldn't be in report
      expect(report.elements.filter(el => el.tag === 'button').length).toBe(0)
    })

    it('includes all undersized elements in report', () => {
      const btn1 = document.createElement('button')
      btn1.style.width = '20px'
      btn1.style.height = '20px'
      btn1.textContent = 'Btn1'
      container.appendChild(btn1)

      const btn2 = document.createElement('button')
      btn2.style.width = '30px'
      btn2.style.height = '30px'
      btn2.textContent = 'Btn2'
      container.appendChild(btn2)

      initTouchTargets()

      const report = getReport()
      expect(report.total).toBeGreaterThanOrEqual(2)
      expect(report.elements.length).toBeGreaterThanOrEqual(2)
    })

    it('report includes element metadata', () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      btn.textContent = 'Tiny Button'
      container.appendChild(btn)

      initTouchTargets()

      const report = getReport()
      const btnReport = report.elements.find(el => el.tag === 'button')

      expect(btnReport).toMatchObject({
        tag: 'button',
        original: expect.stringMatching(/\d+×\d+/),
        overlay: expect.any(Number),
      })
      expect(btnReport.overlay).toBeGreaterThanOrEqual(32)
      expect(btnReport.overlay).toBeLessThanOrEqual(48)
    })
  })

  describe('Event passthrough', () => {
    it('preserves click events on underlying element', async () => {
      const btn = document.createElement('button')
      btn.style.width = '20px'
      btn.style.height = '20px'
      container.appendChild(btn)

      let clicked = false
      btn.addEventListener('click', () => {
        clicked = true
      })

      initTouchTargets()

      btn.click()

      expect(clicked).toBe(true)
    })

    it('preserves custom events', async () => {
      const link = document.createElement('a')
      link.href = '#'
      link.style.width = '20px'
      link.style.height = '20px'
      container.appendChild(link)

      let eventFired = false
      link.addEventListener('custom', () => {
        eventFired = true
      })

      initTouchTargets()

      const event = new CustomEvent('custom')
      link.dispatchEvent(event)

      expect(eventFired).toBe(true)
    })
  })
})
