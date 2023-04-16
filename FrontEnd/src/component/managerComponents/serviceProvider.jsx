// Library imports
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import * as Yup from 'yup';
import { makeStyles } from 'tss-react/mui';
import { Formik } from 'formik';
import {
  FormHelperText,
  FormControl,
  InputLabel,
  Input,
  TextField,
  Select,
} from '@material-ui/core';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useSnackbar } from 'notistack';

// Custom imports
import ServiceCard from './ServiceCard';
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
    backgroundColor: '#488042',
  },
}));

// Service Provider Main component
const ServiceProvider = () => {
  const [showForm, setShowForm] = React.useState(false);
  const {classes} = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const [serviceProviders, setServiceProviders] = useState([]);
  const [isService, setIsService] = useState(false);

  const displayFormHandler = () => {
    setShowForm(true);
  };

  const submitFormHandler = () => {
    setShowForm(false);
  };

  // function used to add a service provider
  const addServiceProvider = async formData => {

    try {
      const res = await axios.post('/service-provider/add', {
        ...formData,
      });
      enqueueSnackbar('Service Provider Added', { variant: 'success' });
      setShowForm(false);
      setIsService(true);
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }

    
  };

  // useEffect is used to make sure once service provider is added the service provider is displayed instantly on the service provider dashboard
  useEffect(() => {
    const fetchServiceProviderDetails = async () => {
      const response = await fetch('/service-provider/');
      const json = await response.json();

      if (response.ok) {
        setServiceProviders(json);
        setIsService(false);
      }
    };

    fetchServiceProviderDetails();
  }, [isService]);

  //JSX Components start here 
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
            {serviceProviders.map(serviceProvider => (
              <Grid item xs={4} key = {serviceProvider._id}>
                <ServiceCard
                  id = {serviceProvider._id}
                  cName={serviceProvider.companyName}
                  sType={serviceProvider.serviceType}
                  location={serviceProvider.location}
                  cNumber={serviceProvider.contactNumber}
                  spList = {serviceProviders}
                  setServiceProviders = {setServiceProviders}
                  setIsService = {setIsService}
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
                location: Yup.string().required('Required*'),
                contactNumber: Yup.string()
                  .matches(new RegExp('[+94][0-9]{9}'))
                  .required('A phone number is required'),
              })}

              onSubmit={addServiceProvider}
            >
              {({ values, errors, handleChange, handleSubmit }) => {
                return (
                  <>
                    <FormControl style={{ marginTop: '10%' }}>
                      <InputLabel>Company Name</InputLabel>
                      <Input
                        value={values.companyName}
                        onChange={handleChange}
                        name="companyName"
                        error={errors.companyName && errors.companyName?.length ? true : false}
                      />
                      <FormHelperText stylr={{ color: 'red' }}>
                        {errors.companyName}
                      </FormHelperText>
                    </FormControl>
                    <FormControl style={{ marginTop: '10%' }}>
                      <TextField
                        value={values.location}
                        onChange={handleChange}
                        name="location"
                        error={errors.location && errors.location?.length ? true : false}
                        multiline
                        maxRows={4}
                        label = "Address"
                      />
                      <FormHelperText stylr={{ color: 'red' }}>
                        {errors.companyName}
                      </FormHelperText>
                    </FormControl>
                    <FormControl style={{ marginTop: '15%' }} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Service Type
                      </InputLabel>
                      <Select
                        value={values.serviceType}
                        onChange={handleChange}
                        name="serviceType"
                        error={errors.companyName && errors.serviceType?.length ? true : false}
                      >
                        <MenuItem value={"Electrician"}>Electrician</MenuItem>
                        <MenuItem value={"Plumber"}>Plumber</MenuItem>
                        <MenuItem value={"Clerk"}>Clerk</MenuItem>
                      </Select>
                      <FormHelperText stylr={{ color: 'red' }}>
                        {errors.serviceType}
                      </FormHelperText>
                    </FormControl>
                    <FormControl style={{ marginTop: '10%' }}>
                      <InputLabel>Contact Number</InputLabel>
                      <Input
                        value={values.contactNumber}
                        onChange={handleChange}
                        name="contactNumber"
                        error={errors.contactNumber && errors.contactNumber?.length ? true : false}
                      />
                      <FormHelperText stylr={{ color: 'red' }}>
                        {errors.contactNumber}
                      </FormHelperText>
                    </FormControl>
                    <Button
                      onClick={() => handleSubmit()}
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
