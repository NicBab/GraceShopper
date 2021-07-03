import React, { useState } from "react";
import "./css/Home.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InfoIcon, CartIcon } from './icons'
import Navigate from "./Navigate";




const Product = ({ product, products, setProducts }) => {
  const [cart, setCart] = useState([]);
  const[showProductInfo, setShowProductInfo] = useState(false)
/*
  onAdd = (product) => {
    const exist = cartItems.find(x => x.id ===product.id );
    if(exist) {
      setCartItems(cartItems.map((x => x.id === product.id ? {...exist, qty: exist.qty + 1} :x ))
    } else {
      setCartItems([...cartItems, {...products, qty: 1}])
    }
  }
  */

  const addToCart = (product) => {
    console.log('We are adding to the cart')
    setCart([...cart, product])
  }



  return (
    <>

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
    </>
  );
};

export default Product;
