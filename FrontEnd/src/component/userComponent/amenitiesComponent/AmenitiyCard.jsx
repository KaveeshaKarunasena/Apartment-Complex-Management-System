import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import DeleteDialog from './DeleteDialog';

import '../../managerComponents/serviceProvider.css';

export default function AmenitiyCard(props) {

  const product = {props};

  return (
    <React.Fragment>
    
      <Card sx={{ maxWidth: 345, margin: '0 auto', padding: '0.1em' }}>
        <CardMedia
          component = "img"
          sx={{ height: 250, padding: '1em 1em 0 1em', objectFit: 'contain' }}
          image={product.images.url}
          title={props.cName}
        />
        {/* <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: 'Center' }}
          >
            {props.cName}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            <span>
              <b>Service Type:</b> {props.sType}
            </span>
            <br />
            <span>
              <b>Location:</b> {props.location}{' '}
            </span>
            <br />
            <span>
              <b>Contact Number:</b> {props.cNumber}{' '}
            </span>
            <br />
          </Typography>
        </CardContent>
        <CardActions style={{ padding: '5%' }}>
          <Grid container justifyContent="center" spacing={12}>
            <Grid item>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#00B087',
                }}
                onClick={displayUpdateForm}
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#555',
                }}
                onClick={enableDialogHandler}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardActions> */}
      </Card>
    </React.Fragment>
  );
}
