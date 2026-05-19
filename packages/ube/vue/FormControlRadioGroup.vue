<template>
  <fieldset
    ref="wrapper"
    :aria-disabled="disabled ? 'true' : undefined"
    class="radio-group-wrapper"
  >
    <legend class="sr-only">{{ legend }}</legend>
    <div class="radio-group">
      <label v-for="opt in options" :key="opt.value" class="radio-control">
        <input
          type="radio"
          :name="name"
          :value="opt.value"
          :checked="value === opt.value"
          :disabled="disabled"
          @change="handleChange(opt.value)"
        />
        <span>{{ opt.label }}</span>
      </label>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'FormControlRadioGroup',
  props: {
    legend: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: [String, Number], default: null },
    options: {
      type: Array,
      required: true,
      validator: (v) => v.every((opt) => typeof opt.value !== 'undefined' && typeof opt.label === 'string'),
    },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:value'],
  methods: {
    handleChange(newValue) {
      if (!this.disabled) {
        this.$emit('update:value', newValue)
      }
    },
  },
}
</script>

<style scoped>
.radio-group-wrapper {
  border: none;
  padding: 0;
  margin: 0;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.radio-control {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.radio-control input[type='radio'] {
  cursor: pointer;
}

.radio-control input[type='radio']:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
