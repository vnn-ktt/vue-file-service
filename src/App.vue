<template>
  <div id="app" class="min-h-screen bg-dark-900 text-gray-100 flex flex-col">
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.ts';
import Header from '@/layouts/Header.vue';
import Footer from '@/layouts/Footer.vue';

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
})
</script>