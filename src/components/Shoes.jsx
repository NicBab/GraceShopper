
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, } from 'react-bootstrap';
import './css/Shoes.css';

const Shoes = ({products}) => {
  //for the map
    // look into mapping object
    // Object.key(products)
    // products.length

  return (
        <>
        <div className="shoes">Shoes</div>
          {products[0] && products.map((product) => {
            return (
                <Card key={product.id} style={{ width: '18rem' }}>
                <Card.Img>{product.img}</Card.Img>
                 <Card.Body>
                  <Card.Title>{product.name}Name</Card.Title>
                    <Card.Text>{product.description}description</Card.Text>
                    <Card.Text>{product.SKU}sku</Card.Text>
                    <Card.Text>{product.price}Price</Card.Text>
                  <Link to="/MyCart"><Button variant="primary">Add to Cart</Button></Link>
                </Card.Body>
              </Card>
            )
        })}
      </>
    )
}

export default Shoes;