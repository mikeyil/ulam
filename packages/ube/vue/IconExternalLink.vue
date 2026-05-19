<template>
  <ube-icon-external-link
    ref="el"
    :size="size"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'IconExternalLink',
  props: {
    size: String,
  },
}
</script>
