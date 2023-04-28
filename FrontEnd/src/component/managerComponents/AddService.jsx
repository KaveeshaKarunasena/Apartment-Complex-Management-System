import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Grid from '@mui/material/Grid';
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
import 'yup-phone';

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
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
  },
  formControl: {
    marginTop: '10px',
    padding: '5px',
  },
  submitBtn: {
    marginTop: '15px',
    backgroundColor: '#488042',
  },
  h1: {
    color: '#488042',
    textAlign: 'center',
  },
}));

const AddService = props => {
  // function used to add a service provider
  const { enqueueSnackbar } = useSnackbar();
  const { showForm } = props;
  const { classes } = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const phoneRegExp = /^(?:\+94|94|0)(?:1|7|2|6|8)(?:\d{8}|\d{9})$/;

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const addServiceProvider = async formData => {
    try {
     

      // const formData1 = new FormData();
      // formData1.append("companyName", formData.companyName);
      // formData1.append("location", formData.location);
      // formData1.append("serviceType", formData.serviceType);
      // formData1.append("contactNumber", formData.contactNumber);
      // formData1.append('photo', selectedFile);

      const res1 = await axios
        .post('/service-provider/add', formData)
        .then(res => {
          alert(res.data);
        })
        .catch(err => {
          alert(err.message);
        });

      // const res = await axios.post('/service-provider/add', { ...formData });

      enqueueSnackbar('Service Provider Added', { variant: 'success' });
      props.setShowForm(false);
      props.setIsService(true);
      setSelectedFile(undefined);
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
      style={{ overflow: 'scroll' }}
    >
      <Box sx={style} className={classes.root}>
        <h1 className={classes.h1}>Add Service Provider</h1>
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
              .test('is-phone', 'Invalid phone number', value =>
                phoneRegExp.test(value)
              )
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
                    {errors.companyName}
                  </FormHelperText>
                </FormControl>
                <FormControl style={{ marginTop: '10%' }} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Service Type
                  </InputLabel>
                  <Select
                    value={values.serviceType}
                    onChange={handleChange}
                    name="serviceType"
                    error={
                      errors.companyName && errors.serviceType?.length
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
                <FormControl style={{ marginTop: '10%', marginLeft: '-2%' }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={onSelectFile}
                  />
                  <label htmlFor="raised-button-file">
                    <Grid container spacing={1}>
                      <Grid item xs={2}>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          style={{ marginTop: '-10%' }}
                        >
                          {selectedFile && (
                            <img src={preview} style={{ width: '50%' }} alt = {values.companyName}/>
                          )}
                          {!selectedFile && <PhotoCamera />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={4}>
                        Upload Image
                      </Grid>
                    </Grid>
                  </label>
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
                <Button
                  onClick={props.submitFormHandler}
                  type="submit"
                  className={classes.submitBtn}
                  variant="contained"
                  style={{ marginTop: '10%' }}
                >
                  CANCEL
                </Button>
              </>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddService;
