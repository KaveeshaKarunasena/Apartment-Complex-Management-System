import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';


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
