export interface Form {
  age: string | null
  gender: string | null
  question1: string | null
  question2: string | null
  question3: string | null
  question4: string | null
  question5: string | null
  question6: string | null
  question7: string | null
  question8: string | null
  question9: string | null
  question10: string | null
}

export interface TestsResult {
  correctlySelected: number
  incorrectlySelected: number
  unselected: number
  time: number
}
