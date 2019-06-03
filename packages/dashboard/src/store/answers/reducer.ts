import { ActionType, getType } from "typesafe-actions"
import * as quizAnswers from "./actions"

export const answersReducer = (
  state: any[] = [],
  action: ActionType<typeof quizAnswers>,
) => {
  switch (action.type) {
    case getType(quizAnswers.set):
      return [...action.payload]
    case getType(quizAnswers.clear):
      return []
    default:
      return state
  }
}