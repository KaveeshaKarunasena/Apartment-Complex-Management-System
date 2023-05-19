import React, { useContext, useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './cart.css';
import { AuthContext } from '../../AuthProvider';
// import ProductDetails from "./ProductDetails";
// import ProductItem from "./ProductItem";
import './detailProduct.css';
import '../../managerComponents/serviceProvider.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 6,
  marginTop: '4%',
};

function AmenitiyCard({ product, handleCart, inCart, handleClose }) {
  let authPayload = useContext(AuthContext);
  const decoded = jwt_decode(authPayload.token);
  const Id = decoded.id;
  const state = createContext();

  const itemId = product._id;
  const handleDelete = async () => {
    const res = await axios.delete(`/customer/deleteItem/${Id}/${itemId}`);
    console.log(res);
    handleClose();
    window.location.reload();
    alert('Do you want to delete this amenity?');
  };

  const handleAddToCart = async () => {
    handleCart(product);
    handleClose();
  };

  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 345, margin: '0 auto', padding: '0.1em' }}>
        <CardMedia
          component="img"
          sx={{ height: 250, padding: '1em 1em 0 1em', objectFit: 'contain' }}
          image={`http://localhost:5000/uploads/${product.images}`}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" align="center">
            <Typography
              sx={{ marginBottom: 2, fontWeight: 'bold', fontSize: 18 }}
              variant="body2"
            >
              {product.title}
            </Typography>

            <span>Rs.{product.fee}</span>
            <Typography sx={{ marginBottom: 2 }} variant="body2">
              {product.description}
            </Typography>
            <Typography sx={{ marginBottom: 2 }} variant="body2">
              {product.content}
            </Typography>

            {inCart ? (
              <Button className="cart" id="btn_addnow" onClick={handleDelete}>
                Remove
              </Button>
            ) : (
              <Button
                className="cart"
                id="btn_addnow"
                onClick={handleAddToCart}
              >
                Add Now
              </Button>
            )}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

function BtnRender({ product, state, handleCart, inCart }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(open);
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        style={{ overflow: 'scroll', marginTop: '5%' }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AmenitiyCard
              product={product}
              state={state}
              handleCart={handleCart}
              inCart={inCart}
              handleClose={handleClose}
            />
          </Box>
        </Fade>
      </Modal>
      <div className="row_btn">
        {
          <>
            <Button
              sx={{ flexBasis: '100%' }}
              id="btn_add"
              onClick={handleOpen}
            >
              View
            </Button>
            {/* <Button id="btn_view" onClick={handleOpen}>
              View
            </Button> */}
          </>
        }
      </div>
    </React.Fragment>
  );
}

export default BtnRender;
