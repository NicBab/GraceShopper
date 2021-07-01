import React, { useState } from "react";
import "./css/Home.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteProduct } from "../api";

const InventoryItem = ({ product, products, setProducts }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (id) => {
    setEditMode(true);
  };

  const handleSave = (id) => {};

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      const activeProducts = products.filter(
        (fProduct) => fProduct.id !== product.id
      );
      setProducts(activeProducts);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Row>
        <Col>
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
              <h6 className="card-subtitle">${product.price}</h6>
              <br></br>
              <Button variant="secondary">Edit</Button>
              {"  "}
              <Button
                variant="secondary"
                onClick={() => {
                  handleDelete(product.id);
                }}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InventoryItem;
