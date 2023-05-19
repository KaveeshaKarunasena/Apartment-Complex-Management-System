
import React, { useEffect, useState, useContext, createContext } from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import { AuthContext } from '../../AuthProvider';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import ProductItem from '../amenitiesComponent/ProductItem';

function HomePage() {
  let authPayload = useContext(AuthContext);
  const decoded = jwt_decode(authPayload.token);
  const Id = decoded.id;
  const state = createContext();
  const [cart, setCart] = useState([]);


  const calcTotal = () => {
    let total = 0;
    if (cart && Array.isArray(cart)) {
      cart.forEach((item) => {
        total += item.fee;
      });
    }

    return (
      <Typography variant="h6" component="p" style={{ color: 'green',fontWeight:'bold'}} >
        Total: Rs.{total}
      </Typography>
    );
  };

  const inCart = true;
  useEffect(() => {
    const getCart = async () => {
      const res = await axios.get(`/customer/getCart?id=${Id}`);
      setCart(res.data);
    };

  // const calcTotal = () => {
  //   let total = 0;
  //  cart.forEach(item => {
  //     total += item.fee;
  //   }); 
  //   return total;
  // };
  // const calcTotal = () => {
  //   let total = 0;
  //   cart.forEach(item => {
  //     total += item.fee;
  //   });
  
  //   if (total === 0) {
  //     return 'Empty';
  //   } else {
  //     return `Total: Rs.${total}`;
  //   }
  // };

  // console.log(calcTotal());
  // const inCart = true;
  // useEffect(() => {
  //   const getCart = async () => {
  //     const res = await axios.get(`/customer/getCart?id=${Id}`);
  //     setCart(res.data);
  //   };


  //   getCart();
  // }, [Id]);

  return (
    <div>
      <div className="content">
        <Card className="card">
          <CardContent>
            <Typography variant="h5" component="h2" className="card-title">
              Welcome to Wescott Apartment Web Site
            </Typography>
          </CardContent>
        </Card>
        {/* {calcTotal()} */}
      </div>
      {cart && cart.length ? (
        <div className="products">
          {cart.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                state={state}
                //inCart={inCart}
              />
            );
          })}
        </div>
      ) : (
        <h3>You can add amenities to this page</h3>
      )}
    </div>
  );
}

export default HomePage;
