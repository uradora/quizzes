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

const FilterBox = ({ numberOfAnswers }) => {
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
          <QuizAnswersFilterSelection />
        </Grid>

        <Grid item={true} xs={12}>
          <Typography variant="subtitle1">Order options:</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

type QuizAnswerState =
  | "submitted"
  | "confirmed"
  | "spam"
  | "rejected"
  | "deprecated"

interface IQuizAnswersFilterSelectionState {
  minDate: null | string
  maxDate: null | string
  states: [QuizAnswerState?]
  minSpamFlags: null | number
  maxSpamFlags: null | number
  minGivenPeerReviews: null | number
  maxGivenPeerReviews: null | number
  minReceivedPeerReviews: null | number
  maxReceivedPeerReviews: null | number
  minAverageOfGrades: null | number
  maxAverageOfGrades: null | number
}

class QuizAnswersFilterSelection extends React.Component<
  any,
  IQuizAnswersFilterSelectionState
> {
  constructor(props) {
    super(props)

    const date = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)

    this.state = {
      minDate: null,
      maxDate: date.toLocaleDateString(),
      states: ["submitted"],
      minSpamFlags: null,
      maxSpamFlags: null,
      minGivenPeerReviews: null,
      maxGivenPeerReviews: null,
      minReceivedPeerReviews: null,
      maxReceivedPeerReviews: null,
      minAverageOfGrades: null,
      maxAverageOfGrades: null,
    }
  }

  public render() {
    return (
      <React.Fragment>
        <List>
          <ListItem>
            <Typography>Age</Typography>

            <TextField
              label="min"
              type="datetime-local"
              value={this.state.minDate != null ? this.state.minDate : ""}
              onChange={this.modifyField("minDate")}
            />
            <TextField
              label="max"
              type="datetime-local"
              value={this.state.maxDate != null ? this.state.maxDate : ""}
              onChange={this.modifyField("maxValue")}
            />
          </ListItem>

          <ListItem>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={false}
                      onChange={testFunction}
                      value="status1"
                    />
                  }
                  label="Status no 1"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={true}
                      onChange={testFunction}
                      value="status2"
                    />
                  }
                  label="Status no2"
                />
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

          <ListItem>
            Average of grades:
            <IntegerSelection
              min={this.state.minAverageOfGrades}
              max={this.state.maxAverageOfGrades}
              changeMax={this.modifyField("maxAverageOfGrades")}
              changeMin={this.modifyField("minAverageOfGrades")}
            />
          </ListItem>
        </List>

        <Button variant="outlined" color="primary">
          Filter
        </Button>
      </React.Fragment>
    )
  }

  private modifyField = (fieldName: string) => (e: any) => {
    const newState = { ...this.state }
    newState[fieldName] = e.target.value
    this.setState(newState)
  }
}

const testFunction = e => {
  console.log(
    "Something happened, here's the event target value: ",
    e.target.value,
  )
}

class Selection extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  public render() {
    return <div>yeet</div>
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

export default FilterBox
