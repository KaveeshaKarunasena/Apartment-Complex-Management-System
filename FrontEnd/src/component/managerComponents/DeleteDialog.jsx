import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import axios from 'axios';

export default function DeleteDialog(props) {

  const {enqueueSnackbar} = useSnackbar();

  const deleteServiceProvider = async id => {
    await axios
      .delete(`/service-provider/delete/${id}`)
      .then(
        () => {
        const serviceProvidersCopy = [...props.spList];
        const filteredServiceProviders = serviceProvidersCopy.filter(item => item._id !== id);
        console.log(filteredServiceProviders);
        props.setServiceProviders(filteredServiceProviders);
        props.setIsService(true);
        enqueueSnackbar('Succesfully Deleted', { variant: 'success' });
      })
      .catch(err => enqueueSnackbar(err, { variant: 'error' }));
  };
  return (
    <div>
      <Dialog
        open={props.showDeleteDialog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete Service Provider
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the service provider{' '}
            <b>{props.cName}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.cancel}>
            Cancel
          </Button>
          <Button onClick={ () => {deleteServiceProvider(props.id)}}>YES</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
