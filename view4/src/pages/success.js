import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SuccessListResults } from '../components/success/success-list-results';
import { SuccessListToolbar } from '../components/success/success-list-toolbar';

const Success = () => (
  <>
    <Head>
      <title>
      Success | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <SuccessListToolbar />
        <Box sx={{ mt: 3 }}>
          <SuccessListResults />
        </Box>
      </Container>
    </Box>
  </>
);


Success.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Success;