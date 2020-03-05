import { Grid, Typography } from "@material-ui/core"
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

const QuizAnswersFilterSelection: React.FunctionComponent<any> = () => {
  return (
    <ul>
      <li>Age (both ends settable)</li>
      <li>Status (multiple selection)</li>
      <li>Spam flags (more than, fewer than than)</li>
      <li>Given peer reviews (more than, fewer than)</li>
      <li>Received peer reviews(more than, fewer than)</li>
      <li>Average of all grades (more, less)</li>
      <li>Other calculated statistical numbers</li>
    </ul>
  )
}

export default FilterBox
