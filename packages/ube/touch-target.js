/**
 * Touch Target Utility
 * Detects undersized interactive elements on touch devices and applies invisible
 * 48x48 proxies to improve accessibility. Auto-injects ::after pseudo-element
 * overlays with collision detection and optional debug visualization.
 */

const MIN_TOUCH_TARGET = 48
const DEBUG_OVERLAY_COLOR = 'rgba(255, 0, 0, 0.4)' // Bright red, high opacity
const COLLISION_CHECK_MARGIN = 2 // pixels

let styleSheet = null
let debugMode = false
let exceptions = new Set()
let minTouchTarget = MIN_TOUCH_TARGET

/**
 * Check if device supports touch and doesn't have hover
 */
function isTouchDevice() {
  return matchMedia('(hover: none) and (pointer: coarse)').matches
}

/**
 * Get all interactive elements that could have touch targets
 */
function getInteractiveElements() {
  const selectors = [
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
  return document.querySelectorAll(selectors.join(','))
}

/**
 * Check if element should be skipped
 */
function shouldSkip(el) {
  // Skip if already has touch-target-skip attribute
  if (el.hasAttribute('data-no-touch-target-fix')) return true

  // Skip if exception registered
  if (exceptions.has(el)) return true

  // Skip hidden elements
  const style = window.getComputedStyle(el)
  if (style.display === 'none' || style.visibility === 'hidden' || style.pointerEvents === 'none') {
    return true
  }

  // Skip if element is not visible (visibility)
  if (!el.offsetParent && el.offsetHeight === 0) return true

  return false
}

/**
 * Get effective dimensions (accounting for padding, borders, etc)
 */
function getElementSize(el) {
  const rect = el.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
  }
}

/**
 * Expand rect by margin for collision detection
 */
function expandRect(rect, margin) {
  return {
    top: rect.top - margin,
    left: rect.left - margin,
    bottom: rect.bottom + margin,
    right: rect.right + margin,
  }
}

/**
 * Check if two rectangles overlap
 */
function rectsOverlap(rect1, rect2) {
  return !(rect1.right < rect2.left || rect1.left > rect2.right ||
           rect1.bottom < rect2.top || rect1.top > rect2.bottom)
}

/**
 * Calculate maximum safe overlay size considering collisions
 */
function getMaxOverlaySize(targetRect, allElements) {
  let maxSize = minTouchTarget

  // Check for collisions with nearby elements
  const expandedTarget = expandRect(targetRect, MIN_TOUCH_TARGET / 2)

  for (const otherRect of allElements) {
    if (rectsOverlap(expandedTarget, otherRect)) {
      // Calculate how much we can shrink before collision
      const overlapX = Math.max(0, Math.min(targetRect.right, otherRect.right) -
                                     Math.max(targetRect.left, otherRect.left))
      const overlapY = Math.max(0, Math.min(targetRect.bottom, otherRect.bottom) -
                                     Math.max(targetRect.top, otherRect.top))

      if (overlapX > 0 || overlapY > 0) {
        // Reduce size based on overlap
        const maxXSize = MIN_TOUCH_TARGET - overlapX
        const maxYSize = MIN_TOUCH_TARGET - overlapY
        maxSize = Math.min(maxSize, Math.min(maxXSize, maxYSize), 44)
      }
    }
  }

  return Math.max(maxSize, 32) // never go below 32
}

/**
 * Needs overlay: size undersized
 */
function needsOverlay(size) {
  return size.width < minTouchTarget || size.height < minTouchTarget
}

/**
 * Generate unique class name for element
 */
