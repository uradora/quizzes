import {
  Checkbox,
  FormControlLabel,
  Grid,
  Grow,
  TextField,
} from "@material-ui/core"
import React from "react"

interface IDeadlineSelectorProps {
  deadline: string
  deadlineChecked: boolean
  toggleDeadlineChecked: (e: any) => void
  handleDeadlineChange: (e: any) => void
  shouldAnimateTextField: boolean
}

const DeadlineSelector: React.FunctionComponent<IDeadlineSelectorProps> = ({
  deadline,
  deadlineChecked,
  toggleDeadlineChecked,
  handleDeadlineChange,
  shouldAnimateTextField,
}) => {
  return (
    <Grid container={true} justify="flex-start">
      <Grid item={true} xs="auto">
        <FormControlLabel
          control={
            <Checkbox
              checked={deadlineChecked}
              color="primary"
              onChange={toggleDeadlineChecked}
            />
          }
          label="Quiz has a deadline"
        />
      </Grid>

      <Grow
        style={{ transformOrigin: "right center" }}
        in={deadlineChecked}
        timeout={deadlineChecked && shouldAnimateTextField ? 500 : 0}
      >
        <Grid item={true} xs={6}>
          <TextField
            value={deadline}
            onChange={handleDeadlineChange}
            type="datetime-local"
          />
        </Grid>
      </Grow>
    </Grid>
  )
}

export default DeadlineSelector
