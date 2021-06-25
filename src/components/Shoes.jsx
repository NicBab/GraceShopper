
import React, { useEffect }from 'react'
import { getAllProducts } from '../api';
import './Shoes.css';


const Shoes = () => {

   
    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
        <div className="shoes">Shoes</div>
        </>
    )
}

export default Shoes;