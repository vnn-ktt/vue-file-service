<template>
    <div id="app" class="min-h-screen bg-dark-900 text-gray-100 flex flex-col">
      <Header />
      <Main>
        <RouterView />
      </Main>
      <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from '@/layouts/Header.vue';
import Footer from '@/layouts/Footer.vue';
import Main from '@/layouts/Main.vue';
</script>