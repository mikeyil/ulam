<template>
  <ube-form-control-radio
    ref="el"
    :name="name"
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
  name: 'FormControlRadio',
  props: {
    name: String,
    value: String,
    label: String,
    checked: Boolean,
    disabled: Boolean,
  },
  emits: ['update:checked'],
}
</script>
