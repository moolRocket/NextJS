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

export const LotListToolbar = (props) =>{ 
  const dispatch = useDispatch();
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [lotsOption, setLotsOption] = useState("All");

  const getFormatDate = (date) => {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month: '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }
  
  const searchLots = useCallback((start, end, lotsOption)=> {
    const startDate = getFormatDate(start);
    const endDate = getFormatDate(end);
    const iscancel = lotsOption === "All" ? 2 : (lotsOption==="Yes" ? 1 : 0);
    console.log(startDate, endDate, iscancel)

    dispatch({ 
      type: 'LOAD_LOTS_DATA_REQUEST', 
      params: {
        startDate,
        endDate,
        iscancel
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
            <div style={{flex: "nowrap"}} >
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
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">취소여부</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={lotsOption}
                onChange={(event) => {
                  setLotsOption(event.target.value);
                }}
              >
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl> 
            <div style={{flex:"nowrap"}}>
            <Box sx={{ m: 1 }}>
              <Button
                onClick={()=> searchLots(start, end, lotsOption)}
                color="primary"
                variant="contained"
              >
                조회
              </Button>
              {/* <Button
                color="primary"
                variant="contained"
              >
                입찰시작
              </Button> */}
              <Button
                color="primary"
                variant="contained"
              >
                편성취소
              </Button>
            </Box>
            </div>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </Box>
);
}