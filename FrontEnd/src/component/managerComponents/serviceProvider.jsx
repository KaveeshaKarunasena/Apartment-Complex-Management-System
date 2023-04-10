import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './serviceProvider.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ServiceProvider = () => {
  const [showForm, setShowForm] = React.useState(false);

  const displayFormHandler = () => {
    setShowForm(true);
  };

  const submitFormHandler = () => {
    setShowForm(false);
  };
  return (
    <React.Fragment>
      <div className="serviceProviderContainer">
        <Button
          variant="contained"
          onClick={displayFormHandler}
          style={{
            backgroundColor: '#488042',
            marginLeft: '82%',
            marginTop: '2%',
          }}
        >
          Add Service Provider
        </Button>

        <Modal
          open={showForm}
          onClose={submitFormHandler}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ServiceProvider;
