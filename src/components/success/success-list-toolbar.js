import {
  Box, Button,
  Card, CardContent, 
  TextField, Stack
} from '@mui/material';
import React,{useState,useCallback} from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch } from 'react-redux';

export const SuccessListToolbar = (props) => {
  // dispatch
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

  const searchSuccess = useCallback((start, end) => {
    const startDate = getFormatDate(start)
    const endDate = getFormatDate(end)
    console.log(startDate, endDate)
    dispatch({ 
      type: 'LOAD_SUCCESS_DATA_REQUEST', 
      params: {
        startDate,
        endDate
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
                onClick={()=>searchSuccess(start, end)}
                color="primary"
                variant="contained"
              >
                조회
              </Button>
              <Button
                color="primary"
                variant="contained"
              >
                낙찰취소
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
}