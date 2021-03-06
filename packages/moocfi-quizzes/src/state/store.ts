import { useSelector, TypedUseSelectorHook } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunk from "redux-thunk"

import { backendAddressReducer } from "./backendAddress/reducer"
import {
  customizationReducer,
  ICustomizationState,
} from "./customization/reducer"
import { feedbackDisplayedReducer } from "./feedbackDisplayed/reducer"
import { languageReducer, LanguageState } from "./language/reducer"
import { loadingBarsReducer } from "./loadingBars/reducer"
import { messageReducer, MessageState } from "./message/reducer"
import { peerReviewsReducer, PeerReviewsState } from "./peerReviews/reducer"
import { quizReducer } from "./quiz/reducer"
import { quizAnswerReducer, QuizAnswerState } from "./quizAnswer/reducer"
import { userReducer, UserState } from "./user/reducer"
import {
  receivedReviewsReducer,
  IReceivedReviewsState,
} from "./receivedReviews/reducer"
import { Quiz } from "../modelTypes"

import * as backendAddressActions from "./backendAddress/actions"
import * as customizationActions from "./customization/actions"
import * as feedbackDisplayedActions from "./feedbackDisplayed/actions"
import * as languageActions from "./language/actions"
import * as loadingBarsActions from "./loadingBars/actions"
import * as messageActions from "./message/actions"
import * as quizActions from "./quiz/actions"
import * as quizAnswerActions from "./quizAnswer/actions"
import * as userActions from "./user/actions"
import * as PeerReviewsActions from "./peerReviews/actions"
import * as receivedReviewsActions from "./receivedReviews/actions"

const rootReducerImpl = combineReducers({
  backendAddress: backendAddressReducer,
  customization: customizationReducer,
  feedbackDisplayed: feedbackDisplayedReducer,
  language: languageReducer,
  loadingBars: loadingBarsReducer,
  message: messageReducer,
  peerReviews: peerReviewsReducer,
  quiz: quizReducer,
  quizAnswer: quizAnswerReducer,
  receivedReviews: receivedReviewsReducer,
  user: userReducer,
})

const rootReducer: typeof rootReducerImpl = (state, action) => {
  if (action.type === "CLEAR") {
    // @ts-ignore
    const bestState: State = undefined

    return bestState
  }
  return rootReducerImpl(state, action)
}

export const rootAction = {
  backendAction: backendAddressActions,
  customization: customizationActions,
  feedbackDisplayed: feedbackDisplayedActions,
  language: languageActions,
  loadingBars: loadingBarsActions,
  peerReviews: PeerReviewsActions,
  message: messageActions,
  quiz: quizActions,
  quizAnswer: quizAnswerActions,
  user: userActions,
  receivedReviews: receivedReviewsActions,
}

export interface State {
  backendAddress: string
  customization: ICustomizationState
  feedbackDisplayed: boolean
  language: LanguageState
  loadingBars: boolean
  peerReviews: PeerReviewsState
  message: MessageState
  quiz: Quiz
  quizAnswer: QuizAnswerState
  user: UserState
  receivedReviews: IReceivedReviewsState
}

import { StateType, ActionType } from "typesafe-actions"

export type Store = StateType<typeof createStoreCreator>
export type RootState = StateType<typeof rootReducer>
export type Dispatch = (action: RootAction) => void

type ClearActionType = {
  type: string
}

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type RootAction =
  | ActionType<typeof rootAction>
  | ThunkAction
  | Promise<any>
  | ClearActionType

export type GetState = () => State

const idToStoreCache: Map<string, Store> = new Map()

const createStoreInstance = (id: string): Store => {
  const cached = idToStoreCache.get(id)
  if (cached) {
    return cached
  }
  const store = createStoreCreator()
  idToStoreCache.set(id, store)
  return store
}

const createStoreCreator = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default createStoreInstance
