import React, { useState } from "react";
import { Card, Button, Form, Col, Row } from "react-bootstrap";
import { createProduct } from "../api"

const Inventory = ({ products, setProducts }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [price, setPrice] = useState("");
  const [SKU, setSKU] = useState(""); 

  const handleCreateProduct = async (event) => {
    try {
      event.preventDefault();
      const { newProduct } = await createProduct(
        name,
        description,
        img_url,
        price,
        SKU
      );
      setProducts((prevProducts) => {
        return [...prevProducts, newProduct];
      });
      setName("");
      setDescription("");
      setImgUrl("");
      setPrice("");
      setSKU("");
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <h2>Add to Inventory</h2>
      <Form onSubmit={handleCreateProduct}>
        <Form.Row>
          <Col>
            <Form.Control value={name} onInput={(event) => {
                setName(event.target.value)
            }}placeholder="Product" />
          </Col>
          <Col>
            <Form.Control value={description} onInput={(event) => {
                setDescription(event.target.value)
            }}placeholder="Description" />
          </Col>
          <Col>
            <Form.Control value={img_url} onInput={(event) => {
                setImgUrl(event.target.value)
            }} placeholder="Image URL" />
          </Col>
          <Col>
            <Form.Control value={price} onInput={(event) => {
                setPrice(event.target.value)
            }} placeholder="Price" />
          </Col>
          <Col>
            <Form.Control value={SKU} onInput={(event) => {
                setSKU(event.target.value)
            }} placeholder="SKU" />
          </Col>
        </Form.Row>
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </Form>
      <h2>Inventory</h2>
      <Row>
        {products.products &&
          products.products.map((product, idx) => {
            return (
              <Col key={idx}>
                <Card key={product.id} style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    style={{ maxHeight: "200px" }}
                    src={product.img_url}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <h6 className="card-subtitle mb-2">{product.price}</h6>
                    <Button variant="primary">Edit</Button>
                    <Button variant="secondary">Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default Inventory;
