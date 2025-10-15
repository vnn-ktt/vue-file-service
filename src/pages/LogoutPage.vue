<template>
  <div class="min-h-screen flex items-center justify-center bg-dark-900 p-4">
    <div class="cyber-card max-w-md w-full text-center">
      <div class="w-16 h-16 bg-gradient-to-br from-cyber-500 to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </div>

      <h2 class="text-2xl font-cyber font-bold text-cyber-300 mb-4">
        LOGGING OUT...
      </h2>

      <p class="text-cyber-200 font-tech mb-6">
        Terminating your secure session.
      </p>

      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-500 mx-auto mb-6"></div>

      <RouterLink to="/" class="btn-cyber w-full">
        RETURN TO HOME
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

onMounted(async () => {
  await logout()

  // Small delay for UX
  setTimeout(() => {
    router.push('/')
  }, 2000)
})
</script>