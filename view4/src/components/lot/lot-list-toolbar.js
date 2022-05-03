import {
  Box, Button,
  Card, CardContent, Container, Grid,
  Radio, RadioGroup, FormControl, FormControlLabel, FormLabel,
  TextField, Stack,  Snackbar, MuiAlert  
} from '@mui/material';
import React, { useState, useCallback } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';

import { LotAccordion } from '../dashboard/lot-accordion';

export const LotListToolbar = (props) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(new Date);
  const [end, setEnd] = useState(new Date);

  const getFormatDate = (date) => {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

  const searchLots = useCallback((start, end) => {
    const startDate = getFormatDate(start);
    const endDate = getFormatDate(end);
    console.log(startDate, endDate)

    dispatch({
      type: 'LOAD_LOTS_DATA_REQUEST',
      params: {
        startDate,
        endDate
      }
    });
  }, []);

  return (
    <Box {...props}>
      <Box sx={{ mt: 1 }}>
        <Box sx={{ paddingBottom: 3 }}>
        </Box>
          <LotAccordion />
        <Card>
          <CardContent>
            <Box
              display="flex"
              sx={{
                maxWidth: 1000
              }}>
              <Box sx={{ padding: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="start"
                    inputFormat='yyyy-MM-dd'
                    mask='____-__-__'
                    value={start}
                    onChange={(newDate) => {
                      setStart(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ padding: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="end"
                    inputFormat='yyyy-MM-dd'
                    mask='____-__-__'
                    value={end}
                    onChange={(newDate) => {
                      setEnd(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              {/* <FormControl>
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
            </FormControl>  */}
              <Box sx={{ m: 1, padding: 2 }}>
                <Button
                  onClick={() => searchLots(start, end)}
                  color="primary"
                  variant="contained"
                >
                  조회
                </Button>
                {/* <Button
                color="primary"
                variant="contained"
              >
                편성취소
              </Button> */}
              </Box>

            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}