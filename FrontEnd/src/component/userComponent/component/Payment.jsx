import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from 'tss-react/mui';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import jwt_decode from 'jwt-decode';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Formik } from 'formik';

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
    marginRight: '30%',
    justifyContent: 'center',
  },
  formControl: {
    marginTop: '10px',
  },
  submitBtn: {
    marginTop: '75px',
    marginLeft: '16%',
  },
}));

const theme = createTheme();

export default function Payment() {
  let authPayload = useContext(AuthContext);
  const decoded = jwt_decode(authPayload.token);
  const Id = decoded.id;
  console.log(Id);

  const { enqueueSnackbar } = useSnackbar();
  //const navigate = useNavigate();

  const addPayment = async formData => {
    try {
      console.log(formData);
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post('/addPayment/addPayment', {
        ...formData,
      });
      enqueueSnackbar('Payment Complete', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  };

  const { classes } = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Formik
            initialValues={{
              apartmentNo: '',
              category: '',
              amount: 0,
            }}
            validationSchema={Yup.object().shape({
              apartmentNo: Yup.string()
                .length(3)
                .matches(
                  /^[a-zA-Z]\d{2}$/,
                  "use one letter and two number format \nex: 'A10' "
                )
                .required('Apartment number is required'),

              amount: Yup.string().required('Amount is required'),
            })}
            onSubmit={addPayment}
          >
            {({ values, errors, handleChange, handleSubmit }) => {
              return (
                <>
                  <Typography component="h1" variant="h5">
                    Payment Portal
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <FormControl className={classes.formControl} fullWidth>
                      <TextField
                        margin="normal"
                        id="apartmentNo"
                        name="apartmentNo"
                        label="Apartment No"
                        type="text"
                        value={values.apartmentNo}
                        className={classes.apartmentNo}
                        placeholder="Enter apartment No"
                        error={errors['apartmentNo'] ? true : false}
                        onChange={handleChange}
                        helperText={
                          errors['apartmentNo'] ? errors['apartmentNo'] : null
                        }
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <Select
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem value="">
                          <Typography>Categories</Typography>
                        </MenuItem>
                        <MenuItem value="Amenity Chargers">Amenities</MenuItem>
                        <MenuItem value="Bill Chargers">Bills</MenuItem>
                        <MenuItem value="Services Chargers">Services</MenuItem>
                        <MenuItem value="Others Chargers">Other</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl className={classes.formControl} fullWidth>
                      <TextField
                        margin="normal"
                        onChange={handleChange}
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="number"
                        value={values.amount}
                        placeholder="Rs."
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Submit
                    </Button>
                  </Box>
                </>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
