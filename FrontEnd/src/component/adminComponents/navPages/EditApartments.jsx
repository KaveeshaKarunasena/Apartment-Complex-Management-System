import React from 'react';
import {
  Box,
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
import { useState, useEffect, useContext } from 'react';
import './RditForm.css';
import { AuthContext } from '../../AuthProvider';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const useStyles = makeStyles()(theme => ({
  root: {
    margin: '0 auto',
    paddingTop: '5px',
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
    color: 'primary',
    backgroundColor: '#488042',
  },
}));

const EditApartments = props => {
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  let authPayload = useContext(AuthContext);
  const ctx = authPayload.token;
  const headers = { Authorization: 'Bearer ' + ctx };

  const [state, setState] = useState({
    apartmentno: '',
    floor: '',
    buildingNo: '',
    type: '',
    ownersName: '',
    status: '',
    email: '',
  });

  const onInputChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const { id } = props;
    const getData = async () => {
      await axios.get(`/apartment/getById/${id}`, { headers }).then(res => {
        if (res.data.success) {
          setState({
            apartmentno: res.data.apartmentModel.apartmentno,
            floor: res.data.apartmentModel.floor,
            buildingNo: res.data.apartmentModel.buildingNo,
            type: res.data.apartmentModel.type,
            status: res.data.apartmentModel.status,
            ownersName: res.data.apartmentModel.ownersName,
            email: res.data.apartmentModel.email,
          });
        } else alert('Error ');
      });
    };

    getData();
  }, []);

  const updateApartment = async e => {
    const { apartmentno, floor, buildingNo, type, status, ownersName, email } =
      state;
    const { id } = props;
    const { setOpenPopup, setApartment, apartment } = props;
    const data = {
      apartmentno: apartmentno,
      floor: floor,
      buildingNo: buildingNo,
      type: type,
      status: status,
      ownersName: ownersName,
      email: email,
    };
    setOpenPopup(false);
    try {
      await axios
        .put(`/apartment/update/${id}`, data, { headers })
        .then(res => {
          const apartmentCopy = [...apartment];

          apartmentCopy.map(item => {
            if (item._id === id) {
              item.apartmentno = data.apartmentno;
              item.floor = data.floor;
              item.buildingNo = data.buildingNo;
              item.type = data.type;
              item.status = data.status;
              item.ownersName = data.ownersName;
              item.email = data.email;
            }
          });

          setApartment(apartmentCopy);

          enqueueSnackbar('Succesfully Updated', { variant: 'success' });

          if (res.data.success) {
            setState({
              apartmentno: '',
              floor: '',
              buildingNo: '',
              type: '',
              status: '',
              ownersName: '',
              email: '',
            });
          }
        });
    } catch (err) {
      const error = err.response.data.err;
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Formik
        validationSchema={Yup.object().shape({
          type: Yup.string().required('Required'),
          ownersName: Yup.string().required('Required'),
          status: Yup.string().required('Required'),
          email: Yup.string().email('Invalid Email').required('Required'),
        })}
      >
        {({ errors }) => {
          return (
            <>
              <Typography variant="h3">Edit Apartment</Typography>
              <FormControl className="formControl" variant="outlined">
                <TextField
                  value={state.apartmentno}
                  onChange={onInputChange}
                  name="apartmentno"
                  label="Apartment No"
                  type="text"
                  size="small"
                  disabled={true}
                  error={
                    errors.apartmentno && errors.apartmentno?.length
                      ? true
                      : false
                  }
                />
                <FormHelperText style={{ color: 'red' }}>
                  {errors.apartmentno}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.floor}
                  onChange={onInputChange}
                  // className='txt'
                  name="floor"
                  label="Floor No"
                  type="text"
                  size="small"
                  disabled={true}
                  error={errors.floor && errors.floor?.length ? true : false}
                />
                <FormHelperText style={{ color: 'red' }}>
                  {errors.floor}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.buildingNo}
                  onChange={onInputChange}
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
                <FormHelperText style={{ color: 'red' }}>
                  {errors.buildingNo}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.type}
                  onChange={onInputChange}
                  name="type"
                  label="Type"
                  type="text"
                  size="small"
                  error={errors.type && errors.type?.length ? true : false}
                />
                <FormHelperText style={{ color: 'red' }}>
                  {errors.type}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.ownersName}
                  onChange={onInputChange}
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
                <FormHelperText style={{ color: 'red' }}>
                  {errors.ownersName}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.email}
                  onChange={onInputChange}
                  name="email"
                  label="Owners Email"
                  type="email"
                  size="small"
                  error={errors.email && errors.email?.length ? true : false}
                />
                <FormHelperText style={{ color: 'red' }}>
                  {errors.ownersName}
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <TextField
                  value={state.status}
                  onChange={onInputChange}
                  name="status"
                  label="Status"
                  type="text"
                  size="small"
                  error={errors.status && errors.status?.length ? true : false}
                />
                <FormHelperText style={{ color: 'red' }}>
                  {errors.status}
                </FormHelperText>
              </FormControl>
              <Button
                onClick={() => updateApartment()}
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
    



    // <>
    //   <Form>
    //   <Form.Group className="mb-3" controlId="formBasicEmail">
    //     <Form.Label>Email address</Form.Label>
    //     <Form.Control type="email" placeholder="Enter email" />
    //     <Form.Text className="text-muted">
    //       We'll never share your email with anyone else.
    //     </Form.Text>
    //   </Form.Group>

    //   <Form.Group className="mb-3" controlId="formBasicPassword">
    //     <Form.Label>Password</Form.Label>
    //     <Form.Control type="password" placeholder="Password" />
    //   </Form.Group>
    //   <Form.Group className="mb-3" controlId="formBasicCheckbox">
    //     <Form.Check type="checkbox" label="Check me out" />
    //   </Form.Group>
    //   <Button variant="primary" type="submit">
    //     Submit
    //   </Button>
    // </Form>
    // </>



  );
};

export default EditApartments;
