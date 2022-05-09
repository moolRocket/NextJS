import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const AverageNumber = (props) => (
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
          MAX DONEDEAL LOCATION
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
          경기도 안산시
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
            <LocationOnIcon />
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
);
