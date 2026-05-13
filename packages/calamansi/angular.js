/**
 * @ulam/calamansi/angular: Angular adapter
 *
 * Thin injectable services wrapping the vanilla calamansi core.
 *
 * When to use this vs. @angular/localize:
 * - @angular/localize is a compile-time, template-driven system. It bakes
 *   translated strings into the bundle at build time. It does not support
 *   runtime locale switching without a page reload.
 * - calamansi is runtime and data-agnostic. Use it when you need to switch
 *   locales without rebuilding, receive locale data from an API, or share
 *   locale logic across Angular and non-Angular code in the same project.
 *
 * If your project uses @angular/localize for static UI strings, you can still
 * use calamansi alongside it for dynamic or API-driven content.
 */
import { Injectable, signal, computed } from '@angular/core'
import { setLocale, getT, _subscribe, getPref, setPref } from './index.js'

/**
 * Provides locale switching and message translation.
 * Call setLocale() to switch the active locale at runtime.
 *
 * Usage:
 *   constructor(private i18n: I18nService) {}
 *   this.i18n.setLocale('tl')
 *   const label = this.i18n.t('hello', { name: 'Mikey' })
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  #t = signal(getT())

  constructor() {
    _subscribe((nextT) => this.#t.set(nextT))
  }

  setLocale(locale) {
    setLocale(locale)
  }

  t(key, vars) {
    return this.#t()(key, vars)
  }

  get translateFn() {
    return this.#t()
  }
}

/**
 * localStorage-backed user preferences with Angular signal reactivity.
 *
 * Usage:
 *   const pref = inject(PrefService)
 *   const lang = pref.get('lang', 'en')    // Signal<string>
 *   pref.set('lang', 'tl')
 */
@Injectable({ providedIn: 'root' })
export class PrefService {
  #cache = new Map()

  get(key, defaultValue) {
    if (!this.#cache.has(key)) {
      this.#cache.set(key, signal(getPref(key, defaultValue)))
    }
    return computed(() => this.#cache.get(key)())
  }

  set(key, value) {
    setPref(key, value)
    if (this.#cache.has(key)) {
      this.#cache.get(key).set(value)
    }
  }
}

export { setLocale, getT, getPref, setPref }
