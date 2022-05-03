import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { LotListResults } from '../components/lot/lot-list-results';
import { LotListToolbar } from '../components/lot/lot-list-toolbar';

const Lots = () => (
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
        py: 0
      }}
    >
      <Container maxWidth={false}>
        <LotListToolbar />
        <Box sx={{ mt: 3 }}>
          <LotListResults />
        </Box>
      </Container>
    </Box>
  </>
);


Lots.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Lots;