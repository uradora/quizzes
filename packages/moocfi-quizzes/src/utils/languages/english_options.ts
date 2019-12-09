import { SingleLanguageLabels } from "./index"

const englishLabels: SingleLanguageLabels = {
  essay: {
    exampleAnswerLabel: "Answer example",
    userAnswerLabel: "Your answer",
    currentNumberOfWordsLabel: "Words",
    textFieldLabel: "Your answer",
    conformToLimitsToSubmitLabel:
      "Modify your answer to conform to the word limits to submit",
    wordLimitsGuidance: (min, max) => {
      if (!min && !max) {
        return ""
      }
      if (!min) {
        return `Your answer should not exceed ${max} words`
      }

      if (!max) {
        return `Your answer should be at least ${min} words long`
      }
      return `Your answer should be between ${min} and ${max} words`
    },
  },
  open: {
    placeholder: "Answer",
    userAnswerLabel: "Your answer",
    feedbackForSuccess: "Your answer is correct",
    feedbackForFailure: "Your answer is not correct",
  },
  peerReviews: {
    loadingLabel: "Loading",
    chooseButtonLabel: "Choose",
    chooseEssayInstruction: "Choose one of the essays for peer review",
    chosenEssayInstruction: "Review the chosen answer",
    givenPeerReviewsLabel: "Peer reviews given",
    noPeerAnswersAvailableLabel: "No answers available for peer review",
    reportAsInappropriateLabel: "Report as inappropriate",
    submitPeerReviewLabel: "Submit review",
    peerReviewsCompletedInfo: "All peer reviews have been submitted",
    giveExtraPeerReviews:
      "You have reviewed the minimum number of peer essays. You may continue to \
        review your peers' works, thereby increasing the probability of your own answer being selected by others!",
    giveExtraPeerReviewsQuizConfirmed:
      "You may still give peer reviews to help others",
    displayPeerReview: "Give peer review",
    hidePeerReviewLabel: "Hide",
    quizInvolvesNoPeerReviewsInstruction: "This quiz involves no peer reviews",
    peerReviewsInfoForLoggedOutUser: "The quiz includes peer reviews",
    essayQuestionAnswerTextBoxLabel: "Write the requested review",
    optionLabel: "Option",
    answerRejected: "Your answer was rejected",
    answerFlaggedAsSpam: "Your answer was rejected as inappropriate",
    answerConfirmed: "Your answer has been confirmed!",
    manualReview: "Your answer is being reviewed by course staff",
  },
  receivedPeerReviews: {
    averageOfGradesLabel:
      "The average of all the answers to numerical questions",
    detailedViewLabel: "All the reviews your answer has received",
    errorLabel:
      "An error occurred in displaying the peer reviews you've received. Reloading the page could help",
    loadingLabel: "Loading the received peer reviews...",
    noPeerReviewsReceivedlabel:
      "Your answer has not yet received any peer reviews. You can improve your chances to be chosen by reviewing other people's works!",
    noSupportForQuestionTypeLabel:
      "This kind of peer review question is not supported",
    numberOfPeerReviewsText: n =>
      `Your answer has received ${n} peer review${n > 1 ? "s" : ""}.`,
    summaryViewLabel: "Information on the received peer reviews",
    toggleButtonExpandLabel:
      "Show all the peer reviews your answer has received",
    toggleButtonShrinkLabel: "Show only summary",
  },
  unsupported: {
    notSupportedInsert: (itemType: string) =>
      `Question of type '${itemType}' is not supported.`,
  },
  multipleChoice: {
    selectCorrectAnswerLabel: "Select correct answer",
    chooseAllSuitableOptionsLabel: "Choose all suitable options",
    answerCorrectLabel: "Correct",
    answerIncorrectLabel: "Incorrect",
  },
  stage: {
    answerStageLabel: "Answering the quiz",
    givingPeerReviewsStageLabel: "Giving peer reviews",
    receivingPeerReviewsStageLabel: "Receiving peer reviews",
    evaluationStageLabel: "Grading the answer",
  },
  general: {
    pastDeadline: "You can no longer submit an answer",
    answerMissingBecauseQuizModifiedLabel:
      "Question not answered. Quiz has probably been modified after your answer.",
    submitButtonLabel: "Submit",
    errorLabel: "Error",
    loginToViewPromptLabel: "Log in to view the quiz",
    loginToAnswerPromptLabel: "Log in to answer the quiz",
    loadingLabel: "Loading",
    answerCorrectLabel: "The answer is correct",
    alreadyAnsweredLabel: "You have already answered",
    answerIncorrectLabel: "The answer is incorrect",
    kOutOfNCorrect: (k, n) => `${k}/${n} answers correct`,
    pointsAvailableLabel: "Points available in the quiz",
    pointsReceivedLabel: "Points awarded to you",
    incorrectSubmitWhileTriesLeftLabel:
      "The answer was not fully correct - you may try again!",
    triesRemainingLabel: "Tries remaining",
    quizLabel: "Quiz",
    pointsLabel: "Points",
    triesNotLimitedLabel: "Number of tries is unlimited",
    submitGeneralFeedbackLabel: "Submitted",
    submitButtonAlreadyAnsweredLabel: "Answered",
    pointsGrantingPolicyInformer: policy => {
      switch (policy) {
        case "grant_only_when_answer_fully_correct":
          return "Answer must be fully correct to receive points"
        case "grant_whenever_possible":
          return ""
        default:
          return ""
      }
    },
  },
}

export default englishLabels
