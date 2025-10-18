<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <!-- floating particles -->
    <div
        v-for="(particle, idx) in particles"
        :key="idx"
        class="absolute rounded-full bg-cyber-500/20"
        :class="particle.class"
        :style="particle.style"
    ></div>

    <!-- grid background -->
    <div class="absolute inset-0 opacity-10 grid-bg"></div>

    <!-- animated gradients -->
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-cyber-500/10 rounded-full blur-3xl animate-float"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl animate-float" style="animation-delay: 2s;"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl animate-pulse"></div>

    <!-- scanning lines effect -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-500/5 to-transparent animate-scan"></div>
  </div>
</template>

<script setup lang="ts">
interface ParticleStyle {
  left: string;
  top: string;
  animationDelay: string;
}

interface Particle {
  style: ParticleStyle;
  class: string | undefined;
}

const particleCount = 30;

const particleClasses = [
  'w-2 h-2 animate-float',
  'w-3 h-3 animate-float',
  'w-1 h-1 animate-float',
  'w-4 h-4 animate-pulse-glow'
];

const particles = Array.from({ length: particleCount }, (_, index): Particle => {
  const classIndex = index % particleClasses.length;

  return {
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`
    },
    class: particleClasses[classIndex]
  };
});
</script>

<style scoped>

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.1); }
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

.animate-scan {
  animation: scan 5s linear infinite;
}

.grid-bg {
  background-image:
      linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 1;
}
</style>