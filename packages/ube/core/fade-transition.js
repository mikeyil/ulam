import { UbeElement } from './base-element.js'
import '../fade-transition.css'

/**
 * <ube-fade-transition>
 * Cross-fades between children when watch-key changes.
 * Outgoing content freezes and fades out while new content fades in.
 * Respects prefers-reduced-motion.
 *
 * Attributes (primitive values):
 *   watch-key            - changing this value triggers the transition
 *   direction            - 'ltr' | 'rtl' (optional, for slide-style transitions)
 *
 * Slots:
 *   default              - content to display
 *
 * Events:
 *   transitionstart      - fires when transition begins
 *   transitionend        - fires when transition completes
 *
 * Usage:
 *   <ube-fade-transition watch-key="page-1">
 *     <div>Page 1 content</div>
 *   </ube-fade-transition>
 *
 *   const ft = document.querySelector('ube-fade-transition')
 *   ft.watchKey = 'page-2'  // triggers transition
 */
class UbeFadeTransition extends UbeElement {
  constructor() {
    super()
    this._outgoing = null
    this._phase = 'idle' // 'idle' | 'out' | 'in'
    this._activeDirection = null
    this._prevKey = null
    this._timerOut = null
    this._timerIn = null
  }

  static get observedAttributes() {
    return ['watch-key', 'direction']
  }

  get watchKey() {
    return this.getAttribute('watch-key') || ''
  }
  set watchKey(val) {
    this.setAttribute('watch-key', val)
  }

  get direction() {
    return this.getAttribute('direction') || ''
  }
  set direction(val) {
    if (val) {
      this.setAttribute('direction', val)
    } else {
      this.removeAttribute('direction')
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this._prevKey = this.watchKey
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._initialized && name === 'watch-key') {
      if (this._prevKey !== newValue) {
        this._triggerTransition(newValue)
      }
    }
    if (this._initialized) {
      this._render()
    }
  }

  _triggerTransition(newKey) {
    this._prevKey = newKey

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this._render()
      return
    }

    // Clear any pending timers
    clearTimeout(this._timerOut)
    clearTimeout(this._timerIn)

    // Save current slot content as outgoing
    const slot = this.querySelector('slot')
    this._outgoing = slot ? slot.innerHTML : this.innerHTML
    this._activeDirection = this.getAttribute('direction') || null

    // Start fade out
    this._phase = 'out'
    this._render()
    this._emitEvent('transitionstart', { phase: 'out' })

    // Transition timing: 200ms out, then 200ms in
    const DURATION_MS = 200
    this._timerOut = setTimeout(() => {
      this._outgoing = null
      this._phase = 'in'
      this._render()

      this._timerIn = setTimeout(() => {
        this._phase = 'idle'
        this._render()
        this._emitEvent('transitionend', { phase: 'idle' })
      }, DURATION_MS)
    }, DURATION_MS)
  }

  _render() {
    const dirMod = this._activeDirection ? ` fade-transition--${this._activeDirection}` : ''

    if (this._phase === 'out' && this._outgoing) {
      this.className = `fade-transition fade-transition--out${dirMod}`
      this.innerHTML = this._outgoing
    } else {
      const classes = ['fade-transition']
      if (this._phase === 'in') {
        classes.push(`fade-transition--in${dirMod}`)
      }
      this.className = classes.filter(Boolean).join(' ')
      // Keep slot/children visible
    }
  }
}

customElements.define('ube-fade-transition', UbeFadeTransition)
export default UbeFadeTransition
