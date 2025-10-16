<template>
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :d="isOpened ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
  />
  </svg>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
      isOpened: {
        type: Boolean,
        default: false
      }
    }
  });
</script>