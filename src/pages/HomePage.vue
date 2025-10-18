<template>
  <div class="min-h-screen flex items-center justify-center p-4">
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
          <ButtonLink
              to="/login"
              :icon-left="IconLogin"
              :text="'sign in'"
              :size="'lg'"
              variant="neon"
          />
          <ButtonLink
              to="/register"
              :icon-left="IconRegister"
              :text="'sign up'"
              :size="'lg'"
              variant="neon"
          />
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IconLogin from '@/components/icons/IconLogin.vue';
import IconRegister from '@/components/icons/IconRegister.vue';
import ButtonLink from '@/components/ui/ButtonLink.vue';

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
  to { width: 310px; }
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
    to { width: 210px; }
  }
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