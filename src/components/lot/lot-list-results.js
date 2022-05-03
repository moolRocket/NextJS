import React, { useState } from 'react';
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

function Row(props) {
  const dispatch = useDispatch();
  const { lot, lotDetails } = props;
  const [open, setOpen] = useState([false, 0]);
  const [selectedLotsSns, setSelectedLotsSns] = useState([]);

  const handleSelectOne = (LOT_SN) => {
    const selectedIndex = selectedLotsSns.indexOf(LOT_SN);
    let newSelectedLotsSns = [];

    if (selectedIndex === -1) {
      newSelectedLotsSns = newSelectedLotsSns.concat(selectedLotsSns, LOT_SN);
    } else if (selectedIndex === 0) {
      newSelectedLotsSns = newSelectedLotsSns.concat(selectedLotsSns.slice(1));
    } else if (selectedIndex === selectedLotsSns.length - 1) {
      newSelectedLotsSns = newSelectedLotsSns.concat(selectedLotsSns.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedLotsSns = newSelectedLotsSns.concat(
        selectedLotsSns.slice(0, selectedIndex),
        selectedLotsSns.slice(selectedIndex + 1)
      );
      console.log(newSelectedLotsSns)
    }
    setSelectedLotsSns(newSelectedLotsSns);
    dispatch({
      type: 'LOT_SN_CHANGE',
      lot_sn: newSelectedLotsSns
    })
  };
  const searchLotDetails = (LOT_SN) => {
    dispatch({
      type: 'LOAD_LOTS_DETAIL_REQUEST',
      lot_sn_one: LOT_SN
    })
  }
  const onClickDetails = async(LOT_SN) => {
    searchLotDetails(LOT_SN);
    setOpen([!open[0], LOT_SN]);
  }
  return (
    <>
      <>
          <>
          <TableRow
            hover
            key={lot.LOT_SN}
            selected={selectedLotsSns.indexOf(lot.LOT_SN) !== -1}
            >
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedLotsSns.indexOf(lot.LOT_SN) !== -1}
                onChange={() => handleSelectOne(lot.LOT_SN)}
                value="true"
              />
            </TableCell>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="big"
                onClick={() => onClickDetails(lot.LOT_SN) }
              >
                { open[0] && open[1] === lot.LOT_SN
                ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
            <TableCell>
              {lot.LOT_ISCANCEL === 0 ? "No" : "Yes"}
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
                      <TableCell>
                        출발지
                      </TableCell>
                      {/* <TableCell>
                        출발지 상세주소
                      </TableCell> */}
                      <TableCell>
                        목적지
                      </TableCell>
                      {/* <TableCell>
                        목적지 상세주소
                      </TableCell> */}
                      <TableCell>
                        편성일시
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
                    {lotDetails.map((lotDetail) => (
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
                        {/* <TableCell>
                          출발지상세주소
                        </TableCell> */}
                        <TableCell>
                          {lotDetail.DESTINATION_CITY_NAME}
                        </TableCell>
                        {/* <TableCell>
                          목적지상세주소
                        </TableCell> */}
                        <TableCell>
                        {(lotDetail.PRODUCT_REGDATE).split('T')[0]}
                        </TableCell>
                        <TableCell>
                          {lotDetail.LOT_ISCANCEL === 0 ? "Yes" : "No"}
                        </TableCell>
                        <TableCell>
                          취소내용
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
      </>
    </>
  )
}

export const LotListResults = ({ ...rest }) => {
  const { lots, lot_sn, lotDetails } = useSelector(state => state.lots);
  console.log("lots: ", lots, lot_sn, lotDetails);
  const [selectedLotsSns, setSelectedLotsSns] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedLotsSns;
    if (event.target.checked) {
      newSelectedLotsSns = lots.map((lot) => lot.LOT_SN);
    } else {
      newSelectedLotsSns = [];
    }
    setSelectedLotsSns(newSelectedLotsSns);
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
                    checked={selectedLotsSns.length === lots.length}
                    color="primary"
                    indeterminate={
                      selectedLotsSns.length > 0
                      && selectedLotsSns.length < lots.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
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
                <TableCell>
                  취소여부
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lots.map((lot) => (
                <Row key={lot.LOT_SN} lot={lot} lotDetails={lotDetails} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
