import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  FormHelperText,
  FormControl,
  InputLabel,
  Input,
  TextField,
  Select,
} from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';

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
  h2: {
    color: '#488042',
    textAlign: 'center',
  },
}));

const Form = props => {
  // function used to add a service provider
  const { enqueueSnackbar } = useSnackbar();
  const { showForm } = props;
  const { classes } = useStyles();
  const phoneRegExp = /^(?:\+94|94|0)(?:1|7|2|6|8)(?:\d{8}|\d{9})$/;
  // const [state, setState] = useState({
  //   companyName: props.cName,
  //   serviceType: props.sType,
  //   location: props.location,
  //   contactNumber: props.cNumber
  // });

  // const onInputChange = e => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  const updateServiceProvider = async formData => {
    const { id, setServiceProviders, spList, setIsService, hideUpdateForm} = props;
    const { companyName, serviceType, location, contactNumber } = formData;
    const serviceData = {
        companyName: companyName,
        serviceType: serviceType,
        location: location,
        contactNumber: contactNumber
    };

    try {
      await axios
        .put(`/service-provider/update/${id}`, serviceData)
        .then(res => {
          const serviceCopy = [...spList];

          serviceCopy.map(item => {
            if (item.id === id) {
              item.companyName = serviceData.contactNumber;
              item.serviceType = serviceData.serviceType;
              item.location = serviceData.location;
              item.contactNumber = serviceData.contactNumber;
            }
          });

          setServiceProviders(serviceCopy);
          setIsService(true);
          hideUpdateForm();
          enqueueSnackbar('Service Provider Updated', { variant: 'success' });
        });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  };

  return (
    <Modal
      open={showForm}
      onClose={props.submitFormHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={classes.root}>
        <h2 className={classes.h2}>Update Service Provider</h2>
        <Formik
          initialValues={{
            companyName: props.cName,
            serviceType: props.sType,
            location: props.location,
            contactNumber: props.cNumber,
          }}
          validationSchema={Yup.object().shape({
            companyName: Yup.string().required('Required*'),
            serviceType: Yup.string().required('Required*'),
            location: Yup.string().required('Required*'),
            contactNumber: Yup.string()
            .test('is-phone', 'Invalid phone number', value => phoneRegExp.test(value))
            .required('A phone number is required')
          })}
          onSubmit={updateServiceProvider}
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
                    error={
                      errors.companyName && errors.companyName?.length
                        ? true
                        : false
                    }
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
                    error={
                      errors.location && errors.location?.length ? true : false
                    }
                    multiline
                    maxRows={4}
                    label="Address"
                  />
                  <FormHelperText stylr={{ color: 'red' }}>
                    {errors.location}
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
                    error={
                      errors.serviceType && errors.serviceType?.length
                        ? true
                        : false
                    }
                  >
                    <MenuItem value={'Electrician'}>Electrician</MenuItem>
                    <MenuItem value={'Plumber'}>Plumber</MenuItem>
                    <MenuItem value={'Clerk'}>Clerk</MenuItem>
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
                    error={
                      errors.contactNumber && errors.contactNumber?.length
                        ? true
                        : false
                    }
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
                  UPDATE
                </Button>
                <Button
                  onClick={props.hideUpdateForm}
                  type="submit"
                  className={classes.submitBtn}
                  variant="contained"
                  style={{ marginTop: '10%' }}
                >
                  Cancel
                </Button>
              </>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};

export default Form;