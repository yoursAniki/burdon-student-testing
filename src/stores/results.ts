import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Form } from '@/types/results'

export const useResultsStore = defineStore('counter', () => {
  const form = reactive({
    age: null as string | null,
    gender: null as string | null,
    question1: null as string | null,
    question2: null as string | null,
    question3: null as string | null,
    question4: null as string | null,
    question5: null as string | null,
    question6: null as string | null,
    question7: null as string | null,
    question8: null as string | null,
    question9: null as string | null,
    question10: null as string | null,
  })

  function setField<K extends keyof Form>(field: K, value: string | null) {
    form[field] = value
  }

  return { form, setField }
})
