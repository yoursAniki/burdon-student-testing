<template>
  <h1 class="base-title">Результаты тестирования</h1>

  <!-- <p class="results-warn">
    Учтите, что этот тест даёт лишь приблизительную оценку возможностей вашего внимания. Для
    получения более точных результатов стоит пройти профессиональную диагностику внимания.
  </p> -->

  <div v-for="(result, index) in store.testsResult" class="results-test" :key="index">
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

  <p class="results-warn">
    Учтите, что этот тест даёт лишь приблизительную оценку возможностей вашего внимания. Для
    получения более точных результатов стоит пройти профессиональную диагностику внимания.
  </p>

  <Button
    label="Пройти заново"
    class="repeat-test-button"
    @click="handleChangeScreen"
    severity="secondary"
  />
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
.results-warn {
  margin: 1em 0;
  font-size: small;
}

.results-test {
  margin: 1em 0;
}

.repeat-test-button {
  margin-top: 1em;
}
</style>
