
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Row, Col } from 'react-bootstrap';
import './css/Shoes.css';
// import { addToCart } from '../api';

const Shoes = ({products}) => {
 
    const onAddToCart = (event) => {
        event.preventDefault()
        // addToCart()
        console.log('add to cart clicked')
        
    }

  return (
    <>
    <Row>
      <Col>
      <div className="shoes">Shoes</div>
      {products.products
        ? products.products.map((product) => {
              return (
           
                    <Card className="shoePgCard mb-4"key={product.id} style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={product.img_url} />
                      <Card.Body>
                        <Card.Title>{product.name}Name</Card.Title>
                        <Card.Text>{product.description}description</Card.Text>
                        <Card.Text>{product.price}Price</Card.Text>
                        <Link to="/MyCart">
                          <Button variant="primary">Add to Cart</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                
              );
            })
        : null}
          </Col>
       </Row>
    </>
  );
};

export default Shoes; 