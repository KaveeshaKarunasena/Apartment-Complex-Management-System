import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import EditApartments from './EditApartments';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles()(theme => ({
  displayBtn: {
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor:'rgba(0,0,30,0.4)'
  },
}));

const Popup = props => {
  const { getId, openPopup, setOpenPopup , setApartment, apartment} = props;
  const { classes } = useStyles();

  const handleProps = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog open={openPopup} BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}>
      <DialogTitle>
        <div className={classes.displayBtn}>
          <IconButton onClick={handleProps}>
            <CloseIcon sx={{ color: 'red' }} />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <EditApartments id={getId} setOpenPopup={setOpenPopup} setApartment={setApartment} apartment={apartment}/>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
