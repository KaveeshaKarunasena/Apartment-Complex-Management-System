import { useFormik } from 'formik';
import { Box, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const validationSchema = Yup.object({
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
  recoverypassword: {
    marginRight: '80%',
  },
}));

export default function RecoveryPassword() {
  const [email,setEmail] = useState('');
  const { classes } = useStyles();
  const navigate = useNavigate();

  //const bytes = CryptoJs.AES.decrypt(ciphertext, 'my-secret-key@123');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: values => {
      setEmail(values.email);

      //console.log(JSON.stringify(values, null, 2));
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
              navigate(`/recoveryPasswordSet`, {
                state: { email: values.email },
              });
              return response.data;
            })
            .catch(error => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
      })
        .then(result => {})
        .catch(err => {
          console.log(err);
        });
    },
  });

  // eslint-disable-next-line no-unused-vars
  const { handleChange, handleSubmit } = formik;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', marginTop: '5%' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginTop: '10%' }}>
            Recover Password
          </Typography>

          <Grid container spacing={2} sx={{ marginTop: '10%' }}>
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
                  formik.errors['email'] && formik.touched.email ? true : false
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
          </Grid>
          <br />
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Get OTP
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
