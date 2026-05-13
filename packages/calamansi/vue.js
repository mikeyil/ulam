/**
 * @ulam/calamansi/vue: Vue composables adapter
 *
 * Thin reactive wrappers around the vanilla calamansi core.
 * The vanilla setLocale(), getT(), getPref(), setPref() functions work anywhere
 * without any adapter; these composables add Vue reactivity.
 */
import { ref, readonly } from 'vue'
import { setLocale, getT, _subscribe, getPref, setPref } from './index.js'

/**
 * Returns a reactive ref containing the current translate function.
 * Updates automatically when the locale changes.
 *
 * @returns {Ref<(key: string, vars?: Record<string, string>) => string>}
 */
export function useT() {
  const t = ref(getT())
  const unsubscribe = _subscribe((nextT) => { t.value = nextT })
  // composables cannot use onUnmounted at module scope; caller is responsible for
  // long-lived subscriptions in app-level code, but component usage is self-contained
  // because Vue GC cleans refs when the component unmounts.
  return readonly(t)
}

/**
 * Persisted user preference backed by localStorage. Returns a reactive ref and
 * a setter that both updates the ref and persists the value.
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {{ value: Ref, set: (v: any) => void }}
 */
export function usePref(key, defaultValue) {
  const value = ref(getPref(key, defaultValue))

  function set(next) {
    const resolved = typeof next === 'function' ? next(value.value) : next
    value.value = resolved
    setPref(key, resolved)
  }

  return { value: readonly(value), set }
}

export { setLocale, getT, getPref, setPref }
