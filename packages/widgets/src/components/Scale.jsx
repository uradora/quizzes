import React from 'react'
import { RadioGroup, FormControl, FormLabel,
   FormControlLabel, Radio, Grid,
  Typography } from "@material-ui/core"


// for now set here - might this differ for different scales, or always 7...?
const scale_options = 7



const Scale = ({ handleIntOptionChange, intData, item }) => (

    <div>
    <FormControl fullWidth component="fieldset">

    <Grid container >

    <Grid item xs={4}>
      <FormLabel component="legend"><Typography variant="subtitle1">{item.texts[0].title}</Typography></FormLabel>
    </Grid>

    <Grid item xs>
      <RadioGroup 
        row
        aria-label="agreement"
        name="agreement"
        value={`${intData}`}
        onChange={handleIntOptionChange}
      >

      {
          Array.from(
              {length: scale_options},
              (v, i) => i+1
          ).map(
              number => (
                  <FormControlLabel
                  key={number}
                  value={`${number}`}
                  control={
                    <Radio color="primary" style={{
                      paddingLeft: 0
                    }} />
                  } 
                  label={`${number}`}
                  labelPlacement="start"
                  />
              
          ))
      }


        </RadioGroup>
      </Grid>      
    </Grid>

    </FormControl>
    </div>
   )

export default Scale
