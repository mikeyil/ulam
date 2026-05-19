<template>
  <Teleport to="body">
    <div :class="`sheet-backdrop${open ? ' is-open' : ''}`" data-overlay-backdrop />
    <div
      :class="`sheet-panel${open ? ' is-open' : ''}${collapsed ? ' is-collapsed' : ''}`"
      role="dialog"
      aria-modal="true"
      :aria-label="label"
      tabindex="-1"
      :inert="!open || undefined"
      @click="collapsed && onCollapse && onCollapse(!collapsed)"
    >
      <div v-if="open" class="sheet-chrome">
        <div class="sheet-handle" aria-hidden="true" />
        <slot name="chrome" />
        <button v-if="!hideCloseBottom" class="sheet-close-btn" @click="onClose" :aria-label="closeLabel">
          ✕
        </button>
      </div>
      <div v-if="open && !collapsed" class="sheet-content">
        <h2 v-if="heading" class="sheet-heading">{{ heading }}</h2>
        <slot />
      </div>
      <div v-if="open && !hideCloseBottom" class="sheet-close-bottom">
        <button class="sheet-close-bottom-btn" @click="onClose">{{ closeLabel }}</button>
      </div>
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
})
</script>
