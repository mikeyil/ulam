<template>
  <ube-form-control-radio-chip-group
    ref="el"
    :legend="legend"
    :name="name"
    :value="value"
    :options="JSON.stringify(options)"
    @change="$emit('change', $event.detail.value)"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'FormControlRadioChipGroup',
  props: {
    legend: String,
    name: String,
    value: String,
    options: Array,
  },
  emits: ['change'],
}
</script>
