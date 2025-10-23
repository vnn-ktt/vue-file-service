<template>
  <form
      class="cyber-form"
      :class="[
      layoutClasses[layout],
      spacingClasses[spacing],
      { 'animate-pulse': loading }
    ]"
      @submit.prevent="handleSubmit"
  >
    <!-- form header -->
    <div v-if="$slots.header || title" class="cyber-form-header">
      <slot name="header">
        <h3 v-if="title" class="cyber-form-title" :class="titleSizeClasses[titleSize]">
          {{ title }}
        </h3>
        <p v-if="description" class="cyber-form-description">
          {{ description }}
        </p>
      </slot>
    </div>

    <!-- form content -->
    <div class="cyber-form-content">
      <slot />
    </div>

    <!-- form actions -->
    <div v-if="$slots.actions || showDefaultActions" class="cyber-form-actions">
      <slot name="actions">
        <div class="flex space-x-4" :class="actionsLayoutClasses[actionsLayout]">
          <CyberButton
              v-if="showSubmit"
              :type="submitType"
              :variant="submitVariant"
              :size="submitSize"
              :loading="loading"
              :disabled="disabled || loading"
              class="flex-1"
          >
            {{ submitText }}
          </CyberButton>

          <CyberButton
              v-if="showCancel"
              type="button"
              variant="ghost"
              :size="submitSize"
              :disabled="loading"
              @click="handleCancel"
          >
            {{ cancelText }}
          </CyberButton>
        </div>
      </slot>
    </div>

    <!-- form footer -->
    <div v-if="$slots.footer" class="cyber-form-footer">
      <slot name="footer" />
    </div>

    <!-- global form error -->
    <div
        v-if="error"
        class="cyber-form-error"
    >
      <div class="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
        <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-red-400 font-tech text-sm">{{ error }}</p>
      </div>
    </div>

    <!-- form success message -->
    <div
        v-if="success"
        class="cyber-form-success"
    >
      <div class="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-green-400 font-tech text-sm">{{ success }}</p>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import CyberButton from './CyberButton.vue'

interface Props {
  title?: string
  description?: string
  titleSize?: 'sm' | 'md' | 'lg' | 'xl'
  layout?: 'vertical' | 'horizontal' | 'grid'
  spacing?: 'sm' | 'md' | 'lg'
  actionsLayout?: 'left' | 'center' | 'right' | 'space-between'
  loading?: boolean
  disabled?: boolean
  error?: string | null | undefined
  success?: string
  showSubmit?: boolean
  showCancel?: boolean
  submitText?: string
  cancelText?: string
  submitVariant?: 'cyber' | 'neon' | 'success' | 'warning' | 'danger'
  submitSize?: 'sm' | 'md' | 'lg'
  submitType?: 'button' | 'submit' | 'reset'
  showDefaultActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  titleSize: 'md',
  layout: 'vertical',
  spacing: 'md',
  actionsLayout: 'right',
  showSubmit: true,
  showCancel: false,
  submitText: 'Submit',
  cancelText: 'Cancel',
  submitVariant: 'cyber',
  submitSize: 'md',
  submitType: 'submit',
  showDefaultActions: true
})

const emit = defineEmits<{
  submit: [event: Event]
  cancel: []
  valid: []
  invalid: []
}>()

const layoutClasses = {
  vertical: 'flex flex-col',
  horizontal: 'flex flex-col md:flex-row md:space-x-6',
  grid: 'grid grid-cols-1 md:grid-cols-2 gap-6'
}

const spacingClasses = {
  sm: 'space-y-4',
  md: 'space-y-6',
  lg: 'space-y-8'
}

const titleSizeClasses = {
  sm: 'text-lg font-cyber font-bold text-cyber-300',
  md: 'text-xl font-cyber font-bold text-cyber-300',
  lg: 'text-2xl font-cyber font-bold text-cyber-300',
  xl: 'text-3xl font-cyber font-bold text-cyber-300'
}

const actionsLayoutClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  'space-between': 'justify-between'
}

const handleSubmit = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('submit', event)
  }
}

const handleCancel = () => {
  if (!props.loading) {
    emit('cancel')
  }
}
</script>

<style scoped>
.cyber-form {
  @apply w-full;
}

.cyber-form-header {
  @apply mb-6 text-center;
}

.cyber-form-title {
  @apply mb-2;
}

.cyber-form-description {
  @apply text-cyber-200 font-tech text-sm;
}

.cyber-form-content {
  @apply w-full;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cyber-form-actions {
  @apply mt-8;
}

.cyber-form-footer {
  @apply mt-6 pt-6 border-t border-cyber-500/20;
}

.cyber-form-error {
  @apply mt-6;
}

.cyber-form-success {
  @apply mt-6;
}
</style>