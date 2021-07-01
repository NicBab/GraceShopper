import React from "react";
import "./css/Home.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
//import { FlipToBackRounded } from "@material-ui/icons";
//import { deleteProduct } from "../api";

const Product = ({ product, setProducts }) => {
  // const handleDelete = async (id) => {
  //   try {
  //     await deleteProduct(id);
  //     const activeProducts = products.filter(
  //       (fProducts) => fProduct.id !== product.id
  //     );
  //     setProducts(activeProducts);
  //   } catch (error) {
  //     throw error;
  //   }


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
              <Button variant="secondary">Edit</Button>
              <Button variant="secondary">Delete</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Product;

// Add ternary to button element on product card *********
// if(admin) render Edit/Delete, else render Add to Cart

//getProductById
