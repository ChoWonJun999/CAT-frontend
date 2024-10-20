import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Tabs, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar(props) {
  const location = useLocation();
  const curPath = location.pathname;

  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const myDrawer = (
    <Box>
      <Tabs
        value={curPath}
        centered
        sx={{
          margin: '0 auto',
        }}
      >
        {props.data.map(data => (
          <Tab
            key={data.path}
            label={data.name}
            value={data.path}
            component={Link}
            to={data.path}
            sx={{
              fontWeight: data.path === curPath ? 'bold' : 'normal',
            }}
          />
        ))}
      </Tabs>
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5em 2em',
          position: 'relative',
          zIndex: 1201,
        }}
      >
        <Box
          sx={{
            fontWeight: 'bold',
            fontSize: '2em',
            color: 'inherit',
          }}
        >
          CAT
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>{myDrawer}</Box>
        <IconButton color="inherit" onClick={toggleDrawer} sx={{ display: { xs: 'block', md: 'none' } }}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer
        anchor="top"
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: false }}
        sx={{ display: { xs: 'block', md: 'none' }, zIndex: 1300 }}
      >
        {myDrawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
        {props.content}
      </Box>
    </Box>
  );
}

export default NavBar;
