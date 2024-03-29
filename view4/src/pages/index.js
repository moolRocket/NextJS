import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { AutoLot } from '../components/dashboard/auto-lot';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { LotTime } from '../components/dashboard/lot-time';
import { AverageNumber } from '../components/dashboard/average-number';
import { ManualLot } from '../components/dashboard/manual-lot';
import { TotalProfit } from '../components/dashboard/total-profit';
import { ProgressStatus } from '../components/dashboard/progress-status';
import { DashboardLayout } from '../components/dashboard-layout';

const Dashboard = ({data}) => {
  const last = data.data.slice(0,5)
  return (
  <>
    <Head>
      <title>
        Dashboard | Material Kit
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AutoLot />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <ManualLot />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <AverageNumber />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LotTime />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <ProgressStatus sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders last={last}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export async function getServerSideProps() {
  const res = await fetch(`http://34.64.172.190:9090/v2/bid/find-success-bid?startDate=2020-01-02&endDate=2022-06-01`)
  const data = await res.json()

  return {
    props: {
      data: data
    }
  }
}

export default Dashboard;
