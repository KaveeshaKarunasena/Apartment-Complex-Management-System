import React from 'react';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {Typography,Grid} from '@material-ui/core';
import Box from '@mui/material/Box';
import { Card, CardMedia,CardContent, } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    color: '#000',
    marginLeft: theme.spacing(2),
    fontWeight: 600,
  },
  slideshowContainer: {
    maxWidth: '80%',
    marginTop: '8%',
    marginLeft:'10%',
    placeItems: 'center'
    
  },
  slide: {
    height: '600px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255, 0.6)', 
    fontSize: '48px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px #000000',
  },
  typography: {
    fontFamily: 'Garamond',
    display:'flex',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    maxWidth: '45%',
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 200,
  },
  AmenityslideshowContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(4),
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  slideshow: {
    height: 400,
    backgroundColor: '#eee',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: theme.spacing(4),
    width:'100%'
  },
  logo: {
    height: '50px',
    marginRight: theme.spacing(2),
  },
  
}));

function VisitorHomePage() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography component="h1" variant="h5" marginBottom="5px">
                WESCCOT
            </Typography>
          </div>
          <div>
            <Button  variant="contained" color="primary" style={{ fontWeight: 600, marginLeft: '10px',backgroundColor:'#00FF00'}}>Sign In</Button>
            <Button variant="contained" color="primary" style={{ fontWeight: 600, marginLeft: '10px',backgroundColor:'#D10000'}}>Sign Up</Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.slideshowContainer}>
        <Slide easing="ease">
          <div className={classes.slide} style={{ backgroundImage: `url("https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/a437a906e33b179367ab8fdd3c6e8c9a-f_b.webp")` }}>
            <span>WESCCOT</span>
          </div>
          <div className={classes.slide} style={{ backgroundImage: `url("https://cdna.artstation.com/p/assets/images/images/052/835/088/large/rodrigo-salvo-rainnightv2-copy.jpg?1660775583")` }}>
            <span>WESCCOT</span>
          </div>
          <div className={classes.slide} style={{ backgroundImage: `url("https://wallpaperset.com/w/full/e/4/d/175796.jpg")` }}>
            <span>WESCCOT</span>
          </div>
        </Slide>
      </div>
     
      <Box
        sx={{
          marginTop: 8,
          marginBottom:5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor:'black',
          color:'white',
        }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor:'black',
          color:'white',
        }}>
            <Typography component="h2" variant="h5" >
                WELLCOME TO WESCCOT
            </Typography>
            <Typography >
               
                Where luxury embraces aesthetics, discernment, life and privacy as one.
                Inspired to create the ultimate standard in luxury as in life, The wesccot not only presents many first, 
                but also the coming together of many facets in a cohesive synchronization that is a Masterpiece. 
                Where aesthetics that evoke the senses combine with creative spaces to enhance life’s moments. 
                The wesccot stand tall as the first and only highrise in the prestigious Colombo 4, no 32 Ward Place.

            </Typography>
        </Box>

        <Box
        sx={{
          marginTop: 8,
          marginBottom:5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          backgroundColor:'black',
          color:'white',
        }}>
            <Typography component="h2" variant="h5" >
                Our Apartment Types
            </Typography>
        </Box>
          <div className={classes.cardContainer}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://top-luxury-apartments-yulya-paphos.booked.net/data/Photos/OriginalPhoto/11284/1128455/1128455679/Top-Luxury-Apartments-Yulya-Paphos-Exterior.JPEG")`}} title="Card 1" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Semi Luxury Apartment
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  2233 SQ.FT
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://static.zingyhomes.com/projectImages/cache/3e/f9/3ef9700d7f5f5c238652f8817a5acd62.jpg")`}} title="Card 2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Luxury Apartment
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  2686 - 3003 SQ.FT
                </Typography>
              </CardContent>
            </Card>
        </div>

        <Box
        sx={{
          marginTop: 8,
          marginBottom:5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          backgroundColor:'black',
          color:'white',
        }}>
            <Typography component="h2" variant="h5" >
                Amenities of our apartment
            </Typography>
        </Box>

        <div className={classes.cardContainer}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://media.istockphoto.com/id/1132086660/photo/side-view-of-beautiful-muscular-woman-running-on-treadmill.jpg?s=612x612&w=0&k=20&c=5Vq_BJjG7sbIyKIP-Adu0pChReDXm0dC7BVPvto2M0I=")`}} title="Card 1" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  GYMNation
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  2233 SQ.FT
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkCGbcX63A2YajcYLpk0E4QDzMQRZ9MdNBY1GBpQrVmHmTC8Fjii2-1Nw7TSRAGTV4Urw&usqp=CAU")`}} title="Card 2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Car Parking
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  2686 - 3003 SQ.FT
                </Typography>
              </CardContent>
            </Card>
        </div>

        <footer className={classes.footer}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h2">
              Contact Us
            </Typography>
            <Typography variant="body1" component="p">
              Phone: 081 1111111
            </Typography>
            <Typography variant="body1" component="p">
              Email: wesccot@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} container justify="flex-end">
            <img src="/frontend/src/assets/logo.png" alt="Logo" className={classes.logo} />
            
          </Grid>
        </Grid>
      </footer>
        
      </Box>
    </>
  );
}

export default VisitorHomePage;
