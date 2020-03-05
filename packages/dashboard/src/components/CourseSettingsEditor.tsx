import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core"
import * as React from "react"
import { connect } from "react-redux"
import { ICourse, IQuiz } from "../interfaces"

interface ICourseSettingsEditorProps {
  course: ICourse
  quizzesOnCourse: { courseId: string; quizzes: IQuiz[] }
}

const CourseSettingsEditor: React.FunctionComponent<
  ICourseSettingsEditorProps
> = ({ course, quizzesOnCourse }) => {
  const someQuizContainsPeerReviews = quizzesOnCourse.quizzes.some(
    quiz =>
      !!(quiz.peerReviewCollections && quiz.peerReviewCollections.length > 0),
  )

  return (
    <Grid container={true} style={{ marginTop: "16px" }} spacing={8}>
      <Grid item={true} xs={12} md={6} lg={someQuizContainsPeerReviews ? 4 : 6}>
        <Typography variant="subtitle1" style={{ paddingLeft: "24px" }}>
          General information
        </Typography>

        <List dense={true}>
          <ListItem>
            <ListItemText
              primary={`Number of quizzes: ${quizzesOnCourse.quizzes.length}`}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={`Available points: ${quizzesOnCourse.quizzes.reduce(
                (acc, quiz: IQuiz) => {
                  return quiz.excludedFromScore ||
                    typeof quiz.points !== "number"
                    ? acc
                    : acc + quiz.points
                },
                0,
              )}`}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item={true} xs={12} md={6} lg={someQuizContainsPeerReviews ? 4 : 6}>
        <Typography variant="subtitle1" style={{ paddingLeft: "24px" }}>
          Course criteria
        </Typography>

        <List dense={true}>
          <ListItem>
            <ListItemText
              primary={`Minimum score to pass: ${valueOrLine(
                course.minScoreToPass,
              )}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Minimum progress to pass: ${valueOrLine(
                course.minProgressToPass,
              )}`}
            />
          </ListItem>
        </List>
      </Grid>

      {someQuizContainsPeerReviews && (
        <Grid item={true} xs={12} md={6} lg={4}>
          <Typography variant="subtitle1" style={{ paddingLeft: "24px" }}>
            Criteria for answers with peer reviews
          </Typography>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary={`Minimum peer reviews received: ${valueOrLine(
                  course.minPeerReviewsReceived,
                )}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Min peer reviews given: ${valueOrLine(
                  course.minPeerReviewsGiven,
                )}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Min peer review average: ${valueOrLine(
                  course.minReviewAverage,
                )}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Max spam flags: ${valueOrLine(course.maxSpamFlags)}`}
              />
            </ListItem>
          </List>
        </Grid>
      )}
    </Grid>
  )
}

const valueOrLine = (value: any) => {
  if (value == null) {
    return "-"
  }
  return value
}

const mapStateToProps = (state: any) => ({
  course: state.courses.find(c => c.id === state.filter.course),
  quizzesOnCourse: state.quizzes.courseInfos.find(
    ci => ci.courseId === state.filter.course,
  ),
})

export default connect(mapStateToProps)(CourseSettingsEditor)
