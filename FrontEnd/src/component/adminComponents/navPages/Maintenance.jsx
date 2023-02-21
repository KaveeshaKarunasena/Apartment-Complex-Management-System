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
  FormControlLabel
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

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
  
  const addApartment = async formData => {
    try {
      const res = await axios.post('/maintenance/add', {
        ...formData,
      });
      enqueueSnackbar('Succesfully Registered', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  };
  return (
    <Box className={classes.root}>
      <Formik
        initialValues={{
          amount: '',
          description: '',
          date: '',
        }}
        validationSchema={Yup.object().shape({
          amount: Yup.string().required('Required*'),
          description: Yup.string().required('Required'),
          date: Yup.string().required('Required'),
        })}
        onSubmit={addApartment}
      >
        {({ values, errors, handleChange, handleSubmit }) => {
          return (
            <>
              <Typography variant="h3">Add Maintenance</Typography>
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
            </>
          );
        }}
      </Formik>
    </Box>
  );
}

export default Maintanence;
