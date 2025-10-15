<template>
  <div class="min-h-screen flex items-center justify-center bg-dark-900 p-4">
    <div class="cyber-card max-w-md w-full">
      <h2 class="text-2xl font-cyber font-bold text-cyber-300 mb-6 text-center">
        SYSTEM LOGIN
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-cyber-300 font-tech mb-2">USER ID</label>
          <input
              v-model="form.id"
              type="text"
              class="cyber-input"
              placeholder="Enter email or phone"
              required
          >
        </div>

        <div>
          <label class="block text-cyber-300 font-tech mb-2">PASSWORD</label>
          <input
              v-model="form.password"
              type="password"
              class="cyber-input"
              placeholder="Enter password"
              required
          >
        </div>

        <button
            type="submit"
            class="btn-cyber w-full"
            :disabled="isLoading"
        >
          {{ isLoading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <RouterLink to="/" class="text-cyber-400 hover:text-cyber-300 font-tech text-sm">
          ← RETURN TO HOME
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login, isLoading } = useAuth()

const form = ref({
  id: '',
  password: ''
})

const handleLogin = async () => {
  const result = await login(form.value)

  if (result.success) {
    router.push('/dashboard')
  }
}
</script>