import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteDialog from './DeleteDialog';

import './serviceProvider.css';
import UpdateService from './UpdateService';

export default function ServiceCard(props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updateForm, showUpdateForm] = useState(false);

  const enableDialogHandler = () => {
    setShowDeleteDialog(true);
  };

  const disableDialogHandler = () => {
    setShowDeleteDialog(false);
  };

  const displayUpdateForm = () => {
    showUpdateForm(true);
  };

  const hideUpdateForm = () => {
    showUpdateForm(false);
  };

  return (
    <React.Fragment>
      <UpdateService
        showForm={updateForm}
        submitFormHandler={() => {}}
        setShowForm={() => {}}
        setIsService={props.setIsService}
        hideUpdateForm={hideUpdateForm}
        cName={props.cName}
        sType={props.sType}
        location={props.location}
        cNumber={props.cNumber}
        id={props.id}
        spList={props.spList}
        setServiceProviders={props.setServiceProviders}
      />
      <DeleteDialog
        showDeleteDialog={showDeleteDialog}
        cancel={disableDialogHandler}
        cName={props.cName}
        id={props.id}
        spList={props.spList}
        setServiceProviders={props.setServiceProviders}
        setIsService={props.setIsService}
      />
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={props.cName}
        />
        <CardContent>
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
                  backgroundColor: '#FFBD03',
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
                  backgroundColor: '#5ADBB5',
                }}
                onClick={enableDialogHandler}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
