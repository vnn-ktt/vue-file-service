<template>
  <div
      class="cyber-card group relative overflow-hidden"
      :class="[
      variantClasses[variant],
      sizeClasses[size],
      glowClasses[variant],
      { 'cursor-pointer': !disabled && clickable },
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
      @click="handleClick"
  >
    <div
        v-if="glow && !disabled"
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
        :class="glowOverlayClasses[variant]"
    ></div>

    <div v-if="$slots.header || title" class="cyber-card-header" :class="headerClasses">
      <slot name="header">
        <div class="flex items-center justify-between">
          <h3 class="cyber-card-title" :class="titleSizeClasses[size]">
            {{ title }}
          </h3>
          <div v-if="$slots.headerAction" class="cyber-card-header-action">
            <slot name="headerAction" />
          </div>
        </div>
      </slot>
    </div>

    <div class="cyber-card-content" :class="contentPaddingClasses[size]">
      <slot />
    </div>

    <div v-if="$slots.footer" class="cyber-card-footer" :class="footerClasses">
      <slot name="footer" />
    </div>

    <div
        v-if="gridOverlay"
        class="absolute inset-0 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-300"
        :class="gridPatternClasses[variant]"
    ></div>

    <div
        v-if="animatedBorder && !disabled"
        class="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';

interface Props {
  title?: string
  variant?: 'default' | 'cyber' | 'neon' | 'danger' | 'success' | 'warning' | 'info' | 'matrix' | 'glow' | 'alert'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  clickable?: boolean
  glow?: boolean
  gridOverlay?: boolean
  animatedBorder?: boolean
  headerClass?: string
  footerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  clickable: false,
  glow: true,
  gridOverlay: true,
  animatedBorder: true
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  default: 'border-gray-500/30 bg-gray-500/5 text-gray-200',
  cyber: 'border-cyber-500/30 bg-cyber-500/5 text-cyber-300',
  neon: 'border-neon-purple/30 bg-neon-purple/5 text-neon-purple',
  danger: 'border-red-500/30 bg-red-500/5 text-red-400',
  success: 'border-green-500/30 bg-green-500/5 text-green-400',
  warning: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400',
  info: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
  matrix: 'border-green-400/30 bg-green-400/5 text-green-400 font-mono',
  glow: 'border-cyan-400/30 bg-cyan-400/5 text-cyan-300',
  alert: 'border-red-600/40 bg-red-600/10 text-red-500'
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl'
}

const glowClasses: Record<NonNullable<Props['variant']>, string> = {
  default: 'hover:shadow-gray-500/10',
  cyber: 'hover:shadow-cyber-500/20',
  neon: 'hover:shadow-neon-purple/30',
  danger: 'hover:shadow-red-500/20',
  success: 'hover:shadow-green-500/20',
  warning: 'hover:shadow-yellow-500/20',
  info: 'hover:shadow-blue-500/20',
  matrix: 'hover:shadow-green-400/30',
  glow: 'hover:shadow-cyan-400/30',
  alert: 'hover:shadow-red-600/30'
}

const glowOverlayClasses: Record<NonNullable<Props['variant']>, string> = {
  default: 'bg-gradient-to-br from-gray-400/10 to-gray-600/10',
  cyber: 'bg-gradient-to-br from-cyber-500/10 to-purple-600/10',
  neon: 'bg-gradient-to-br from-neon-purple/15 to-pink-600/15',
  danger: 'bg-gradient-to-br from-red-500/10 to-orange-600/10',
  success: 'bg-gradient-to-br from-green-500/10 to-emerald-600/10',
  warning: 'bg-gradient-to-br from-yellow-500/10 to-amber-600/10',
  info: 'bg-gradient-to-br from-blue-500/10 to-cyan-600/10',
  matrix: 'bg-gradient-to-br from-green-400/10 to-green-600/10',
  glow: 'bg-gradient-to-br from-cyan-400/10 to-blue-600/10',
  alert: 'bg-gradient-to-br from-red-600/15 to-red-800/15'
}

const gridPatternClasses: Record<NonNullable<Props['variant']>, string> = {
  default: 'bg-grid-gray-500',
  cyber: 'bg-grid-cyber-500',
  neon: 'bg-grid-neon-purple',
  danger: 'bg-grid-red-500',
  success: 'bg-grid-green-500',
  warning: 'bg-grid-yellow-500',
  info: 'bg-grid-blue-500',
  matrix: 'bg-grid-green-400',
  glow: 'bg-grid-cyan-400',
  alert: 'bg-grid-red-600'
}

const titleSizeClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

const contentPaddingClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
}

const headerClasses = computed(() => [
  'border-b border-current/20',
  props.size === 'sm' ? 'p-3 pb-2' : 'p-4 pb-3'
])

const footerClasses = computed(() => [
  'border-t border-current/20',
  props.size === 'sm' ? 'p-3 pt-2' : 'p-4 pt-3'
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
.cyber-card {
  border: 1px solid;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
}

.cyber-card:hover:not(.cursor-not-allowed) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
}

.cyber-card-title {
  font-family: 'Cyber', monospace;
  font-weight: bold;
  margin: 0;
}

.bg-grid-cyber-500 {
  background-image: linear-gradient(currentColor 1px, transparent 1px),
  linear-gradient(90deg, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

.bg-grid-neon-purple {
  background-image: linear-gradient(currentColor 1px, transparent 1px),
  linear-gradient(90deg, currentColor 1px, transparent 1px);
  background-size: 25px 25px;
}

.bg-grid-gray-500 { background-image: linear-gradient(#6b7280 1px, transparent 1px), linear-gradient(90deg, #6b7280 1px, transparent 1px); }
.bg-grid-red-500 { background-image: linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px); }
.bg-grid-green-500 { background-image: linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px); }
.bg-grid-yellow-500 { background-image: linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px); }
.bg-grid-blue-500 { background-image: linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px); }
.bg-grid-green-400 { background-image: linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px); }
.bg-grid-cyan-400 { background-image: linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px); }
.bg-grid-red-600 { background-image: linear-gradient(#dc2626 1px, transparent 1px), linear-gradient(90deg, #dc2626 1px, transparent 1px); }
</style>