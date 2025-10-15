<template>
  <div
      v-if="isLoading"
      class="min-h-screen flex items-center justify-center bg-dark-900"
  >
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-cyber-500 mx-auto mb-4"></div>
      <p class="text-cyber-300 font-tech">checking authentication...</p>
    </div>
  </div>

  <div v-else-if="isAuthenticated" class="min-h-screen bg-dark-900">
    <slot />
  </div>


  <div v-else class="min-h-screen flex items-center justify-center bg-dark-900">
    <div class="text-center cyber-card max-w-md mx-4">

      <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-neon-pink rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
        <IconNotAuthenticated />
      </div>

      <h2 class="text-2xl font-cyber font-bold text-red-400 mb-4 cyber-glitch" data-text="ACCESS DENIED">
        access denied
      </h2>

      <p class="text-cyber-200 font-tech mb-6 leading-relaxed">
        authentication required to access this terminal
        please login to continue
      </p>

      <div class="space-y-3">
        <RouterLink
            to="/login"
            class="btn-cyber w-full flex items-center justify-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span>access terminal</span>
        </RouterLink>

        <RouterLink
            to="/"
            class="btn-secondary w-full flex items-center justify-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>return to home</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import IconNotAuthenticated from "@/components/icons/IconNotAuthenticated.vue";

const router = useRouter()
const route = useRoute()
const { isAuthenticated, isLoading, checkAuth } = useAuth()

onMounted(() => {
  checkAuth()
})

watch(isAuthenticated, (newValue, oldValue) => {
  if (!newValue && oldValue) {
    router.push('/login')
  }
})

watch(route, () => {
  if (isAuthenticated.value) {
    checkAuth()
  }
})
</script>