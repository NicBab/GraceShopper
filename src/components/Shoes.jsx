
import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../api';
import './Shoes.css';


const Shoes = () => {
    const [product, setProduct] = useState(null)
    let content = null

    useEffect(() => {
        getAllProducts()
    }, [])

    if (product) {
      content = 
        <div>
            <h3>{product.name}</h3>
        </div>
    }

    return (
        <>
        <div>{content}</div>
        <div className="shoes">Shoes</div>
        </>
    )
}

export default Shoes;