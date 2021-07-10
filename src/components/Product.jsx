import React, { useState } from "react";
import "./css/Home.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InfoIcon } from "./icons";
import { addToCart } from "../api"

const Product = ({
  product,
  products,
  setProducts,
  cart,
  setCart,
}) => {
  const [showProductInfo, setShowProductInfo] = useState(false);
  /*const { id, name, description, price, img_url } = product;*/
  const handleAddToCart = async () => {
    try {
      alert(`${product.name} added to cart!`)
      const user_id = 3;
      await addToCart(user_id, product.id, 1)
      product.quantity = 1;
      cart.push(product)
    } catch (error) {
      console.error("Error with AddToCart handler")
    }
  }


  return (
    <>
      {product.active ? (
        <Row>
          <Col>
            <Card
              className="homePgCard ml-4 mb-4"
              bg="light"
              key={product.id}
              style={{ width: "18rem" }}
            >
              <Link to="/product/id">
                <Card.Img
                  className="landscape"
                  variant="top"
                  style={{ maxHeight: "200px" }}
                  src={product.img_url}
                />
              </Link>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                {showProductInfo && (
                  <Card.Text>{product.description}</Card.Text>
                )}
                <h6 className="card-subtitle text-muted">${product.price}</h6>
                <br></br>
                <Button onClick={handleAddToCart} variant="primary">
                  Add to cart
                </Button>
                <Button
                  onClick={() => setShowProductInfo(!showProductInfo)}
                  style={{ marginLeft: "5em" }}
                  variant="light"
                >
                  {" "}
                  {InfoIcon}{" "}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : null}

    </>
  );
};

export default Product;
