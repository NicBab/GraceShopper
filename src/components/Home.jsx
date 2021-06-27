import React from "react";
import "./css/Home.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = ({ products }) => {
  return (
    <>
      <div className="home">HOME</div>
      <Row>
        {products.products &&
          products.products.map((product, idx) => {
            return (
              <Col key={idx}>
                <Card bg="light" key={product.id} style={{ width: "18rem" }}>
                  <Link to="/product/id">
                    <Card.Img
                      variant="top"
                      style={{ maxHeight: "200px" }}
                      src={product.img_url}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <h6 className="card-subtitle">{product.price}</h6>
                    <br></br>
                    <Button variant="primary">Add to cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default Home;
