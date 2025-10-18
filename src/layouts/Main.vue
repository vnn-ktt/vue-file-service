<template>
  <div class="min-h-screen bg-dark-900 relative overflow-hidden flex-1">
    <AnimatedBackground />
    <div class="relative z-10 min-h-screen">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedBackground from '@/components/effects/AnimatedBackground.vue';
</script>