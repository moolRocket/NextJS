import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { useSelector } from 'react-redux';

export const ProgressStatus = (props) => {
  const theme = useTheme();
  const { progressStatus } = useSelector(state => state.dashboard);
  
  const wait = progressStatus.data[0].COUNT;
  const ing = progressStatus.data[1].COUNT;
  const done = progressStatus.data[2].COUNT;
  
  const data = {
    datasets: [
      {
        data: [progressStatus ? wait : 5, 
                progressStatus ? ing : 5,
                progressStatus ? done : 5], 
        backgroundColor: ['#3F51B5', '#FB8C00', '#E53935' ],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['입찰 대기중 ', ' 입찰 진행중', ' 낙찰' ]
  };

  const options = {
    animation: true,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: true,
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const devices = [
    {
      title: '입찰 대기',
      value: (wait/(wait + ing + done)*100).toFixed(),
      icon: PhoneIcon,
      color: '#3F51B5'
    },
    {
      title: '진행 중',
      value: (ing/(wait + ing + done)*100).toFixed() ,
      icon: LaptopMacIcon,
      color: '#FB8C00'
    },
    {
      title: '낙찰',
      value: (done/(wait + ing + done)*100).toFixed(),
      icon: TabletIcon,
      color: '#E53935'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Progress Status" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
