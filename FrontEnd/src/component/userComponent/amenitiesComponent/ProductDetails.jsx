import React from "react";
import {Link } from "react-router-dom";
import ProductItem from './ProductItem';
import './detailProduct.css'

function ProductDetails(props){

    console.log(props)
  
    // if(product.length === 0) return null;
    // return(
    //     <>
    //     <div className="detail">
    //        <img src={product.images.url} alt="" />
    //        <div className="box-detail">
    //           <div className="row">
    //             <h2>{product.title}</h2>
    //             <h6>#id: {product.product_id}</h6>

    //           </div>
    //           <span>${product.fee}</span>
    //           <p>{product.description}</p>
    //           <p>{product.content}</p>
    //           <p>Number Of Users: {product.sold}</p>
    //           <Link to="/cart" className="cart">Add Now</Link>
    //        </div>
    //     </div>
    //     <div>
    //         <h2>Related Amenities</h2>
    //         {/* <div className="products">
    //             {
    //                 product.map(product =>{
    //                     return product.category === product.category
    //                     ? <ProductItem key={product._id} product={product} /> : null
    //                 })
    //             }
    //         </div> */}
    //       </div>
    //  </>
        
    // )
}

export default ProductDetails();