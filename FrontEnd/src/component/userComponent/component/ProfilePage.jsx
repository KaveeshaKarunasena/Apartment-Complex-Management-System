import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import avatar from '../assets/profile.png';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import UpdateCustomer from './UpdateCustomer';
import { IconButton } from '@material-ui/core';
import Swal from 'sweetalert2';
import CustomerReport from './CustomerReport';
//import Popup from './Popup';

//import ClassNameGenerator from '@mui/core/generateUtilityClass/ClassNameGenerator';

// function DataFetching(){
//   const[posts, setPosts] = useState([])

//   useEffect(() => {
//     axios.get('/customer/get/')
//     .then((res,err) => {
//       console.log("Fetched Customer")
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   })
// }

export default function ProfilePage(props) {
  let authPayload = useContext(AuthContext);
  const [customer, setCustomer] = useState([]);
  const decoded = jwt_decode(authPayload.token);
  const Id = decoded.id;
  const [getId, setGetId] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
    try{
     
        const { data } = await axios.get(`/customer/getCustomer/${Id}`);

        const cus = data.customerModle;
        setPhotoUrl(cus.photo)
        console.log(photoUrl)
        //const val =Object.values(cus)
        setPhotoUrl(cus.photo);
        setCustomer(cus);
      }catch (error){
        console.log('Error fetching customer data:', error);
    };
  }
    fetchData();
  }, []);

  const handleProps = id => {
    setGetId(id);

    <UpdateCustomer id={id}></UpdateCustomer>;
    navigate(`/app/updateCustomer/${id}`);

  };

  const handlePropsReport = id => {
    setGetId(id);

    <CustomerReport id={id}></CustomerReport>
    navigate(`/app/customerReport/${id}`)
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
  formData.append('photo', selectedFile);
  console.log(selectedFile);

  try {
    const response = await axios.put(`/customer/upload/${Id}`, formData);
    console.log(response);
    setPhotoUrl(response.data.photo);
    console.log('Profile photo uploaded successfully');
  } catch (error) {
    console.log('Error uploading file:', error);
  }
  };

  const handleDeletePhoto = async (photoUrl) => {
    try {
      setDeleteLoading(true);
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        await Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        await axios.delete(`/customer/delete/${Id}/photo`);
      } else {
        setDeleteLoading(false); // Set loading state to false if deletion is canceled
        return; // Return early without clearing the photo state and logging success message
      }
  
      // Clear the photo state
      // You may need to update the logic depending on how you manage state in your app
      setPhotoUrl(null);
      console.log('Profile photo deleted successfully');
    } catch (error) {
      console.error('Error deleting profile photo:', error);
    } finally {
      setDeleteLoading(false);
    }
  };
  

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card>
        <CardMedia
            sx={{ height: 30 }}
            
        />
        <CardContent>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="children"
            style={{ marginTop: '-10%' }}
          >
            {photoUrl && (
              <img src={`http://localhost:5000/uploads/${photoUrl}`} style={{width: 90, height: 90}} alt = 'Customer Profile'/>
            )}
            {photoUrl == null &&(
              <img src={`http://localhost:5000/assert/profile.png`} style={{width: 90, height: 90}} alt = 'Customer Profile'/>
            )}
            
          </IconButton>
        </CardContent>
      </Card>
      {/* <Avatar alt="Remy Sharp" src={avatar} sx={{ width: 90, height: 90 }} /> */}
      <Typography gutterBottom variant="h5" component="div">
        {customer.name}
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Card sx={{ maxWidth: 600, height: 550 }}>
          <CardMedia
            sx={{ height: 140 }}
            // image="/static/images/cards/contemplative-reptile.jpg"
            // title="green iguana"
          />

          <CardActions>
            <Grid container justifyContent="center" spacing={12}>
              <Grid item>
                {/* <Button
                variant="contained"
                style={{
                  backgroundColor: '#006ee6',
                }}
                onClick={handleFileUpload}
              >
                Update
              </Button> */}
                <div>
                  <input type="file" onChange={handleFileChange} />
                  {/* <button onClick={handleFileUpload}>Upload</button> */}
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#006ee6',
                    }}
                    onClick={handleFileUpload}
                  >
                    Upload
                  </Button>
                </div>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#006ee6',
                  }}
                  onClick={handleDeletePhoto}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </CardActions>
          <CardContent>
            {/* {customer && customer.map(data => (

              ))} */}
            <Typography variant="body2" color="text.secondary">
              <span>
                <b>Apartment No:</b> {customer.apartmentNo}{' '}
              </span>
              <br />
              <span>
                <b>Name:</b> {customer.name}{' '}
              </span>
              <br />
              <span>
                <b>NIC No:</b> {customer.nicNo}{' '}
              </span>
              <br />
              <span>
                <b>Phone No:</b> {customer.phoneNo}
              </span>
              <br />
              <span>
                <b>Email:</b> {customer.email}{' '}
              </span>
              <br />

              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} md={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: '#006ee6',
                  }}
                  onClick={() => handleProps(customer._id)}
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
              <Grid item xs={12} md={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: '#006ee6',
                  }}
                  onClick={() => handlePropsReport(customer._id)}
                >
                  Report
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        {/* <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        customer={customer}
        setCustomer={setCustomer}
        getId={getId}
      ></Popup> */}
      </Box>
    </Box>
  );
}
