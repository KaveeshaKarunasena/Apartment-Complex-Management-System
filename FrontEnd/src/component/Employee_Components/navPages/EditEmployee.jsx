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
      console.log(id);

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
        } else console.log('Error ');
      });
    };

    getData();
  }, [props]);

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
        const employeeCopy = [...employee];

        employeeCopy.map(item => {
          if (item._id === id) {
            item.name = data.name;
            item.nic = data.nic;
            item.address = data.address;
            item.dob = data.dob;
            item.jobTitle = data.jobTitle;
            item.department = data.department;
            item.contactNumber = data.contactNumber;
            item.basicSalary = data.basicSalary;
            item.allowance = data.allowance;
            item.overtime = data.overtime;
          }
        });

        setemployee(employeeCopy);

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
      console.log(err)
      enqueueSnackbar("Not Updated", { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Formik
      // validationSchema={Yup.object().shape({
      //   apartmentno: Yup.string()
      //     .max(3, 'must have maximum 3 Numbers')
      //     .required('Required*'),
      //   floor: Yup.string()
      //     .max(2, 'must have maximum 2 Numbers')
      //     .required('Required'),
      //   buildingNo: Yup.string().required('Required'),
      //   type: Yup.string().required('Required'),
      //   ownersName: Yup.string().required('Required'),
      //   status: Yup.string().required('Required'),
      //   email: Yup.string().required('Required'),
      // })}
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
                  type="text"
                  size="small"
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
                  value={state.allowance}
                  onChange={onInputChange}
                  name="allowance"
                  label="Allowance"
                  type="number"
                  size="small"
                  error={
                    errors.allowance && errors.allowance?.length ? true : false
                  }
                />
                <FormHelperText stylr={{ color: 'red' }}>
                  {errors.allowance}
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
