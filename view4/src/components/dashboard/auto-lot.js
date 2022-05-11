import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useSelector } from 'react-redux';
import CountUp from 'react-countup';

export const AutoLot = (props) => {
  const { autoLotNum } = useSelector(state => state.dashboard);
  console.log("autoLotNum 들어왔니? : ", autoLotNum)

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
            AUTO LOT NUMBER
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            <CountUp end={autoLotNum}/> 
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SmartToyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12
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
