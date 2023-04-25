import React from 'react';
import { AppBar, Toolbar, Typography, Button, Card, CardContent } from '@material-ui/core';

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
  `;

  return (
    <div>
      <style>{styles}</style>
      <AppBar position="static" className="app-bar">
        <Toolbar style={{ align: "center" }}>
          
          <Button color="inherit">Home</Button>
          <Button color="inherit">Amenities</Button>
          <Button color="inherit">Payment</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Notices</Button>
          <Button color="inherit">Complaint</Button>
          <Button color="inherit">Appointment</Button>
        </Toolbar>
      </AppBar>
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
