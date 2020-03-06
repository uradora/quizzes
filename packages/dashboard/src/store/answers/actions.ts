import { createAction } from "typesafe-actions"
import {
  getAttentionRequiringQuizAnswers,
  getQuizAnswers,
} from "../../services/quizAnswers"

import { IQuizAnswerSearchCriteria } from "../../interfaces"
import { setQuizzes } from "../quizzes/actions"

export const set = createAction("answers/SET", resolve => {
  return (quizzes: any[]) => resolve(quizzes)
})

export const clear = createAction("answers/CLEAR")

export const setAllAnswers = (
  quizId: string,
  wantedPageNumber: number,
  answersPerPage: number,
  criteria?: IQuizAnswerSearchCriteria,
) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(clear())
      const data = await getQuizAnswers(
        quizId,
        getState().user,
        (wantedPageNumber - 1) * answersPerPage,
        answersPerPage,
        criteria,
      )
      await dispatch(set(data))
    } catch (error) {
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
                return (
                  peerReviewQuestions.find(
                    q => q.id === a1.peerReviewQuestionId,
                  ).order -
                  peerReviewQuestions.find(
                    q => q.id === a2.peerReviewQuestionId,
                  ).order
                )
              }),
            }
          }),
        }
      })

      await dispatch(set(newData))
    } catch (error) {
      console.log(error)
    }
  }
}
