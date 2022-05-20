import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CountUp from 'react-countup';

export const TotalProfit = (props) => {

  const { waitingForDispatch } = useSelector(state => state.dashboard);

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
            WAITING FOR DISPATCH
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            <CountUp end={waitingForDispatch}/>
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <LocalShippingIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)};
