import { QuizAnswer, QuizItemAnswer } from "@quizzes/common/models"
import { IQuizAnswerQuery } from "@quizzes/common/types"
import { Service } from "typedi"
import { EntityManager, SelectQueryBuilder } from "typeorm"
import { InjectManager } from "typeorm-typedi-extensions"

@Service()
export class PeerReviewService {
  @InjectManager()
  private entityManager: EntityManager

  public async getAnswersToReview(id: string, answerer: string) {
    // tslint:disable-next-line:max-line-length
    const stuff = await this.entityManager.query(
      "select * from quiz_answer join peer_review on quiz_answer.id = peer_review.quiz_answer_id where quiz_id = '3c954097-268f-44bf-9d2e-1efaf9e8f122' and peer_review.user_id = '73876';",
    )
    console.log(stuff)
  }
}

export default { PeerReviewService }
