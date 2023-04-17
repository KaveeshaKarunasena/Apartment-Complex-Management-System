import { useFormik } from "formik";
import { Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "tss-react/mui";
import * as Yup from "yup";
import axios from "axios";
import Swal from 'sweetalert2'


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
      if (values.confPassword === values.password) {
        alert(JSON.stringify(values, null, 2));
        axios({ method: "POST", url: "http://localhost:8000/customer/otp", data: { email: values.email } });
        Swal.fire({
          title: "Enter OTP",
          input: "text",
          inputLabel: "",
          inputPlaceholder: "Enter otp",
          showCancelButton: true,
          confirmButtonText: "Submit",
          preConfirm: (otp) => {
            return axios
              .post("http://localhost:8000/customer/verifyOTP", { values,otp })
              .then((response) => {
                return response.data;
              })
              .catch((error) => {
                Swal.showValidationMessage(`Request failed: ${error}`);
              });
          },
        }).then((result) => {
          if (result.value) {
            Swal.fire("Submitted!", '', "success");
            axios({ method: "POST", url: "http://localhost:8000/customer/add", data: { name: values.name,appartmentNo: values.apartmentNo,email: values.email,phoneNo: values.phoneNo,nicNo: values.nicNo,password: values.password } }).then(()=>{
              alert("Customer added")
            }).catch((err)=>{
              alert(err)
            })
          }
        })
        .catch((err)=>{
          alert(err)
        });
      }
    },
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
        Sign-Up
      </Typography>

      <div>
        <TextField
          id='name'
          name='name'
          label='Name'
          type='text'
          value={formik.values.name}
          className={classes.name}
          placeholder='Enter name'
          onChange={handleChange}
          error={formik.errors["name"] && formik.touched.name ? true : false}
          helperText={
            formik.errors["name"] && formik.touched.name
              ? formik.errors["name"]
              : null
          }
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
          id='phoneNo'
          name='phoneNo'
          label='Phone No'
          type='text'
          className={classes.phoneNo}
          value={formik.values.phoneNo}
          placeholder='Enter phone number'
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
        <TextField
          id='email'
          name='email'
          label='Email'
          type='email'
          className={classes.email}
          value={formik.values.email}
          error={formik.errors["email"] && formik.touched.email ? true : false}
          placeholder='Enter email'
          onChange={handleChange}
          helperText={
            formik.errors["email"] && formik.touched.email
              ? formik.errors["email"]
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
        <TextField
          name='confPassword'
          label='Conform Password'
          type='password'
          autoComplete='current-password'
          value={formik.values.confPassword}
          error={formik.errors["confPassword"] ? true : false}
          onChange={handleChange}
          helperText={
            formik.errors["confPassword"] ? formik.errors["confPassword"] : null
          }
        />
        <br />
        <Button type='submit' className={classes.submitBtn} variant='contained'>
          Get OTP
        </Button>
      </div>
    </Box>
  );
}
