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
import { useState, useEffect } from 'react';


const useStyles = makeStyles()(theme => ({
  root: {
    margin: '0 auto',
    paddingTop:'5px',
    height: '75vh',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px',
  },
  formControl: {
    marginTop: '10px',
    paddingTop: '5px',
  },
  submitBtn: {
    color : 'primary'

  },
}));

const EditEmployee = props => {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState({
    name: '',
    nic: '',
    dob: '',
    address: '',
    jobTitle: '',
    department: '',
    contactNumber:'',
    basicSalary:'',
    allowance:'',
    overtime:''
  });

  const onInputChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const { id } = props;
    const getData = async () => {
      

      await axios.get(`/employee/getById/${id}`).then(res => {
        if (res.data.success) {
          setState({

            name: res.data.EmployeeModel.name,
            nic: res.data.EmployeeModel.nic,
            dob: res.data.EmployeeModel.dob,
            address: res.data.EmployeeModel.address,
            jobTitle: res.data.EmployeeModel.jobTitle,
            department:res.data.EmployeeModel.department,
            contactNumber: res.data.EmployeeModel.contactNumber,
            basicSalary: res.data.EmployeeModel.basicSalary,
            allowance:res.data.EmployeeModel.allowance,
            overtime:res.data.EmployeeModel.overtime
          });
        } else alert('Error ');
      });
    };

    getData();
  }, []);

  const updateEmployee = async e => {
    const {
      name,
      nic,
      address,
      dob,
      jobTitle,
      department,
      contactNumber,
      basicSalary,
      allowance,
      overtime,
    } = state;

    const { id } = props;
    const { setOpenPopup, setemployee, employee } = props;
    const data = {

      name: name,
      nic: nic,
      address: address,
      dob: dob,
      jobTitle: jobTitle,
      department:department,
      contactNumber:contactNumber,
      basicSalary:basicSalary,
      allowance:allowance,
      overtime:overtime
    };
    setOpenPopup(false);
    try {  
      await axios.put(`/employee/update/${id}`, data).then(res => {
        enqueueSnackbar('Succesfully Updated', { variant: 'success' });

        if (res.data.success) {
          setState({
            name: '',
            nic: '',
            dob: '',
            address: '',
            jobTitle: '',
            department: '',
            contactNumber:'',
            basicSalary:'',
            allowance:'',
            overtime:''
          });
        }
      });
    } catch (err) {
      alert(err)
      enqueueSnackbar("Not Updated", { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Formik
      validationSchema={Yup.object().shape({
        nic: Yup.string()
          .max(12, 'must have maximum 12 Numbers')
          .required('Required*'),
        jobTitle: Yup.string().required('Required'),
        department: Yup.string().required('Required'),
        basicSalary: Yup.string().min(12500).required('Required'),
        allowance: Yup.string().required('Required'),
        contactNumber: Yup.string().length(10).required('Required'),
        address: Yup.string().required('Required'),
      })}
      >
        {({ errors }) => {
          return (
            <>
              <Typography variant="h3">Edit Employee</Typography>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.name}
                  onChange={onInputChange}
                  name="name"
                  label="name"
                  type="text"
                  size="small"
                  disabled = {true}
                  error={errors.name && errors.name?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.name}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.nic}
                  onChange={onInputChange}
                  name="nic"
                  label="NIC"
                  type="text"
                  size="small"
                  disabled = {true}
                  error={errors.nic && errors.nic?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.nic}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.dob}
                  onChange={onInputChange}
                  name="dob"
                  label="Date of birth"
                  type="date"
                  size="small"
                  disabled = {true}
                  error={errors.dob && errors.dob?.length ? true : false}
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.dob}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.address}
                  onChange={onInputChange}
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
                <TextField
                  value={state.jobTitle}
                  onChange={onInputChange}
                  name="jobTitle"
                  label="jobTitle"
                  type="text"
                  size="small"
                  
                  error={
                    errors.jobTitle && errors.jobTitle?.length ? true : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.jobTitle}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.department}
                  onChange={onInputChange}
                  name="department"
                  label="department"
                  type="text"
                  size="small"
                  disabled = {true}
                  error={
                    errors.department && errors.department?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.department}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.contactNumber}
                  onChange={onInputChange}
                  name="contactNumber"
                  label="contact Number"
                  type="number"
                  size="small"
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
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.basicSalary}
                  onChange={onInputChange}
                  name="basicSalary"
                  label="basic Salary"
                  type="number"
                  size="small"
                  error={
                    errors.basicSalary && errors.basicSalary?.length ? true : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.allowancee}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.allowance}
                  onChange={onInputChange}
                  name="Over Time -Rate"
                  label="Over Time -Rate"
                  type="number"
                  size="small"
                  error={
                    errors.allowance && errors.allowance?.length ? true : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.allowancee}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.overtime}
                  onChange={onInputChange}
                  name="overtime"
                  label="Overtime"
                  type="number"
                  size="small"
                  error={
                    errors.overtime &&
                    errors.overtime?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.overtime}
                </FormHelperText>
              </FormControl>
              <Button
                onClick={updateEmployee}
                type="submit"
                className={classes.submitBtn}
                variant="contained"
              >
                Update
              </Button>
            </>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditEmployee;
