import React, { useState } from "react";
import Button from "react-bootstrap/button";
import Modal from "react-bootstrap/modal"
import Form from "react-bootstrap/form"
import Col from "react-bootstrap/col"
const EditModal = ({ 
  //products, 
  //setProducts
  product, 
  handleOpen,
  setEditMode
}) => {
  // const [name, setName] = useState(product.name);
  // const [description, setDescription] = useState(product.description);
  // const [price, setPrice] = useState(product.price);
  // const [quantity, setQuantity] = useState(product.quantity);
  // const [category, setCategory] = useState(product.category);
  // const [imgUrl, setImgUrl] = useState(product.img_url);
  const [show, setShow] = useState(true);

  
  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
    setEditMode(false)
  }
  const handleSave = () => {
  }
  // const handlePatchProduct = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await patchLink(id, img_url, name, description, price, quantity, category);
  //     let updateProducts = await getAllProducts();
  //     setProducts(updatedProducts.products);
  //     handleClose()
  //   } catch (err) {
  //     throw err;
  //   }
  // }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Product</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Row>
            <Col>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <Form.Label>Inventory</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            </Col>
            <Col>   
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select"  onInput={(event) => {
              }}>
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
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
