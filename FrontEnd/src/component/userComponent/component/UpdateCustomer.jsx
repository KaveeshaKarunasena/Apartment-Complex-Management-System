import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from "yup";
import axios from "axios";
//import Swal from 'sweetalert2'
import { useFormik } from "formik";
import { makeStyles } from "tss-react/mui";
import {useNavigate} from 'react-router-dom'


const theme = createTheme();

const validationSchema = Yup.object({
    name: Yup.string().min(2).required("name is required"),
    apartmentNo: Yup.string()
      .length(3)
      .matches(
        /^[A-Z]\d{2}$/,
        "use one letter and two number format \nex: 'A10' "
      )
      .required("apartment number is required"),
    phoneNo: Yup.number().required("phone number is required"),
    nicNo: Yup.string().required("nic is required"),
    password: Yup.string().min(5).required("Password is required"),
    confPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const useStyles = makeStyles()((theme) => ({
    root: {
      [theme.breakpoints.up("md")]: {
        width: "30%",
      },
      [theme.breakpoints.down("md")]: {
        width: "60%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "95%",
      },
      margin: "0 auto",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      marginTop: "30px",
      marginRight: "30%",
    },
    formControl: {
      marginTop: "10px",
    },
    submitBtn: {
      marginTop: "75px",
      marginLeft: "15%",
    },
    signup: {
      marginRight: "80%",
    },
  }));

export default function SignUp() {

    const navigate = useNavigate();
    const { classes } = useStyles();

    const formik = useFormik({
        initialValues: {
          name: "",
          apartmentNo: "",
          email: "",
          phoneNo: "",
          nicNo: "",
          confPassword: "",
          password: "",
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
                     
            axios({ method: "PUT", url: "/customer/update/:id", data: { name: values.name,appartmentNo: values.apartmentNo,email: values.email,phoneNo: values.phoneNo,nicNo: values.nicNo,password: values.password }});
             navigate('/profile')
          
        },
      });

      const { handleChange, handleSubmit } = formik;

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Customer Details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id='name'
                  name='name'
                  label='Name'
                  type='text'
                  autocomplete="off"
                  value={formik.values.name}
                  className={classes.name}
                  placeholder='Enter name'
                 // defaultValue="Hello World"
                  onChange={handleChange}
                  error={formik.errors["name"] && formik.touched.name ? true : false}
                  helperText={
                    formik.errors["name"] && formik.touched.name
                      ? formik.errors["name"]
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id='apartmentNo'
                  name='apartmentNo'
                  label='Apartment No'
                  type='text'
                  autocomplete="off"
                  value={formik.values.apartmentNo}
                  className={classes.apartmentNo}
                  placeholder='Enter apartment No'
                   // defaultValue="Hello World"
                  error={
                    formik.errors["apartmentNo"] && formik.touched.apartmentNo
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  helperText={
                    formik.errors["apartmentNo"] && formik.touched.apartmentNo
                      ? formik.errors["apartmentNo"]
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id='nicNo'
                  name='nicNo'
                  label='NIC No'
                  type='text'
                  value={formik.values.nicNo}
                  className={classes.nicNo}
                  placeholder='Enter NIC No'
                   // defaultValue="Hello World"
                  error={formik.errors["nicNo"] && formik.touched.nicNo ? true : false}
                  onChange={handleChange}
                  helperText={
                    formik.errors["nicNo"] && formik.touched.nicNo
                      ? formik.errors["nicNo"]
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id='phoneNo'
                  name='phoneNo'
                  label='Phone No'
                  type='text'
                  className={classes.phoneNo}
                  value={formik.values.phoneNo}
                  placeholder='Enter phone number'
                   // defaultValue="Hello World"
                  error={
                    formik.errors["phoneNo"] && formik.touched.phoneNo ? true : false
                  }
                  onChange={handleChange}
                  helperText={
                    formik.errors["phoneNo"] && formik.touched.phoneNo
                      ? formik.errors["phoneNo"]
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id='email'
                  name='email'
                  label='Email'
                  type='email'
                  className={classes.email}
                  value={formik.values.email}
                  error={formik.errors["email"] && formik.touched.email ? true : false}
                  placeholder='Enter email'
                   // defaultValue="Hello World"
                  onChange={handleChange}
                  helperText={
                    formik.errors["email"] && formik.touched.email
                      ? formik.errors["email"]
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id='password'
                  name='password'
                  label='Password'
                  type='password'
                   // defaultValue="Hello World"
                  className={classes.password}
                  value={formik.values.password}
                  error={
                    formik.errors["password"] && formik.touched.password ? true : false
                  }
                  placeholder='Enter password'
                  onChange={handleChange}
                  helperText={
                    formik.errors["password"] && formik.touched.password
                      ? formik.errors["password"]
                      : null
                  }
                />
              </Grid>
              
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Details
            </Button>

          </Box>
                   
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}