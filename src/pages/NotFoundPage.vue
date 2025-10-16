<template>
  <div class="min-h-screen bg-dark-900 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Matrix-like falling code -->
      <div
          v-for="i in 50"
          :key="i"
          class="absolute text-neon-green font-tech text-sm opacity-80 animate-fall"
          :style="{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 10}s`
        }"
      >
        {{ generateBinary() }}
      </div>

      <!-- Glitch grid -->
      <div class="absolute inset-0 grid-bg opacity-20"></div>

      <!-- Error pulses -->
      <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/10 rounded-full animate-ping"></div>
      <div class="absolute bottom-1/3 right-1/3 w-24 h-24 bg-red-500/10 rounded-full animate-ping" style="animation-delay: 1s;"></div>
      <div class="absolute top-2/3 left-1/2 w-20 h-20 bg-red-500/10 rounded-full animate-ping" style="animation-delay: 2s;"></div>

      <!-- Scanning error lines -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-scan-fast"></div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div class="text-center max-w-4xl mx-auto">
        <!-- Error code with glitch -->
        <div class="mb-8 relative">
          <h1 class="text-8xl md:text-9xl font-cyber font-black text-red-500/80 relative">
            <span class="error-glitch" data-text="404">404</span>
          </h1>
          <div class="absolute top-0 left-0 w-full h-full bg-red-500/10 blur-xl animate-pulse"></div>
        </div>

        <!-- Error message -->
        <div class="mb-8">
          <h2 class="text-3xl md:text-4xl font-cyber font-bold text-cyber-300 mb-4 cyber-glitch" data-text="SYSTEM FAILURE">
            sys failure
          </h2>
          <p class="text-cyber-200 font-tech text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            <span class="text-red-400">// err 0x194</span> - requested terminal not found<br>
            the node had not existed in network matrix yet
          </p>
        </div>

        <!-- Animated error visualization -->
        <div class="mb-12 max-w-2xl mx-auto">
          <div class="cyber-card border-red-500/30 bg-red-500/5">
            <div class="flex items-center justify-center space-x-4 mb-4">
              <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div class="text-red-400 font-tech">diagnostic was running</div>
              <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
            </div>

            <!-- Error visualization -->
            <div class="bg-dark-700 rounded-lg p-4 font-tech text-sm text-green-400 text-left overflow-hidden">
              <div class="animate-typing-fast">
                <div>> INITIATING SYSTEM SCAN...</div>
                <div>> SEARCHING FOR NODE: {{ $route.path }}</div>
                <div class="text-red-400">! ERROR: NODE NOT FOUND IN DATABASE</div>
                <div>> CHECKING NETWORK CONNECTIONS...</div>
                <div class="text-green-400">✓ NETWORK: STABLE</div>
                <div>> VERIFYING USER PERMISSIONS...</div>
                <div class="text-green-400">✓ PERMISSIONS: GRANTED</div>
                <div class="text-yellow-400">! WARNING: TERMINAL OFFLINE OR CORRUPTED</div>
                <div>> SUGGESTED ACTIONS:</div>
                <div class="ml-4">1. RETURN TO HOME TERMINAL</div>
                <div class="ml-4">2. CONTACT SYSTEM ADMINISTRATOR</div>
                <div class="ml-4">3. VERIFY NODE COORDINATES</div>
                <div>> SCAN COMPLETE</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation options -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          <RouterLink
              to="/"
              class="cyber-card group relative overflow-hidden border-green-500/30 hover:border-green-400 transition-all duration-300"
          >
            <div class="text-center">
              <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:animate-pulse-glow">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 class="text-green-400 font-cyber font-bold mb-2">HOME TERMINAL</h3>
              <p class="text-cyber-300 font-tech text-sm">Return to main interface</p>
            </div>
          </RouterLink>

          <RouterLink
              to="/dashboard"
              class="cyber-card group relative overflow-hidden border-cyber-500/30 hover:border-cyber-400 transition-all duration-300"
          >
            <div class="text-center">
              <div class="w-12 h-12 bg-cyber-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:animate-pulse-glow">
                <svg class="w-6 h-6 text-cyber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-cyber-400 font-cyber font-bold mb-2">DASHBOARD</h3>
              <p class="text-cyber-300 font-tech text-sm">Access control panel</p>
            </div>
          </RouterLink>

          <button
              @click="reloadPage"
              class="cyber-card group relative overflow-hidden border-neon-purple/30 hover:border-neon-purple transition-all duration-300 cursor-pointer"
          >
            <div class="text-center">
              <div class="w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:animate-pulse-glow">
                <svg class="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 class="text-neon-purple font-cyber font-bold mb-2">REBOOT SYSTEM</h3>
              <p class="text-cyber-300 font-tech text-sm">Refresh connection</p>
            </div>
          </button>
        </div>

        <!-- Emergency contact -->
        <div class="cyber-card border-yellow-500/30 bg-yellow-500/5 max-w-md mx-auto">
          <div class="flex items-center justify-center space-x-3 mb-3">
            <div class="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <h3 class="text-yellow-400 font-cyber font-bold">EMERGENCY PROTOCOL</h3>
            <div class="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
          </div>
          <p class="text-cyber-200 font-tech text-sm">
            If this error persists, contact system administrator:<br>
            <span class="text-yellow-400">admin@fileservice.cyber</span>
          </p>
        </div>

        <!-- Error counter -->
        <div class="mt-8 text-cyber-400 font-tech text-sm">
          ERROR LOGGED: <span class="text-red-400">{{ errorId }}</span>
        </div>
      </div>
    </div>

    <!-- Emergency flash -->
    <div
        v-if="showEmergencyFlash"
        class="fixed inset-0 bg-red-500/20 pointer-events-none animate-pulse"
        style="animation-duration: 0.3s;"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showEmergencyFlash = ref(false)
const errorId = ref(generateErrorId())

// Generate random binary strings for matrix effect
function generateBinary(): string {
  const length = Math.floor(Math.random() * 8) + 4
  return Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0').join('')
}

// Generate random error ID
function generateErrorId(): string {
  return `0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`
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
/* Matrix falling code animation */
@keyframes fall {
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.animate-fall {
  animation: fall linear infinite;
}

/* Fast scan animation */
@keyframes scan-fast {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.animate-scan-fast {
  animation: scan-fast 1s linear infinite;
}

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
  20% { transform: translate(-4px, 2px); clip-path: inset(20% 0 60% 0); }
  40% { transform: translate(-4px, -2px); clip-path: inset(40% 0 40% 0); }
  60% { transform: translate(4px, 2px); clip-path: inset(60% 0 20% 0); }
  80% { transform: translate(4px, -2px); clip-path: inset(10% 0 80% 0); }
}

@keyframes error-glitch-2 {
  0%, 100% { transform: translate(0); clip-path: inset(0 0 0 0); }
  25% { transform: translate(4px, 2px); clip-path: inset(30% 0 50% 0); }
  50% { transform: translate(4px, -2px); clip-path: inset(50% 0 30% 0); }
  75% { transform: translate(-4px, 2px); clip-path: inset(70% 0 10% 0); }
}

/* Fast typing animation */
@keyframes typing-fast {
  0% { width: 0; }
  100% { width: 100%; }
}

.animate-typing-fast {
  overflow: hidden;
  white-space: nowrap;
  animation: typing-fast 8s steps(100, end);
}

/* Grid background */
.grid-bg {
  background-image:
      linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
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

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>