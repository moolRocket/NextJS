import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
  const [productsOption, setProductsOption] = React.useState("all");

  const productsOptionChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">대상취소여부</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={productsOption}
        onChange={productsOptionChange}
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
}
