import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,  Card, Checkbox, Collapse,
  Table, TableBody, TableCell, TableHead,
  TableRow, TextField, Typography, IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
  const dispatch = useDispatch();
  const { lot, lot_sn, lotDetails } = props;
  const [open, setOpen] = useState([false, 0]);

  const searchLotDetails = (LOT_SN) => {
    dispatch({
      type: 'LOAD_LOTS_DETAIL_REQUEST',
      lot_sn_one: LOT_SN
    })
  }

  const onClickDetails = async (LOT_SN) => {
    searchLotDetails(LOT_SN);
    setOpen([!open[0], LOT_SN]);

    dispatch({
      type: 'LOT_SN_CHANGE',
      lot_sn: LOT_SN
    })
  }
  return (
    <>
      <>
        <>
          <TableRow
            hover
            key={lot.LOT_SN}
          >
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="big"
                onClick={() => onClickDetails(lot.LOT_SN)}
              >
                {open[0] && (open[1] === lot.LOT_SN) && (open[1] === lot_sn) ?
                  <KeyboardArrowUpIcon /> : 
                  <KeyboardArrowDownIcon />
                }
              </IconButton>
            </TableCell>
            <TableCell>
              {((lot.LOT_REGDATE).split('T'))[0]}
            </TableCell>
            <TableCell>
              {lot.LOT_SN}
            </TableCell>
            <TableCell>
              {lot.WEIGHT}
            </TableCell>
            <TableCell>
              {lot.COUNT}
            </TableCell>
            <TableCell>
              {lot.GUEST_COMPANY}
            </TableCell>
            <TableCell>
              {lot.START_CITY}
            </TableCell>
            <TableCell>
              {lot.LOT_START_DTL}
            </TableCell>
            <TableCell>
              {lot.DESTINATION_CITY}
            </TableCell>
            <TableCell>
              {lot.LOT_DETINATION_DTL}
            </TableCell>
          </TableRow>
          <>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                <Collapse  in={open[0] &&(lot.LOT_SN === lot_sn) ? true : false} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1, maxWidth: 2000 }}>
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
                          <TableCell>
                            출발지
                          </TableCell>
                          <TableCell>
                            목적지
                          </TableCell>
                          <TableCell>
                            상품편성일시
                          </TableCell>
                          <TableCell>
                            취소
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {lotDetails.map((lotDetail) => (
                          <>
                            <TableRow
                              hover
                              key={lotDetail.PRODUCT_SN}
                            >
                              <TableCell>
                                {lotDetail.PRODUCT_SN}
                              </TableCell>
                              <TableCell>
                                {lotDetail.PRODUCT_WEIGHT}
                              </TableCell>
                              <TableCell>
                                {lotDetail.GUEST_COMPANY_NAME}
                              </TableCell>
                              <TableCell>
                                {lotDetail.START_CITY_NAME}
                              </TableCell>
                              <TableCell>
                                {lotDetail.DESTINATION_CITY_NAME}
                              </TableCell>
                              <TableCell>
                                {(lotDetail.PRODUCT_REGDATE).split('T')[0]}
                              </TableCell>
                              <TableCell>
                                {lotDetail.LOT_ISCANCEL === 0 ? "Yes" : "No"}
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>

              </TableCell>
            </TableRow>
          </>
        </>
      </>
    </>
  )
}

export const LotListResults = ({ ...rest }) => {
  const { lots, lot_sn, lotDetails } = useSelector(state => state.lots);

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
                  LOT번호
                </TableCell>
                <TableCell>
                  총 중량
                </TableCell>
                <TableCell>
                  제품수
                </TableCell>
                <TableCell>
                  고객사
                </TableCell>
                <TableCell>
                  출발지
                </TableCell>
                <TableCell>
                  출발지 상세주소
                </TableCell>
                <TableCell>
                  목적지
                </TableCell>
                <TableCell>
                  목적지 상세주소
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lots.map((lot) => (
                <Row key={lot.LOT_SN} lot={lot} lotDetails={lotDetails} lot_sn={lot_sn}/>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};