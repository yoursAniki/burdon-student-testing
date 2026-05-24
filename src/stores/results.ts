import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Form, TestsResult } from '@/types/results'

export const useResultsStore = defineStore('results', () => {
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

  const testsResult = reactive<TestsResult[]>([])

  function setField<K extends keyof Form>(field: K, value: string | null) {
    form[field] = value
  }

  const addTestResult = (result: TestsResult) => {
    testsResult.push(result)
  }

  const resetAllData = () => {
    form.age = null
    form.gender = null
    form.question1 = null
    form.question2 = null
    form.question3 = null
    form.question4 = null
    form.question5 = null
    form.question6 = null
    form.question7 = null
    form.question8 = null
    form.question9 = null
    form.question10 = null

    testsResult.splice(0, testsResult.length)
  }

  return { form, setField, testsResult, addTestResult, resetAllData }
})
