<template>
  <button
    ref="btn"
    type="button"
    :class="buttonClasses"
    :disabled="disabled || busy"
    :aria-label="label"
    :aria-busy="busy ? true : undefined"
    :title="title"
    @click="handleClick"
  >
    <span v-if="iconPosition === 'start' && displayIcon" class="btn-icon">
      <component :is="displayIcon" />
    </span>
    <slot></slot>
    <span v-if="iconPosition === 'end' && displayIcon" class="btn-icon">
      <component :is="displayIcon" />
    </span>
  </button>
</template>

<script>
import '../../buttons.css'

export default {
  name: 'Button',
  props: {
    label: String,
    activeLabel: String,
    icon: Object,
    activeIcon: Object,
    active: { type: Boolean, default: false },
    variant: { type: String, default: 'primary', validator: (v) => ['primary', 'secondary', 'tertiary', 'accent'].includes(v) },
    disabled: { type: Boolean, default: false },
    busy: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    align: { type: String, default: 'center', validator: (v) => ['left', 'center', 'right'].includes(v) },
    size: { type: String, default: 'default', validator: (v) => ['compact', 'default', 'large'].includes(v) },
    iconPosition: { type: String, default: 'start', validator: (v) => ['start', 'end'].includes(v) },
    title: String,
  },
  emits: ['click'],
  computed: {
    displayIcon() {
      return this.active ? this.activeIcon : this.icon
    },
    displayLabel() {
      return this.active ? this.activeLabel : this.label
    },
    isIconOnly() {
      return this.displayIcon && !this.$slots.default
    },
    buttonClasses() {
      const classes = []

      if (this.isIconOnly) {
        classes.push('btn--icon')
        if (this.variant === 'accent') classes.push('btn--icon-accent')
        else if (this.variant === 'tertiary') classes.push('btn--icon-tertiary')
      } else {
        classes.push('btn')
        classes.push(`btn--${this.variant}`)
      }

      if (this.active) classes.push('btn__field--success')
      if (this.busy) classes.push('btn--busy')
      if (this.fullWidth) classes.push('btn--full-width')
      if (!this.isIconOnly && this.align !== 'center') classes.push(`btn--align-${this.align}`)
      if (!this.isIconOnly && this.size !== 'default') classes.push(`btn--size-${this.size}`)
      if (this.error) classes.push('btn--error')

      return classes.join(' ')
    },
  },
  methods: {
    handleClick(event) {
      if (!this.disabled && !this.busy) {
        this.$emit('click', event)
      }
    },
    focus() {
      this.$refs.btn?.focus()
    },
  },
}
</script>
