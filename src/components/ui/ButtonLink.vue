<template>
  <component
      :is="tag"
      :to="!isExternal ? to : undefined"
      :href="isExternal ? href : undefined"
      :target="isExternal ? '_blank' : undefined"
      class="cyber-button group relative overflow-hidden"
      :class="[
      variantClasses[variant],
      sizeClasses[size],
      layoutClasses[layout],
      { 'justify-center': layout === 'center' },
      { 'cursor-pointer': !disabled },
      { 'opacity-50 cursor-not-allowed': disabled },
      { 'animate-pulse': loading }
    ]"
      :disabled="disabled || loading"
      @click="handleClick"
  >
    <!-- Loading spinner -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <div class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Left icon -->
    <div v-if="iconLeft && !loading" class="flex items-center">
      <component :is="iconLeft" class="flex-shrink-0" :class="iconSizeClasses[size]" />
    </div>

    <!-- Text content -->
    <span v-if="($slots.default || text) && !loading"
          class="relative z-10 flex items-center space-x-2"
          :class="textSizeClasses[size]">
      <slot>{{ text }}</slot>
    </span>

    <!-- Right icon -->
    <div v-if="iconRight && !loading" class="flex items-center">
      <component :is="iconRight" class="flex-shrink-0" :class="iconSizeClasses[size]" />
    </div>

    <!-- Badge -->
    <span v-if="badge && !loading"
          class="badge"
          :class="badgeVariantClasses[badgeVariant]">
      {{ badge }}
    </span>

    <!-- Hover effects -->
    <div v-if="variant === 'cyber' && !loading" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    <div v-if="variant === 'neon' && !loading" class="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div v-if="variant === 'matrix' && !loading" class="absolute inset-0 bg-gradient-to-b from-green-400/10 via-transparent to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div v-if="variant === 'glow' && !loading" class="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>

    <!-- Pulse effect for warning and alert -->
    <div v-if="(variant === 'warning' || variant === 'alert') && !loading"
         class="absolute inset-0 rounded-lg animate-pulse opacity-20"
         :class="variant === 'warning' ? 'bg-yellow-400' : 'bg-red-400'"></div>
  </component>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'

interface Props {
  // Content
  text?: string
  iconLeft?: Component
  iconRight?: Component
  badge?: string | number
  badgeVariant?: 'default' | 'success' | 'warning' | 'error'

  // Styling
  variant?: 'cyber' | 'neon' | 'danger' | 'success' | 'warning' | 'info' | 'ghost' | 'matrix' | 'glow' | 'alert'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  layout?: 'left' | 'center' | 'right'
  disabled?: boolean
  loading?: boolean

  // Navigation
  to?: string
  href?: string
  isExternal?: boolean

  // Behavior
  as?: 'button' | 'link' | 'router-link'
}

withDefaults(defineProps<Props>(), {
  variant: 'cyber',
  size: 'md',
  layout: 'center',
  disabled: false,
  loading: false,
  isExternal: false,
  as: 'router-link',
  badgeVariant: 'default'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Determine component tag
const tag = computed(() => {
  if (props.as === 'button') return 'button'
  if (props.as === 'link' || props.isExternal) return 'a'
  return 'RouterLink'
})

const variantClasses = {
  cyber: 'btn-cyber border-cyber-500/50 hover:border-cyber-400 text-cyber-300',
  neon: 'btn-neon border-neon-purple/50 hover:border-neon-purple text-neon-purple',
  danger: 'btn-danger border-red-500/50 hover:border-red-400 text-red-400',
  success: 'btn-success border-green-500/50 hover:border-green-400 text-green-400',
  warning: 'btn-warning border-yellow-500/50 hover:border-yellow-400 text-yellow-400',
  info: 'btn-info border-blue-500/50 hover:border-blue-400 text-blue-400',
  ghost: 'btn-ghost border-gray-500/30 hover:border-gray-400 text-gray-400 hover:bg-gray-500/10',
  matrix: 'btn-matrix border-green-400/50 hover:border-green-300 text-green-400 font-mono',
  glow: 'btn-glow border-cyan-400/50 hover:border-cyan-300 text-cyan-300',
  alert: 'btn-alert border-red-600/60 hover:border-red-500 text-red-500 animate-pulse-slow'
}

const sizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
}

const layoutClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end'
}

const iconSizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7'
}

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
}

const badgeVariantClasses = {
  default: 'bg-gray-500/50 text-gray-200',
  success: 'bg-green-500/50 text-green-200',
  warning: 'bg-yellow-500/50 text-yellow-200',
  error: 'bg-red-500/50 text-red-200'
}

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.cyber-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid;
  border-radius: 0.375rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  font-family: 'Cyber', monospace;
  position: relative;
}

.cyber-button:not(.cursor-not-allowed):hover {
  transform: translateY(-2px);
}

.btn-cyber:hover {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}

.btn-neon:hover {
  box-shadow: 0 0 25px rgba(192, 132, 252, 0.4);
}

.btn-danger:hover {
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
}

.btn-success:hover {
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

.btn-warning:hover {
  box-shadow: 0 0 20px rgba(234, 179, 8, 0.3);
}

.btn-info:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.btn-ghost:hover {
  box-shadow: 0 0 15px rgba(156, 163, 175, 0.2);
}

.btn-matrix:hover {
  box-shadow: 0 0 25px rgba(34, 197, 94, 0.4);
  text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
}

.btn-glow:hover {
  box-shadow: 0 0 30px rgba(34, 211, 238, 0.4);
}

.btn-alert:hover {
  box-shadow: 0 0 25px rgba(239, 68, 68, 0.5);
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  padding: 2px 6px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1;
  min-width: 1.25rem;
  text-align: center;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse-slow {
  animation: pulse-slow 2s ease-in-out infinite;
}
</style>