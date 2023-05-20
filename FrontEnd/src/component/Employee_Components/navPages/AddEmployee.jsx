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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from 'tss-react/mui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
    marginTop: '20px',
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
      
      console.log(formData);
      const res = await axios.post('/employee/add', {
        ...formData,
      });
      enqueueSnackbar('Succesfully Added', { variant: 'success' });
      navigate('/manager/Employee_view');
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
          contactNumber: '',
          basicSalary: 0,
          allowance: 0,
          overtime:0
        }}
        validationSchema={Yup.object().shape({
          nic: Yup.string()
            .max(12, 'must have maximum 12 Numbers')
            .required('Required*'),
          jobTitle: Yup.string().required('Required'),
          department: Yup.string().required('Required'),
          basicSalary: Yup.string().required('Required'),
          allowance: Yup.string().required('Required'),
          basicSalary: Yup.number().min(12500).required('Required'),
          contactNumber: Yup.string().length(9).required('Required'),
          address: Yup.string().required('Required'),
          name:Yup.string().required('Required'),
          
        })}
        onSubmit={AddEmployee}
      >
        {({ values, errors, handleChange, handleSubmit }) => {
          return (
            <>
              <Typography variant="h3">Add Employee</Typography>
              <FormControl className={classes.formControl} variant="outlined" 
              
              >
                <TextField
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  type="text"
                  size="small"
                  error={errors.name && errors.name?.length ? true : false}
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
                  error={errors.nic && errors.nic?.length? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.nic}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <FormHelperText id="component-helper-text">
                  Date of Birth
                </FormHelperText>
                <TextField
                  value={values.dob}
                  onChange={handleChange}
                  name="dob"
                  type="date"
                  size="small"
                  error={errors.dob && errors.dob?.length ?   true : false}
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
                  error={
                    errors.address && errors.address?.length ? true : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.type}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
              <Typography>Job Title</Typography>
                <FormControl fullWidth>
                      <Select
                        name="jobTitle"
                        value={values.jobTitle}
                        onChange={handleChange}
                        displayEmpty
                        variant="outlined"
                        label="job Title"
                      >
                        <MenuItem value="">
                          
                        </MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Executive Grade 1">Executive Grade 1</MenuItem>
                        <MenuItem value="Executive Grade 2">Executive Grade 2</MenuItem>
                        <MenuItem value="Junior">Junior</MenuItem>
                      </Select>
                    </FormControl>
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.jobTitle}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
              <Typography>Department</Typography>
                <FormControl fullWidth>
                      <Select
                        name="department"
                        label="Department"
                        value={values.department}
                        onChange={handleChange}
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem value="">
                          
                        </MenuItem>
                        <MenuItem value="Security">Secuitry</MenuItem>
                        <MenuItem value="Management">Management</MenuItem>
                        <MenuItem value="Maintaince">Maintaince</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                    </FormControl>
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
                  error={
                    errors.contactNumber &&
                    errors.contactNumber?.length.toFixed(10) &&
                    !errors.allowance?.charAt(0).includes('-')
                      ? true
                      : false
                  }
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
                  error={
                    errors.basicSalary &&
                    errors.basicSalary?.length &&
                    !errors.allowance?.charAt(0).includes('-')
                      ? true
                      : false
                  }
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
                  label="Over-time Rate"
                  type="number"
                  size="small"
                  error={
                    errors.allowance &&
                    errors.allowance?.length &&
                    !errors.allowance?.charAt(0).includes('-')
                      ? true
                      : false
                  }
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
