import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { ProductListResults } from '../components/product/product-list-results';
import { ProductListToolbar } from '../components/product/product-list-toolbar';

const Products = () => (
  <>
    <Head>
      <title>
        Product | Material Kit
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
        <ProductListToolbar />
        <Box sx={{ mt: 3 }}>
          <ProductListResults />
        </Box>
      </Container>
    </Box>
  </>
);

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;