import { createAction } from "typesafe-actions"
import {
  getAttentionRequiringQuizAnswers,
  getQuizAnswers,
} from "../../services/quizAnswers"

import { setQuizzes } from "../quizzes/actions"

export const set = createAction("answers/SET", resolve => {
  return (quizzes: any[]) => resolve(quizzes)
})

export const clear = createAction("answers/CLEAR")

export const loadingStateChanged = createAction(
  "answers/LOADING_STATE_CHANGED",
  resolve => {
    return (newState: boolean) => resolve(newState)
  },
)

export const setAllAnswers = (
  quizId: string,
  wantedPageNumber: number,
  answersPerPage: number,
) => {
  return async (dispatch, getState) => {
    dispatch(loadingStateChanged(true))

    try {
      // dispatch(clear())
      const data = await getQuizAnswers(
        quizId,
        getState().user,
        (wantedPageNumber - 1) * answersPerPage,
        answersPerPage,
      )
      await dispatch(set(data))
    } catch (error) {
      dispatch(loadingStateChanged(false))
      console.log(error)
    }
  }
}

export const setAttentionRequiringAnswers = (
  quizId: string,
  pageNumber: number,
  answersPerPage: number,
) => {
  return async (dispatch, getState) => {
    dispatch(loadingStateChanged(true))

    try {
      const data = await getAttentionRequiringQuizAnswers(
        quizId,
        getState().user,
        (pageNumber - 1) * answersPerPage,
        answersPerPage,
      )

      if (data.length === 0) {
        dispatch(set([]))
        return
      }

      if (
        !getState().quizzes.courseInfos.find(
          qi => qi.courseId === getState().filter.course,
        )
      ) {
        await dispatch(setQuizzes(getState().filter.course))
      }

      const quizNode = getState().quizzes.courseInfos.find(
        qi => qi.courseId === getState().filter.course,
      )

      const quiz = quizNode.quizzes.find(q => q.id === quizId)
      const peerReviewQuestions = quiz.peerReviewCollections
        .map(prc => prc.questions)
        .flat()

      const newData = data.map(answer => {
        return {
          ...answer,
          peerReviews: answer.peerReviews.map(pr => {
            return {
              ...pr,
              answers: pr.answers.sort((a1, a2) => {
                const prq1 = peerReviewQuestions.find(
                  q => q.id === a1.peerReviewQuestionId,
                )
                const prq2 = peerReviewQuestions.find(
                  q => q.id === a2.peerReviewQuestionId,
                )

                if (!prq1 || !prq2) {
                  return -1
                }

                return prq1.order - prq2.order
              }),
            }
          }),
        }
      })

      await dispatch(set(newData))
    } catch (error) {
      dispatch(loadingStateChanged(false))
      console.log(error)
    }
  }
}
