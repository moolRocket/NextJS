import {
  Box, Button,
  Card, CardContent,
  Radio, RadioGroup, 
  FormControl, FormControlLabel, FormLabel,
  Stack, TextField
} from '@mui/material';
import React, { useState, useCallback } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch } from 'react-redux';

export const BidListToolbar = (props) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const getFormatDate=(date)=> {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month: '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

  const searchBids = useCallback((start, end)=>{
    const startDate = getFormatDate(start);
    const endDate = getFormatDate(end);
    console.log(startDate, endDate)

    dispatch({ 
      type: 'LOAD_BIDS_DATA_REQUEST', 
      params: {
        startDate,
        endDate,
        bidStatus: 1
      }
    });
  }, []);


  return (
    <Box {...props}>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box 
            flexDirection= "row"
            sx={{ 
              maxWidth: 500
            }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="start"
                value={start}
                onChange={(newDate) => {
                  setStart(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}> 
              <DatePicker
                label="end"
                value={end}
                onChange={(newDate) => {
                  setEnd(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Box sx={{ m: 1 }}>
              <Button
                onClick={()=> searchBids(start, end)}
                color="primary"
                variant="contained"
              >
                조회
              </Button>
              {/* <Button
                color="primary"
                variant="contained"
              >
                취소
              </Button> */}
              {/* <Button
                // onClick= {onClickMakeSuccess}
                color="primary"
                variant="contained"
              >
                입찰시작 */}
              {/* </Button> */}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </Box>
);
}