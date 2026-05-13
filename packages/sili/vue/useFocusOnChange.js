import { ref, watch } from 'vue'

/**
 * Focuses the element at elRef when dep changes. Skips the initial render.
 *
 * @param {Ref<HTMLElement|null>} elRef
 * @param {Ref}                   dep    - any reactive value; focus triggers on change
 */
export function useFocusOnChange(elRef, dep) {
  const mounted = ref(false)

  watch(dep, () => {
    if (!mounted.value) { mounted.value = true; return }
    elRef.value?.focus()
  })
}
