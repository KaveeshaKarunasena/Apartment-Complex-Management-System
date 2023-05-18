import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { MenuItem, Menu } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


const HomeBar = () => {
  const [paymentAnchorEl, setPaymentAnchorEl] = React.useState(null);
  const [complaintAnchorEl, setComplaintAnchorEl] = React.useState(null);
  
  const openPayment = Boolean(paymentAnchorEl);
  const openComplaint = Boolean(complaintAnchorEl);

  

  const navigate = useNavigate();


  const handlePaymentClick = event => {
    setPaymentAnchorEl(event.currentTarget);
  };

  const handleComplaintClick = event => {
    setComplaintAnchorEl(event.currentTarget);
  };

  const handlePaymentClose = () => {
    setPaymentAnchorEl(null);
  };

  const handleComplaintClose = () => {
    setComplaintAnchorEl(null);
  };

  const handleViewPayment = async () => {
    navigate('/app/viewPayment');
    handlePaymentClose();
  };

  const handleAddPayment = async () => {
    navigate('/app/payment');
    handlePaymentClose();
  };

  const handleUpdateComplaint = async () => {
    navigate('/app/Comlpain/update');
    handleComplaintClose();
  };

  const handleAddComplaint = async () => {
    navigate('/app/Comlpain/new');
    handleComplaintClose();
  };

  const paymentMenuId = 'payment-menu';
  const complaintMenuId = 'complaint-menu';

  const renderPaymentMenu = (
    <Menu
      anchorEl={paymentAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={paymentMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={openPayment}
      onClose={handlePaymentClose}
    >
      <MenuItem onClick={handleViewPayment}>View</MenuItem>
      <MenuItem onClick={handleAddPayment}>Add</MenuItem>
    </Menu>
  );

  

  const renderComplaintMenu = (
    <Menu
      anchorEl={complaintAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={complaintMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={openComplaint}
      onClose={handleComplaintClose}
    >
      <MenuItem onClick={handleUpdateComplaint}>Update</MenuItem>
      <MenuItem onClick={handleAddComplaint}>Add</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div>
          <Button color="inherit">
            <NavLink to="" style={{ textDecoration: 'none', color: 'white' }}>
              Home
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              to="amenities"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Amenities
            </NavLink>
          </Button>
          <Button
            color="inherit"
            onClick={handlePaymentClick}
            aria-controls={paymentMenuId}
          >
            Payment
          </Button>
          {renderPaymentMenu}
          <Button color="inherit">Services</Button>
          <Button
            color="inherit"
            onClick={handleComplaintClick}
            aria-controls={complaintMenuId}
          >
            Complaint
          </Button>
          {renderComplaintMenu}
          <Button color="inherit">Appointment</Button>
        </div>

      </Toolbar>
      
    </AppBar>
  );
};

export default HomeBar;
