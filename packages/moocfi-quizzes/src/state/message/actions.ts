import { ActionCreator } from "redux"
import { createAction } from "typesafe-actions"
import { MessageState } from "./reducer"
import { ThunkAction } from "../store"

export const set = createAction("message/SET", resolve => {
  return (message: MessageState) => resolve(message)
})

export const setErrorMessage = createAction(
  "message/SET_ERROR_MESSAGE",
  resolve => {
    return (errorMessage: string) => resolve(errorMessage)
  },
)

export const clearErrorMessage = createAction("message/CLEAR_ERROR_MESSAGE")

export const setNotification = createAction(
  "message/SET_NOTIFICATION",
  resolve => {
    return (
      message: string,
      color: string = "black",
      untilAnswerChanged: boolean = false,
    ) => resolve({ message, color, untilAnswerChanged })
  },
)

export const answerWasChanged = createAction("message/ANSWER_WAS_CHANGED")

export const clearNotification = createAction("message/CLEAR_NOTIFICATION")

// if length in seconds and untilAnswerChanged both not null,
// the notification will disappear when the first of the events
// occurs
export const displayNotification: ActionCreator<ThunkAction> = (
  message: string,
  color: string,
  lengthInSeconds?: number,
  untilAnswerChanged?: boolean,
) => async dispatch => {
  dispatch(setNotification(message, color, !!untilAnswerChanged))

  if (lengthInSeconds) {
    setTimeout(() => dispatch(clearNotification()), 1000 * lengthInSeconds)
  }
}

export const clear = createAction("message/CLEAR")
