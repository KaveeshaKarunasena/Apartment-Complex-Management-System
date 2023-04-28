import React, {useEffect, useState} from "react";
import ProductItem from "./ProductItem";
import axios from 'axios';

import './Amentity.css';

function Amenities(){
    
    const [products, setProducts] = useState([])

    useEffect(() =>{
        const getProducts = async () =>{
            const res = await axios.get('/product/products')
            setProducts(res.data.products);
        }

        getProducts();
    },[])

    return(
        <div className="products">
            {
                products.map(product =>{
                    return<ProductItem key={product._id} product={product} />
                })
            }
        </div>
    )
}

export default Amenities;