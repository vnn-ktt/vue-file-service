<template>
  <component
      :is="tag"
      :to="!isExternal ? to : undefined"
      :href="isExternal ? href : undefined"
      :target="isExternal ? '_blank' : undefined"
      class="cyber-button group relative overflow-hidden"
      :class="[
      (uiBtnVariantClasses[variant] + ' ' + uiVariantClasses[variant]),
      uiSizeClasses[size],
      layoutClasses[layout],
      { 'justify-center': layout === 'center' },
      { 'cursor-pointer': !disabled },
      { 'opacity-50 cursor-not-allowed': disabled },
      { 'animate-pulse': loading }
      ]"
      :disabled="disabled || loading"
      @click="handleClick"
  >
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <div class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-if="iconLeft && !loading" class="flex items-center">
      <component :is="iconLeft" class="flex-shrink-0" :class="uiIconSizeClasses[size]" />
    </div>

    <span v-if="($slots.default || text) && !loading"
          class="relative z-10 flex items-center space-x-2"
          :class="uiTextSizeClasses[size]">
      <slot>{{ text }}</slot>
    </span>

    <div v-if="iconRight && !loading" class="flex items-center">
      <component :is="iconRight" class="flex-shrink-0" :class="uiIconSizeClasses[size]" />
    </div>

    <span v-if="badge && !loading"
          class="badge"
          :class="uiBadgeVariantClasses[badgeVariant]">
      {{ badge }}
    </span>
  </component>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import {
  uiVariantClasses,
  uiBtnVariantClasses,
  uiIconSizeClasses,
  uiSizeClasses,
  uiBadgeVariantClasses,
  uiTextSizeClasses
} from "@/components/const/styleVariants.ts";

interface Props {
  text?: string
  iconLeft?: Component
  iconRight?: Component
  badge?: string | number
  badgeVariant?: 'default' | 'success' | 'warning' | 'error'
  variant?: 'cyber' | 'neon' | 'danger' | 'success' | 'warning' | 'info' | 'ghost' | 'matrix' | 'glow' | 'alert'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  layout?: 'left' | 'center' | 'right'
  disabled?: boolean
  loading?: boolean
  to?: string
  href?: string
  isExternal?: boolean
  as?: 'button' | 'link' | 'router-link'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'cyber',
  size: 'md',
  layout: 'center',
  disabled: false,
  loading: false,
  isExternal: false,
  as: 'router-link',
  badgeVariant: 'default',
});

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const tag = computed(() => {
  if (props.as === 'button') return 'button'
  if (props.as === 'link' || props.isExternal) return 'a'
  return 'RouterLink'
})

const layoutClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end'
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
  top: 0;
  right: 0;
  padding: 2px 6px;
  border-radius: 9999px;
  font-size: 0.6rem;
  font-weight: bold;
  line-height: 1;
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