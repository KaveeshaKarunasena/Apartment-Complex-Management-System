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
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import {useNavigate,NavLink } from "react-router-dom";



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

const saveToken = async ( payload) => {
  await localStorage.setItem('token' , JSON.stringify(payload))
}

export default function SignIn() {
  const navigate = useNavigate();
    const { classes } = useStyles();
    let { init } =  useContext(AuthContext);

    const formik = useFormik({
      initialValues: {
        
        apartmentNo: "",
        password:"",
        
      },
      validationSchema: validationSchema,
      validateOnChange: true,
      onSubmit: async values =>{
        const res = await axios({ method: "POST", url: "/customer/login", data: { apartmentNo: values.apartmentNo , password: values.password } }).then((res)=>{
          if(res.status === 200){
            navigate('/customerhome')
          }
        })
        // await saveToken(res);
       console.log("success")
       await saveToken(res.data);
      //  console.log(res.data)
       init && (await init());
              
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
              label='ApartmentNo'
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
                
                <NavLink to='/signup'> {"Don't have an account? Sign Up"}</NavLink>
                 
                
              </Grid>
            </Grid>
        </Box>
        

      </Container>
    </ThemeProvider>
  );
}
