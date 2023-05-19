import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { makeStyles } from 'tss-react/mui';
import { useNavigate, NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme();

const validationSchema = Yup.object({
  name: Yup.string().min(2).required('name is required'),
  apartmentNo: Yup.string()
    .length(3)
    .matches(
      /^[A-Z]\d{2}$/,
      "use one letter and two number format \nex: 'A10' "
    )
    .required('apartment number is required'),
  phoneNo: Yup.number().required('phone number is required'),
  nicNo: Yup.string().max(12).required('nic is required'),
  password: Yup.string().min(5).required('Password is required'),
  confPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
  email: Yup.string().email('Invalid email address').required('Required'),
});

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
  },
  formControl: {
    marginTop: '10px',
  },
  submitBtn: {
    marginTop: '75px',
    marginLeft: '15%',
  },
  signup: {
    marginRight: '80%',
  },
}));

// const imageUpload = (event)=>{
//   console.log(event.target.files[0])
// }

export default function SignUp() {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const formik = useFormik({
    initialValues: {
      name: '',
      apartmentNo: '',
      email: '',
      phoneNo: '',
      nicNo: '',
      photo: '',
      confPassword: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: values => {
      console.log(values);
      if (values.confPassword === values.password) {
        axios({
          method: 'POST',
          url: '/otp/sendOTP',
          data: { email: values.email },
        });
        Swal.fire({
          title: 'Enter OTP',
          input: 'text',
          inputLabel: '',
          inputPlaceholder: 'Enter otp',
          showCancelButton: true,
          confirmButtonText: 'Submit',
          preConfirm: otp => {
            return axios
              .post('/otp/verifyOTP', { values, otp })
              .then(response => {
                return response.data;
              })
              .catch(error => {
                Swal.fire({
                  title: 'Mismatched OTP',
                  icon: 'question',
                  iconHtml: '?',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Back'
                })
              });
          },
        })
          .then(result => {
            if (result.value) {
              axios({
                method: 'POST',
                url: '/customer/add',
                data: {
                  name: values.name,
                  apartmentNo: values.apartmentNo,
                  email: values.email,
                  phoneNo: values.phoneNo,
                  photo: values.photo,
                  nicNo: values.nicNo,
                  password: values.password,
                },
              })
                .then(() => {
                  console.log('Customer added');
                  navigate('/login');
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  autocomplete="off"
                  value={formik.values.name}
                  className={classes.name}
                  placeholder="Enter name"
                  onChange={handleChange}
                  error={
                    formik.errors['name'] && formik.touched.name ? true : false
                  }
                  helperText={
                    formik.errors['name'] && formik.touched.name
                      ? formik.errors['name']
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="apartmentNo"
                  name="apartmentNo"
                  label="Apartment No"
                  type="text"
                  autocomplete="off"
                  value={formik.values.apartmentNo}
                  className={classes.apartmentNo}
                  placeholder="Enter apartment No"
                  error={
                    formik.errors['apartmentNo'] && formik.touched.apartmentNo
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  helperText={
                    formik.errors['apartmentNo'] && formik.touched.apartmentNo
                      ? formik.errors['apartmentNo']
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="nicNo"
                  name="nicNo"
                  label="NIC No"
                  type="text"
                  value={formik.values.nicNo}
                  className={classes.nicNo}
                  placeholder="Enter NIC No"
                  error={
                    formik.errors['nicNo'] && formik.touched.nicNo
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  helperText={
                    formik.errors['nicNo'] && formik.touched.nicNo
                      ? formik.errors['nicNo']
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phoneNo"
                  name="phoneNo"
                  label="Phone No"
                  type="text"
                  className={classes.phoneNo}
                  value={formik.values.phoneNo}
                  placeholder="Enter phone number"
                  error={
                    formik.errors['phoneNo'] && formik.touched.phoneNo
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  helperText={
                    formik.errors['phoneNo'] && formik.touched.phoneNo
                      ? formik.errors['phoneNo']
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  className={classes.email}
                  value={formik.values.email}
                  error={
                    formik.errors['email'] && formik.touched.email
                      ? true
                      : false
                  }
                  placeholder="Enter email"
                  onChange={handleChange}
                  helperText={
                    formik.errors['email'] && formik.touched.email
                      ? formik.errors['email']
                      : null
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  className={classes.password}
                  value={formik.values.password}
                  error={
                    formik.errors['password'] && formik.touched.password
                      ? true
                      : false
                  }
                  placeholder="Enter password"
                  onChange={handleChange}
                  helperText={
                    formik.errors['password'] && formik.touched.password
                      ? formik.errors['password']
                      : null
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="confPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formik.values.confPassword}
                  error={formik.errors['confPassword'] ? true : false}
                  onChange={handleChange}
                  helperText={
                    formik.errors['confPassword']
                      ? formik.errors['confPassword']
                      : null
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} marginTop="10px">
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              marginTop="16px"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor: '#006ee6',
              }}
            >
              Get OTP
            </Button>
          </Box>
          <br></br>
          <Grid container justifyContent="flex-end">
            <Grid item marginTop="16px">
              <NavLink to="/login">Already have an account? Sign in</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
