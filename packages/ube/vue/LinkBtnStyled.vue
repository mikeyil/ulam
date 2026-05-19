<template>
  <ube-link-btn-styled
    ref="el"
    :variant="variant"
    :href="href"
    :target="target"
    :rel="rel"
    :title="title"
  >
    <slot />
  </ube-link-btn-styled>
</template>

<script>
import '@ulam/ube/core'

export default {
  name: 'LinkBtnStyled',
  props: {
    variant: String,
    href: String,
    target: String,
    rel: String,
    title: String,
  },
}
</script>
