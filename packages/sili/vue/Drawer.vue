<template>
  <DrawerShell v-bind="$props" :open="open" :on-close="onClose">
    <slot />
  </DrawerShell>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFocusTrap } from './useFocusTrap.js'
import { useAriaHide } from './useAriaHide.js'
import { useReturnFocus } from './useReturnFocus.js'
import { useEscapeKey } from './useEscapeKey.js'
import { lockScroll, returnFocus } from '../core/index.js'
import DrawerShell from './DrawerShell.vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  focusOnClose: {
    type: Object,
    default: null,
  },
})

const panelRef = ref(null)

useFocusTrap(panelRef, () => props.open)
useAriaHide(panelRef, () => props.open)
useEscapeKey(() => props.open, () => props.onClose())

// Lock scroll when drawer is open
const unlockScroll = ref(null)
watch(() => props.open, (newVal) => {
  if (newVal) {
    unlockScroll.value = lockScroll()
  } else {
    if (unlockScroll.value) unlockScroll.value()
    returnFocus(props.focusOnClose)
  }
})
</script>
