<template>
  <ube-form-control-toggle
    ref="el"
    :checked="checked"
    :disabled="disabled"
    :label="label"
    @change="$emit('update:checked', $event.target.checked)"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'FormControlToggle',
  props: {
    checked: Boolean,
    disabled: Boolean,
    label: String,
  },
  emits: ['update:checked'],
}
</script>
