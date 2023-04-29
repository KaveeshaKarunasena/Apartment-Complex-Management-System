import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from "yup";
import axios from "axios";
//import Swal from 'sweetconsole.log2'
import { useFormik } from "formik";
import { makeStyles } from "tss-react/mui";
import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import CryptoJs from 'crypto-js'

const theme = createTheme();



const validationSchema = Yup.object({
    name: Yup.string().min(2),
    apartmentNo: Yup.string()
      .length(3)
      .matches(
        /^[A-Z]\d{2}$/,
        "use one letter and two number format \nex: 'A10' "
      )
      ,
    phoneNo: Yup.number(),
    nicNo: Yup.string(),
    email: Yup.string().email("Invalid email address"),
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

export default function UpdateCustomer(props) {

  // const {state} = useLocation()
  // const { userId } = state || {};
  const[state,setState] = useState([])
  const [customer,setCustomer] = useState([])
  const { id } = useParams();
 
  const { classes } = useStyles();
  const navigate = useNavigate()
  

  useEffect(() =>  {

    const fetchData =  async() =>{
      
      const {data} = await axios.get(`/customer/getCustomer/${id}`)
      
      const cus = data.customerModle
      
      setCustomer(cus)
      
    }
    fetchData()
  },[])


     
    const formik = useFormik({
        initialValues: {
          name: customer.name,
          apartmentNo: customer.apartmentNo,
          email: customer.email,
          phoneNo: customer.phoneNo,
          nicNo: customer.nicNo,
          
        },
        validationSchema: validationSchema,
        validateOnChange: true,

        handleChange : e => {
          setCustomer({ ...state, [e.target.name]: e.target.value });
         
        },
        
        onSubmit: (values) => {
                     
          // const ciphertext = CryptoJs.AES.encrypt("kaveeshakarunasena@gmail.com", 'my-secret-key@123').toString();
          
          // const bytes = CryptoJs.AES.decrypt(ciphertext, 'my-secret-key@123');
          // const decryptedData = bytes.toString(CryptoJs.enc.Utf8);
          
            const res = axios({ method: "PUT", url: `/customer/update/${id}`, data: { name: values.name,apartmentNo: values.apartmentNo,email: values.email,phoneNo: values.phoneNo,nicNo: values.nicNo,password: values.password }});
            
            navigate('/app/profile')
          
        },
      });

      const {  handleChange,handleSubmit } = formik;

     

  

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
                  variant="filled"
                  autocomplete="off"
                  value={customer.name}
                  className={classes.name}
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
                  variant="filled"
                  autocomplete="off"
                  value={customer.apartmentNo}
                  className={classes.apartmentNo}
                  onChange={handleChange}
                  error={
                    formik.errors["apartmentNo"] && formik.touched.apartmentNo
                      ? true
                      : false
                  }
                  helperText={
                    formik.errors["apartmentNo"] && formik.touched.apartmentNo
                      ? formik.errors["apartmentNo"]
                      : null
                  }
                  
                  InputProps={{
                    readOnly: true,
                  }}
                  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id='nicNo'
                  name='nicNo'
                  label='NIC No'
                  type='text'
                  variant="filled"
                  value={customer.nicNo}
                  className={classes.nicNo}
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
                  variant="filled"
                  className={classes.phoneNo}
                  value={customer.phoneNo}
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
                  variant="filled"
                  className={classes.email}
                  value={customer.email}
                  error={formik.errors["email"] && formik.touched.email ? true : false}
                  onChange={handleChange}
                  helperText={
                    formik.errors["email"] && formik.touched.email
                      ? formik.errors["email"]
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