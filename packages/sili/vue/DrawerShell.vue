<template>
  <Teleport to="body">
    <div :class="`overlay-backdrop${open ? ' is-open' : ''}`" @click="onClose" aria-hidden="true" data-overlay-backdrop />
    <div
      :class="`drawer-panel${open ? ' is-open' : ''}`"
      role="dialog"
      aria-modal="true"
      :aria-label="label"
      tabindex="-1"
      :inert="!open || undefined"
    >
      <slot v-if="open" />
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
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
})
</script>
