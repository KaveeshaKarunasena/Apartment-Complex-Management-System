import { useFormik } from "formik";
import { Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "tss-react/mui";
import * as Yup from "yup";
// import axios from "axios";
// import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import Avatar from "@mui/material/Avatar";
//import { Toaster } from 'react-hot-toast';
// import { apartmentNoValidate } from "../helper/validate";



const validationSchema = Yup.object({
  name: Yup.string().min(2).required("name is required"),
  apartmentNo: Yup.string()
    .length(3)
    .matches( 
      /^[a-zA-Z]\d{2}$/,
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
    marginRight: "80%",
  },
  link:{
    marginLeft: "-100px",
  },
  
}));

export default function SignIn() {
  const { classes } = useStyles();

  const formik = useFormik({
    initialValues: {
      apartmentNo: "",
      nicNo: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: async values =>{
        console.log(values)
    }
  });

  const { handleChange, handleSubmit } = formik;

    return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete='off'
      className={classes.root}
      onSubmit={handleSubmit}>
      <Typography variant='h4' className={classes.signup}>
        Sign-In
      </Typography>

      <div className="flex justoify-center items-center h-screen">

      <Avatar
          alt="Remy Sharp"
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
          id='nicNo'
          name='nicNo'
          label='NIC No'
          type='text'
          value={formik.values.nicNo}
          className={classes.nicNo}
          placeholder='Enter NIC No'
          error={formik.errors["nicNo"] && formik.touched.nicNo ? true : false}
          onChange={handleChange}
          helperText={
            formik.errors["nicNo"] && formik.touched.nicNo
              ? formik.errors["nicNo"]
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
          className={classes.link}
          variant="body2"
          onClick={() => {
          
          }}
        >
           Fortet Password
        </Link>
      </div>
    </Box>
  );
}
