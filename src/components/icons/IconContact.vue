<template>
  <svg
      class="icon-contact"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Внешний круг с градиентом -->
    <circle
        cx="12"
        cy="12"
        r="10"
        :fill="gradientId"
        class="icon-glow"
    />

    <!-- Внутренние элементы -->
    <path
        d="M8 9C8 7.89543 8.89543 7 10 7H14C15.1046 7 16 7.89543 16 9V15C16 16.1046 15.1046 17 14 17H10C8.89543 17 8 16.1046 8 15V9Z"
        fill="white"
        fill-opacity="0.9"
    />

    <!-- Линии связи -->
    <path
        d="M10 10H14"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        class="neon-line"
    />
    <path
        d="M10 12H12"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        class="neon-line"
    />
    <path
        d="M10 14H13"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        class="neon-line"
    />

    <!-- Анимированные сигнальные точки -->
    <circle
        cx="18"
        cy="7"
        r="1.5"
        fill="#00F5FF"
        class="signal-dot"
    />
    <circle
        cx="20"
        cy="10"
        r="1"
        fill="#A855F7"
        class="signal-dot delay-300"
    />

    <!-- Декоративные элементы -->
    <path
        d="M6 6L8 8"
        stroke="#00F5FF"
        stroke-width="1.5"
        stroke-linecap="round"
        class="decorative-line"
    />
    <path
        d="M6 18L8 16"
        stroke="#A855F7"
        stroke-width="1.5"
        stroke-linecap="round"
        class="decorative-line delay-200"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string;
}

withDefaults(defineProps<Props>(), {
  size: 24
})

const gradientId = `contact-gradient-${Math.random().toString(36).substr(2, 9)}`
</script>

<style scoped>
.icon-contact {
  --neon-blue: #00F5FF;
  --neon-purple: #A855F7;
  --neon-pink: #EC4899;
}

.icon-glow {
  filter: drop-shadow(0 0 8px var(--neon-blue))
  drop-shadow(0 0 12px var(--neon-purple));
}

.neon-line {
  stroke: url(#contact-gradient);
  filter: drop-shadow(0 0 2px var(--neon-blue));
}

.signal-dot {
  animation: pulse 2s infinite;
}

.signal-dot.delay-300 {
  animation-delay: 0.3s;
}

.decorative-line {
  animation: drawLine 3s ease-in-out infinite;
}

.decorative-line.delay-200 {
  animation-delay: 0.2s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes drawLine {
  0%, 100% {
    stroke-dasharray: 0 10;
    opacity: 0.3;
  }
  50% {
    stroke-dasharray: 10 0;
    opacity: 1;
  }
}

/* Градиент для SVG */
.icon-contact defs {
  position: absolute;
}

.icon-contact {
  display: inline-block;
  vertical-align: middle;
}
</style>

<style>
.icon-contact {
  --neon-blue: #00F5FF;
  --neon-purple: #A855F7;
}

.icon-contact defs {
  linearGradient {
    stop:first-child {
      stop-color: var(--neon-blue);
    }
    stop:last-child {
      stop-color: var(--neon-purple);
    }
  }
}
</style>