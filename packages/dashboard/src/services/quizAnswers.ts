import axios from "axios"
import { IQuizAnswerSearchCriteria } from "../interfaces"

export const getQuizAnswers = async (
  quizId: string,
  user: any,
  skip: number,
  limit: number,
  criteria?: IQuizAnswerSearchCriteria,
) => {
  let baseString = `/api/v1/quizzes/answer/answers?quizId=${quizId}&attention=false&skip=${skip}&limit=${limit}`

  if (criteria) {
    Object.keys(criteria).forEach(key => {
      if (!criteria[key]) {
        return
      }

      baseString += `&${key}=${
        key === "statuses" ? JSON.stringify(criteria[key]) : criteria[key]
      }`
    })
    baseString += "&experimental=true"
  }

  const response = await axios.get(baseString, {
    headers: { authorization: `Bearer ${user.accessToken}` },
  })

  return response.data
}

export const updateQuizAnswerStatus = async (
  quizAnswerId: string,
  newStatus: string,
  user: any,
) => {
  const response = await axios.post(
    `/api/v1/quizzes/answer/${quizAnswerId}`,
    {
      newStatus,
    },
    {
      headers: { authorization: `Bearer ${user.accessToken}` },
    },
  )
  return response.data
}

export const getAttentionRequiringQuizAnswers = async (
  quizId: string,
  user: any,
  skip: number,
  limit: number,
) => {
  const response = await axios.get(
    `/api/v1/quizzes/answer/answers?quizId=${quizId}&attention=true&skip=${skip}&limit=${limit}`,
    {
      headers: { authorization: `Bearer ${user.accessToken}` },
    },
  )

  return response.data
}

export const getTotalNumberOfAnswers = async (quizId: string, user: any) => {
  const response = await axios.get(
    `/api/v1/quizzes/answer/counts?quizId=${quizId}`,
    {
      headers: { authorization: `Bearer ${user.accessToken}` },
    },
  )
  return response.data
}
