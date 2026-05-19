import { watch } from 'vue'
import { setAriaDisabled } from './core/ariaDisabled.js'

/**
 * Vue composable for managing aria-disabled on any element.
 * Useful for custom controls (links, buttons, custom web components).
 *
 * Usage:
 *   <script setup>
 *   import { useAriaDisabled } from '@ulam/ube/useAriaDisabled.vue.js'
 *
 *   const el = ref(null)
 *   const disabled = ref(false)
 *
 *   useAriaDisabled(el, disabled)
 *   </script>
 *
 *   <template>
 *     <button ref="el" @click="...">Click me</button>
 *   </template>
 *
 * @param {Ref<HTMLElement>} elRef - Template ref to the element
 * @param {Ref<boolean> | Computed<boolean>} disabledRef - Disabled state
 */
export function useAriaDisabled(elRef, disabledRef) {
  watch(disabledRef, (disabled) => {
    if (elRef.value) {
      setAriaDisabled(elRef.value, disabled)
    }
  }, { immediate: true })
}
