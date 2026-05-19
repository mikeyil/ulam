<template>
  <ube-link-skip-to
    ref="el"
    :href="href"
    :label="label"
    :show-icon="showIcon"
  />
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'LinkSkipTo',
  props: {
    href: String,
    label: String,
    showIcon: Boolean,
  },
}
</script>
