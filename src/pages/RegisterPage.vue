<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-4">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-cyber font-bold text-cyber-300 mb-3">
        activate your account
      </h1>
      <p class="text-cyber-200 font-tech">
        by joining the secure storage
      </p>
    </div>
    <div class="w-full max-w-md">
      <!-- progress indicator -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <span class="text-cyber-300 font-tech text-sm">system_registration_progress</span>
          <span class="text-neon-green font-tech text-sm">{{ progress }}%</span>
        </div>
        <div class="w-full bg-dark-700 rounded-full h-2">
          <div
              class="bg-gradient-to-r from-cyber-500 to-neon-purple h-2 rounded-full transition-all duration-500"
              :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <!-- registration form using CyberForm -->
      <CyberForm
          :loading="isLoading"
          :error="authError"
          :show-cancel="false"
          submit-text="activate account"
          @submit="handleRegister"
      >
        <CyberInputText
            v-model="formData.id"
            label="user identifier"
            type="text"
            placeholder="enter email or phone number"
            :error="errors.id"
            :required="true"
            :icon="IconEmail"
            @update:modelValue="clearError()"
        />

        <CyberInputText
            v-model="formData.password"
            label="security key"
            type="password"
            placeholder="create secure password"
            :error="errors.password"
            :required="true"
            :show-password-toggle="true"
            :icon="IconLock"
            @update:modelValue="clearError(); updateProgress()"
        />

        <!-- password Strength -->
        <div v-if="formData.password" class="space-y-2">
          <div class="flex justify-between text-cyber-400 font-tech text-sm">
            <span>encryption strength</span>
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
            label="confirm security key"
            type="password"
            placeholder="re-enter your password"
            :error="errors.confirmPassword"
            :required="true"
            :icon="IconShieldCheck"
            @update:modelValue="clearError(); updateProgress()"
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
            agree to the
            <a href="#" class="text-cyber-400 hover:text-cyber-300 underline transition-colors">terms of service</a>
            and
            <a href="#" class="text-cyber-400 hover:text-cyber-300 underline transition-colors">privacy policy</a>
          </label>
        </div>

      </CyberForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import CyberForm from '@/components/ui/CyberForm.vue'
import CyberInputText from '@/components/ui/CyberInputText.vue'
import IconEmail from "@/components/icons/IconEmail.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconShieldCheck from "@/components/icons/IconShieldCheck.vue";

const router = useRouter();
const { register, isLoading, error: authError, clearError } = useAuth();

const formData = reactive({
  id: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
});

const errors = reactive({
  id: '',
  password: '',
  confirmPassword: ''
});

const progress = ref(0);

const updateProgress = () => {
  let newProgress = 0
  if (formData.id) newProgress += 25
  if (formData.password) newProgress += 25
  if (formData.confirmPassword) newProgress += 25
  if (formData.agreeTerms) newProgress += 25
  progress.value = newProgress
}

const passwordStrength = computed(() => {
  if (!formData.password) {
    return {
      text: 'no input',
      level: 0,
      percentage: 0,
      color: 'text-cyber-400',
      barColor: 'bg-cyber-400'
    }
  }

  const password = formData.password
  let score = 0
  const requirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    noSpaces: !/\s/.test(password)
  }

  if (requirements.length) score += 20
  if (password.length >= 12) score += 10

  if (requirements.lowercase) score += 10
  if (requirements.uppercase) score += 15
  if (requirements.numbers) score += 15
  if (requirements.symbols) score += 20
  if (requirements.noSpaces) score += 10

  const repeatingChars = (password.match(/(.)\1{2,}/g) || []).length
  score -= repeatingChars * 5

  const sequences = [
    '0123456789',
    'abcdefghijklmnopqrstuvwxyz',
    'qwertyuiopasdfghjklzxcvbnm'
  ]

  let sequencePenalty = 0
  for (const seq of sequences) {
    for (let i = 0; i <= password.length - 3; i++) {
      const substr = password.toLowerCase().substring(i, i + 3)
      if (seq.includes(substr) || seq.split('').reverse().join('').includes(substr)) {
        sequencePenalty += 5
      }
    }
  }
  score -= sequencePenalty

  score = Math.max(0, Math.min(100, score))

  let level, text, color, barColor

  if (score < 40) {
    level = 1
    text = 'weak encryption'
    color = 'text-red-400'
    barColor = 'bg-red-500'
  } else if (score < 70) {
    level = 2
    text = 'moderate security'
    color = 'text-yellow-400'
    barColor = 'bg-yellow-500'
  } else if (score < 90) {
    level = 3
    text = 'strong protection'
    color = 'text-cyber-300'
    barColor = 'bg-cyber-500'
  } else {
    level = 4
    text = 'cybercloude grade'
    color = 'text-neon-green'
    barColor = 'bg-gradient-to-r from-neon-green to-cyber-500'
  }

  return {
    text,
    level,
    percentage: score,
    color,
    barColor,
    requirements
  }
})

const handleRegister = async () => {
  const result = await register(formData)
  if (result.success) {
    await router.push('/dashboard');
  }
}
</script>