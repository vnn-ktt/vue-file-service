<template>
  <svg
      class="icon-home"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Градиентный фон -->
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00F5FF" />
        <stop offset="100%" stop-color="#A855F7" />
      </linearGradient>

      <!-- Свечение -->
      <filter :id="glowId" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Основная форма дома -->
    <path
        d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10Z"
        :fill="gradientId"
        :filter="`url(#${glowId})`"
        class="home-main"
    />

    <!-- Окна -->
    <rect
        x="7"
        y="11"
        width="2"
        height="2"
        fill="#00F5FF"
        class="window-pulse"
    />
    <rect
        x="15"
        y="11"
        width="2"
        height="2"
        fill="#A855F7"
        class="window-pulse delay-500"
    />

    <!-- Дверь -->
    <rect
        x="11"
        y="13"
        width="2"
        height="4"
        fill="#1E293B"
        class="door"
    />

    <!-- Технологические линии -->
    <path
        d="M12 3V7"
        stroke="url(#home-lines)"
        stroke-width="1.5"
        stroke-linecap="round"
        class="tech-line"
    />
    <path
        d="M5 8L7 10"
        stroke="url(#home-lines)"
        stroke-width="1"
        stroke-linecap="round"
        class="tech-line delay-200"
    />
    <path
        d="M19 8L17 10"
        stroke="url(#home-lines)"
        stroke-width="1"
        stroke-linecap="round"
        class="tech-line delay-400"
    />

    <!-- Сигнальная точка на крыше -->
    <circle
        cx="12"
        cy="7"
        r="1"
        fill="#00F5FF"
        class="roof-beacon"
    />

    <!-- Дополнительные градиенты для линий -->
    <defs>
      <linearGradient id="home-lines" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00F5FF" />
        <stop offset="50%" stop-color="#A855F7" />
        <stop offset="100%" stop-color="#00F5FF" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string;
}

withDefaults(defineProps<Props>(), {
  size: 24
})

const gradientId = `home-gradient-${Math.random().toString(36).substr(2, 9)}`
const glowId = `home-glow-${Math.random().toString(36).substr(2, 9)}`
</script>

<style scoped>
.icon-home {
  --neon-blue: #00F5FF;
  --neon-purple: #A855F7;
}

.home-main {
  transition: all 0.3s ease;
}

.icon-home:hover .home-main {
  filter: drop-shadow(0 0 12px var(--neon-blue))
  drop-shadow(0 0 20px var(--neon-purple));
}

.window-pulse {
  animation: windowGlow 2s ease-in-out infinite;
}

.window-pulse.delay-500 {
  animation-delay: 0.5s;
}

.door {
  transition: all 0.3s ease;
}

.icon-home:hover .door {
  fill: #374151;
}

.tech-line {
  animation: lineFlow 3s linear infinite;
  stroke-dasharray: 5;
}

.tech-line.delay-200 {
  animation-delay: 0.2s;
}

.tech-line.delay-400 {
  animation-delay: 0.4s;
}

.roof-beacon {
  animation: beaconPulse 1.5s ease-in-out infinite;
}

@keyframes windowGlow {
  0%, 100% {
    opacity: 0.6;
    filter: drop-shadow(0 0 2px currentColor);
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 6px currentColor);
  }
}

@keyframes lineFlow {
  0% {
    stroke-dashoffset: 10;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes beaconPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
    filter: drop-shadow(0 0 4px var(--neon-blue));
  }
}

.icon-home {
  display: inline-block;
  vertical-align: middle;
}
</style>