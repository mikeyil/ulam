/**
 * @ulam/halohalo/vue: Vue composables adapter
 */
import { ref, readonly } from 'vue'
import { createCompletion } from './createCompletion.js'
import { createProviderConfig } from './createProviderConfig.js'

/**
 * Reactive wrapper around createCompletion(). Returns reactive loading and
 * animating state, plus complete() and cancel() functions.
 *
 * @param {object} [defaultOptions] - default options merged into every complete() call
 */
export function useCompletion(defaultOptions = {}) {
  const instance = createCompletion()
  const loading = ref(false)
  const animating = ref(false)

  const unsubscribe = instance.subscribe(({ loading: l, animating: a }) => {
    loading.value = l
    animating.value = a
  })

  // caller should invoke cleanup() in onUnmounted if used inside a component
  function cleanup() {
    instance.cancel()
    unsubscribe()
  }

  return {
    loading: readonly(loading),
    animating: readonly(animating),
    complete: (callOptions) => instance.complete({ ...defaultOptions, ...callOptions }),
    cancel: () => instance.cancel(),
    cleanup,
  }
}

/**
 * Reactive wrapper around createProviderConfig(). All config fields are reactive
 * refs; setters update the underlying singleton and trigger re-reads.
 *
 * @param {object} [storageKeys]
 * @param {Array}  [providers]
 */
export function useProviderConfig(storageKeys, providers) {
  const config = createProviderConfig(storageKeys, providers)

  const provider = ref(config.provider)
  const models = ref(config.models)
  const mode = ref(config.mode)

  const unsubscribe = config.subscribe(() => {
    provider.value = config.provider
    models.value = config.models
    mode.value = config.mode
  })

  return {
    provider: readonly(provider),
    models: readonly(models),
    mode: readonly(mode),
    providers: config.providers,
    setProvider: (id) => config.setProvider(id),
    setModel: (pid, mid) => config.setModel(pid, mid),
    setMode: (v) => config.setMode(v),
    setKey: (pid, v) => config.setKey(pid, v),
    getKey: (pid) => config.getKey(pid),
    getModel: (pid) => config.getModel(pid),
    getLabel: (pid) => config.getLabel(pid),
    cleanup: unsubscribe,
  }
}
