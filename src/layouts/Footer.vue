<template>
  <footer class="bg-dark-800/80 backdrop-blur-sm border-t border-cyber-500/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- main footer content -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- brand -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-cyber-500 to-neon-purple rounded flex items-center justify-center">
              <span class="text-white font-cyber font-bold text-xs">CC</span>
            </div>
            <span class="neon-text font-cyber font-bold text-xl">cybercloude</span>
          </div>
          <p class="text-cyber-200 font-tech text-sm leading-relaxed max-w-md">
            advanced secure file storage solution
            your data protected with quantum-grade encryption technology
          </p>
        </div>
        <!-- links -->
        <div>
          <h3 class="text-cyber-300 font-cyber font-bold mb-4 text-lg"> navigation </h3>
          <div class="space-y-2">
            <RouterLink
                to="/"
                class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm"
            >
              home
            </RouterLink>
            <RouterLink
                v-if="isAuthenticated"
                to="/dashboard"
                class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm"
            >
              storage
            </RouterLink>
            <RouterLink
                to="/about"
                class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm"
            >
              about
            </RouterLink>
          </div>
        </div>
        <div>
          <h3 class="text-cyber-300 font-cyber font-bold mb-4 text-lg">support</h3>
          <div class="space-y-2">
            <a href="#" class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm">
              documentation
            </a>
            <a href="mailto:i@iplatunov.ru" class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm">
              contact
            </a>
          </div>
        </div>
      </div>

      <!-- bottom block -->
      <div class="pt-8 border-t border-cyber-500/20">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-cyber-300 font-tech text-sm mb-4 md:mb-0">
            © 2025 <span class="neon-text">cybercloude</span> /
            <span class="text-neon-purple">all systems operational</span>.
          </div>
          <div class="flex space-x-4">
            <a
              href="https://github.com/vnn-ktt"
              class="text-cyber-400 hover:text-cyber-300 transition-colors"
              target="_blank"
              aria-label="GitHub"
            >
              <IconGithub />
            </a>
            <a
                href="https://leetcode.com/u/vnn-ktt/"
                class="text-cyber-400 hover:text-cyber-300 transition-colors"
                target="_blank"
                aria-label="Leetcode"
            >
              <IconLeetcode />
            </a>
            <a
                href="https://t.me/vnn_ktt"
                class="text-cyber-400 hover:text-cyber-300 transition-colors"
                target="_blank"
                aria-label="Telegram"
            >
              <IconTelegram />
            </a>
          </div>
        </div>
      </div>

      <!-- decorative element -->
      <div class="mt-8 pt-6 border-t border-cyber-500/20">
        <div class="flex justify-center">
          <div class="w-64 h-1 bg-gradient-to-r from-transparent via-cyber-500 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import IconTelegram from "@/components/icons/IconTelegram.vue";
  import IconGithub from "@/components/icons/IconGithub.vue";
  import IconLeetcode from "@/components/icons/IconLeetcode.vue";
  import {useAuth} from "@/composables/useAuth.ts";
  const { isAuthenticated } = useAuth();
</script>