<template>
  <!-- Main content -->
  <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
    <div class="text-center max-w-2xl mx-auto">
      <!-- Error code with glitch -->
      <div class="mb-6 relative">
        <h1 class="text-6xl md:text-8xl font-cyber font-black text-red-500/80 relative">
          <span class="error-glitch" data-text="404">404</span>
        </h1>
        <div class="absolute top-0 left-0 w-full h-full bg-red-500/10 blur-xl animate-pulse"></div>
      </div>

      <!-- Error message -->
      <div class="mb-6">
        <h2 class="text-xl md:text-2xl font-cyber font-bold text-cyber-300 mb-3 cyber-glitch" data-text="SYSTEM_FAILURE">
          SYSTEM_FAILURE
        </h2>
        <p class="text-cyber-200 font-tech text-sm md:text-base">
          <span class="text-red-400">// ERR_0x194</span> - NODE_NOT_FOUND<br>
          <span class="text-cyber-300 text-xs">TERMINAL_OFFLINE_OR_CORRUPTED</span>
        </p>
      </div>

      <!-- Compact error visualization -->
      <div class="mb-8 max-w-lg mx-auto">
        <div class="cyber-card border-red-500/30 bg-red-500/5 p-3">
          <div class="flex items-center justify-center space-x-3 mb-3">
            <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div class="text-red-400 font-tech text-sm">DIAGNOSTICS_RUNNING</div>
            <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
          </div>

          <!-- Compact error console -->
          <div class="bg-dark-700 rounded p-3 font-mono text-xs text-green-400 text-left overflow-hidden">
            <div class="space-y-1">
              <div>> SCANNING: {{ $route.path }}</div>
              <div class="text-red-400">! NODE_NOT_FOUND</div>
              <div class="text-green-400">✓ NETWORK_STABLE</div>
              <div class="text-green-400">✓ AUTH_GRANTED</div>
              <div class="text-yellow-400">! TERMINAL_OFFLINE</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Compact navigation -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
        <RouterLink
            to="/"
            class="btn-cyber group relative overflow-hidden border-green-500/50 px-4 py-2 text-sm"
        >
            <span class="relative z-10 flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>HOME_TERMINAL</span>
            </span>
        </RouterLink>

        <button
            @click="reloadPage"
            class="btn-cyber group relative overflow-hidden border-red-500/50 px-4 py-2 text-sm"
        >
            <span class="relative z-10 flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>REBOOT_SYSTEM</span>
            </span>
        </button>
      </div>

      <!-- Compact emergency info -->
      <div class="cyber-card border-yellow-500/30 bg-yellow-500/5 p-3 max-w-md mx-auto">
        <div class="flex items-center justify-center space-x-2 mb-2">
          <div class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <h3 class="text-yellow-400 font-cyber font-bold text-sm">EMERGENCY_PROTOCOL</h3>
          <div class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
        </div>
        <p class="text-cyber-200 font-tech text-xs">
          CONTACT: <span class="text-yellow-400">admin@cybercloud.net</span>
        </p>
      </div>

      <!-- Error counter -->
      <div class="mt-6 text-cyber-400 font-tech text-xs">
        ERROR_ID: <span class="text-red-400">{{ errorId }}</span>
      </div>
    </div>
  </div>

  <!-- Emergency flash -->
  <div
      v-if="showEmergencyFlash"
      class="fixed inset-0 bg-red-500/20 pointer-events-none animate-pulse"
      style="animation-duration: 0.3s;"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showEmergencyFlash = ref(false)
const errorId = ref(generateErrorId())

// Generate random error ID
function generateErrorId(): string {
  return `0x${Math.random().toString(16).substr(2, 6).toUpperCase()}`
}

// Reload page function
function reloadPage(): void {
  showEmergencyFlash.value = true
  setTimeout(() => {
    window.location.reload()
  }, 300)
}

// Random emergency flashes
let flashInterval: number

onMounted(() => {
  flashInterval = setInterval(() => {
    if (Math.random() > 0.7) {
      showEmergencyFlash.value = true
      setTimeout(() => {
        showEmergencyFlash.value = false
      }, 100)
    }
  }, 3000)
})

onUnmounted(() => {
  clearInterval(flashInterval)
})
</script>

<style scoped>
/* Error glitch effect */
.error-glitch {
  position: relative;
  display: inline-block;
}

.error-glitch::before,
.error-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.error-glitch::before {
  animation: error-glitch-1 0.8s infinite linear alternate-reverse;
  color: #ff6b6b;
  z-index: -1;
}

.error-glitch::after {
  animation: error-glitch-2 1.2s infinite linear alternate-reverse;
  color: #4ecdc4;
  z-index: -2;
}

@keyframes error-glitch-1 {
  0%, 100% { transform: translate(0); clip-path: inset(0 0 0 0); }
  20% { transform: translate(-2px, 1px); clip-path: inset(20% 0 60% 0); }
  40% { transform: translate(-2px, -1px); clip-path: inset(40% 0 40% 0); }
  60% { transform: translate(2px, 1px); clip-path: inset(60% 0 20% 0); }
  80% { transform: translate(2px, -1px); clip-path: inset(10% 0 80% 0); }
}

@keyframes error-glitch-2 {
  0%, 100% { transform: translate(0); clip-path: inset(0 0 0 0); }
  25% { transform: translate(2px, 1px); clip-path: inset(30% 0 50% 0); }
  50% { transform: translate(2px, -1px); clip-path: inset(50% 0 30% 0); }
  75% { transform: translate(-2px, 1px); clip-path: inset(70% 0 10% 0); }
}

/* Cyber button styles */
.btn-cyber {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-radius: 0.375rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.btn-cyber:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
}

/* Cyber card styles */
.cyber-card {
  border: 1px solid;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.cyber-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 25px rgba(239, 68, 68, 0.2);
}

/* Custom pulse for error state */
@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(3);
    opacity: 0;
  }
}

.animate-pulse {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>