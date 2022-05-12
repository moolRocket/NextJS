import React, { forwardRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box, Button, Card, Checkbox, Collapse,
  Table, TableBody, TableCell, TableHead,
  TableRow, TextField,
  Typography, IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
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
  const { suc, successDetails } = props;
  const [open, setOpen] = useState([false, 0]);
  const [selectedBidSns, setSelectedBidSns] = useState([]);
  const [number, setNumber] = useState({
    numberformat: successDetails.map((successDetail) => (
      successDetail.PRODUCT_UNIT_PRICE
    ))
  })
  const numberformatChange = (event) => {
    setNumber({
      ...number,
      [event.target.name]: event.target.value,
    });
  };

  const searchBidDetails = (BID_SN) => {
    dispatch({
      type: 'LOAD_SUCCESS_DETAIL_REQUEST',
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
        key={suc.BID_SN}
        selected={selectedBidSns.indexOf(suc.BID_SN) !== -1}
      >
        {/* <TableCell padding="checkbox">
          <Checkbox
            checked={selectedBidSns.indexOf(suc.BID_SN) !== -1}
            onChange={() => handleSelectOne(suc.BID_SN)}
            value="true"
          />
        </TableCell> */}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="big"
            onClick={() => onClickDetails(suc.BID_SN)}
          >
            {open[0] && open[1] === suc.BID_SN
              ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {((suc.BID_DECIDE_TIME).split(' '))[0]}
        </TableCell>
        <TableCell>
          {((suc.BID_DECIDE_TIME).split(' '))[1]}
        </TableCell>
        <TableCell>
          {suc.BID_SN}
        </TableCell>
        <TableCell>
          {suc.SUM_WEIGHT}
        </TableCell>
        <TableCell>
          {suc.SUM_OFFER_PRICE}
        </TableCell>
        <TableCell>
          {suc.BID_STATUS}
        </TableCell>
        <TableCell>
          {suc.START_CITY_NAME}
        </TableCell>
        <TableCell>
          {suc.DESTINATION_CITY_NAME}
        </TableCell>
        <TableCell>
          {suc.GUEST_COMPANY_NAME}
        </TableCell>
        {/* <TableCell>
          {"개인차주"}
        </TableCell>
        <TableCell>
          {"전화번호"}
        </TableCell> */}
      </TableRow>
      <>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open[0]} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant='h6' gutterBottom component="div">
                  DETAIL
                </Typography>
                <Table size="big" aria-label="purchases">
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
                      {/* <TableCell>
                        편성일시
                      </TableCell> */}
                      <TableCell>
                        제안가 (만원)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {successDetails.map((successDetail) => (
                      <TableRow
                        hover
                        key={successDetail.BCP_SN}
                      >
                        <TableCell>
                          {successDetail.PRODUCT_NAME}
                        </TableCell>
                        <TableCell>
                          {successDetail.PRODUCT_WEIGHT}
                        </TableCell>
                        <TableCell>
                          {successDetail.GUEST_COMPANY_NAME}
                        </TableCell>
                        {/* <TableCell>
                          출발지명
                        </TableCell>
                        <TableCell>
                          출발지상세주소
                        </TableCell> */}
                        <TableCell>
                          {successDetail.DESTINATION_CITY}
                        </TableCell>
                        <TableCell>
                          {successDetail.DESTINATION_DTL}
                        </TableCell>
                        {/* <TableCell>
                          랏편성일시
                        </TableCell> */}
                        <TableCell>
                        {successDetail.PRODUCT_UNIT_PRICE}
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

export const SuccessListResults = ({ ...rest }) => {

  const { success, bid_sn, successDetails } = useSelector(state => state.success);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  낙찰확정일자
                </TableCell>
                <TableCell>
                  낙찰확정시간
                </TableCell>
                <TableCell>
                  입찰번호
                </TableCell>
                <TableCell>
                  총 중량
                </TableCell>
                <TableCell>
                  제안가
                </TableCell>
                <TableCell>
                  진행상태
                </TableCell>
                <TableCell>
                  출발지명
                </TableCell>
                <TableCell>
                  목적지명
                </TableCell>
                <TableCell>
                  고객사
                </TableCell>
                {/* <TableCell>
                  개인차주
                </TableCell>
                <TableCell>
                  전화번호
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {success.map((suc) => (
                <Row key={suc.BID_SN} suc={suc} successDetails={successDetails} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};