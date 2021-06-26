
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, } from 'react-bootstrap';
import './Shoes.css';
import axios from 'axios';

const Shoes = ({products}) => {
  //for the map
    // look into mapping object
    // Object.key(products)
    // products.length

  console.log(products)
  return (
        <>
        <div className="shoes">Shoes</div>
        {products[0] && products.map((product) => {

          <Card key={product.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180"/>
             <Card.Body>
              <Card.Title>{product.name}Name</Card.Title>
                <Card.Text>{product.description}description</Card.Text>
                <Card.Text>{product.SKU}sku</Card.Text>
                <Card.Text>{product.price}Price</Card.Text>
              <Link to="/MyCart"><Button variant="primary">Add to Cart</Button></Link>
            </Card.Body>
          </Card>

        }) }


        </>
    )
}) : null}
}
export default Shoes;