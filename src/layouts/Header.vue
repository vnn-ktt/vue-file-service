<template>
  <header class="bg-dark-800/90 backdrop-blur-md border-b border-cyber-500/30 sticky top-0 z-50 shadow-lg shadow-cyber-900/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <RouterLink
            to="/"
            class="flex items-center space-x-3 group"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-cyber-500 to-neon-purple rounded-lg flex items-center justify-center shadow-lg">
            <span class="text-white font-cyber font-black text-sm">CC</span>
          </div>
          <div>
            <span class="cyber-header text-2xl font-bold font-cyber">
              cybercloud
            </span>
            <div class="h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyber-500 to-neon-purple transition-all duration-500 rounded-full"></div>
          </div>
        </RouterLink>

        <nav class="hidden md:flex space-x-8">
          <RouterLink
              to="/"
              class="text-gray-300 hover:text-cyber-300 transition-all duration-300 font-tech hover:animate-pulse border-b-2 border-transparent hover:border-cyber-400 pb-1"
              :class="{ 'text-cyber-300 border-cyber-400': $route.path === '/' }"
          >
            home
          </RouterLink>
          <RouterLink
              v-if="isAuthenticated"
              to="/dashboard"
              class="text-gray-300 hover:text-cyber-300 transition-all duration-300 font-tech hover:animate-pulse border-b-2 border-transparent hover:border-cyber-400 pb-1"
              :class="{ 'text-cyber-300 border-cyber-400': $route.path.startsWith('/dashboard') }"
          >
            dashboard
          </RouterLink>
          <RouterLink
              to="/about"
              class="text-gray-300 hover:text-cyber-300 transition-all duration-300 font-tech hover:animate-pulse border-b-2 border-transparent hover:border-cyber-400 pb-1"
              :class="{ 'text-cyber-300 border-cyber-400': $route.path === '/about' }"
          >
            about
          </RouterLink>
          <RouterLink
              to="/documentation"
              class="text-gray-300 hover:text-cyber-300 transition-all duration-300 font-tech hover:animate-pulse border-b-2 border-transparent hover:border-cyber-400 pb-1"
              :class="{ 'text-cyber-300 border-cyber-400': $route.path === '/about' }"
          >
            documentation
          </RouterLink>
          <RouterLink
              to="/contact"
              class="text-gray-300 hover:text-cyber-300 transition-all duration-300 font-tech hover:animate-pulse border-b-2 border-transparent hover:border-cyber-400 pb-1"
              :class="{ 'text-cyber-300 border-cyber-400': $route.path === '/about' }"
          >
            contact
          </RouterLink>
        </nav>

        <div class="flex items-center space-x-4">
          <template v-if="isAuthenticated">
            <div class="flex items-center space-x-3">
              <RouterLink
                  to="/dashboard"
                  class="text-cyber-300 hover:text-cyber-200 transition-colors font-tech border border-cyber-500/50 hover:border-cyber-400 px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <IconStorage />
                <span>storage</span>
              </RouterLink>
              <RouterLink
                  to="/logout"
                  class="btn-neon text-sm flex items-center space-x-2"
              >
                <IconLogout />
                <span>logout</span>
              </RouterLink>
            </div>
          </template>

          <template v-else>
            <div class="flex items-center space-x-3">
              <CyberButton
                  to="/login"
                  :icon-left="IconLogin"
                  :text="'sign in'"
                  :size="'sm'"
                  variant="cyber"
              />
              <CyberButton
                  to="/register"
                  :icon-left="IconRegister"
                  :text="'sign up'"
                  :size="'sm'"
                  variant="cyber"
              />
            </div>
          </template>

          <cyber-button
              class="md:hidden text-cyber-300 hover:text-cyber-200 transition-colors"
              @click="toggleMobileMenu"
          >
            <IconDynamicBurger :is-opened="isMobileMenuOpen" />
          </cyber-button>
        </div>
      </div>
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
            home
          </RouterLink>

          <RouterLink
              v-if="isAuthenticated"
              to="/dashboard"
              class="block text-gray-300 hover:text-cyber-300 transition-colors font-tech py-2"
              @click="closeMobileMenu"
          >
            dashboard
          </RouterLink>

          <RouterLink
              to="/about"
              class="block text-gray-300 hover:text-cyber-300 transition-colors font-tech py-2"
              @click="closeMobileMenu"
          >
            about
          </RouterLink>

          <div class="pt-2 border-t border-cyber-500/20">
            <template v-if="isAuthenticated">
              <RouterLink
                  to="/logout"
                  class="block text-red-400 hover:text-red-300 transition-colors font-tech py-2"
                  @click="closeMobileMenu"
              >
                logout
              </RouterLink>
            </template>
            <template v-else>
              <RouterLink
                  to="/login"
                  class="block text-cyber-300 hover:text-cyber-200 transition-colors font-tech py-2"
                  @click="closeMobileMenu"
              >
                sign in
              </RouterLink>
              <RouterLink
                  to="/register"
                  class="block text-cyber-300 hover:text-cyber-200 transition-colors font-tech py-2"
                  @click="closeMobileMenu"
              >
                sign up
              </RouterLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useAuth } from '@/composables/useAuth';
  import IconDynamicBurger from "@/components/icons/IconDynamicBurger.vue";
  import IconStorage from "@/components/icons/IconStorage.vue";
  import IconLogout from "@/components/icons/IconLogout.vue";
  import IconLogin from "@/components/icons/IconLogin.vue";
  import IconRegister from "@/components/icons/IconRegister.vue";
  import CyberButton from "@/components/ui/CyberButton.vue";

  const { isAuthenticated } = useAuth();

  const isMobileMenuOpen = ref(false);

  const toggleMobileMenu = (): void => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = (): void => {
    isMobileMenuOpen.value = false
  }

  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && isMobileMenuOpen.value) {
      closeMobileMenu()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleEscape)
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  });
</script>