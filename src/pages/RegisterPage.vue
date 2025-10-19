<template>
  <div class="min-h-screen bg-dark-900 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Floating cyber elements -->
      <div
          v-for="i in 20"
          :key="i"
          class="absolute rounded-lg bg-cyber-500/10 backdrop-blur-sm"
          :class="floatingElementClasses[i % floatingElementClasses.length]"
          :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`
        }"
      ></div>

      <!-- Animated gradients -->
      <div class="absolute -top-20 -left-20 w-64 h-64 bg-cyber-500/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl animate-float" style="animation-delay: 2s;"></div>

      <!-- Grid pattern -->
      <div class="absolute inset-0 grid-bg opacity-10"></div>

      <!-- Connection lines -->
      <div class="absolute inset-0 opacity-5">
        <div class="w-full h-full relative">
          <div
              v-for="i in 8"
              :key="i"
              class="absolute h-0.5 bg-cyber-500 animate-pulse"
              :style="{
              top: `${i * 12}%`,
              width: '100%',
              animationDelay: `${i * 0.2}s`
            }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
          <RouterLink
              to="/"
              class="inline-flex items-center space-x-3 group mb-6"
          >
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

        <!-- Registration form -->
        <form @submit.prevent="handleRegister" class="cyber-card space-y-6">
          <!-- Email/Phone Field -->
          <div>
            <label class="block text-cyber-300 font-tech mb-3">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>USER IDENTIFIER</span>
              </span>
            </label>
            <input
                v-model="formData.id"
                type="text"
                placeholder="Enter email or phone number"
                class="cyber-input"
                :class="{ 'border-neon-pink': errors.id }"
                @input="clearError('id')"
                required
            >
            <p v-if="errors.id" class="mt-2 text-neon-pink font-tech text-sm flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ errors.id }}</span>
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-cyber-300 font-tech mb-3">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>SECURITY KEY</span>
              </span>
            </label>
            <div class="relative">
              <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create secure password"
                  class="cyber-input pr-10"
                  :class="{ 'border-neon-pink': errors.password }"
                  @input="clearError('password'); updateProgress()"
                  required
              >
              <button
                  type="button"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-400 hover:text-cyber-300 transition-colors"
                  @click="showPassword = !showPassword"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-2 text-neon-pink font-tech text-sm">
              {{ errors.password }}
            </p>
          </div>

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

          <!-- Confirm Password -->
          <div>
            <label class="block text-cyber-300 font-tech mb-3">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>CONFIRM SECURITY KEY</span>
              </span>
            </label>
            <input
                v-model="formData.confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                class="cyber-input"
                :class="{ 'border-neon-pink': errors.confirmPassword }"
                @input="clearError('confirmPassword'); updateProgress()"
                required
            >
            <p v-if="errors.confirmPassword" class="mt-2 text-neon-pink font-tech text-sm">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Terms Agreement -->
          <div class="flex items-start space-x-3">
            <input
                v-model="formData.agreeTerms"
                type="checkbox"
                id="terms"
                class="mt-1 w-4 h-4 text-cyber-500 bg-dark-700 border-cyber-500/30 rounded focus:ring-cyber-500 focus:ring-2"
            >
            <label for="terms" class="text-cyber-200 font-tech text-sm leading-relaxed">
              I agree to the
              <a href="#" class="text-cyber-400 hover:text-cyber-300 underline transition-colors">Terms of Service</a>
              and
              <a href="#" class="text-cyber-400 hover:text-cyber-300 underline transition-colors">Privacy Policy</a>
            </label>
          </div>

          <!-- Submit Button -->
          <button
              type="submit"
              class="btn-cyber w-full group relative overflow-hidden"
              :disabled="!isFormValid || isLoading"
          >
            <span class="relative z-10 flex items-center justify-center space-x-2">
              <div v-if="isLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>{{ isLoading ? 'ACTIVATING ACCOUNT...' : 'ACTIVATE ACCOUNT' }}</span>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>

          <!-- Error Message -->
          <div v-if="authError" class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-red-400 font-tech text-sm">{{ authError }}</p>
            </div>
          </div>
        </form>

        <!-- Login link -->
        <div class="text-center mt-6">
          <p class="text-cyber-400 font-tech">
            Already have an account?
            <RouterLink to="/login" class="text-cyber-300 hover:text-cyber-200 underline transition-colors">
              Access terminal
            </RouterLink>
          </p>
        </div>

        <!-- Security features -->
        <div class="mt-8 cyber-card border-green-500/30 bg-green-500/5">
          <div class="flex items-center space-x-3 mb-3">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { register, isLoading, error: authError, clearError } = useAuth()

// Form data
const formData = reactive({
  id: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

// UI state
const showPassword = ref(false)
const errors = reactive({
  id: '',
  password: '',
  confirmPassword: ''
})

// Floating elements classes
const floatingElementClasses = [
  'w-4 h-4 animate-float',
  'w-6 h-6 animate-float',
  'w-3 h-3 animate-pulse-glow',
  'w-5 h-5 animate-float'
]

// Progress calculation
const progress = ref(0)

const updateProgress = () => {
  let newProgress = 0
  if (formData.id) newProgress += 25
  if (formData.password) newProgress += 25
  if (formData.confirmPassword) newProgress += 25
  if (formData.agreeTerms) newProgress += 25
  progress.value = newProgress
}

// Password strength calculation
const passwordStrength = computed(() => {
  if (!formData.password) {
    return { text: 'WAITING', percentage: 0, color: 'text-cyber-400', barColor: 'bg-cyber-400' }
  }

  let strength = 0
  if (formData.password.length >= 8) strength += 25
  if (/[A-Z]/.test(formData.password)) strength += 25
  if (/[0-9]/.test(formData.password)) strength += 25
  if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25

  if (strength <= 25) {
    return { text: 'WEAK', percentage: 25, color: 'text-red-400', barColor: 'bg-red-400' }
  } else if (strength <= 50) {
    return { text: 'MODERATE', percentage: 50, color: 'text-yellow-400', barColor: 'bg-yellow-400' }
  } else if (strength <= 75) {
    return { text: 'STRONG', percentage: 75, color: 'text-green-400', barColor: 'bg-green-400' }
  } else {
    return { text: 'VERY STRONG', percentage: 100, color: 'text-neon-green', barColor: 'bg-neon-green' }
  }
})

// Form validation
const isFormValid = computed(() => {
  return formData.id &&
      formData.password &&
      formData.confirmPassword &&
      formData.agreeTerms &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 6
})

// Handle registration
const handleRegister = async () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = '')
  clearError()

  // Validation
  if (!formData.id) {
    errors.id = 'Please enter email or phone number'
    return
  }

  if (!formData.password) {
    errors.password = 'Please enter password'
    return
  }

  if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    return
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
    return
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    return
  }

  if (!formData.agreeTerms) {
    // You might want to show terms error differently
    return
  }

  // Submit registration
  const result = await register({
    id: formData.id,
    password: formData.password,
    confirmPassword: formData.confirmPassword
  })

  if (result.success) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
/* Additional animations */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Grid background */
.grid-bg {
  background-image:
      linear-gradient(rgba(168, 85, 247, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>