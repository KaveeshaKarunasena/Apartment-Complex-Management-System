import React from 'react';
import {
  alpha,
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

function AddEmployees() {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const AddEmployee = async formData => {
    try {
      console.log(formData)
      const res = await axios.post('/employee/add', {
        ...formData,
    
      });
      enqueueSnackbar('Succesfully Added', { variant: 'success' });
      navigate('/mDash/Employee_view');
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  };
  
  return (
    <Box className={classes.root}>
      <Formik
        initialValues={{
          name: '',
          nic: '',
          dob: '',
          address: '',
          jobTitle: '',
          department: '',
          contactNumber:'',
          basicSalary:'',
          allowance:'',
        }}
        // validationSchema={Yup.object().shape({
        // dob:Yup.
        //   type: Yup.string().required('Required'),
        //   ownersName: Yup.string().required('Required'),
        //   status: Yup.string().required('Required'),
        //   email: Yup.string().email('Invalid Email').required('Required'),
        // })}
        onSubmit={AddEmployee}
      >
        {({ values, errors, handleChange, handleSubmit }) => {
          return (
            <>
              <Typography variant="h3">Add Employee</Typography>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  type="text"
                  size="small"
                  error={
                    errors.name && errors.name?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.name}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.nic}
                  onChange={handleChange}
                  name="nic"
                  label="NIC"
                  type="text"
                  size="small"
                  error={errors.nic && errors.nic?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.nic}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.dob}
                  onChange={handleChange}
                  name="dob"
                  label="Date of Birth"
                  type="text"
                  size="small"
                  error={
                    errors.dob && errors.dob?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.dob}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.address}
                  onChange={handleChange}
                  name="address"
                  label="Address"
                  type="text"
                  size="small"
                  error={errors.address && errors.address?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.type}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.jobTitle}
                  onChange={handleChange}
                  name="jobTitle"
                  label="Job Title"
                  type="text"
                  size="small"
                  error={
                    errors.jobTitle && errors.jobTitle?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.jobTitle}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.department}
                  onChange={handleChange}
                  name="department"
                  label="Department"
                  type="text"
                  size="small"
                  error={errors.department && errors.department?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.department}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.contactNumber}
                  onChange={handleChange}
                  name="contactNumber"
                  label="Contact Number"
                  type="number"
                  size="small"
                  error={errors.contactNumber && errors.contactNumber?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.contactNumber}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.basicSalary}
                  onChange={handleChange}
                  name="basicSalary"
                  label="basic Salary"
                  type="number"
                  size="small"
                  error={errors.basicSalary && errors.basicSalary?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.basicSalary}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={values.allowance}
                  onChange={handleChange}
                  name="allowance"
                  label="Allowance"
                  type="number"
                  size="small"
                  error={errors.allowance && errors.allowance?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.allowance}
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

export default AddEmployees;
