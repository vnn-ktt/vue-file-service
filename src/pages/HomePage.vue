<template>
  <div class="min-h-screen flex items-center justify-center p-4">
      <div class="text-center">
        <!-- animated logo/badge -->
        <div class="mb-8 flex justify-center">
          <div class="relative">
            <!-- main heading with glitch effect -->
            <h1 class="text-4xl md:text-8xl font-cyber font-bold mb-6 cyber-heading relative">
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
            future's file service
          </p>
        </div>

        <!-- animated buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <CyberButton
              to="/login"
              :as="'router-link'"
              :icon-left="IconLogin"
              :text="'sign in'"
              :size="'lg'"
              variant="cyber"
          />
          <CyberButton
              to="/register"
              :as="'router-link'"
              :icon-left="IconRegister"
              :text="'sign up'"
              :size="'lg'"
              variant="cyber"
          />
        </div>

        <!-- animated stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <CyberCard
              v-for="stat in stats"
              :key="stat.id"
              class="cyber-card text-center transform hover:scale-105 transition-transform duration-300"
          >
            <div class="text-2xl md:text-3xl font-cyber font-bold text-neon-purple mb-2 counting-animation" :data-target="stat.value">
              0
            </div>
            <div class="text-cyber-300 font-tech text-sm">{{ stat.label }}</div>
          </CyberCard>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IconLogin from '@/components/icons/IconLogin.vue';
import IconRegister from '@/components/icons/IconRegister.vue';
import CyberButton from '@/components/ui/CyberButton.vue';
import CyberCard from "@/components/ui/CyberCard.vue";

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
.cyber-heading {
  background: linear-gradient(to right, var(--neon-blue), var(--neon-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Orbitron', monospace;
  font-weight: 900;
  letter-spacing: 0.1em;
}
@keyframes orbit-slow {
  0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
}
@keyframes orbit-fast {
  0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
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
  to { width: 350px; }
}
@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: #a855f7; }
}
@media (max-width: 768px) {
  .typing-animation {
    animation: typing-mobile 1.5s steps(40, end), blink-caret 0.75s step-end infinite;
  }
  @keyframes typing-mobile {
    from { width: 0; }
    to { width: 240px; }
  }
}
</style>