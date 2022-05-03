import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Container, Grid } from '@mui/material';
import { AutoLot } from './auto-lot';
import { ManualLot } from './manual-lot';
import { AverageNumber } from './average-number';
import { TotalProfit } from './total-profit';

export const LotAccordion = (props) => {

  const [expanded, setExpanded] = useState(true);

  return (
    <Accordion expanded={expanded} onChange={()=> setExpanded(!expanded)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>그래프</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 0
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
          </Grid>
        </Container>
        </Box>

        {/* <LotTime />
          <ProgressStatus /> */}
      </AccordionDetails>
    </Accordion>
  );
}
