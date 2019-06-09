import {
  Button,
  Card,
  Grid,
  IconButton,
  RootRef,
  Typography,
} from "@material-ui/core"
import ExpandLess from "@material-ui/icons/ExpandLess"
import MoreVert from "@material-ui/icons/MoreVert"
import React from "react"
import { connect } from "react-redux"
import { setCourse, setQuiz } from "../../store/filter/actions"
import ItemAnswer from "./ItemAnswer"
import PeerReviewsModal from "./PeerReviewsModal"

class Answer extends React.Component<any, any> {
  private answerRef: React.RefObject<HTMLElement>

  constructor(props) {
    super(props)
    this.answerRef = React.createRef<HTMLElement>()
    this.state = {
      expanded: false,
      modalOpen: false,
    }
  }

  public render() {
    const peerAverage = this.average(this.props.answerData.peerReviews)
    const peerSd = this.standardDeviation(this.props.answerData.peerReviews)

    const peerReviewCollections = this.props.quizzes.find(
      q => q.id === this.props.answerData.quizId,
    ).peerReviewCollections

    return (
      <RootRef rootRef={this.answerRef}>
        <Grid item={true} xs={12} style={{ marginRight: "1em" }}>
          <Card
            raised={true}
            square={true}
            style={{
              borderLeft:
                "1em solid " +
                (this.props.answerData.status === "submitted" ||
                this.props.answerData.status === "spam"
                  ? "#FB6949"
                  : "#49C7FB"),
            }}
          >
            <Grid container={true} justify="center">
              <Grid item={true} xs={12}>
                <ItemAnswer
                  idx={this.props.idx}
                  answer={this.props.answerData}
                  quiz={this.props.quiz}
                  fullLength={this.state.expanded}
                />
              </Grid>

              {!this.state.expanded && (
                <Grid item={true} xs="auto">
                  <IconButton onClick={this.showMore}>
                    <MoreVert />
                  </IconButton>
                </Grid>
              )}

              {this.state.expanded && (
                <React.Fragment>
                  <PeerReviewsSummary
                    peerReviewsAnswers={this.props.peerReviews}
                    peerReviewsQuestions={
                      peerReviewCollections.length > 0
                        ? peerReviewCollections[0].questions
                        : []
                    }
                    answer={this.props.answerData}
                    spamFlags={
                      this.props.answerStatistics.find(
                        as => as.quiz_answer_id === this.props.answerData.id,
                      ).count
                    }
                    setQuiz={this.props.setQuiz}
                  />
                  <Grid item={true} xs="auto">
                    <IconButton onClick={this.showLess}>
                      <ExpandLess />
                    </IconButton>
                  </Grid>
                </React.Fragment>
              )}

              <Grid item={true} xs={12} style={{ backgroundColor: "#E5E5E5" }}>
                <Grid
                  container={true}
                  spacing={8}
                  justify="space-between"
                  style={{
                    padding: ".5em .5em .25em .5em",
                    // margin: ".5em 0em .25em 0em"
                  }}
                >
                  <Grid item={true} xs={6} lg={4}>
                    <Grid container={true} justify="flex-start" spacing={16}>
                      <Grid item={true} xs="auto">
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#029422",
                            borderRadius: "0",
                            color: "white",
                          }}
                        >
                          Accept
                        </Button>
                      </Grid>

                      <Grid item={true} xs="auto">
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#D80027",
                            borderRadius: "0",
                            color: "white",
                          }}
                        >
                          Reject
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item={true} xs={2} style={{ textAlign: "center" }}>
                    <Typography>
                      Avg:{" "}
                      {peerAverage || peerAverage === 0
                        ? peerAverage.toFixed(2)
                        : "-"}
                    </Typography>

                    <Typography>
                      SD: {peerSd || peerSd === 0 ? peerSd.toFixed(2) : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </RootRef>
    )
  }

  private average = (allPeerReviews: any): number | undefined => {
    const allGrades = allPeerReviews
      .map(pr => pr.answers)
      .flat()
      .filter(pAnswer => pAnswer.value !== null)
      .map(pAnswer => pAnswer.value)
    if (allGrades.length === 0) {
      return undefined
    }
    const sum = allGrades.reduce((acc, elem) => acc + elem, 0)
    return sum / allGrades.length
  }

  // population sd, not sample
  private standardDeviation = (allPeerReviews: any): number | undefined => {
    const allGrades = allPeerReviews
      .map(pr => pr.answers)
      .flat()
      .filter(pAnswer => pAnswer.value !== null)
      .map(pAnswer => pAnswer.value)

    if (allGrades.length === 0) {
      return undefined
    }
    const avg = this.average(allPeerReviews)
    if (avg === undefined) {
      return undefined
    }
    const sum =
      allGrades.reduce((acc, elem) => acc + Math.pow(elem - avg, 2), 0) /
      allGrades.length
    return Math.sqrt(sum)
  }

  private showMore = () => {
    this.setState({
      expanded: true,
    })
  }

  private showLess = () => {
    if (!this.answerRef.current) {
      return
    }
    scrollTo({
      left: 0,
      top: this.answerRef.current.offsetTop - 100,
      behavior: "smooth",
    })
    this.setState({
      expanded: false,
    })
  }
}

