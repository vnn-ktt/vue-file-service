<template>
  <footer class="bg-dark-800/80 backdrop-blur-sm border-t border-cyber-500/20 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Main footer content -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-cyber-500 to-neon-purple rounded flex items-center justify-center">
              <span class="text-white font-cyber font-bold text-xs">FS</span>
            </div>
            <span class="neon-text font-cyber font-bold text-xl">FileService</span>
          </div>
          <p class="text-cyber-200 font-tech text-sm leading-relaxed max-w-md">
            Advanced cyber-secure file storage solution.
            Your data protected with quantum-grade encryption technology.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-cyber-300 font-cyber font-bold mb-4 text-lg">NAVIGATION</h3>
          <div class="space-y-2">
            <RouterLink
                to="/"
                class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm"
            >
              Home
            </RouterLink>
            <RouterLink
                to="/dashboard"
                class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm"
            >
              Dashboard
            </RouterLink>
            <RouterLink
                to="/about"
                class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm"
            >
              About
            </RouterLink>
          </div>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-cyber-300 font-cyber font-bold mb-4 text-lg">SUPPORT</h3>
          <div class="space-y-2">
            <a href="#" class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm">
              Documentation
            </a>
            <a href="#" class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm">
              Help Center
            </a>
            <a href="#" class="block text-cyber-200 hover:text-cyber-300 transition-colors font-tech text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="pt-8 border-t border-cyber-500/20">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-cyber-300 font-tech text-sm mb-4 md:mb-0">
            © 2024 <span class="neon-text">FileService</span>.
            <span class="text-neon-purple">All systems operational.</span>
          </div>

          <!-- Social links -->
          <div class="flex space-x-4">
            <a
                href="#"
                class="text-cyber-400 hover:text-cyber-300 transition-colors"
                aria-label="GitHub"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a
                href="#"
                class="text-cyber-400 hover:text-cyber-300 transition-colors"
                aria-label="Twitter"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>

            <a
                href="#"
                class="text-cyber-400 hover:text-cyber-300 transition-colors"
                aria-label="Discord"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0c.14.09.28.19.42.33a10.9 10.9 0 0 1-1.71.84 12.89 12.89 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Decorative element -->
      <div class="mt-8 pt-6 border-t border-cyber-500/20">
        <div class="flex justify-center">
          <div class="w-32 h-1 bg-gradient-to-r from-transparent via-cyber-500 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  </footer>
</template>