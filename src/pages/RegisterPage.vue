<template>
  <div class="min-h-screen bg-dark-900 relative overflow-hidden">
    <!-- Background elements remain the same -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- ... existing background animations ... -->
    </div>

    <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
          <RouterLink to="/" class="inline-flex items-center space-x-3 group mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-cyber-500 to-neon-purple rounded-lg flex items-center justify-center shadow-lg animate-pulse-glow">
              <span class="text-white font-cyber font-black text-sm">FS</span>
            </div>
            <span class="cyber-header text-2xl group-hover:animate-pulse">FileService</span>
          </RouterLink>

          <h1 class="text-3xl font-cyber font-bold text-cyber-300 mb-3">
            ACTIVATE ACCOUNT
          </h1>
          <p class="text-cyber-200 font-tech">
            Join the secure network
          </p>
        </div>

        <!-- Progress indicator -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-3">
            <span class="text-cyber-300 font-tech text-sm">SYSTEM REGISTRATION</span>
            <span class="text-neon-green font-tech text-sm">{{ progress }}%</span>
          </div>
          <div class="w-full bg-dark-700 rounded-full h-2">
            <div
                class="bg-gradient-to-r from-cyber-500 to-neon-purple h-2 rounded-full transition-all duration-500"
                :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>

        <!-- Registration form using CyberForm -->
        <CyberForm
            :loading="isLoading"
            :error="authError"
            :show-cancel="false"
            submit-text="ACTIVATE ACCOUNT"
            @submit="handleRegister"
        >
          <CyberInputText
              v-model="formData.id"
              label="USER IDENTIFIER"
              type="text"
              placeholder="Enter email or phone number"
              :error="errors.id"
              :required="true"
              :icon="EmailIcon"
              @update:modelValue="clearError('id')"
          />

          <CyberInputText
              v-model="formData.password"
              label="SECURITY KEY"
              type="password"
              placeholder="Create secure password"
              :error="errors.password"
              :required="true"
              :show-password-toggle="true"
              :icon="LockIcon"
              @update:modelValue="clearError('password'); updateProgress()"
          />

          <!-- Password Strength -->
          <div v-if="formData.password" class="space-y-2">
            <div class="flex justify-between text-cyber-400 font-tech text-sm">
              <span>ENCRYPTION STRENGTH</span>
              <span :class="passwordStrength.color">{{ passwordStrength.text }}</span>
            </div>
            <div class="w-full bg-dark-700 rounded-full h-1">
              <div
                  class="h-1 rounded-full transition-all duration-500"
                  :class="passwordStrength.barColor"
                  :style="{ width: passwordStrength.percentage + '%' }"
              ></div>
            </div>
          </div>

          <CyberInputText
              v-model="formData.confirmPassword"
              label="CONFIRM SECURITY KEY"
              type="password"
              placeholder="Re-enter your password"
              :error="errors.confirmPassword"
              :required="true"
              :icon="ShieldCheckIcon"
              @update:modelValue="clearError('confirmPassword'); updateProgress()"
          />

          <!-- Terms Agreement -->
          <div class="flex items-start space-x-3">
            <input
                v-model="formData.agreeTerms"
                type="checkbox"
                id="terms"
                class="mt-1 w-4 h-4 text-cyber-500 bg-dark-700 border-cyber-500/30 rounded focus:ring-cyber-500 focus:ring-2"
                @change="updateProgress"
            >
            <label for="terms" class="text-cyber-200 font-tech text-sm leading-relaxed">
              I agree to the
              <a href="#" class="text-cyber-400 hover:text-cyber-300 underline transition-colors">Terms of Service</a>
              and
              <a href="#" class="text-cyber-400 hover:text-cyber-300 underline transition-colors">Privacy Policy</a>
            </label>
          </div>

          <template #footer>
            <!-- Login link -->
            <div class="text-center">
              <p class="text-cyber-400 font-tech">
                Already have an account?
                <RouterLink to="/login" class="text-cyber-300 hover:text-cyber-200 underline transition-colors">
                  Access terminal
                </RouterLink>
              </p>
            </div>

            <!-- Security features -->
            <div class="cyber-card border-green-500/30 bg-green-500/5 mt-6">
              <div class="flex items-center space-x-3 mb-3">
                <ShieldCheckIcon class="w-5 h-5 text-green-400" />
                <h3 class="text-green-400 font-cyber font-bold">SECURE REGISTRATION</h3>
              </div>
              <div class="space-y-2 text-cyber-200 font-tech text-sm">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>End-to-end encryption</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
                  <span>Zero-knowledge protocol</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
                  <span>Military-grade security</span>
                </div>
              </div>
            </div>
          </template>
        </CyberForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import CyberForm from '@/components/ui/CyberForm.vue'
import CyberInputText from '@/components/ui/CyberInputText.vue'

// Icons
const EmailIcon = {
  template: `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  `
}

const LockIcon = {
  template: `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  `
}

const ShieldCheckIcon = {
  template: `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  `
}

// Rest of the script remains the same as before...
const router = useRouter()
const { register, isLoading, error: authError, clearError } = useAuth()

const formData = reactive({
  id: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const errors = reactive({
  id: '',
  password: '',
  confirmPassword: ''
})

const progress = ref(0)

const updateProgress = () => {
  let newProgress = 0
  if (formData.id) newProgress += 25
  if (formData.password) newProgress += 25
  if (formData.confirmPassword) newProgress += 25
  if (formData.agreeTerms) newProgress += 25
  progress.value = newProgress
}

const passwordStrength = computed(() => {
  // ... same implementation as before
})

const handleRegister = async () => {
  // ... same implementation as before
}
</script>