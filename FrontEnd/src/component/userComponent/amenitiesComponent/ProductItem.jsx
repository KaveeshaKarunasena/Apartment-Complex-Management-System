import { useEffect, useState } from 'react';
import BtnRender from './BtnRender';
import './ProductItem.css';
import { Button } from '@mui/material';

function ProductItem({ product, state, handleCart, inCart }) {
  return (
    <div className="product_card">
      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>Rs.{product.fee} </span>
        <p>{product.description} </p>
      </div>

      <BtnRender
        product={product}
        state={state}
        handleCart={handleCart}
        inCart={inCart}
      />
    </div>
  );
}

export default ProductItem;
