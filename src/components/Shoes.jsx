
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, } from 'react-bootstrap';
import './css/Shoes.css';
import { addToCart } from '../api';

const Shoes = ({products}) => {
 
    const onAddToCart = (event) => {
        event.preventDefault()
        addToCart()
        console.log('add to cart clicked')
        
    }

  return (
        <>
        <div className="shoes">Shoes</div>
        {products.products
        ? products.products.map((product) => {
            return (
              <Card key={product.id} style={{ width: "18rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>{product.SKU}</Card.Text>
                  <Card.Text>${product.price}</Card.Text>
                  <Link to="/MyCart">
                    <Button onClick={onAddToCart} variant="primary">Add to Cart</Button>
                  </Link>
                </Card.Body>
              </Card>
            );
          })
        : null}
      </>
    )
}

export default Shoes;