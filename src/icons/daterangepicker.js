import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import { useDispatch, useSelector } from 'react-redux';

const DateRangePicker = () => {
  // const dispatch = useDispatch();
  // const { startDate, endDate } = useSelector(state => state.Date);

  // action 생성함수를 시행해야한다
  // const onChangeDate = React.useCallback((value) => () => {
  //   dispatch(생성함수(value));
  // })

  const [value, setValue] = React.useState([null, null]);
  console.log(value[0]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDateRangePicker
          startText="조회 일자"
          endText="yyyy-mm-dd"
          value={value} 
          inputFormat={"yyyy-MM-dd"}
          mask={"____-__-__"}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </Stack>
    </LocalizationProvider>    
  );
}
export default DateRangePicker;