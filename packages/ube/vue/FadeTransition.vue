<template>
  <ube-fade-transition
    ref="el"
    :watch-key="String(watchKey)"
    :direction="direction"
  >
    <slot />
  </ube-fade-transition>
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'FadeTransition',
  props: {
    watchKey: [String, Number],
    direction: String,
  },
}
</script>
