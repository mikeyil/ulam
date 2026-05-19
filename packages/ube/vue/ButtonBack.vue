<template>
  <ube-button-back
    ref="el"
    :disabled="disabled"
    :label="label"
    :title="title"
    @click="$emit('click', $event)"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'ButtonBack',
  props: {
    disabled: Boolean,
    label: String,
    title: String,
  },
  emits: ['click'],
  methods: {
    focus() {
      this.$refs.el?.focus()
    },
  },
}
</script>
