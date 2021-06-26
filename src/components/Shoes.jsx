import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./Shoes.css";
import axios from "axios";

const Shoes = ({ products }) => {
  return (
    <>
      <div className="shoes">Shoes</div>
      {products.products
        ? products.products.map((product) => {
              return (
                <Row>
                  <Col>
                    <Card key={product.id} style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={product.img_url} />
                      <Card.Body>
                        <Card.Title>{product.name}Name</Card.Title>
                        <Card.Text>{product.description}description</Card.Text>
                        <Card.Text>{product.SKU}sku</Card.Text>
                        <Card.Text>{product.price}Price</Card.Text>
                        <Link to="/MyCart">
                          <Button variant="primary">Add to Cart</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              );
            })
        : null}
    </>
  );
};
export default Shoes;