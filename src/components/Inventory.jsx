import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { createProduct } from "../api";
import InventoryItem from "./InventoryItem";

const Inventory = ({ products, setProducts }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  //const [active, setActive] = useState(true);

  const handleCreateProduct = async (event) => {
    try {
      event.preventDefault();
      const { newProduct } = await createProduct({
        name,
        description,
        img_url,
        price,
        quantity,
        category,
      });
      setProducts((prevProducts) => {
        return [...prevProducts.products, newProduct];
      });
      setName("");
      setDescription("");
      setImgUrl("");
      setPrice("");
      setQuantity("");
      setCategory("");
      //setActive(true)
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
            <Form.Control
              value={name}
              onInput={(event) => {
                setName(event.target.value);
              }}
              placeholder="Product"
            />
          </Col>
          <Col>
            <Form.Control
              value={description}
              onInput={(event) => {
                setDescription(event.target.value);
              }}
              placeholder="Description"
            />
          </Col>
          <Col>
            <Form.Control
              value={img_url}
              onInput={(event) => {
                setImgUrl(event.target.value);
              }}
              placeholder="Image URL"
            />
          </Col>
          <Col>
            <Form.Control
              value={price}
              onInput={(event) => {
                setPrice(event.target.value);
              }}
              placeholder="Price"
            />
          </Col>
          <Col>
            <Form.Control
              value={quantity}
              type="number"
              onInput={(event) => {
                setQuantity(event.target.value);
              }}
              placeholder="Quantity"
            />
          </Col>
          <Col>
            <Form.Control
              as="select"
              value={category}
              onInput={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option>Shoes</option>
              <option>Hats</option>
              <option>Accessories</option>
            </Form.Control>
          </Col>
        </Form.Row>
        <br />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
      <h2>Inventory</h2>
      <Row>
        {products.products &&
          products.products.map((product, idx) => {
            return <InventoryItem key={idx} product={product} />;
          })}
      </Row>
    </>
  );
};

export default Inventory;
