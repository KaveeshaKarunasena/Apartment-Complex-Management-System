import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const useStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '35%',
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
    marginTop: '50px',
  },
  formControl: {
    marginTop: '10px',
  },
  submitBtn: {
    marginTop: '15px',
  },
}));
function Maintanence() {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [dropDown, setDropDown] = useState([]);
  const [initialValues, setInitialValues] = useState({
    apartmentNo: '',
    amount: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get('/apartment/allApartment');
      const sortData = data.sort((a, b) => (a._id > b._id ? 1 : -1));

      setDropDown(sortData);
    };
    fetchDetails();
  }, []);

  const addMaintenance = async formData => {
    try {
      const res = await axios.post('/maintenance/add', {
        ...formData,
      });

      console.log(formData);

      enqueueSnackbar('Succesfully Added', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          apartmentNo: Yup.string().required('Required'),
          amount: Yup.number().required('Required*'),
          description: Yup.string().required('Required'),
          date: Yup.date().max(new Date()).required('Required'),
        })}
        onSubmit={addMaintenance}
      >
        {({ values, errors, handleChange, handleSubmit, resetForm }) => {
          return (
            <>
              <Typography variant="h3">Add Maintenance</Typography>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select
                  value={values.apartmentNo}
                  onChange={handleChange}
                  name="apartmentNo"
                  label="Apartment No"
                  size="small"
                  error={
                    errors.apartmentNo && errors.apartmentNo?.length
                      ? true
                      : false
                  }
                >
                  {dropDown &&
                    dropDown.map((data, index) => (
                      <MenuItem key={index} value={data._id}>
                        {data._id}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.apartmentNo}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.amount}
                  onChange={handleChange}
                  name="amount"
                  label="Amount"
                  type="text"
                  size="small"
                  error={errors.amount && errors.amount?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.amount}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.description}
                  onChange={handleChange}
                  name="description"
                  label="Description"
                  type="text"
                  size="small"
                  error={
                    errors.description && errors.description?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.description}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.date}
                  onChange={handleChange}
                  name="date"
                  type="date"
                  size="small"
                  maxDate={new Date()}
                  error={errors.date && errors.date?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.date}
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

export default Maintanence;
