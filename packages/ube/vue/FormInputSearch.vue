<template>
  <ube-form-input-search
    ref="el"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    :live-search="liveSearch"
    @change="$emit('update:value', $event.target.value)"
    @search="$emit('search', $event.detail.value)"
    @clear="$emit('clear')"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'FormInputSearch',
  props: {
    value: String,
    placeholder: String,
    disabled: Boolean,
    liveSearch: Boolean,
  },
  emits: ['update:value', 'search', 'clear'],
}
</script>
