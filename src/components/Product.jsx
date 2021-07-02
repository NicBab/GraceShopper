import React from "react";
import "./css/Home.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InfoIcon } from './icons'

const Product = ({ product, products, setProducts }) => {
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
              <Card.Text>{product.description}</Card.Text>
              <h6 className="card-subtitle">${product.price}</h6>
              <br></br>
              <Button variant="primary">Add to cart</Button>
              <Button style={{marginLeft: "5em"}} variant="light">{ InfoIcon } </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Product;
