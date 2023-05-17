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
  const styles = `
    .app-bar {
      background-color: #333;
    }
    .card {
      max-width: 600px;
      padding: 1rem;
      background-color: #f2f2f2;
    }
    .card-title {
      margin-bottom: 1rem;
      color: #333;
    }
    .card-body {
      color: #555;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 64px);
    }
    .slideshowContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '80%',
      marginTop: '4%',
      marginLeft:'10%',
      placeItems: 'center',
      
    }
    .slide: {
      
      height: '600px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255, 0.6)', 
      fontSize: '48px',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px #000000',
    }
    
  `;

  const calcTotal = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.fee;
    });
    return total;
  };

  console.log(calcTotal());
  const inCart = true;
  useEffect(() => {
    const getCart = async () => {
      const res = await axios.get(`/customer/getCart?id=${Id}`);
      setCart(res.data);
    };

    getCart();
  }, [Id]);

  return (
    <div>
      <div className="content">
        <Card className="card">
          <CardContent>
            <Typography variant="h5" component="h2" className="card-title">
              Welcome to My App!
            </Typography>
          </CardContent>
        </Card>
        {calcTotal()}
      </div>
      {cart && cart.length ? (
        <div className="products">
          {cart.map(product => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                state={state}
                inCart={inCart}
              />
            );
          })}
        </div>
      ) : (
        <p>No products in cart.</p>
      )}
    </div>
  );
}

export default HomePage;
