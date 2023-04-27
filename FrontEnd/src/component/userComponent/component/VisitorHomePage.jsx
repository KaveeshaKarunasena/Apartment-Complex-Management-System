import React from 'react';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {Typography,Grid} from '@material-ui/core';
import Box from '@mui/material/Box';
import { Card, CardMedia,CardContent, } from '@material-ui/core';
import {NavLink } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    color: '#fff',
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  button: {
    color: '#000',
    marginLeft: theme.spacing(2),
    fontWeight: 600,
  },
  slideshowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
    marginTop: '4%',
    marginLeft:'10%',
    placeItems: 'center',
    
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
    width:'200px',
    height:'200px',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  media: {
    height: '150px',
    alignItems:'center',
    justifyContent:'center'
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
  
  body: {
    background: 'linear-gradient(to left right, #DAE2F8, #D6A4A4)'
  }
  
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
            <Button  variant="contained" color="primary" style={{ fontWeight: 600, marginLeft: '10px',backgroundColor:'#DBE8D8',color: '#000'}}>
              <NavLink to='login' style={{ textDecoration: 'none' , color: '#000'}}>Sign In</NavLink>
            </Button>
            <Button variant="contained" color="primary" style={{ fontWeight: 600, marginLeft: '10px',backgroundColor:'#FDB750',color: '#000'}}>
            <NavLink to='signup' style={{ textDecoration: 'none' , color: '#000'}}>Sign Up</NavLink>
            </Button>
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
            <Typography component="h2" variant="h5" style={{ textDecoration: 'underline' }}>
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
            <Typography component="h2" variant="h5" style={{ textDecoration: 'underline' }}>
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
            <Typography component="h2" variant="h5" style={{ textDecoration: 'underline' }}>
                Amenities of our apartment
            </Typography>
        </Box>

        <div className={classes.cardContainer}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://media.istockphoto.com/id/1132086660/photo/side-view-of-beautiful-muscular-woman-running-on-treadmill.jpg?s=612x612&w=0&k=20&c=5Vq_BJjG7sbIyKIP-Adu0pChReDXm0dC7BVPvto2M0I=")`}} title="Card 1" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  GYMNasium
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkCGbcX63A2YajcYLpk0E4QDzMQRZ9MdNBY1GBpQrVmHmTC8Fjii2-1Nw7TSRAGTV4Urw&usqp=CAU")`}} title="Card 2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Ground Flow
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/258476559.jpg?k=d4814e4f52fc37f0b25348014aded4f24878f35bb687892e8b1bb67acd73bda5&o=")`}} title="Card 2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Kids Pool
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://is1-2.housingcdn.com/01c16c28/40db4fe5884790514df8840fd2338e81/v0/fs/1_bhk_apartment-for-sale-vikhroli_west-Mumbai-building_view.jpg")`}} title="Card 2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Kiddies Play Area
                </Typography>
              </CardContent>
            </Card>
          
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://www.cassia.com/images/offer-and-event/LFFF-gallery3.png")`}} title="Card 2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Kids Club
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className={classes.cardContainer}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCGJH72fXyrVqPlsa1NwopCD-swoFKPHrhFg&usqp=CAU")`}} title="Card 2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                Laundry
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://www.elevee.id/storage/temp/public/afe/743/e61/SkyYogaDeck%20960x480__960.jpg")`}} title="Card 2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Yoga Deck
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardMedia className={classes.media} style={{ backgroundImage: `url("https://nypost.com/wp-content/uploads/sites/2/2020/09/nyc-indoor-pools-reopening-2.jpg?quality=75&strip=all&w=744")`}} title="Card 2" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Pool
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
            <img src="../assets/logo.png" alt="Logo" className={classes.logo} />
            
          </Grid>
        </Grid>
      </footer>
        
      </Box>
      
    </>
  );
}

export default VisitorHomePage;
