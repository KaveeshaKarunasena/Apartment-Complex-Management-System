import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import AppointmentCard from './AppointmentCard';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh', 
  overflow: 'auto',
  borderRadius: "5px"
};


const AppointmentHandler = props => {
  // const handleClose = () => setOpen(false);


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.isModalOpen}
        onClose={props.toggleModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.isModalOpen}>
          <Box sx={style}>
            <h1 style = {{textAlign:"center", color: "#488042"}}>Appointments</h1>
            <Grid container spacing={4} rowSpacing={2}>
              { props.DUMMY_DATA.map( app => {
                  return <Grid item xs={12} key = {app.id}><AppointmentCard customerName = {app.customerName} serviceProvider = {app.serviceProvider}/></Grid>
              })  
              }
              
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AppointmentHandler;
