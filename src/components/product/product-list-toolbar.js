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
import { useDispatch, useSelector } from 'react-redux';

export const ProductListToolbar = (props) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [productsOption, setProductsOption] = useState("All");
  const getFormatDate=(date)=> {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month: '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

  const searchProducts = useCallback((start, end, productsOption)=>{
    const startDate = getFormatDate(start);
    const endDate = getFormatDate(end);
    const iscancel = productsOption === "All" ? 2 : (productsOption==="Yes" ? 1 : 0);
    console.log(startDate, endDate, iscancel)

    dispatch({ 
      type: 'LOAD_PRODUCTS_DATA_REQUEST', 
      params: {
        startDate,
        endDate,
        iscancel
      }
    });
  }, []);

  const { product_sn } = useSelector(state => state.products);
  console.log("sn", product_sn);

  const makeLot = useCallback((product_sn)=>{
    console.log("product_sn makelot herer",product_sn);
    dispatch({
      type: 'MAKE_LOT',
      product_sn
    });
  }, []);

  // 함수...
  const onClickMakeLot = async() => {
    await makeLot(product_sn);
    await searchProducts(start, end, productsOption);
    
  }

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
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">취소여부</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={productsOption}
                  onChange={(event) => {
                    setProductsOption(event.target.value);
                  }}
                >
                  <FormControlLabel value="All" control={<Radio />} label="All" />
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl> 
              <Box sx={{ m: 1 }}>
              <Button
                onClick={()=> searchProducts(start, end, productsOption)}
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
              <Button
                onClick={ onClickMakeLot }
                color="primary"
                variant="contained"
              >
                LOT 편성
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
}