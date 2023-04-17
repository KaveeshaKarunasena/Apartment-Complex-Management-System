import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


export default function AppointmentCard(props) {
  return (
        <Card sx={{ maxWidth: 350}}>
          <CardContent>
            <Grid container spacing={8}>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  align="left"
                >
                  Customer
                </Typography>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  align="left"
                >
                  {props.customerName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  align="right"
                >
                  Service Provider
                </Typography>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  align="right"
                >
                  {props.serviceProvider}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center" spacing={12}>
              <Grid item>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#FFBD03',
                  }}
                >
                  Accept
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#5ADBB5',
                  }}
                >
                  Decline
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
  );
}
