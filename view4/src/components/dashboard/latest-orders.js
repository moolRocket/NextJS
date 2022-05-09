import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box, Button, Card, CardHeader,
  Table, TableBody,
  TableCell, TableHead,
  TableRow, TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { useSelector } from 'react-redux';

export const LatestOrders = (props) => {
  const { success } = useSelector( state => state.success);
  const succ = success.slice(0,5)
  console.log("MMM>>", success.slice(0,4), props.last);


  return (
  <Card {...props}>
    <CardHeader title="Latest Orders" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                입찰번호
              </TableCell>
              <TableCell>
                고객사
              </TableCell>
              <TableCell>
                중량
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    날짜
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {succ.length !== 0 ? succ.map((suc) => (
              <TableRow
                hover
                key={suc.BID_SN}
              >
                <TableCell>
                  {suc.BID_SN}
                </TableCell>
                <TableCell>
                  {suc.GUEST_COMPANY_NAME}
                </TableCell>
                <TableCell>
                  {suc.SUM_WEIGHT}
                </TableCell>
                <TableCell>
                  {(suc.BID_DECIDE_TIME.split(' ')[0])}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(suc.BID_STATUS === '낙찰' && 'success')
                    || (suc.BID_STATUS === 'pending' && 'error')
                    || 'warning'}
                  >
                    {suc.BID_STATUS === '낙찰' ? 'success' : 'pending'}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            )): props.last.map ((last)=> (
              <TableRow
                hover
                key={last.BID_SN}
              >
                <TableCell>
                  {last.BID_SN}
                </TableCell>
                <TableCell>
                  {last.GUEST_COMPANY_NAME}
                </TableCell>
                <TableCell>
                  {last.SUM_WEIGHT}
                </TableCell>
                <TableCell>
                  {(last.BID_DECIDE_TIME.split(' ')[0])}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(last.BID_STATUS === '낙찰' && 'success')
                    || (last.BID_STATUS === 'pending' && 'error')
                    || 'warning'}
                  >
                    {last.BID_STATUS === '낙찰' ? 'success' : 'pending'}
                  </SeverityPill>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      {/* <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button> */}
    </Box>
  </Card>
)};
