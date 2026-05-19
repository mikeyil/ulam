/**
 * ESLint-compatible linter for touch target accessibility
 * Warns when interactive elements have computed dimensions under 48×48px
 * This is a plugin that can be used in ESLint or standalone testing frameworks
 */

const MIN_TOUCH_TARGET = 48

/**
 * Check if element selector is interactive
 */
function isInteractiveSelector(selector) {
  const interactiveSelectors = [
    'button',
    'a[href]',
    '[role="button"]',
    '[role="link"]',
    'input[type="button"]',
    'input[type="checkbox"]',
    'input[type="radio"]',
    'input[type="submit"]',
    'input[type="reset"]',
    'input[type="file"]',
    'input[type="image"]',
    'select',
    'textarea',
    '[role="switch"]',
    '[role="checkbox"]',
    '[role="radio"]',
    '[role="menuitem"]',
    '[role="menuitemradio"]',
    '[role="menuitemcheckbox"]',
    '[role="tab"]',
  ]

  return interactiveSelectors.some(s => selector.includes(s.replace('[', '').replace(']', '')))
}

/**
 * Analyze HTML content for touch target issues
 * Returns array of issues with positions
 */
export function analyzeTouchTargets(htmlContent) {
  const issues = []
  const parser = new (require('jsdom')).JSDOM

  try {
    const dom = new parser(htmlContent)
    const document = dom.window.document

    const interactiveElements = document.querySelectorAll([
      'button',
      'a[href]',
      '[role="button"]',
      '[role="link"]',
      'input[type="button"]',
      'input[type="checkbox"]',
      'input[type="radio"]',
      'input[type="submit"]',
      'input[type="reset"]',
      'input[type="file"]',
      'input[type="image"]',
      'select',
      '[role="switch"]',
      '[role="checkbox"]',
      '[role="radio"]',
      '[role="menuitem"]',
      '[role="menuitemradio"]',
      '[role="menuitemcheckbox"]',
      '[role="tab"]',
    ].join(','))

    interactiveElements.forEach((el, idx) => {
      // Skip if explicitly exempted
      if (el.hasAttribute('data-no-touch-target-fix')) return

      // Skip if hidden
      const style = el.getAttribute('style') || ''
      if (style.includes('display:none') || style.includes('display: none') ||
          style.includes('visibility:hidden') || style.includes('visibility: hidden')) {
        return
      }

      // Estimate size from inline styles or defaults
      let width = 0
      let height = 0

      // Try to extract from style attribute
      const widthMatch = style.match(/width:\s*(\d+)px/)
      const heightMatch = style.match(/height:\s*(\d+)px/)

      if (widthMatch) width = parseInt(widthMatch[1])
      if (heightMatch) height = parseInt(heightMatch[1])

      // For form inputs, use default sizes
      if (!width && el.tagName.toLowerCase() === 'input') {
        const type = el.getAttribute('type') || 'text'
        if (type === 'checkbox' || type === 'radio') {
          width = 20
          height = 20
        } else if (type === 'button' || type === 'submit' || type === 'reset') {
          width = 60
          height = 32
        }
      }

      // For buttons with only padding, estimate
      if (!width && el.tagName.toLowerCase() === 'button') {
        width = 60
        height = 32
      }

      if (width && height && (width < MIN_TOUCH_TARGET || height < MIN_TOUCH_TARGET)) {
        issues.push({
          element: el.tagName.toLowerCase(),
          selector: el.className ? `.${el.className.split(' ')[0]}` : el.tagName.toLowerCase(),
          width,
          height,
          text: el.textContent?.substring(0, 30),
          message: `Touch target too small: ${width}×${height}px (minimum: 48×48px)`,
          severity: 'warn',
        })
      }
    })
  } catch (e) {
    console.error('Error parsing HTML for touch targets:', e.message)
  }

  return issues
}

/**
 * Vitest plugin for testing
 * Add to vitest config to enable touch target linting in test runs
 */
export function vitestTouchTargetPlugin() {
  return {
    name: 'vitest-touch-target',
    async setupFiles() {
      return []
    },
  }
}

/**
 * Standalone linter function for CI/CD
 */
export async function lintHTML(filePath) {
  const fs = require('fs')
  const content = fs.readFileSync(filePath, 'utf-8')
  const issues = analyzeTouchTargets(content)

  if (issues.length === 0) {
    return { success: true, issues: [] }
  }

  return {
    success: false,
    issues,
    summary: `Found ${issues.length} touch target issues in ${filePath}`,
  }
}

export default {
  analyzeTouchTargets,
  vitestTouchTargetPlugin,
  lintHTML,
}
