import { Line } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, Modal, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const LotTime = (props) => {
  const theme = useTheme();

  const { performance } = useSelector(state => state.dashboard)
  const [overviewOpen, setOverviewOpen] = useState(false);
  const onClickOverview = () => setOverviewOpen(true);
  const overviewClose = () => setOverviewOpen(false);
  const lastweek = performance.data.lastweek;
  const thisweek = performance.data.thisweek;

  const data = {
    datasets: [
      {
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        barPercentage: 0.5,
        barThickness: 20,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: thisweek.map((thiswe)=> thiswe.금액),
        label: 'This Week',
        maxBarThickness: 70
      },
      {
        backgroundColor: 'rgb(53, 162, 235)',
        borderColor: 'rgb(53, 162, 235)',
        barPercentage: 0.5,
        barThickness: 20,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: lastweek.map((lastwe)=> lastwe.금액),
        label: 'Last Week',
        maxBarThickness: 70
      }
    ],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: false,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Card {...props}>
      <CardHeader
        // action={(
        //   <Button
        //     endIcon={<ArrowDropDownIcon fontSize="small" />}
        //     size="small"
        //   >
        //     Last 1 days
        //   </Button>
        // )}
        title="Price Status"
        
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          onClick={onClickOverview}
        >
          Overview
        </Button>
        <Modal
          open={overviewOpen}
          onClose={overviewClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={ style }
          >
            <Line
              data={data}
              options={options}
            />
          </Box>

        </Modal>
      </Box>
    </Card>
  );
};
