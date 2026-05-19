<template>
  <ube-form-input-with-clear
    ref="el"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    @change="$emit('update:value', $event.target.value)"
    @clear="$emit('clear')"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'FormInputWithClear',
  props: {
    value: String,
    placeholder: String,
    disabled: Boolean,
  },
  emits: ['update:value', 'clear'],
}
</script>
