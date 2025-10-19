<template>
  <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-4xl mx-auto flex items-center flex-col">
      <!-- 404 -->
      <div class="mb-4 relative max-w-max">
        <div class="error-container">
          <h1 class="text-6xl md:text-9xl font-cyber font-black relative animate-element-in" style="--delay: 0.3s">
            <span class="error-digit animate-float" style="--delay: 0.3s" data-text="4">4</span>
            <span class="error-digit animate-float" style="--delay: 0.6s" data-text="0">0</span>
            <span class="error-digit animate-float" style="--delay: 0.9s" data-text="4">4</span>
          </h1>
        </div>
      </div>
      <!-- scanning -->
      <div class="scanning mt-2 text-center mb-4 cursor-pointer" @click="runDiagnostics">
        <div class="scan-section space-y-4 animate-element-in" style="--delay: 0.3s">
          <div>
            <div class="scan-progress">
              <div class="scan-bar" :style="{ width: scanProgress + '%' }"></div>
            </div>
            <div class="flex justify-between items-center text-sm mt-2 mb-2">
              <span class="text-cyber-400 font-tech">scanning_path: {{ $route.path }}</span>
            </div>
            <span class="text-red-400 font-tech">{{ Math.min(scanProgress, 100) }}%</span>
            <div class="text-cyan-400 text-xs mt-1 font-mono mb-2">
              {{ scanMessages[currentScanStep] }}
            </div>
          </div>
          <div class="mt-3 text-cyber-300">click here to rescan</div>
        </div>
      </div>
      <!-- cards -->
      <div class="cards grid grid-cols-1 md:grid-cols-2 gap-5">
        <CyberCard
            size="md"
            class="animate-element-in cursor-default"
            style="--delay: 0.3s"
            clickable
        >
          <template #header>
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 bg-cyber-500 rounded-full"></div>
              <h3 class="text-cyber-300 font-tech text-sm">navigation_schema</h3>
            </div>
          </template>

          <div class="space-y-4">
            <RouterLink
                to="/"
                class="nav-item group flex items-center space-x-3 p-3 rounded border border-cyber-500/30 hover:border-cyber-400 transition-all duration-300"
            >
              <div class="w-2 h-2 bg-cyber-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
              <div class="flex-1">
                <div class="text-cyber-300 font-tech text-sm group-hover:text-cyber-200">main_terminal</div>
                <div class="text-cyber-400/60 text-xs">root_directory</div>
              </div>
              <svg class="w-4 h-4 text-cyber-400 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>

            <button
                @click="goBack"
                class="nav-item group flex items-center space-x-3 p-3 rounded border border-cyber-500/30 hover:border-cyber-400  transition-all duration-300 w-full text-left"
            >
              <div class="w-2 h-2 bg-cyber-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
              <div class="flex-1">
                <div class="text-cyber-300 font-tech text-sm group-hover:text-cyber-200">previous_node</div>
                <div class="text-cyber-400/60 text-xs">backtrack_route</div>
              </div>
              <svg class="w-4 h-4 text-cyber-400 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </CyberCard>

        <CyberCard
            variant="warning"
            size="md"
            class="animate-element-in cursor-default"
            style="--delay: 0.3s"
            clickable
        >
          <template #header>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h3 class="text-yellow-400 font-tech text-sm">emergency_protocol</h3>
              </div>
            </div>
          </template>

          <div class="space-y-4">
            <div class="emergency-status">
              <div class="flex items-center justify-between mb-2">
                <span class="text-yellow-400 text-xs">sys_status: </span>
                <span class="text-red-400 text-xs font-bold" :class="{ 'animate-pulse': isScanning }">
                  {{ isScanning ? 'scanning' : 'critical' }}
                </span>
              </div>
              <div class="status-grid">
                <div class="status-item">
                  <div class="status-indicator" :class="getStatusClass('core')"></div>
                  <span class="text-xs">core</span>
                </div>
                <div class="status-item">
                  <div class="status-indicator" :class="getStatusClass('network')"></div>
                  <span class="text-xs">network</span>
                </div>
                <div class="status-item">
                  <div class="status-indicator" :class="getStatusClass('auth')"></div>
                  <span class="text-xs">auth</span>
                </div>
                <div class="status-item">
                  <div class="status-indicator" :class="getStatusClass('routing')"></div>
                  <span class="text-xs">routing</span>
                </div>
              </div>
            </div>

            <div class="contact-protocol">
              <div class="text-yellow-400 text-xs mb-2">contact_channel</div>
              <div class="text-cyan-400 text-sm bg-cyan-500/10 p-2 rounded border border-cyan-500/30 font-mono">
                admin@cybercloud.net
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex items-center justify-between text-xs">
              <span class="text-yellow-400">protocol: </span>
              <span class="text-green-400">e n c r y p t e d</span>
            </div>
          </template>
        </CyberCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CyberCard from '@/components/ui/CyberCard.vue'

const router = useRouter()
const scanProgress = ref(0)
const isScanning = ref(false)
const currentScanStep = ref(0)
const errorCode = ref(generateErrorCode())

const scanMessages = [
  "> initiating_path_scan...",
  "> checking_route_integrity...",
  "> verifying_access_permissions...",
  "> analyzing_network_topology...",
  ">>> found a problem with a resource path <<<"
]

function generateErrorCode(): string {
  return Math.random().toString(16).substring(2, 6).toUpperCase()
}

const runDiagnostics = () => {
  if (isScanning.value) return

  isScanning.value = true
  scanProgress.value = 0
  currentScanStep.value = 0
  errorCode.value = generateErrorCode()

  const interval = setInterval(() => {
    scanProgress.value += Math.random() * 12 + 3 // 3-15% за шаг

    // обновляем текущий шаг сканирования на основе прогресса
    currentScanStep.value = Math.floor((scanProgress.value / 100) * (scanMessages.length - 1))

    if (scanProgress.value >= 100) {
      scanProgress.value = 100
      clearInterval(interval)
      setTimeout(() => {
        isScanning.value = false
      }, 800)
    }
  }, 300)
}

const getStatusClass = (component: string) => {
  if (isScanning.value) {
    return 'bg-yellow-500 animate-pulse'
  }

  switch(component) {
    case 'core': return 'bg-green-500'
    case 'network': return 'bg-green-500'
    case 'auth': return 'bg-green-500'
    case 'routing': return 'bg-red-500 animate-pulse'
    default: return 'bg-gray-500'
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  runDiagnostics()
})
</script>

<style scoped>
.error-container {
  position: relative;
  display: flex;
  justify-content: center;
}

.error-digit {
  display: inline-block;
  background: linear-gradient(135deg, #ef4444, #dc2626, #b91c1c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 50px rgba(239, 68, 68, 0.5);
  margin: 0 0.1em;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
}

.scanning {
  width: 100%;
}

.scan-section {
  background: var(--dark-900);
  border: 1px solid var(--blood-100);
  border-radius: 8px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.scan-progress {
  width: 100%;
  height: 6px;
  background: rgba(239, 68, 68, 0.2);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.scan-bar {
  height: 100%;
  background: linear-gradient(90deg, #ef4444, #f87171, #ef4444);
  border-radius: 3px;
  transition: width 0.3s ease;
  position: relative;
}

@keyframes scan-shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.cards {
  min-width: 100%;
}

.nav-item {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.nav-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(168, 85, 247, 0.3);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}
</style>