import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Dialog ,DialogTitle,DialogContent} from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import EditApartments from './EditApartments';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const useStyles = makeStyles()(theme=>({
  displayBtn :{
    width: '90%',
   display:'flex',
   justifyContent:'flex-end',
   position :'absolute'
  }
}))




const Popup = (props) => {

    const {getId, children, openPopup, setOpenPopup} = props;
    const {classes} = useStyles();

    const handleProps=() =>{

      setOpenPopup(false);
    }

  return (
    <Dialog open={openPopup}  >
      <DialogTitle >
        <div className={classes.displayBtn}>
        <IconButton   onClick={handleProps}>
          <CloseIcon sx ={{color:'red'}}/>
        </IconButton>
        </div>
        

      </DialogTitle>
        <DialogContent>
            <EditApartments id ={getId}  setOpenPopup = {setOpenPopup}/>
        </DialogContent>
    </Dialog>
  )
}

export default Popup
