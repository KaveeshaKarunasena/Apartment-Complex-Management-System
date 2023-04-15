import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import * as Yup from 'yup';
import "yup-phone";
import { makeStyles } from 'tss-react/mui';
import { Formik } from 'formik';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  TextField,
  Select,
} from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ServiceCard from './ServiceCard';

import './serviceProvider.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    backgroundColor: '#488042',
  },
}));

const DUMMY_DATA = [
  {
    companyName: 'Fixit',
    serviceType: 'Electrician',
    location: 'Colombo',
    contactNumber: '0776661234',
  },
  {
    companyName: 'Fixit',
    serviceType: 'Electrician',
    location: 'Colombo',
    contactNumber: '0776661234',
  },
  {
    companyName: 'Fixit',
    serviceType: 'Electrician',
    location: 'Colombo',
    contactNumber: '0776661234',
  },
];

const ServiceProvider = () => {
  const [showForm, setShowForm] = React.useState(false);
  const { classes } = useStyles();
  const phoneRegExp = /^((\\+[9][4][ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const displayFormHandler = () => {
    setShowForm(true);
  };

  const submitFormHandler = () => {
    setShowForm(false);
  };

  return (
    <React.Fragment>
      <div className="serviceProviderContainer">
        <div>
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
        </div>

        <div className="serviceProviderList">
          <Grid container spacing={12}>
            {DUMMY_DATA.map(serviceProvider => (
              <Grid item xs={4}>
                <ServiceCard
                  cName={serviceProvider.companyName}
                  sType={serviceProvider.serviceType}
                  location={serviceProvider.location}
                  cNumber={serviceProvider.contactNumber}
                />
              </Grid>
            ))}
          </Grid>
        </div>

        <Modal
          open={showForm}
          onClose={submitFormHandler}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className={classes.root}>
            <h1>Add Service Provider</h1>
            <Formik
              initialValues={{
                companyName: '',
                serviceType: '',
                location: '',
                contactNumber: '',
              }}
              validationSchema={Yup.object().shape({
                companyName: Yup.string().required('Required*'),
                serviceType: Yup.string().required('Required*'),
                location: Yup.string().required('Required'),
                contactNumber: Yup.string()
                .phone("US", "Please enter a valid phone number")
                .required("A phone number is required"),
              })}
              // onSubmit={addApartment}
            >
              {() => {
                return (
                  <>
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
                    <Button
                      // onClick={() => handleSubmit()}
                      type="submit"
                      className={classes.submitBtn}
                      variant="contained"
                      style={{ marginTop: '10%' }}
                    >
                      ADD
                    </Button>
                  </>
                );
              }}
            </Formik>
          </Box>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ServiceProvider;
