import React, { useState } from "react";
import "./css/Home.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InfoIcon, CartIcon } from './icons';


const Product = ({ product, products, setProducts, cart, setCart, addToCart}) => {
  const[showProductInfo, setShowProductInfo] = useState(false);

  return (
    <>
    {product.active ?
      <Row>
        <Col>
          <Card className="homePgCard ml-4 mb-4" bg="light" key={product.id} style={{ width: "18rem" }}>
            <Link to="/product/id">
              <Card.Img
                variant="top"
                style={{ maxHeight: "200px"  }}
                src={product.img_url}
              />
            </Link>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              {showProductInfo && 
               (<Card.Text>{product.description}</Card.Text>)}
              <h6 className="card-subtitle">${product.price}</h6>
              <br></br>
              <Button onClick={() => addToCart(product)} variant="primary">Add to cart</Button>
              <Button onClick={() => setShowProductInfo(!showProductInfo)} style={{marginLeft: "5em"}} variant="light"> { InfoIcon } </Button>
            
            </Card.Body>
          </Card>
        </Col>
      </Row>
      : null}
    </>
  );
};

export default Product;
