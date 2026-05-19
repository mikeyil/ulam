<template>
  <ube-button-icon
    ref="el"
    :variant="variant"
    :disabled="disabled"
    :label="label"
    :title="title"
    @click="$emit('click', $event)"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'ButtonIcon',
  props: {
    variant: String,
    disabled: Boolean,
    label: String,
    title: String,
    icon: Object,
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
  },
  mounted() {
    if (this.icon) {
      this.$refs.el.icon = this.icon
    }
  },
}
</script>
