<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="page-wrapper">
    <RouterView />
  </main>
</template>

<style scoped>
.page-wrapper {
    max-width: 60%;

  @media (max-width: 768px) {
    max-width: 95%;
  }
}
</style>
