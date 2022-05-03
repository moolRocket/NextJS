import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Container, Grid } from '@mui/material';
import { LotTime } from './lot-time';
import { ProgressStatus } from './progress-status';

export const SuccessAccordion = (props) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <Accordion expanded={expanded} onChange={()=> setExpanded(!expanded)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Success Time</Typography>
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
                md={60}
                xl={3}
                xs={12}
              >
                <ProgressStatus sx={{ height: '100%' }} />
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
