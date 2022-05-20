import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';
import { useSelector } from 'react-redux';
import CountUp from 'react-countup';

export const ManualLot = (props) => {
  const { manualLotNum } = useSelector(state => state.dashboard);

  return (
  <Card {...props}>
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
            MANUAL LOT NUMBER
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
          <CountUp end={manualLotNum}/>
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
          <FaceIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        {/* <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          16
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          This time
        </Typography> */}
      </Box>
    </CardContent>
  </Card>
)};
