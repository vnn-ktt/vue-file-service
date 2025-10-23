<template>
  <svg
      class="icon-user"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00F5FF" />
        <stop offset="100%" stop-color="#A855F7" />
      </linearGradient>
    </defs>

    <!-- Main user shape -->
    <circle
        cx="12"
        cy="8"
        r="4"
        :fill="gradientId"
        class="user-head"
    />

    <!-- Body -->
    <path
        d="M5 20C5 16.6863 7.68629 14 11 14H13C16.3137 14 19 16.6863 19 20V21H5V20Z"
        :fill="gradientId"
        class="user-body"
    />

    <!-- Security rings -->
    <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="url(#user-ring)"
        stroke-width="1"
        stroke-dasharray="4"
        class="security-ring"
    />

    <!-- Active indicator -->
    <circle
        cx="18"
        cy="6"
        r="1.5"
        fill="#00F5FF"
        class="active-indicator"
    />

    <!-- Additional gradient for rings -->
    <defs>
      <linearGradient id="user-ring" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00F5FF" stop-opacity="0.6" />
        <stop offset="50%" stop-color="#A855F7" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#00F5FF" stop-opacity="0.6" />
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

const gradientId = `user-gradient-${Math.random().toString(36).substr(2, 9)}`
</script>

<style scoped>
.icon-user {
  --neon-blue: #00F5FF;
  --neon-purple: #A855F7;
}

.user-head {
  filter: drop-shadow(0 0 4px var(--neon-blue));
  transition: all 0.3s ease;
}

.user-body {
  filter: drop-shadow(0 0 4px var(--neon-purple));
  transition: all 0.3s ease;
}

.icon-user:hover .user-head {
  filter: drop-shadow(0 0 8px var(--neon-blue));
}

.icon-user:hover .user-body {
  filter: drop-shadow(0 0 8px var(--neon-purple));
}

.security-ring {
  animation: rotateRing 4s linear infinite;
}

.active-indicator {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes rotateRing {
  0% {
    transform: rotate(0deg);
    stroke-dashoffset: 0;
  }
  100% {
    transform: rotate(360deg);
    stroke-dashoffset: -25;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
    filter: drop-shadow(0 0 4px var(--neon-blue));
  }
}

.icon-user {
  display: inline-block;
  vertical-align: middle;
}
</style>