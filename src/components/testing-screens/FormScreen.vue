<template>
  <div class="form-screen">
    <h1 class="base-title">Заполните анкету</h1>

    <InputText v-model="ageValue" placeholder="Возраст" />
    <Select v-model="genderValue" :options="['Мужской', 'Женский']" placeholder="Пол" />

    <div>
      <Tabs value="0">
        <span>{{ HEADER_TEXT }}</span>
        <TabList>
          <Tab value="0">Вопрос 1</Tab>
          <Tab value="1">Вопрос 2</Tab>
          <Tab value="2">Вопрос 3</Tab>
          <Tab value="3">Вопрос 4</Tab>
          <Tab value="4">Вопрос 5</Tab>
          <Tab value="5">Вопрос 6</Tab>
          <Tab value="6">Вопрос 7</Tab>
          <Tab value="7">Вопрос 8</Tab>
          <Tab value="8">Вопрос 9</Tab>
          <Tab value="9">Вопрос 10</Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            v-for="statement in statements"
            :key="statement.number"
            :value="statement.number"
          >
            <span class="statement-text">{{ statement.text }}</span>
            <Select v-model="statement.value" :options="variants" placeholder="-" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>

    <Button
      @click="handleChangeScreen"
      class="m-auto"
      label="Приступить к тестированию"
      severity="secondary"
    />
  </div>

  <Dialog
    v-model:visible="isDialogVisible"
    modal
    header="Пожалуйста, заполните все поля"
    dismissable-mask
    :draggable="false"
    :style="{ width: '25rem' }"
  ></Dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useResultsStore } from '@/stores/results'

import InputText from 'primevue/inputtext'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import type { Form } from '@/types/results'

const emit = defineEmits(['changeScreen'])

const store = useResultsStore()

const HEADER_TEXT =
  'Оцените ряд утверждений по следующей шкале: 1 - Никогда 2 – Редко 3 – Иногда 4 – Часто 5 – Всегда'

const variants = ['1', '2', '3', '4', '5']

const statements = reactive([
  {
    text: 'Меня беспокоит усталость.',
    number: '0',
    value: null,
  },
  {
    text: 'Я очень быстро устаю.',
    number: '1',
    value: null,
  },
  {
    text: 'Я не делаю много дел в течение дня.',
    number: '2',
    value: null,
  },
  {
    text: 'У меня достаточно энергии для повседневной жизни.',
    number: '3',
    value: null,
  },
  {
    text: 'Я чувствую физическое истощение.',
    number: '4',
    value: null,
  },
  {
    text: 'Мне трудно начать что-нибудь делать.',
    number: '5',
    value: null,
  },
  {
    text: 'Мне трудно думать четко и ясно.',
    number: '6',
    value: null,
  },
  {
    text: 'У меня нет никакого желания что-нибудь делать.',
    number: '7',
    value: null,
  },
  {
    text: 'Я чувствую умственное истощение.',
    number: '8',
    value: null,
  },
  {
    text: 'Когда я делаю что-нибудь, я могу довольно хорошо сконцентрироваться.',
    number: '9',
    value: null,
  },
])

const ageValue = ref('')
const genderValue = ref('')

const isAllFilled = computed(() => {
  return ageValue.value && genderValue.value && statements.every((statement) => statement.value)
})

const isDialogVisible = ref(false)

const handleChangeScreen = () => {
  // if (!isAllFilled.value) {
  //   isDialogVisible.value = true
  //   return
  // }

  store.setField('age', ageValue.value)
  store.setField('gender', genderValue.value)

  statements.forEach((statement) => {
    store.setField(`question${Number(statement.number) + 1}` as keyof Form, statement.value)
  })

  emit('changeScreen')
}
</script>

<style scoped>
.form-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.statement-text {
  margin-right: 0.5em;
}
</style>
