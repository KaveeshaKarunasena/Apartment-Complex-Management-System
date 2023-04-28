import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  Box from "@mui/material/Box";
import avatar from '../assets/profile.png';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../AuthProvider';
import axios from "axios";
import jwt_decode from 'jwt-decode'

function DataFetching(){
  const[posts, setPosts] = useState([])
  

  try{
    // const fromStorage = localStorage.getItem('token');
  //   const authPayload = useContext(AuthContext)

  //  console.log(fromStorage)

  // // const decoded = jwt_decode(authPayload.token)
  // // console.log(decoded)


  }catch(err){
    console.log(err)
  }
  
  useEffect(() => {
    axios.get('/customer/get/')
    .then((res,err) => {
      alert("Fetched Customer")
    })
    .catch((err) => {
      alert(err)
    })
  })
}

export default function MediaCard(props) {
  
  return (
    <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
     <Avatar alt="Remy Sharp" src={avatar} sx={{ width: 90, height: 90 }}/>
     <Typography gutterBottom variant="h5" component="div">
              Name
            </Typography>
      <Box component="form"  noValidate sx={{ mt: 1,  }}>
        <Card sx={{ maxWidth: 600,height:550}}>
          <CardMedia
            sx={{ height: 140 }}
            // image="/static/images/cards/contemplative-reptile.jpg"
            // title="green iguana"
          />
           
          
          <CardActions >
          <Grid container justifyContent="center" spacing={12}>
            <Grid item>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#006ee6',
                }}
                //onClick={displayUpdateForm}
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#006ee6',
                }}
               // onClick={enableDialogHandler}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardActions>
          <CardContent>

            <Typography variant="body2" color="text.secondary">
            <span>
              <b>Apartment No:</b> {props.sType}
            </span>
            <br />
            <span>
              <b>Name:</b> {props.location}{' '}
            </span>
            <br />
            <span>
              <b>NIC No:</b> {props.cNumber}{' '}
            </span>
            <br />
            <span>
              <b>Phone No:</b> {props.sType}
            </span>
            <br />
            <span>
              <b>Email:</b> {props.location}{' '}
            </span>
            <br />
            <span>
              <b>Password:</b> {props.cNumber}{' '}
            </span>
            <br />
            </Typography>
          </CardContent>
          <CardActions >
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: '#006ee6',
                }}
                //onClick={displayUpdateForm}
              >
                Update Profile
              </Button>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: '#006ee6',
                }}
               // onClick={enableDialogHandler}
              >
                Generate QR Coode
              </Button>
            </Grid>
            <Grid item  xs={12} md={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: '#006ee6',
                }}
               // onClick={enableDialogHandler}
              >
                Report
              </Button>
            </Grid>
          </Grid>
        </CardActions>
        </Card>
        </Box>
  </Box>
  );
}