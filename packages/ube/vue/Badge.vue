<template>
  <ube-badge
    ref="el"
    :variant="variant"
    :is-button="isButton"
    @click="$emit('click', $event)"
  >
    <slot />
  </ube-badge>
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'Badge',
  props: {
    variant: String,
    isButton: Boolean,
    bgColor: String,
    textColor: String,
  },
  emits: ['click'],
  watch: {
    bgColor(val) {
      this.$refs.el?.style.setProperty('--badge-bg', val)
    },
    textColor(val) {
      this.$refs.el?.style.setProperty('--badge-color', val)
    },
  },
  mounted() {
    if (this.bgColor) {
      this.$refs.el.style.setProperty('--badge-bg', this.bgColor)
    }
    if (this.textColor) {
      this.$refs.el.style.setProperty('--badge-color', this.textColor)
    }
  },
}
</script>
