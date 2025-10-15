<template>
  <ProtectedRoute>
    <div class="min-h-screen bg-dark-900 p-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-cyber font-bold text-cyber-300 mb-8">
          DASHBOARD TERMINAL
        </h1>

        <div class="cyber-card">
          <h2 class="text-xl font-cyber font-bold text-cyber-300 mb-4">
            WELCOME, {{ currentUser?.id }}!
          </h2>
          <p class="text-cyber-200 font-tech mb-6">
            You have successfully accessed the secure dashboard.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-dark-700 p-4 rounded-lg border border-cyber-500/30">
              <h3 class="text-cyber-300 font-tech mb-2">SYSTEM STATUS</h3>
              <p class="text-green-400 font-tech">● OPERATIONAL</p>
            </div>

            <div class="bg-dark-700 p-4 rounded-lg border border-cyber-500/30">
              <h3 class="text-cyber-300 font-tech mb-2">USER ROLE</h3>
              <p class="text-cyber-200 font-tech">AUTHENTICATED USER</p>
            </div>
          </div>

          <div class="mt-6 flex space-x-4">
            <RouterLink to="/" class="btn-secondary">
              HOME
            </RouterLink>
            <RouterLink to="/logout" class="btn-neon">
              LOGOUT
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </ProtectedRoute>
</template>

<script setup lang="ts">
import ProtectedRoute from '@/components/auth/ProtectedRoute.vue'
import { useAuth } from '@/composables/useAuth'

const { currentUser } = useAuth()
</script>