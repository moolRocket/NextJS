import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { BidListResults } from '../components/bid/bid-list-results';
import { BidListToolbar } from '../components/bid/bid-list-toolbar';

const Bids = () => (
  <>
    <Head>
      <title>
        LOT | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <BidListToolbar />
        <Box sx={{ mt: 3 }}>
          <BidListResults />
        </Box>
      </Container>
    </Box>
  </>
);

Bids.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Bids;