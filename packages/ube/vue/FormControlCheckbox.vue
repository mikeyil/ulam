<template>
  <ube-form-control-checkbox
    ref="el"
    :value="value"
    :label="label"
    :checked="checked"
    :disabled="disabled"
    @change="$emit('update:checked', $event.target.checked)"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'FormControlCheckbox',
  props: {
    value: String,
    label: String,
    checked: Boolean,
    disabled: Boolean,
  },
  emits: ['update:checked'],
}
</script>
