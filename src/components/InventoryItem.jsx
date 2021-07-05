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
      //onRemoveProduct()
      await deleteProduct(id)
      const activeProducts = products.products.filter(
        (fProduct) => fProduct.id !== product.id
      );
      setProducts(activeProducts);
    } catch (err) {
      throw err;
    }
  };

  /*
  const onRemoveProduct = (idx) => {
		const copy = [...products];
		copy.splice(idx, 1);
		setProducts(copy);
	};
  */ // NEED TO RENDER PRODUCTS AFTER DELETE WITHOUT PAGE RELOAD!

  return (
    <>
    {product.active ?
      <Row>
        <Col>
          <Card className="homePgCard ml-4 mb-4" bg="light" key={product.id} style={{ width: "18rem" }}>
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

              <h6 className="card-subtitle">Inventory: {product.quantity}</h6>
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
      : null}
    </>
  );
};

export default InventoryItem;
