<template>
  <ube-form-control-select
    ref="el"
    :disabled="disabled"
    @change="$emit('update:value', $event.target.value)"
  >
    <slot />
  </ube-form-control-select>
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'FormControlSelect',
  props: {
    disabled: Boolean,
    value: String,
  },
  emits: ['update:value'],
}
</script>