function getOverlayClassName(el) {
  return `ube-touch-target-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Add CSS rule for overlay pseudo-element
 */
function addOverlayRule(className, size) {
  if (!styleSheet) {
    const style = document.createElement('style')
    style.setAttribute('data-ube-touch-target', 'true')
    document.head.appendChild(style)
    styleSheet = style.sheet
  }

  const rule = `
.${className}::after {
  content: '' !important;
  position: absolute !important;
  width: ${size}px !important;
  height: ${size}px !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  background: ${debugMode ? DEBUG_OVERLAY_COLOR : 'transparent'} !important;
  cursor: pointer !important;
  pointer-events: auto !important;
  border: ${debugMode ? '2px dashed rgba(255, 0, 0, 0.8)' : 'none'} !important;
  box-shadow: ${debugMode ? '0 0 0 1px rgba(255, 0, 0, 0.5), inset 0 0 8px rgba(255, 0, 0, 0.3)' : 'none'} !important;
  z-index: 9999 !important;
}
  `

  styleSheet.insertRule(rule)
}

/**
 * Ensure parent is relatively positioned so ::after works
 */
function ensurePositioning(el) {
  const style = window.getComputedStyle(el)
  const position = style.position

  if (position === 'static' || position === '') {
    el.style.position = 'relative'
  }
}

/**
 * Process a single element
 */
function processElement(el, allRects) {
  if (shouldSkip(el)) return

  const size = getElementSize(el)

  if (!needsOverlay(size)) return

  // Calculate max overlay size considering collisions
  const maxSize = getMaxOverlaySize(size, allRects)

  // Ensure parent positioning
  ensurePositioning(el)

  // Add overlay class
  const className = getOverlayClassName(el)
  el.classList.add(className)

  // Add CSS rule
  addOverlayRule(className, maxSize)

  // Store metadata for debugging
  el.setAttribute('data-touch-target-size', `${Math.round(size.width)}×${Math.round(size.height)}`)
  el.setAttribute('data-touch-target-overlay', maxSize)

  // Visual debug: add a border to the element itself to show it was processed
  if (debugMode) {
    el.style.outline = '2px solid red'
  }
}

/**
 * Initialize touch target detection and remediation
 * @param {Object} options
 * @param {boolean} options.debug - Show overlay visualization
 * @param {number} options.minSize - Minimum target size in pixels (24, 44, or 48; default: 48)
 * @param {boolean} options.autoInit - Auto-run on DOM ready (default: true)
 */
export function initTouchTargets(options = {}) {
  if (!isTouchDevice()) {
    console.log('[ube touch-target] Not a touch device, skipping')
    return
  }

  debugMode = options.debug || false
  minTouchTarget = options.minSize || MIN_TOUCH_TARGET
  console.log('[ube touch-target] Initializing with debug:', debugMode, 'minSize:', minTouchTarget)

  // Get all interactive elements
  const elements = Array.from(getInteractiveElements())
  console.log('[ube touch-target] Found', elements.length, 'interactive elements')

  // Get bounding rects for all (for collision detection)
  const allRects = elements.map(el => getElementSize(el))

  // Process each element
  let processedCount = 0
  elements.forEach((el, idx) => {
    const before = el.className
    processElement(el, allRects)
    if (el.className !== before) processedCount++
  })

  console.log('[ube touch-target] Processed', processedCount, 'elements with overlays')

  if (debugMode) {
    const undersized = elements.filter(el => {
      const size = getElementSize(el)
      return needsOverlay(size)
    })
    console.log(`[ube touch-target] Processed ${elements.length} interactive elements`, {
      undersized: undersized.length,
      withOverlay: elements.filter(el => el.className && el.className.includes('ube-touch-target-')).length,
    })
    console.log('[ube touch-target] Undersized elements:', undersized.map(el => ({
      tag: el.tagName,
      text: el.textContent?.substring(0, 20),
      size: getElementSize(el),
      hasClass: Array.from(el.classList).find(c => c.startsWith('ube-touch-target-')),
    })))
    console.log('[ube touch-target] StyleSheet rules:', styleSheet?.cssRules.length || 0)
  }
}

/**
 * Register element to skip touch target fix
 */
export function exemptElement(el) {
  exceptions.add(el)
}

/**
 * Unregister element from exceptions
 */
export function includeElement(el) {
  exceptions.delete(el)
}

/**
 * Enable/disable debug visualization
 */
export function setDebugMode(enabled) {
  debugMode = enabled
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('__ube_touch_target_debug', enabled ? 'true' : 'false')
  }

  // Update existing overlays
  const overlays = document.querySelectorAll('[data-touch-target-overlay]')
  overlays.forEach(el => {
    const size = el.getAttribute('data-touch-target-overlay')
    const className = Array.from(el.classList).find(c => c.startsWith('ube-touch-target-'))

    if (!styleSheet || !className) return

    // This is a limitation: we can't easily toggle CSS rules
    // For now, we'd need to reinject or use CSS variables
    // A simpler approach: add/remove a data attribute and use CSS
  })
}

/**
 * Get report of processed elements
 */
export function getReport() {
  const elements = document.querySelectorAll('[data-touch-target-overlay]')
  const report = {
    total: elements.length,
    elements: Array.from(elements).map(el => ({
      tag: el.tagName.toLowerCase(),
      original: el.getAttribute('data-touch-target-size'),
      overlay: parseInt(el.getAttribute('data-touch-target-overlay')),
      text: el.textContent?.substring(0, 50),
    })),
  }
  return report
}

// Auto-init on frameworks that set a config flag
if (typeof window !== 'undefined' && window.__UBE_TOUCH_TARGET_AUTO_INIT) {
  const debugFromStorage = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('__ube_touch_target_debug') === 'true'
  const shouldDebug = window.__UBE_TOUCH_TARGET_DEBUG || debugFromStorage

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTouchTargets({
        debug: shouldDebug,
      })
    })
  } else {
    initTouchTargets({
      debug: shouldDebug,
    })
  }
}

export default { initTouchTargets, exemptElement, includeElement, setDebugMode, getReport }
