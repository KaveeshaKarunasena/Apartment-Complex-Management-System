import React, { useContext } from "react";
import { Link } from "react-router-dom";
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

// import ProductDetails from "./ProductDetails";
// import ProductItem from "./ProductItem";
import './detailProduct.css';
import '../../managerComponents/serviceProvider.css';

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




function AmenitiyCard(props) {

    const { product } = props;

    return (
        <React.Fragment>

            <Card sx={{ maxWidth: 345, margin: '0 auto', padding: '0.1em' }}>
                <CardMedia
                    component="img"
                    sx={{ height: 250, padding: '1em 1em 0 1em', objectFit: 'contain' }}
                    image={product.images.url}
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

                        <h2>{product.title}</h2>
                        <h6>#id: {product.product_id}</h6>


                        <span>Rs.{product.fee}</span>
                        <p>{product.description}</p>
                        <p>{product.content}</p>
                        <p>Number Of Users: {product.sold}</p>
                        <Link to="/app" className="cart" id="btn_addnow">Add Now</Link>
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}


function BtnRender(props) {

    const { product } = props;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        <AmenitiyCard product={product} />
                    </Box>
                </Fade>
            </Modal>
            <div className="row_btn">


                {/*<Link id="btn_add" to="#!">
                   Delete
                </Link>
                <Link id="btn_view" to={`/edit_product/${product._id}`}>
                 Edit
                </Link>*/

                    <>


                        <Button id="btn_add"  onClick={handleOpen}>
                            
                            Add
                        </Button>
                        <Button id="btn_view" onClick={handleOpen}>
                            View
                        </Button>
                    </>
                }

            </div>
        </React.Fragment>




    )
}

export default BtnRender;





