// import { useFormik } from "formik";
// import { Box, Typography, Button } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { makeStyles } from "tss-react/mui";
// import * as Yup from "yup";
// import axios from "axios";
// import Swal from 'sweetalert'
// import CryptoJs from 'crypto-js'
// import { useNavigate } from 'react-router-dom';
// import { useState } from "react";


// const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email address").required("Required"),
// });

// const useStyles = makeStyles()((theme) => ({
//   root: {
//     [theme.breakpoints.up("md")]: {
//       width: "30%",
//     },
//     [theme.breakpoints.down("md")]: {
//       width: "60%",
//     },
//     [theme.breakpoints.down("sm")]: {
//       width: "95%",
//     },
//     margin: "0 auto",
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     marginTop: "30px",
//     marginRight: "30%",
//   },
//   formControl: {
//     marginTop: "10px",
//   },
//   submitBtn: {
//     marginTop: "75px",
//     marginLeft: "15%",
//   },
//   recoverypassword: {
//     marginRight: "80%",
//   },
// }));

// export default function RecoveryPassword() {

//   const[email,setEmail] = useState("")
//   const { classes } = useStyles();
//   const ciphertext = CryptoJs.AES.encrypt( email, 'my-secret-key@123').toString();
//   const navigate = useNavigate()

//   //const bytes = CryptoJs.AES.decrypt(ciphertext, 'my-secret-key@123');

//   const formik = useFormik({
//     initialValues: {
      
//       email: "",
      
//     },
//     validationSchema: validationSchema,
//     validateOnChange: true,
//     onSubmit: (values) => {
//         setEmail(values.email)
        
//         //console.log(JSON.stringify(values, null, 2));
//         axios({ method: "POST", url: "/otp/sendOTP", data: { email: values.email } });
//         Swal.fire({
//           title: "Enter OTP",
//           input: "text",
//           inputLabel: "",
//           inputPlaceholder: "Enter otp",
//           showCancelButton: true,
//           confirmButtonText: "Submit",
//           preConfirm: (otp) => {
//             return axios
//               .post("/otp/verifyOTP", { values,otp })
//               .then((response) => {
//                 navigate(`/recoveryPasswordSet/${ciphertext}`)
//                 return response.data;
//               })
//               .catch((error) => {
//                 Swal.showValidationMessage(`Request failed: ${error}`);
//               });
//           },
//         }).then((result) => {
         
//         })
//         .catch((err)=>{
//           console.log(err)
//         });
      
//     },
//   });

//   const { handleChange, handleSubmit } = formik;

//     return (
//     <Box
//       component='form'
//       sx={{
//         "& .MuiTextField-root": { m: 1, width: "25ch" },
//       }}
//       noValidate
//       autoComplete='off'
//       className={classes.root}
//       onSubmit={handleSubmit}>
//       <Typography variant='h4' className={classes.signup}>
//         Recover Password
//       </Typography>

//       <div>
                                     
//         <TextField
//           id='email'
//           name='email'
//           label='Email'
//           type='email'
//           className={classes.email}
//           value={formik.values.email}
//           error={formik.errors["email"] && formik.touched.email ? true : false}
//           placeholder='Enter email'
//           onChange={handleChange}
//           helperText={
//             formik.errors["email"] && formik.touched.email
//               ? formik.errors["email"]
//               : null
//           }
//         />
        
//         <br />
//         <Button type='submit' className={classes.submitBtn} variant='contained'>
//           Get OTP
//         </Button>
//       </div>
//     </Box>
//   );
// }
