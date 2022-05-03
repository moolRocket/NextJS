import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { NavItem } from './nav-item';

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'dashboard - 미정!!'
  },
  {
    href: '/products',
    icon: (<UsersIcon fontSize="small" />),
    title: '입찰대상관리'
  },
  {
    href: '/lots',
    icon: (<UsersIcon fontSize="small" />),
    title: 'LOT'
  },
  {
    href: '/bids',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: '입찰대상확정'
  },
  {
    href: '/success',
    icon: (<UserIcon fontSize="small" />),
    title: '낙찰결과관리'
  },
  {
    href: '/customers',
    icon: (<CogIcon fontSize="small" />),
    title: '배차관리 - 미정'
  },
  {
    href: '/404',
    icon: (<XCircleIcon fontSize="small" />),
    title: 'Error'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(() => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
            <img
              alt="mool"
              src="/static/images/imagelogo.png"
              width={'56'}
              height={'56'}
            />
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <img 
              alt="Rocket"
              src="/static/images/textlogo.png"
              width={'231'}
              height={'42.5'}
            />
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/static/images/sidebar_pro.png"
            />
          </Box>
          <NextLink
            href="https://material-kit-pro-react.devias.io/"
            passHref
          >
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button>
          </NextLink>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};