<template>
  <ube-button-text
    ref="el"
    :variant="variant"
    :disabled="disabled"
    :active="active"
    :full-width="fullWidth"
    :label="label"
    :active-label="activeLabel"
    :title="title"
    @click="$emit('click', $event)"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'ButtonText',
  props: {
    variant: String,
    disabled: Boolean,
    active: Boolean,
    fullWidth: Boolean,
    label: String,
    activeLabel: String,
    title: String,
    icon: Object,
    activeIcon: Object,
  },
  emits: ['click'],
  methods: {
    focus() {
      this.$refs.el?.focus()
    },
  },
  watch: {
    icon(val) {
      this.$refs.el.icon = val
    },
    activeIcon(val) {
      this.$refs.el.activeIcon = val
    },
  },
  mounted() {
    if (this.icon) {
      this.$refs.el.icon = this.icon
    }
    if (this.activeIcon) {
      this.$refs.el.activeIcon = this.activeIcon
    }
  },
}
</script>
