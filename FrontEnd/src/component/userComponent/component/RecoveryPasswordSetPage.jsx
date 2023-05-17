import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { makeStyles } from '@mui/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme();

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
  confPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
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

export default function RecoveryPasswordSetPage() {
  const navigate = useNavigate();
  //const classes = useStyles();
  const location = useLocation();
  const { email } = location.state;

  const formik = useFormik({
    initialValues: {
      email: email,
      password: '',
      confPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (values.confPassword === values.password) {
        axios({
          method: 'PUT',
          url: `/customer/recoverypassword/${email}`,
          data: { email: email, password: values.password },
        })
          .then(() => {
            console.log('Password Updated');
            navigate('/login');
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
            Type Your Passwords
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
                  margin="normal"
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
          <br />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
