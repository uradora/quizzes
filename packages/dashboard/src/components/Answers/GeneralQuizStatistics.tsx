import { Grid, Typography } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"

class GeneralStatistics extends React.Component<any, any> {
  public render() {
    return (
      <React.Fragment>
        <Grid
          item={true}
          xs={12}
          style={{ marginBottom: "1.5em", textAlign: "center" }}
        >
          <Typography variant="title">QUIZ STATISTICS</Typography>
        </Grid>

        <Grid item={true} xs="auto">
          <Grid
            container={true}
            spacing={32}
            style={{ backgroundColor: "#49C7FB", marginBottom: "1em" }}
          >
            <Grid item={true} xs={12}>
              <Typography variant="body1">
                Answers requiring attention: {this.props.numberOfAnswers}
              </Typography>
            </Grid>

            <Grid item={true} xs={12}>
              <Typography variant="body1">Statistical numbers:</Typography>
              <ul>
                <li>How many marked as spam?</li>
                <li>
                  How many worse received / given enough, but received poor
                  grades?
                </li>
                <li>How many have given enough, but not yet received?</li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    counts: state.answerCounts,
  }
}

export default connect(mapStateToProps)(GeneralStatistics)
