import { useFormik } from "formik";
import { Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "tss-react/mui";
import * as Yup from "yup";
import axios from "axios";
// import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import Avatar from "@mui/material/Avatar";

//import { Toaster } from 'react-hot-toast';
// import { apartmentNoValidate } from "../helper/validate";



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
      axios({ method: "POST", url: "http://localhost:5000/customer/login", data: { apartmentNo: values.apartmentNo , password: values.password } });
    }
  });

  const { handleChange, handleSubmit } = formik;

    return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        justifyContent:'center',
      }}
      noValidate
      autoComplete='off'
      className={classes.root}
      onSubmit={handleSubmit}>
      <Typography variant='h4' className={classes.signin}  align='center'>
        Sign-In
      </Typography>

      <div className="flex justoify-center items-center h-screen">

        <div >
          <Avatar
              alt="Remy Sharp"
              align="center"
              src={avatar}
              sx={{ width: 210, height: 200, marginRight:"10%" }}
          />
          
            <TextField
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
            
            <br />
            <Button type='submit' className={classes.submitBtn} variant='contained'>
              Loging
            </Button>

            <Link
              component="button"
              className={classes.link1}
              variant="body2"
              onClick={() => {
              
              }}
              to="/recovery"
            >
              Fortet Password
            </Link>

            <br/>

            <Link
              component="button"
              className={classes.link2}
              variant="body2"
              underline="none"
              
              to="/add"
            >
              Not a Member
            </Link>
            
          </div>
        </div>
    </Box>
  );
}
