<template>
  <ube-form-control-radio-chip
    ref="el"
    :name="name"
    :value="value"
    :label="label"
    :current="current"
    @change="$emit('change', $event.detail.value)"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'FormControlRadioChip',
  props: {
    name: String,
    value: String,
    label: String,
    current: String,
  },
  emits: ['change'],
}
</script>
