<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="text-center max-w-6xl w-full">
      <!-- Main content grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Story card -->
        <CyberCard class="cyber-card p-6 transform hover:scale-105 transition-all duration-300">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4 cyber-glow">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-cyber font-bold text-neon-blue mb-4">OUR STORY</h3>
          </div>
          <p class="text-cyber-300 font-tech leading-relaxed">
            Founded in 2024, CyberCloud emerged from the need for truly secure,
            decentralized cloud storage. We believe your data should be yours alone -
            encrypted, distributed, and accessible only by you.
          </p>
          <div class="mt-6 grid grid-cols-2 gap-4">
            <div class="text-center">
              <div class="text-3xl font-cyber text-neon-pink mb-2">2024</div>
              <div class="text-cyber-400 text-sm">Founded</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-cyber text-neon-purple mb-2">99.9%</div>
              <div class="text-cyber-400 text-sm">Uptime</div>
            </div>
          </div>
        </CyberCard>

        <!-- Technology card -->
        <CyberCard class="cyber-card p-6 transform hover:scale-105 transition-all duration-300">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-neon-pink to-neon-blue rounded-full flex items-center justify-center mx-auto mb-4 cyber-glow">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
            </div>
            <h3 class="text-2xl font-cyber font-bold text-neon-pink mb-4">TECHNOLOGY</h3>
          </div>
          <div class="space-y-4">
            <div v-for="tech in technologies" :key="tech.name" class="flex items-center justify-between p-3 bg-cyber-800/50 rounded cyber-border">
              <span class="text-cyber-300 font-tech">{{ tech.name }}</span>
              <span class="text-neon-purple font-cyber text-sm">{{ tech.version }}</span>
            </div>
          </div>
        </CyberCard>
      </div>

      <!-- Team section -->
      <div class="mb-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CyberCard
              v-for="member in team"
              :key="member.id"
              class="cyber-card p-6 text-center transform hover:scale-105 transition-all duration-300 team-card"
          >
            <div class="w-20 h-20 mx-auto mb-4 relative">
              <div class="w-full h-full bg-gradient-to-br from-neon-blue to-neon-purple rounded-full cyber-glow"></div>
              <div class="absolute inset-0 flex items-center justify-center text-white font-cyber text-lg">
                {{ member.initials }}
              </div>
            </div>
            <h4 class="text-xl font-cyber font-bold text-neon-blue mb-2">{{ member.name }}</h4>
            <p class="text-cyber-400 font-tech text-sm mb-3">{{ member.role }}</p>
            <p class="text-cyber-300 text-sm leading-relaxed">{{ member.bio }}</p>
            <div class="mt-4 flex justify-center space-x-3">
              <span
                  v-for="skill in member.skills"
                  :key="skill"
                  class="px-2 py-1 bg-cyber-700 text-cyber-300 text-xs rounded cyber-border"
              >
                {{ skill }}
              </span>
            </div>
          </CyberCard>
        </div>
      </div>

      <!-- Features grid -->
      <div class="mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CyberCard
              v-for="feature in features"
              :key="feature.id"
              class="cyber-card p-6 text-center feature-card transform hover:scale-105 transition-all duration-300"
          >
            <div class="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center cyber-glow">
              <component :is="feature.icon" class="w-6 h-6 text-white" />
            </div>
            <h4 class="text-lg font-cyber font-bold text-neon-purple mb-3">{{ feature.title }}</h4>
            <p class="text-cyber-300 text-sm leading-relaxed">{{ feature.description }}</p>
          </CyberCard>
        </div>
      </div>

      <!-- CTA section -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <CyberButton
            to="/"
            :as="'router-link'"
            :icon-left="IconHome"
            :text="'back to home'"
            :size="'lg'"
            variant="glow"
        />
        <CyberButton
            to="/contact"
            :as="'router-link'"
            :icon-left="IconContact"
            :text="'contact us'"
            :size="'lg'"
            variant="danger"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconContact from '@/components/icons/IconContact.vue';
import CyberButton from '@/components/ui/CyberButton.vue';
import CyberCard from "@/components/ui/CyberCard.vue";

// Icons for features (you can replace with actual icon components)
const ShieldIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>`
}

const CloudIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
  </svg>`
}

const LockIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
  </svg>`
}

const BoltIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
  </svg>`
}

const technologies = ref([
  { name: 'Quantum Encryption', version: 'v2.4' },
  { name: 'Neural Compression', version: 'v1.8' },
  { name: 'Blockchain Storage', version: 'v3.1' },
  { name: 'AI Security', version: 'v2.0' }
])

const team = ref([
  {
    id: 1,
    name: 'ALEX RYDER',
    initials: 'AR',
    role: 'Lead Developer',
    bio: '10+ years in cybersecurity and distributed systems. Passionate about privacy-first solutions.',
    skills: ['Encryption', 'Blockchain', 'Rust']
  },
  {
    id: 2,
    name: 'MAYA CHEN',
    initials: 'MC',
    role: 'Security Architect',
    bio: 'Former white-hat hacker. Specializes in quantum-resistant cryptography and zero-trust architectures.',
    skills: ['Cryptography', 'Pentesting', 'Go']
  },
  {
    id: 3,
    name: 'KAI TANAKA',
    initials: 'KT',
    role: 'Cloud Engineer',
    bio: 'Expert in distributed systems and edge computing. Built scalable infrastructure for millions of users.',
    skills: ['Kubernetes', 'DevOps', 'Python']
  }
])

const features = ref([
  {
    id: 1,
    title: 'Military Encryption',
    description: 'End-to-end quantum-resistant encryption for maximum security.',
    icon: ShieldIcon
  },
  {
    id: 2,
    title: 'Global Network',
    description: 'Distributed across 50+ locations worldwide for optimal performance.',
    icon: CloudIcon
  },
  {
    id: 3,
    title: 'Zero Knowledge',
    description: 'We never see your data. Only you hold the encryption keys.',
    icon: LockIcon
  },
  {
    id: 4,
    title: 'Lightning Fast',
    description: 'Multi-threaded transfers with intelligent caching and compression.',
    icon: BoltIcon
  }
])
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

.cyber-glow {
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.5),
  inset 0 0 20px rgba(0, 245, 255, 0.1);
}

.cyber-text-glow {
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.8),
  0 0 20px rgba(0, 245, 255, 0.6);
}

.cyber-border {
  border: 1px solid rgba(0, 245, 255, 0.3);
}

@keyframes orbit-slow {
  0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
}

@keyframes orbit-fast {
  0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
}

@keyframes orbit-medium {
  0% { transform: rotate(0deg) translateX(25px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(25px) rotate(-360deg); }
}

.animate-orbit-slow {
  animation: orbit-slow 6s linear infinite;
}

.animate-orbit-fast {
  animation: orbit-fast 3s linear infinite;
}

.animate-orbit-medium {
  animation: orbit-medium 4s linear infinite;
}

.typing-animation {
  overflow: hidden;
  border-right: 2px solid #a855f7;
  white-space: nowrap;
  margin: 0 auto;
  animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;
  animation-fill-mode: both;
}

@keyframes typing {
  from { width: 0; }
  to { width: 550px; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: #a855f7; }
}

@media (max-width: 768px) {
  .typing-animation {
    animation: typing-mobile 2s steps(40, end), blink-caret 0.75s step-end infinite;
  }

  @keyframes typing-mobile {
    from { width: 0; }
    to { width: 320px; }
  }
}

.team-card:hover {
  transform: translateY(-5px) scale(1.05);
}

.feature-card:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
}
</style>