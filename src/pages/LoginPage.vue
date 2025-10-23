<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-4">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-cyber font-bold text-cyber-300 mb-3">
        system access
      </h1>
      <p class="text-cyber-200 font-tech">
        authenticate to enter the storage
      </p>
    </div>
    <div class="w-full max-w-md">
      <!-- security Status -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <span class="text-cyber-300 font-tech text-sm">security_status</span>
          <span class="text-neon-green font-tech text-sm">encrypted</span>
        </div>
        <div class="w-full bg-dark-700 rounded-full h-2">
          <div
              class="bg-gradient-to-r from-neon-green to-cyber-500 h-2 rounded-full cyber-glow"
          ></div>
        </div>
      </div>

      <!-- Login form using CyberForm -->
      <CyberForm
          :loading="isLoading"
          :error="authError"
          :show-cancel="false"
          submit-text="authenticate"
          @submit="handleLogin"
      >
        <CyberInputText
            v-model="formData.id"
            label="user identifier"
            type="text"
            placeholder="enter email or phone number"
            :error="errors.id"
            :required="true"
            :icon="IconUser"
            @update:modelValue="clearError()"
        />

        <CyberInputText
            v-model="formData.password"
            label="security key"
            type="password"
            placeholder="enter your password"
            :error="errors.password"
            :required="true"
            :show-password-toggle="true"
            :icon="IconLock"
            @update:modelValue="clearError()"
        />

        <!-- Remember me & Forgot password -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <input
                v-model="formData.rememberMe"
                type="checkbox"
                id="remember"
                class="w-4 h-4 text-cyber-500 bg-dark-700 border-cyber-500/30 rounded focus:ring-cyber-500 focus:ring-2"
            >
            <label for="remember" class="text-cyber-200 font-tech text-sm">
              remember device
            </label>
          </div>

          <RouterLink
              to="/forgot-password"
              class="text-cyber-400 hover:text-cyber-300 font-tech text-sm underline transition-colors"
          >
            lost key?
          </RouterLink>
        </div>
      </CyberForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import CyberForm from '@/components/ui/CyberForm.vue'
import CyberInputText from '@/components/ui/CyberInputText.vue'
import IconUser from "@/components/icons/IconUser.vue";
import IconLock from "@/components/icons/IconLock.vue";

const router = useRouter();
const { login, isLoading, error: authError, clearError } = useAuth();

const formData = reactive({
  id: '',
  password: '',
  rememberMe: false
});

const errors = reactive({
  id: '',
  password: ''
});

const handleLogin = async () => {
  const result = await login(formData);

  if (result.success) {
    await router.push('/dashboard');
  }
}
</script>

<style scoped>
.cyber-glow {
  box-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
}

.cyber-border {
  border: 1px solid rgba(0, 245, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 245, 255, 0.1);
}

.btn-cyber-secondary {
  background: linear-gradient(45deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8));
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: rgb(148, 163, 184);
  border-radius: 4px;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.btn-cyber-secondary:hover {
  border-color: rgba(0, 245, 255, 0.5);
  color: rgb(0, 245, 255);
  box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
}
</style>