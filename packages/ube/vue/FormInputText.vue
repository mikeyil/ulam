<template>
  <div
    ref="wrapper"
    :style="{ width, height }"
    :class="['form-input', inputClasses]"
  >
    <!-- Search mode wrapper -->
    <template v-if="search">
      <form
        role="search"
        :aria-label="label"
        @submit.prevent="handleSubmit"
      >
        <input
          ref="input"
          :id="id"
          :type="type"
          :value="value"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="`form-input__field${inputClassName ? ` ${inputClassName}` : ''}`"
          @input="$emit('update:value', $event.target.value)"
        />
        <button
          v-if="clearable && value"
          type="button"
          :aria-label="clearAriaLabel"
          :class="`form-input__clear${clearButtonClassName ? ` ${clearButtonClassName}` : ''}`"
          @click="handleClear"
        >
          {{ clearIcon }}
        </button>
        <button
          v-if="showSubmit && !liveSearch"
          type="submit"
          :disabled="disabled"
          :aria-label="submitAriaLabel"
          class="form-input__submit"
        >
          🔍
        </button>
      </form>
    </template>

    <!-- Clear mode wrapper -->
    <template v-else-if="clearable">
      <input
        ref="input"
        :id="id"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="`form-input__field${inputClassName ? ` ${inputClassName}` : ''}`"
        @input="$emit('update:value', $event.target.value)"
      />
      <button
        v-if="value"
        type="button"
        :aria-label="clearAriaLabel"
        :class="`form-input__clear${clearButtonClassName ? ` ${clearButtonClassName}` : ''}`"
        @click="handleClear"
      >
        {{ clearIcon }}
      </button>
    </template>

    <!-- Plain mode -->
    <template v-else>
      <input
        ref="input"
        :id="id"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="`form-input__field${inputClassName ? ` ${inputClassName}` : ''}`"
        @input="$emit('update:value', $event.target.value)"
      />
    </template>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import '../../form-input-text.css'

export default {
  name: 'FormInputText',
  props: {
    id: String,
    type: { type: String, default: 'text' },
    value: String,
    search: { type: Boolean, default: false },
    liveSearch: { type: Boolean, default: false },
    showSubmit: { type: Boolean, default: true },
    clearable: { type: Boolean, default: false },
    placeholder: String,
    disabled: { type: Boolean, default: false },
    label: String,
    width: { type: String, default: '100%' },
    height: String,
    submitAriaLabel: { type: String, default: 'Search' },
    clearAriaLabel: { type: String, default: 'Clear' },
    clearIcon: { type: String, default: '✕' },
    wrapClassName: { type: String, default: '' },
    inputClassName: { type: String, default: '' },
    clearButtonClassName: { type: String, default: '' },
  },
  emits: ['update:value', 'submit', 'clear'],
  setup(props, { emit }) {
    const input = ref(null)
    const wrapper = ref(null)

    const inputClasses = computed(() => {
      const classes = ['form-input']
      if (props.search) {
        classes.push('form-input--search')
        if (props.liveSearch) classes.push('form-input--live')
      } else if (props.clearable) {
        classes.push('form-input--with-clear')
      }
      if (props.wrapClassName) classes.push(props.wrapClassName)
      return classes.join(' ')
    })

    const handleSubmit = () => {
      emit('submit', props.value)
    }

    const handleClear = () => {
      emit('clear')
      emit('update:value', '')
      input.value?.focus()
    }

    return {
      input,
      wrapper,
      inputClasses,
      handleSubmit,
      handleClear,
    }
  },
}
</script>
