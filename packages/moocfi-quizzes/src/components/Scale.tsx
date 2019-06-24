import * as React from "react"
import { useSelector, shallowEqual } from "react-redux"
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core"

type ScaleProps = {
  handleIntDataChange: Function
  intData: number
  item: any
}

const Scale: React.FunctionComponent<ScaleProps> = ({
  handleIntDataChange,
  intData,
  item,
}) => {
  let number_of_options = 7
  const answer = useSelector((state: any) => state.quiz)
  const answered = answer.id ? true : false

  if (item.minValue && item.maxValue) {
    number_of_options = item.maxValue - item.minValue + 1
  }
  return (
    <div>
      <FormControl fullWidth>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: "40%" }}>
                <FormLabel>
                  <Typography variant="subtitle1">
                    {item.texts[0].title}
                  </Typography>
                </FormLabel>
              </TableCell>
              <TableCell style={{ width: "40%" }}>
                <RadioGroup
                  row
                  aria-label="agreement"
                  name="agreement"
                  value={`${intData}`}
                  onChange={handleIntDataChange}
                >
                  {Array.from(
                    { length: number_of_options },
                    (v, i) => (item.minWords ? item.minWords : 1) + i,
                  ).map(number => (
                    <FormControlLabel
                      key={number}
                      value={`${number}`}
                      control={<Radio {...radioButtonOptions(answered)} />}
                      label={`${number}`}
                      labelPlacement="start"
                    />
                  ))}
                </RadioGroup>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FormControl>
    </div>
  )
}

const radioButtonOptions = answered => {
  const color = "primary"
  let options = {
    style: {
      paddingLeft: 0,
    },
    color,
    disabled: false,
  }

  if (answered) {
    options.disabled = true
  }
  return options
}

export default Scale
