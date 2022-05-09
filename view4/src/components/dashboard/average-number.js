import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import { useSelector } from 'react-redux';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';

export const AverageNumber = (props) => {

  const { averageNum } = useSelector(state => state.dashboard);
  
  return (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
          AVERAGE NUMBER OF LOTS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            <CountUp end={averageNum}/>
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <PlagiarismIcon />
          </Avatar>
        </Grid>
      </Grid>
      {/* <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={75.5}
          variant="determinate"
        />
      </Box> */}
    </CardContent>
  </Card>
)};
