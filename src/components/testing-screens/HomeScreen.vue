<script setup lang="ts">
import Button from 'primevue/button'

defineEmits(['changeScreen'])
</script>

<template>
  <div class="home-screen">
    <h1 class="base-title">Добро пожаловать</h1>

    <Button @click="$emit('changeScreen')" class="m-auto" label="Начать" severity="secondary" />
  </div>
</template>

<style scoped>
.home-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}
</style>
