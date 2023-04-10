import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from 'tss-react/mui';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  TextField,
  Select
} from '@material-ui/core';

import './serviceProvider.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
    margin: '0 auto',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
  },
  formControl: {
    marginTop: '10px',
    padding: '5px',
  },
  submitBtn: {
    marginTop: '15px',
    backgroundColor: '#488042'
  },
}));

const ServiceProvider = () => {
  const [showForm, setShowForm] = React.useState(false);
  const { classes } = useStyles();

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
          <Box sx={style} className={classes.root}>
            <h1>Add Service Provider</h1>
            <FormGroup>
              <FormControl style={{ marginTop: '10%' }}>
                <InputLabel>Company Name</InputLabel>
                <Input />
              </FormControl>
              <FormControl style={{ marginTop: '10%' }}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Address"
                  multiline
                  maxRows={4}
                />
              </FormControl>
              <FormControl style={{ marginTop: '15%' }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Service Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="Service Type"
                  label="Service Type"
                  //   onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{ marginTop: '10%' }}>
                <InputLabel>Contact Number</InputLabel>
                <Input />
              </FormControl>
            </FormGroup>
            <Button
                // onClick={() => handleSubmit()}
                type="submit"
                className={classes.submitBtn}
                variant="contained"
                style={{ marginTop: '10%' }}
              >
                ADD
              </Button>
          </Box>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ServiceProvider;
