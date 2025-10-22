<template>
  <div class="min-h-screen flex items-center justify-center bg-dark-900 p-4 overflow-hidden">
    <!-- Анимированный фон -->
    <div class="absolute inset-0 cyber-grid opacity-20"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-cyber-500/10 to-neon-purple/5"></div>

    <!-- Частицы -->
    <div class="absolute inset-0 particles"></div>

    <div class="cyber-card max-w-md w-full text-center relative z-10">
      <!-- Анимированный логотип -->
      <div class="relative mb-8">
        <div class="w-20 h-20 bg-gradient-to-br from-cyber-500 to-neon-purple rounded-full flex items-center justify-center mx-auto cyber-glow">
          <div class="absolute inset-0 rounded-full border-2 border-cyber-400 animate-ping"></div>
          <svg class="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>

        <!-- Кольца прогресса -->
        <div class="absolute -inset-4 border-4 border-cyber-500/30 rounded-full animate-spin-slow"></div>
        <div class="absolute -inset-6 border-2 border-neon-purple/40 rounded-full animate-spin-slow-reverse"></div>
      </div>

      <!-- Текст с анимацией -->
      <div class="space-y-4 mb-8">
        <h2 class="text-3xl font-cyber font-bold text-cyber-300 cyber-text-glow">
          <span class="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-cyber-500">TERMINATING SESSION...</span>
        </h2>

        <div class="text-cyber-200 font-tech space-y-2">
          <p class="animate-fade-in" style="animation-delay: 0.3s">Clearing secure credentials</p>
          <p class="animate-fade-in" style="animation-delay: 0.6s">Encrypting session data</p>
          <p class="animate-fade-in" style="animation-delay: 0.9s">Closing all connections</p>
        </div>
      </div>

      <!-- Прогресс бар -->
      <div class="mb-8">
        <div class="h-2 bg-dark-700 rounded-full overflow-hidden cyber-border">
          <div class="h-full bg-gradient-to-r from-cyber-500 to-neon-purple rounded-full progress-bar"></div>
        </div>
        <p class="text-cyber-400 text-sm mt-2 font-tech">Security protocols engaged</p>
      </div>

      <!-- Время и статус -->
      <div class="flex justify-between items-center mb-6 text-sm font-tech">
        <span class="text-cyber-400">Session ID: {{ sessionId }}</span>
        <span class="text-neon-purple cyber-glow">{{ timer }}s</span>
      </div>

      <!-- Альтернативные действия -->
      <div class="space-y-3">
        <RouterLink to="/" class="btn-cyber w-full cyber-hover">
          <span class="flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            RETURN TO HOMEPAGE
          </span>
        </RouterLink>

        <button @click="cancelLogout" class="btn-cyber-secondary w-full cyber-hover">
          CANCEL LOGOUT
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 9).toUpperCase()
}

const timer = ref(3)
const sessionId = ref(generateSessionId())
const countdown = ref<NodeJS.Timeout>()

const cancelLogout = () => {
  if (countdown.value) {
    clearInterval(countdown.value)
  }
  router.push('/dashboard')
}

onMounted(async () => {
  // Запускаем таймер
  countdown.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    }
  }, 1000)

  // Выполняем выход
  await logout()

  // Переход после завершения
  setTimeout(() => {
    if (countdown.value) {
      clearInterval(countdown.value)
    }
    router.push('/')
  }, 3000)
})

onUnmounted(() => {
  if (countdown.value) {
    clearInterval(countdown.value)
  }
})
</script>

<style scoped>
.cyber-grid {
  background-image:
      linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

.particles::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
      radial-gradient(circle at 20% 30%, rgba(0, 245, 255, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 40% 80%, rgba(0, 245, 255, 0.2) 1px, transparent 1px);
  background-size: 200px 200px, 300px 300px, 150px 150px;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(-100px, -100px) rotate(360deg); }
}

.cyber-glow {
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.5),
  inset 0 0 20px rgba(0, 245, 255, 0.1);
}

.cyber-text-glow {
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.8),
  0 0 20px rgba(0, 245, 255, 0.6),
  0 0 30px rgba(0, 245, 255, 0.4);
}

.cyber-border {
  border: 1px solid rgba(0, 245, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 245, 255, 0.2);
}

.cyber-hover {
  transition: all 0.3s ease;
}

.cyber-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 25px rgba(0, 245, 255, 0.6);
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

.animate-spin-slow-reverse {
  animation: spin 12s linear infinite reverse;
}

.animate-typing {
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: rgb(0, 245, 255) }
}

.animate-fade-in {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

.progress-bar {
  animation: progress 3s ease-in-out forwards;
  width: 0%;
}

@keyframes progress {
  0% { width: 0% }
  30% { width: 30% }
  60% { width: 70% }
  100% { width: 100% }
}

.btn-cyber-secondary {
  background: linear-gradient(45deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8));
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: rgb(148, 163, 184);
  padding: 12px 24px;
  border-radius: 4px;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}
</style>