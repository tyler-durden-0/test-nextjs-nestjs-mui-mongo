'use client'
import React from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navbarStyles } from './styles';
import { useRouter } from 'next/navigation';
import { mainNavbarItems } from './consts/navbarItems';
import { Typography } from '@mui/material';

const Navbar = () => {
    const router = useRouter();

    return (
        <div style={{
          position: 'sticky',
          top: 0
        }}>
          <Drawer
            sx={navbarStyles.drawer}
            variant="permanent"
            anchor="left"
        >
          <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography sx={{color: '#fcba03'}} variant="h5" align="center" gutterBottom>
              MongoDB CRUD
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            {mainNavbarItems.map((item, index) => (
              <ListItem
                  key={item.id}
                  onClick={() => router.push(item.route)}
              >
                <ListItemIcon
                  sx={navbarStyles.icons}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={navbarStyles.text}
                  primary={item.label}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
        </div>
    );
};

export default Navbar