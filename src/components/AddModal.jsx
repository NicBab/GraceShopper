import React, { useState } from "react";
import Button from "react-bootstrap/button";
import Modal from "react-bootstrap/modal";
import Form from "react-bootstrap/form";
import Col from "react-bootstrap/col";
import { createProduct } from "../api";

const AddModal = ({ setProducts, product, setAddMode }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setAddMode(false);
  };

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
        return [...prevProducts, newProduct];
      });
      setName("");
      setDescription("");
      setImgUrl("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setShow(false);
      setAddMode(false);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form noValidate autoComplete="off" onSubmit={handleCreateProduct}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Product</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onInput={(event) => {
                  setName(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onInput={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={img_url}
                onInput={(event) => {
                  setImgUrl(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={price}
                    onInput={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Inventory</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onInput={(event) => {
                      setQuantity(event.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Select..."
                    value={category}
                    onInput={(event) => {
                      setCategory(event.target.value);
                    }}
                  >
                    <option>Select...</option>
                    <option>Shoes</option>
                    <option>Hats</option>
                    <option>Accessories</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddModal;
