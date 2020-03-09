import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import {
  IQuiz,
  IQuizAnswerSearchCriteria,
  QuizAnswerStatus,
} from "../../interfaces"
import { setAllAnswers } from "../../store/answers/actions"

interface IFilterBoxProps {
  numberOfAnswers: number
  quiz: IQuiz
  page: number
  answersPerPage: number
  loading: boolean
}

const FilterBox: React.FunctionComponent<IFilterBoxProps> = ({
  numberOfAnswers,
  quiz,
  page,
  answersPerPage,
  loading,
}) => {
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <React.Fragment>
      <Grid
        item={true}
        xs={12}
        style={{ marginBottom: "1.5em", textAlign: "center" }}
      >
        <Typography variant="title">FILTER OPTIONS</Typography>
      </Grid>

      <Grid
        container={true}
        spacing={32}
        style={{ backgroundColor: "gray", marginBottom: "1em" }}
      >
        <Grid item={true} xs={12}>
          <Typography variant="subtitle1">
            Total number of answers: {numberOfAnswers}
          </Typography>
        </Grid>

        <Grid item={true} xs={12}>
          <Typography variant="subtitle1">Filter options:</Typography>
          <ConnectedFilter
            quiz={quiz}
            page={page}
            answersPerPage={answersPerPage}
          />
        </Grid>

        <Grid item={true} xs={12}>
          <Typography variant="subtitle1">Order options:</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const statuses: QuizAnswerStatus[] = [
  "draft",
  "submitted",
  "enough-received-but-not-given",
  "spam",
  "confirmed",
  "rejected",
  "deprecated",
]

interface IQuizAnswersFilterSelectionState {
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
  submitEnabled: boolean
}

interface IQuizAnswersFilterSelectionProps {
  setAllAnswers: (
    quizId: string,
    pageNumber: number,
    answersPerPage: number,
    query?: IQuizAnswerSearchCriteria,
  ) => any
  quiz: IQuiz
  page: number
  answersPerPage: number
}

class QuizAnswersFilterSelection extends React.Component<
  IQuizAnswersFilterSelectionProps,
  IQuizAnswersFilterSelectionState
> {
  constructor(props) {
    super(props)

    const date = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)

    this.state = {
      minDate: null,
      maxDate: formatDateToTextField(new Date()),
      statuses: ["submitted"],
      minSpamFlags: null,
      maxSpamFlags: null,
      minGivenPeerReviews: null,
      maxGivenPeerReviews: null,
      minReceivedPeerReviews: null,
      maxReceivedPeerReviews: null,
      minAverageOfGrades: null,
      maxAverageOfGrades: null,
      submitEnabled: false,
    }
  }

  public render() {
    return (
      <React.Fragment>
        <List>
          <ListItem>
            <Typography>Age</Typography>

            <TextField
              variant="outlined"
              type="date"
              value={this.state.minDate != null ? this.state.minDate : ""}
              onChange={this.modifyField("minDate")}
            />
            <TextField
              variant="outlined"
              type="date"
              value={this.state.maxDate != null ? this.state.maxDate : ""}
              onChange={this.modifyField("maxDate")}
            />
          </ListItem>

          <ListItem>
            <FormControl>
              <FormGroup>
                <FormLabel>Status</FormLabel>

                {statuses.map(status => {
                  return (
                    <FormControlLabel
                      key={status}
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.statuses.includes(status)}
                          onChange={this.toggleStatus(status)}
                          value={status}
                        />
                      }
                      label={status}
                    />
                  )
                })}
              </FormGroup>
            </FormControl>
          </ListItem>

          <ListItem>
            Spam flags:
            <IntegerSelection
              min={this.state.minSpamFlags}
              max={this.state.maxSpamFlags}
              changeMax={this.modifyField("maxSpamFlags")}
              changeMin={this.modifyField("minSpamFlags")}
            />
          </ListItem>

          <ListItem>
            Given peer reviews:
            <IntegerSelection
              min={this.state.minGivenPeerReviews}
              max={this.state.maxGivenPeerReviews}
              changeMax={this.modifyField("maxGivenPeerReviews")}
              changeMin={this.modifyField("minGivenPeerReviews")}
            />
          </ListItem>

          <ListItem>
            Received peer reviews:
            <IntegerSelection
              min={this.state.minReceivedPeerReviews}
              max={this.state.maxReceivedPeerReviews}
              changeMax={this.modifyField("maxReceivedPeerReviews")}
              changeMin={this.modifyField("minReceivedPeerReviews")}
            />
          </ListItem>

          {/*
          <ListItem>
            Average of grades:
            <IntegerSelection
              min={this.state.minAverageOfGrades}
              max={this.state.maxAverageOfGrades}
              changeMax={this.modifyField("maxAverageOfGrades")}
              changeMin={this.modifyField("minAverageOfGrades")}
            />
          </ListItem>
        */}
        </List>

        <Button variant="outlined" color="primary" onClick={this.submitForm}>
          Filter
        </Button>
      </React.Fragment>
    )
  }

  private submitForm = async () => {
    const { submitEnabled, ...criteria } = this.state
    await this.props.setAllAnswers(
      this.props.quiz.id!,
      1,
      this.props.answersPerPage,
      criteria,
    )
    this.setState({
      submitEnabled: false,
    })
  }

  private modifyField = (fieldName: string) => (e: any) => {
    const newState = { ...this.state }
    newState[fieldName] = e.target.value
    this.setState(newState)
  }

  private toggleStatus = (statusName: QuizAnswerStatus) => () => {
    const wasChecked = this.state.statuses.includes(statusName)

    const newStatuses = wasChecked
      ? this.state.statuses.filter(name => name !== statusName)
      : this.state.statuses.concat(statusName)

    this.setState({
      statuses: newStatuses,
    })
  }
}

interface IntegerSelectionProps {
  min: null | number
  max: null | number
  changeMin: (e: any) => void
  changeMax: (e: any) => void
}

const IntegerSelection: React.FunctionComponent<IntegerSelectionProps> = ({
  min,
  changeMin,
  max,
  changeMax,
}) => {
  return (
    <FormGroup row={true}>
      <TextField
        variant="outlined"
        fullWidth={false}
        label={"Min:"}
        value={min != null ? min : ""}
        type="number"
        onChange={changeMin}
        style={{ maxWidth: "40%" }}
      />

      <TextField
        variant="outlined"
        fullWidth={false}
        label={"Max:"}
        value={max != null ? max : ""}
        type="number"
        onChange={changeMax}
        style={{ marginLeft: "12px", maxWidth: "40%" }}
      />
    </FormGroup>
  )
}

const formatDateToTextField = (date?: Date): string => {
  if (!date) {
    return ""
  }
  const otherDate = new Date(date)
  otherDate.setMinutes(otherDate.getMinutes() - otherDate.getTimezoneOffset())
  let stringDate = otherDate.toISOString()
  stringDate = stringDate.substring(0, stringDate.length - 8)
  return stringDate
}

const ConnectedFilter = connect(
  null,
  { setAllAnswers },
)(QuizAnswersFilterSelection)

export default FilterBox
