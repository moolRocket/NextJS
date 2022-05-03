import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box, Button,
  Card, CardHeader, Divider,
  IconButton, Menu, MenuItem,
  List, ListItem, ListItemAvatar, ListItemText, Link, ListItemIcon, Modal,
  TableRow, TableCell, Table, TableHead, TableBody
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const products = [
  {
    id: uuid(),
    name: '열연',
    imageUrl: '/static/images/열연.jpg',
    imageUrl2: '/static/images/posco_hot.PNG',
    count: 18,
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: '후판',
    imageUrl: '/static/images/후판.jpg',
    imageUrl2: '/static/images/posco_plate.PNG',
    count: 8,
    updatedAt: subHours(Date.now(), 5)
  },
  {
    id: uuid(),
    name: '선재',
    imageUrl: '/static/images/선재.jpg',
    imageUrl2: '/static/images/posco_coil.PNG',
    count: 8,
    updatedAt: subHours(Date.now(), 3)
  },
  {
    id: uuid(),
    name: '냉연',
    imageUrl: '/static/images/냉연.jpg',
    imageUrl2: '/static/images/posco_cold.PNG',
    count: 16,
    updatedAt: subHours(Date.now(), 2)
  }
];

export const LatestProducts = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const handleMenuClose = () => {
    setAnchorEl(null)
  };
  const onOpenViewAll = () => setViewAllOpen(true);
  const onCloseViewAll = () => setViewAllOpen(false);

  return (
    <Card {...props}>
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
            key={product.id}
            icon={product.icon}
          >
            {/* <ListItemIcon >
              <ColdRoll />
            </ListItemIcon> */}
            <ListItemAvatar>
              <img
                alt={product.name}
                src={product.imageUrl}
                // icon={product.icon}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Updated ${formatDistanceToNow(product.updatedAt)}`}
            />
            <IconButton
              id="basic-button"
              edge="end"
              size="small"
              aria-controls={menuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link href='/s91p2000110h.jsp' underline='hover' color="inherit">
                  종류 및 용도
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href='/s91p2000120h.jsp' underline='hover' color="inherit">
                  제조공정
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href='/s91p2000130h.jsp' underline='hover' color="inherit">
                  제품규격
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href='/s91p2000140h.jsp' underline='hover' color="inherit">
                  제조가능 치수
                </Link>
              </MenuItem>
            </Menu>
          </ListItem>
        ))}
      </List>
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
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={onOpenViewAll}
        >
          View All
        </Button>
          <Modal
            open={viewAllOpen}
            onClose={onCloseViewAll}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Table>
                <TableHead>
                  <TableRow hover>
                    <TableCell>
                      품종
                    </TableCell>
                    <TableCell>
                      개수
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product)=>(
                    
                  <TableRow
                    key={product.id}
                  >
                    <TableCell>
                      <img 
                        src={product.imageUrl2}
                        style={{
                          height: 125,
                          width: 610
                        }}
                      />
                      
                    </TableCell>
                    <TableCell>
                      {product.count}
                    </TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Modal>
      </Box>
    </Card>
  );
}