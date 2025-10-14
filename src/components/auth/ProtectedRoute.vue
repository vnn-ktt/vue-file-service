<template>
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-500"></div>
  </div>

  <slot v-else-if="isAuthenticated" />

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-2xl font-cyber text-cyber-300 mb-4">Access Denied</h2>
      <p class="text-cyber-200 mb-6">Please log in to access this page.</p>
      <RouterLink to="/login" class="btn-cyber">
        Go to Login
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isAuthenticated, isLoading, checkAuth } = useAuth()

onMounted(() => {
  checkAuth()
})
</script>