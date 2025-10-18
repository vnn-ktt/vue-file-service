<template>
  <div class="min-h-screen bg-dark-900 relative overflow-hidden">
    <!-- animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- floating particles -->
      <div
          v-for="i in 30"
          :key="i"
          class="absolute rounded-full bg-cyber-500/20"
          :class="particleClasses[i % particleClasses.length]"
          :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`
        }"
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

    <!-- main content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div class="text-center">
        <!-- animated logo/badge -->
        <div class="mb-8 flex justify-center">
          <div class="relative">
            <!-- main heading with glitch effect -->
            <h1 class="text-4xl md:text-8xl font-cyber font-bold mb-6 cyber-header relative">
              <span class="cyber-glitch" data-text="cybercloud">cybercloud</span>
            </h1>
            <!-- orbiting elements -->
            <div class="absolute -top-1 -right-2 w-6 h-6 bg-neon-pink rounded-full animate-orbit-slow"></div>
            <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-neon-blue rounded-full animate-orbit-fast"></div>
          </div>
        </div>

        <!-- subtitle with typing animation -->
        <div class="h-8 mb-8 flex justify-center items-center">
          <p class="text-cyber-200 font-tech text-xl md:text-3xl typing-animation">
            secure file service
          </p>
        </div>

        <!-- animated buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <RouterLink
              to="/login"
              class="btn-cyber group relative overflow-hidden"
          >
            <span class="relative z-10 flex items-center space-x-2">
              <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>sign in</span>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </RouterLink>

          <RouterLink
              to="/dashboard"
              class="btn-neon group relative overflow-hidden"
          >
            <span class="relative z-10 flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>storage</span>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </RouterLink>
        </div>

        <!-- animated stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div
              v-for="stat in stats"
              :key="stat.id"
              class="cyber-card text-center transform hover:scale-105 transition-transform duration-300"
          >
            <div class="text-2xl md:text-3xl font-cyber font-bold text-neon-purple mb-2 counting-animation" :data-target="stat.value">
              0
            </div>
            <div class="text-cyber-300 font-tech text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const particleClasses = [
  'w-2 h-2 animate-float',
  'w-3 h-3 animate-float',
  'w-1 h-1 animate-float',
  'w-4 h-4 animate-pulse-glow'
]

const stats = ref([
  { id: 1, label: 'files', value: 1024 },
  { id: 2, label: 'active users', value: 256 },
  { id: 3, label: 'uptime %', value: 999 },
  { id: 4, label: 'encryption', value: 256 }
])

onMounted(() => {
  const counters = document.querySelectorAll('.counting-animation')
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || '0')
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += step
      if (current < target) {
        counter.textContent = Math.ceil(current).toString()
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target.toString()
      }
    }

    setTimeout(updateCounter, 1000)
  })
})
</script>

<style scoped>
@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@keyframes orbit-slow {
  0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
}

@keyframes orbit-fast {
  0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
}

.animate-scan {
  animation: scan 3s linear infinite;
}

.animate-orbit-slow {
  animation: orbit-slow 6s linear infinite;
}

.animate-orbit-fast {
  animation: orbit-fast 3s linear infinite;
}

.typing-animation {
  overflow: hidden;
  border-right: 2px solid #a855f7;
  white-space: nowrap;
  margin: 0 auto;
  animation: typing 1.5s steps(40, end), blink-caret 0.75s step-end infinite;
  animation-fill-mode: both;
}

@keyframes typing {
  from { width: 0; }
  to { width: 310px; }
}

@media (max-width: 768px) {
  .typing-animation {
    animation: typing-mobile 1.5s steps(40, end), blink-caret 0.75s step-end infinite;
  }
  @keyframes typing-mobile {
    from { width: 0; }
    to { width: 210px; }
  }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: #a855f7; }
}

.grid-bg {
  background-image:
      linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

.cyber-glitch {
  position: relative;
  display: inline-block;
  color: #00ffea;
  text-shadow: 2px 2px 0 #ff00ff, -2px -2px 0 #00ffff;
}

.cyber-glitch::before,
.cyber-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

.cyber-glitch::before {
  color: #ff00ff;
  animation: glitch-1 1s infinite linear alternate-reverse;
  z-index: -1;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.cyber-glitch::after {
  color: #00ffff;
  animation: glitch-2 1s infinite linear alternate-reverse;
  z-index: -2;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, 2px); }
  80% { transform: translate(-2px, -2px); }
}
</style>