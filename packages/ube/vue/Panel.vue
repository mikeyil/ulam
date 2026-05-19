<template>
  <div :class="panelClassName" v-bind="$attrs">
    <div :class="headerClassName">
      <ButtonBack :aria-label="closeAriaLabel" :dir="dir" @click="$emit('close')" />
      <h2 ref="headingRef" tabindex="-1" :class="titleClassName">{{ heading }}</h2>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import ButtonBack from './ButtonBack.vue'
import '../panel.css'

export default {
  name: 'Panel',
  components: { ButtonBack },
  props: {
    heading: { type: String, required: true },
    panelClassName: { type: String, default: '' },
    headerClassName: { type: String, default: '' },
    titleClassName: { type: String, default: '' },
    closeAriaLabel: { type: String, default: 'Close' },
    dir: { type: String, default: 'ltr', validator: (v) => ['ltr', 'rtl'].includes(v) },
  },
  emits: ['close'],
  setup(_, { expose }) {
    const headingRef = ref(null)
    const focus = () => headingRef.value?.focus()
    expose({ focus })
    return { headingRef }
  },
}
</script>
