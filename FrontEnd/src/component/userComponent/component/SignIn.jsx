import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from "yup";
import axios from "axios";
import avatar from '../assets/profile.png';
import { useFormik } from "formik";
import { makeStyles } from "tss-react/mui";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const validationSchema = Yup.object({
  
    apartmentNo: Yup.string()
      .length(3)
      .matches( 
        /^[a-zA-Z]\d{2}$/,
        "use one letter and two number format \nex: 'A10' "
      )
      .required("apartment number is required"),
    
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
      justifyContent: "center",
    },
    formControl: {
      marginTop: "10px",
    },
    submitBtn: {
      marginTop: "75px",
      marginLeft: "16%",
    },
    signin: {
      marginRight: "70%",
    },
    link1:{
      marginLeft: "-100px",
      color: "#000000",
      "&:hover": {
          color: "#FF0000",
          textDecoration: "underline #000000"
      }
    },
    link2:{
      marginLeft: "60px",
      color: "#000000",
      "&:hover": {
          color: "#FF0000",
          textDecoration: "underline #000000"
      }
    },
  
    
  }));

const theme = createTheme();

export default function SignIn() {
    const { classes } = useStyles();

    const formik = useFormik({
      initialValues: {
        
        apartmentNo: "",
        password:"",
        
      },
      validationSchema: validationSchema,
      validateOnChange: true,
      onSubmit: async values =>{
        axios({ method: "POST", url: "http://localhost:8000/customer/login", data: { apartmentNo: values.apartmentNo , password: values.password } });
       // console.log("success")
      }
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
          <Avatar alt="Remy Sharp" src={avatar}/>
                   
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id='apartmentNo'
              name='apartmentNo'
              label='Apartment No'
              type='text'
              value={formik.values.apartmentNo}
              className={classes.apartmentNo}
              placeholder='Enter apartment No'
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
            <TextField
              margin="normal"
              fullWidth
              id='password'
              name='password'
              label='Password'
              type='password'
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

          </Box>
          <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" component="button" to="/add">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
