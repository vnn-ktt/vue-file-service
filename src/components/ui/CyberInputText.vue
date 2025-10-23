<template>
  <div class="w-full">
    <label v-if="label" class="block text-cyber-300 font-tech mb-3">
      <span class="flex items-center space-x-2">
        <component
            v-if="icon"
            :is="icon"
            class="w-4 h-4 flex-shrink-0"
        />
        <span>{{ label }}</span>
        <span v-if="required" class="text-neon-pink">*</span>
      </span>
    </label>

    <div class="relative">
      <input
          :value="modelValue"
          :type="inputType"
          :placeholder="placeholder"
          :disabled="disabled"
          :required="required"
          class="cyber-input"
          :class="[
          inputClasses,
          {
            'border-neon-pink': error,
            'border-green-400': success,
            'opacity-50 cursor-not-allowed': disabled,
            'pr-10': showPasswordToggle || $slots.right
          }
        ]"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
      >

      <div class="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
        <!-- Success indicator -->
        <div
            v-if="success && !error"
            class="text-green-400"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <!-- Error indicator -->
        <div
            v-if="error && !success"
            class="text-neon-pink"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <!-- Password toggle -->
        <button
            v-if="showPasswordToggle && type === 'password'"
            type="button"
            class="text-cyber-400 hover:text-cyber-300 transition-colors focus:outline-none"
            @click="togglePasswordVisibility"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="passwordVisible" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path v-if="passwordVisible" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            <path v-if="!passwordVisible" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </button>

        <!-- Custom right slot -->
        <slot name="right" />
      </div>

      <div
          v-if="loading"
          class="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        <div class="animate-spin rounded-full h-4 w-4 border-2 border-cyber-400 border-t-transparent"></div>
      </div>
    </div>

    <p
        v-if="helperText && !error"
        class="mt-2 text-cyber-400 font-tech text-sm"
    >
      {{ helperText }}
    </p>

    <p
        v-if="error"
        class="mt-2 text-neon-pink font-tech text-sm flex items-center space-x-1"
    >
      <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ error }}</span>
    </p>

    <div
        v-if="showCounter && maxLength"
        class="mt-2 flex justify-between text-cyber-400 font-tech text-sm"
    >
      <span>{{ counterText }}</span>
      <span :class="counterColor">
        {{ modelValue?.length || 0 }}/{{ maxLength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed, ref } from 'vue'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  icon?: Component
  error?: string
  success?: boolean
  helperText?: string
  disabled?: boolean
  loading?: boolean
  required?: boolean
  showPasswordToggle?: boolean
  showCounter?: boolean
  maxLength?: number
  variant?: 'default' | 'cyber' | 'neon' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  variant: 'default',
  size: 'md',
  showPasswordToggle: false,
  showCounter: false,
  required: false,
  disabled: false,
  loading: false,
  success: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
}>()

const passwordVisible = ref(false)

const inputType = computed(() => {
  if (props.type === 'password' && passwordVisible.value) {
    return 'text'
  }
  return props.type
})

const inputClasses = computed(() => {
  const classes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-4 py-4 text-lg'
  }

  const variants = {
    default: '',
    cyber: 'border-cyber-500/30 focus:border-cyber-400',
    neon: 'border-neon-purple/30 focus:border-neon-purple',
    success: 'border-green-500/30 focus:border-green-400',
    warning: 'border-yellow-500/30 focus:border-yellow-400',
    error: 'border-red-500/30 focus:border-red-400'
  }

  return `${classes[props.size]} ${variants[props.variant]}`
})

const counterText = computed(() => {
  const length = props.modelValue?.toString().length || 0
  if (length === 0) return 'Start typing...'
  if (length < (props.maxLength || 0) * 0.7) return 'Good'
  if (length < (props.maxLength || 0) * 0.9) return 'Almost full'
  return 'Maximum reached'
})

const counterColor = computed(() => {
  const length = props.modelValue?.toString().length || 0
  const max = props.maxLength || 0

  if (length === 0) return 'text-cyber-400'
  if (length < max * 0.7) return 'text-green-400'
  if (length < max * 0.9) return 'text-yellow-400'
  return 'text-red-400'
})

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<style scoped>
.cyber-input {
  @apply w-full bg-dark-700 border border-cyber-500/30 rounded-lg
  text-white font-tech placeholder-gray-400 transition-all duration-300
  focus:outline-none focus:ring-2 focus:ring-cyber-500/50
  focus:bg-dark-600 hover:border-cyber-400;
}
</style>