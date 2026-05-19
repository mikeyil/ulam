<template>
  <Teleport to="body">
    <div :class="`modal-backdrop${open ? ' is-open' : ''}`" @click="onClose" aria-hidden="true" data-overlay-backdrop />
    <div
      :class="`modal-panel${open ? ' is-open' : ''}`"
      role="dialog"
      aria-modal="true"
      :aria-label="heading"
      tabindex="-1"
      :inert="!open || undefined"
    >
      <div v-if="open" class="modal-body">
        <h2 class="modal-heading">
          <span v-if="headingIcon" class="modal-heading-icon" aria-hidden="true">
            <slot name="headingIcon">{{ headingIcon }}</slot>
          </span>
          {{ heading }}
        </h2>
        <div class="modal-content">
          <slot />
        </div>
      </div>
      <div v-if="open" class="modal-footer">
        <button
          v-for="action in (actions || [{ label: 'OK', onClick: onClose, className: 'btn--primary modal-ok-btn' }])"
          :key="action.label"
          :class="action.className || 'btn--primary modal-ok-btn'"
          @click="action.onClick"
        >
          {{ action.label }}
        </button>
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
})
</script>
