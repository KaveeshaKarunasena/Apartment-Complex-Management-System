import React, { useEffect, useState, useContext, createContext } from 'react';
import ProductItem from './ProductItem';
import { AuthContext } from '../../AuthProvider';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import './Amentity.css';

function Amenities() {
  let authPayload = useContext(AuthContext);

  const decoded = jwt_decode(authPayload.token);
  const Id = decoded.id;
  const state = createContext();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const handleCart = async product => {
    setCart(prev => {
    if (cart.length > 0) {
    if (prev.some(item => item._id === product._id)) {
    // Product already exists, no need to add it again
    alert('product already added');
    return prev;
    } else {
    // Product doesn't exist, add it to the cart
    const newCart = [...prev, product];
    const values = {
    Id: Id,
    product: newCart,
    };
    axios({
    method: 'PUT',
    url: `http://localhost:5000/customer/addcart`,
    data: values,
    });
    alert('Now this amenity add your profile ');
    return newCart;
    }
    } else {
    const newCart = [product];
    const values = {
    Id: Id,
    product: newCart,
    };
    axios({
    method: 'PUT',
    url: `http://localhost:5000/customer/addcart`,
    data: values,
    });
   
    return newCart;
    }
    });
    };
  console.log(cart);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('/product/products');
      setProducts(res.data.products);
    };

    const getCart = async () => {
      const res = await axios.get(`/customer/getCart?id=${Id}`);
      setCart(res.data);
      console.log(cart);
    };

    getProducts();
    getCart();
  }, [Id]);

  return (
    <div className="products">
      {products.map(product => {
        return (
          <ProductItem
            key={product._id}
            product={product}
            handleCart={handleCart}
            state={state}
          />
        );
      })}
    </div>
  );
}

export default Amenities;
