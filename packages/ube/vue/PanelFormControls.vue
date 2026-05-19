<template>
  <ube-panel-form-controls
    ref="el"
    :block="block"
  >
    <slot />
  </ube-panel-form-controls>
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'PanelFormControls',
  props: {
    block: Boolean,
  },
}
</script>