class PeerReviewsSummary extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
    }
  }

  public render() {
    if (this.props.peerReviewsQuestions.length === 0) {
      return (
        <Grid item={true} xs={12}>
          <Typography variant="title">Quiz involves no peer reviews</Typography>
        </Grid>
      )
    }

    return (
      <Grid item={true} xs={12} style={{ margin: "0em 0em 1em 1em" }}>
        <Grid
          container={true}
          justify="flex-start"
          alignItems="stretch"
          spacing={16}
        >
          <Grid
            item={true}
            xs={12}
            md={3}
            style={{ borderRight: "1px dashed #9D9696" }}
          >
            <Typography variant="subtitle1" color="textSecondary">
              SPAM FLAGS: {this.props.spamFlags}
            </Typography>
            <Button variant="outlined" onClick={this.openModal}>
              VIEW PEER REVIEWS
            </Button>
          </Grid>

          <Grid item={true} xs={12} md={9}>
            <Grid
              container={true}
              alignItems="center"
              spacing={24}
              style={{ marginBottom: "2em" }}
            >
              <Grid item={true} xs={4} lg={3} xl={2} />
              <Grid item={true} xs={4}>
                <Typography variant="subtitle1">AVERAGE POINTS</Typography>
              </Grid>
              <Grid item={true} xs={4}>
                <Typography variant="subtitle1">STANDARD DEVIATION</Typography>
              </Grid>

              <Grid item={true} xs="auto" lg={1} xl={2} />

              {this.props.peerReviewsAnswers &&
                (this.props.peerReviewsAnswers.length === 0 ||
                  this.props.peerReviewsAnswers[0].quizAnswerId ===
                    this.props.answer.id) &&
                this.props.peerReviewsQuestions.map((question, idx) => {
                  const average = this.averagePoints(
                    this.props.peerReviewsAnswers,
                    idx,
                  )

                  const sd = this.standardDeviation(
                    this.props.peerReviewsAnswers,
                    idx,
                  )

                  return (
                    <React.Fragment key={question.id}>
                      <Grid item={true} xs={4} lg={3} xl={2}>
                        {question.texts[0].title || "No title"}
                        {question.type === "essay" && " (Essay)"}:
                      </Grid>
                      <Grid item={true} xs={4}>
                        {question.type === "essay"
                          ? "NA"
                          : average === undefined
                          ? "-"
                          : average.toFixed(2)}
                      </Grid>
                      <Grid item={true} xs={4}>
                        {question.type === "essay"
                          ? "NA"
                          : sd === undefined
                          ? "-"
                          : sd.toFixed(2)}
                      </Grid>
                      <Grid item={true} xs="auto" lg={1} xl={2} />
                    </React.Fragment>
                  )
                })}
            </Grid>
          </Grid>
        </Grid>
        <PeerReviewsModal
          answer={this.props.answer}
          peerReviews={this.props.peerReviewsAnswers}
          open={this.state.modalOpen}
          onClose={this.closeModal}
        />
      </Grid>
    )
  }

  private averagePoints = (
    prAnswers: any[],
    questionIdx: number,
  ): number | undefined => {
    const scores = prAnswers.map(a => a.answers[questionIdx].value)
    if (scores.length === 0) {
      return undefined
    }

    return scores.reduce((acc, score) => acc + score, 0) / scores.length
  }

  private standardDeviation = (
    prAnswers: any[],
    questionIdx: number,
  ): number | undefined => {
    const scores = prAnswers.map(a => a.answers[questionIdx].value)
    if (scores.length === 0) {
      return undefined
    }
    const average = this.averagePoints(prAnswers, questionIdx)
    if (average === undefined) {
      return undefined
    }
    // population sd, not sample
    return Math.sqrt(
      scores.reduce((acc, elem) => acc + Math.pow(elem - average, 2), 0) /
        scores.length,
    )
  }

  private openModal = () => {
    this.setState({
      modalOpen: true,
    })
  }

  private closeModal = () => {
    this.setState({
      modalOpen: false,
    })
  }
}

const mapStateToProps = state => {
  return {
    answerStatistics: state.answerStatistics,
    quizzes: state.quizzes.find(qi => qi.courseId === state.filter.course)
      .quizzes,
  }
}

export default connect(
  mapStateToProps,
  { setCourse, setQuiz },
)(Answer)
