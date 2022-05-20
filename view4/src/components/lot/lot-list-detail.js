import React from 'react';
import { TableCell, TableRow } from '@mui/material';
export const LotListDetail = (props) => {
  const { lotDetail } = props;
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
