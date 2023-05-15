import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
});

export default function CustomerReport(props) {
  const classes = useStyles();
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Update Customer Details
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.cardContainer}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Card 1
                </Typography>
                <Typography color="textSecondary">Card 1 content</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} className={classes.cardContainer}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Card 2
                </Typography>
                <Typography color="textSecondary">Card 2 content</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} className={classes.cardContainer}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Card 3
                </Typography>
                <Typography color="textSecondary">Card 3 content</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} className={classes.cardContainer}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Card 4
                </Typography>
                <Typography color="textSecondary">Card 4 content</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} className={classes.cardContainer}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Card 5
                </Typography>
                <Typography color="textSecondary">Card 5 content</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
