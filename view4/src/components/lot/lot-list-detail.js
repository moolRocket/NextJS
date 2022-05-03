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

export const LotListDetail = (props) => {
  const { lotDetail } = props;
  console.log("@@++==")

  return (
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
    
    </>
  
  )
  
}
