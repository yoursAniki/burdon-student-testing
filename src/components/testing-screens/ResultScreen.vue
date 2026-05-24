<template>
  <h1>Результаты тестирования</h1>

  <div v-for="(result, index) in store.testsResult" :key="index">
    <h2>Тест №{{ index + 1 }}</h2>
    <div>
      <span>Кол-во ошибочно выбранных точек: {{ result.incorrectlySelected }}</span>
    </div>
    <div>
      <span>Кол-во правильно выбранных точек: {{ result.correctlySelected }}</span>
    </div>
    <div>
      <span>Кол-во пропущенных точек: {{ result.unselected }}</span>
    </div>
    <div>
      <span>Времени затрачено: {{ result.time }}с</span>
    </div>
  </div>

  <Button label="Пройти заново" class="repeat-test-button" @click="handleChangeScreen" severity="secondary" />
</template>

<script lang="ts" setup>
import { useResultsStore } from '@/stores/results'

import Button from 'primevue/button'

const store = useResultsStore()

const emit = defineEmits(['changeScreen'])

const handleChangeScreen = () => {
  store.resetAllData()

  emit('changeScreen')
}
</script>

<style scoped>
.repeat-test-button {
  margin-top: 1em;
}
</style>
