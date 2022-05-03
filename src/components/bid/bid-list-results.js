import React, { forwardRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
import NumberFormat from 'react-number-format';

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₩"
    />
  );
});

function Row(props) {
  const dispatch = useDispatch();
  const { bid, bidDetails } = props;
  const [open, setOpen] = useState([false, 0]);
  const [selectedBidSns, setSelectedBidSns] = useState([]);
  const [number, setNumber] = useState( 0
    
  //   {
  //   numberformat: bidDetails.map((bidDetail) => (
  //     bidDetail.PRODUCT_UNIT_PRICE
  //   ))
  // }
  
  )
  const numberformatChange = (event) => {
    setNumber({
      ...number,
      [event.target.name]: event.target.value,
    });
  };
  const [bidEndDate, setBidEndDate] = useState();
  const bidEndDateChange = (newValue) => {
    setBidEndDate(newValue);
  }
  const [bidStartDate, setBidStartDate] = useState();
  const bidStartDateChange = (newValue) => {
    setBidStartDate(newValue);
  }
  const handleSelectOne = (BID_SN) => {
    const selectedIndex = selectedBidSns.indexOf(BID_SN);
    let newSelectedBidSns = [];

    if (selectedIndex === -1) {
      newSelectedBidSns = newSelectedBidSns.concat(selectedBidSns, BID_SN);
    } else if (selectedIndex === 0) {
      newSelectedBidSns = newSelectedBidSns.concat(selectedBidSns.slice(1));
    } else if (selectedIndex === selectedBidSns.length - 1) {
      newSelectedBidSns = newSelectedBidSns.concat(selectedBidSns.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedBidSns = newSelectedBidSns.concat(
        selectedBidSns.slice(0, selectedIndex),
        selectedBidSns.slice(selectedIndex + 1)
      );
      console.log(newSelectedBidSns)
    }
    setSelectedBidSns(newSelectedBidSns);
    dispatch({
      type: 'BID_SN_CHANGE',
      bid_sn: newSelectedBidSns
    })
  };
  const searchBidDetails = (BID_SN) => {
    dispatch({
      type: 'LOAD_BIDS_DETAIL_REQUEST',
      bid_sn_one: BID_SN
    })
  }
  const onClickDetails = async (BID_SN) => {
    searchBidDetails(BID_SN);
    setOpen([!open[0], BID_SN]);
  }
  return (
    <>
      <TableRow
        hover
        key={bid.BID_SN}
        selected={selectedBidSns.indexOf(bid.BID_SN) !== -1}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={selectedBidSns.indexOf(bid.BID_SN) !== -1}
            onChange={() => handleSelectOne(bid.BID_SN)}
            value="true"
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="big"
            onClick={() => onClickDetails(bid.BID_SN)}
          >
            {open[0] && open[1] === bid.BID_SN
              ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          LOT 날짜
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
          {bid.GUEST_CITY_NAME}
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
            // onClick={onClickMakeSuccess}
            color="primary"
            variant='contained'
          >
            입찰시작
          </Button>
        </TableCell>
      </TableRow>
      <>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open[0]} timeout="auto" unmountOnExit>
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
                      <TableCell>
                        취소
                      </TableCell>
                      <TableCell>
                        취소내용
                      </TableCell>
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
                          랏편성일시
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={number.numberformat}
                            onChange={numberformatChange}
                            name="numberformat"
                            id="formatted-numberformat-input"
                            InputProps={{
                              inputComponent: NumberFormatCustom,
                            }}
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell>
                          {bidDetail.PRODUCT_UNIT_PRICE}
                        </TableCell>
                        <TableCell>
                          {bidDetail.LOT_ISCANCEL === 0 ? "Yes" : "No"}
                        </TableCell>
                        <TableCell>
                          취소내용
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  color="primary"
                  variant="contained"
                >
                  저장
                </Button>
              </Box>
            </Collapse>

          </TableCell>
        </TableRow>
      </>
    </>
  )

}

export const BidListResults = ({ ...rest }) => {
  const { bids, bid_sn, bidDetails } = useSelector(state => state.bids);
  console.log("bids:", bids, bid_sn, bidDetails);
  const [selectedBidSns, setSelectedBidSns] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedBidSns;

    if (event.target.checked) {
      newSelectedBidSns = bids.map((bid) => bid.BID_SN);
    } else {
      newSelectedBidSns = [];
    }
    setSelectedBidSns(newSelectedBidSns);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedBidSns.length === bids.length}
                    color="primary"
                    indeterminate={
                      selectedBidSns.length > 0
                      && selectedBidSns.length < bids.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
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
                <Row key={bid.BID_SN} bid={bid} bidDetails={bidDetails} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};