export type MiscEvent = React.FormEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

export type UserCourseRoleType = "administrator" | "assistant" | "teacher"

export type QuizAnswerStatus =
  | "draft"
  | "submitted"
  | "enough-received-but-not-given"
  | "spam"
  | "confirmed"
  | "rejected"
  | "deprecated"

export interface IQuizAnswer {
  id: string
  quizId: string
  userId: number
  languageId: string
  status: QuizAnswerStatus
  peerReviews: IPeerReview[]
  userQuizState?: any
  itemAnswers: IQuizItemAnswer[]
}

export interface IQuizItemAnswer {
  id: string
  quizAnswerId: string
  quizItemId: string
  textData?: string
  intData?: number
  correct?: boolean
  optionAnswers: IQuizItemOptionAnswer[]
}

export interface IQuizItemOptionAnswer {
  id: string
  quizItemAnswerId: string
  quizOptionId: string
}

type UserQuizStateStatus = "open" | "locked"

export interface IUserQuizState {
  userId: number
  quizId: string
  peerReviewsGiven: null | number
  peerReviewsReceived: null | number
  pointsAwarded: null | number
  spamFlags: null | number
  status: UserQuizStateStatus
}

export interface IPeerReview {
  id: string
  quizAnswerId: string
  userId: number
  peerReviewCollectionId?: string
  rejectedQuizAnswerIds: string[]
  answers: IPeerReviewQuestionAnswer[]
}

export interface IPeerReviewQuestionAnswer {
  peerReviewId: string
  peerReviewQuestionId: string
  value: null | number
  text: null | string
}

export type QuizItemType =
  | "essay"
  | "multiple-choice"
  | "scale"
  | "checkbox"
  | "open"
  | "research-agreement"
  | "feedback"
  | "custom-frontend-accept-data"

export type QuizPointsGrantingPolicy =
  | "grant_whenever_possible"
  | "grant_only_when_answer_fully_correct"

export interface IQuizText {
  quizId: string
  languageId: string
  title: string
  body: string
  submitMessage: string
}

export interface IUserCourseRole {
  role: UserCourseRoleType
  courseId: string
  courseTitle: string
}

export interface IQuiz {
  id?: string
  courseId: string
  part: number
  section: number
  points?: number
  tries: number
  triesLimited: boolean
  deadline?: Date
  open?: Date
  autoConfirm?: boolean
  excludedFromScore?: boolean
  texts: IQuizText[]
  course: ICourse
  items: IQuizItem[]
  grantPointsPolicy: QuizPointsGrantingPolicy
  peerReviewCollections?: IPeerReviewCollection[]
}

export interface IQuizItemOptionText {
  quizOptionId: string
  languageId: string
  title: string
  body: string
  successMessage: string
  failureMessage: string
}

export interface IQuizItemOption {
  id: string
  quizItemId: string
  order: number
  correct: boolean
  texts: IQuizItemOptionText[]
}

export interface IQuizItemText {
  quizItemId: string
  languageId: string
  title: string
  body: string
  successMessage: string
  failureMessage: string
  minLabel: string
  maxLabel: string
  sharedOptionFeedbackMessage?: string
}

export interface IQuizItem {
  id: string
  quizId: string
  type: QuizItemType
  order: number
  minWords: number
  maxWords: number
  minValue: number
  maxValue: number
  validityRegex: string
  formatRegex: string
  multi: boolean
  texts: IQuizItemText[]
  options: IQuizItemOption[]
  usesSharedOptionFeedbackMessage: boolean
}

export interface ICourseText {
  courseId: string
  languageId: string
  abbreviation: string
  title: string
  body: string
}

export interface ICourse {
  id: string
  minScoreToPass: null | number
  minProgressToPass: null | number
  minPeerReviewsReceived: null | number
  minPeerReviewsGiven: null | number
  minReviewAverage: null | number
  maxSpamFlags: null | number
  languages: ILanguage[]
  texts: ICourseText[]
  organization: any
}

export interface IPeerReviewCollectionText {
  peerReviewCollectionId: string
  languageId: string
  title: string
  body: string
}

export type PeerReviewQuestionType = "grade" | "essay"

export interface IPeerReviewCollectionQuestionText {
  peerReviewQuestionId: string
  languageId: string
  title: string
  body: string
}

export interface IPeerReviewCollectionQuestion {
  id: string
  quizId: string
  peerReviewCollectionId: string
  default: boolean
  type: PeerReviewQuestionType
  answerRequired: boolean
  order: number
  texts: IPeerReviewCollectionQuestionText[]
}

export interface IPeerReviewCollection {
  id: string
  quizId: string
  questions: IPeerReviewCollectionQuestion[]
  texts: IPeerReviewCollectionText[]
}

export interface ILanguage {
  id: string
  country: string
  name: string
}

export interface IDashboardFilter {
  course: string
  language: string
  quiz: string
}

export interface IQuizAnswerSearchCriteria {
  minDate: null | string
  maxDate: null | string
  statuses: QuizAnswerStatus[]
  minSpamFlags: null | number
  maxSpamFlags: null | number
  minGivenPeerReviews: null | number
  maxGivenPeerReviews: null | number
  minReceivedPeerReviews: null | number
  maxReceivedPeerReviews: null | number
  minAverageOfGrades: null | number
  maxAverageOfGrades: null | number
}
