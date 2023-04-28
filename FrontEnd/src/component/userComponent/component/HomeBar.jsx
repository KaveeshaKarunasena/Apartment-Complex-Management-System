import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const HomeBar = () => {
  return (
    <AppBar position="static" className="app-bar">
      <Toolbar style={{ align: 'center' }}>
        <Button color="inherit">Home</Button>
        <Button color="inherit">
          <NavLink to="amenities">Amenities</NavLink>
        </Button>
        <Button color="inherit">Payment</Button>
        <Button color="inherit">Services</Button>
        <Button color="inherit">Complaint</Button>
        <Button color="inherit">Appointment</Button>
      </Toolbar>
    </AppBar>
  );
};

export default HomeBar;
