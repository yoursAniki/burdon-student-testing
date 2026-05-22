<script setup lang="ts">
import { ref } from 'vue'

import HomeScreen from '@/components/testing-screens/HomeScreen.vue'
import FormScreen from '@/components/testing-screens/FormScreen.vue'
import FirstTest from '@/components/testing-screens/FirstTest.vue'

const screen = ref(0)

const changeScreen = () => {
  screen.value++
}
</script>

<template>
  <div>
    <HomeScreen @change-screen="changeScreen" v-if="screen === 0" />
    <FormScreen @change-screen="changeScreen" v-else-if="screen === 1" />
    <FirstTest v-else-if="screen === 2" />
  </div>
</template>

<style scoped></style>
