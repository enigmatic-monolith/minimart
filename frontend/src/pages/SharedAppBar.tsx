import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const SharedAppBar = () => {
  const userRole = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    navigate('/login');
    dispatch(logout());
  };

  const renderMenuItems = () => {
    if (userRole === 'admin') {
      return (
        <>
          <MenuItem onClick={() => navigate('/tasks')}>Task Management</MenuItem>
          <MenuItem onClick={() => navigate('/inventory')}>Inventory Management</MenuItem>
          <MenuItem onClick={() => navigate('/users')}>User Management</MenuItem>
          <MenuItem onClick={() => navigate('/report')}>Reports</MenuItem>
          <MenuItem onClick={() => navigate('/audit')}>Audit Logs</MenuItem>
        </>
      );
    } else if (userRole === 'resident') {
      return (
        <>
          <MenuItem onClick={() => navigate('/')}>Minimart</MenuItem>
          <MenuItem onClick={() => navigate('/tasks')}>Tasks</MenuItem>
        </>
      );
    }
  };

  return (
    <AppBar position="static" sx={{width: '100vw'}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Minimart
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {renderMenuItems()}
      </Menu>
    </AppBar>
  );
};

export default SharedAppBar;
