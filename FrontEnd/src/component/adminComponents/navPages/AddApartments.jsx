import React, { useContext } from 'react';
import {
  alpha,
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from 'tss-react/mui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../AuthProvider';

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
  },
  submitBtn: {
    marginTop: '15px',
  },
}));

function AddApartments() {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  let authPayload = useContext(AuthContext);
  const ctx = authPayload.token;
  const headers = { Authorization: 'Bearer ' + ctx };

  const addApartment = async formData => {
    try {
      const res = await axios.post(
        '/apartment/add',
        {
          ...formData,
        },
        { headers }
      );
      enqueueSnackbar('Succesfully Added', { variant: 'success' });
      navigate('/admin/view');
    } catch (err) {
      const error = err.response.data.err;
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Formik
        initialValues={{
          apartmentno: '',
          floor: '',
          buildingNo: '',
          type: '',
          ownersName: '',
          email: '',
          status: '',
        }}
        validationSchema={Yup.object().shape({
          apartmentno: Yup.string()
            .matches(/^[A-Z][0-9][0-9]/, 'Enter a valid Apartment')
            .length(3, 'Must have 3 Characters')
            .required('Required*'),
          floor: Yup.number('Must be a Number').max(15).required('Required'),
          buildingNo: Yup.string()
            .matches(/^[A-Z]/, 'Enter a valid Building')
            .length(1, 'Must have 1 Characters')
            .required('Required'),
          type: Yup.string().required('Required'),
          ownersName: Yup.string().required('Required'),
          status: Yup.string().required('Required'),
          email: Yup.string().email('Invalid Email').required('Required'),
        })}
        onSubmit={addApartment}
      >
        {({ values, errors, handleChange, handleSubmit, resetForm }) => {
          return (
            <>
              <Typography variant="h3">Add Apartment</Typography>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.apartmentno}
                  onChange={handleChange}
                  name="apartmentno"
                  label="Apartment No"
                  type="text"
                  size="small"
                  error={
                    errors.apartmentno && errors.apartmentno?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.apartmentno}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.floor}
                  onChange={handleChange}
                  name="floor"
                  label="Floor No"
                  type="text"
                  size="small"
                  error={errors.floor && errors.floor?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.floor}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={
                    (values.buildingNo = values.apartmentno.substring(0, 1))
                  }
                  onChange={handleChange}
                  name="buildingNo"
                  label="Building No"
                  type="text"
                  size="small"
                  disabled={true}
                  error={
                    errors.buildingNo && errors.buildingNo?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.buildingNo}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select
                  value={values.type}
                  onChange={handleChange}
                  name="type"
                  label="Type"
                  size="small"
                  error={errors.type && errors.type?.length ? true : false}
                >
                  <MenuItem value={'Luxury'}>Luxury</MenuItem>
                  <MenuItem value={'Semi Luxury'}>Semi Luxury</MenuItem>
                </Select>
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.type}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.ownersName}
                  onChange={handleChange}
                  name="ownersName"
                  label="Owners Name"
                  type="text"
                  size="small"
                  error={
                    errors.ownersName && errors.ownersName?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.ownersName}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  label="Owners Email"
                  type="email"
                  size="small"
                  error={errors.email && errors.email?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.email}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={values.status}
                  onChange={handleChange}
                  name="status"
                  label="Status"
                  size="small"
                  error={errors.status && errors.status?.length ? true : false}
                >
                  <MenuItem value={'Owned'}>Owned</MenuItem>
                  <MenuItem value={'Free'}>Free</MenuItem>
                  <MenuItem value={'Pending'}>Pending</MenuItem>
                </Select>
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.status}
                </FormHelperText>
              </FormControl>
              <Button
                onClick={() => handleSubmit()}
                type="submit"
                className={classes.submitBtn}
                variant="contained"
              >
                ADD
              </Button>
              <Button
                type="button"
                color="error"
                variant="contained"
                className={classes.submitBtn}
                onClick={() => resetForm()}
              >
                Reset
              </Button>
            </>
          );
        }}
      </Formik>
    </Box>
  );
}

export default AddApartments;
