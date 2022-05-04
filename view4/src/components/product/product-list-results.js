import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box, Card, Checkbox,
  Table, TableBody,
  TableCell, TableHead,
  TableRow
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export const ProductListResults = ({ ...rest }) => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);

  const [selectedProductsSns, setSelectedProductsSns] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedProductsSns;
    if (event.target.checked) {
      newSelectedProductsSns = products.map((product) => product.PRODUCT_SN);
    } else {
      newSelectedProductsSns = [];
    }
    setSelectedProductsSns(newSelectedProductsSns);
  };

  const handleSelectOne = (PRODUCT_SN) => {
    const selectedIndex = selectedProductsSns.indexOf(PRODUCT_SN);
    let newSelectedProductsSns = [];

    if (selectedIndex === -1) {
      newSelectedProductsSns = newSelectedProductsSns.concat(selectedProductsSns, PRODUCT_SN);
    } else if (selectedIndex === 0) {
      newSelectedProductsSns = newSelectedProductsSns.concat(selectedProductsSns.slice(1));
    } else if (selectedIndex === selectedProductsSns.length - 1) {
      newSelectedProductsSns = newSelectedProductsSns.concat(selectedProductsSns.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProductsSns = newSelectedProductsSns.concat(
        selectedProductsSns.slice(0, selectedIndex),
        selectedProductsSns.slice(selectedIndex + 1)
      );
    }
    setSelectedProductsSns(newSelectedProductsSns);

    dispatch({
      type: 'PRODUCT_SN_CHANGE',
      product_sn: newSelectedProductsSns
    })

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
                    checked={ products.length !== 0 && (selectedProductsSns.length === products.length)}
                    color="primary"
                    indeterminate={
                      selectedProductsSns.length > 0
                      && selectedProductsSns.length < products.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  주문접수일자
                </TableCell>
                <TableCell>
                  제품번호
                </TableCell>
                <TableCell>
                  제품종류
                </TableCell>
                <TableCell>
                  중량(ton)
                </TableCell>
                <TableCell>
                  화주
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
                  도착여부
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  hover
                  key={product.PRODUCT_SN}
                  selected={selectedProductsSns.indexOf(product.PRODUCT_SN) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProductsSns.indexOf(product.PRODUCT_SN) !== -1}
                      onChange={() => handleSelectOne(product.PRODUCT_SN)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {(product.PRODUCT_REGDATE).split('T')[0]}
                  </TableCell>
                  <TableCell>
                    {product.PRODUCT_NAME}
                  </TableCell>
                  <TableCell>
                    {product.PRODUCT_TYPE}
                  </TableCell>
                  <TableCell>
                    {product.PRODUCT_WEIGHT}
                  </TableCell>
                  <TableCell>
                    {product.SHIPPER_COMPANY_NAME}
                  </TableCell>
                  <TableCell>
                    {product.GUEST_COMPANY_NAME}
                  </TableCell>
                  <TableCell>
                    {product.START_CITY_NAME}
                  </TableCell>
                  <TableCell>
                    {product.PRODUCT_START_DTL}
                  </TableCell>
                  <TableCell>
                    {product.DESTINATION_CITY_NAME}
                  </TableCell>
                  <TableCell>
                    {product.PRODUCT_DESTINATION_DTL}
                  </TableCell>
                  <TableCell>
                    {product.PRODUCT_ARRIVE === 0 ? "No" : "Yes"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

// ProductListResults.propTypes = {
//   products: PropTypes.array.isRequired
// };

