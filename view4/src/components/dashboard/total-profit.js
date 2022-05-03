import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';

export const TotalProfit = (props) => (
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
            AVERAGE PRICE
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            $23k
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
            <PaidIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
