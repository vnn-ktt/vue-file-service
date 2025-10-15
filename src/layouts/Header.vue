<template>
  <header class="bg-dark-800/90 backdrop-blur-md border-b border-cyber-500/30 sticky top-0 z-50 shadow-lg shadow-cyber-900/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink
            to="/"
            class="flex items-center space-x-3 group"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-cyber-500 to-neon-purple rounded-lg flex items-center justify-center shadow-lg animate-pulse-glow">
            <span class="text-white font-cyber font-black text-sm">FS</span>
          </div>
          <div>
            <span class="cyber-header text-2xl group-hover:animate-pulse">
              FileService
            </span>
            <div class="h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyber-500 to-neon-purple transition-all duration-500 rounded-full"></div>
          </div>
        </RouterLink>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <RouterLink
              to="/"
              class="text-gray-300 hover:text-cyber-300 transition-all duration-300 font-tech hover:animate-pulse border-b-2 border-transparent hover:border-cyber-400 pb-1"
              :class="{ 'text-cyber-300 border-cyber-400': $route.path === '/' }"
          >
            HOME
          </RouterLink>

          <RouterLink
              v-if="isAuthenticated"
              to="/dashboard"
              class="text-gray-300 hover:text-cyber-300 transition-all duration-300 font-tech hover:animate-pulse border-b-2 border-transparent hover:border-cyber-400 pb-1"
              :class="{ 'text-cyber-300 border-cyber-400': $route.path.startsWith('/dashboard') }"
          >
            DASHBOARD
          </RouterLink>

          <RouterLink
              to="/about"
              class="text-gray-300 hover:text-cyber-300 transition-all duration-300 font-tech hover:animate-pulse border-b-2 border-transparent hover:border-cyber-400 pb-1"
              :class="{ 'text-cyber-300 border-cyber-400': $route.path === '/about' }"
          >
            ABOUT
          </RouterLink>
        </nav>

        <!-- Auth buttons -->
        <div class="flex items-center space-x-4">
          <template v-if="isAuthenticated">
            <!-- User menu -->
            <div class="flex items-center space-x-3">
              <RouterLink
                  to="/dashboard"
                  class="text-cyber-300 hover:text-cyber-200 transition-colors font-tech border border-cyber-500/50 hover:border-cyber-400 px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>DASHBOARD</span>
              </RouterLink>

              <RouterLink
                  to="/logout"
                  class="btn-neon text-sm flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>LOGOUT</span>
              </RouterLink>
            </div>
          </template>

          <template v-else>
            <!-- Guest menu -->
            <div class="flex items-center space-x-3">
              <RouterLink
                  to="/login"
                  class="text-cyber-300 hover:text-cyber-200 transition-colors font-tech border border-cyber-500/50 hover:border-cyber-400 px-4 py-2 rounded-lg"
              >
                ACCESS
              </RouterLink>

              <RouterLink
                  to="/register"
                  class="btn-cyber text-sm"
              >
                ACTIVATE
              </RouterLink>
            </div>
          </template>

          <!-- Mobile menu button -->
          <button
              class="md:hidden text-cyber-300 hover:text-cyber-200 transition-colors"
              @click="toggleMobileMenu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
          v-if="isMobileMenuOpen"
          class="md:hidden border-t border-cyber-500/30 mt-2 pt-4 pb-2"
      >
        <div class="space-y-2">
          <RouterLink
              to="/"
              class="block text-gray-300 hover:text-cyber-300 transition-colors font-tech py-2"
              @click="closeMobileMenu"
          >
            HOME
          </RouterLink>

          <RouterLink
              v-if="isAuthenticated"
              to="/dashboard"
              class="block text-gray-300 hover:text-cyber-300 transition-colors font-tech py-2"
              @click="closeMobileMenu"
          >
            DASHBOARD
          </RouterLink>

          <RouterLink
              to="/about"
              class="block text-gray-300 hover:text-cyber-300 transition-colors font-tech py-2"
              @click="closeMobileMenu"
          >
            ABOUT
          </RouterLink>

          <div class="pt-2 border-t border-cyber-500/20">
            <template v-if="isAuthenticated">
              <RouterLink
                  to="/logout"
                  class="block text-red-400 hover:text-red-300 transition-colors font-tech py-2"
                  @click="closeMobileMenu"
              >
                LOGOUT
              </RouterLink>
            </template>
            <template v-else>
              <RouterLink
                  to="/login"
                  class="block text-cyber-300 hover:text-cyber-200 transition-colors font-tech py-2"
                  @click="closeMobileMenu"
              >
                SIGN IN
              </RouterLink>
              <RouterLink
                  to="/register"
                  class="block text-cyber-300 hover:text-cyber-200 transition-colors font-tech py-2"
                  @click="closeMobileMenu"
              >
                REGISTER
              </RouterLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { isAuthenticated } = useAuth()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false
}

// Close mobile menu on escape key
const handleEscape = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>