<template>
  <div class="burbon-wrapper">
    <h1 class="base-title">Тест №{{ testNumber }}</h1>

    <div class="timer">
      <div>Оставшееся время:</div>
      <span class="timer-value">{{ formattedTimer }}</span>
    </div>

    <div class="burbon-grid" :style="computeGridColumns">
      <Button
        v-for="(item, index) in displayedBurbonStrings"
        :key="index"
        @click="pickLetter(item)"
        class="burbon-button"
        :label="item.letter"
        :severity="item.isPicked ? 'secondary' : 'contrast'"
      />
    </div>

    <Button label="Закончить досрочно" @click="isDialogVisible = true" severity="secondary" />
  </div>

  <Dialog
    v-model:visible="isDialogVisible"
    modal
    header="Вы уверены, что хотите закончить тест?"
    :draggable="false"
    :close-on-escape="true"
    :dismissable-mask="true"
  >
    <div style="display: flex; justify-self: end; gap: 0.5em">
      <Button label="Продолжить" @click="isDialogVisible = false" severity="secondary" />
      <Button label="Да, завершить" @click="handleChangeScreen" severity="secondary" />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useResultsStore } from '@/stores/results'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { TIME_FOR_TEST } from '@/script/constants'

interface BurbonLetter {
  letter: string
  isCorrect: boolean
  isPicked?: boolean
}

const props = defineProps<{
  burbonStrings: BurbonLetter[]
  gridColumns: number
  testNumber: number
  // seconds
  initialTime: number
}>()

const emit = defineEmits(['changeScreen'])

const store = useResultsStore()

const displayedBurbonStrings = ref<BurbonLetter[]>([])

const formatBurbonStrings = () => {
  displayedBurbonStrings.value = props.burbonStrings.map((item) => {
    return {
      letter: item.letter,
      isCorrect: item.isCorrect,
      isPicked: false,
    }
  })
}

formatBurbonStrings()

const timer = ref(0)

const formattedTimer = computed(() => {
  const minutes = Math.floor(timer.value / 60)
  const seconds = timer.value % 60

  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${displayMinutes}:${displaySeconds}`
})

const computeGridColumns = computed(() => {
  return `grid-template-columns: repeat(${props.gridColumns}, minmax(15px, 50px))`
})

const isDialogVisible = ref(false)

let intervalId: ReturnType<typeof setInterval> | null = null

const stopTimer = () => {
  if (!intervalId) return

  isDialogVisible.value = true
  clearInterval(intervalId)
  intervalId = null
}

const startTimer = () => {
  timer.value = props.initialTime

  intervalId = setInterval(() => {
    if (timer.value === 0) {
      stopTimer()
      return
    }

    timer.value--
  }, 1000)
}

startTimer()

const calculateCorrectlySelected = () => {
  return displayedBurbonStrings.value.filter((item) => item.isPicked && item.isCorrect).length
}

const calculateIncorrectlySelected = () => {
  return displayedBurbonStrings.value.filter((item) => item.isPicked && !item.isCorrect).length
}

const calculateUnselected = () => {
  return displayedBurbonStrings.value.filter((item) => !item.isPicked && item.isCorrect).length
}

const handleChangeScreen = () => {
  stopTimer()

  const correctlySelected = calculateCorrectlySelected()
  const incorrectlySelected = calculateIncorrectlySelected()
  const unselected = calculateUnselected()

  store.addTestResult({
    correctlySelected,
    incorrectlySelected,
    unselected,
    time: TIME_FOR_TEST - timer.value,
  })

  emit('changeScreen')
}

const pickLetter = (letter: BurbonLetter) => {
  if (!intervalId) return

  letter.isPicked = !letter.isPicked
}
</script>

<style scoped>
.burbon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.timer {
  text-align: center;
}

.burbon-grid {
  display: grid;
  justify-content: center;
}

.burbon-button {
  aspect-ratio: 1 / 1;
}
</style>
