import {
  Box, Button,
  Card, CardContent,
  TextField, Stack
} from '@mui/material';
import React, { useState, useCallback } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { SuccessAccordion } from '../dashboard/success-accordion';
import styled from '@emotion/styled';
import { Form } from 'formik';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const SuccessListToolbar = (props) => {
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

  const [ inputStatus, setInputStatus ] = useState("bidding");

  const handleClickRadioButton = (radioBtnName) => {
    setInputStatus(radioBtnName)
  }

  const searchSuccess1 = useCallback((start, end, inputStatus) => {
    const startDate = getFormatDate(start)
    const endDate = getFormatDate(end)
    
    dispatch({
      type: 'INPUT_STATUS_REQUEST',
      inputStatus: {
        inputStatus
      }
    });
    if (inputStatus === "suc_bid") {
      dispatch({
        type: 'LOAD_SUCCESS_DATA_REQUEST',
        params: {
          startDate,
          endDate
        }
      });
    } else if (inputStatus === "bidding") {
      dispatch({
        type: 'LOAD_BIDDING_DATA_REQUEST',
        params: {
          startDate,
          endDate
        }
      });
    }
    
  }, []);

  const searchProgressStatus = () => {
    dispatch ({
      type: 'LOAD_PROGRESS_STATUS_REQUEST',
      
    })
  }

  const findPerformance = () => {
    dispatch ({
      type: 'LOAD_PERFORMANCE_REQUEST',
    })
  }

  const searchSuccess = async() => {
    await searchSuccess1(start, end, inputStatus);
    await searchProgressStatus();
    await findPerformance();
  }

  return (
    
    <Box {...props}>
      <Box>
        <SuccessAccordion />
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
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="입찰 진행중"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value={inputStatus} checked={inputStatus === "bidding"} control={<Radio />} label="입찰 진행중" onChange={() => 
                                  handleClickRadioButton("bidding")
                                }/>
                    <FormControlLabel value={inputStatus} checked={inputStatus === "suc_bid"} control={<Radio />} label="낙찰" onChange={() => 
                                  handleClickRadioButton("suc_bid")
                                }/>
                  </RadioGroup>
                </FormControl>
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
                  onClick={() => searchSuccess(start, end, inputStatus)}
                  color="primary"
                  variant="contained"
                >
                  조회
                </Button>
                {/* <Button
                color="primary"
                variant="contained"
              >
                낙찰취소
              </Button> */}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}