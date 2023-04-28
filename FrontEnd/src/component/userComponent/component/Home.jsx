import React from 'react';
import { AppBar, Toolbar, Typography, Button, Card, CardContent } from '@material-ui/core';
import {  NavLink } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';

function HomePage() {
  const styles = `
    .app-bar {
      background-color: #333;
    }
    .card {
      max-width: 600px;
      padding: 1rem;
      background-color: #f2f2f2;
    }
    .card-title {
      margin-bottom: 1rem;
      color: #333;
    }
    .card-body {
      color: #555;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 64px);
    }
    .slideshowContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '80%',
      marginTop: '4%',
      marginLeft:'10%',
      placeItems: 'center',
      
    }
    .slide: {
      
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
    }
    
  `;

  

  return (
    <div>
      <style>{styles}</style>
      <AppBar position="static" className="app-bar">
        <Toolbar style={{ align: "center" }}>
          
          <Button color="inherit"><NavLink  to="/app" style={{textDecoration: 'none',color:'white'}}>Home</NavLink></Button>
          <Button color="inherit">Amenities</Button>
          <Button color="inherit">Payment</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Notices</Button>
          <Button color="inherit">Complaint</Button>
        </Toolbar>
      </AppBar>

      <div className={styles.slideshowContainer}>
          <Slide easing="ease">
            <div className={styles.slide} style={{ backgroundImage: `url("https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/a437a906e33b179367ab8fdd3c6e8c9a-f_b.webp")` }}></div>
                        
            <div className={styles.slide} style={{ backgroundImage: `url("https://cdna.artstation.com/p/assets/images/images/052/835/088/large/rodrigo-salvo-rainnightv2-copy.jpg?1660775583")` }}></div>
                         
            <div className={styles.slide} style={{ backgroundImage: `url("https://wallpaperset.com/w/full/e/4/d/175796.jpg")` }}></div>
                          
          </Slide>
        </div>

      <div className="content">
        <Card className="card">
          <CardContent>
            <Typography variant="h5" component="h2" className="card-title">
              Welcome to My App!
            </Typography>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
