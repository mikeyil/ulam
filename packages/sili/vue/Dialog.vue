<template>
  <DialogShell v-bind="$props" :open="open" :on-close="onClose">
    <slot />
  </DialogShell>
</template>

<script setup>
import { ref } from 'vue'
import { useFocusTrap } from './useFocusTrap.js'
import { useAriaHide } from './useAriaHide.js'
import { useReturnFocus } from './useReturnFocus.js'
import { useEscapeKey } from './useEscapeKey.js'
import DialogShell from './DialogShell.vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
  heading: {
    type: String,
    default: 'Information',
  },
  headingIcon: {
    type: [String, Object],
    default: null,
  },
  actions: {
    type: Array,
    default: null,
  },
  returnFocusRef: {
    type: Object,
    default: null,
  },
})

const panelRef = ref(null)

useFocusTrap(panelRef, () => props.open)
useAriaHide(panelRef, () => props.open)
useReturnFocus(props.returnFocusRef)
useEscapeKey(() => props.open, () => props.onClose())
</script>
