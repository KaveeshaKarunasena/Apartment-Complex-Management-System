import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';

function HomePage() {
  // eslint-disable-next-line no-unused-vars
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
      <div className="content">
        <Card className="card">
          <CardContent>
            <Typography variant="h5" component="h2" className="card-title">
              Welcome to Wescott Apartment Web Site
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
