<template>
  <SheetShell v-bind="$props" :open="open" :on-close="onClose" :on-collapse="onCollapse">
    <slot />
    <template #chrome>
      <slot name="chrome" />
    </template>
  </SheetShell>
</template>

<script setup>
import { ref } from 'vue'
import { useFocusTrap } from './useFocusTrap.js'
import { useAriaHide } from './useAriaHide.js'
import { useReturnFocus } from './useReturnFocus.js'
import { useEscapeKey } from './useEscapeKey.js'
import { lockScroll } from '../core/scrollLock.js'
import SheetShell from './SheetShell.vue'

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
  heading: {
    type: String,
    default: null,
  },
  closeLabel: {
    type: String,
    default: 'Close',
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  onCollapse: {
    type: Function,
    default: null,
  },
  hideCloseBottom: {
    type: Boolean,
    default: false,
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

// Lock scroll when sheet is open
const unlockScroll = ref(null)
watch(() => props.open, (newVal) => {
  if (newVal) {
    unlockScroll.value = lockScroll()
  } else if (unlockScroll.value) {
    unlockScroll.value()
  }
})
</script>
