import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';


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

  const addApartment = async formData => {
    try {
      const res = await axios.post('/apartment/add', {
        ...formData,
      });
      enqueueSnackbar('Succesfully Registered', { variant: 'success' });
      navigate('/view');
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
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
          status: '',
        }}
        validationSchema={Yup.object().shape({
          apartmentno: Yup.string()
            .max(3, 'must have maximum 3 Numbers')
            .required('Required*'),
          floor: Yup.string()
            .max(2, 'must have maximum 2 Numbers')
            .required('Required'),
          buildingNo: Yup.string().required('Required'),
          type: Yup.string().required('Required'),
          ownersName: Yup.string().required('Required'),
          status: Yup.string().required('Required'),
        })}
        onSubmit={addApartment}
      >
        {({ values, errors, handleChange, handleSubmit }) => {
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
                  value={values.buildingNo}
                  onChange={handleChange}
                  name="buildingNo"
                  label="Building No"
                  type="text"
                  size="small"
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
                <TextField
                  value={values.type}
                  onChange={handleChange}
                  name="type"
                  label="Type"
                  type="text"
                  size="small"
                  error={errors.type && errors.type?.length ? true : false}
                />
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
                  value={values.status}
                  onChange={handleChange}
                  name="status"
                  label="Status"
                  type="text"
                  size="small"
                  error={errors.status && errors.status?.length ? true : false}
                />
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
            </>
          );
        }}
      </Formik>
    </Box>
  );
}

export default AddApartments;
