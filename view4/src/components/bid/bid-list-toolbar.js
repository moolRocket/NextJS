import {
  Box, Button,
  Card, CardContent, TextField
} from '@mui/material';
import React, { useState, useCallback } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch } from 'react-redux';
import { LotAccordion } from '../dashboard/lot-accordion';

export const BidListToolbar = (props) => {
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

  const searchBids = useCallback((start, end) => {
    const startDate = getFormatDate(start);
    const endDate = getFormatDate(end);
    console.log(startDate, endDate);
    dispatch({
      type: 'SEARCH_DATE',
      date: {
        startDate: startDate,
        endDate: endDate
      } 
    })
    console.log("multiple dispatch")
    dispatch({
      type: 'LOAD_BIDS_DATA_REQUEST',
      params: {
        startDate,
        endDate,
        bidStatus: 0
      }
    });
  }, []);


  return (
    <Box {...props}>
      <Box>
        <LotAccordion />
      </Box>
      <Box sx={{ mt: 3 }}>
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
              <Box sx={{ m: 1, padding: 2 }}>
                <Button
                  onClick={() => searchBids(start, end)}
                  color="primary"
                  variant="contained"
                >
                  조회
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}