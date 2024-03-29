import {
  Box, Button,
  Card, CardContent,
  Radio, RadioGroup,
  FormControl, FormControlLabel, FormLabel,
  Stack, TextField, ButtonGroup
} from '@mui/material';
import React, { useState, useCallback } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { LotAccordion } from '../dashboard/lot-accordion';

export const ProductListToolbar = (props) => {
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

  const searchProducts = useCallback((start, end) => {
    const startDate = getFormatDate(start);
    const endDate = getFormatDate(end);

    dispatch({
      type: 'LOAD_PRODUCTS_DATA_REQUEST',
      params: {
        startDate,
        endDate
      }
    });
  }, []);

  const { products_sn } = useSelector(state => state.products);
  console.log("***", products_sn);
  const makeLot = useCallback((products_sn) => {
    ll(products_sn);

  }, []);

  const ll = async(products_sn)=>{ 
    await dispatch({
      type: 'MAKE_LOT_REQUEST',
      products_sn
    });

    await dispatch({
      type: 'MANUAL_LOT_UP'
    });

    await dispatch({
      type: 'AVERGE_LOT_REQUEST'
    });

    await dispatch({
      type: 'DISPATCH_NUM_REQUEST'
    });
  }

  const makeAutoLot = useCallback(() => {
    ll2();
  }, []);

  const ll2 = async() => {

    await dispatch({
      type: 'MAKE_AUTO_LOT_REQUEST'
    });
  }

  const autolotup = async() => {
    await dispatch({
      type: 'AUTO_LOT_UP'
    });
  }

  // 함수...
  const onClickMakeLot = async () => {
    await makeLot(products_sn);
    await searchProducts(start, end);
    
  }

  const onClickAutoLot = async () => {
    await makeAutoLot();
    await setTimeout(() => {
      autolotup();
      searchProducts(start, end);
    }, 1000)
  }

  return (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
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
              <Box sx={{ m: 1, padding: 2 }}>
                <ButtonGroup variant='contained' aria-label="outlined primary button group">
                  <Button
                    onClick={() => searchProducts(start, end)}
                    color="primary"
                    variant="contained"
                  >
                    조회
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={onClickAutoLot}
                  >
                    LOT 자동 편성
                  </Button>
                  <Button
                    onClick={onClickMakeLot}
                    color="primary"
                    variant="contained"
                  >
                    LOT 편성
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}