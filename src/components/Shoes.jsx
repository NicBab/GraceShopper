
import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, } from 'react-bootstrap';
import { getAllProducts } from '../api';
import './Shoes.css';
import axios from 'axios';


const Shoes = () => {
    const [products, setProducts] = useState();

    useEffect(async () => {
        getAllProducts()
        .then((response) => {
          setProducts(response);
        })
        .catch((error)=>{
          console.error('Unable to get Products')
        })
    }, []);

    { products && products.length > 0 ? products.map((product) => {

      return (
        <>
        <div class="cards">
  <div class="item">
    <img id="shoe" src="https://robbreport.com/wp-content/uploads/2020/02/nba-allstar-3_0-digi.jpg?w=1000"/>  
  </div>  
  
  <div class="description">
    <h4> Nike</h4>
    <small> AME x NBA </small>
    
    <h5 id="price">$65</h5>
  </div>
  </div>
  <button class="btn">Add to Cart</button>

        </>
    )
}) : null}
}
export default Shoes;