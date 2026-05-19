<template>
  <ube-info-box
    ref="el"
    :label="label"
  >
    <slot />
  </ube-info-box>
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'InfoBox',
  props: {
    label: String,
  },
}
</script>
