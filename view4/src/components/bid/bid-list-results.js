import React, { useCallback, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box, Button, Card, Checkbox, Collapse,
  Table, TableBody, TableCell,
  TableHead, TableRow, TextField, Typography,
  IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function FormattedInputs(props) {
  const dispatch = useDispatch();

  const { oldPrice, BCP_SN } = props;
  const [newprice, setPrice] = useState(oldPrice);
  
  const handleChange = (event) => {
    setPrice( event.target.value );
    dispatch({
      type: 'PRICE_CHANGE',
      price: event.target.value,
    })
  };

  return (
      <TextField
        prefix='₩'
        value={newprice}
        onChange={handleChange}
        variant="standard"
      />
  );
}

function Row(props) {
  const dispatch = useDispatch();
  const { bid, bidDetails, price, bid_sn, bcp_sn, regDate, search_date } = props;
  const [open, setOpen] = useState([false, 0]);
  const start = search_date.startDate;
  const end = search_date.endDate;

  const getFormatDate=(date)=> {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month: '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

  const [bidEndDate, setBidEndDate] = useState(new Date());
  const bidEndDateChange = (newValue) => {
    setBidEndDate(newValue);
  }
  const [bidStartDate, setBidStartDate] = useState(new Date());
  const bidStartDateChange = (newValue) => {
    setBidStartDate(newValue);
  }

  const searchBidDetails = (BID_SN) => {
    dispatch({
      type: 'LOAD_BIDS_DETAIL_REQUEST',
      bid_sn_one: BID_SN
    })
  }
  const onClickDetails = async (BID_SN) => {
    searchBidDetails(BID_SN);
    setOpen([!open[0], BID_SN]);
    dispatch({
      type: 'BID_SN_CHANGE',
      bid_sn: BID_SN
    })
  }
  const changePrice = async (price, bcp_sn) => {
    dispatch({
      type: 'LOAD_CHANGE_PRICE_REQUEST',
      params: {
        product_sn: bcp_sn,
        price
      }
    })
  }

  const makeSuccess = async (BID_SN, bidStartDate, bidEndDate) => {
    const updateStartDate = getFormatDate(bidStartDate);
    const updateEndDate = getFormatDate(bidEndDate);
    dispatch({
      type:'MAKE_SUCCESS_DATA_REQUEST',
      params: {
        bid_sn: BID_SN,
        updateStartDate,
        updateEndDate
      }
    })
  }
  const searchBids = useCallback((start, end)=>{
    dispatch({ 
      type: 'LOAD_BIDS_DATA_REQUEST', 
      params: {
        startDate: start,
        endDate: end,
        bidStatus: 0
      }
    });
  }, []);
  
  const onClickMakeSuccess = async(BID_SN, bidStartDate, bidEndDate) => {
    await makeSuccess(BID_SN, bidStartDate, bidEndDate);
    await searchBids(start, end);
  }

  return (
    <>
      <TableRow
        hover
        key={bid.BID_SN}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="big"
            onClick={() => onClickDetails(bid.BID_SN)}
          >
            {open[0] && (open[1] === bid.BID_SN) && (open[1] === bid_sn)
              ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
        {((bid.LOT_REGDATE).split('T'))[0]}
        </TableCell>
        <TableCell>
          {bid.BID_SN}
        </TableCell>
        <TableCell>
          {bid.LOT_SN}
        </TableCell>
        <TableCell>
          {bid.SUM_WEIGHT}
        </TableCell>
        <TableCell>
          {bid.GUEST_COMPANY_NAME}
        </TableCell>
        <TableCell>
          {bid.SUM_OFFER_PRICE}
        </TableCell>
        <TableCell>
          {bid.START_CITY_NAME}
        </TableCell>
        <TableCell>
          {bid.DESTINATION_CITY_NAME}
        </TableCell>
        <TableCell>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="입찰시작일자"
              inputFormat={'yyyy-MM-dd HH:mm'}
              mask={"____-__-__"}
              value={bidStartDate}
              onChange={bidStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </TableCell>
        <TableCell>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="입찰종료일자"
              inputFormat={'yyyy-MM-dd HH:mm'}
              mask={"____-__-__"}
              value={bidEndDate}
              onChange={bidEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </TableCell>
        <TableCell>
          <Button
            onClick={()=>onClickMakeSuccess(bid.BID_SN, bidStartDate, bidEndDate)}
            color="primary"
            variant='contained'
          >
            입찰시작
          </Button>
        </TableCell>
      </TableRow>
      <>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open[0]&&(bid.BID_SN === bid_sn) ? true : false} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant='h6' gutterBottom component="div">
                  DETAIL
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        제품번호
                      </TableCell>
                      <TableCell>
                        중량
                      </TableCell>
                      <TableCell>
                        고객사
                      </TableCell>
                      {/* <TableCell>
                        출발지
                      </TableCell>
                      <TableCell>
                        출발지 상세주소
                      </TableCell> */}
                      <TableCell>
                        목적지
                      </TableCell>
                      <TableCell>
                        목적지 상세주소
                      </TableCell>
                      <TableCell>
                        편성일시
                      </TableCell>
                      <TableCell>
                        제안가 (만원)
                      </TableCell>
                      <TableCell>
                        계약가 (만원)
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bidDetails.map((bidDetail) => (
                      <TableRow
                        hover
                        key={bidDetail.BCP_SN}
                      >
                        <TableCell>
                          {bidDetail.PRODUCT_NAME}
                        </TableCell>
                        <TableCell>
                          {bidDetail.PRODUCT_WEIGHT}
                        </TableCell>
                        <TableCell>
                          {bidDetail.GUEST_COMPANY_NAME}
                        </TableCell>
                        {/* <TableCell>
                          출발지명
                        </TableCell>
                        <TableCell>
                          출발지상세주소
                        </TableCell> */}
                        <TableCell>
                          {bidDetail.DESTINATION_CITY}
                        </TableCell>
                        <TableCell>
                          {bidDetail.DESTINATION_DTL}
                        </TableCell>
                        <TableCell>
                          {regDate.split('2022-')[1]}
                        </TableCell>
                        <TableCell>
                          <FormattedInputs 
                            oldPrice={bidDetail.PRODUCT_OFFER_PRICE} 
                            BCP_SN = {bidDetail.BCP_SN}
                          />
                        </TableCell>
                        <TableCell>
                          {bidDetail.PRODUCT_UNIT_PRICE}
                        </TableCell>
                        <TableCell>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={()=> changePrice(price, bidDetail.BCP_SN)}
                        >
                          저장
                        </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>

          </TableCell>
        </TableRow>
      </>
    </>
  )

}

export const BidListResults = ({ ...rest }) => {
  const { bids, bid_sn, bidDetails, price, bcp_sn, search_date } = useSelector(state => state.bids);


  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  LOT편성일자
                </TableCell>
                <TableCell>
                  입찰번호
                </TableCell>
                <TableCell>
                  LOT번호
                </TableCell>
                <TableCell>
                  총 중량
                </TableCell>
                <TableCell>
                  고객사
                </TableCell>
                <TableCell>
                  운임
                </TableCell>
                <TableCell>
                  출발지명
                </TableCell>
                <TableCell>
                  목적지명
                </TableCell>
                <TableCell>
                  입찰시작일자
                </TableCell>
                <TableCell>
                  입찰종료일자
                </TableCell>
                <TableCell>
                  확정
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bids.map((bid) => (
                <Row key={bid.BID_SN} bid={bid} bid_sn={bid_sn} bidDetails={bidDetails} price={price} bcp_sn={bcp_sn} 
                search_date={search_date} regDate={((bid.LOT_REGDATE).split('T'))[0]} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};