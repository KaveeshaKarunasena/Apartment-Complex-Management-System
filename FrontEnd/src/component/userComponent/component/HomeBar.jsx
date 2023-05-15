import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {MenuItem,Menu} from '@material-ui/core';

const HomeBar = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar style={{ align: 'center' }}>
        <Button color="inherit">Home</Button>
        <Button color="inherit">
          <NavLink to="amenities" style={{textDecoration:"none",color:'white'}}>Amenities</NavLink>
        </Button>
        <Button color="inherit">
        <NavLink to="payment" style={{textDecoration:"none",color:'white'}}>Payment</NavLink>
        </Button>
        <Button color="inherit">Services</Button>
        <Button color="inherit" onMouseEnter={handleClick}>Complaint</Button>
        <Button color="inherit">Appointment</Button>
      </Toolbar>

      <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
           <NavLink
            to="Comlpain/update"
            style = {{textDecoration: 'none', color: 'black'}}
          >
          <MenuItem>Update</MenuItem>
          </NavLink>
          <NavLink
            to="Comlpain/new"
            style = {{textDecoration: 'none', color: 'black'}}
          >
            <MenuItem onClick={handleClose}>Add </MenuItem>
          </NavLink>
          
        </Menu>
    </AppBar>
  );
};

export default HomeBar;
